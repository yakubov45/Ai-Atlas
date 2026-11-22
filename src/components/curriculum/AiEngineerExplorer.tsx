"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import { KnowledgeRelationshipsButton } from "@/components/lessons/KnowledgeRelationshipsPanel";
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
  Cpu,
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
  Target,
  Terminal,
  Wrench,
} from "lucide-react";
import {
  AI_ENGINEER_PHASES,
  AI_ENGINEER_TRACKS,
  PRACTICAL_PROJECTS,
  TOTAL_AI_ENGINEER_MICRO_LESSONS,
  getAiEngineerMicroLesson,
  getGuidedStepsForMicroLesson,
  getPhasePriorityForTrack,
  type AiEngineerTrackId,
} from "@/lib/curriculum/ai-engineer";
import { DEPTH_META, type LearningDepth, type TopicRole } from "@/lib/curriculum/paths";
import { useLearning } from "@/hooks/use-learning";
import { FormulaDisplay } from "@/components/visualizations/FormulaDisplay";
import { PhaseDropdown } from "./PhaseDropdown";
import { CosineSimilarityExplorer } from "@/components/visualizations/CosineSimilarityExplorer";
import { RagPipelineExplorer } from "@/components/visualizations/RagPipelineExplorer";
import { AttentionExplorer } from "@/components/visualizations/AttentionExplorer";
import { AiEngineeringVisualLabs } from "@/components/visualizations/AiEngineeringVisualLabs";
import { GuidedPractice } from "@/components/practice/GuidedPractice";
import { getLessonPractice } from "@/lib/practice/registry";
import type { LessonPractice, PracticeExample } from "@/lib/practice/types";
import type { PracticeResultInfo } from "@/components/practice/PracticeLab";

const DEPTH_ORDER: readonly LearningDepth[] = ["overview", "understand", "master"];

const ROLE_BADGE: Record<
  TopicRole,
  { label: string; className: string }
