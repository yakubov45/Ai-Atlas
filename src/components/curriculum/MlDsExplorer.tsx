"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Copy,
  ExternalLink,
  FlaskConical,
  HelpCircle,
  Layers,
  Link2,
  Network,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Table,
  Target,
  Terminal,
} from "lucide-react";
import {
  ML_DS_PHASES,
  ML_DS_TRACKS,
  TOTAL_ML_DS_MICRO_LESSONS,
  getMlDsGuidedSteps,
  getMlDsMicroLesson,
  type MlDsTrackId,
} from "@/lib/curriculum/ml-ds";
import { DEPTH_META, type LearningDepth, type TopicRole } from "@/lib/curriculum/paths";
import { useLearning } from "@/hooks/use-learning";
import { FormulaDisplay } from "@/components/visualizations/FormulaDisplay";
import { PhaseDropdown } from "./PhaseDropdown";
import { GradientDescent } from "@/components/visualizations/GradientDescent";
import { FunctionExplorer } from "@/components/visualizations/FunctionExplorer";
import { ConfusionMatrixExplorer } from "@/components/visualizations/MlDsGuaranteeLabs";
import { CosineSimilarityExplorer } from "@/components/visualizations/CosineSimilarityExplorer";
import { RagPipelineExplorer } from "@/components/visualizations/RagPipelineExplorer";
import { AttentionExplorer } from "@/components/visualizations/AttentionExplorer";
import { NeuralNetworkExplorer } from "@/components/visualizations/NeuralNetworkExplorer";
import { DsDeepDivePanel } from "@/components/curriculum/DsDeepDivePanel";
import { GuidedPractice } from "@/components/practice/GuidedPractice";
import { getLessonPractice } from "@/lib/practice/registry";
import type { LessonPractice, PracticeExample } from "@/lib/practice/types";
import type { PracticeResultInfo } from "@/components/practice/PracticeLab";
import { MlDsVisualLabs } from "@/components/visualizations/MlDsVisualLabs";

const DEPTH_ORDER: readonly LearningDepth[] = ["overview", "understand", "master"];

const ROLE_BADGE: Record<
  TopicRole,
  { label: string; className: string }
> = {
  core: {
    label: "Core (Majburiy)",
    className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  },
  supporting: {
    label: "Supporting (Tayanch)",
    className: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
  },
  advanced: {
    label: "Advanced (Chuqur)",
    className: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  },
  optional: {
    label: "Optional (Overview)",
    className: "bg-slate-800/80 text-slate-400 border-slate-700",
  },
};

export interface MlDsExplorerProps {
  initialLessonId?: string;
  initialPhaseId?: string;
  initialStep?: "theory" | "examples" | "quiz" | "practice";
}

