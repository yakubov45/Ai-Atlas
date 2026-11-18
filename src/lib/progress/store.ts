import { MemoryStorage, getBrowserStorage } from "@/lib/storage/storage";
import {
  EMPTY_LEARNING_STATE,
  StorageLearningRepository,
  sanitizeLearningState,
  type BookmarkKind,
  type DetourReturnTarget,
  type LastVisited,
  type LearningRepository,
  type LearningState,
  type LessonMode,
  type PracticeSubmission,
} from "./repository";
import type {
  LearningDepth,
  OnboardingProfile,
  SpecializationId,
} from "@/lib/curriculum/paths";
import type { AiEngineerTrackId } from "@/lib/curriculum/ai-engineer";
import type { MlDsTrackId } from "@/lib/curriculum/ml-ds";

/**
 * Observable learning store (framework-agnostic). React binds to it with
 * useSyncExternalStore (see src/hooks/use-learning.ts).
 */

export interface LearningStore {
  getSnapshot(): LearningState;
  subscribe(listener: () => void): () => void;
  isCompleted(lessonId: string): boolean;
  setCompleted(lessonId: string, completed: boolean): void;
  toggleCompleted(lessonId: string): void;
  isBookmarked(kind: BookmarkKind, id: string): boolean;
  toggleBookmark(kind: BookmarkKind, id: string): void;
  removeBookmark(kind: BookmarkKind, id: string): void;
  recordVisit(visit: Omit<LastVisited, "visitedAt" | "progress"> & { progress?: number }): void;
  updateVisitProgress(lessonId: string, progress: number): void;
  // Personalized curriculum & micro-learning methods
  setSelectedPath(pathId: SpecializationId | null): void;
  setSelectedAiTrack(trackId: AiEngineerTrackId | null): void;
  setSelectedMlDsTrack(trackId: MlDsTrackId | null): void;
  setOnboarding(profile: OnboardingProfile | null): void;
  isDepthCompleted(lessonId: string, depth: LearningDepth): boolean;
  setDepthCompleted(lessonId: string, depth: LearningDepth, done: boolean): void;
  isMicroLessonCompleted(microLessonId: string): boolean;
  setMicroLessonCompleted(microLessonId: string, done: boolean): void;
  toggleMicroLessonCompleted(microLessonId: string): void;
  isConceptKnown(lessonId: string): boolean;
  toggleConceptKnown(lessonId: string): void;
  setPreferredLessonMode(mode: LessonMode): void;
  setDetourReturnTo(target: DetourReturnTarget | null): void;
  setLastMicroStep(lessonId: string, depth: LearningDepth, stepIndex: number): void;
  savePracticeSubmission(lessonId: string, exerciseId: string, depth: LearningDepth, submission: PracticeSubmission): void;
  getPracticeSubmission(lessonId: string, exerciseId: string, depth: LearningDepth): PracticeSubmission | null;
  isPracticePassed(lessonId: string, exerciseId: string, depth: LearningDepth): boolean;
  exportJson(): string;
  importJson(json: string): boolean;
  reset(): void;
}

export const bookmarkKey = (kind: BookmarkKind, id: string) => `${kind}:${id}`;

