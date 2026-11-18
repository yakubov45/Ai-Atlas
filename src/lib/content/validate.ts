import { findCycles } from "@/lib/graph/graph";
import { validateVisualizationConfig } from "@/lib/visualizations/validation";
import { createLessonResolver } from "./resolve";
import type { ContentCollection, ContentIssue, ContentRefUse, Lesson } from "./types";

/**
 * Semantic (cross-file) content validation. Complements per-file schema
 * validation performed by the loader. Pure function — no file-system access.
 */

function duplicates<T>(items: readonly T[], key: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    groups.set(k, [...(groups.get(k) ?? []), item]);
  }
  return new Map([...groups].filter(([, group]) => group.length > 1));
}

export function validateCollection(collection: ContentCollection): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const error = (code: string, file: string, message: string) => issues.push({ severity: "error", code, file, message });
  const warn = (code: string, file: string, message: string) => issues.push({ severity: "warning", code, file, message });

  const { lessons, categories, glossary, references, visualizations } = collection;
  const resolveLesson = createLessonResolver(lessons);
  const categoryIds = new Set(categories.map((c) => c.id));
  const referenceIds = new Set(references.map((r) => r.id));
  const glossaryIds = new Set(glossary.map((g) => g.id));
  const visualizationIds = new Set(visualizations.map((v) => v.id));

  // --- uniqueness ----------------------------------------------------------
  for (const [id, group] of duplicates(categories, (c) => c.id)) {
    error("duplicate-category", "categories.json", `Takroriy kategoriya id: '${id}' (${group.length} marta)`);
  }
  for (const [id, group] of duplicates(lessons, (l) => l.id)) {
    for (const lesson of group) error("duplicate-lesson-id", lesson.filePath, `Takroriy dars id: '${id}'`);
  }
  for (const [slug, group] of duplicates(lessons, (l) => l.slug)) {
    for (const lesson of group) error("duplicate-slug", lesson.filePath, `Takroriy slug: '${slug}'`);
  }
  // A lesson id must not collide with a different lesson's slug (resolution ambiguity).
  const slugOwners = new Map(lessons.map((l) => [l.slug, l]));
  for (const lesson of lessons) {
    const owner = slugOwners.get(lesson.id);
    if (owner && owner !== lesson) {
      error("ambiguous-lesson-ref", lesson.filePath, `Dars id '${lesson.id}' boshqa dars slugi bilan bir xil (${owner.filePath})`);
    }
  }
  for (const [id, group] of duplicates(glossary, (g) => g.id)) {
    for (const term of group) error("duplicate-glossary-id", term.filePath, `Takroriy glossariy id: '${id}'`);
  }
  for (const [id] of duplicates(references, (r) => r.id)) {
    error("duplicate-reference-id", "references/", `Takroriy manba id: '${id}'`);
  }
  for (const [id, group] of duplicates(visualizations, (v) => v.id)) {
    for (const viz of group) error("duplicate-visualization-id", viz.filePath, `Takroriy vizualizatsiya id: '${id}'`);
  }

  // --- lessons -------------------------------------------------------------
  const orderKeys = duplicates(lessons, (l) => `${l.category}#${l.order}`);
  for (const [key, group] of orderKeys) {
    for (const lesson of group) warn("duplicate-order", lesson.filePath, `Bir kategoriyada bir xil tartib raqami: ${key}`);
  }

  for (const lesson of lessons) {
    const file = lesson.filePath;
    if (!categoryIds.has(lesson.category)) error("unknown-category", file, `Noma’lum kategoriya: '${lesson.category}'`);
    if (lesson.hasEsm) error("mdx-esm", file, "MDX import/export ishlatilmaydi — faqat ro‘yxatdan o‘tgan komponentlardan foydalaning");

    for (const ref of lesson.prerequisites) {
      const target = resolveLesson(ref);
      if (!target) error("unknown-prerequisite", file, `Noma’lum prerequisite: '${ref}'`);
      else if (target.id === lesson.id) error("self-prerequisite", file, "Dars o‘ziga prerequisite bo‘la olmaydi");
      else if (lesson.status === "published" && target.status !== "published") {
        warn("unpublished-prerequisite", file, `Prerequisite '${ref}' hali nashr qilinmagan (status: ${target.status})`);
      }
    }
    for (const ref of lesson.related) {
      const target = resolveLesson(ref);
      if (!target) error("unknown-related", file, `Noma’lum bog‘liq dars: '${ref}'`);
      else if (target.id === lesson.id) warn("self-related", file, "Dars o‘ziga bog‘liq deb ko‘rsatilgan");
    }
    for (const id of lesson.visualizations) {
      if (!visualizationIds.has(id)) error("unknown-visualization", file, `Noma’lum vizualizatsiya: '${id}'`);
    }
    for (const id of lesson.sources) {
      if (!referenceIds.has(id)) error("unknown-source", file, `Noma’lum manba: '${id}' (content/references ichida yo‘q)`);
    }
    if (lesson.status === "published" && lesson.origin.length === 0) {
      warn("missing-origin", file, "Nashr qilingan dars uchun manba hujjat (origin) ko‘rsatilmagan");
    }
    validateRefs(lesson.refs, file, lesson);
  }

  // --- prerequisite cycles -------------------------------------------------
  const prereqEdges = lessons.flatMap((lesson) =>
    lesson.prerequisites
      .map((ref) => resolveLesson(ref))
      .filter((target): target is Lesson => Boolean(target) && target!.id !== lesson.id)
      .map((target) => ({ source: target.id, target: lesson.id })),
  );
  for (const cycle of findCycles(lessons.map((l) => l.id), prereqEdges)) {
    const first = lessons.find((l) => l.id === cycle[0]);
    error("prerequisite-cycle", first?.filePath ?? "lessons/", `Prerequisite sikli: ${cycle.join(" → ")}`);
  }

  // --- glossary ------------------------------------------------------------
  for (const term of glossary) {
    for (const id of term.related) {
      if (!glossaryIds.has(id)) error("unknown-glossary-related", term.filePath, `Noma’lum bog‘liq atama: '${id}'`);
    }
    for (const ref of term.lessons) {
      if (!resolveLesson(ref)) error("unknown-glossary-lesson", term.filePath, `Noma’lum dars: '${ref}'`);
    }
    for (const id of term.sources) {
      if (!referenceIds.has(id)) error("unknown-source", term.filePath, `Noma’lum manba: '${id}'`);
    }
    validateRefs(term.refs, term.filePath, null);
  }

  // --- visualizations ------------------------------------------------------
  for (const viz of visualizations) {
    for (const message of validateVisualizationConfig(viz.type, viz.config)) {
      error("visualization-config", viz.filePath, message);
    }
    for (const ref of viz.relatedLessons) {
      if (!resolveLesson(ref)) error("unknown-visualization-lesson", viz.filePath, `Noma’lum dars: '${ref}'`);
    }
    for (const id of viz.sources) {
      if (!referenceIds.has(id)) error("unknown-source", viz.filePath, `Noma’lum manba: '${id}'`);
    }
  }

  return issues;

  function validateRefs(refs: readonly ContentRefUse[], file: string, owner: Lesson | null) {
    for (const ref of refs) {
      const where = ref.line ? ` (qator ${ref.line})` : "";
      switch (ref.kind) {
        case "lesson": {
          const target = resolveLesson(ref.target);
          if (!target) {
            error("broken-link", file, `Buzilgan dars havolasi: ${ref.raw}${where}`);
          } else {
            if (ref.anchor && !target.headings.some((h) => h.id === ref.anchor)) {
              warn("broken-anchor", file, `'${target.slug}' darsida '#${ref.anchor}' sarlavhasi topilmadi${where}`);
            }
            if (owner?.status === "published" && target.status !== "published") {
              warn("link-to-unpublished", file, `Nashr qilinmagan darsga havola: ${ref.raw}${where}`);
            }
          }
          break;
        }
        case "glossary":
          if (!glossaryIds.has(ref.target)) error("broken-link", file, `Buzilgan glossariy havolasi: ${ref.raw}${where}`);
          break;
        case "visualization":
          if (!visualizationIds.has(ref.target)) error("broken-link", file, `Buzilgan vizualizatsiya havolasi: ${ref.raw}${where}`);
          break;
        case "reference":
          if (!referenceIds.has(ref.target)) {
            error("broken-citation", file, `Noma’lum manba iqtibosi: ${ref.raw}${where}`);
          } else if (owner && !owner.sources.includes(ref.target)) {
            warn("citation-not-in-sources", file, `'${ref.target}' iqtibos qilingan, lekin frontmatter 'sources' ro‘yxatida yo‘q${where}`);
          }
          break;
      }
    }
  }
}

export function summarizeIssues(issues: readonly ContentIssue[]): { errors: number; warnings: number } {
  return {
    errors: issues.filter((i) => i.severity === "error").length,
    warnings: issues.filter((i) => i.severity === "warning").length,
  };
}
