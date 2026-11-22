import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  SIX_EXISTING_CAREER_TRACKS,
  HF_COURSE_CHAPTERS,
  ALL_HF_MICRO_LESSONS,
  HF_CANONICAL_EQUIVALENCE_MAP,
  resolveHfCanonicalLessonId,
  getHfLessonById,
  getHfChapterOverlayForTrack,
  getHfCourseImportAuditReport,
} from "../src/lib/curriculum/hf-llm-course";
import { SPECIALIZATION_PATHS } from "../src/lib/curriculum/paths";
import { getLessonPractice } from "../src/lib/practice/registry";
import { runPythonCode } from "../src/lib/runner/python-runner";
import { createLearningStore } from "../src/lib/progress/store";
import { StorageLearningRepository } from "../src/lib/progress/repository";
import { MemoryStorage } from "../src/lib/storage/storage";

const REFERENCE_PYTHON_SOLUTIONS = fs.readFileSync(
  path.resolve(__dirname, "../examples/python/token_padding_reference.py"),
  "utf8"
);

describe("Hugging Face LLM Course Integration (13 Chapters / 220 Micro-Lessons)", () => {
  it("preserves the 6 existing career paths and does NOT create a new Hugging Face career path", () => {
    expect(SIX_EXISTING_CAREER_TRACKS).toHaveLength(6);
    expect(SIX_EXISTING_CAREER_TRACKS.map((t) => t.id)).toEqual([
      "ai-engineer",
      "ml-engineer",
      "data-scientist",
      "python-dev",
      "data-eng",
      "prompt-eng",
    ]);

    const specializationIds = SPECIALIZATION_PATHS.map((p) => p.id);
    expect(specializationIds).not.toContain("hugging-face");
    expect(specializationIds).not.toContain("hf-llm-course");
  });

  it("imports all 13 chapters (hf-00..hf-12), 99 sections, and 220 micro-lessons with Apache-2.0 attribution", () => {
    const audit = getHfCourseImportAuditReport();
    expect(audit.sourceChaptersCount).toBe(13);
    expect(audit.outlineSectionsCount).toBe(99);
    expect(audit.totalMicroLessonsCount).toBe(220);
    expect(audit.existingCareerTracksCount).toBe(6);
    expect(audit.sixthTrackIntactNoSeventhTrackCreated).toBe(true);
    expect(audit.license).toBe("Apache-2.0");

    expect(HF_COURSE_CHAPTERS[0]?.id).toBe("hf-00");
    expect(HF_COURSE_CHAPTERS[12]?.id).toBe("hf-12");
    expect(ALL_HF_MICRO_LESSONS).toHaveLength(220);

    const sampleLesson = getHfLessonById("hf-02-05-01");
    expect(sampleLesson?.sourceAttribution.license).toBe("Apache-2.0");
    expect(sampleLesson?.sourceAttribution.provider).toBe("Hugging Face");
  });

  it("honestly separates published lessons (7), planned syllabus nodes (212), and unavailable upstream material (1)", () => {
    const audit = getHfCourseImportAuditReport();
    expect(audit.publishedLessonsCount).toBe(7);
    expect(audit.plannedLessonsCount).toBe(212);
    expect(audit.unavailableLessonsCount).toBe(1);
    expect(
      audit.publishedLessonsCount +
        audit.plannedLessonsCount +
        audit.unavailableLessonsCount
    ).toBe(220);

    // Check published vertical slice lessons
    const publishedIds = [
      "hf-02-05-01",
      "hf-02-05-02",
      "hf-02-05-03",
      "hf-02-05-04",
      "hf-06-06-02",
      "hf-11-04-02",
      "hf-12-04-02",
    ];
    for (const id of publishedIds) {
      const lesson = getHfLessonById(id);
      expect(lesson).toBeDefined();
      expect(lesson?.publishStatus).toBe("published");
      expect(lesson?.publishedContent).toBeDefined();
      expect(lesson?.publishedContent?.depths.overview.bodyUz.length).toBeGreaterThan(40);
      expect(lesson?.publishedContent?.depths.understand.bodyUz.length).toBeGreaterThan(40);
      expect(lesson?.publishedContent?.depths.master.bodyUz.length).toBeGreaterThan(40);
      expect(lesson?.publishedContent?.example1.code.length).toBeGreaterThan(20);
      expect(lesson?.publishedContent?.example2.code.length).toBeGreaterThan(20);
      expect(lesson?.publishedContent?.exercise.testCases.length).toBeGreaterThanOrEqual(2);
      // Verify reference solutions are NOT leaked into the client-bundled lesson payload
      expect(lesson?.publishedContent?.exercise.modelSolution).toBeUndefined();
      expect(lesson?.publishedContent?.exercise.starterCode).toContain("TODO:");
    }

    // Check planned lesson is NOT marked published
    const plannedLesson = getHfLessonById("hf-01-03-01");
    expect(plannedLesson?.publishStatus).toBe("planned");
    expect(plannedLesson?.publishedContent).toBeUndefined();

    // Check future upstream material in Chapter 12
    const unavailableLesson = getHfLessonById("hf-12-08-01");
    expect(unavailableLesson?.publishStatus).toBe("unavailable");
  });

  it("applies trackOverlay correctly across the 6 existing career paths and marks Chapter 12 (GRPO) as optional/supporting for AI Engineers", () => {
    const ch12AiOverlay = getHfChapterOverlayForTrack("hf-12", "ai-engineer");
    expect(ch12AiOverlay.role).toBe("supporting");
    expect(ch12AiOverlay.isRequiredForBeginner).toBe(false);

    const ch12MlOverlay = getHfChapterOverlayForTrack("hf-12", "ml-engineer");
    expect(ch12MlOverlay.role).toBe("deep");
    expect(ch12MlOverlay.isRequiredForBeginner).toBe(false);

    const ch02AiOverlay = getHfChapterOverlayForTrack("hf-02", "ai-engineer");
    expect(ch02AiOverlay.role).toBe("deep");
    expect(ch02AiOverlay.isRequiredForBeginner).toBe(true);
  });

  it("maps overlapping HF lessons to existing AI Atlas canonical lesson IDs and preserves user progress across tracks and depth levels", () => {
    expect(Object.keys(HF_CANONICAL_EQUIVALENCE_MAP).length).toBeGreaterThanOrEqual(20);

    // hf-02-04-01 maps to canonical AI Engineer lesson 06.01
    const eq = HF_CANONICAL_EQUIVALENCE_MAP["hf-02-04-01"];
    expect(eq).toBeDefined();
    expect(eq?.existingLessonId).toBe("06.01");
    expect(resolveHfCanonicalLessonId("hf-02-04-01")).toBe("06.01");

    // Non-overlapping HF lesson keeps its own canonical ID
    expect(resolveHfCanonicalLessonId("hf-02-05-01")).toBe("hf-02-05-01");

    // Verify existing user progress preservation + shared canonical completion with separate depth levels
    const repo = new StorageLearningRepository(new MemoryStorage());
    const store = createLearningStore(repo);
    const canonicalId = resolveHfCanonicalLessonId("hf-02-04-01");

    // Simulate pre-existing user completion at "understand" depth
    store.setCompleted(canonicalId, true);
    store.setDepthCompleted(canonicalId, "understand", true);

    // User's progress on canonical ID is immediately reflected when querying via HF lesson's canonical ID
    expect(store.isCompleted(canonicalId)).toBe(true);
    expect(store.isDepthCompleted(canonicalId, "understand")).toBe(true);
    // Depth completion stays separate: "master" is not yet completed
    expect(store.isDepthCompleted(canonicalId, "master")).toBe(false);

    // Now complete "master" depth via the HF course lesson
    store.setDepthCompleted(canonicalId, "master", true);
    expect(store.isDepthCompleted(canonicalId, "understand")).toBe(true);
    expect(store.isDepthCompleted(canonicalId, "master")).toBe(true);
  });

  it("exposes published HF lessons through the unified Practice Registry", () => {
    const practice = getLessonPractice("hf-02-05-01", "understand");
    expect(practice).not.toBeNull();
    expect(practice!.lessonId).toBe("hf-02-05-01");
    expect(practice!.examples).toHaveLength(2);
    expect(practice!.exercise.testCases.length).toBe(4);
    expect(practice!.exercise.starterCode).toContain("def pad_batch");
  });

  it("executes the reference pad_batch solution from examples/python/token_padding_reference.py and passes all automated tests (including ValueError edge cases)", async () => {
    const lesson = getHfLessonById("hf-02-05-01");
    expect(lesson?.publishedContent).toBeDefined();
    const { testCases } = lesson!.publishedContent!.exercise;

    const result = await runPythonCode(REFERENCE_PYTHON_SOLUTIONS, testCases);

    expect(result.success).toBe(true);
    expect(result.testResults).toHaveLength(4);
    for (const tr of result.testResults ?? []) {
      expect(tr.passed).toBe(true);
    }
    expect(result.allTestsPassed).toBe(true);
  });

  it("fails automated tests when a buggy pad_batch solution is submitted", async () => {
    const lesson = getHfLessonById("hf-02-05-01");
    const { testCases } = lesson!.publishedContent!.exercise;

    const buggyCode = `
def pad_batch(sequences, pad_id=0, max_length=None):
    # Buggy implementation: returns empty lists without padding or validation
    return (sequences, [])
`;

    const result = await runPythonCode(buggyCode, testCases);

    const passedCount = (result.testResults ?? []).filter((t) => t.passed).length;
    expect(passedCount).toBeLessThan(testCases.length);
    expect(result.allTestsPassed).toBe(false);
  });

  it("executes reference solutions for BPE merge (hf-06-06-02), LoRA stats (hf-11-04-02), and GRPO advantages (hf-12-04-02)", async () => {
    for (const lessonId of ["hf-06-06-02", "hf-11-04-02", "hf-12-04-02"]) {
      const lesson = getHfLessonById(lessonId);
      expect(lesson?.publishedContent).toBeDefined();
      const { testCases } = lesson!.publishedContent!.exercise;

      const result = await runPythonCode(REFERENCE_PYTHON_SOLUTIONS, testCases);

      expect(result.success).toBe(true);
      expect((result.testResults ?? []).every((t) => t.passed)).toBe(true);
      expect(result.allTestsPassed).toBe(true);
    }
  });
});
