import fs from "node:fs";
import path from "node:path";
import { getVisibleStatuses, isContentPreview } from "@/config/content";
import { DEFAULT_CONTENT_ROOT, loadContentCollection } from "./loader";
import { buildSidebar, createLessonResolver, getLessonNavigation, getRelatedLessons, sortLessons, toSummary } from "./resolve";
import { validateCollection } from "./validate";
import type {
  Category,
  CategoryWithCount,
  ContentCollection,
  ContentIssue,
  GlossaryTerm,
  Lesson,
  LessonNavigation,
  LessonSummary,
  Reference,
  SidebarGroup,
  VisualizationInstance,
} from "./types";
import type { ContentStatus } from "./schema";

/**
 * Server-side content repository — the single entry point pages use to read
 * content. Applies visibility rules (draft/published) and caches the parsed
 * collection. In development the cache is invalidated whenever any content
 * file changes (cheap mtime signature), so authors see edits immediately.
 */

export interface ContentRepository {
  preview: boolean;
  collection: ContentCollection;
  issues: ContentIssue[];
  lessons: Lesson[];
  categories: CategoryWithCount[];
  glossary: GlossaryTerm[];
  references: Reference[];
  visualizations: VisualizationInstance[];
  getLesson(ref: string): Lesson | undefined;
  getLessonBySlug(slug: string): Lesson | undefined;
  getNavigation(slug: string): LessonNavigation;
  getSidebar(): SidebarGroup[];
  getSummaries(): LessonSummary[];
  getRelated(lesson: Lesson, limit?: number): ReturnType<typeof getRelatedLessons>;
  getReference(id: string): Reference | undefined;
  getGlossaryTerm(id: string): GlossaryTerm | undefined;
  getVisualization(id: string): VisualizationInstance | undefined;
  getCategory(id: string): Category | undefined;
}

export function createContentRepository(
  collection: ContentCollection,
  visibleStatuses: readonly ContentStatus[],
  preview: boolean,
): ContentRepository {
  const visible = new Set(visibleStatuses);
  const issues = [...collection.issues, ...validateCollection(collection)];

  const lessons = sortLessons(
    collection.lessons.filter((lesson) => visible.has(lesson.status)),
    collection.categories,
  );
  const lessonCounts = new Map<string, number>();
  for (const lesson of lessons) lessonCounts.set(lesson.category, (lessonCounts.get(lesson.category) ?? 0) + 1);
  const categories: CategoryWithCount[] = [...collection.categories]
    .sort((a, b) => a.order - b.order)
    .map((category) => ({ ...category, lessonCount: lessonCounts.get(category.id) ?? 0 }))
    .filter((category) => category.lessonCount > 0);

  const glossary = collection.glossary
    .filter((term) => visible.has(term.status))
    .sort((a, b) => a.term.localeCompare(b.term, "uz", { sensitivity: "base" }));
  const visualizations = collection.visualizations.filter((viz) => visible.has(viz.status));

  const resolveLesson = createLessonResolver(lessons);
  const bySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));
  const references = new Map(collection.references.map((reference) => [reference.id, reference]));
  const glossaryById = new Map(glossary.map((term) => [term.id, term]));
  const vizById = new Map(visualizations.map((viz) => [viz.id, viz]));
  const categoryById = new Map(collection.categories.map((category) => [category.id, category]));
  const summaries = lessons.map(toSummary);

  return {
    preview,
    collection,
    issues,
    lessons,
    categories,
    glossary,
    references: collection.references,
    visualizations,
    getLesson: resolveLesson,
    getLessonBySlug: (slug) => bySlug.get(slug),
    getNavigation: (slug) => getLessonNavigation(lessons, slug),
    getSidebar: () => buildSidebar(summaries, collection.categories),
    getSummaries: () => summaries,
    getRelated: (lesson, limit) => getRelatedLessons(lesson, lessons, limit),
    getReference: (id) => references.get(id),
    getGlossaryTerm: (id) => glossaryById.get(id),
    getVisualization: (id) => vizById.get(id),
    getCategory: (id) => categoryById.get(id),
  };
}

// ---------------------------------------------------------------------------
// Cached singleton
// ---------------------------------------------------------------------------

let cached: { signature: string; repository: ContentRepository } | null = null;

function contentSignature(rootDir: string): string {
  if (!fs.existsSync(rootDir)) return "missing";
  const parts: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else parts.push(`${full}:${fs.statSync(full).mtimeMs}`);
    }
  };
  walk(rootDir);
  return parts.sort().join("|");
}

export function getContentRepository(): ContentRepository {
  const preview = isContentPreview();
  const isDev = process.env.NODE_ENV === "development";
  const signature = `${preview}:${isDev ? contentSignature(DEFAULT_CONTENT_ROOT) : "static"}`;
  if (cached && cached.signature === signature) return cached.repository;
  const repository = createContentRepository(loadContentCollection(DEFAULT_CONTENT_ROOT), getVisibleStatuses(preview), preview);
  cached = { signature, repository };
  return repository;
}
