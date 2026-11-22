/**
 * AI Atlas Learning OS — Canonical Progress Synchronization & Knowledge Gap Analyzer
 *
 * Prevents double-counting when the same canonical lesson appears in multiple tracks
 * (e.g. Hugging Face LLM Course <-> MDX Core <-> AI Engineer <-> Python Developer <-> ML/DS).
 * Also identifies genuine prerequisite gaps for the Dashboard and Roadmap without fabricating stats.
 */

import type { LearningState } from "@/lib/progress/repository";
import { HF_CANONICAL_EQUIVALENCE_MAP } from "@/lib/curriculum/hf-llm-course";
import { CANONICAL_CONCEPTS } from "@/lib/knowledge-graph/concepts";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import { resolveConceptIdFromEntity } from "./relationships";

/**
 * Equivalence groups: all IDs inside a group represent ONE canonical concept/lesson unit
 * for global deduplicated progress statistics.
 */
const CANONICAL_EQUIVALENCE_PAIRS: ReadonlyArray<[string, string]> = [
  ["py-01-01", "python-basics"],
  ["py-06-01", "functions"],
  ["hf-01-04-01", "tokenization"],
  ["hf-01-04-02", "transformers"],
  ["dl-transformer", "transformers"],
  ["dl-cnn", "cnn"],
  ["dl-rnn", "rnn"],
  ["dl-lstm", "lstm"],
  ["mlds-11-13", "gradient-descent"],
  ["mlds-11-04", "hosila"],
  ["mlds-11-09", "gradient"],
  ["mlds-01-01", "artificial-intelligence"],
  ["14.06", "rag"],
  ["17.05", "ai-agent"],
  ["12.07", "vector"],
  ...Object.entries(HF_CANONICAL_EQUIVALENCE_MAP)
    .filter(([, meta]) => Boolean(meta.existingLessonId))
    .map(([hfId, meta]) => [hfId, meta.existingLessonId as string] as [string, string]),
];

const CANONICAL_ROOT_MAP = new Map<string, string>();
for (const [alias, canonical] of CANONICAL_EQUIVALENCE_PAIRS) {
  CANONICAL_ROOT_MAP.set(alias, canonical);
}

/** Resolves any lesson/micro-lesson/architecture alias to its canonical deduplication key. */
export function resolveCanonicalProgressKey(id: string): string {
  return CANONICAL_ROOT_MAP.get(id) ?? id;
}

export interface UnifiedProgressStats {
  /** Deduplicated completed lesson IDs across MDX + all micro-lessons */
  uniqueCompletedCount: number;
  /** Distinct MDX canonical lessons completed */
  mdxCompletedCount: number;
  /** Distinct micro-lessons completed across academies */
  microCompletedCount: number;
  /** User-declared "Already Know" concepts (strictly separated from verified completion) */
  knownConceptsCount: number;
  /** Passed interactive Pyodide coding exercises */
  passedExercisesCount: number;
  /** Total bookmarks */
  bookmarksCount: number;
  /** List of deduplicated completed keys */
  uniqueCompletedKeys: string[];
}

export function computeUnifiedProgressStats(
  state: LearningState,
  publishedMdxIds: readonly string[],
): UnifiedProgressStats {
  const mdxSet = new Set(publishedMdxIds);
  const mdxCompletedCount = publishedMdxIds.filter((id) => id in state.completed).length;

  const uniqueKeys = new Set<string>();
  for (const id of Object.keys(state.completed)) {
    uniqueKeys.add(resolveCanonicalProgressKey(id));
  }
  for (const id of Object.keys(state.completedMicroLessons)) {
    uniqueKeys.add(resolveCanonicalProgressKey(id));
  }

  const microCompletedCount = Object.keys(state.completedMicroLessons).length;
  const knownConceptsCount = Object.keys(state.knownConcepts).length;
  const passedExercisesCount = Object.values(state.practiceSubmissions).filter(
    (s) => s.testsPassed,
  ).length;
  const bookmarksCount = Object.keys(state.bookmarks).length;

  // Also ensure mdxSet count accuracy if someone tracked via depth or completed
  void mdxSet;

  return {
    uniqueCompletedCount: uniqueKeys.size,
    mdxCompletedCount,
    microCompletedCount,
    knownConceptsCount,
    passedExercisesCount,
    bookmarksCount,
    uniqueCompletedKeys: Array.from(uniqueKeys),
  };
}

