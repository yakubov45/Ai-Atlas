import { describe, it, expect } from "vitest";
import { runPythonCode } from "@/lib/runner/python-runner";
import { translateErrorToUzbek } from "@/lib/runner/error-translator";
import { getLessonPractice } from "@/lib/practice/registry";
import { StorageLearningRepository } from "@/lib/progress/repository";
import { createLearningStore } from "@/lib/progress/store";
import { MemoryStorage } from "@/lib/storage/storage";

describe("Practice Runner & Isolated Execution", () => {
  describe("Vertical Slice 1: Python Functions (calculate_total)", () => {
    const practice = getLessonPractice("py-06-01")!;

    it("publishes practice with 2 progressive examples and deterministic tests", () => {
      expect(practice).toBeDefined();
      expect(practice.lessonId).toBe("py-06-01");
      expect(practice.examples.length).toBeGreaterThanOrEqual(2);
      expect(practice.exercise.testCases.length).toBeGreaterThanOrEqual(4);
      expect(practice.exercise.hintsUz.length).toBe(3);
    });

    it("passes all 4 automated tests with reference solution", async () => {
      const solution = practice.exercise.modelSolution!;
      const result = await runPythonCode(solution, practice.exercise.testCases, {
        timeoutMs: 3000,
      });

      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(true);
      expect(result.testResults?.length).toBe(practice.exercise.testCases.length);
      expect(result.testResults?.every((t) => t.passed)).toBe(true);
    });

    it("fails tests when user provides incorrect logic", async () => {
      const buggyCode = `def calculate_total(prices, discount=0):
    # Bug: forgets to subtract discount
    return float(sum(prices))`;

      const result = await runPythonCode(buggyCode, practice.exercise.testCases, {
        timeoutMs: 3000,
      });

      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(false);
      // Case with discount should fail
      const discountedCase = result.testResults?.find((t) => t.id === "test-discount");
      expect(discountedCase?.passed).toBe(false);
    });

    it("translates Python SyntaxError into beginner-friendly Uzbek", async () => {
      const brokenSyntax = `def calculate_total(prices, discount=0)
    return sum(prices)`; // missing colon

      const result = await runPythonCode(brokenSyntax, practice.exercise.testCases);

      expect(result.success).toBe(false);
      expect(result.errorName).toContain("Sintaksis xatosi");
    });
  });

  describe("Vertical Slice 2: AI Engineer / Vectors (cosine_similarity)", () => {
    const practice = getLessonPractice("vector")!;

    it("publishes practice with 2 progressive examples and deterministic tests", () => {
      expect(practice).toBeDefined();
      expect(practice.lessonId).toBe("vector");
      expect(practice.examples.length).toBeGreaterThanOrEqual(2);
      expect(practice.exercise.testCases.length).toBeGreaterThanOrEqual(4);
    });

    it("passes all 4 automated tests with reference solution", async () => {
      const solution = practice.exercise.modelSolution!;
      const result = await runPythonCode(solution, practice.exercise.testCases, {
        timeoutMs: 3000,
      });

      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(true);
      expect(result.testResults?.every((t) => t.passed)).toBe(true);
    });

    it("fails tests when zero vector edge case is not handled", async () => {
      const buggySolution = `import math
def cosine_similarity(vec_a, vec_b):
    # Bug: returns 0.0 always
    return 0.0`;

      const result = await runPythonCode(buggySolution, practice.exercise.testCases);

      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(false);
      const identicalCase = result.testResults?.find((t) => t.id === "test-identical");
      expect(identicalCase?.passed).toBe(false);
    });
  });

  describe("Pedagogical Error Translator", () => {
    it("translates NameError into clear variable advice", () => {
      const uz = translateErrorToUzbek("NameError: name 'prics' is not defined");
      expect(uz.errorName).toContain("NameError");
      expect(uz.summaryUz).toContain("o‘zgaruvchi");
    });

    it("translates TypeError into argument advice", () => {
      const uz = translateErrorToUzbek("TypeError: unsupported operand type(s)");
      expect(uz.errorName).toContain("TypeError");
      expect(uz.summaryUz).toContain("tur");
    });

    it("translates ZeroDivisionError into zero divisor advice", () => {
      const uz = translateErrorToUzbek("ZeroDivisionError: division by zero");
      expect(uz.errorName).toContain("ZeroDivisionError");
      expect(uz.summaryUz).toContain("nol");
    });
  });

  describe("Vertical Slice 3: Python Basics Multi-Level Practice (Easy -> Hard)", () => {
    const practice = getLessonPractice("python-basics")!;

    it("publishes practice with 3 progressive difficulties (starter, core, challenge)", () => {
      expect(practice).toBeDefined();
      expect(practice.lessonId).toBe("py-01-01");
      expect(practice.exercises).toBeDefined();
      expect(practice.exercises?.length).toBe(3);

      const difficulties = practice.exercises?.map((e) => e.difficulty);
      expect(difficulties).toEqual(["starter", "core", "challenge"]);
    });

    it("evaluates starter exercise (format_user_badge) successfully", async () => {
      const starterEx = practice.exercises![0]!;
      const solution = starterEx.modelSolution!;
      const result = await runPythonCode(solution, starterEx.testCases, {
        timeoutMs: 3000,
      });

      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(true);
      expect(result.testResults?.length).toBe(starterEx.testCases.length);
    });

    it("evaluates core exercise (check_memory_safety) with memory independence", async () => {
      const coreEx = practice.exercises![1]!;
      const solution = coreEx.modelSolution!;
      const result = await runPythonCode(solution, coreEx.testCases, {
        timeoutMs: 3000,
      });

      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(true);
    });
  });

  describe("Learning Progress & Practice Persistence", () => {
    it("saves practice attempts and tracks passing state without modifying completed lessons", () => {
      const storage = new MemoryStorage();
      const store = createLearningStore(new StorageLearningRepository(storage));

      expect(store.isPracticePassed("py-06-01", "ex-py-fn-1", "overview")).toBe(false);

      // Save an attempt that failed
      store.savePracticeSubmission("py-06-01", "ex-py-fn-1", "overview", {
        code: "def calculate_total(): pass",
        testsPassed: false,
        attemptCount: 1,
        lastRunAt: "2026-11-16T12:00:00Z",
        hintsRevealed: 1,
      });

      expect(store.isPracticePassed("py-06-01", "ex-py-fn-1", "overview")).toBe(false);
      const sub1 = store.getPracticeSubmission("py-06-01", "ex-py-fn-1", "overview");
      expect(sub1?.attemptCount).toBe(1);
      expect(sub1?.hintsRevealed).toBe(1);

      // Save a passed attempt
      store.savePracticeSubmission("py-06-01", "ex-py-fn-1", "overview", {
        code: "def calculate_total(prices, discount=0): return float(sum(prices) * (1 - discount/100))",
        testsPassed: true,
        attemptCount: 2,
        lastRunAt: "2026-11-16T12:01:00Z",
        passedAt: "2026-11-16T12:01:00Z",
        hintsRevealed: 1,
      });

      expect(store.isPracticePassed("py-06-01", "ex-py-fn-1", "overview")).toBe(true);

      // Verify that mere reading did not mark lesson completed
      expect(store.isCompleted("py-06-01")).toBe(false);
    });
  });

  describe("Vertical Slice 4: Python Basics Multi-Tier Practices & Brute Force Support", () => {
    const practice = getLessonPractice("python-basics")!;

    it("publishes python-basics with 3 progressive difficulty tiers (starter, core, challenge)", () => {
      expect(practice).toBeDefined();
      expect(practice.id).toBe("prac-py-basics");
      expect(practice.exercises).toBeDefined();
      expect(practice.exercises?.length).toBe(3);
      expect(practice.exercises?.map((e) => e.difficulty)).toEqual(["starter", "core", "challenge"]);
    });

    it("evaluates Starter exercise (format_user_badge) correctly", async () => {
      const starterEx = practice.exercises![0]!;
      const solution = starterEx.modelSolution!;
      const result = await runPythonCode(solution, starterEx.testCases, { timeoutMs: 3000 });

      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(true);
      expect(result.testResults?.every((t) => t.passed)).toBe(true);
    });

    it("accepts Brute Force solution for Core exercise (check_memory_safety)", async () => {
      const coreEx = practice.exercises![1]!;
      // Student uses naive manual for-loops to copy elements into a new list (brute force)
      const bruteForceCode = `def check_memory_safety(original_list, new_items):
    res = []
    for x in original_list:
        res.append(x)
    for y in new_items:
        res.append(y)
    return res`;

      const result = await runPythonCode(bruteForceCode, coreEx.testCases, { timeoutMs: 3000 });
      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(true);
      expect(result.testResults?.every((t) => t.passed)).toBe(true);
    });

    it("accepts Brute Force solution for Challenge exercise (clean_and_aggregate_scores)", async () => {
      const chalEx = practice.exercises![2]!;
      // Student uses brute force loop with manual deduplication and filtering
      const bruteForceChalCode = `def clean_and_aggregate_scores(records, min_threshold):
    if not records:
        return {"count": 0, "average": 0.0}
    # Naive brute force: loop through and track seen ids
    seen_ids = []
    latest_scores = []
    for item in records:
        item_id = item["id"]
        if item_id in seen_ids:
            idx = seen_ids.index(item_id)
            latest_scores[idx] = item["ball"]
        else:
            seen_ids.append(item_id)
            latest_scores.append(item["ball"])
    
    passed = []
    for s in latest_scores:
        if s >= min_threshold:
            passed.append(s)
            
    if not passed:
        return {"count": 0, "average": 0.0}
    return {"count": len(passed), "average": round(sum(passed) / len(passed), 1)}`;

      const result = await runPythonCode(bruteForceChalCode, chalEx.testCases, { timeoutMs: 3000 });
      expect(result.success).toBe(true);
      expect(result.allTestsPassed).toBe(true);
      expect(result.testResults?.every((t) => t.passed)).toBe(true);
    });
  });
});
