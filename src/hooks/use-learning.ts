"use client";

import { useSyncExternalStore } from "react";
import {
  computeProgress,
  getLearningStore,
  getServerLearningSnapshot,
  type ProgressSummary,
} from "@/lib/progress/store";
import type {
  BookmarkKind,
  DetourReturnTarget,
  LastVisited,
  LearningState,
  LessonMode,
  PracticeSubmission,
} from "@/lib/progress/repository";
import type {
  LearningDepth,
  OnboardingProfile,
  SpecializationId,
} from "@/lib/curriculum/paths";
import type { AiEngineerTrackId } from "@/lib/curriculum/ai-engineer";
import type { MlDsTrackId } from "@/lib/curriculum/ml-ds";

export function useLearning(): {
  state: LearningState;
  isCompleted: (lessonId: string) => boolean;
  toggleCompleted: (lessonId: string) => void;
  setCompleted: (lessonId: string, completed: boolean) => void;
  isBookmarked: (kind: BookmarkKind, id: string) => boolean;
  toggleBookmark: (kind: BookmarkKind, id: string) => void;
  removeBookmark: (kind: BookmarkKind, id: string) => void;
  recordVisit: (visit: Omit<LastVisited, "visitedAt" | "progress"> & { progress?: number }) => void;
  updateVisitProgress: (lessonId: string, progress: number) => void;
  setSelectedPath: (pathId: SpecializationId | null) => void;
  setSelectedAiTrack: (trackId: AiEngineerTrackId | null) => void;
  setSelectedMlDsTrack: (trackId: MlDsTrackId | null) => void;
  setOnboarding: (profile: OnboardingProfile | null) => void;
  isDepthCompleted: (lessonId: string, depth: LearningDepth) => boolean;
  setDepthCompleted: (lessonId: string, depth: LearningDepth, done: boolean) => void;
  isMicroLessonCompleted: (microLessonId: string) => boolean;
  setMicroLessonCompleted: (microLessonId: string, done: boolean) => void;
  toggleMicroLessonCompleted: (microLessonId: string) => void;
  isConceptKnown: (lessonId: string) => boolean;
  toggleConceptKnown: (lessonId: string) => void;
  setPreferredLessonMode: (mode: LessonMode) => void;
  setDetourReturnTo: (target: DetourReturnTarget | null) => void;
  setLastMicroStep: (lessonId: string, depth: LearningDepth, stepIndex: number) => void;
  savePracticeSubmission: (lessonId: string, exerciseId: string, depth: LearningDepth, submission: PracticeSubmission) => void;
  getPracticeSubmission: (lessonId: string, exerciseId: string, depth: LearningDepth) => PracticeSubmission | null;
  isPracticePassed: (lessonId: string, exerciseId: string, depth: LearningDepth) => boolean;
  exportJson: () => string;
  importJson: (json: string) => boolean;
  reset: () => void;
} {
  const store = getLearningStore();
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerLearningSnapshot,
  );

  return {
    state,
    isCompleted: store.isCompleted,
    toggleCompleted: store.toggleCompleted,
    setCompleted: store.setCompleted,
    isBookmarked: store.isBookmarked,
    toggleBookmark: store.toggleBookmark,
    removeBookmark: store.removeBookmark,
    recordVisit: store.recordVisit,
    updateVisitProgress: store.updateVisitProgress,
    setSelectedPath: store.setSelectedPath,
    setSelectedAiTrack: store.setSelectedAiTrack,
    setSelectedMlDsTrack: store.setSelectedMlDsTrack,
    setOnboarding: store.setOnboarding,
    isDepthCompleted: store.isDepthCompleted,
    setDepthCompleted: store.setDepthCompleted,
    isMicroLessonCompleted: store.isMicroLessonCompleted,
    setMicroLessonCompleted: store.setMicroLessonCompleted,
    toggleMicroLessonCompleted: store.toggleMicroLessonCompleted,
    isConceptKnown: store.isConceptKnown,
    toggleConceptKnown: store.toggleConceptKnown,
    setPreferredLessonMode: store.setPreferredLessonMode,
    setDetourReturnTo: store.setDetourReturnTo,
    setLastMicroStep: store.setLastMicroStep,
    savePracticeSubmission: store.savePracticeSubmission,
    getPracticeSubmission: store.getPracticeSubmission,
    isPracticePassed: store.isPracticePassed,
    exportJson: store.exportJson,
    importJson: store.importJson,
    reset: store.reset,
  };
}

export function useLearningProgress(availableLessonIds: readonly string[]): ProgressSummary {
  const { state } = useLearning();
  return computeProgress(state, availableLessonIds);
}
