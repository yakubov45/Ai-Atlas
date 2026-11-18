/**
 * Execution and Test Result Types for Safe Code Runners
 */

export interface TestCaseResult {
  id: string;
  descriptionUz: string;
  passed: boolean;
  actualOutput?: string;
  expectedOutput?: string;
  errorMessage?: string;
  durationMs?: number;
}

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  error?: string;
  errorName?: string;
  errorDetailsUz?: string;
  executionTimeMs: number;
  testResults?: TestCaseResult[];
  allTestsPassed?: boolean;
}

export interface RunOptions {
  timeoutMs?: number;
  runTests?: boolean;
}
