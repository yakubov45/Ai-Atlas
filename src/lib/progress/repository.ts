import { STORAGE_PREFIX, type KeyValueStorage } from "@/lib/storage/storage";
import type {
  LearningDepth,
  OnboardingProfile,
  SpecializationId,
} from "@/lib/curriculum/paths";
import type { AiEngineerTrackId } from "@/lib/curriculum/ai-engineer";
import type { MlDsTrackId } from "@/lib/curriculum/ml-ds";

/**
 * Learning progress persistence.
 *
 * `LearningRepository` is the seam for future persistent storage (e.g. a
 * user account backend). Ships a LocalStorage implementation for guests;
 * nothing outside this folder knows where data is stored.
 */

export type BookmarkKind = "lesson" | "visualization";

export interface Bookmark {
  kind: BookmarkKind;
  id: string;
  addedAt: string;
}

export interface LastVisited {
  lessonId: string;
  slug: string;
  title: string;
  visitedAt: string;
  /** Scroll progress 0..1 at the time of the last visit. */
  progress: number;
}

export type LessonMode = "guided" | "reference";

export interface DetourReturnTarget {
  lessonId: string;
  depth: LearningDepth;
  stepIndex: number;
}

export interface PracticeSubmission {
  code: string;
  testsPassed: boolean;
  attemptCount: number;
  lastRunAt: string;
  passedAt?: string;
  hintsRevealed: number;
}

export interface LearningState {
  version: 1;
  /** Completed lesson ids → completion timestamp. Only set by explicit user action. */
  completed: Record<string, { completedAt: string }>;
  /** Keyed by `${kind}:${id}`. */
  bookmarks: Record<string, Bookmark>;
  lastVisited: LastVisited | null;
  /** Selected specialization path (ML Engineer, LLM Engineer, AI Agent Engineer, etc.) */
  selectedPathId: SpecializationId | null;
  /** Selected AI Engineer 20-Phase Track (general-ai, llm-apps, rag-engineer, agent-mcp, local-ai, multimodal) */
  selectedAiTrackId: AiEngineerTrackId | null;
  /** Selected ML & Data Science 31-Phase Track (ml-engineer, data-scientist, ai-engineer-bridge) */
  selectedMlDsTrackId: MlDsTrackId | null;
  /** Optional skippable onboarding profile */
  onboarding: OnboardingProfile | null;
  /** Completed depths per lessonId: e.g. { "transformers": ["overview", "understand"] }. Completing overview does NOT mark master complete. */
  completedDepths: Record<string, LearningDepth[]>;
  /** Completed atomic micro-lesson ids → completion timestamp */
  completedMicroLessons: Record<string, { completedAt: string }>;
  /** Concepts explicitly marked as "Already Known" ("Allaqachon bilaman") */
  knownConcepts: Record<string, { markedAt: string }>;
  /** Preferred lesson view mode: Guided (Step-by-step) or Reference (Full Article) */
  preferredLessonMode: LessonMode;
  /** Exact return state when a student clicks "Tushunmadim" and detours to a prerequisite micro-lesson */
  detourReturnTo: DetourReturnTarget | null;
  /** Saved step per micro-lesson so Guided Mode restores the exact step on revisit */
  lastMicroStep: Record<string, { depth: LearningDepth; stepIndex: number }>;
  /** Saved student practice attempts and test pass records: key `${lessonId}:${exerciseId}:${depth}` */
  practiceSubmissions: Record<string, PracticeSubmission>;
}

export const EMPTY_LEARNING_STATE: LearningState = Object.freeze({
  version: 1,
  completed: Object.freeze({}) as LearningState["completed"],
  bookmarks: Object.freeze({}) as LearningState["bookmarks"],
  lastVisited: null,
  selectedPathId: null,
  selectedAiTrackId: null,
  selectedMlDsTrackId: null,
  onboarding: null,
  completedDepths: Object.freeze({}) as LearningState["completedDepths"],
  completedMicroLessons: Object.freeze({}) as LearningState["completedMicroLessons"],
  knownConcepts: Object.freeze({}) as LearningState["knownConcepts"],
  preferredLessonMode: "guided",
  detourReturnTo: null,
  lastMicroStep: Object.freeze({}) as LearningState["lastMicroStep"],
  practiceSubmissions: Object.freeze({}) as LearningState["practiceSubmissions"],
}) as LearningState;

export interface LearningRepository {
  read(): LearningState;
  write(state: LearningState): void;
  clear(): void;
  /** Notifies when state changes outside this tab (optional). */
  subscribe?(listener: () => void): () => void;
}

export const LEARNING_STORAGE_KEY = `${STORAGE_PREFIX}learning:v1`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const VALID_PATHS = new Set<SpecializationId>([
  "llm-engineer",
  "ml-engineer",
  "agent-engineer",
  "deep-learning",
  "mlops-engineer",
]);