export function MlDsExplorer({
  initialLessonId = "mlds-11-13",
  initialPhaseId,
  initialStep = "theory",
}: MlDsExplorerProps) {
  const {
    state,
    setSelectedMlDsTrack,
    isMicroLessonCompleted,
    toggleMicroLessonCompleted,
    isDepthCompleted,
    setDepthCompleted,
    isConceptKnown,
    toggleConceptKnown,
    setDetourReturnTo,
    setLastMicroStep,
    savePracticeSubmission,
  } = useLearning();

  const [activeTab, setActiveTab] = useState<
    "player" | "phases" | "ds-deep" | "labs"
  >("player");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(() => {
    if (initialPhaseId) return initialPhaseId;
    const parts = initialLessonId.split("-");
    return parts.length >= 2 ? `${parts[0]}-${parts[1]}` : "mlds-11";
  });
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "planned">("all");
  const [selectedPracticeTaskIdx, setSelectedPracticeTaskIdx] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const syncUrl = (lessonId: string, phaseId: string, step: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "ml-ds");
    url.searchParams.set("phase", phaseId);
    url.searchParams.set("lesson", lessonId);
    url.searchParams.set("step", step);
    window.history.replaceState(null, "", url.toString());
  };

  const handleShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "ml-ds");
    url.searchParams.set("phase", selectedPhaseId);
    url.searchParams.set("lesson", activeLessonId);
    url.searchParams.set("step", lessonStep);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = async (code: string, snippetId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippetId(snippetId);
      setTimeout(() => setCopiedSnippetId(null), 2000);
    } catch {
      // ignore
    }
  };

  const savedProgress = state.lastMicroStep[activeLessonId];
  const [activeDepth, setActiveDepth] = useState<LearningDepth>(
    savedProgress?.depth ?? "understand",
  );
  const [stepIndex, setStepIndex] = useState<number>(savedProgress?.stepIndex ?? 0);

  const [lessonStep, setLessonStep] = useState<"theory" | "examples" | "quiz" | "practice">(
    initialStep,
  );
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [showRemediation, setShowRemediation] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const lessonParam = params.get("lesson");
    const phaseParam = params.get("phase");
    const stepParam = params.get("step") as "theory" | "examples" | "quiz" | "practice" | null;

    let targetLesson = activeLessonId;
    let targetPhase = selectedPhaseId;
    let targetStep = lessonStep;

    if (lessonParam && getMlDsMicroLesson(lessonParam)) {
      targetLesson = lessonParam;
      const parts = lessonParam.split("-");
      targetPhase = parts.length >= 2 ? `${parts[0]}-${parts[1]}` : "mlds-11";
      setActiveLessonId(targetLesson);
      setSelectedPhaseId(targetPhase);
      setActiveTab("player");
    } else if (phaseParam) {
      const foundPhase = ML_DS_PHASES.find(
        (p) => p.id === phaseParam || p.order.toString() === phaseParam || `mlds-${p.order}` === phaseParam,
      );
      if (foundPhase && foundPhase.lessons.length > 0) {
        targetPhase = foundPhase.id;
        targetLesson = foundPhase.lessons[0]!.id;
        setSelectedPhaseId(targetPhase);
        setActiveLessonId(targetLesson);
      }
    }

    if (stepParam && ["theory", "examples", "quiz", "practice"].includes(stepParam)) {
      targetStep = stepParam;
      setLessonStep(targetStep);
    }

    syncUrl(targetLesson, targetPhase, targetStep);
  }, []);

  const activeTrackId: MlDsTrackId = state.selectedMlDsTrackId ?? "ml-engineer";
  const activeTrack = useMemo(
    () => ML_DS_TRACKS.find((t) => t.id === activeTrackId) ?? ML_DS_TRACKS[0]!,
    [activeTrackId],
  );

  const activeLookup = useMemo(
    () =>
      getMlDsMicroLesson(activeLessonId) ?? getMlDsMicroLesson("mlds-11-13"),
    [activeLessonId],
  );

  const practiceForActiveLesson: LessonPractice | null = useMemo(() => {
    if (!activeLookup) return null;
    const lesson = activeLookup.lesson;

    if (
      lesson.practiceTasks &&
      lesson.practiceTasks.length > 1 &&
      selectedPracticeTaskIdx === 1
    ) {
      const task = lesson.practiceTasks[1]!;
      return {
        id: `prac-${lesson.id}-${task.difficulty}`,
        lessonId: lesson.id,
        depth: activeDepth,
        objectiveUz: lesson.learningObjectiveUz ?? lesson.title,
        prerequisites: (lesson.pythonPrerequisites ?? lesson.prerequisites) as string[],
        theorySteps: [
          {
            id: `th-${lesson.id}-challenge`,
            title: "2-daraja (Challenge): Murakkab amaliy topshiriq",
            bodyMdx: lesson.theoryUz ?? "Nazariy asoslar va qoidalar.",
          },
        ],
        examples: [
          {
            id: `ex-${lesson.id}-1`,
            titleUz: lesson.examples?.[0]?.titleUz ?? "1-misol",
            explanationUz: lesson.examples?.[0]?.explanationUz ?? "",
            code: lesson.examples?.[0]?.code ?? "import numpy as np",
            expectedOutput: lesson.examples?.[0]?.expectedOutput ?? "",
            walkthrough: [lesson.examples?.[0]?.explanationUz ?? ""],
            whyThisOutputUz: "Amaliy Python kodi va tekshiruv.",
          },
        ] as unknown as [PracticeExample, PracticeExample] | [PracticeExample],
        exercise: {
          id: task.id,
          titleUz: task.titleUz,
          instructionsUz: task.instructionsUz,
          language: "python",
          runtime: "pyodide",
          difficulty: task.difficulty,
          assessment: "deterministic",
          starterCode: task.starterCode,
          expectedBehaviorUz: task.instructionsUz,
          hintsUz: task.hintsUz as string[],
          testCases: [
            {
              id: `${task.id}-tc-1`,
              descriptionUz: "Mustaqil dasturlash test holati",
            },
          ],
          testRunnerCode: task.testCode,
        },
        status: "published",
      };
    }

    return (
      getLessonPractice(lesson.id, activeDepth) ??
      getLessonPractice(lesson.id)
    );
  }, [activeLookup, activeDepth, selectedPracticeTaskIdx]);

  const allGuidedSteps = useMemo(() => {
    if (!activeLookup) return [];
    return getMlDsGuidedSteps(activeLookup.lesson, activeLookup.phase);
  }, [activeLookup]);

  const currentDepthSteps = useMemo(() => {
    return allGuidedSteps.filter((s) => s.depth === activeDepth);
  }, [allGuidedSteps, activeDepth]);

  const clampedStepIdx = Math.min(
    Math.max(0, stepIndex),
    Math.max(0, currentDepthSteps.length - 1),
  );
  const currentStep = currentDepthSteps[clampedStepIdx] ?? null;

  const selectLesson = (
    lessonId: string,
    targetDepth?: LearningDepth,
    targetStepIndex?: number,
  ) => {
    const saved = state.lastMicroStep[lessonId];
    const nextDepth: LearningDepth = targetDepth ?? saved?.depth ?? "overview";
    const nextStep = targetStepIndex ?? saved?.stepIndex ?? 0;
    const parts = lessonId.split("-");
    const phaseId = parts.length >= 2 ? `${parts[0]}-${parts[1]}` : "mlds-11";
    setActiveLessonId(lessonId);
    setSelectedPhaseId(phaseId);
    setActiveDepth(nextDepth);
    setStepIndex(nextStep);
    setLessonStep("theory");
    setSelectedQuizIdx(null);
    setShowRemediation(false);
    setSelectedPracticeTaskIdx(0);
    setQuizAnswers({});
    setActiveTab("player");
    setLastMicroStep(lessonId, nextDepth, nextStep);
    syncUrl(lessonId, phaseId, "theory");
  };

  const handleSetLessonStep = (step: "theory" | "examples" | "quiz" | "practice") => {
    setLessonStep(step);
    syncUrl(activeLessonId, selectedPhaseId, step);
  };

  const handleDepthChange = (depth: LearningDepth) => {
    setActiveDepth(depth);
    setStepIndex(0);
    setSelectedQuizIdx(null);
    setShowRemediation(false);
    setLastMicroStep(activeLessonId, depth, 0);
  };

  const handleStepChange = (nextIdx: number) => {
    const bounded = Math.min(
      Math.max(0, nextIdx),
      Math.max(0, currentDepthSteps.length - 1),
    );
    setStepIndex(bounded);
    setSelectedQuizIdx(null);
    setShowRemediation(false);
    setLastMicroStep(activeLessonId, activeDepth, bounded);
  };

  // Prerequisite Detour ("Tushunmadim" -> Go to prerequisite lesson)
  const handleDetourToPrerequisite = (prereqLessonId: string) => {
    setDetourReturnTo({
      lessonId: activeLessonId,
      depth: activeDepth,
      stepIndex: clampedStepIdx,
    });
    selectLesson(prereqLessonId, "overview", 0);
  };

  // Return from Prerequisite Detour back to exact lesson, depth, and step
  const handleReturnFromDetour = () => {
    if (!state.detourReturnTo) return;
    const { lessonId, depth, stepIndex: returnStep } = state.detourReturnTo;
    setDetourReturnTo(null);
    selectLesson(lessonId, depth, returnStep);
  };

  const filteredPhases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ML_DS_PHASES.map((phase) => {
      const lessons = phase.lessons.filter((m) => {
        if (statusFilter === "published" && m.status !== "published") return false;
        if (statusFilter === "planned" && m.status === "published") return false;
        if (!q) return true;
        return (
          m.id.toLowerCase().includes(q) ||
          m.title.toLowerCase().includes(q) ||
          phase.sourceSection.toLowerCase().includes(q) ||
          phase.title.toLowerCase().includes(q)
        );
      });
      return { ...phase, filteredLessons: lessons };
    }).filter((p) => p.filteredLessons.length > 0);
  }, [searchQuery, statusFilter]);

  const publishedCount = useMemo(
    () =>
      ML_DS_PHASES.reduce(
        (sum, p) => sum + p.lessons.filter((m) => m.status === "published").length,
        0,
      ),
    [],
  );
  const plannedCount = TOTAL_ML_DS_MICRO_LESSONS - publishedCount;

  const completedMicroCount = ML_DS_PHASES.reduce(
    (acc, p) =>
      acc + p.lessons.filter((m) => isMicroLessonCompleted(m.id)).length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* 1. Header: Clean, Compact & Focused */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-900/95 to-emerald-950/20 p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                ML &amp; Data Science • 31 Faza • 520 Mikro-Dars
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Machine Learning &amp; Data Science O‘quv Dasturi
            </h2>
            <p className="text-xs text-slate-400">
              Chiziqli algebra, Calculus, Ehtimollik, A/B Testing (CUPED), Supervised/Unsupervised ML, Confusion Matrix va Deep Learning.
            </p>
          </div>

          {/* Compact Progress Badge */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Progress
              </div>
              <div className="text-base font-bold font-mono text-emerald-400">
                {completedMicroCount} / {TOTAL_ML_DS_MICRO_LESSONS}
                <span className="text-xs text-slate-500 font-normal ml-1">
                  ({Math.round((completedMicroCount / TOTAL_ML_DS_MICRO_LESSONS) * 100)}%)
                </span>
              </div>
            </div>
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{
                  width: `${Math.round((completedMicroCount / TOTAL_ML_DS_MICRO_LESSONS) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Compact Horizontal Track Selector Pills */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-xs mr-1 font-medium flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            Track:
          </span>
          {ML_DS_TRACKS.map((track) => {
            const isSelected = activeTrackId === track.id;
            const coreCount = Object.values(track.phasePriority).filter(
              (r) => r === "core",
            ).length;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedMlDsTrack(track.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                    : "bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                }`}
              >
                <span>{track.label}</span>
                <span className="ml-1 text-[10px] opacity-75">({coreCount} core)</span>
              </button>
            );
          })}
        </div>
        {activeTrack && (
          <div className="text-[11px] text-emerald-300/90 flex flex-wrap items-center gap-2">
            <span><strong>Capstone:</strong> {activeTrack.capstone}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{activeTrack.description}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("player")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              activeTab === "player"
                ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Dars &amp; Amaliyot ({activeLessonId})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("phases")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              activeTab === "phases"
                ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Barcha Fazalar (31)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedMlDsTrack("data-scientist");
              setActiveTab("ds-deep");
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              activeTab === "ds-deep"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-950/40"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DS 20-Faza Deep-Dive (CUPED ★)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("labs")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              activeTab === "labs"
                ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Vizual Laboratoriyalar (31)</span>
          </button>
        </div>
      </div>

      {/* PREREQUISITE DETOUR RETURN BANNER ("Tushunmadim" exact return state) */}
      {state.detourReturnTo && (
        <div
          data-testid="mlds-detour-return-banner"
          className="rounded-xl border border-amber-500/50 bg-amber-950/30 p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs sm:text-sm text-amber-100">
              <span className="font-bold text-amber-300">
                Prerequisite aylanma yo‘li (Detour) faol:
              </span>{" "}
              Siz{" "}
              <span className="font-mono font-semibold text-white">
                {state.detourReturnTo.lessonId}
              </span>{" "}
              darsining{" "}
              <span className="uppercase font-semibold text-amber-300">
                {state.detourReturnTo.depth}
              </span>{" "}
              darajasi,{" "}
              <span className="font-mono font-semibold text-white">
                {state.detourReturnTo.stepIndex + 1}-qadamidan
              </span>{" "}
              prerequisite tushunchani mustahkamlash uchun keldingiz.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReturnFromDetour}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                {state.detourReturnTo.lessonId} ({state.detourReturnTo.stepIndex + 1}-qadamga) qaytish
              </span>
            </button>
            <button
              type="button"
              onClick={() => setDetourReturnTo(null)}
              className="px-2.5 py-2 rounded-lg text-xs text-amber-300/80 hover:text-white cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: GUIDED MICRO-LESSON PLAYER */}
      {activeTab === "player" && activeLookup && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar: Phase Micro-Lessons List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="mlds-phase-select"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Fazani tanlang (mlds-01..mlds-31):
                </label>
                <span className="text-[11px] font-mono text-emerald-400">
                  {selectedPhaseId}
                </span>
              </div>
              <PhaseDropdown
                id="mlds-phase-select"
                ariaLabel="ML va Data Science fazani tanlang"
                value={selectedPhaseId}
                accent="emerald"
                options={ML_DS_PHASES.map((p) => ({
                  id: p.id,
                  badge: p.id.toUpperCase(),
                  title: p.title,
                  countLabel: `${p.lessons.length} dars`,
                  hasPublished: p.lessons.some((l) => l.status === "published"),
                }))}
                onChange={(nextPhaseId) => {
                  setSelectedPhaseId(nextPhaseId);
                  const phase = ML_DS_PHASES.find((p) => p.id === nextPhaseId);
                  if (phase && phase.lessons[0]) {
                    selectLesson(phase.lessons[0].id, "overview", 0);
                  }
                }}
              />

              <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
                {ML_DS_PHASES.find(
                  (p) => p.id === selectedPhaseId,
                )?.lessons.map((m) => {
                  const isCurrent = m.id === activeLessonId;
                  const isDone = isMicroLessonCompleted(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => selectLesson(m.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isCurrent
                          ? "bg-emerald-600/20 border-emerald-500 text-white"
                          : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                            {m.id}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                              m.status === "published"
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {m.status === "published" ? "Published" : "Tayyorlanmoqda"}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-slate-100 mt-0.5 truncate">
                          {m.title}
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

          {/* Right Main Area: Guided Micro-Lesson Player */}
          <div className="lg:col-span-8 space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-5">
              {/* Lesson Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
                      {activeLookup.lesson.id}
                    </span>
                    <span className="text-slate-400">
                      {activeLookup.phase.id}: {activeLookup.phase.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        activeLookup.lesson.status === "published"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {activeLookup.lesson.status === "published"
                        ? `To‘liq interaktiv dars (Published: ${activeLookup.lesson.publishedDepths.join(", ")})`
                        : "Reja-skelet (Tayyorlanmoqda / Planned)"}
                    </span>
                    {activeLookup.lesson.crosslinkedAiLessonId && (
                      <span className="px-2 py-0.5 rounded bg-violet-500/15 border border-violet-500/30 text-violet-300 font-mono text-[11px]">
                        AI Engineer Crosslink: {activeLookup.lesson.crosslinkedAiLessonId}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {activeLookup.lesson.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manba bo‘limi:{" "}
                    <span className="text-slate-300 font-medium">
                      {activeLookup.phase.sourceSection}
                    </span>
                    {activeLookup.lesson.relatedResearchSlug && (
                      <>
                        {" "}
                        •{" "}
                        <Link
                          href={`/learn/${activeLookup.lesson.relatedResearchSlug}`}
                          className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 underline underline-offset-4"
                        >
                          <span>Kanonik maqolani o‘qish</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </>
                    )}
                  </p>
                </div>

                {/* Mark Known / Mark Micro-Lesson Completed / Share Link */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShareLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/60 transition-colors cursor-pointer"
                    title="Ushbu darsning to‘g‘ridan-to‘g‘ri havolasini nusxalash"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Havola nusxalandi! 🔗</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ulashish (Havola)</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleConceptKnown(activeLookup.lesson.id)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                      isConceptKnown(activeLookup.lesson.id)
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {isConceptKnown(activeLookup.lesson.id)
                      ? "✓ Allaqachon bilaman"
                      : "Allaqachon bilaman"}
                  </button>
                  {activeLookup.lesson.status === "published" && (
                    <button
                      type="button"
                      onClick={() =>
                        toggleMicroLessonCompleted(activeLookup.lesson.id)
                      }
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                        isMicroLessonCompleted(activeLookup.lesson.id)
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                          : "bg-emerald-600 border-emerald-500 text-slate-950 font-bold hover:bg-emerald-500"
                      }`}
                    >
                      {isMicroLessonCompleted(activeLookup.lesson.id)
                        ? "✓ Mikro-dars tugatilgan"
                        : "Mikro-darsni tugatish"}
                    </button>
                  )}
                </div>
              </div>

              {/* 4-Step Sequential Learning Workflow Navigation */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => handleSetLessonStep("theory")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lessonStep === "theory"
                      ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>1. Nazariya</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetLessonStep("examples")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lessonStep === "examples"
                      ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>2. Misollar (2 ta)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetLessonStep("quiz")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lessonStep === "quiz"
                      ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>3. Test (3 ta)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetLessonStep("practice")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lessonStep === "practice"
                      ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-emerald-300"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>4. Amaliy Kod (Laboratoriya)</span>
                </button>
              </div>

              {/* STEP 1: NAZARIYA (Theory & Intuition & Depth) */}
              {lessonStep === "theory" && (
                <div className="space-y-4">
                  {/* Objective & Visual Lab Shortcut */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-200">
                      <span className="font-bold text-emerald-400">🎯 O‘quv maqsadi:</span>
                      <span>{activeLookup.lesson.learningObjectiveUz ?? activeLookup.lesson.title}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPhaseId(activeLookup.phase.id);
                        setActiveTab("labs");
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold hover:bg-emerald-500/25 transition-colors cursor-pointer"
                    >
                      <FlaskConical className="w-3 h-3" />
                      <span>Phase {activeLookup.phase.id} Vizual Lab →</span>
                    </button>
                  </div>

                  {/* 3 Depth Selector Pills (Overview / Understand / Master) */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium mr-1">Chuqurlik:</span>
                    {DEPTH_ORDER.map((depthKey) => {
                      const def = DEPTH_META[depthKey];
                      const isActive = activeDepth === depthKey;
                      const depthDone = isDepthCompleted(activeLookup.lesson.id, depthKey);
                      return (
                        <button
                          key={depthKey}
                          type="button"
                          onClick={() => handleDepthChange(depthKey)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            isActive
                              ? "bg-emerald-600/30 border-emerald-500 text-white shadow-sm"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          <span>{def.title}</span>
                          {depthDone && <span className="ml-1 text-emerald-400">✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Guided Step Body */}
                  {currentStep && (
                    <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-5 space-y-4">
                      {currentDepthSteps.length > 1 && (
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                          <span className="text-xs font-bold text-emerald-300">
                            Qadam {clampedStepIdx + 1} / {currentDepthSteps.length}: {currentStep.title}
                          </span>
                          <div className="flex items-center gap-1">
                            {currentDepthSteps.map((s, idx) => (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => handleStepChange(idx)}
                                title={s.title}
                                className={`h-2 rounded-full transition-all cursor-pointer ${
                                  idx === clampedStepIdx
                                    ? "w-5 bg-emerald-400"
                                    : idx < clampedStepIdx
                                      ? "w-2 bg-emerald-500/70"
                                      : "w-2 bg-slate-800"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">
                        {currentStep.body}
                      </div>

                      {/* Formula Display */}
                      {currentStep.formula && (
                        <FormulaDisplay
                          title="Matematik formula"
                          symbolic={currentStep.formula}
                          context={currentStep.title}
                        />
                      )}

                      {/* Code Snippet in Step */}
                      {currentStep.codeSnippet && (
                        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                          <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1.5 font-mono">
                              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>python</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(currentStep.codeSnippet!, `step-${clampedStepIdx}`)}
                              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              {copiedSnippetId === `step-${clampedStepIdx}` ? (
                                <span className="text-emerald-400 font-semibold">✓ Nusxa olindi</span>
                              ) : (
                                <span>Nusxa olish</span>
                              )}
                            </button>
                          </div>
                          <pre className="p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                            <code>{currentStep.codeSnippet}</code>
                          </pre>
                        </div>
                      )}

                      {/* Visual Concept Flow Pipeline */}
                      {activeLookup.lesson.visualFlow && activeLookup.lesson.visualFlow.length > 0 && (
                        <div className="rounded-xl border border-emerald-500/30 bg-slate-900/60 p-4 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                            <Network className="w-4 h-4 text-emerald-400" />
                            <span>Vizual Mexanizm va Konsept Quvuri (Visual Flow)</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                            {activeLookup.lesson.visualFlow.map((st, sIdx) => (
                              <div key={sIdx} className="relative flex flex-col p-3 rounded-lg border border-slate-800 bg-slate-950/80">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="w-5 h-5 rounded-full bg-emerald-600/30 border border-emerald-500/50 text-[10px] font-bold text-emerald-300 flex items-center justify-center">
                                    {st.step}
                                  </span>
                                  {sIdx < activeLookup.lesson.visualFlow!.length - 1 && (
                                    <span className="hidden lg:block text-slate-500 text-xs font-mono">➔</span>
                                  )}
                                </div>
                                <div className="text-xs font-semibold text-white mb-0.5">{st.label}</div>
                                <div className="text-[11px] text-slate-400 leading-snug">{st.detail}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interactive Visual Lab Shortcut Card */}
                      <div className="rounded-xl border border-teal-500/30 bg-gradient-to-r from-teal-950/30 via-slate-950/80 to-slate-950 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                            <FlaskConical className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              Phase {activeLookup.phase.id} Vizual Laboratoriyasi: {activeLookup.phase.visualizationDescription || activeLookup.phase.title}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Parametrlarni o'zgartirib, simulyatsiyani real vaqtda sinab ko'ring
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPhaseId(activeLookup.phase.id);
                            setActiveTab("labs");
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                        >
                          <span>Laboratoriyani Ochish</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Interactive Visualizations */}
                      {currentStep.visualizationId === "gradient-descent-1d" && (
                        <div className="pt-2 space-y-3">
                          <div className="rounded-xl border border-emerald-500/30 bg-slate-900/70 p-3">
                            <div className="text-xs font-semibold text-emerald-300 mb-2">
                              Manim animatsiyasi — Gradient Descent:
                            </div>
                            <video
                              src="/animations/gradient-descent/gradient_descent.mp4"
                              controls
                              playsInline
                              className="w-full max-h-[260px] rounded-lg bg-black border border-slate-800"
                            />
                          </div>
                          <GradientDescent />
                        </div>
                      )}

                      {currentStep.visualizationId === "function-explorer" && (
                        <div className="pt-2 space-y-3">
                          <div className="rounded-xl border border-violet-500/30 bg-slate-900/70 p-3">
                            <div className="text-xs font-semibold text-violet-300 mb-2">
                              Manim animatsiyasi — Funksiyalar va Hosila (Slope):
                            </div>
                            <video
                              src="/animations/functions/function_explorer.mp4"
                              controls
                              playsInline
                              className="w-full max-h-[260px] rounded-lg bg-black border border-slate-800"
                            />
                          </div>
                          <FunctionExplorer />
                        </div>
                      )}

                      {currentStep.visualizationId === "confusion-matrix-explorer" && (
                        <div className="pt-2">
                          <ConfusionMatrixExplorer initialMode="confusion-matrix" />
                        </div>
                      )}

                      {currentStep.visualizationId === "ab-cuped-explorer" && (
                        <div className="pt-2">
                          <ConfusionMatrixExplorer initialMode="ab-cuped" />
                        </div>
                      )}

                      {currentStep.visualizationId === "cosine-similarity-explorer" && (
                        <div className="pt-2">
                          <CosineSimilarityExplorer />
                        </div>
                      )}

                      {currentStep.visualizationId === "rag-sandbox-explorer" && (
                        <div className="pt-2">
                          <RagPipelineExplorer />
                        </div>
                      )}

                      {currentStep.visualizationId === "self-attention-explorer" && (
                        <div className="pt-2">
                          <AttentionExplorer />
                        </div>
                      )}

                      {currentStep.visualizationId === "neural-network-explorer" && (
                        <div className="pt-2">
                          <NeuralNetworkExplorer />
                        </div>
                      )}

                      {/* Checkpoint Quiz */}
                      {currentStep.checkpoint && (
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 space-y-3">
                          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                            Tekshiruv savoli (Checkpoint)
                          </div>
                          <p className="text-sm font-medium text-white">
                            {currentStep.checkpoint.question}
                          </p>
                          <div className="space-y-2">
                            {currentStep.checkpoint.options.map((opt, idx) => {
                              const isSelected = selectedQuizIdx === idx;
                              const isCorrect = idx === currentStep.checkpoint!.correctIndex;
                              let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                              if (selectedQuizIdx !== null) {
                                if (isCorrect) {
                                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold";
                                } else if (isSelected) {
                                  btnStyle = "bg-rose-500/20 border-rose-500 text-rose-200";
                                }
                              }
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setSelectedQuizIdx(idx)}
                                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {selectedQuizIdx !== null && (
                            <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                              <div>
                                <strong className="text-emerald-400">Izoh: </strong>
                                {currentStep.checkpoint.explanation}
                              </div>
                              <div className="text-cyan-300">
                                <strong>Chuqurroq: </strong>
                                {currentStep.checkpoint.whyQuestion}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* "Tushunmadim" Panel */}
                      {currentStep.tushunmadim && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setShowRemediation((prev) => !prev)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>
                              {showRemediation
                                ? "Tushuntirishni yashirish"
                                : "Tushunmadim — soddaroq misol va tayanch dars"}
                            </span>
                          </button>

                          {showRemediation && (
                            <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-950/25 p-4 space-y-3 text-xs sm:text-sm">
                              <div className="font-bold text-amber-300">
                                Soddalashtirilgan tushuntirish va sonli misol:
                              </div>
                              <p className="text-slate-200 leading-relaxed">
                                {currentStep.tushunmadim.simplerBreakdown}
                              </p>
                              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-xs text-cyan-300">
                                {currentStep.tushunmadim.numericMicroExample}
                              </div>

                              {currentStep.tushunmadim.prerequisiteLessonId && (
                                <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-xs text-amber-200/90">
                                    Tayanch tushunchani o‘rganib, aynan shu qadamga qaytish:
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDetourToPrerequisite(
                                        currentStep.tushunmadim.prerequisiteLessonId!,
                                      )
                                    }
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                                  >
                                    <span>
                                      Prerequisite darsga o‘tish:{" "}
                                      {currentStep.tushunmadim.prerequisiteTitle ??
                                        currentStep.tushunmadim.prerequisiteLessonId}
                                    </span>
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step Progress Controls */}
                      {currentDepthSteps.length > 1 && (
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                          <button
                            type="button"
                            disabled={clampedStepIdx === 0}
                            onClick={() => handleStepChange(clampedStepIdx - 1)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Oldingi qadam</span>
                          </button>

                          {clampedStepIdx < currentDepthSteps.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => handleStepChange(clampedStepIdx + 1)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                            >
                              <span>Keyingi qadam</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setDepthCompleted(activeLookup.lesson.id, activeDepth, true);
                                handleSetLessonStep("examples");
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                            >
                              <span>Nazariyani tugatdim →</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Prerequisites Tags */}
                  {((activeLookup.lesson.pythonPrerequisites && activeLookup.lesson.pythonPrerequisites.length > 0) ||
                    activeLookup.lesson.crosslinkedAiLessonId) && (
                    <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                      <span className="text-slate-400 font-semibold text-[11px]">Tayanch darslar:</span>
                      {activeLookup.lesson.pythonPrerequisites?.map((prereqId) => (
                        <Link
                          key={prereqId}
                          href={`/roadmap?tab=python-dev&lesson=${prereqId}`}
                          className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] hover:bg-emerald-900/40 transition-colors"
                        >
                          Python: {prereqId} →
                        </Link>
                      ))}
                      {activeLookup.lesson.crosslinkedAiLessonId && (
                        <Link
                          href={`/roadmap?tab=ai-engineer&lesson=${activeLookup.lesson.crosslinkedAiLessonId}`}
                          className="px-2 py-0.5 rounded bg-violet-950/40 border border-violet-500/40 text-violet-300 font-mono text-[11px] hover:bg-violet-900/40 transition-colors"
                        >
                          AI Eng: {activeLookup.lesson.crosslinkedAiLessonId} →
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Advance to Step 2 */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => handleSetLessonStep("examples")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>2. Namunaviy Misollarni ko‘rish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 2 COMPLETE RUNNABLE EXAMPLES & COMMON MISTAKES */}
              {lessonStep === "examples" && (
                <div className="space-y-5">
                  {/* Examples */}
                  {activeLookup.lesson.examples && activeLookup.lesson.examples.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                        <span>2 ta Namunaviy Misol (To‘liq ishlovchi kod)</span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {activeLookup.lesson.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 inline-flex items-center justify-center font-mono text-[11px]">
                                  {idx + 1}
                                </span>
                                <span>{ex.titleUz}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyCode(ex.code, `mlds-ex-${idx}`)}
                                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                              >
                                {copiedSnippetId === `mlds-ex-${idx}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Nusxalandi</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Nusxa</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                                <code>{ex.code}</code>
                              </pre>
                            </div>

                            {ex.expectedOutput && (
                              <div className="rounded-xl border border-slate-800 bg-black/60 p-3 space-y-1">
                                <div className="text-[10px] font-mono text-slate-400">
                                  Kutilgan natija (Expected Output):
                                </div>
                                <pre className="text-xs font-mono text-amber-200">
                                  <code>{ex.expectedOutput}</code>
                                </pre>
                              </div>
                            )}

                            <p className="text-xs text-slate-300 leading-relaxed">
                              {ex.explanationUz}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                      Ushbu dars uchun namunaviy misollar keyingi bo‘limlarda taqdim etiladi.
                    </div>
                  )}

                  {/* Common Mistakes & Traps */}
                  {activeLookup.lesson.commonMistakes && activeLookup.lesson.commonMistakes.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Keng Tarqalgan Xatolar va Tuzoqlar (Common Mistakes)</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeLookup.lesson.commonMistakes.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-xs"
                          >
                            <div className="font-bold text-rose-200">
                              ❌ {m.mistakeUz}
                            </div>
                            <div className="text-slate-300">
                              <strong>Alomati:</strong> {m.symptomUz}
                            </div>
                            <div className="text-emerald-300">
                              <strong>To‘g‘rilash:</strong> {m.correctionUz}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons for Step 2 */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => handleSetLessonStep("theory")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>1. Nazariyaga qaytish</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetLessonStep("quiz")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>3. Bilimni Tekshirish (Test)ga o‘tish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 3 KNOWLEDGE-CHECK CHECKPOINT QUESTIONS */}
              {lessonStep === "quiz" && (
                <div className="space-y-4">
                  {activeLookup.lesson.quiz && activeLookup.lesson.quiz.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                        <HelpCircle className="w-4 h-4 text-emerald-400" />
                        <span>Bilimni Tekshirish (3 ta Checkpoint Savoli)</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeLookup.lesson.quiz.map((q, qIdx) => {
                          const chosen = quizAnswers[q.id];
                          const questionTypes = [
                            "1. Konseptual Bilim",
                            "2. Output Prediction",
                            "3. Debugging (Xatoni topish)",
                          ];
                          return (
                            <div
                              key={q.id}
                              className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs flex flex-col justify-between"
                            >
                              <div className="space-y-2">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                                  {questionTypes[qIdx] || `Savol #${qIdx + 1}`}
                                </span>
                                <div className="font-semibold text-slate-100 whitespace-pre-line">
                                  {q.promptUz}
                                </div>
                              </div>

                              <div className="space-y-1.5 pt-2">
                                {q.options.map((opt, idx) => {
                                  const isChosen = chosen === idx;
                                  const isRight = idx === q.correctIndex;
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() =>
                                        setQuizAnswers((prev) => ({
                                          ...prev,
                                          [q.id]: idx,
                                        }))
                                      }
                                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                                        isChosen
                                          ? isRight
                                            ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold"
                                            : "bg-rose-950/60 border-rose-500 text-rose-200"
                                          : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {chosen !== undefined && (
                                <div
                                  className={`p-3 rounded-xl text-[11px] leading-relaxed ${
                                    chosen === q.correctIndex
                                      ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-200"
                                      : "bg-amber-950/40 border border-amber-500/40 text-amber-200"
                                  }`}
                                >
                                  <strong>
                                    {chosen === q.correctIndex
                                      ? "To‘g‘ri! 🎉 "
                                      : "Qayta o‘ylab ko‘ring. "}
                                  </strong>
                                  {q.explanationUz}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                      Ushbu dars uchun test savollari tez orada qo‘shiladi.
                    </div>
                  )}

                  {/* Navigation Buttons for Step 3 */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => handleSetLessonStep("examples")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>2. Misollarga qaytish</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetLessonStep("practice")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>4. Amaliy Kod Yozishga o‘tish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 2 INDEPENDENT PRACTICAL EXERCISES (PYODIDE EXECUTION) */}
              {lessonStep === "practice" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>Amaliy Dasturlash (Brauzerda Pyodide Laboratoriyasi)</span>
                    </div>

                    {activeLookup.lesson.practiceTasks &&
                      activeLookup.lesson.practiceTasks.length > 1 && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedPracticeTaskIdx(0)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              selectedPracticeTaskIdx === 0
                                ? "bg-emerald-600 text-slate-950 border-emerald-500 font-bold"
                                : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                            }`}
                          >
                            🟢 1-topshiriq: Oson (Starter)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedPracticeTaskIdx(1)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              selectedPracticeTaskIdx === 1
                                ? "bg-violet-600 text-white border-violet-500 font-bold"
                                : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                            }`}
                          >
                            🔴 2-topshiriq: Qiyin (Challenge)
                          </button>
                        </div>
                      )}
                  </div>

                  {practiceForActiveLesson ? (
                    <GuidedPractice
                      key={`${activeLookup.lesson.id}-${activeDepth}-${practiceForActiveLesson.exercise.id}-${selectedPracticeTaskIdx}`}
                      practice={practiceForActiveLesson}
                      initialCode={
                        state.practiceSubmissions?.[
                          `${activeLookup.lesson.id}:${practiceForActiveLesson.exercise.id}:${activeDepth}`
                        ]?.code
                      }
                      onCompleted={(res: PracticeResultInfo) => {
                        savePracticeSubmission(
                          activeLookup.lesson.id,
                          practiceForActiveLesson.exercise.id,
                          activeDepth,
                          {
                            code: res.userCode,
                            testsPassed: res.testsPassed,
                            attemptCount: res.attemptCount,
                            lastRunAt: new Date().toISOString(),
                            passedAt: res.testsPassed ? new Date().toISOString() : undefined,
                            hintsRevealed: res.hintsRevealed,
                          },
                        );
                        if (res.testsPassed) {
                          toggleMicroLessonCompleted(activeLookup.lesson.id);
                        }
                      }}
                    />
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      Ushbu dars uchun amaliy mashq tayyorlanmoqda.
                    </div>
                  )}

                  {/* Summary Takeaways */}
                  {activeLookup.lesson.summaryTakeaways &&
                    activeLookup.lesson.summaryTakeaways.length > 0 && (
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Dars Xulosasi:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {activeLookup.lesson.summaryTakeaways.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Bottom Navigation */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleSetLessonStep("quiz")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>3. Testga qaytish</span>
                    </button>

                    {activeLookup.nextLesson ? (
                      <button
                        type="button"
                        onClick={() =>
                          activeLookup.nextLesson &&
                          selectLesson(activeLookup.nextLesson.id, activeDepth, 0)
                        }
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        <span>Keyingi dars: {activeLookup.nextLesson.id} {activeLookup.nextLesson.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold">
                        🎉 Siz barcha darslarni yakunladingiz!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 31 PHASES & 520 MICRO-LESSONS BROWSER */}
      {activeTab === "phases" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="520 ta ML/DS mikro-dars ichidan qidiring (masalan: mlds-11-13, Gradient, CUPED, Confusion Matrix, ARIMA)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              {(["all", "published", "planned"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer ${
                    statusFilter === status
                      ? "bg-emerald-600 border-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {status === "all"
                    ? `Barchasi (${TOTAL_ML_DS_MICRO_LESSONS})`
                    : status === "published"
                      ? `Published (${publishedCount})`
                      : `Planned (${plannedCount})`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredPhases.map((phase) => {
              const role = phase.trackPriority[activeTrackId] ?? "optional";
              const roleBadge = ROLE_BADGE[role];
              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                          {phase.id} (Phase {phase.order})
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md border text-[11px] font-semibold ${roleBadge.className}`}
                        >
                          {activeTrack.shortLabel}: {roleBadge.label}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {phase.lessons.length} ta mikro-dars
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-slate-300">
                        Manba: {phase.sourceSection}
                      </p>
                    </div>
                    <div className="text-xs text-right space-y-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2">
                      <div className="text-slate-400">
                        Mini-loyiha:{" "}
                        <span className="text-emerald-300 font-medium">
                          {phase.projectMilestone}
                        </span>
                      </div>
                      <div className="text-slate-400">
                        Vizual laboratoriya:{" "}
                        <span className="text-cyan-300 font-medium">
                          {phase.visualizationDescription}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {phase.filteredLessons.map((m) => {
                      const done = isMicroLessonCompleted(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => selectLesson(m.id)}
                          className="text-left p-3 rounded-xl border border-slate-800/90 bg-slate-950/70 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex items-start justify-between gap-2 cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs font-bold text-emerald-400">
                                {m.id}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded ${
                                  m.status === "published"
                                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {m.status === "published" ? "published" : "planned"}
                              </span>
                            </div>
                            <div className="text-xs font-medium text-white mt-1 line-clamp-1">
                              {m.title}
                            </div>
                          </div>
                          {done && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2.5: DATA SCIENTIST 20-PHASE DEEP-DIVE EXTENSION (309 NODES + CUPED) */}
      {activeTab === "ds-deep" && (
        <DsDeepDivePanel
          isMicroLessonCompleted={isMicroLessonCompleted}
          toggleMicroLessonCompleted={toggleMicroLessonCompleted}
          onJumpToMldsLesson={(mldsId) => {
            selectLesson(mldsId, "understand", 0);
          }}
        />
      )}

      {/* TAB 4: 31 INTERACTIVE VISUAL LABS SUITE */}
      {activeTab === "labs" && (
        <div className="space-y-6">
          <MlDsVisualLabs initialPhaseId={selectedPhaseId} />
        </div>
      )}
    </div>
  );
}
