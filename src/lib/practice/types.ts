/**
 * AI Learning Platform — Practice-First Learning Data Schema
 *
 * Implements strict, backward-compatible types for hands-on programming
 * exercises, progressive examples, test cases, runtimes, and learner submissions.
 */

import type { LearningDepth } from "@/lib/curriculum/paths";

export type PracticeLanguage =
  | "python"
  | "javascript"
  | "typescript"
  | "sql"
  | "json"
  | "shell"
  | "prompt";

export type PracticeRuntime =
  | "pyodide"
  | "browser-js"
  | "browser-sql"
  | "isolated-remote"
  | "non-executable";

export type PracticeAssessment = "deterministic" | "rubric" | "manual";

export type PracticeDifficulty = "starter" | "core" | "challenge";

export type PracticeStatus = "planned" | "draft" | "reviewed" | "published";

/**
 * A pedagogical example with traceable input, output, and line-by-line explanation.
 */
export interface PracticeExample {
  id: string;
  titleUz: string;
  explanationUz: string;
  input?: string;
  code: string;
  expectedOutput: string;
  walkthrough: string[];
  whyThisOutputUz?: string;
}

/**
 * Individual test case for deterministic grading.
 */
export interface PracticeTestCase {
  id: string;
  descriptionUz: string;
  input?: string;
  expectedOutput?: string;
  hidden?: boolean;
  assertionCode?: string;
}

/**
 * Interactive coding exercise presented to the student.
 */
export interface PracticeExercise {
  id: string;
  titleUz: string;
  instructionsUz: string;
  language: PracticeLanguage;
  runtime: PracticeRuntime;
  difficulty: PracticeDifficulty;
  assessment: PracticeAssessment;
  starterCode: string;
  expectedBehaviorUz: string;
  hintsUz: string[]; // 1: Concept, 2: Algorithm, 3: Line-level nudge
  testCases: PracticeTestCase[];
  /** Python or JavaScript test script that evaluates student code */
  testRunnerCode?: string;
  modelSolution?: string;
  solutionExplanationUz?: string;
  challengeExtensionUz?: string;
  /** True if external environment (e.g. Docker, Kafka, Colab) is required */
  externalNotebookUrl?: string;
}

/**
 * Complete practice contract for a lesson at a specific depth.
 */
export interface LessonPractice {
  id: string;
  lessonId: string; // Canonical lesson ID (e.g. 'vector', 'py-06-01')
  aliases?: string[];
  depth: LearningDepth;
  objectiveUz: string;
  prerequisites: string[];
  theorySteps: Array<{
    id: string;
    title: string;
    bodyMdx: string;
    visualizationId?: string;
  }>;
  examples: [PracticeExample, PracticeExample] | [PracticeExample];
  exercise: PracticeExercise;
  /** Progressive multi-tier challenges (e.g. Starter -> Core -> Challenge) */
  exercises?: PracticeExercise[];
  status: PracticeStatus;
  sourceRefs?: string[];
}

/**
 * Saved student attempt state.
 */
export interface PracticeSubmission {
  code: string;
  testsPassed: boolean;
  attemptCount: number;
  lastRunAt: string;
  passedAt?: string;
  hintsRevealed: number;
}