const VALID_AI_TRACKS = new Set<AiEngineerTrackId>([
  "general-ai",
  "llm-apps",
  "rag-engineer",
  "agent-mcp",
  "local-ai",
  "multimodal",
]);

const VALID_MLDS_TRACKS = new Set<MlDsTrackId>([
  "ml-engineer",
  "data-scientist",
  "ai-engineer-bridge",
]);

const VALID_DEPTHS = new Set<LearningDepth>(["overview", "understand", "master"]);

/** Defensive parsing — corrupted or tampered storage must never crash the UI. */
export function sanitizeLearningState(value: unknown): LearningState {
  if (!isRecord(value) || value.version !== 1) {
    return {
      ...EMPTY_LEARNING_STATE,
      completed: {},
      bookmarks: {},
      completedDepths: {},
      completedMicroLessons: {},
      knownConcepts: {},
      lastMicroStep: {},
    };
  }
  const completed: LearningState["completed"] = {};
  if (isRecord(value.completed)) {
    for (const [id, entry] of Object.entries(value.completed)) {
      if (isRecord(entry) && typeof entry.completedAt === "string") {
        completed[id] = { completedAt: entry.completedAt };
      }
    }
  }
  const bookmarks: LearningState["bookmarks"] = {};
  if (isRecord(value.bookmarks)) {
    for (const entry of Object.values(value.bookmarks)) {
      if (
        isRecord(entry) &&
        (entry.kind === "lesson" || entry.kind === "visualization") &&
        typeof entry.id === "string" &&
        typeof entry.addedAt === "string"
      ) {
        bookmarks[`${entry.kind}:${entry.id}`] = {
          kind: entry.kind,
          id: entry.id,
          addedAt: entry.addedAt,
        };
      }
    }
  }
  let lastVisited: LastVisited | null = null;
  const lv = value.lastVisited;
  if (
    isRecord(lv) &&
    typeof lv.lessonId === "string" &&
    typeof lv.slug === "string" &&
    typeof lv.title === "string" &&
    typeof lv.visitedAt === "string"
  ) {
    const progress =
      typeof lv.progress === "number" && Number.isFinite(lv.progress)
        ? Math.min(1, Math.max(0, lv.progress))
        : 0;
    lastVisited = {
      lessonId: lv.lessonId,
      slug: lv.slug,
      title: lv.title,
      visitedAt: lv.visitedAt,
      progress,
    };
  }

  const selectedPathId =
    typeof value.selectedPathId === "string" &&
    VALID_PATHS.has(value.selectedPathId as SpecializationId)
      ? (value.selectedPathId as SpecializationId)
      : null;

  const selectedAiTrackId =
    typeof value.selectedAiTrackId === "string" &&
    VALID_AI_TRACKS.has(value.selectedAiTrackId as AiEngineerTrackId)
      ? (value.selectedAiTrackId as AiEngineerTrackId)
      : null;

  const selectedMlDsTrackId =
    typeof value.selectedMlDsTrackId === "string" &&
    VALID_MLDS_TRACKS.has(value.selectedMlDsTrackId as MlDsTrackId)
      ? (value.selectedMlDsTrackId as MlDsTrackId)
      : null;

  let onboarding: OnboardingProfile | null = null;
  if (isRecord(value.onboarding)) {
    const ob = value.onboarding;
    const currentLevel =
      ob.currentLevel === "beginner" ||
      ob.currentLevel === "intermediate" ||
      ob.currentLevel === "advanced"
        ? ob.currentLevel
        : "beginner";
    const pythonComfort =
      ob.pythonComfort === "none" ||
      ob.pythonComfort === "basic" ||
      ob.pythonComfort === "comfortable"
        ? ob.pythonComfort
        : "basic";
    const mathComfort =
      ob.mathComfort === "overview" ||
      ob.mathComfort === "formulas" ||
      ob.mathComfort === "derivations"
        ? ob.mathComfort
        : "formulas";
    const preferredStyle =
      ob.preferredStyle === "visual" ||
      ob.preferredStyle === "code" ||
      ob.preferredStyle === "math" ||
      ob.preferredStyle === "balanced"
        ? ob.preferredStyle
        : "balanced";
    onboarding = {
      currentLevel,
      pythonComfort,
      mathComfort,
      preferredStyle,
      ...(typeof ob.completedOnboardingAt === "string"
        ? { completedOnboardingAt: ob.completedOnboardingAt }
        : {}),
    };
  }

  const completedDepths: Record<string, LearningDepth[]> = {};
  if (isRecord(value.completedDepths)) {
    for (const [lessonId, list] of Object.entries(value.completedDepths)) {
      if (Array.isArray(list)) {
        const filtered = Array.from(
          new Set(
            list.filter(
              (item): item is LearningDepth =>
                typeof item === "string" && VALID_DEPTHS.has(item as LearningDepth),
            ),
          ),
        );
        if (filtered.length > 0) completedDepths[lessonId] = filtered;
      }
    }
  }

  const completedMicroLessons: Record<string, { completedAt: string }> = {};
  if (isRecord(value.completedMicroLessons)) {
    for (const [id, entry] of Object.entries(value.completedMicroLessons)) {
      if (isRecord(entry) && typeof entry.completedAt === "string") {
        completedMicroLessons[id] = { completedAt: entry.completedAt };
      }
    }
  }

  const knownConcepts: Record<string, { markedAt: string }> = {};
  if (isRecord(value.knownConcepts)) {
    for (const [id, entry] of Object.entries(value.knownConcepts)) {
      if (isRecord(entry) && typeof entry.markedAt === "string") {
        knownConcepts[id] = { markedAt: entry.markedAt };
      }
    }
  }

  const preferredLessonMode: LessonMode =
    value.preferredLessonMode === "reference" ? "reference" : "guided";

  let detourReturnTo: DetourReturnTarget | null = null;
  if (
    isRecord(value.detourReturnTo) &&
    typeof value.detourReturnTo.lessonId === "string" &&
    typeof value.detourReturnTo.depth === "string" &&
    VALID_DEPTHS.has(value.detourReturnTo.depth as LearningDepth) &&
    typeof value.detourReturnTo.stepIndex === "number" &&
    Number.isInteger(value.detourReturnTo.stepIndex) &&
    value.detourReturnTo.stepIndex >= 0
  ) {
    detourReturnTo = {
      lessonId: value.detourReturnTo.lessonId,
      depth: value.detourReturnTo.depth as LearningDepth,
      stepIndex: value.detourReturnTo.stepIndex,
    };
  }

  const lastMicroStep: Record<string, { depth: LearningDepth; stepIndex: number }> = {};
  if (isRecord(value.lastMicroStep)) {
    for (const [lessonId, entry] of Object.entries(value.lastMicroStep)) {
      if (
        isRecord(entry) &&
        typeof entry.depth === "string" &&
        VALID_DEPTHS.has(entry.depth as LearningDepth) &&
        typeof entry.stepIndex === "number" &&
        Number.isInteger(entry.stepIndex) &&
        entry.stepIndex >= 0
      ) {
        lastMicroStep[lessonId] = {
          depth: entry.depth as LearningDepth,
          stepIndex: entry.stepIndex,
        };
      }
    }
  }

  const practiceSubmissions: Record<string, PracticeSubmission> = {};
  if (isRecord(value.practiceSubmissions)) {
    for (const [key, entry] of Object.entries(value.practiceSubmissions)) {
      if (
        isRecord(entry) &&
        typeof entry.code === "string" &&
        typeof entry.testsPassed === "boolean" &&
        typeof entry.attemptCount === "number" &&
        typeof entry.lastRunAt === "string"
      ) {
        practiceSubmissions[key] = {
          code: entry.code,
          testsPassed: entry.testsPassed,
          attemptCount: entry.attemptCount,
          lastRunAt: entry.lastRunAt,
          ...(typeof entry.passedAt === "string" ? { passedAt: entry.passedAt } : {}),
          hintsRevealed: typeof entry.hintsRevealed === "number" ? entry.hintsRevealed : 0,
        };
      }
    }
  }

  return {
    version: 1,
    completed,
    bookmarks,
    lastVisited,
    selectedPathId,
    selectedAiTrackId,
    selectedMlDsTrackId,
    onboarding,
    completedDepths,
    completedMicroLessons,
    knownConcepts,
    preferredLessonMode,
    detourReturnTo,
    lastMicroStep,
    practiceSubmissions,
  };
}

export class StorageLearningRepository implements LearningRepository {
  constructor(
    private readonly storage: KeyValueStorage,
    private readonly key: string = LEARNING_STORAGE_KEY,
  ) {}

  read(): LearningState {
    const raw = this.storage.getItem(this.key);
    if (!raw) return sanitizeLearningState(null);
    try {
      return sanitizeLearningState(JSON.parse(raw));
    } catch {
      return sanitizeLearningState(null);
    }
  }

  write(state: LearningState): void {
    try {
      this.storage.setItem(this.key, JSON.stringify(state));
    } catch {
      // Quota exceeded / storage disabled — progress stays in memory for this session.
    }
  }

  clear(): void {
    this.storage.removeItem(this.key);
  }

  subscribe(listener: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    const handler = (event: StorageEvent) => {
      if (event.key === this.key || event.key === null) listener();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }
}
