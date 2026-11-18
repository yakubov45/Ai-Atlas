import { describe, expect, it } from "vitest";
import {
  PYTHON_DEV_PHASES,
  TOTAL_PYTHON_DEV_LESSONS,
  TOTAL_PYTHON_DEV_PHASES,
  getPythonMicroLessonById,
  validatePythonDeveloperCurriculum,
} from "@/lib/curriculum/python-developer";
import {
  analyzePythonReferenceScenario,
  compareBinaryAndLinearSearch,
  computeFactorialCallStack,
  factorialValue,
} from "@/lib/math/python-semantics";

describe("Python Developer 20-Phase, 344-Micro-Lesson Curriculum & Execution Semantics", () => {
  it("loads all 20 phases (py-01..py-20), 344 unique micro-lessons, and 29 conservative candidate links", () => {
    expect(TOTAL_PYTHON_DEV_PHASES).toBe(20);
    expect(PYTHON_DEV_PHASES).toHaveLength(20);
    expect(TOTAL_PYTHON_DEV_LESSONS).toBe(344);

    const report = validatePythonDeveloperCurriculum();
    expect(report.valid).toBe(true);
    expect(report.candidateCount).toBe(29);
    expect(report.proposedNewCount).toBe(315);
    expect(report.duplicateIds).toEqual([]);
    expect(report.missingPrerequisites).toEqual([]);
  });

  it("authors the complete Recursion & Call Stack vertical slice (py-10-10 & py-10-12) with Manim asset", () => {
    const recLesson = getPythonMicroLessonById("py-10-10");
    expect(recLesson).toBeDefined();
    expect(recLesson?.status).toBe("sample-authored");
    expect(recLesson?.publishedDepths).toEqual([
      "overview",
      "understand",
      "master",
    ]);
    expect(recLesson?.manimAssetPath).toBe(
      "/animations/factorial_call_stack.mp4",
    );
    expect(recLesson?.steps?.length).toBeGreaterThanOrEqual(4);
    expect(recLesson?.checkpointQuestions).toHaveLength(3);
  });

  it("computes deterministic factorial(n) call stack frames for n = 0..7 and raises ValueError on n < 0", () => {
    expect(factorialValue(0)).toBe(1);
    expect(factorialValue(1)).toBe(1);
    expect(factorialValue(3)).toBe(6);
    expect(factorialValue(4)).toBe(24);
    expect(factorialValue(7)).toBe(5040);

    // n = 0 -> 1 call, 2 steps (call + base-case return)
    const trace0 = computeFactorialCallStack(0);
    expect(trace0.valid).toBe(true);
    expect(trace0.finalResult).toBe(1);
    expect(trace0.totalCalls).toBe(1);
    expect(trace0.steps).toHaveLength(2);

    // n = 4 -> 4 calls, 8 steps matching `Python_Recursion_Micro_Lesson_Namuna.md`
    const trace4 = computeFactorialCallStack(4);
    expect(trace4.valid).toBe(true);
    expect(trace4.finalResult).toBe(24);
    expect(trace4.totalCalls).toBe(4);
    expect(trace4.maxStackDepth).toBe(4);
    expect(trace4.steps).toHaveLength(8);
    expect(trace4.steps[0]?.phase).toBe("call");
    expect(trace4.steps[0]?.activeArgN).toBe(4);
    expect(trace4.steps[3]?.phase).toBe("call");
    expect(trace4.steps[3]?.activeArgN).toBe(1);
    expect(trace4.steps[4]?.phase).toBe("return");
    expect(trace4.steps[4]?.returnedValue).toBe(1);
    expect(trace4.steps[5]?.returnedValue).toBe(2);
    expect(trace4.steps[6]?.returnedValue).toBe(6);
    expect(trace4.steps[7]?.returnedValue).toBe(24);

    // n = -1 -> ValueError
    const traceNeg = computeFactorialCallStack(-1);
    expect(traceNeg.valid).toBe(false);
    expect(traceNeg.errorType).toBe("ValueError");
    expect(traceNeg.finalResult).toBeNull();
  });

  it("models Python `is` vs `==`, aliasing vs shallow copy, and mutable default arguments accurately", () => {
    const alias = analyzePythonReferenceScenario("aliasing");
    expect(alias.equalityResult).toBe(true);
    expect(alias.identityResult).toBe(true);

    const copy = analyzePythonReferenceScenario("shallow-copy");
    expect(copy.identityResult).toBe(false);

    const mutDefault = analyzePythonReferenceScenario("mutable-default");
    expect(mutDefault.varAValue).toContain("['AI', 'ML']");
    expect(mutDefault.varBValue).toContain("['ML']");
  });

  it("enforces sorted-array precondition for Binary Search and compares O(log n) vs O(n) steps", () => {
    const sorted = compareBinaryAndLinearSearch(
      [4, 9, 15, 22, 31, 44, 58, 73, 86, 95],
      73,
    );
    expect(sorted.isSorted).toBe(true);
    expect(sorted.preconditionErrorUz).toBeNull();
    expect(sorted.foundIndex).toBe(7);
    expect(sorted.binarySearchComparisons).not.toBeNull();
    expect(sorted.binarySearchComparisons!).toBeLessThan(
      sorted.linearSearchComparisons,
    );

    const unsorted = compareBinaryAndLinearSearch(
      [44, 9, 86, 15, 73, 4],
      73,
    );
    expect(unsorted.isSorted).toBe(false);
    expect(unsorted.preconditionErrorUz).not.toBeNull();
    expect(unsorted.binarySearchComparisons).toBeNull();
    expect(unsorted.foundIndex).toBe(4);
  });
});
