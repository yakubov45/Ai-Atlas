"use client";

import React, { useState, useMemo } from "react";
import {
  DS_DEEP_PHASES,
  DS_RESOURCE_INDEX,
  DS_WORKFLOW_STAGES,
  TOTAL_DS_DEEP_NODES,
  TOTAL_DS_DEEP_PHASES,
  getDsNodeByIdOrContentRef,
  resolveCanonicalProgressKey,
  type DsCurriculumNode,
} from "@/lib/curriculum/ds-deep";
import { DEPTH_META, type LearningDepth } from "@/lib/curriculum/paths";
import { FormulaDisplay } from "@/components/visualizations/FormulaDisplay";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import { PhaseDropdown } from "./PhaseDropdown";
import { ConfusionMatrixExplorer } from "@/components/visualizations/MlDsGuaranteeLabs";
import { GradientDescent } from "@/components/visualizations/GradientDescent";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  FlaskConical,
  HelpCircle,
  Layers,
  Plus,
  Sparkles,
  Video,
} from "lucide-react";

const DEPTH_LIST: readonly LearningDepth[] = ["overview", "understand", "master"];

export function DsDeepDivePanel({
  isMicroLessonCompleted,
  toggleMicroLessonCompleted,
  onJumpToMldsLesson,
}: {
  isMicroLessonCompleted: (id: string) => boolean;
  toggleMicroLessonCompleted: (id: string) => void;
  onJumpToMldsLesson: (mldsId: string) => void;
}) {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>("dsx-12");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("dsx-12-n011");
  const [activeDepth, setActiveDepth] = useState<LearningDepth>("understand");
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [detourReturnNodeId, setDetourReturnNodeId] = useState<string | null>(null);
  const [showTushunmadim, setShowTushunmadim] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const activePhase = useMemo(
    () =>
      DS_DEEP_PHASES.find((p) => p.id === selectedPhaseId) ??
      DS_DEEP_PHASES[11]!,
    [selectedPhaseId],
  );

  const activeNode: DsCurriculumNode = useMemo(() => {
    const found = getDsNodeByIdOrContentRef(selectedNodeId);
    if (found) return found;
    return activePhase.lessonNodes[0]!;
  }, [selectedNodeId, activePhase]);

  const canonicalProgressKey = resolveCanonicalProgressKey(activeNode);
  const isNodeCompleted = isMicroLessonCompleted(canonicalProgressKey);

  const depthSteps = useMemo(() => {
    if (!activeNode.steps || activeNode.steps.length === 0) return [];
    return activeNode.steps.filter((s) => s.depth === activeDepth);
  }, [activeNode, activeDepth]);

  const currentStep =
    depthSteps[Math.min(stepIdx, Math.max(0, depthSteps.length - 1))] ?? null;

  const completedNodesCount = useMemo(() => {
    let count = 0;
    for (const p of DS_DEEP_PHASES) {
      for (const n of p.lessonNodes) {
        if (isMicroLessonCompleted(resolveCanonicalProgressKey(n))) {
          count++;
        }
      }
    }
    return count;
  }, [isMicroLessonCompleted]);

  const selectNode = (node: DsCurriculumNode, depth: LearningDepth = "understand") => {
    setSelectedPhaseId(node.phaseId);
    setSelectedNodeId(node.id);
    setActiveDepth(depth);
    setStepIdx(0);
    setShowTushunmadim(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Data Scientist 20-Phase Deep-Dive Banner & 5 Workflow Stages */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Data Scientist Deep-Dive Extension • {TOTAL_DS_DEEP_PHASES} Phase •{" "}
                {TOTAL_DS_DEEP_NODES} Tugun (152 ↗ mavjud mlds-* + 157 + yangi reja)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Data Scientist — 20 Bosqichli Chuqurlashtirilgan O‘quv Yo‘li (dsx-01..dsx-20)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ushbu kengaytma mavjud 31-bosqichli ML/DS reestrini almashtirmaydi: <strong>↗ (reuse-existing)</strong> tugunlari{" "}
              <code className="text-cyan-300">contentRef</code> orqali umumiy progressni sinxron saqlaydi,{" "}
              <strong>+ (proposed-extension)</strong> tugunlari esa Data Scientist ixtisosligi uchun chuqurlashtirilgan eksperiment (A/B, MDE, CUPED, CUPAC, Delta Method), ekonometrika va ARIMA modullarini qo‘shadi.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3 text-right">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Sinxron Tugatilgan Tugunlar
            </div>
            <div className="text-xl font-bold font-mono text-cyan-300">
              {completedNodesCount} / {TOTAL_DS_DEEP_NODES}
            </div>
            <div className="text-[10px] text-slate-500">
              contentRef bo‘yicha 31-phase reestr bilan umumiy
            </div>
          </div>
        </div>

        {/* 5 Practical Workflow Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2">
          {DS_WORKFLOW_STAGES.map((stage) => (
            <div
              key={stage.stageNumber}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1"
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-300 font-bold">
                  Bosqich {stage.stageNumber}
                </span>
                <span className="text-slate-400">{stage.phaseRangeLabel}</span>
              </div>
              <div className="text-xs font-semibold text-white line-clamp-1">
                {stage.title}
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {stage.summaryUz}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Vertical Slice Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-medium">
            To‘liq ishlangan Data Scientist vertikal namunalari:
          </span>
          {[
            {
              nodeId: "dsx-12-n011",
              label: "dsx-12-c011: A/B Testing → CUPED (8 kuzatuv + Manim + Python) ★",
            },
            {
              nodeId: "dsx-07-n013",
              label: "dsx-07-c013: CLT va 95% CI Simulyator ★",
            },
            {
              nodeId: "dsx-14-n011",
              label: "dsx-14-c011: Ratio Metrics va Delta Method ★",
            },
            {
              nodeId: "dsx-10-n001",
              label: "mlds-14-01: A/B Testing Asoslari (↗ Shared)",
            },
            {
              nodeId: "dsx-17-n005",
              label: "mlds-19-03: Confusion Matrix (↗ Shared)",
            },
          ].map((quick) => (
            <button
              key={quick.nodeId}
              type="button"
              onClick={() => {
                const found = getDsNodeByIdOrContentRef(quick.nodeId);
                if (found) selectNode(found, "understand");
              }}
              className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] transition-all cursor-pointer ${
                activeNode.id === quick.nodeId
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
                  : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {quick.label}
            </button>
          ))}
        </div>
      </div>

      {/* Detour Return Banner if user jumped to a prerequisite */}
      {detourReturnNodeId && (
        <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between gap-3 text-xs text-amber-200">
          <span>
            Siz <strong>«Tushunmadim»</strong> tayanch darsidasiz ({activeNode.contentRef}). Tayanch tushunchani ko‘rib bo‘lgach, avvalgi darsga qaytishingiz mumkin.
          </span>
          <button
            type="button"
            onClick={() => {
              const target = getDsNodeByIdOrContentRef(detourReturnNodeId);
              setDetourReturnNodeId(null);
              if (target) selectNode(target, "understand");
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold cursor-pointer shrink-0"
          >
            Asl darsga qaytish →
          </button>
        </div>
      )}

      {/* 2. Main 2-Column Workspace: Left = 20 Phases & 309 Nodes, Right = Atomic Step Player & Labs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: 20 Phases + Phase Nodes */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>20 ta Phase (dsx-01..dsx-20)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {activePhase.lessonNodes.length} tugun
              </span>
            </div>

            <PhaseDropdown
              ariaLabel="Data Scientist Phase tanlash"
              value={activePhase.id}
              accent="cyan"
              options={DS_DEEP_PHASES.map((p) => ({
                id: p.id,
                badge: p.id.toUpperCase(),
                title: p.title,
                countLabel: `${p.lessonNodes.length} tugun`,
                hasPublished: p.lessonNodes.some((n) => n.status === "published"),
              }))}
              onChange={(nextPhaseId) => {
                const nextPhase = DS_DEEP_PHASES.find(
                  (p) => p.id === nextPhaseId,
                );
                if (nextPhase && nextPhase.lessonNodes[0]) {
                  selectNode(nextPhase.lessonNodes[0], "overview");
                }
              }}
            />

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] space-y-1">
              <div className="text-slate-400">
                Manba bo‘limi:{" "}
                <span className="text-slate-200 font-medium">
                  {activePhase.sourceSection}
                </span>
              </div>
              <div className="text-slate-400">
                Vizual kontsept:{" "}
                <span className="text-cyan-300">{activePhase.visualizationConcept}</span>
              </div>
              <div className="text-slate-400">
                Mini-loyiha:{" "}
                <span className="text-emerald-300">{activePhase.miniProject}</span>
              </div>
            </div>

            {/* Node List inside Active Phase */}
            <div className="max-h-[460px] overflow-y-auto space-y-1.5 pr-1">
              {activePhase.lessonNodes.map((node) => {
                const isSelected = node.id === activeNode.id;
                const isDone = isMicroLessonCompleted(
                  resolveCanonicalProgressKey(node),
                );
                const isReuse = node.contentPolicy === "reuse-existing";
                const isAuthored =
                  node.status === "sample-authored" || node.status === "published";

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => selectNode(node, isAuthored ? "understand" : "overview")}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-500 text-white"
                        : "bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                            isReuse
                              ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                              : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          }`}
                          title={
                            isReuse
                              ? "Mavjud 31-phase ML/DS darsiga havola (reuse-existing)"
                              : "Yangi rejalashtirilgan Data Scientist kengaytmasi (proposed-extension)"
                          }
                        >
                          {isReuse ? (
                            <>
                              <ArrowUpRight className="w-2.5 h-2.5" />
                              <span>{node.contentRef}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-2.5 h-2.5" />
                              <span>{node.contentRef}</span>
                            </>
                          )}
                        </span>

                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                            isAuthored
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {node.status === "sample-authored"
                            ? "sample-authored ★"
                            : node.status === "published"
                              ? "published ★"
                              : "planned"}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-white line-clamp-1">
                        {node.title}
                      </div>
                    </div>

                    {isDone && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Node Content / Atomic Stepper / Interactive Labs */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-5">
            {/* Node Header & Canonical Shared Progress Button */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold">
                    {activeNode.id} → {activeNode.contentRef}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px]">
                    Policy: {activeNode.contentPolicy}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] ${
                      activeNode.status === "sample-authored" ||
                      activeNode.status === "published"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    Status: {activeNode.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {activeNode.title}
                </h3>
                <p className="text-xs text-slate-300">
                  <strong>O‘quv maqsadi:</strong> {activeNode.learningObjectiveUz}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {activeNode.contentPolicy === "reuse-existing" && (
                  <button
                    type="button"
                    onClick={() => onJumpToMldsLesson(activeNode.contentRef)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/25 border border-violet-500/50 text-xs font-semibold text-violet-200 hover:bg-violet-600/40 cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Asl {activeNode.contentRef} darsida ochish</span>
                  </button>
                )}

                {activeNode.status === "sample-authored" ||
                activeNode.status === "published" ? (
                  <button
                    type="button"
                    onClick={() => toggleMicroLessonCompleted(canonicalProgressKey)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isNodeCompleted
                        ? "bg-emerald-600 text-slate-950 border-emerald-500 font-bold"
                        : "bg-slate-950 text-slate-200 border-slate-700 hover:border-emerald-500"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {isNodeCompleted
                        ? `Tugatilgan (${canonicalProgressKey})`
                        : `Tugatildi deb belgilash (${canonicalProgressKey})`}
                    </span>
                  </button>
                ) : (
                  <span
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono"
                    title="Rejadagi (planned) darslar to‘liq yozilmaguncha yakunlangan deb belgilanmaydi"
                  >
                    🔒 Planned (Yozilgach ochiladi)
                  </span>
                )}
              </div>
            </div>

            {/* Depth Level Switcher (Overview / Understand / Master) */}
            {activeNode.steps && activeNode.steps.length > 0 ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {DEPTH_LIST.map((depth) => {
                      const meta = DEPTH_META[depth];
                      const count = activeNode.steps!.filter(
                        (s) => s.depth === depth,
                      ).length;
                      return (
                        <button
                          key={depth}
                          type="button"
                          onClick={() => {
                            setActiveDepth(depth);
                            setStepIdx(0);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            activeDepth === depth
                              ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                              : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                          }`}
                        >
                          {meta.uzLabel} ({count} qadam)
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTushunmadim((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Tushunmadim — soddaroq tushuntir</span>
                  </button>
                </div>

                {/* "Tushunmadim" Prerequisite Detour Panel */}
                {showTushunmadim && (
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-3 text-xs">
                    <div className="font-bold text-amber-200">
                      Tayanch tushunchalar (Prerequisites) va soddaroq izoh:
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      Ushbu mavzuni qiynalmasdan tushunish uchun avval guruh o‘rtachasi (Mean), dispersiya (Variance), kovariatsiya (Covariance) va eksperimentdan oldingi ko‘rsatkich (Pre-period covariate) tushunchalarini ko‘rib chiqing:
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {activeNode.prerequisiteRefs.map((prereqRef) => {
                        const targetNode = getDsNodeByIdOrContentRef(prereqRef);
                        return (
                          <button
                            key={prereqRef}
                            type="button"
                            onClick={() => {
                              setDetourReturnNodeId(activeNode.id);
                              if (targetNode) {
                                selectNode(targetNode, "overview");
                              } else {
                                onJumpToMldsLesson(prereqRef);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-amber-500/40 text-amber-300 font-mono hover:bg-slate-900 cursor-pointer"
                          >
                            Tayanch darsga o‘tish: {prereqRef} →
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Active Atomic Step Card */}
                {currentStep && (
                  <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-mono">
                      <span>
                        {DEPTH_META[currentStep.depth].uzLabel} • Qadam{" "}
                        {stepIdx + 1} / {depthSteps.length} (Umumiy #
                        {currentStep.stepNumber})
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      {currentStep.title}
                    </h4>

                    <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                      {currentStep.explanationUz}
                    </p>

                    {currentStep.formulaLatex && (
                      <FormulaDisplay
                        title="Matematik ifoda"
                        symbolic={currentStep.formulaLatex}
                        context={currentStep.objectiveUz}
                      />
                    )}

                    {currentStep.calculationTable && (
                      <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 font-mono">
                            <tr>
                              {currentStep.calculationTable.headers.map((h) => (
                                <th key={h} className="py-2 px-3">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/70 font-mono">
                            {currentStep.calculationTable.rows.map((r, rIdx) => (
                              <tr key={rIdx} className="bg-slate-950/60">
                                {r.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className="py-2 px-3 text-slate-200"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {currentStep.calculationTable.captionUz && (
                          <div className="px-3 py-2 bg-slate-900/60 text-[11px] text-amber-300 border-t border-slate-800">
                            {currentStep.calculationTable.captionUz}
                          </div>
                        )}
                      </div>
                    )}

                    {currentStep.codeSnippet && (
                      <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-emerald-300 font-mono">
                          <span className="inline-flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5" />
                            <span>
                              Runnable Python ({activeNode.pythonRunnablePath ?? "Python 3"})
                            </span>
                          </span>
                        </div>
                        <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                          <code>{currentStep.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-xs text-emerald-200">
                      <strong>Asosiy xulosa:</strong> {currentStep.keyTakeawayUz}
                    </div>

                    {/* Step Navigation Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        disabled={stepIdx === 0}
                        onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Oldingi qadam</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {depthSteps.map((s, idx) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setStepIdx(idx)}
                            className={`w-6 h-6 rounded-lg text-[11px] font-mono font-bold cursor-pointer ${
                              idx === stepIdx
                                ? "bg-cyan-500 text-slate-950"
                                : "bg-slate-900 text-slate-400 border border-slate-800"
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        disabled={stepIdx >= depthSteps.length - 1}
                        onClick={() =>
                          setStepIdx((i) =>
                            Math.min(depthSteps.length - 1, i + 1),
                          )
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs disabled:opacity-40 cursor-pointer"
                      >
                        <span>Keyingi qadam</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Manim Video Player if Asset Exists */}
                {activeNode.manimAssetPath && (
                  <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white inline-flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-cyan-400" />
                        <span>
                          Manim Matematik Animatsiyasi ({activeNode.manimAssetPath})
                        </span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        examples/manim/ab_experiment.py
                      </span>
                    </div>
                    <video
                      key={activeNode.manimAssetPath}
                      src={activeNode.manimAssetPath}
                      controls
                      playsInline
                      className="w-full max-h-72 rounded-xl bg-black border border-slate-800"
                    />
                  </div>
                )}

                {/* Interactive React Visualization Lab */}
                {activeNode.interactiveLabId && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>Interaktiv React Matematik Laboratoriyasi</span>
                    </div>
                    {activeNode.interactiveLabId === "gradient-descent-1d" ? (
                      <GradientDescent />
                    ) : (
                      <ConfusionMatrixExplorer
                        key={activeNode.interactiveLabId}
                        initialMode={activeNode.interactiveLabId}
                      />
                    )}
                  </div>
                )}

                {/* Checkpoint Questions */}
                {activeNode.checkpointQuestions &&
                  activeNode.checkpointQuestions.length > 0 && (
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
                      <div className="text-sm font-bold text-white">
                        Bilimni tekshirish (Checkpoint Questions)
                      </div>
                      {activeNode.checkpointQuestions.map((q) => {
                        const chosen = quizAnswers[q.id];
                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs"
                          >
                            <div className="font-semibold text-slate-100">
                              {q.promptUz}
                            </div>
                            <div className="space-y-1.5">
                              {getShuffledQuizOptions(q.id, q.options, q.correctIndex).map((opt) => {
                                const isChosen = chosen === opt.originalIndex;
                                const isRight = opt.isCorrect;
                                return (
                                  <button
                                    key={opt.originalIndex}
                                    type="button"
                                    onClick={() =>
                                      setQuizAnswers((prev) => ({
                                        ...prev,
                                        [q.id]: opt.originalIndex,
                                      }))
                                    }
                                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                                      isChosen
                                        ? isRight
                                          ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold"
                                          : "bg-rose-950/60 border-rose-500 text-rose-200"
                                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                                    }`}
                                  >
                                    {opt.text}
                                  </button>
                                );
                              })}
                            </div>
                            {chosen !== undefined && (
                              <div
                                className={`p-2.5 rounded-lg text-[11px] ${
                                  chosen === q.correctIndex
                                    ? "bg-emerald-950/40 text-emerald-300"
                                    : "bg-amber-950/40 text-amber-200"
                                }`}
                              >
                                {q.explanationUz}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            ) : (
              /* Honest Planned Shell State for Unauthored Nodes */
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 text-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono">
                  Honest Planned Node Shell ({activeNode.status})
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Ushbu navigatsiya tuguni (<strong>{activeNode.id}</strong> /{" "}
                  <code className="text-cyan-300">{activeNode.contentRef}</code>) Data Scientist 20-Phase Deep-Dive o‘quv rejasida ro‘yxatga olingan, ammo uning to‘liq matni hali chop etilmagan (planned). Platforma qoidasiga binoan, rejadagi mavzular tayyor maqola sifatida ko‘rsatilmaydi.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-slate-400">Mo‘ljallangan chuqurliklar:</div>
                    <div className="font-mono text-white">
                      {activeNode.targetDepths.join(" → ")}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-slate-400">Tayanch tugunlar:</div>
                    <div className="font-mono text-cyan-300">
                      {activeNode.prerequisiteRefs.join(", ") || "Boshlang‘ich nuqta"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Source Reference Leads Footer (`DS_RESOURCE_INDEX`) */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  Manba katalogidagi qidiruv yo‘nalishlari (Source Leads — URL tekshirilmagan):
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.sourceRefs.map((refId) => {
                  const res = DS_RESOURCE_INDEX[refId];
                  if (!res) return null;
                  return (
                    <div
                      key={refId}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2"
                    >
                      <span className="font-semibold text-white">{res.title}</span>
                      <span className="text-slate-400">({res.provider})</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-900 text-amber-300 font-mono text-[10px]">
                        {res.urlStatus}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
