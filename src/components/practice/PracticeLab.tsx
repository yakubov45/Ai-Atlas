"use client";

import React, { useState, useEffect } from "react";
import type { PracticeExercise } from "@/lib/practice/types";
import { executeExerciseCode, type ExecutionResult } from "@/lib/runner";
import { CodeEditor } from "./CodeEditor";
import {
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Lightbulb,
  Terminal,
  Clock,
  Sparkles,
  AlertTriangle,
  Eye,
} from "lucide-react";

export interface PracticeResultInfo {
  userCode: string;
  testsPassed: boolean;
  attemptCount: number;
  hintsRevealed: number;
}

export interface PracticeLabProps {
  exercise: PracticeExercise;
  lessonId: string;
  depth?: string;
  initialCode?: string;
  onCompleted?: (result: PracticeResultInfo) => void;
  className?: string;
}

export function PracticeLab({
  exercise,
  lessonId,
  depth = "overview",
  initialCode,
  onCompleted,
  className = "",
}: PracticeLabProps) {
  // Unique storage key for autosave
  const storageKey = `practice:${lessonId}:${exercise.id}:${depth}`;

  const [code, setCode] = useState<string>(() => {
    if (initialCode) return initialCode;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
    }
    return exercise.starterCode;
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"terminal" | "tests">("terminal");
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showModelSolution, setShowModelSolution] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  // Autosave code on edit
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, code);
      } catch {
        // ignore localStorage quota errors
      }
    }
  }, [code, storageKey]);

  // Run Code only
  const handleRunCode = async () => {
    setIsRunning(true);
    setAttempts((prev) => prev + 1);
    setActiveConsoleTab("terminal");
    try {
      const res = await executeExerciseCode(exercise, code, { runTests: false });
      setResult(res);
    } catch (err) {
      setResult({
        success: false,
        stdout: "",
        stderr: err instanceof Error ? err.message : String(err),
        error: String(err),
        executionTimeMs: 0,
        allTestsPassed: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Run Code + Test Assertions
  const handleCheckCode = async () => {
    setIsRunning(true);
    setAttempts((prev) => prev + 1);
    setActiveConsoleTab("tests");
    try {
      const res = await executeExerciseCode(exercise, code, { runTests: true });
      setResult(res);
      if (res.allTestsPassed) {
        onCompleted?.({
          userCode: code,
          testsPassed: true,
          attemptCount: attempts + 1,
          hintsRevealed: revealedHints,
        });
      }
    } catch (err) {
      setResult({
        success: false,
        stdout: "",
        stderr: err instanceof Error ? err.message : String(err),
        error: String(err),
        executionTimeMs: 0,
        allTestsPassed: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Kodingizni boshlang'ich holatga qaytarishni xohlaysizmi?")) {
      setCode(exercise.starterCode);
      setResult(null);
    }
  };

  const handleShowNextHint = () => {
    if (revealedHints < exercise.hintsUz.length) {
      setRevealedHints((prev) => prev + 1);
    }
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Exercise Header Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                Amaliy Mashq: {exercise.titleUz}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-slate-400">
                <span className="uppercase text-emerald-400 font-semibold">
                  {exercise.language}
                </span>
                <span>•</span>
                <span>
                  Qiyinlik:{" "}
                  <strong className="text-slate-300">
                    {exercise.difficulty === "starter"
                      ? "Boshlang'ich"
                      : exercise.difficulty === "core"
                      ? "O'rta"
                      : "Murakkab"}
                  </strong>
                </span>
                <span>•</span>
                <span>Urinishlar: {attempts}</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Muhit: {exercise.runtime === "pyodide" ? "Pyodide (WASM)" : "Sandbox"}</span>
          </div>
        </div>

        {/* Task Instructions */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <div className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
            Vazifa Sharti:
          </div>
          <p className="whitespace-pre-line text-slate-200">
            {exercise.instructionsUz}
          </p>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 mt-2 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Kutilayotgan Natija:
            </span>
            <p>{exercise.expectedBehaviorUz}</p>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="space-y-3">
        <CodeEditor
          value={code}
          onChange={setCode}
          language={exercise.language}
          onRun={handleRunCode}
          onReset={handleReset}
          minHeight="260px"
        />

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleRunCode}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-200" />
              <span>{isRunning ? "Bajarilmoqda..." : "Ishga tushirish (Run)"}</span>
            </button>

            <button
              type="button"
              onClick={handleCheckCode}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isRunning ? "Tekshirilmoqda..." : "Tekshirish (Check)"}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Qaytarish</span>
            </button>
          </div>

          {/* Progressive Hint Button */}
          {exercise.hintsUz.length > 0 && (
            <button
              type="button"
              onClick={handleShowNextHint}
              disabled={revealedHints >= exercise.hintsUz.length}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                revealedHints < exercise.hintsUz.length
                  ? "bg-amber-950/40 border-amber-600/40 text-amber-300 hover:bg-amber-900/40"
                  : "bg-slate-900 border-slate-800 text-slate-500 cursor-default"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {revealedHints === 0
                  ? "Maslahat olish (Hint)"
                  : revealedHints < exercise.hintsUz.length
                  ? `Keyingi maslahat (${revealedHints}/${exercise.hintsUz.length})`
                  : `Barcha maslahatlar ochildi (${revealedHints}/${exercise.hintsUz.length})`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Revealed Hints Drawer */}
      {revealedHints > 0 && (
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-600/30 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Bosqichma-bosqich maslahatlar:</span>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-200">
            {exercise.hintsUz.slice(0, revealedHints).map((hint, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-amber-900/40 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-md bg-amber-900/60 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{hint}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terminal / Test Results Console Output */}
      {result && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden font-mono shadow-2xl">
          {/* Console Header Tabs */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveConsoleTab("terminal")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeConsoleTab === "terminal"
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Konsol Chiqishi (Stdout)
              </button>

              {result.testResults && (
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab("tests")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeConsoleTab === "tests"
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>Test Natijalari</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      result.allTestsPassed
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    }`}
                  >
                    {result.testResults.filter((t) => t.passed).length}/
                    {result.testResults.length}
                  </span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>{result.executionTimeMs} ms</span>
            </div>
          </div>

          {/* Console Tab Content */}
          <div className="p-4 text-xs">
            {activeConsoleTab === "terminal" ? (
              <div className="space-y-3">
                {result.stdout ? (
                  <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                    {result.stdout}
                  </pre>
                ) : (
                  <p className="text-slate-500 italic">
                    (Hech qanday matn chop etilmadi — agar natijani ko&apos;rmoqchi bo&apos;lsangiz, `print()` ishlatib ko&apos;ring).
                  </p>
                )}

                {result.stderr && (
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/60 text-rose-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>{result.errorName || "Xatolik yuz berdi:"}</span>
                    </div>
                    <pre className="text-[11px] whitespace-pre-wrap text-rose-300/90 font-mono">
                      {result.stderr}
                    </pre>
                    {result.errorDetailsUz && (
                      <p className="text-xs text-amber-300 pt-1 border-t border-rose-900/40 leading-relaxed">
                        💡 {result.errorDetailsUz}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Test Results List */
              <div className="space-y-2.5">
                {result.testResults && result.testResults.length > 0 ? (
                  result.testResults.map((tc, idx) => (
                    <div
                      key={tc.id}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                        tc.passed
                          ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-200"
                          : "bg-rose-950/20 border-rose-800/40 text-rose-200"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {tc.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-semibold text-xs text-slate-100">
                            {idx + 1}-test: {tc.descriptionUz}
                          </div>
                          {tc.errorMessage && (
                            <div className="text-[11px] text-rose-300 font-mono mt-1">
                              Xatolik: {tc.errorMessage}
                            </div>
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 self-start sm:self-auto ${
                          tc.passed
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {tc.passed ? "O'tdi (Passed)" : "Xato (Failed)"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic">
                    Ushbu mashq uchun testlar belgilanmagan.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Celebration & Model Solution Unlock */}
      {result?.allTestsPassed && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-600/50 space-y-4 shadow-xl shadow-emerald-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Tabriklaymiz! Barcha testlar muvaffaqiyatli o‘tdi! 🎉</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Siz ushbu darsning amaliy talabini muvaffaqiyatli bajardingiz va mavzuni o‘zlashtirdingiz.
          </p>

          {exercise.modelSolution && (
            <div>
              <button
                type="button"
                onClick={() => setShowModelSolution(!showModelSolution)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-semibold cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {showModelSolution
                    ? "Namunaviy yechimni yashirish"
                    : "Namunaviy professional yechimni ko‘rish"}
                </span>
              </button>

              {showModelSolution && (
                <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    Namunaviy Kod (Model Solution):
                  </span>
                  <pre className="p-3 rounded-lg bg-slate-900 font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{exercise.modelSolution}</code>
                  </pre>
                  {exercise.solutionExplanationUz && (
                    <p className="text-slate-400 text-xs pt-1 leading-relaxed">
                      💡 {exercise.solutionExplanationUz}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