> = {
  core: {
    label: "Core (Majburiy)",
    className: "bg-violet-500/15 text-violet-300 border-violet-500/40",
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

export interface AiEngineerExplorerProps {
  initialLessonId?: string;
  initialPhaseId?: string;
  initialStep?: "theory" | "examples" | "quiz" | "practice";
}

export function AiEngineerExplorer({
  initialLessonId = "12.07",
  initialPhaseId,
  initialStep = "theory",
}: AiEngineerExplorerProps) {
  const {
    state,
    setSelectedAiTrack,
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

  const [activeTab, setActiveTab] = useState<"player" | "phases" | "projects" | "labs">("player");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(() => {
    if (initialPhaseId) return initialPhaseId;
    return initialLessonId.split(".")[0] || "12";
  });
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "planned">("all");
  const [showLessonList, setShowLessonList] = useState<boolean>(false);

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
  const [selectedPracticeTaskIdx, setSelectedPracticeTaskIdx] = useState<number>(0);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const syncUrl = (lessonId: string, phaseId: string, step: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "ai-engineer");
    url.searchParams.set("phase", phaseId);
    url.searchParams.set("lesson", lessonId);
    url.searchParams.set("step", step);
    window.history.replaceState(null, "", url.toString());
  };

  const handleShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "ai-engineer");
    url.searchParams.set("phase", selectedPhaseId);
    url.searchParams.set("lesson", activeLessonId);
    url.searchParams.set("step", lessonStep);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const lessonParam = params.get("lesson");
    const phaseParam = params.get("phase");
    const stepParam = params.get("step") as "theory" | "examples" | "quiz" | "practice" | null;

    let targetLesson = activeLessonId;
    let targetPhase = selectedPhaseId;
    let targetStep = lessonStep;

    if (lessonParam && getAiEngineerMicroLesson(lessonParam)) {
      targetLesson = lessonParam;
      targetPhase = lessonParam.split(".")[0] || "12";
      setActiveLessonId(targetLesson);
      setSelectedPhaseId(targetPhase);
      setActiveTab("player");
    } else if (phaseParam) {
      const foundPhase = AI_ENGINEER_PHASES.find(
        (p) => p.id === phaseParam || p.order.toString() === phaseParam,
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

  const activeLookup = useMemo(
    () => getAiEngineerMicroLesson(activeLessonId) ?? getAiEngineerMicroLesson("12.07"),
    [activeLessonId],
  );

  const allGuidedSteps = useMemo(() => {
    if (!activeLookup) return [];
    return getGuidedStepsForMicroLesson(activeLookup.lesson, activeLookup.phase);
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
    const nextDepth: LearningDepth = targetDepth ?? saved?.depth ?? "understand";
    const nextStep = targetStepIndex ?? saved?.stepIndex ?? 0;
    const targetPhase = lessonId.split(".")[0] ?? "12";
    setActiveLessonId(lessonId);
    setSelectedPhaseId(targetPhase);
    setActiveDepth(nextDepth);
    setStepIndex(nextStep);
    setLessonStep("theory");
    setSelectedQuizIdx(null);
    setShowRemediation(false);
    setSelectedPracticeTaskIdx(0);
    setQuizAnswers({});
    setActiveTab("player");
    setLastMicroStep(lessonId, nextDepth, nextStep);
    syncUrl(lessonId, targetPhase, "theory");
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

  const handleCopyCode = async (code: string, snippetId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippetId(snippetId);
      setTimeout(() => setCopiedSnippetId(null), 2000);
    } catch {
      // ignore
    }
  };

  // Practice configuration for active lesson (Starter vs Challenge toggle)
  const practiceForActiveLesson: LessonPractice | null = useMemo(() => {
    const lesson = activeLookup?.lesson;
    if (!lesson) return null;

    if (
      lesson.practiceTasks &&
      lesson.practiceTasks.length > 1 &&
      selectedPracticeTaskIdx === 1
    ) {
      const task = lesson.practiceTasks[1]!;
      return {
        id: `prac-${lesson.id}-challenge`,
        lessonId: lesson.id,
        depth: "master" as LearningDepth,
        objectiveUz: lesson.learningObjectiveUz ?? lesson.objective ?? "",
        prerequisites: lesson.prerequisites,
        theorySteps: [
          {
            id: `th-${lesson.id}-chal`,
            title: "Qiyin / Challenge Vazifa Talablari",
            bodyMdx: lesson.theoryUz ?? "",
          },
        ],
        examples: [
          {
            id: `ex-${lesson.id}-1`,
            titleUz: lesson.examples?.[0]?.titleUz ?? "1-misol",
            explanationUz: lesson.examples?.[0]?.explanationUz ?? "",
            code: lesson.examples?.[0]?.code ?? "print('AI')",
            expectedOutput: lesson.examples?.[0]?.expectedOutput ?? "",
            walkthrough: [lesson.examples?.[0]?.explanationUz ?? ""],
            whyThisOutputUz: "AI muhandisligi tamoyili asosida hisoblandi.",
          },
          ...(lesson.examples?.[1]
            ? [
                {
                  id: `ex-${lesson.id}-2`,
                  titleUz: lesson.examples[1].titleUz,
                  explanationUz: lesson.examples[1].explanationUz,
                  code: lesson.examples[1].code,
                  expectedOutput: lesson.examples[1].expectedOutput,
                  walkthrough: [lesson.examples[1].explanationUz],
                  whyThisOutputUz: "AI muhandisligi tamoyili asosida hisoblandi.",
                },
              ]
            : []),
        ] as unknown as [PracticeExample, PracticeExample] | [PracticeExample],
        exercise: {
          id: task.id,
          titleUz: task.titleUz,
          instructionsUz: task.instructionsUz,
          language: "python",
          runtime: "pyodide",
          difficulty: "challenge",
          assessment: "deterministic",
          starterCode: task.starterCode,
          expectedBehaviorUz: task.instructionsUz,
          hintsUz: task.hintsUz,
          testCases: [
            {
              id: `${task.id}-tc-1`,
              descriptionUz: "Murakkabroq test holati va tekshiruv",
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
    return AI_ENGINEER_PHASES.map((phase) => {
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
      AI_ENGINEER_PHASES.reduce(
        (sum, p) => sum + p.lessons.filter((m) => m.status === "published").length,
        0,
      ),
    [],
  );
  const plannedCount = TOTAL_AI_ENGINEER_MICRO_LESSONS - publishedCount;

  const completedMicroCount = AI_ENGINEER_PHASES.reduce(
    (acc, p) =>
      acc + p.lessons.filter((m) => isMicroLessonCompleted(m.id)).length,
    0,
  );

  const activeTrack = AI_ENGINEER_TRACKS.find(
    (t) => t.id === state.selectedAiTrackId,
  );

  return (
    <div className="space-y-6">
      {/* 1. Header: Clean, Compact & Focused */}
      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-r from-slate-900 via-slate-900/95 to-violet-950/20 p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                AI Engineer • 20 Faza • 291 Mikro-Dars
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI Engineer O‘quv Dasturi
            </h2>
            <p className="text-xs text-slate-400">
              Vektorlar, Embeddings, RAG, ReAct Agentlar, MCP va Multimodal AI bo‘yicha to‘liq amaliy kurs.
            </p>
          </div>

          {/* Compact Progress Badge */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Progress
              </div>
              <div className="text-base font-bold font-mono text-emerald-400">
                {completedMicroCount} / {TOTAL_AI_ENGINEER_MICRO_LESSONS}
                <span className="text-xs text-slate-500 font-normal ml-1">
                  ({Math.round((completedMicroCount / TOTAL_AI_ENGINEER_MICRO_LESSONS) * 100)}%)
                </span>
              </div>
            </div>
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{
                  width: `${Math.round((completedMicroCount / TOTAL_AI_ENGINEER_MICRO_LESSONS) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Compact Horizontal Track Selector Pills */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-xs mr-1 font-medium flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            Track:
          </span>
          <button
            type="button"
            onClick={() => setSelectedAiTrack(null)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              !state.selectedAiTrackId
                ? "bg-violet-600 text-white font-semibold shadow-sm"
                : "bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Barchasi (20 faza)
          </button>
          {AI_ENGINEER_TRACKS.map((track) => {
            const isSelected = state.selectedAiTrackId === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() =>
                  setSelectedAiTrack(
                    isSelected ? null : (track.id as AiEngineerTrackId),
                  )
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-violet-600 text-white font-semibold shadow-sm"
                    : "bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                }`}
              >
                {track.label}
              </button>
            );
          })}
        </div>
        {activeTrack && (
          <div className="text-[11px] text-violet-300/90 flex flex-wrap items-center gap-2">
            <span>Core fazalar: <strong className="text-white">{activeTrack.deepPhaseIds.join(", ")}</strong></span>
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
                ? "bg-violet-600 text-white shadow-sm"
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
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Barcha Fazalar (20)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              activeTab === "projects"
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Amaliy Loyihalar (6)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("labs")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              activeTab === "labs"
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Vizual Laboratoriyalar (20)</span>
          </button>
        </div>
      </div>

      {/* PREREQUISITE DETOUR RETURN BANNER ("Tushunmadim" exact return state) */}
      {state.detourReturnTo && (
        <div
          data-testid="detour-return-banner"
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
          {/* Top Collapsible Course Outline Toggle Bar */}
          <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowLessonList((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-400" />
              <span>
                {showLessonList
                  ? "Darslar ro'yxatini yopish"
                  : `Darslar ro'yxati (Phase ${selectedPhaseId} • ${activeLookup.lesson.id})`}
              </span>
            </button>
            <span className="text-xs font-mono text-slate-400">
              {activeLookup.lesson.id} — {activeLookup.phase.title}
            </span>
          </div>

          {/* Left Sidebar: Phase Micro-Lessons List (collapsed by default) */}
          <div className={showLessonList ? "lg:col-span-4 space-y-4" : "hidden"}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="phase-select"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Fazani tanlang (01–20):
                </label>
                <span className="text-[11px] font-mono text-violet-400">
                  Phase {selectedPhaseId}
                </span>
              </div>
              <PhaseDropdown
                id="phase-select"
                ariaLabel="AI Engineer fazani tanlang"
                value={selectedPhaseId}
                accent="violet"
                options={AI_ENGINEER_PHASES.map((p) => ({
                  id: p.id,
                  badge: `Phase ${p.id}`,
                  title: p.title,
                  countLabel: `${p.lessons.length} dars`,
                  hasPublished: p.lessons.some((l) => l.status === "published"),
                }))}
                onChange={(nextPhaseId) => {
                  setSelectedPhaseId(nextPhaseId);
                  const phase = AI_ENGINEER_PHASES.find(
                    (p) => p.id === nextPhaseId,
                  );
                  if (phase && phase.lessons[0]) {
                    selectLesson(phase.lessons[0].id, "understand", 0);
                  }
                }}
              />

              {/* Prev / Next Lesson Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  disabled={!activeLookup.prevLesson}
                  onClick={() =>
                    activeLookup.prevLesson &&
                    selectLesson(activeLookup.prevLesson.id, activeDepth, 0)
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Oldingi dars</span>
                </button>
                <button
                  type="button"
                  disabled={!activeLookup.nextLesson}
                  onClick={() =>
                    activeLookup.nextLesson &&
                    selectLesson(activeLookup.nextLesson.id, activeDepth, 0)
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 text-white font-bold text-xs disabled:opacity-40 hover:bg-violet-500 cursor-pointer"
                >
                  <span>Keyingi dars</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Micro-lesson list in selected phase */}
              <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
                {AI_ENGINEER_PHASES.find(
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
                          ? "bg-violet-600/20 border-violet-500 text-white"
                          : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] text-violet-400 font-semibold">
                            {m.id}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                              m.status === "published"
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {m.status === "published" ? "Published" : "Planned"}
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
          <div className={showLessonList ? "lg:col-span-8 space-y-6" : "lg:col-span-12 space-y-6"}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
              {/* Lesson Header & Metadata */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-violet-500/20 border border-violet-500/40 text-violet-300 font-mono font-bold">
                      {activeLookup.lesson.id}
                    </span>
                    <span className="text-slate-400">
                      Phase {activeLookup.phase.id}: {activeLookup.phase.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        activeLookup.lesson.status === "published"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {activeLookup.lesson.status === "published"
                        ? "To‘liq interaktiv dars (Published)"
                        : "Strukturali reja (Planned)"}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
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
                          className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1 underline underline-offset-4"
                        >
                          <span>Kanonik maqolaga o‘tish</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </>
                    )}
                  </p>
                </div>

                {/* Mark Known / Mark Micro-Lesson Completed / Share Link */}
                <div className="flex flex-wrap items-center gap-2">
                  <KnowledgeRelationshipsButton
                    entityId={activeLookup.lesson.id}
                    fallbackMeta={{
                      title: activeLookup.lesson.title,
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleShareLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-violet-500/60 transition-colors cursor-pointer"
                    title="Ushbu darsning to‘g‘ridan-to‘g‘ri havolasini nusxalash"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Havola nusxalandi! 🔗</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-3.5 h-3.5 text-violet-400" />
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
                  <button
                    type="button"
                    onClick={() =>
                      toggleMicroLessonCompleted(activeLookup.lesson.id)
                    }
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      isMicroLessonCompleted(activeLookup.lesson.id)
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-violet-600 border-violet-500 text-white hover:bg-violet-500"
                    }`}
                  >
                    {isMicroLessonCompleted(activeLookup.lesson.id)
                      ? "✓ Mikro-dars tugatilgan"
                      : "Mikro-darsni tugatish"}
                  </button>
                </div>
              </div>

              {/* 4-Step Sequential Learning Workflow Navigation */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => handleSetLessonStep("theory")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lessonStep === "theory"
                      ? "bg-violet-600 text-white shadow-sm"
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
                      ? "bg-violet-600 text-white shadow-sm"
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
                      ? "bg-violet-600 text-white shadow-sm"
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
                      ? "bg-emerald-600 text-white shadow-sm"
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
                      <span className="font-bold text-violet-300">🎯 O‘quv maqsadi:</span>
                      <span>{activeLookup.lesson.learningObjectiveUz || activeLookup.lesson.objective}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPhaseId(activeLookup.phase.id);
                        setActiveTab("labs");
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold hover:bg-cyan-500/25 transition-colors cursor-pointer"
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
                              ? "bg-violet-600/30 border-violet-500 text-white shadow-sm"
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
                          <span className="text-xs font-bold text-violet-300">
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
                                    ? "w-5 bg-violet-400"
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
                          title="Matematik ifoda"
                          symbolic={currentStep.formula}
                          context={currentStep.title}
                        />
                      )}

                      {/* Code Snippet in Step */}
                      {currentStep.codeSnippet && (
                        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                          <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1.5 font-mono">
                              <Code2 className="w-3.5 h-3.5 text-violet-400" />
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
                        <div className="rounded-xl border border-violet-500/30 bg-slate-900/60 p-4 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-300">
                            <Network className="w-4 h-4 text-violet-400" />
                            <span>Vizual Mexanizm va Konsept Quvuri (Visual Flow)</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                            {activeLookup.lesson.visualFlow.map((st, sIdx) => (
                              <div key={sIdx} className="relative flex flex-col p-3 rounded-lg border border-slate-800 bg-slate-950/80">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="w-5 h-5 rounded-full bg-violet-600/30 border border-violet-500/50 text-[10px] font-bold text-violet-300 flex items-center justify-center">
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
                      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-950/80 to-slate-950 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                            <FlaskConical className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              Phase {activeLookup.phase.id} Vizual Laboratoriyasi: {activeLookup.phase.visualizationConcept || activeLookup.phase.title}
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
                          className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                        >
                          <span>Laboratoriyani Ochish</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Interactive Mini-Lab Previews */}
                      {currentStep.visualizationId === "cosine-similarity-explorer" && (
                        <div className="pt-2 space-y-3">
                          <div className="rounded-xl border border-violet-500/30 bg-slate-900/70 p-3">
                            <div className="text-xs font-semibold text-violet-300 mb-2">
                              Manim animatsiyasi — 2D Vektorlar, Dot Product va Cosine Similarity:
                            </div>
                            <video
                              src="/animations/vectors/cosine_similarity.mp4"
                              controls
                              playsInline
                              className="w-full max-h-[260px] rounded-lg bg-black border border-slate-800"
                            />
                          </div>
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

                      {/* Step Checkpoint Quiz */}
                      {currentStep.checkpoint && (
                        <div className="rounded-xl border border-violet-500/30 bg-violet-950/15 p-4 space-y-3">
                          <div className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                            Tekshiruv savoli (Checkpoint)
                          </div>
                          <p className="text-sm font-medium text-white">
                            {currentStep.checkpoint.question}
                          </p>
                          <div className="space-y-2">
                            {getShuffledQuizOptions(
                              currentStep.id,
                              currentStep.checkpoint.options,
                              currentStep.checkpoint.correctIndex,
                            ).map((opt) => {
                              const isSelected = selectedQuizIdx === opt.originalIndex;
                              const isCorrect = opt.isCorrect;
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
                                  key={opt.originalIndex}
                                  type="button"
                                  onClick={() => setSelectedQuizIdx(opt.originalIndex)}
                                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                                >
                                  {opt.text}
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
                              <div className="text-violet-300">
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
                            <div
                              data-testid="remediation-panel"
                              className="mt-3 rounded-xl border border-amber-500/40 bg-amber-950/25 p-4 space-y-3 text-xs sm:text-sm"
                            >
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
                                    data-testid="detour-prerequisite-btn"
                                    onClick={() =>
                                      handleDetourToPrerequisite(
                                        currentStep.tushunmadim.prerequisiteLessonId!,
                                      )
                                    }
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                                  >
                                    <span>
                                      Prerequisite darsga o‘tish: {currentStep.tushunmadim.prerequisiteLessonId}
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
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition-colors cursor-pointer"
                            >
                              <span>Keyingi qadam</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setDepthCompleted(activeLookup.lesson.id, activeDepth, true);
                                handleSetLessonStep("examples");
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer"
                            >
                              <span>Nazariyani tugatdim →</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Prerequisites & Reading Reference Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      {activeLookup.lesson.pythonPrerequisites &&
                        activeLookup.lesson.pythonPrerequisites.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">Python:</span>
                            {activeLookup.lesson.pythonPrerequisites.map((pyId: string) => (
                              <Link
                                key={pyId}
                                href={`/roadmap?tab=python-dev&lesson=${pyId}`}
                                className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[11px] hover:bg-amber-500/25"
                              >
                                {pyId} →
                              </Link>
                            ))}
                          </div>
                        )}
                      {activeLookup.lesson.prerequisites &&
                        activeLookup.lesson.prerequisites.filter((p) => !p.startsWith("py-")).length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">AI Prereqs:</span>
                            {activeLookup.lesson.prerequisites
                              .filter((p) => !p.startsWith("py-"))
                              .map((prereqId) => (
                                <button
                                  key={prereqId}
                                  type="button"
                                  onClick={() => selectLesson(prereqId, "understand", 0)}
                                  className="px-2 py-0.5 rounded bg-slate-900 border border-violet-500/30 text-violet-300 font-mono text-[11px] hover:bg-slate-800 cursor-pointer"
                                >
                                  {prereqId} →
                                </button>
                              ))}
                          </div>
                        )}
                    </div>
                    {activeLookup.lesson.upstreamUrl && (
                      <a
                        href={activeLookup.lesson.upstreamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                      >
                        <ExternalLink className="w-3 h-3 text-violet-400" />
                        <span>Manba maqolasi</span>
                      </a>
                    )}
                  </div>

                  {/* Primary Advance to Step 2 Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => handleSetLessonStep("examples")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>2. Namunaviy Misollarni ko‘rish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: MISOLLAR (2 Examples & Common Mistakes) */}
              {lessonStep === "examples" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
                      <Code2 className="w-4 h-4 text-violet-400" />
                      <span>2 ta Namunaviy Misol (To‘liq ishlovchi kod)</span>
                    </div>
                  </div>

                  {activeLookup.lesson.examples && activeLookup.lesson.examples.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {activeLookup.lesson.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-300 inline-flex items-center justify-center font-mono text-[11px]">
                                {idx + 1}
                              </span>
                              <span>{ex.titleUz}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(ex.code, `ai-ex-${idx}`)}
                              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              {copiedSnippetId === `ai-ex-${idx}` ? (
                                <span className="text-emerald-400">✓ Nusxalandi</span>
                              ) : (
                                <span>Nusxa</span>
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
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                      Ushbu dars uchun misollar tayyorlanmoqda.
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {activeLookup.lesson.commonMistakes && activeLookup.lesson.commonMistakes.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Keng tarqalgan xatolar va tuzoqlar:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeLookup.lesson.commonMistakes.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5 text-xs"
                          >
                            <div className="font-bold text-rose-200">❌ {m.mistakeUz}</div>
                            <div className="text-slate-300"><strong>Alomati:</strong> {m.symptomUz}</div>
                            <div className="text-emerald-300"><strong>To‘g‘rilash:</strong> {m.correctionUz}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>3. Bilimni Tekshirish (Test)ga o‘tish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TEST (3 Checkpoint Questions) */}
              {lessonStep === "quiz" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
                      <HelpCircle className="w-4 h-4 text-violet-400" />
                      <span>3 ta Test Savoli (O‘zlashtirishni tekshirish)</span>
                    </div>
                  </div>

                  {activeLookup.lesson.quiz && activeLookup.lesson.quiz.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {activeLookup.lesson.quiz.map((q, qIdx) => {
                        const chosen = quizAnswers[q.id];
                        const questionTypes = [
                          "1. Nazariy Bilim",
                          "2. Output Prediction",
                          "3. Debugging (Xato)",
                        ];
                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <span className="px-2 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 font-mono text-[10px]">
                                {questionTypes[qIdx] || `Savol #${qIdx + 1}`}
                              </span>
                              <div className="font-semibold text-slate-100 whitespace-pre-line">
                                {q.promptUz}
                              </div>
                            </div>

                            <div className="space-y-1.5 pt-2">
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
                                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                                      isChosen
                                        ? isRight
                                          ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold"
                                          : "bg-rose-950/60 border-rose-500 text-rose-200"
                                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                                    }`}
                                  >
                                    {opt.text}
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
                                  {chosen === q.correctIndex ? "To‘g‘ri! 🎉 " : "Qayta o‘ylab ko‘ring. "}
                                </strong>
                                {q.explanationUz}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                      Ushbu dars uchun test savollari tayyorlanmoqda.
                    </div>
                  )}

                  {/* Bottom Navigation */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>4. Amaliy Kod Yozish (Laboratoriya)ga o‘tish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: AMALIY KOD (Independent Pyodide Practice & Summary) */}
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
                                ? "bg-emerald-600 text-white border-emerald-500 font-bold"
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
                        <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
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

      {/* TAB 2: 20 PHASES & 291 MICRO-LESSONS BROWSER */}
      {activeTab === "phases" && (
        <div className="space-y-4">
          {/* Search & Status Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="291 ta mikro-dars ichidan qidiring (masalan: 12.07, Cosine, RAG, MCP, ReAct, Docker)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
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
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {status === "all"
                    ? `Barchasi (${TOTAL_AI_ENGINEER_MICRO_LESSONS})`
                    : status === "published"
                      ? `Published (${publishedCount})`
                      : `Planned (${plannedCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* 20 Phase Cards */}
          <div className="space-y-4">
            {filteredPhases.map((phase) => {
              const priorityInfo = getPhasePriorityForTrack(
                phase.id,
                state.selectedAiTrackId,
              );
              const roleBadge = ROLE_BADGE[priorityInfo.priority];
              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-violet-500/20 border border-violet-500/40 text-violet-300 font-mono text-xs font-bold">
                          Phase {phase.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md border text-[11px] font-semibold ${roleBadge.className}`}
                        >
                          {roleBadge.label}
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
                          {phase.visualizationConcept}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Micro-lessons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {phase.filteredLessons.map((m) => {
                      const done = isMicroLessonCompleted(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => selectLesson(m.id)}
                          className="text-left p-3 rounded-xl border border-slate-800/90 bg-slate-950/70 hover:border-violet-500/50 hover:bg-slate-900 transition-all flex items-start justify-between gap-2 cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs font-bold text-violet-400">
                                {m.id}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded ${
                                  m.status === "published"
                                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {m.status}
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

      {/* TAB 3: 6 PRACTICAL PROJECTS, 20 MINI-PROJECTS & CAPSTONE */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRACTICAL_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-violet-500/20 border border-violet-500/40 text-violet-300 font-mono text-xs font-bold">
                      Loyiha #{proj.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {proj.phaseRange}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {proj.title}
                  </h3>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-400">Qamrab olingan fazalar: </span>
                    <span className="text-cyan-300 font-mono">
                      {proj.phaseIds.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Tekshiruv mezoni: </span>
                    <span className="text-emerald-300">
                      {proj.verifiableOutcome}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 20 Phase Mini-Projects Milestone Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  20 ta Faza Mini-Loyiha Bosqichlari (Milestones)
                </h3>
                <p className="text-xs text-slate-400">
                  Har bir faza o‘zining mustaqil mini-loyihasiga ega bo‘lib, bosqichma-bosqich yakuniy Capstone tizimiga aylanadi.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Faza</th>
                    <th className="py-2.5 px-3">Nomi</th>
                    <th className="py-2.5 px-3">Mini-Loyiha Mezoni</th>
                    <th className="py-2.5 px-3">Vizual Laboratoriya</th>
                    <th className="py-2.5 px-3 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {AI_ENGINEER_PHASES.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-violet-400">Phase {p.id}</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-white">{p.title}</td>
                      <td className="py-2.5 px-3 font-sans text-emerald-300">{p.projectMilestone}</td>
                      <td className="py-2.5 px-3 font-sans text-cyan-300">{p.visualizationConcept}</td>
                      <td className="py-2.5 px-3 text-right font-sans">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPhaseId(p.id);
                            setActiveTab("labs");
                          }}
                          className="px-2.5 py-1 rounded bg-violet-600/20 text-violet-300 hover:bg-violet-600 hover:text-white transition-colors cursor-pointer"
                        >
                          Labni ochish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Capstone Card */}
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 p-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Yakuniy Capstone Loyiha (Fazalar 01–20 integratsiyasi)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              AI Knowledge Assistant — Production-Ready RAG + Agent + Evaluation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Ushbu yakuniy tizim barcha 20 ta fazada o‘rganilgan arxitektura qatlamlarini bitta production-ready ilovada birlashtiradi:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                "Hujjatlarni qabul qilish, chunking va vector index",
                "Manba ko‘rsatadigan ([chunk-id]) Grounded RAG javoblar",
                "Kamida 1 ta xavfsiz, read-only MCP tool chaqiruvi",
                "No-Answer siyosati va Prompt-Injection himoyasi + Hit@k/MRR",
              ].map((req, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 20 INTERACTIVE VISUAL LABS */}
      {activeTab === "labs" && (
        <AiEngineeringVisualLabs initialPhaseId={selectedPhaseId} />
      )}
    </div>
  );
}
