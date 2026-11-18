import type { Category, Lesson, LessonNavigation, LessonSummary, SidebarGroup } from "./types";

/** Resolves a lesson reference (id first, then slug). */
export function createLessonResolver<T extends Pick<Lesson, "id" | "slug">>(lessons: readonly T[]) {
  const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const bySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));
  return (ref: string): T | undefined => byId.get(ref) ?? bySlug.get(ref);
}

/**
 * Canonical reading order: category order → lesson order → title.
 * Lessons with an unknown category sort last.
 */
export function sortLessons<T extends Pick<Lesson, "category" | "order" | "title">>(
  lessons: readonly T[],
  categories: readonly Category[],
): T[] {
  const categoryOrder = new Map(categories.map((category) => [category.id, category.order]));
  return [...lessons].sort((a, b) => {
    const ca = categoryOrder.get(a.category) ?? Number.MAX_SAFE_INTEGER;
    const cb = categoryOrder.get(b.category) ?? Number.MAX_SAFE_INTEGER;
    if (ca !== cb) return ca - cb;
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title, "uz");
  });
}

export function getLessonNavigation(
  sorted: ReadonlyArray<Pick<Lesson, "slug" | "title">>,
  slug: string,
): LessonNavigation {
  const index = sorted.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) return { previous: null, next: null };
  const prev = sorted[index - 1];
  const next = sorted[index + 1];
  return {
    previous: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}

export function toSummary(lesson: Lesson): LessonSummary {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    category: lesson.category,
    difficulty: lesson.difficulty,
    order: lesson.order,
    tags: lesson.tags,
    status: lesson.status,
    readingMinutes: lesson.readingMinutes,
    prerequisites: lesson.prerequisites,
    visualizations: lesson.visualizations,
  };
}

/** Sidebar groups in reading order; categories without visible lessons are omitted. */
export function buildSidebar(sortedLessons: readonly LessonSummary[], categories: readonly Category[]): SidebarGroup[] {
  const groups = new Map<string, LessonSummary[]>();
  for (const lesson of sortedLessons) {
    const list = groups.get(lesson.category) ?? [];
    list.push(lesson);
    groups.set(lesson.category, list);
  }
  const ordered = [...categories].sort((a, b) => a.order - b.order);
  const result: SidebarGroup[] = [];
  for (const category of ordered) {
    const lessons = groups.get(category.id);
    if (lessons && lessons.length > 0) result.push({ category, lessons });
  }
  return result;
}

export type RelationReason = "explicit" | "prerequisite" | "next-step" | "shared-tags";

export interface RelatedLesson {
  lesson: LessonSummary;
  reason: RelationReason;
  sharedTags: string[];
}

/**
 * Related lessons derived ONLY from metadata:
 * 1. explicit `related` links (either direction)
 * 2. prerequisites of this lesson
 * 3. lessons that list this lesson as a prerequisite
 * 4. lessons sharing tags (ranked by overlap, same category first)
 */
export function getRelatedLessons(
  lesson: Pick<Lesson, "id" | "slug" | "related" | "prerequisites" | "tags" | "category">,
  all: readonly Lesson[],
  limit = 6,
): RelatedLesson[] {
  const resolve = createLessonResolver(all);
  const result: RelatedLesson[] = [];
  const seen = new Set<string>([lesson.id]);
  const push = (candidate: Lesson | undefined, reason: RelationReason, sharedTags: string[] = []) => {
    if (!candidate || seen.has(candidate.id)) return;
    seen.add(candidate.id);
    result.push({ lesson: toSummary(candidate), reason, sharedTags });
  };

  for (const ref of lesson.related) push(resolve(ref), "explicit");
  for (const other of all) {
    if (other.related.some((ref) => ref === lesson.id || ref === lesson.slug)) push(other, "explicit");
  }
  for (const ref of lesson.prerequisites) push(resolve(ref), "prerequisite");
  for (const other of all) {
    if (other.prerequisites.some((ref) => ref === lesson.id || ref === lesson.slug)) push(other, "next-step");
  }

  const tags = new Set(lesson.tags.map((tag) => tag.toLowerCase()));
  if (tags.size > 0) {
    const scored = all
      .filter((other) => !seen.has(other.id))
      .map((other) => {
        const shared = other.tags.filter((tag) => tags.has(tag.toLowerCase()));
        return { other, shared, score: shared.length * 10 + (other.category === lesson.category ? 1 : 0) };
      })
      .filter((entry) => entry.shared.length > 0)
      .sort((a, b) => b.score - a.score || a.other.title.localeCompare(b.other.title, "uz"));
    for (const entry of scored) push(entry.other, "shared-tags", entry.shared);
  }

  return result.slice(0, limit);
}
