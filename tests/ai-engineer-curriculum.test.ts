import { describe, it, expect } from "vitest";
import {
  AI_ENGINEER_PHASES,
  AI_ENGINEER_TRACKS,
  PRACTICAL_PROJECTS,
  TOTAL_AI_ENGINEER_MICRO_LESSONS,
  getAiEngineerMicroLesson,
  getGuidedStepsForMicroLesson,
  getPhasePriorityForTrack,
} from "@/lib/curriculum/ai-engineer";
import { MemoryStorage } from "@/lib/storage/storage";
import { StorageLearningRepository } from "@/lib/progress/repository";
import { createLearningStore } from "@/lib/progress/store";
import { getLessonPractice } from "@/lib/practice/registry";

describe("AI Engineer 20-Phase Curriculum, 291 Micro-Lessons & Detour Return State", () => {
  it("contains all 20 phases (01..20) and exactly 291 micro-lessons", () => {
    expect(AI_ENGINEER_PHASES.length).toBe(20);
    expect(TOTAL_AI_ENGINEER_MICRO_LESSONS).toBe(291);

    const counted = AI_ENGINEER_PHASES.reduce(
      (sum, phase) => sum + phase.lessons.length,
      0,
    );
    expect(counted).toBe(291);

    // Check boundary IDs
    expect(getAiEngineerMicroLesson("01.01")?.lesson.title).toBe(
      "AI Engineer nimalar yaratadi?",
    );
    expect(getAiEngineerMicroLesson("12.07")?.lesson.title).toBe(
      "Cosine similarity",
    );
    expect(getAiEngineerMicroLesson("20.17")?.lesson.title).toContain(
      "Capstone",
    );
  });

  it("defines 6 AI Engineer specialization tracks and 6 practical projects", () => {
    expect(AI_ENGINEER_TRACKS.length).toBe(6);
    expect(PRACTICAL_PROJECTS.length).toBe(6);

    expect(getPhasePriorityForTrack("12", "rag-engineer").priority).toBe("core");
    expect(getPhasePriorityForTrack("14", "rag-engineer").priority).toBe("core");
    expect(getPhasePriorityForTrack("20", "rag-engineer").priority).toBe(
      "optional",
    );
  });

  it("implements the exact 13-step sample micro-lesson for 12.07 Cosine similarity", () => {
    const lookup = getAiEngineerMicroLesson("12.07");
    expect(lookup).not.toBeNull();
    expect(lookup!.lesson.status).toBe("published");

    const steps = getGuidedStepsForMicroLesson(lookup!.lesson, lookup!.phase);
    expect(steps.length).toBe(13);

    const overviewSteps = steps.filter((s) => s.depth === "overview");
    const understandSteps = steps.filter((s) => s.depth === "understand");
    const masterSteps = steps.filter((s) => s.depth === "master");

    expect(overviewSteps.length).toBe(3);
    expect(understandSteps.length).toBe(6);
    expect(masterSteps.length).toBe(4);

    // Check "Tushunmadim" prerequisite link to 12.04 on step 4 (understand[0])
    const step4 = understandSteps[0]!;
    expect(step4.tushunmadim.prerequisiteLessonId).toBe("12.04");
  });

  it("persists and restores detourReturnTo and lastMicroStep in LearningStore", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    store.setSelectedAiTrack("rag-engineer");
    store.setLastMicroStep("12.07", "understand", 2);
    store.setDetourReturnTo({
      lessonId: "12.07",
      depth: "understand",
      stepIndex: 0,
    });

    const snap = store.getSnapshot();
    expect(snap.selectedAiTrackId).toBe("rag-engineer");
    expect(snap.lastMicroStep["12.07"]).toEqual({
      depth: "understand",
      stepIndex: 2,
    });
    expect(snap.detourReturnTo).toEqual({
      lessonId: "12.07",
      depth: "understand",
      stepIndex: 0,
    });

    // Clear detour after returning
    store.setDetourReturnTo(null);
    expect(store.getSnapshot().detourReturnTo).toBeNull();
  });

  it("authors and verifies the Pilot lesson 17.05 ReAct Loop with Python Academy crosswalk", () => {
    const lookup = getAiEngineerMicroLesson("17.05");
    expect(lookup).not.toBeNull();
    expect(lookup!.lesson.status).toBe("published");
    expect(lookup!.lesson.title).toContain("ReAct loop");

    // Verify Python Academy crosswalk prerequisites
    expect(lookup!.lesson.prerequisites).toContain("py-06-01");
    expect(lookup!.lesson.prerequisites).toContain("py-18-01");

    // Verify 3 guided steps, 2 examples, 3 quizzes, 2 practice tasks
    const steps = getGuidedStepsForMicroLesson(lookup!.lesson, lookup!.phase);
    expect(steps.length).toBe(3);
    expect(lookup!.lesson.examples).toHaveLength(2);
    expect(lookup!.lesson.quiz).toHaveLength(3);
    expect(lookup!.lesson.practiceTasks).toHaveLength(2);

    // Verify practice contract
    const practice = getLessonPractice("17.05");
    expect(practice).not.toBeNull();
    expect(practice!.exercise.id).toBe("17.05-task-1");
    expect(practice!.exercise.runtime).toBe("pyodide");
    expect(practice!.exercise.testCases.length).toBeGreaterThanOrEqual(1);
  });
});