/**
 * Checks whether a canonical ID (or any of its equivalences) is completed by the student.
 */
export function isCanonicalItemCompleted(state: LearningState, id: string): boolean {
  if (id in state.completed || id in state.completedMicroLessons) return true;
  const root = resolveCanonicalProgressKey(id);
  if (root in state.completed || root in state.completedMicroLessons) return true;
  for (const [alias, target] of CANONICAL_EQUIVALENCE_PAIRS) {
    if (target === root && (alias in state.completed || alias in state.completedMicroLessons)) {
      return true;
    }
  }
  return false;
}

export interface KnowledgeGapItem {
  conceptId: string;
  conceptNameUz: string;
  conceptNameEn: string;
  requiredForUz: string;
  href: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

/**
 * Finds genuine knowledge gaps: prerequisites of topics the learner is studying (or in their track)
 * that have NOT yet been marked Completed or Known.
 */
export function detectKnowledgeGaps(state: LearningState): KnowledgeGapItem[] {
  const completedKeys = new Set<string>([
    ...Object.keys(state.completed).map(resolveCanonicalProgressKey),
    ...Object.keys(state.completedMicroLessons).map(resolveCanonicalProgressKey),
    ...Object.keys(state.knownConcepts),
  ]);

  const conceptDone = (conceptId: string) => {
    if (completedKeys.has(conceptId)) return true;
    const concept = CANONICAL_CONCEPTS.find((c) => c.id === conceptId);
    if (!concept) return false;
    return concept.crossTrackLessonLinks.some((link) =>
      completedKeys.has(resolveCanonicalProgressKey(link.lessonId)),
    );
  };

  const gaps: KnowledgeGapItem[] = [];
  const seenGapIds = new Set<string>();

  // If user has visited a lesson, prioritize its uncompleted prerequisites first
  const visitedSlug = state.lastVisited?.slug;
  if (visitedSlug) {
    const resolvedId = resolveConceptIdFromEntity(visitedSlug);
    const matchedConcept =
      (resolvedId ? CANONICAL_CONCEPTS.find((c) => c.id === resolvedId) : undefined) ??
      CANONICAL_CONCEPTS.find((c) =>
        c.crossTrackLessonLinks.some((l) => l.lessonId === visitedSlug || l.href.endsWith(`/${visitedSlug}`)),
      );
    if (matchedConcept) {
      for (const rel of CONCEPT_RELATIONS) {
        if (rel.target === matchedConcept.id && (rel.type === "REQUIRES" || rel.type === "RECOMMENDED_BEFORE")) {
          if (!conceptDone(rel.source) && !seenGapIds.has(rel.source)) {
            const prereq = CANONICAL_CONCEPTS.find((c) => c.id === rel.source);
            if (prereq) {
              seenGapIds.add(prereq.id);
              gaps.push({
                conceptId: prereq.id,
                conceptNameUz: prereq.nameUz,
                conceptNameEn: prereq.name,
                requiredForUz: matchedConcept.nameUz,
                href: prereq.crossTrackLessonLinks[0]?.href ?? "/learn/map",
                difficulty: prereq.difficulty,
              });
            }
          }
        }
      }
    }
  }

  // Also include uncompleted foundational prerequisites for the user's selected specialization if any
  if (gaps.length < 4 && state.selectedPathId) {
    for (const rel of CONCEPT_RELATIONS) {
      if (rel.type === "REQUIRES" && !conceptDone(rel.source) && conceptDone(rel.target) === false) {
        const prereq = CANONICAL_CONCEPTS.find((c) => c.id === rel.source);
        const target = CANONICAL_CONCEPTS.find((c) => c.id === rel.target);
        if (prereq && target && prereq.difficulty === "beginner" && !seenGapIds.has(prereq.id)) {
          seenGapIds.add(prereq.id);
          gaps.push({
            conceptId: prereq.id,
            conceptNameUz: prereq.nameUz,
            conceptNameEn: prereq.name,
            requiredForUz: target.nameUz,
            href: prereq.crossTrackLessonLinks[0]?.href ?? "/learn/map",
            difficulty: prereq.difficulty,
          });
          if (gaps.length >= 4) break;
        }
      }
    }
  }

  return gaps;
}
