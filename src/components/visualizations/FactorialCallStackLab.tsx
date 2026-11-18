"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  analyzePythonReferenceScenario,
  compareBinaryAndLinearSearch,
  computeFactorialCallStack,
  type ReferenceScenarioId,
} from "@/lib/math/python-semantics";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  GitBranch,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Search,
} from "lucide-react";

export type PythonLabTab =
  | "factorial-stack"
  | "reference-semantics"
  | "binary-search";

const FACTORIAL_CODE_LINES: readonly { line: number; text: string }[] = [
  { line: 1, text: "def factorial(n: int) -> int:" },
  { line: 2, text: "    if n < 0:" },
  { line: 3, text: '        raise ValueError("n must be non-negative")' },
  { line: 4, text: "    if n <= 1:" },
  { line: 5, text: "        return 1" },
  { line: 6, text: "    return n * factorial(n - 1)" },
];

const SORTED_DEMO_ARRAY = [4, 9, 15, 22, 31, 44, 58, 73, 86, 95] as const;
const UNSORTED_DEMO_ARRAY = [44, 9, 86, 15, 73, 4, 95, 22, 58, 31] as const;

export function FactorialCallStackLab({
  initialTab = "factorial-stack",
}: {
  initialTab?: PythonLabTab;
}) {
  const [activeTab, setActiveTab] = useState<PythonLabTab>(initialTab);

  // 1. Factorial Call Stack State (`py-10-10` / `py-10-12`)
  const [selectedN, setSelectedN] = useState<number>(4);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const trace = useMemo(
    () => computeFactorialCallStack(selectedN),
    [selectedN],
  );

  const maxStepIndex = Math.max(0, trace.steps.length - 1);
  const clampedStepIdx = Math.min(stepIdx, maxStepIndex);
  const currentStep = trace.steps[clampedStepIdx] ?? null;

  useEffect(() => {
    if (!isPlaying || !trace.valid) return;
    const timer = window.setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= maxStepIndex) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 950);
    return () => window.clearInterval(timer);
  }, [isPlaying, maxStepIndex, trace.valid]);

  const handleSelectN = (newN: number) => {
    setIsPlaying(false);
    setSelectedN(newN);
    setStepIdx(0);
  };

  // 2. Python Reference & Mutable Default State (`py-03-13` / `py-05-18` / `py-06-07`)
  const [refScenario, setRefScenario] =
    useState<ReferenceScenarioId>("aliasing");
  const refAnalysis = useMemo(
    () => analyzePythonReferenceScenario(refScenario),
    [refScenario],
  );

  // 3. Binary Search vs Linear Search State (`py-10-13` / `py-10-14`)
  const [useUnsortedArray, setUseUnsortedArray] = useState<boolean>(false);
  const [searchTarget, setSearchTarget] = useState<number>(73);

  const searchResult = useMemo(
    () =>
      compareBinaryAndLinearSearch(
        useUnsortedArray ? UNSORTED_DEMO_ARRAY : SORTED_DEMO_ARRAY,
        searchTarget,
      ),
    [useUnsortedArray, searchTarget],
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 space-y-5">
      {/* Top Switcher & Conceptual Provenance Notice */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("factorial-stack")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "factorial-stack"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Phase 10: Recursion va Call Stack (factorial) ★</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reference-semantics")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "reference-semantics"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Phase 03–06: is vs ==, Aliasing va Mutable Default</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("binary-search")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "binary-search"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Phase 08–10: Binary Search O(log n) vs Linear O(n)</span>
          </button>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
          Konseptual Python Call Stack Modeli (Deterministik Simulyatsiya)
        </span>
      </div>

      {/* TAB 1: FACTORIAL RECURSION & CALL STACK STEPPER */}
      {activeTab === "factorial-stack" && (
        <div className="space-y-5">
          {/* Controls Bar: n = 0..7 + n = -1 ValueError + Step / Play / Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-300 font-semibold mr-1">
                n qiymatini tanlang (0..7):
              </span>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelectN(val)}
                  className={`w-8 h-8 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                    selectedN === val
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/50"
                  }`}
                >
                  {val}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleSelectN(-1)}
                className={`px-2.5 h-8 rounded-lg font-mono text-[11px] font-semibold border transition-all cursor-pointer ${
                  selectedN === -1
                    ? "bg-rose-600 text-white border-rose-500"
                    : "bg-slate-950 text-rose-300 border-rose-500/40 hover:bg-rose-950/40"
                }`}
              >
                n = -1 (ValueError)
              </button>
            </div>

            {trace.valid && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={clampedStepIdx === 0}
                  onClick={() => {
                    setIsPlaying(false);
                    setStepIdx((i) => Math.max(0, i - 1));
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (clampedStepIdx >= maxStepIndex) {
                      setStepIdx(0);
                      setIsPlaying(true);
                    } else {
                      setIsPlaying((p) => !p);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={clampedStepIdx >= maxStepIndex}
                  onClick={() => {
                    setIsPlaying(false);
                    setStepIdx((i) => Math.min(maxStepIndex, i + 1));
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 disabled:opacity-40 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setStepIdx(0);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            )}
          </div>

          {!trace.valid ? (
            <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2 text-xs text-rose-200">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-300">
                <AlertTriangle className="w-4 h-4" />
                <span>{trace.errorMessage}</span>
              </div>
              <p>
                Python kodimizning 2-qatorida <code className="text-white">if n &lt; 0: raise ValueError(&quot;n must be non-negative&quot;)</code> himoyasi yozilgan. Agar bu shart bo‘lmasa, <code className="text-white">n = -1</code> holati <code className="text-white">n &lt;= 1</code> base case ga tushib qolishi yoki noto‘g‘ri mantiqqa olib kelishi mumkin edi.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left: Python Code with Line Highlight & Current Step Explanation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="inline-flex items-center gap-1.5 text-amber-300">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>factorial.py (Python 3.12+)</span>
                    </span>
                    <span>
                      Qadam {clampedStepIdx + 1} / {trace.steps.length}
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-xs pt-1">
                    {FACTORIAL_CODE_LINES.map((item) => {
                      const isActive = currentStep?.codeLine === item.line;
                      return (
                        <div
                          key={item.line}
                          className={`px-2.5 py-1 rounded flex items-center gap-3 ${
                            isActive
                              ? "bg-amber-500/20 border-l-2 border-amber-400 text-amber-200 font-bold"
                              : "text-slate-300"
                          }`}
                        >
                          <span className="text-slate-600 select-none w-4">
                            {item.line}
                          </span>
                          <span className="whitespace-pre">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {currentStep && (
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                          currentStep.phase === "call"
                            ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {currentStep.phase === "call"
                          ? "↓ PUSH (Chaqiriq stackka qo‘shildi)"
                          : "↑ POP / RETURN (Qiymat qaytarilmoqda)"}
                      </span>
                      <span className="font-mono text-amber-300 font-bold">
                        {currentStep.expressionText}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {currentStep.titleUz}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {currentStep.explanationUz}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Yakuniy natija</div>
                    <div className="text-base font-bold font-mono text-emerald-300">
                      {selectedN}! = {trace.finalResult}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Jami chaqiriqlar</div>
                    <div className="text-base font-bold font-mono text-white">
                      {trace.totalCalls} ta ({trace.timeComplexity})
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Max Stack chuqurligi</div>
                    <div className="text-base font-bold font-mono text-amber-300">
                      {trace.maxStackDepth} qavat ({trace.spaceComplexity})
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Conceptual Call Stack Frames */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">
                      Jonli Call Stack Frame’lari (Tepadan pastga: chaqiriqlar zanjiri)
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      Faol frame’lar: {currentStep?.stackSnapshot.length ?? 0}
                    </span>
                  </div>

                  <div className="space-y-2 min-h-[240px]">
                    {currentStep?.stackSnapshot.map((frame) => {
                      const isTopOfStack =
                        frame.argN === currentStep.activeArgN;
                      return (
                        <div
                          key={frame.depth}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 font-mono text-xs ${
                            frame.state === "returning"
                              ? "bg-emerald-950/40 border-emerald-500 text-emerald-200"
                              : frame.state === "base-case"
                                ? "bg-amber-950/40 border-amber-500 text-amber-200"
                                : isTopOfStack
                                  ? "bg-sky-950/40 border-sky-500 text-sky-200"
                                  : "bg-slate-950/80 border-slate-800 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400">
                              Frame #{frame.depth}
                            </span>
                            <span className="font-bold text-white">
                              factorial(n={frame.argN})
                            </span>
                          </div>

                          <div className="text-right">
                            <div>{frame.pendingExpression}</div>
                            <div className="text-[10px] opacity-80">
                              {frame.state === "waiting-for-child"
                                ? "⏳ Kichik chaqiriq natijasini kutmoqda"
                                : frame.state === "base-case"
                                  ? "🎯 Base case (n <= 1)"
                                  : `✅ Qaytarildi: ${frame.resolvedValue}`}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                    <strong>Muhim eslatma:</strong> Ushbu vizualizatsiya Python call stack&apos;ining{" "}
                    <em>konseptual modeli</em> hisoblanadi; u CPython interpretatorining past darajadagi C pointer va xotira registrlarining bitma-bit tasviri emas.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PYTHON OBJECT REFERENCE, `is` vs `==`, ALIASING & MUTABLE DEFAULTS */}
      {activeTab === "reference-semantics" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              3 ta muhim Python xotira va havola (Reference) holati:
            </div>
            {(
              [
                {
                  id: "aliasing",
                  label: "1. Aliasing: b = a (Bitta obyektga ikki nom)",
                },
                {
                  id: "shallow-copy",
                  label: "2. Copy: b = a.copy() (is vs == farqi)",
                },
                {
                  id: "mutable-default",
                  label: "3. Mutable Default Tuzog‘i: def fn(items=[])",
                },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRefScenario(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  refScenario === item.id
                    ? "bg-cyan-500/20 border-cyan-400 text-white"
                    : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-white">
                {refAnalysis.titleUz}
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto">
                <code>{refAnalysis.codeSnippet}</code>
              </pre>
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Natija A:</div>
                  <div className="text-emerald-300 font-bold">
                    {refAnalysis.varAValue}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Natija B:</div>
                  <div className="text-amber-300 font-bold">
                    {refAnalysis.varBValue}
                  </div>
                </div>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {refAnalysis.memoryExplanationUz}
              </p>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200">
                <strong>Amaliy qoida:</strong> {refAnalysis.pitfallWarningUz}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BINARY SEARCH O(log n) vs LINEAR SEARCH O(n) */}
      {activeTab === "binary-search" && (
        <div className="space-y-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 rounded-xl p-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-200">
                Qidirilayotgan son (Target):
              </span>
              {[4, 15, 31, 58, 73, 95, 50].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSearchTarget(t)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold cursor-pointer ${
                    searchTarget === t
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-950 text-slate-300 border border-slate-800"
                  }`}
                >
                  {t} {t === 50 ? "(yo‘q)" : ""}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={useUnsortedArray}
                onChange={(e) => setUseUnsortedArray(e.target.checked)}
                className="accent-rose-500"
              />
              <span className="text-slate-300">
                Tartiblanmagan (Unsorted) listni sinash (Binary Search sharti buzilishi)
              </span>
            </label>
          </div>

          <div className="flex flex-wrap gap-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 font-mono">
            {searchResult.array.map((val, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg border text-center ${
                  val === searchTarget
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold"
                    : "bg-slate-950 border-slate-800 text-slate-300"
                }`}
              >
                <div className="text-[10px] text-slate-500">[{idx}]</div>
                <div className="text-sm">{val}</div>
              </div>
            ))}
          </div>

          {searchResult.preconditionErrorUz ? (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">{searchResult.preconditionErrorUz}</div>
                <div className="mt-1 text-slate-300">
                  Linear Search esa tartiblanmagan ro‘yxatda ham{" "}
                  <strong>{searchResult.linearSearchComparisons} ta</strong> solishtirishda natijani topdi (indeks:{" "}
                  {searchResult.foundIndex}).
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300">
                  Binary Search O(log n): {searchResult.binarySearchComparisons} ta qadam
                </div>
                <div className="space-y-1.5 font-mono">
                  {searchResult.binarySteps.map((s) => (
                    <div
                      key={s.stepNumber}
                      className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-200"
                    >
                      Qadam {s.stepNumber}: [low={s.low}, mid={s.mid}, high={s.high}] →{" "}
                      {s.decisionUz}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200">
                  Linear Search O(n): {searchResult.linearSearchComparisons} ta solishtirish
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Linear Search 0-indeksdan boshlab ketma-ket tekshiradi. 10 ta elementda farq kichik ko‘rinsa ham, 1 000 000 ta tartiblangan elementda Linear Search eng yomoni 1 000 000 qadam, Binary Search esa atigi ~20 qadam bajaradi!
                </p>
                <div className="flex items-center gap-2 text-emerald-300 font-mono pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Topilgan indeks: {searchResult.foundIndex}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
