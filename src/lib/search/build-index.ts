import type { ContentRepository } from "@/lib/content/repository";
import type { GlossaryTerm, Lesson, VisualizationInstance } from "@/lib/content/types";
import { buildLearningLibraryCatalog } from "@/lib/learning-os/catalog";
import { CANONICAL_CONCEPTS } from "@/lib/knowledge-graph/concepts";
import { SIXTEEN_ARCHITECTURES } from "@/lib/curriculum/deep-learning-16-architectures";
import { PUBLISHED_PRACTICES } from "@/lib/practice/registry";
import type { SearchDocument, SearchIndex } from "./core";

/**
 * Builds the unified search index across lessons, sections, glossary,
 * visual labs, courses, canonical KG concepts, research papers, and practice exercises.
 */

const MAX_SECTION_CHARS = 6000;

export function lessonDocuments(lesson: Lesson): SearchDocument[] {
  const docs: SearchDocument[] = [
    {
      id: `lesson:${lesson.id}`,
      kind: "lesson",
      title: lesson.title,
      description: lesson.description,
      tags: lesson.tags,
      body:
        lesson.sections.find((section) => section.heading === null)?.text.slice(0, MAX_SECTION_CHARS) ??
        "",
      url: `/learn/${lesson.slug}`,
      category: lesson.category,
    },
  ];
  lesson.sections.forEach((section, index) => {
    if (section.heading === null || !section.headingId) return;
    docs.push({
      id: `section:${lesson.id}:${index}`,
      kind: "section",
      title: section.heading,
      parentTitle: lesson.title,
      description: "",
      tags: [],
      body: section.text.slice(0, MAX_SECTION_CHARS),
      url: `/learn/${lesson.slug}#${section.headingId}`,
      category: lesson.category,
    });
  });
  return docs;
}

export function glossaryDocument(term: GlossaryTerm): SearchDocument {
  return {
    id: `glossary:${term.id}`,
    kind: "glossary",
    title: term.term,
    description: term.translation ?? "",
    tags: term.aliases,
    body: term.plainText.slice(0, MAX_SECTION_CHARS),
    url: `/glossary#${term.id}`,
  };
}

export function visualizationDocument(viz: VisualizationInstance): SearchDocument {
  return {
    id: `visualization:${viz.id}`,
    kind: "visualization",
    title: viz.title,
    description: viz.description,
    tags: [viz.type],
    body: "",
    url: `/visual-lab/${viz.id}`,
  };
}

export function buildSearchIndex(
  repository: Pick<ContentRepository, "lessons" | "glossary" | "visualizations"> & {
    references?: ContentRepository["references"];
  },
  generatedAt: string = new Date().toISOString(),
): SearchIndex {
  const existingLessonUrls = new Set(repository.lessons.map((l) => `/learn/${l.slug}`));

  const courseDocs: SearchDocument[] = buildLearningLibraryCatalog().map((course) => ({
    id: `course:${course.id}`,
    kind: "course",
    title: course.titleUz,
    description: `${course.subtitleUz} — ${course.descriptionUz}`,
    tags: [course.subjectGroup, course.kind],
    body: course.honestStatusNoteUz,
    url: course.href,
    category: course.subjectGroup,
  }));

  // Deduplicate canonical KG concepts against existing direct MDX URLs unless net-new
  const seenUrls = new Set<string>(existingLessonUrls);
  const conceptDocs: SearchDocument[] = [];
  for (const concept of CANONICAL_CONCEPTS) {
    const primaryHref =
      concept.crossTrackLessonLinks.find((l) => l.track === "core")?.href ??
      concept.crossTrackLessonLinks[0]?.href ??
      `/learn/map?concept=${concept.id}`;
    // If concept points solely to an already-indexed core lesson, link concept directly to Knowledge Map to prevent duplicate URLs
    const dedupUrl = seenUrls.has(primaryHref)
      ? `/learn/map?concept=${concept.id}`
      : primaryHref;
    seenUrls.add(dedupUrl);
    conceptDocs.push({
      id: `concept:${concept.id}`,
      kind: "concept",
      title: `${concept.nameUz} (${concept.name})`,
      description: concept.summaryUz,
      tags: [...concept.aliases, concept.domain],
      body: `${concept.whatIsItUz} ${concept.whyItMattersUz}`,
      url: dedupUrl,
      category: concept.domain,
    });
  }

  const paperDocs: SearchDocument[] = [
    ...(repository.references ?? []).map((ref) => ({
      id: `paper:${ref.id}`,
      kind: "paper" as const,
      title: ref.title,
      description: `${ref.authors.join(", ")}${ref.year ? ` (${ref.year})` : ""}`,
      tags: [ref.type, ...(ref.venue ? [ref.venue] : [])],
      body: ref.note ?? "",
      url: "/resources",
    })),
    ...SIXTEEN_ARCHITECTURES.map((arch) => ({
      id: `paper:dl16:${arch.id}`,
      kind: "paper" as const,
      title: `${arch.name} (${arch.year}) — ${arch.paper.title}`,
      description: `${arch.fullNameUz} • ${arch.paper.authors}`,
      tags: ["deep-learning", "16-architectures", arch.id],
      body: `${arch.whyInventedUz} ${arch.keyInnovationUz}`,
      url: "/learn/deep-learning-architectures",
    })),
  ];

  const practiceDocs: SearchDocument[] = [
    {
      id: "practice:python-30-days",
      kind: "practice",
      title: "30 Days of Python — Pyodide Mashqlar Banki (180 vazifa)",
      description: "Brauzerda real Python kod yozish va tekshirish laboratoriyasi",
      tags: ["python", "pyodide", "30-days", "practice"],
      body: "90 test va 90 amaliy dasturlash topshirig'i",
      url: "/practice/python-30-days",
    },
    ...PUBLISHED_PRACTICES.map((prac) => ({
      id: `practice:${prac.id}`,
      kind: "practice" as const,
      title: prac.exercise.titleUz,
      description: prac.objectiveUz,
      tags: ["python", "practice", "pyodide", prac.lessonId, ...(prac.aliases ?? [])],
      body: prac.exercise.instructionsUz,
      url: prac.lessonId.startsWith("py-")
        ? `/learn?tab=python-dev&lesson=${prac.lessonId}`
        : prac.lessonId.startsWith("hf-")
        ? "/learn/hugging-face-llm-course"
        : `/learn/${prac.aliases?.[0] ?? prac.lessonId}`,
    })),
  ];

  return {
    version: 1,
    generatedAt,
    documents: [
      ...repository.lessons.flatMap(lessonDocuments),
      ...repository.glossary.map(glossaryDocument),
      ...repository.visualizations.map(visualizationDocument),
      ...courseDocs,
      ...conceptDocs,
      ...paperDocs,
      ...practiceDocs,
    ],
  };
}
