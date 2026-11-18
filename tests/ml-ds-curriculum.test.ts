import { describe, it, expect } from "vitest";
import {
  ML_DS_PHASES,
  ML_DS_TRACKS,
  TOTAL_ML_DS_MICRO_LESSONS,
  getMlDsGuidedSteps,
  getMlDsMicroLesson,
  validateMlDsPrerequisiteGraph,
} from "@/lib/curriculum/ml-ds";
import { AI_ENGINEER_PHASES } from "@/lib/curriculum/ai-engineer";
import {
  computeLoss,
  computeGradient,
  createInitialGdState,
  stepGradientDescent,
} from "@/lib/math/gradient-descent";
import {
  computeClassificationMetrics,
  computeConfusionMatrixFromThreshold,
  evaluateAbExperiment,
} from "@/lib/math/ml-ds-labs";
import { MemoryStorage } from "@/lib/storage/storage";
import { StorageLearningRepository } from "@/lib/progress/repository";
import { createLearningStore } from "@/lib/progress/store";

describe("ML Engineer + Data Scientist 31-Phase Curriculum, 520 Micro-Lessons & Labs", () => {
  it("loads all 31 phases (mlds-01..mlds-31) and 520 micro-lessons with zero ID collisions and an acyclic graph", () => {
    expect(ML_DS_PHASES.length).toBe(31);
    expect(TOTAL_ML_DS_MICRO_LESSONS).toBe(520);

    const counted = ML_DS_PHASES.reduce(
      (sum, phase) => sum + phase.lessons.length,
      0,
    );
    expect(counted).toBe(520);

    // Ensure zero ID collision between AI Engineer (01.01..20.17) and ML/DS (mlds-01-01..mlds-31-20)
    const aiIds = new Set<string>();
    for (const p of AI_ENGINEER_PHASES) {
      for (const l of p.lessons) aiIds.add(l.id);
    }
    for (const p of ML_DS_PHASES) {
      for (const l of p.lessons) {
        expect(aiIds.has(l.id)).toBe(false);
      }
    }

    // Validate prerequisite graph is acyclic and has no broken references
    const graphCheck = validateMlDsPrerequisiteGraph();
    expect(graphCheck.valid).toBe(true);
    expect(graphCheck.missingIds).toEqual([]);
    expect(graphCheck.cycles).toEqual([]);
  });

  it("defines all 3 ML/DS tracks with accurate phase priorities", () => {
    expect(ML_DS_TRACKS.length).toBe(3);
    const mlTrack = ML_DS_TRACKS.find((t) => t.id === "ml-engineer")!;
    const dsTrack = ML_DS_TRACKS.find((t) => t.id === "data-scientist")!;
    const bridgeTrack = ML_DS_TRACKS.find((t) => t.id === "ai-engineer-bridge")!;

    expect(mlTrack.phasePriority["mlds-11"]).toBe("core");
    expect(mlTrack.phasePriority["mlds-14"]).toBe("supporting");
    expect(dsTrack.phasePriority["mlds-14"]).toBe("core");
    expect(dsTrack.phasePriority["mlds-24"]).toBe("core");
    expect(bridgeTrack.phasePriority["mlds-01"]).toBe("optional");
    expect(bridgeTrack.phasePriority["mlds-02"]).toBe("supporting");
  });

  it("implements the exact 11-step Gradient Descent micro-lesson (mlds-11-13) and prerequisite links", () => {
    const lookup = getMlDsMicroLesson("mlds-11-13");
    expect(lookup).not.toBeNull();
    expect(lookup!.lesson.status).toBe("published");

    const steps = getMlDsGuidedSteps(lookup!.lesson, lookup!.phase);
    expect(steps.length).toBe(11);

    const overviewSteps = steps.filter((s) => s.depth === "overview");
    const understandSteps = steps.filter((s) => s.depth === "understand");
    const masterSteps = steps.filter((s) => s.depth === "master");

    expect(overviewSteps.length).toBe(3);
    expect(understandSteps.length).toBe(4);
    expect(masterSteps.length).toBe(4);

    // Step 4 links to mlds-11-04 (Derivative), Step 5 links to mlds-11-09 (Gradient vector)
    expect(understandSteps[0]?.tushunmadim.prerequisiteLessonId).toBe("mlds-11-04");
    expect(understandSteps[1]?.tushunmadim.prerequisiteLessonId).toBe("mlds-11-09");
  });

  it("matches exact Python/NumPy values from ML_DataScience_Micro_Lesson_Namuna.md and learning-rate edge cases", () => {
    expect(Math.abs(computeLoss(3) - 0.0)).toBeLessThan(1e-9);
    expect(Math.abs(computeGradient(0) + 6.0)).toBeLessThan(1e-9);
    expect(Math.abs(0 - 0.1 * computeGradient(0) - 0.6)).toBeLessThan(1e-9);

    // 3 steps from w0 = 0, eta = 0.1
    let state = createInitialGdState(0.0, 0.1);
    state = stepGradientDescent(state, 0.1);
    expect(state.x).toBeCloseTo(0.6, 6);
    expect(state.loss).toBeCloseTo(5.76, 6);

    state = stepGradientDescent(state, 0.1);
    expect(state.x).toBeCloseTo(1.08, 6);
    expect(state.loss).toBeCloseTo(3.6864, 6);

    state = stepGradientDescent(state, 0.1);
    expect(state.x).toBeCloseTo(1.464, 6);
    expect(state.loss).toBeCloseTo(2.359296, 6);

    // Edge case 1: eta = 0.0 -> no change
    const zeroLr = stepGradientDescent(createInitialGdState(0.0, 0.0), 0.0);
    expect(zeroLr.x).toBeCloseTo(0.0, 6);
    expect(zeroLr.loss).toBeCloseTo(9.0, 6);

    // Edge case 2: eta = 0.5 -> reaches exact minimum w = 3.0 in 1 step
    const halfLr = stepGradientDescent(createInitialGdState(0.0, 0.5), 0.5);
    expect(halfLr.x).toBeCloseTo(3.0, 6);
    expect(halfLr.loss).toBeCloseTo(0.0, 6);
    expect(halfLr.status).toBe("converged");

    // Edge case 3: eta = 1.0 -> oscillates to w = 6.0 with loss = 9.0
    const oneLr = stepGradientDescent(createInitialGdState(0.0, 1.0), 1.0);
    expect(oneLr.x).toBeCloseTo(6.0, 6);
    expect(oneLr.loss).toBeCloseTo(9.0, 6);

    // Edge case 4: eta = 1.1 -> diverges to w = 6.6 with loss = 12.96 > 9.0
    const divLr = stepGradientDescent(createInitialGdState(0.0, 1.1), 1.1);
    expect(divLr.x).toBeCloseTo(6.6, 6);
    expect(divLr.loss).toBeCloseTo(12.96, 6);
    expect(divLr.status).toBe("diverged");
  });

  it("computes Confusion Matrix metrics accurately and handles zero-denominator edge cases without NaN", () => {
    const counts = computeConfusionMatrixFromThreshold(0.5);
    expect(counts.tp + counts.fp + counts.fn + counts.tn).toBe(12);

    const m = computeClassificationMetrics({ tp: 8, fp: 2, fn: 2, tn: 8 });
    expect(m.accuracy).toBeCloseTo(0.8, 6);
    expect(m.precision).toBeCloseTo(0.8, 6);
    expect(m.recall).toBeCloseTo(0.8, 6);
    expect(m.f1Score).toBeCloseTo(0.8, 6);

    // Zero positive predictions: TP=0, FP=0 -> precision is null, never NaN
    const zeroPred = computeClassificationMetrics({ tp: 0, fp: 0, fn: 5, tn: 10 });
    expect(zeroPred.precision).toBeNull();
    expect(zeroPred.f1Score).toBeNull();
    expect(zeroPred.warnings.length).toBeGreaterThan(0);
  });

  it("computes A/B experiment z-test, p-value, 95% CI, and CUPED variance reduction", () => {
    const ab = evaluateAbExperiment({
      controlVisitors: 2000,
      controlConversions: 200, // 10.0%
      treatmentVisitors: 2000,
      treatmentConversions: 250, // 12.5%
      cupedCorrelationRho: 0.6,
    });

    expect(ab.controlRate).toBeCloseTo(0.1, 6);
    expect(ab.treatmentRate).toBeCloseTo(0.125, 6);
    expect(ab.absoluteLift).toBeCloseTo(0.025, 6);
    expect(ab.cupedVarianceMultiplier).toBeCloseTo(1 - 0.36, 6); // 0.64
    expect(ab.cupedStandardError).toBeCloseTo(ab.rawStandardError * 0.8, 6);
    expect(ab.pValueCuped!).toBeLessThan(ab.pValueRaw!);
    expect(ab.decisionCuped).toBe("significant-positive");
  });

  it("persists selectedMlDsTrackId in LearningStore without resetting existing progress", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    store.setMicroLessonCompleted("12.07", true);
    store.setSelectedMlDsTrack("data-scientist");

    const snap = store.getSnapshot();
    expect(snap.selectedMlDsTrackId).toBe("data-scientist");
    expect(store.isMicroLessonCompleted("12.07")).toBe(true);
  });

  it("preserves the 5 original published lessons and their exact metadata", () => {
    const publishedIds = ["mlds-11-04", "mlds-11-09", "mlds-11-13", "mlds-14-01", "mlds-19-03"];
    for (const id of publishedIds) {
      const item = getMlDsMicroLesson(id);
      expect(item).not.toBeNull();
      expect(item!.lesson.status).toBe("published");
      expect(item!.lesson.publishedDepths).toContain("master");
      expect(item!.lesson.guidedSteps && item!.lesson.guidedSteps.length).toBeGreaterThan(0);
    }
  });

  it("verifies the 4 pilot lessons (mlds-04-09, mlds-22-04, mlds-01-01, mlds-02-01) with rich practice tasks and labs", () => {
    const pilot0409 = getMlDsMicroLesson("mlds-04-09");
    expect(pilot0409).not.toBeNull();
    expect(pilot0409!.lesson.status).toBe("published");
    expect(pilot0409!.lesson.title).toBe("Broadcasting qoidalari");
    expect(pilot0409!.lesson.practiceTasks?.length).toBe(2);
    expect(pilot0409!.lesson.quiz?.length).toBe(3);
    expect(pilot0409!.lesson.visualLabId).toBe("mlds-lab-04");

    const pilot2204 = getMlDsMicroLesson("mlds-22-04");
    expect(pilot2204).not.toBeNull();
    expect(pilot2204!.lesson.status).toBe("published");
    expect(pilot2204!.lesson.title).toBe("K-Means intuitiv");
    expect(pilot2204!.lesson.practiceTasks?.length).toBe(2);
    expect(pilot2204!.lesson.visualLabId).toBe("mlds-lab-22");

    const pilot0101 = getMlDsMicroLesson("mlds-01-01");
    expect(pilot0101).not.toBeNull();
    expect(pilot0101!.lesson.status).toBe("published");
    expect(pilot0101!.lesson.practiceTasks?.length).toBe(2);

    const pilot0201 = getMlDsMicroLesson("mlds-02-01");
    expect(pilot0201).not.toBeNull();
    expect(pilot0201!.lesson.status).toBe("published");
    expect(pilot0201!.lesson.practiceTasks?.length).toBe(2);
  });

  it("integrates deterministic practice contracts for ML/DS lessons in Practice Registry", async () => {
    const { getLessonPractice, hasPractice } = await import("@/lib/practice/registry");

    // Pilot broadcasting lesson
    expect(hasPractice("mlds-04-09")).toBe(true);
    const prac0409Starter = getLessonPractice("mlds-04-09", "understand");
    expect(prac0409Starter).not.toBeNull();
    expect(prac0409Starter!.exercise.language).toBe("python");
    expect(prac0409Starter!.exercise.runtime).toBe("pyodide");
    expect(prac0409Starter!.exercise.testRunnerCode).toContain("can_broadcast");

    const prac0409Challenge = getLessonPractice("mlds-04-09", "master");
    expect(prac0409Challenge).not.toBeNull();
    expect(prac0409Challenge!.exercise.testRunnerCode).toContain("broadcast_shapes");

    // Pilot K-Means lesson
    expect(hasPractice("mlds-22-04")).toBe(true);
    const prac2204 = getLessonPractice("mlds-22-04");
    expect(prac2204).not.toBeNull();
    expect(prac2204!.exercise.testRunnerCode).toContain("assign_clusters");
  });

  it("verifies all 31 visual labs in the Asset Registry with approvedForPublicDistribution: false", async () => {
    const { ML_DS_31_LAB_SPECS, ML_DS_ASSET_METADATA, getMlDsVisualLabSpec } = await import(
      "@/lib/curriculum/ml-ds-asset-registry"
    );
    expect(ML_DS_31_LAB_SPECS.length).toBe(31);
    expect(ML_DS_ASSET_METADATA.approvedForPublicDistribution).toBe(false);

    const lab04 = getMlDsVisualLabSpec("mlds-lab-04");
    expect(lab04).toBeDefined();
    expect(lab04!.phaseId).toBe("mlds-04");
    expect(lab04!.realImageFilesCopied).toBe(false);

    const lab22 = getMlDsVisualLabSpec("mlds-lab-22");
    expect(lab22).toBeDefined();
    expect(lab22!.phaseId).toBe("mlds-22");
    expect(lab22!.realImageFilesCopied).toBe(false);

    // Verify all 31 labs are present
    for (let i = 1; i <= 31; i++) {
      const pad = String(i).padStart(2, "0");
      const lab = getMlDsVisualLabSpec(`mlds-lab-${pad}`);
      expect(lab).toBeDefined();
      expect(lab!.realImageFilesCopied).toBe(false);
    }
  });
});
