"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  PYTHON_DEV_PHASES,
  TOTAL_PYTHON_DEV_LESSONS,
  TOTAL_PYTHON_DEV_PHASES,
  getPythonMicroLessonById,
  type PythonMicroLesson,
  type PythonTrackId,
} from "@/lib/curriculum/python-developer";
import { DEPTH_META, type LearningDepth, type TopicRole } from "@/lib/curriculum/paths";
import { useLearning } from "@/hooks/use-learning";
import { FactorialCallStackLab } from "@/components/visualizations/FactorialCallStackLab";
import { PhaseDropdown } from "./PhaseDropdown";
import { getLessonPractice } from "@/lib/practice/registry";
import { GuidedPractice } from "@/components/practice/GuidedPractice";
import { PracticeLab, type PracticeResultInfo } from "@/components/practice/PracticeLab";
import type { LessonPractice, PracticeExercise, PracticeExample } from "@/lib/practice/types";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import { KnowledgeRelationshipsButton } from "@/components/lessons/KnowledgeRelationshipsPanel";
import {
  AlertTriangle,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  FlaskConical,
  HelpCircle,
  Layers,
  Link2,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Terminal,
  Video,
} from "lucide-react";

const DEPTH_LIST: readonly LearningDepth[] = ["overview", "understand", "master"];

const TRACK_LABELS: Record<PythonTrackId, { title: string; subtitle: string }> = {
  "python-developer": {
    title: "Python Developer (To‘liq 20 ta faza)",
    subtitle: "CLI, DSA, OOP, Generators, Async, FastAPI/Django, Typing va Testing",
  },
  "ai-engineer": {
    title: "AI Engineer uchun Python poydevori",
    subtitle: "Basics, OOP, Async/Concurrency, FastAPI, Pydantic va Testing — Core",
  },
  "ml-engineer": {
    title: "ML Engineer uchun Python poydevori",
    subtitle: "Basics, Collections, Files, DSA, OOP, Generators, Envs va Testing — Core",
  },
  "data-scientist": {
    title: "Data Scientist uchun Python poydevori",
    subtitle: "Basics, Collections, Functions, Files va Environments — Core; Web — Overview",
  },
};

