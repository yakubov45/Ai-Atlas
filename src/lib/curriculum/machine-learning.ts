/**
 * Machine Learning Engineering Track Curriculum Registry (`mle-2026`).
 *
 * Source of truth: `machine_learning_track.json`
 * Canonical lesson resolution: `ml-ds-520-dataset.ts` (shared canonical source of truth)
 *
 * Requirements:
 * - 22 navigation phases (`mle-01` .. `mle-22`)
 * - 466 canonical lesson references (`mlds-*`)
 * - 0 new DS extensions
 * - Preserves all 520 canonical IDs and existing published statuses
 * - Track-specific mini-projects, visual lab specs, and completion policies
 */

import rawMlTrack from "@/content/curriculum/machine-learning-track.json";
import { getMlDs520LessonById, type MlDs520LessonItem } from "./ml-ds-520-dataset";

export interface MlMiniProject {
  titleUz: string;
  origin: string;
  requirementsUz: readonly string[];
  completionRule: string;
}

export interface MlVisualLabSpec {
  titleUz: string;
  status: string;
  implementation: string;
  inputRequirements: readonly string[];
  outputRequirements: readonly string[];
  tests: readonly string[];
}

export interface MlCompletionPolicy {
  quizPassPercentage: number;
  codingTasksMin: number;
  humanReviewForCapstone: boolean;
}

export interface MlPhase {
  id: string; // e.g. "mle-01" .. "mle-22"
  order: number;
  titleUz: string;
  level: "core" | "elective" | "advanced";
  sourcePhaseIds: readonly string[];
  lessonIds: readonly string[];
  lessonCount: number;
  outcomeUz: string;
  miniProject: MlMiniProject;
  visualLab: MlVisualLabSpec;
  requiresPreviousTrackPhase: string | null;
  requiresPythonAcademy: string | null;
  completionPolicy: MlCompletionPolicy;
  lessons: readonly MlDs520LessonItem[];
}

export const MACHINE_LEARNING_PHASES: readonly MlPhase[] = rawMlTrack.phases.map(
  (rawPhase) => {
    const resolvedLessons: MlDs520LessonItem[] = [];

    for (const lessonId of rawPhase.lesson_ids) {
      const canonical = getMlDs520LessonById(lessonId);
      if (canonical) {
        resolvedLessons.push(canonical);
      } else {
        // Fallback placeholder if not yet populated in dataset
        resolvedLessons.push({
          id: lessonId,
          phaseId: rawPhase.source_phase_ids[0] ?? "mlds-01",
          order: resolvedLessons.length + 1,
          title: `Dars ${lessonId}`,
          status: "planned",
          learningObjectiveUz: `${lessonId} darsining o‘quv maqsadi`,
          theoryUz: `${lessonId} bo‘yicha nazariy qism`,
          examples: [],
          commonMistakes: [],
          quiz: [],
          practiceTasks: [],
          summaryTakeaways: [],
          pythonPrerequisites: [],
          aiRelatedLessons: [],
          visualLabId: "mlds-lab-01",
        });
      }
    }

    return {
      id: rawPhase.id,
      order: rawPhase.order,
      titleUz: rawPhase.title_uz,
      level: rawPhase.level as "core" | "elective" | "advanced",
      sourcePhaseIds: rawPhase.source_phase_ids,
      lessonIds: rawPhase.lesson_ids,
      lessonCount: rawPhase.lesson_count,
      outcomeUz: rawPhase.outcome_uz,
      miniProject: {
        titleUz: rawPhase.mini_project.title_uz,
        origin: rawPhase.mini_project.origin,
        requirementsUz: rawPhase.mini_project.requirements_uz,
        completionRule: rawPhase.mini_project.completion_rule,
      },
      visualLab: {
        titleUz: rawPhase.visual_lab.title_uz,
        status: rawPhase.visual_lab.status,
        implementation: rawPhase.visual_lab.implementation,
        inputRequirements: rawPhase.visual_lab.input_requirements,
        outputRequirements: rawPhase.visual_lab.output_requirements,
        tests: rawPhase.visual_lab.tests,
      },
      requiresPreviousTrackPhase: rawPhase.requires_previous_track_phase ?? null,
      requiresPythonAcademy: rawPhase.requires_python_academy ?? null,
      completionPolicy: {
        quizPassPercentage: rawPhase.completion_policy.quiz_pass_percentage,
        codingTasksMin: rawPhase.completion_policy.coding_tasks_min,
        humanReviewForCapstone: rawPhase.completion_policy.human_review_for_capstone,
      },
      lessons: resolvedLessons,
    };
  }
);

export const TOTAL_ML_MICRO_LESSONS = MACHINE_LEARNING_PHASES.reduce(
  (sum, p) => sum + p.lessons.length,
  0
);

export function getMlPhaseById(phaseId: string): MlPhase | undefined {
  return MACHINE_LEARNING_PHASES.find((p) => p.id === phaseId);
}

export function getMlLessonById(
  lessonId: string
): { phase: MlPhase; lesson: MlDs520LessonItem } | undefined {
  for (const phase of MACHINE_LEARNING_PHASES) {
    const found = phase.lessons.find((l) => l.id === lessonId);
    if (found) {
      return { phase, lesson: found };
    }
  }
  return undefined;
}

export function getMlTrackStats(): {
  phaseCount: number;
  totalLessonReferences: number;
  publishedCount: number;
  plannedCount: number;
} {
  let published = 0;
  let planned = 0;
  for (const phase of MACHINE_LEARNING_PHASES) {
    for (const l of phase.lessons) {
      if (l.status === "published") published++;
      else planned++;
    }
  }
  return {
    phaseCount: MACHINE_LEARNING_PHASES.length,
    totalLessonReferences: TOTAL_ML_MICRO_LESSONS,
    publishedCount: published,
    plannedCount: planned,
  };
}

export function validateMlTrackGraph(): {
  valid: boolean;
  missingLessonIds: string[];
  orphanPhases: string[];
} {
  const missingLessonIds: string[] = [];
  const orphanPhases: string[] = [];

  for (const phase of MACHINE_LEARNING_PHASES) {
    if (phase.requiresPreviousTrackPhase) {
      const prev = MACHINE_LEARNING_PHASES.find(
        (p) => p.id === phase.requiresPreviousTrackPhase
      );
      if (!prev) {
        orphanPhases.push(phase.id);
      }
    }
    for (const lId of phase.lessonIds) {
      if (!getMlDs520LessonById(lId)) {
        missingLessonIds.push(lId);
      }
    }
  }

  return {
    valid: missingLessonIds.length === 0 && orphanPhases.length === 0,
    missingLessonIds,
    orphanPhases,
  };
}
