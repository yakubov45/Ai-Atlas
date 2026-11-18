/**
 * Data Science Track Curriculum Registry (`ds-2026`).
 *
 * Source of truth: `data_science_track.json`
 * Canonical lesson resolution: `ml-ds-520-dataset.ts` (shared canonical source of truth)
 *
 * Requirements:
 * - 23 navigation phases (`ds-01` .. `ds-23`)
 * - 376 canonical lesson references (`mlds-*`)
 * - 50 newly proposed Data Science extension lessons (`dsx-*`) marked strictly as
 *   OPTIONAL PROPOSALS (not imported or published without explicit user approval).
 * - Preserves all 520 canonical IDs and existing published statuses.
 * - Track-specific mini-projects, visual lab specs, and completion policies.
 */

import rawDsTrack from "@/content/curriculum/data-science-track.json";
import { getMlDs520LessonById, type MlDs520LessonItem } from "./ml-ds-520-dataset";

export interface DsMiniProject {
  titleUz: string;
  origin: string;
  requirementsUz: readonly string[];
  completionRule: string;
}

export interface DsVisualLabSpec {
  titleUz: string;
  status: string;
  implementation: string;
  inputRequirements: readonly string[];
  outputRequirements: readonly string[];
  tests: readonly string[];
}

export interface DsCompletionPolicy {
  quizPassPercentage: number;
  codingTasksMin: number;
  humanReviewForCapstone: boolean;
}

export interface DsMicroLesson extends MlDs520LessonItem {
  isOptionalProposal?: boolean;
  proposalNote?: string;
}

export interface DsPhase {
  id: string; // e.g. "ds-01" .. "ds-23"
  order: number;
  titleUz: string;
  level: "core" | "supporting" | "advanced";
  sourcePhaseIds: readonly string[];
  lessonIds: readonly string[];
  lessonCount: number;
  outcomeUz: string;
  miniProject: DsMiniProject;
  visualLab: DsVisualLabSpec;
  requiresPreviousTrackPhase: string | null;
  requiresPythonAcademy: string | null;
  completionPolicy: DsCompletionPolicy;
  releaseStatus?: string;
  hasOptionalExtensions: boolean;
  optionalExtensionCount: number;
  lessons: readonly DsMicroLesson[];
}

export const DATA_SCIENCE_PHASES: readonly DsPhase[] = rawDsTrack.phases.map(
  (rawPhase) => {
    const resolvedLessons: DsMicroLesson[] = [];
    let optionalCount = 0;

    for (const lessonId of rawPhase.lesson_ids) {
      if (lessonId.startsWith("dsx-")) {
        optionalCount++;
        // 50 newly proposed Data Science lessons treated as optional proposals
        resolvedLessons.push({
          id: lessonId,
          phaseId: rawPhase.id,
          order: resolvedLessons.length + 1,
          title: `Taklif etilgan DS darsi (${lessonId})`,
          status: "planned",
          isOptionalProposal: true,
          proposalNote:
            "Ushbu dars Data Science kengaytmasi (dsx-*) sifatida taklif qilingan ixtiyoriy modul bo‘lib, rasmiy tasdiqsiz import qilinmaydi va e’lon qilinmaydi.",
          learningObjectiveUz: `Data Science qo‘shimcha amaliy ko‘nikmasi (${lessonId})`,
          theoryUz: `Bu dars ${rawPhase.title_uz} bo‘yicha taklif qilingan ixtiyoriy Data Science kengaytmasidir. Foydalanuvchi roziligisiz import qilinmaydi.`,
          examples: [],
          commonMistakes: [],
          quiz: [],
          practiceTasks: [],
          summaryTakeaways: [],
          pythonPrerequisites: [],
          aiRelatedLessons: [],
          visualLabId: "mlds-lab-01",
        });
      } else {
        const canonical = getMlDs520LessonById(lessonId);
        if (canonical) {
          resolvedLessons.push({
            ...canonical,
            isOptionalProposal: false,
          });
        } else {
          resolvedLessons.push({
            id: lessonId,
            phaseId: rawPhase.source_phase_ids[0] ?? "mlds-01",
            order: resolvedLessons.length + 1,
            title: `Dars ${lessonId}`,
            status: "planned",
            isOptionalProposal: false,
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
    }

    return {
      id: rawPhase.id,
      order: rawPhase.order,
      titleUz: rawPhase.title_uz,
      level: rawPhase.level as "core" | "supporting" | "advanced",
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
      releaseStatus: rawPhase.release_status ?? "mapped_from_existing_lessons",
      hasOptionalExtensions: optionalCount > 0,
      optionalExtensionCount: optionalCount,
      lessons: resolvedLessons,
    };
  }
);

export const TOTAL_DS_MICRO_LESSONS = DATA_SCIENCE_PHASES.reduce(
  (sum, p) => sum + p.lessons.length,
  0
);

export const CANONICAL_DS_LESSONS = DATA_SCIENCE_PHASES.reduce(
  (sum, p) => sum + p.lessons.filter((l) => !l.isOptionalProposal).length,
  0
);

export const OPTIONAL_DS_EXTENSIONS_COUNT = DATA_SCIENCE_PHASES.reduce(
  (sum, p) => sum + p.lessons.filter((l) => l.isOptionalProposal).length,
  0
);

export function getDsPhaseById(phaseId: string): DsPhase | undefined {
  return DATA_SCIENCE_PHASES.find((p) => p.id === phaseId);
}

export function getDsLessonById(
  lessonId: string
): { phase: DsPhase; lesson: DsMicroLesson } | undefined {
  for (const phase of DATA_SCIENCE_PHASES) {
    const found = phase.lessons.find((l) => l.id === lessonId);
    if (found) {
      return { phase, lesson: found };
    }
  }
  return undefined;
}

export function getDsTrackStats(): {
  phaseCount: number;
  totalLessonReferences: number;
  canonicalCount: number;
  optionalProposalCount: number;
  publishedCount: number;
  plannedCount: number;
} {
  let published = 0;
  let planned = 0;
  for (const phase of DATA_SCIENCE_PHASES) {
    for (const l of phase.lessons) {
      if (l.status === "published") published++;
      else planned++;
    }
  }
  return {
    phaseCount: DATA_SCIENCE_PHASES.length,
    totalLessonReferences: TOTAL_DS_MICRO_LESSONS,
    canonicalCount: CANONICAL_DS_LESSONS,
    optionalProposalCount: OPTIONAL_DS_EXTENSIONS_COUNT,
    publishedCount: published,
    plannedCount: planned,
  };
}

export function validateDsTrackGraph(): {
  valid: boolean;
  missingLessonIds: string[];
  orphanPhases: string[];
} {
  const missingLessonIds: string[] = [];
  const orphanPhases: string[] = [];

  for (const phase of DATA_SCIENCE_PHASES) {
    if (phase.requiresPreviousTrackPhase) {
      const prev = DATA_SCIENCE_PHASES.find(
        (p) => p.id === phase.requiresPreviousTrackPhase
      );
      if (!prev) {
        orphanPhases.push(phase.id);
      }
    }
    for (const lId of phase.lessonIds) {
      if (!lId.startsWith("dsx-") && !getMlDs520LessonById(lId)) {
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