export function createLearningStore(
  repository: LearningRepository,
  now: () => string = () => new Date().toISOString(),
): LearningStore {
  let state = repository.read();
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((listener) => listener());
  const commit = (next: LearningState) => {
    state = next;
    repository.write(state);
    emit();
  };

  function setCompleted(lessonId: string, completed: boolean) {
    if (completed === lessonId in state.completed) return;
    const next = { ...state.completed };
    if (completed) next[lessonId] = { completedAt: now() };
    else delete next[lessonId];
    commit({ ...state, completed: next });
  }

  function setDepthCompleted(lessonId: string, depth: LearningDepth, done: boolean) {
    const existing = state.completedDepths[lessonId] ?? [];
    const hasIt = existing.includes(depth);
    if (done === hasIt) return;
    const nextList = done
      ? [...existing, depth]
      : existing.filter((d) => d !== depth);
    const nextDepths = { ...state.completedDepths };
    if (nextList.length > 0) nextDepths[lessonId] = nextList;
    else delete nextDepths[lessonId];
    commit({ ...state, completedDepths: nextDepths });
  }

  function setMicroLessonCompleted(microLessonId: string, done: boolean) {
    if (done === microLessonId in state.completedMicroLessons) return;
    const next = { ...state.completedMicroLessons };
    if (done) next[microLessonId] = { completedAt: now() };
    else delete next[microLessonId];
    commit({ ...state, completedMicroLessons: next });
  }

  repository.subscribe?.(() => {
    state = repository.read();
    emit();
  });

  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    isCompleted: (lessonId) => lessonId in state.completed,
    setCompleted,
    toggleCompleted(lessonId) {
      setCompleted(lessonId, !(lessonId in state.completed));
    },
    isBookmarked: (kind, id) => bookmarkKey(kind, id) in state.bookmarks,
    toggleBookmark(kind, id) {
      const key = bookmarkKey(kind, id);
      const next = { ...state.bookmarks };
      if (key in next) delete next[key];
      else next[key] = { kind, id, addedAt: now() };
      commit({ ...state, bookmarks: next });
    },
    removeBookmark(kind, id) {
      const key = bookmarkKey(kind, id);
      if (!(key in state.bookmarks)) return;
      const next = { ...state.bookmarks };
      delete next[key];
      commit({ ...state, bookmarks: next });
    },
    recordVisit(visit) {
      const previous = state.lastVisited;
      const progress = Math.min(
        1,
        Math.max(
          0,
          visit.progress ?? (previous?.lessonId === visit.lessonId ? previous.progress : 0),
        ),
      );
      if (
        previous &&
        previous.lessonId === visit.lessonId &&
        previous.slug === visit.slug &&
        previous.title === visit.title &&
        Math.abs(previous.progress - progress) < 0.01
      ) {
        return;
      }
      commit({ ...state, lastVisited: { ...visit, progress, visitedAt: now() } });
    },
    updateVisitProgress(lessonId, progress) {
      const lv = state.lastVisited;
      if (!lv || lv.lessonId !== lessonId) return;
      const clamped = Math.min(1, Math.max(0, progress));
      if (Math.abs(clamped - lv.progress) < 0.01) return;
      commit({ ...state, lastVisited: { ...lv, progress: clamped } });
    },
    setSelectedPath(pathId) {
      if (state.selectedPathId === pathId) return;
      commit({ ...state, selectedPathId: pathId });
    },
    setSelectedAiTrack(trackId) {
      if (state.selectedAiTrackId === trackId) return;
      commit({ ...state, selectedAiTrackId: trackId });
    },
    setSelectedMlDsTrack(trackId) {
      if (state.selectedMlDsTrackId === trackId) return;
      commit({ ...state, selectedMlDsTrackId: trackId });
    },
    setOnboarding(profile) {
      commit({
        ...state,
        onboarding: profile
          ? { ...profile, completedOnboardingAt: profile.completedOnboardingAt ?? now() }
          : null,
      });
    },
    isDepthCompleted(lessonId, depth) {
      return (state.completedDepths[lessonId] ?? []).includes(depth);
    },
    setDepthCompleted,
    isMicroLessonCompleted(microLessonId) {
      return microLessonId in state.completedMicroLessons;
    },
    setMicroLessonCompleted,
    toggleMicroLessonCompleted(microLessonId) {
      setMicroLessonCompleted(
        microLessonId,
        !(microLessonId in state.completedMicroLessons),
      );
    },
    isConceptKnown(lessonId) {
      return lessonId in state.knownConcepts;
    },
    toggleConceptKnown(lessonId) {
      const next = { ...state.knownConcepts };
      if (lessonId in next) delete next[lessonId];
      else next[lessonId] = { markedAt: now() };
      commit({ ...state, knownConcepts: next });
    },
    setPreferredLessonMode(mode) {
      if (state.preferredLessonMode === mode) return;
      commit({ ...state, preferredLessonMode: mode });
    },
    setDetourReturnTo(target) {
      commit({ ...state, detourReturnTo: target });
    },
    setLastMicroStep(lessonId, depth, stepIndex) {
      const existing = state.lastMicroStep[lessonId];
      if (existing && existing.depth === depth && existing.stepIndex === stepIndex) {
        return;
      }
      commit({
        ...state,
        lastMicroStep: {
          ...state.lastMicroStep,
          [lessonId]: { depth, stepIndex },
        },
      });
    },
    savePracticeSubmission(lessonId, exerciseId, depth, submission) {
      const key = `${lessonId}:${exerciseId}:${depth}`;
      commit({
        ...state,
        practiceSubmissions: {
          ...state.practiceSubmissions,
          [key]: submission,
        },
      });
    },
    getPracticeSubmission(lessonId, exerciseId, depth) {
      const key = `${lessonId}:${exerciseId}:${depth}`;
      return state.practiceSubmissions[key] ?? null;
    },
    isPracticePassed(lessonId, exerciseId, depth) {
      const key = `${lessonId}:${exerciseId}:${depth}`;
      return Boolean(state.practiceSubmissions[key]?.testsPassed);
    },
    exportJson: () => JSON.stringify(state, null, 2),
    importJson(json) {
      try {
        const parsed: unknown = JSON.parse(json);
        if (typeof parsed !== "object" || parsed === null || (parsed as { version?: unknown }).version !== 1) return false;
        commit(sanitizeLearningState(parsed));
        return true;
      } catch {
        return false;
      }
    },
    reset() {
      repository.clear();
      state = sanitizeLearningState(null);
      emit();
    },
  };
}

let browserStore: LearningStore | null = null;

/** Browser singleton. Falls back to in-memory storage if localStorage is unavailable. */
export function getLearningStore(): LearningStore {
  if (!browserStore) {
    const storage = getBrowserStorage() ?? new MemoryStorage();
    browserStore = createLearningStore(new StorageLearningRepository(storage));
  }
  return browserStore;
}

export const getServerLearningSnapshot = (): LearningState => EMPTY_LEARNING_STATE;

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export interface ProgressSummary {
  total: number;
  completed: number;
  /** null when there are no available lessons (never show a fabricated %). */
  percent: number | null;
}

/** Progress computed ONLY against lessons that actually exist and are visible. */
export function computeProgress(state: LearningState, availableLessonIds: readonly string[]): ProgressSummary {
  const total = availableLessonIds.length;
  const completed = availableLessonIds.filter((id) => id in state.completed).length;
  return { total, completed, percent: total === 0 ? null : Math.round((completed / total) * 100) };
}