const ROLE_STYLE: Record<TopicRole, { label: string; className: string }> = {
  core: {
    label: "Core (Asosiy)",
    className: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
  supporting: {
    label: "Supporting (Tayanch)",
    className: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
  },
  advanced: {
    label: "Advanced",
    className: "bg-violet-500/15 text-violet-300 border-violet-500/40",
  },
  optional: {
    label: "Overview (Tanishuv)",
    className: "bg-slate-800 text-slate-400 border-slate-700",
  },
};

export interface PythonDeveloperExplorerProps {
  initialLessonId?: string;
  initialPhaseId?: string;
  initialStep?: "theory" | "examples" | "quiz" | "practice";
}

export function PythonDeveloperExplorer({
  initialLessonId = "py-01-01",
  initialPhaseId,
  initialStep = "theory",
}: PythonDeveloperExplorerProps = {}) {
  const {
    state,
    isMicroLessonCompleted,
    toggleMicroLessonCompleted,
    savePracticeSubmission,
  } = useLearning();

  const [viewTab, setViewTab] = useState<"player" | "catalog" | "labs" | "assessments">("player");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(() => {
    if (initialPhaseId) return initialPhaseId;
    const found = getPythonMicroLessonById(initialLessonId);
    return found?.phaseId || "py-01";
  });
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [lessonStep, setLessonStep] = useState<"theory" | "examples" | "quiz" | "practice">(
    initialStep,
  );
  const [selectedTrack, setSelectedTrack] = useState<PythonTrackId>("python-developer");
  const [activeDepth, setActiveDepth] = useState<LearningDepth>("understand");
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [detourReturnId, setDetourReturnId] = useState<string | null>(null);
  const [showTushunmadim, setShowTushunmadim] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPracticeTaskIdx, setSelectedPracticeTaskIdx] = useState<number>(0);
  const [selectedAssessmentPhaseId, setSelectedAssessmentPhaseId] = useState<string>("py-01");
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showLessonList, setShowLessonList] = useState<boolean>(false);

  const syncUrl = (lessonId: string, phaseId: string, step: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "python-dev");
    url.searchParams.set("phase", phaseId);
    url.searchParams.set("lesson", lessonId);
    url.searchParams.set("step", step);
    window.history.replaceState(null, "", url.toString());
  };

  const handleShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "python-dev");
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

    if (lessonParam && getPythonMicroLessonById(lessonParam)) {
      targetLesson = lessonParam;
      const found = getPythonMicroLessonById(lessonParam);
      targetPhase = found?.phaseId || "py-01";
      setActiveLessonId(targetLesson);
      setSelectedPhaseId(targetPhase);
      setViewTab("player");
    } else if (phaseParam) {
      const foundPhase = PYTHON_DEV_PHASES.find(
        (p) => p.id === phaseParam || p.order.toString() === phaseParam || `py-${p.order}` === phaseParam,
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

  const activePhase = useMemo(
    () =>
      PYTHON_DEV_PHASES.find((p) => p.id === selectedPhaseId) ??
      PYTHON_DEV_PHASES[0]!,
    [selectedPhaseId],
  );

  const activeLesson: PythonMicroLesson = useMemo(
    () =>
      getPythonMicroLessonById(activeLessonId) ??
      getPythonMicroLessonById("py-01-01") ??
      PYTHON_DEV_PHASES[0]!.lessons[0]!,
    [activeLessonId],
  );

  const practiceForActiveLesson: LessonPractice | null = useMemo(() => {
    // If lesson has practiceTasks, always use the selected task (0 = starter, 1 = challenge)
    if (activeLesson.practiceTasks && activeLesson.practiceTasks.length > 0) {
      const taskIndex = Math.min(selectedPracticeTaskIdx, activeLesson.practiceTasks.length - 1);
      const task = activeLesson.practiceTasks[taskIndex]!;
      const isChallenge = task.difficulty === "challenge" || taskIndex > 0;

      return {
        id: `prac-${activeLesson.id}-${task.id}`,
        lessonId: activeLesson.id,
        depth: isChallenge ? ("master" as LearningDepth) : activeDepth,
        objectiveUz: activeLesson.learningObjectiveUz,
        prerequisites: activeLesson.prerequisites,
        theorySteps: [
          {
            id: `th-${activeLesson.id}-${task.id}`,
            title: task.titleUz,
            bodyMdx: activeLesson.theoryUz ?? "",
          },
        ],
        examples: [
          {
            id: `ex-${activeLesson.id}-1`,
            titleUz: activeLesson.examples?.[0]?.titleUz ?? "1-misol",
            explanationUz: activeLesson.examples?.[0]?.explanationUz ?? "",
            code: activeLesson.examples?.[0]?.code ?? "print('Python')",
            expectedOutput: activeLesson.examples?.[0]?.expectedOutput ?? "",
            walkthrough: [activeLesson.examples?.[0]?.explanationUz ?? ""],
            whyThisOutputUz: "Python interpreter qoidalari asosida bajarildi.",
          },
          ...(activeLesson.examples?.[1]
            ? [
                {
                  id: `ex-${activeLesson.id}-2`,
                  titleUz: activeLesson.examples[1].titleUz,
                  explanationUz: activeLesson.examples[1].explanationUz,
                  code: activeLesson.examples[1].code,
                  expectedOutput: activeLesson.examples[1].expectedOutput,
                  walkthrough: [activeLesson.examples[1].explanationUz],
                  whyThisOutputUz: "Python interpreter qoidalari asosida bajarildi.",
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
          difficulty: task.difficulty as any,
          assessment: "deterministic",
          starterCode: task.starterCode,
          expectedBehaviorUz: task.instructionsUz,
          hintsUz: task.hintsUz,
          testCases: [
            {
              id: `${task.id}-tc-1`,
              descriptionUz: "Kod xatosiz bajarilishi va terminalda kutilgan natija chiqishi",
            },
          ],
          testRunnerCode: (task as any).testCode,
        },
        status: "published",
      };
    }

    return getLessonPractice(activeLesson.id, activeDepth) ?? getLessonPractice(activeLesson.id);
  }, [activeLesson, activeDepth, selectedPracticeTaskIdx]);

  const depthSteps = useMemo(() => {
    if (!activeLesson.steps || activeLesson.steps.length === 0) return [];
    const filtered = activeLesson.steps.filter((s) => s.depth === activeDepth);
    return filtered.length > 0 ? filtered : activeLesson.steps;
  }, [activeLesson, activeDepth]);

  const currentStep =
    depthSteps[Math.min(stepIdx, Math.max(0, depthSteps.length - 1))] ?? null;

  const completedCount = useMemo(() => {
    let count = 0;
    for (const p of PYTHON_DEV_PHASES) {
      for (const l of p.lessons) {
        if (isMicroLessonCompleted(l.id)) count++;
      }
    }
    return count;
  }, [isMicroLessonCompleted]);

  const selectLesson = (
    lessonId: string,
    depth: LearningDepth = "understand",
  ) => {
    const found = getPythonMicroLessonById(lessonId);
    if (!found) return;
    setSelectedPhaseId(found.phaseId);
    setActiveLessonId(found.id);
    setActiveDepth(depth);
    setStepIdx(0);
    setLessonStep("theory");
    setSelectedPracticeTaskIdx(0);
    setShowTushunmadim(false);
    setViewTab("player");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
    syncUrl(found.id, found.phaseId, "theory");
  };

  const handleSetLessonStep = (step: "theory" | "examples" | "quiz" | "practice") => {
    setLessonStep(step);
    syncUrl(activeLessonId, selectedPhaseId, step);
  };

  const handleCopyCode = (code: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedSnippetId(id);
      setTimeout(() => setCopiedSnippetId(null), 2000);
    }
  };

  const phaseOptions = useMemo(
    () =>
      PYTHON_DEV_PHASES.map((p) => ({
        id: p.id,
        badge: `Phase ${p.order}`,
        title: p.title,
        countLabel: `${p.lessons.length} ta mikro-dars`,
        subtitle: p.projectMilestone,
        hasPublished: true,
      })),
    [],
  );

  const filteredPhases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PYTHON_DEV_PHASES.map((phase) => {
      const lessons = phase.lessons.filter((l) => {
        if (!q) return true;
        return (
          l.id.toLowerCase().includes(q) ||
          l.title.toLowerCase().includes(q) ||
          phase.title.toLowerCase().includes(q)
        );
      });
      return { ...phase, filteredLessons: lessons };
    }).filter((p) => p.filteredLessons.length > 0);
  }, [searchQuery]);

  const assessmentPhase = useMemo(
    () =>
      PYTHON_DEV_PHASES.find((p) => p.id === selectedAssessmentPhaseId) ??
      PYTHON_DEV_PHASES[0]!,
    [selectedAssessmentPhaseId],
  );

  const assessmentExercise: PracticeExercise | null = useMemo(() => {
    if (!assessmentPhase.assessment) return null;
    const a = assessmentPhase.assessment;
    return {
      id: `assessment-${assessmentPhase.id}`,
      titleUz: `Phase ${assessmentPhase.order} Nazorat Ishi: ${a.title}`,
      instructionsUz: `Loyiha Maqsadi va Talablari:\n${a.requirements}\n\nQabul qilish shartlari (Acceptance Cases):\n${a.acceptanceCases}\n\nCheklovlar (Constraints):\n${a.constraints}\n\n100 ballik baholash mezoni:\n${a.rubric}`,
      language: "python",
      runtime: "pyodide",
      difficulty: "challenge",
      assessment: "deterministic",
      starterCode: `# Phase ${assessmentPhase.order}: ${a.title}\n# Talablar asosida kodingizni yozing:\n\ndef main():\n    print("Phase ${assessmentPhase.order} loyihasi ishga tushirildi.")\n\nif __name__ == "__main__":\n    main()\n`,
      expectedBehaviorUz: a.acceptanceCases,
      hintsUz: [
        `Talablar: ${a.requirements}`,
        `Cheklovlar: ${a.constraints}`,
        `100 ballik mezon: ${a.rubric}`,
      ],
      testCases: [
        {
          id: `tc-ass-${assessmentPhase.id}-1`,
          descriptionUz: "Loyiha xatosiz interpretatsiya qilinishi va ishga tushishi",
        },
      ],
    };
  }, [assessmentPhase]);

  return (
    <div className="space-y-6">
      {/* 1. Sleek Compact Header */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950/20 p-5 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Terminal className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Python Dasturlash Akademiyasi
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                20 Faza • 344 Dars
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sintaksis, OOP, Call Stack, Algoritmlar, FastAPI, PyTest va to‘liq amaliy dasturlash.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Progress:</span>
              <span className="font-bold text-amber-400">{completedCount}</span>
              <span className="text-slate-500">/ {TOTAL_PYTHON_DEV_LESSONS} dars</span>
              <span className="text-slate-500">
                ({Math.round((completedCount / TOTAL_PYTHON_DEV_LESSONS) * 100)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Compact Track Pill Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Yo‘nalish:</span>
          {(Object.keys(TRACK_LABELS) as PythonTrackId[]).map((trackKey) => {
            const isSelected = selectedTrack === trackKey;
            return (
              <button
                key={trackKey}
                type="button"
                onClick={() => setSelectedTrack(trackKey)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {trackKey === "python-developer"
                  ? "Python Dev (20 faza)"
                  : trackKey === "ai-engineer"
                  ? "AI Eng Poydevor"
                  : trackKey === "ml-engineer"
                  ? "ML Eng Poydevor"
                  : "Data Science Poydevor"}
              </button>
            );
          })}
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setViewTab("player")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewTab === "player"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>🎯 Dars & Amaliyot ({activeLesson.id})</span>
          </button>
          <button
            type="button"
            onClick={() => setViewTab("catalog")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewTab === "catalog"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>📚 Barcha Fazalar (20) & Mikro-Darslar</span>
          </button>
          <button
            type="button"
            onClick={() => setViewTab("assessments")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewTab === "assessments"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>🏆 Nazorat Loyihalari (20)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewTab("labs")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewTab === "labs"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>🔬 Call Stack Laboratoriyasi</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE LESSON PLAYER */}
      {viewTab === "player" && (
        <div className="space-y-6">
          {/* Phase Selector & Horizontal Lesson Navigator */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <PhaseDropdown
                  value={selectedPhaseId}
                  options={phaseOptions}
                  onChange={(phaseId: string) => {
                    setSelectedPhaseId(phaseId);
                    const ph = PYTHON_DEV_PHASES.find((p) => p.id === phaseId);
                    if (ph && ph.lessons[0]) {
                      selectLesson(ph.lessons[0].id, "understand");
                    }
                  }}
                  accent="amber"
                />
                <span className="text-xs text-slate-400 font-mono">
                  {activePhase.lessons.length} ta mikro-dars • Nazorat ishi:{" "}
                  <span className="text-amber-300 font-medium">
                    {activePhase.projectMilestone}
                  </span>
                </span>
              </div>

              {/* Prev / Next Lesson Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!activeLesson.prevLessonId}
                  onClick={() =>
                    activeLesson.prevLessonId &&
                    selectLesson(activeLesson.prevLessonId, activeDepth)
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Oldingi dars</span>
                </button>
                <button
                  type="button"
                  disabled={!activeLesson.nextLessonId}
                  onClick={() =>
                    activeLesson.nextLessonId &&
                    selectLesson(activeLesson.nextLessonId, activeDepth)
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-40 cursor-pointer"
                >
                  <span>Keyingi dars</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Collapsible Lesson Badges Row (collapsed by default) */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowLessonList((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-xs font-semibold text-slate-200 cursor-pointer transition-colors"
              >
                <span>
                  {showLessonList
                    ? "Darslar ro'yxatini yopish"
                    : `Faza darslari ro'yxati (${activePhase.lessons.length} ta)`}
                </span>
                <span className="font-mono text-[10px] text-amber-400">{activeLesson.id}</span>
              </button>

              {showLessonList && (
                <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
                  {activePhase.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson.id;
                    const isDone = isMicroLessonCompleted(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => selectLesson(lesson.id, activeDepth)}
                        className={`shrink-0 text-left px-3.5 py-2 rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-2 ${
                          isActive
                            ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20"
                            : isDone
                            ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/50"
                            : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        <span className="font-mono">{lesson.id}</span>
                        <span className="max-w-[140px] truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Main Lesson Content Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
            {/* Top Lesson Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold">
                    {activeLesson.id} (Phase {activeLesson.phaseOrder})
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]">
                    Status: {activeLesson.status}
                  </span>
                  {activeLesson.existingContentCandidate && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 font-mono text-[11px]">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>Ref: {activeLesson.existingContentCandidate}</span>
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeLesson.title}
                </h3>
              </div>

              {/* Action Buttons: Share Link & Completion Toggle */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-500/60 transition-all cursor-pointer"
                  title="Ushbu darsning to‘g‘ridan-to‘g‘ri havolasini nusxalash"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Havola nusxalandi! 🔗</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4 text-amber-400" />
                      <span>Ulashish (Havola)</span>
                    </>
                  )}
                </button>
                <KnowledgeRelationshipsButton
                  entityId={activeLesson.id}
                  fallbackMeta={{
                    title: activeLesson.title,
                  }}
                />
                <button
                  type="button"
                  onClick={() => toggleMicroLessonCompleted(activeLesson.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isMicroLessonCompleted(activeLesson.id)
                      ? "bg-emerald-600 text-slate-950 border-emerald-500 font-bold shadow-lg shadow-emerald-500/20"
                      : "bg-slate-950 text-slate-200 border-slate-700 hover:border-amber-500"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isMicroLessonCompleted(activeLesson.id)
                      ? `Tugatildi (${activeLesson.id}) ✓`
                      : `Tugatildi deb belgilash`}
                  </span>
                </button>
              </div>
            </div>

            {/* 4-Step Interactive Learning Pipeline */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => handleSetLessonStep("theory")}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold transition-all cursor-pointer ${
                  lessonStep === "theory"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>1. 📖 Nazariya</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetLessonStep("examples")}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold transition-all cursor-pointer ${
                  lessonStep === "examples"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>2. 💻 Misollar</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetLessonStep("quiz")}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold transition-all cursor-pointer ${
                  lessonStep === "quiz"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>3. ❓ Test (3 ta)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetLessonStep("practice")}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold transition-all cursor-pointer ${
                  lessonStep === "practice"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>4. ⚡ Amaliy Kod</span>
              </button>
            </div>

            {/* STEP 1: THEORY & LEARNING OBJECTIVE */}
            {lessonStep === "theory" && (
              <div className="space-y-5">
                {/* Objective & Prerequisites */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>🎯 O‘quv Maqsadi & Tayanch Darslar (Prerequisites)</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeLesson.learningObjectiveUz}
                  </p>

                  {activeLesson.prerequisites && activeLesson.prerequisites.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-400">Oldingi tayanch darslar:</span>
                      {activeLesson.prerequisites.map((prereqId) => (
                        <button
                          key={prereqId}
                          type="button"
                          onClick={() => {
                            setDetourReturnId(activeLesson.id);
                            selectLesson(prereqId, "understand");
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-300 font-mono text-[11px] hover:bg-slate-800 cursor-pointer"
                        >
                          {prereqId} →
                        </button>
                      ))}
                      {detourReturnId && (
                        <button
                          type="button"
                          onClick={() => {
                            const ret = detourReturnId;
                            setDetourReturnId(null);
                            selectLesson(ret, "understand");
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold cursor-pointer"
                        >
                          Asosiy darsga qaytish ({detourReturnId}) ↩
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Theory & Step-by-Step Mechanism */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Nazariya va Chuqur Tahlil (Qadamlar)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {DEPTH_LIST.map((depth) => {
                        const meta = DEPTH_META[depth];
                        return (
                          <button
                            key={depth}
                            type="button"
                            onClick={() => {
                              setActiveDepth(depth);
                              setStepIdx(0);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              activeDepth === depth
                                ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                                : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                            }`}
                          >
                            {meta.uzLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {currentStep && (
                    <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
                      <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                        <span>
                          {DEPTH_META[currentStep.depth].uzLabel} • Qadam{" "}
                          {stepIdx + 1} / {depthSteps.length}
                        </span>
                        <span className="text-amber-400/80 font-bold">{currentStep.id}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        {currentStep.title}
                      </h4>
                      <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                        {currentStep.explanationUz}
                      </p>

                      {currentStep.codeSnippet && (
                        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                            <span className="inline-flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5" />
                              <span>Python kodi</span>
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyCode(currentStep.codeSnippet!, `step-${stepIdx}`)
                              }
                              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              {copiedSnippetId === `step-${stepIdx}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Nusxa olindi!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Nusxa olish</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-xs font-mono text-slate-200 overflow-x-auto">
                            <code>{currentStep.codeSnippet}</code>
                          </pre>
                        </div>
                      )}

                      <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-xs text-emerald-200">
                        <strong>Asosiy xulosa:</strong> {currentStep.keyTakeawayUz}
                      </div>

                      {depthSteps.length > 1 && (
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
                          <button
                            type="button"
                            disabled={stepIdx >= depthSteps.length - 1}
                            onClick={() =>
                              setStepIdx((i) => Math.min(depthSteps.length - 1, i + 1))
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-40 cursor-pointer"
                          >
                            <span>Keyingi qadam</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Advance to Step 2 */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleSetLessonStep("examples")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
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
                {activeLesson.examples && activeLesson.examples.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Code2 className="w-4 h-4 text-amber-400" />
                      <span>2 ta Namunaviy Misol (To‘liq ishlovchi kod)</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {activeLesson.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 inline-flex items-center justify-center font-mono text-[11px]">
                                {idx + 1}
                              </span>
                              <span>{ex.titleUz}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyCode(ex.code, `example-${idx}`)
                              }
                              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              {copiedSnippetId === `example-${idx}` ? (
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
                            <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">
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
                {activeLesson.commonMistakes && activeLesson.commonMistakes.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Keng Tarqalgan Xatolar va Tuzoqlar (Common Mistakes)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeLesson.commonMistakes.map((m, idx) => (
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

                {/* Step 2 Navigation */}
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
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
                {activeLesson.checkpointQuestions &&
                activeLesson.checkpointQuestions.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>Bilimni Tekshirish (3 ta Checkpoint Savoli)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {activeLesson.checkpointQuestions.map((q, qIdx) => {
                        const chosen = quizAnswers[q.id];
                        const questionTypes = [
                          "1. Konseptual Bilim",
                          "2. Output Prediction (Natijani toping)",
                          "3. Debugging (Xatoni toping)",
                        ];
                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
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

                {/* Step 3 Navigation */}
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>4. Amaliy Kod Yozishga o‘tish</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: 2 INDEPENDENT PRACTICAL EXERCISES & LABS */}
            {lessonStep === "practice" && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>Amaliy Dasturlash (Brauzerda Pyodide Laboratoriyasi)</span>
                  </div>

                  {activeLesson.practiceTasks && activeLesson.practiceTasks.length > 1 && (
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
                            ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                            : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                        }`}
                      >
                        🔴 2-topshiriq: Qiyin (Challenge)
                      </button>
                    </div>
                  )}
                </div>

                {/* 30 Days of Python Practice Bank Link */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                      <Terminal className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="font-bold text-amber-200">
                        30 Days of Python — 5-Darajali Amaliyot Banki
                      </span>
                      <p className="text-[11px] text-slate-400">
                        90 ta test, 90 ta amaliy masala, Output Prediction va Debugging topshiriqlari.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/practice/python-30-days?day=${Math.min(30, Math.max(1, activeLesson.phaseOrder))}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>30-kunlik bankda ochish</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {practiceForActiveLesson ? (
                  <GuidedPractice
                    key={`${activeLesson.id}-${activeDepth}-${practiceForActiveLesson.exercise.id}-${selectedPracticeTaskIdx}`}
                    practice={practiceForActiveLesson}
                    initialSubStep="exercise"
                    hideHeaderSteps={true}
                    initialCode={
                      state.practiceSubmissions?.[
                        `${activeLesson.id}:${practiceForActiveLesson.exercise.id}:${activeDepth}`
                      ]?.code
                    }
                    onCompleted={(res: PracticeResultInfo) => {
                      savePracticeSubmission(
                        activeLesson.id,
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
                        toggleMicroLessonCompleted(activeLesson.id);
                      }
                    }}
                  />
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    Ushbu dars uchun amaliy mashq tayyorlanmoqda.
                  </div>
                )}

                {/* Optional Manim Video or Interactive Lab */}
                {activeLesson.manimAssetPath && (
                  <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white inline-flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-amber-400" />
                        <span>Manim Call Stack Animatsiyasi</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {activeLesson.manimAssetPath}
                      </span>
                    </div>
                    <video
                      key={activeLesson.manimAssetPath}
                      src={activeLesson.manimAssetPath}
                      controls
                      playsInline
                      className="w-full max-h-72 rounded-xl bg-black border border-slate-800"
                    />
                  </div>
                )}

                {activeLesson.interactiveLabTab && (
                  <FactorialCallStackLab
                    key={activeLesson.interactiveLabTab}
                    initialTab={activeLesson.interactiveLabTab}
                  />
                )}

                {/* Summary Takeaways */}
                {activeLesson.summaryTakeaways && activeLesson.summaryTakeaways.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Dars Xulosasi:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeLesson.summaryTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
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

                  {activeLesson.nextLessonId ? (
                    <button
                      type="button"
                      onClick={() =>
                        activeLesson.nextLessonId &&
                        selectLesson(activeLesson.nextLessonId, activeDepth)
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>Keyingi mikro-dars: {activeLesson.nextLessonId}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold">
                      Tabriklaymiz! Siz 20-faza so‘nggi mikro-darsiga yetib keldingiz! 🎉
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 20 PHASES & 344 MICRO-LESSONS CATALOG */}
      {viewTab === "catalog" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="344 ta Python mikro-darsi ichidan qidirish (masalan: py-03-04, qoldiq, list, async, FastAPI, pytest)..."
              className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-4">
            {filteredPhases.map((phase) => {
              const role = phase.trackPriority[selectedTrack] ?? "core";
              const roleBadge = ROLE_STYLE[role];
              const phaseCompletedCount = phase.lessons.filter((l) =>
                isMicroLessonCompleted(l.id),
              ).length;
              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                          {phase.id.toUpperCase()} (Phase {phase.order})
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md border text-[11px] font-semibold ${roleBadge.className}`}
                        >
                          {roleBadge.label}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {phaseCompletedCount} / {phase.lessons.length} tugatilgan
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {phase.title}
                      </h3>
                    </div>
                    <div className="text-xs text-right bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2">
                      <div className="text-slate-400">
                        Nazorat ishi:{" "}
                        <span className="text-amber-300 font-medium">
                          {phase.projectMilestone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {phase.filteredLessons.map((l) => {
                      const isDone = isMicroLessonCompleted(l.id);
                      return (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => selectLesson(l.id, "understand")}
                          className={`text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                            isDone
                              ? "bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400"
                              : "bg-slate-950/70 border-slate-800 hover:border-amber-500/50"
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs font-bold text-amber-400">
                                {l.id}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-emerald-500/20 text-emerald-300">
                                published
                              </span>
                            </div>
                            <div className="text-xs font-medium text-white mt-1 line-clamp-1">
                              {l.title}
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
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 20 PHASE ASSESSMENTS (CAPSTONE PROJECTS) */}
      {viewTab === "assessments" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/60 p-5 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>20 ta Faza Yakuniy Nazorat Loyihalari (Capstone Projects)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Har bir faza oxirida mustaqil loyiha topshiring
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              100 ballik baholash mezoni: Funksional to‘g‘rilik (40 ball), Edge case va testlar (25 ball), Kod sifati va arxitektura (20 ball), Mantiqiy qarorlar va izohlar (15 ball). O‘tish bali: 80/100.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Phase List Sidebar */}
            <div className="lg:col-span-1 space-y-2">
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Fazani tanlang (1..20):
              </div>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {PYTHON_DEV_PHASES.map((p) => {
                  const isSelected = p.id === selectedAssessmentPhaseId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedAssessmentPhaseId(p.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20"
                          : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-mono text-[11px] opacity-80">
                        Phase {p.order} ({p.id.toUpperCase()})
                      </div>
                      <div className="font-semibold line-clamp-1 mt-0.5">
                        {p.assessment?.title || p.projectMilestone}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assessment Details & Code Runner */}
            <div className="lg:col-span-3 space-y-5">
              {assessmentPhase.assessment && assessmentExercise ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
                  <div className="space-y-2 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold">
                        Phase {assessmentPhase.order} ({assessmentPhase.id.toUpperCase()})
                      </span>
                      <span className="text-xs text-slate-400">
                        {assessmentPhase.title}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {assessmentPhase.assessment.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="font-bold text-amber-300">
                        📋 Loyiha Talablari:
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {assessmentPhase.assessment.requirements}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="font-bold text-emerald-300">
                        ✅ Qabul Qilish Shartlari (Acceptance Cases):
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {assessmentPhase.assessment.acceptanceCases}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="font-bold text-rose-300">
                        ⚠️ Cheklovlar (Constraints):
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {assessmentPhase.assessment.constraints}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="font-bold text-violet-300">
                        🏆 100 Ballik Baholash Mezoni (Rubric):
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {assessmentPhase.assessment.rubric}
                      </p>
                    </div>
                  </div>

                  {/* Pyodide Runner for Assessment */}
                  <div className="pt-2 space-y-2">
                    <div className="text-xs font-bold text-white">
                      Loyihani brauzerda yozing va tekshiring:
                    </div>
                    <PracticeLab
                      key={`phase-ass-${assessmentPhase.id}`}
                      exercise={assessmentExercise}
                      lessonId={`phase-assessment-${assessmentPhase.id}`}
                      depth="master"
                      onCompleted={(res) => {
                        if (res.testsPassed) {
                          alert(`Tabriklaymiz! Phase ${assessmentPhase.order} nazorat ishi muvaffaqiyatli topshirildi!`);
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  Ushbu faza uchun nazorat ishi yuklanmoqda...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STANDALONE PYTHON CALL STACK & SEMANTICS LAB */}
      {viewTab === "labs" && (
        <FactorialCallStackLab initialTab="factorial-stack" />
      )}
    </div>
  );
}
