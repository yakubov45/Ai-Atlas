"use client";

import React, { useEffect, useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import {
  DEPTH_META,
  type LearningDepth,
} from "@/lib/curriculum/paths";
import type { LessonMicroStructure, MicroStepId } from "@/lib/curriculum/micro-lessons";
import type { SidebarGroup, TocHeading, NavLink } from "@/lib/content/types";
import { useLearning } from "@/hooks/use-learning";
import { VisualizationRenderer } from "@/components/visualizations/VisualizationRenderer";
import { PythonBasicsLab } from "@/components/visualizations/PythonBasicsLab";
import { PythonFunctionsLab } from "@/components/visualizations/PythonFunctionsLab";
import { TransformerMicroPathView } from "./TransformerMicroPathView";
import { LessonSidebar } from "./LessonSidebar";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { BookmarkButton } from "./BookmarkButton";
import { getLessonPractice } from "@/lib/practice/registry";
import { GuidedPractice } from "@/components/practice/GuidedPractice";
import { Python30DaysPractice } from "@/components/practice/Python30DaysPractice";
import type { PracticeResultInfo } from "@/components/practice/PracticeLab";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Eye,
  Calculator,
  Code2,
  Check,
  XCircle,
  List,
  X,
  Layers,
  Sparkles,
} from "lucide-react";

export interface LessonExperienceClientProps {
  lessonId: string;
  slug: string;
  title: string;
  description: string;
  categoryTitle?: string;
  readingMinutes?: number;
  microStructure: LessonMicroStructure;
  sidebarGroups?: readonly SidebarGroup[];
  headings?: readonly TocHeading[];
  nextLesson?: NavLink | null;
  prevLesson?: NavLink | null;
  relatedLessons?: ReadonlyArray<{ slug: string; title: string }>;
  /** Pre-rendered React nodes for each canonical section so MDX renders on the server */
  renderedSections: {
    intuitionNode: ReactNode;
    visualNode: ReactNode;
    mathNode: ReactNode;
    practiceNode: ReactNode;
    summaryNode: ReactNode;
    fullBodyNode: ReactNode;
    referencesNode?: ReactNode;
  };
}

const SEQUENTIAL_STEPS: ReadonlyArray<{
  id: MicroStepId;
  index: number;
  shortTitleUz: string;
  questionPromptUz: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "intuition",
    index: 0,
    shortTitleUz: "1-qadam: Bu nima va nima uchun kerak?",
    questionPromptUz: "Asosiy tushuncha va uning vazifasi bilan tanishing.",
    icon: Lightbulb,
  },
  {
    id: "visual",
    index: 1,
    shortTitleUz: "2-qadam: Oddiy hayotiy misol va Vizual laboratoriya",
    questionPromptUz: "Parametrlarni o'zgartirib, mexanizmni ko'z bilan ko'ring.",
    icon: Eye,
  },
  {
    id: "math",
    index: 2,
    shortTitleUz: "3-qadam: Qanday ishlaydi? (Mexanizm va Formula)",
    questionPromptUz: "Ichki hisoblash tartibi va matematik bog'liqlik.",
    icon: Calculator,
  },
  {
    id: "practice",
    index: 3,
    shortTitleUz: "4-qadam: Amaliyot va kodda tekshirish",
    questionPromptUz: "Kod misoli va asosiy xulosalar.",
    icon: Code2,
  },
  {
    id: "checkpoint",
    index: 4,
    shortTitleUz: "5-qadam: Bilimingizni tekshiring",
    questionPromptUz: "Qisqa savolga javob berib, darsni yakunlang.",
    icon: CheckCircle2,
  },
];

export function LessonExperienceClient({
  lessonId,
  slug,
  title,
  description,
  categoryTitle,
  readingMinutes,
  microStructure,
  sidebarGroups = [],
  headings = [],
  nextLesson = null,
  prevLesson = null,
  relatedLessons = [],
  renderedSections,
}: LessonExperienceClientProps) {
  const {
    state,
    isDepthCompleted,
    setDepthCompleted,
    setCompleted,
    recordVisit,
    setLastMicroStep,
    savePracticeSubmission,
  } = useLearning();

  // Start with Overview for new students as required by site design.md Section 7
  const [selectedDepth, setSelectedDepth] = useState<LearningDepth>("overview");
  const [viewMode, setViewMode] = useState<"guided" | "reference">("guided");
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [hydratedStep, setHydratedStep] = useState<boolean>(false);

  // Authored practice contract if available for this lesson & depth
  const practice = useMemo(
    () => getLessonPractice(slug, selectedDepth) ?? getLessonPractice(lessonId, selectedDepth),
    [slug, lessonId, selectedDepth]
  );
  const practiceKey = practice ? `${lessonId}:${practice.exercise.id}:${selectedDepth}` : "";
  const savedPractice = practiceKey ? state.practiceSubmissions?.[practiceKey] : undefined;

  // Collapsible lesson navigation drawer (collapsed by default in Guided Mode)
  const [showLessonDrawer, setShowLessonDrawer] = useState<boolean>(false);

  // "Tushunmadim" inline helper state & active sub-tab
  const [showAdaptiveHelp, setShowAdaptiveHelp] = useState<boolean>(false);
  const [helpTab, setHelpTab] = useState<
    "simple" | "example" | "visual" | "prereq"
  >("simple");

  // Checkpoint quiz state
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizInputText, setQuizInputText] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState<boolean>(false);

  const isInputCheckpoint =
    microStructure.checkpoint.type === "input" &&
    Boolean(microStructure.checkpoint.acceptedAnswers?.length);

  const isPythonLesson =
    slug === "python-basics" ||
    slug === "functions" ||
    slug.startsWith("py-") ||
    slug.includes("python") ||
    Boolean(categoryTitle?.toLowerCase().includes("python"));

  const effectiveSteps = useMemo(() => {
    if (!isPythonLesson) return SEQUENTIAL_STEPS;
    return SEQUENTIAL_STEPS.map((st) => {
      if (st.id === "visual") {
        return {
          ...st,
          shortTitleUz: "2-qadam: Interaktiv laboratoriya (Xotira va mexanizm)",
          questionPromptUz: "Xotira modeli, dinamik tiplash va to'plamlarni interaktiv sinab ko'ring.",
        };
      }
      if (st.id === "math") {
        return {
          ...st,
          shortTitleUz: "3-qadam: Qanday ishlaydi? (Sintaksis va Qoidalar)",
          questionPromptUz: "Dinamik tiplash, mutability va shart operatorlari.",
        };
      }
      if (st.id === "practice") {
        return {
          ...st,
          shortTitleUz: "4-qadam: Amaliy dasturlash (Oson → Qiyin)",
          questionPromptUz: "Brauzerda haqiqiy Python kodini yozib, testlardan o'tkazing.",
        };
      }
      if (st.id === "checkpoint") {
        return {
          ...st,
          shortTitleUz: "5-qadam: Bilimingizni tekshiring (Faol savol)",
          questionPromptUz: "Savolga javob yozib, o'rgangan bilimlaringizni tasdiqlang.",
        };
      }
      return st;
    });
  }, [isPythonLesson]);

  // Restore saved step position across page refreshes
  useEffect(() => {
    if (hydratedStep) return;
    const saved = state.lastMicroStep?.[lessonId];
    if (saved) {
      setSelectedDepth(saved.depth);
      if (
        typeof saved.stepIndex === "number" &&
        saved.stepIndex >= 0 &&
        saved.stepIndex < SEQUENTIAL_STEPS.length
      ) {
        setStepIndex(saved.stepIndex);
      }
    }
    setHydratedStep(true);
  }, [hydratedStep, lessonId, state.lastMicroStep]);

  // Record visit for Homepage "Qolgan joyimdan davom etish"
  useEffect(() => {
    if (!hydratedStep) return;
    const progressFraction = Number(
      ((stepIndex + 1) / effectiveSteps.length).toFixed(2)
    );
    recordVisit({
      lessonId,
      slug,
      title,
      progress: progressFraction,
    });
  }, [hydratedStep, lessonId, slug, title, stepIndex, effectiveSteps.length, recordVisit]);

  const currentStep = effectiveSteps[stepIndex] ?? effectiveSteps[0]!;
  const progressPercent = Math.round(
    ((stepIndex + 1) / effectiveSteps.length) * 100
  );

  const handleGoToStep = (nextIdx: number) => {
    const clamped = Math.max(0, Math.min(effectiveSteps.length - 1, nextIdx));
    setStepIndex(clamped);
    setLastMicroStep(lessonId, selectedDepth, clamped);
  };

  const handleSwitchDepth = (nextDepth: LearningDepth) => {
    setSelectedDepth(nextDepth);
    // Preserve current step position where possible
    setLastMicroStep(lessonId, nextDepth, stepIndex);
  };

  const isInputCorrect = useMemo(() => {
    if (!isInputCheckpoint) return false;
    const norm = quizInputText.trim().toLowerCase().replace(/['"`]/g, "").replace(/\(\)$/, "").trim();
    return (microStructure.checkpoint.acceptedAnswers ?? []).some(
      (ans) => ans.trim().toLowerCase().replace(/['"`]/g, "").replace(/\(\)$/, "").trim() === norm
    );
  }, [isInputCheckpoint, quizInputText, microStructure.checkpoint.acceptedAnswers]);

  const handleVerifyCheckpoint = () => {
    setQuizChecked(true);
    if (isInputCheckpoint) {
      if (!quizInputText.trim()) return;
      if (isInputCorrect) {
        setDepthCompleted(lessonId, selectedDepth, true);
        setCompleted(lessonId, true);
      }
      return;
    }

    if (quizChoice === null) return;
    if (quizChoice === microStructure.checkpoint.correctIndex) {
      setDepthCompleted(lessonId, selectedDepth, true);
      setCompleted(lessonId, true);
    }
  };

  const isCurrentDepthDone = isDepthCompleted(lessonId, selectedDepth);
  const isQuizPassed = isInputCheckpoint
    ? quizChecked && isInputCorrect
    : quizChecked && quizChoice === microStructure.checkpoint.correctIndex;

  return (
    <div className="w-full">
      {/* Top Minimal Control Bar (Back to roadmap + Secondary/Tertiary actions) */}
      <div className="w-full mb-6 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Yo&apos;nalish xaritasiga qaytish</span>
          </Link>

          {sidebarGroups.length > 0 && (
            <button
              type="button"
              onClick={() => setShowLessonDrawer((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              <List className="w-3.5 h-3.5 text-violet-400" />
              <span>Darslar ro&apos;yxati</span>
            </button>
          )}
        </div>

        {/* Tertiary compact actions: Depth pill, Reference Mode toggle, Bookmark */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Compact Depth Selector */}
          <div className="inline-flex items-center rounded-xl bg-slate-950 border border-slate-800 p-0.5 text-[11px]">
            {(["overview", "understand", "master"] as const).map((depth) => {
              const active = selectedDepth === depth;
              const done = isDepthCompleted(lessonId, depth);
              return (
                <button
                  key={depth}
                  type="button"
                  onClick={() => handleSwitchDepth(depth)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    active
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {DEPTH_META[depth].badge}
                  {done ? " ✓" : ""}
                </button>
              );
            })}
          </div>

          {/* Secondary Action: "To'liq maqolani o'qish" */}
          <button
            type="button"
            onClick={() =>
              setViewMode((m) => (m === "guided" ? "reference" : "guided"))
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {viewMode === "guided"
                ? "To'liq maqolani o'qish"
                : "Qadamma-qadam rejimga qaytish"}
            </span>
          </button>

          <BookmarkButton id={lessonId} kind="lesson" />
        </div>
      </div>

      {/* Collapsible Lesson Navigation Drawer */}
      {showLessonDrawer && sidebarGroups.length > 0 && (
        <div className="w-full mb-6 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-xs font-bold text-slate-200">
              Barcha darslar navigatsiyasi
            </span>
            <button
              type="button"
              onClick={() => setShowLessonDrawer(false)}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Yopish</span>
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto pr-1">
            <LessonSidebar groups={sidebarGroups} />
          </div>
        </div>
      )}

      {/* GUIDED MODE: Single Focused Column */}
      {viewMode === "guided" ? (
        <div className="w-full space-y-6">
          {/* Focused Lesson Title & One-Sentence Objective */}
          <header className="space-y-4 pb-2">
            {categoryTitle && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/70 border border-violet-700/60 text-xs font-mono font-bold uppercase tracking-wider text-violet-300">
                <span>{categoryTitle}</span>
                {readingMinutes ? <span>• ~{readingMinutes} daqiqa</span> : null}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-5xl">
              {description}
            </p>
          </header>

          {/* Current Step Indicator & Simple Progress Bar */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl shadow-black/40 space-y-4 ring-1 ring-white/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Qadam {stepIndex + 1} / {effectiveSteps.length} •{" "}
                  {DEPTH_META[selectedDepth].title}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {currentStep.shortTitleUz}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdaptiveHelp((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 text-amber-300 text-xs font-bold cursor-pointer transition-colors shadow-sm"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Tushunmadim</span>
                </button>
              </div>
            </div>

            {/* Simple Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>{currentStep.questionPromptUz}</span>
                <span className="font-mono font-bold text-cyan-300">{progressPercent}%</span>
              </div>
            </div>

            {/* Compact Step Dots (allows jumping directly if desired) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {effectiveSteps.map((st) => {
                const isCurr = st.index === stepIndex;
                const isPast = st.index < stepIndex;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleGoToStep(st.index)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isCurr
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-900/50 ring-2 ring-violet-400/40"
                        : isPast
                        ? "bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 hover:bg-emerald-900/60"
                        : "bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {st.index + 1}-qadam
                  </button>
                );
              })}
            </div>
          </div>

          {/* "Tushunmadim" Inline Helper Panel (4 structured tabs, never resets progress) */}
          {showAdaptiveHelp && (
            <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-600/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-800/40 pb-3">
                <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>«Tushunmadim» — Bosqichma-bosqich yordamchi</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdaptiveHelp(false)}
                  className="text-xs font-semibold text-amber-200 hover:text-white cursor-pointer"
                >
                  Darsga qaytish (×)
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { id: "simple", label: "1. Oddiyroq tushuntirish" },
                    { id: "example", label: "2. Hayotiy misol" },
                    { id: "visual", label: "3. Vizual ko'rsatish" },
                    { id: "prereq", label: "4. Oldingi bilimni takrorlash" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setHelpTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      helpTab === tab.id
                        ? "bg-amber-500 text-slate-950 border-amber-400"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {helpTab === "simple" && (
                <div className="space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <p>{microStructure.adaptiveHelp.keyTakeaway}</p>
                  <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap">
                    {microStructure.adaptiveHelp.stepByStep}
                  </pre>
                </div>
              )}

              {helpTab === "example" && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {microStructure.adaptiveHelp.analogy}
                </div>
              )}

              {helpTab === "visual" && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-300">
                    Mavzuning interaktiv simulyatori orqali parametrlarni o&apos;zgartirib ko&apos;ring:
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdaptiveHelp(false);
                      handleGoToStep(1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>2-qadam (Vizual laboratoriya) ga o&apos;tish</span>
                  </button>
                </div>
              )}

              {helpTab === "prereq" && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-300">
                    Ushbu mavzuni osonroq tushunish uchun bog&apos;liq va tayanch darslar:
                  </p>
                  {relatedLessons.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {relatedLessons.map((rel) => (
                        <Link
                          key={rel.slug}
                          href={`/learn/${rel.slug}`}
                          className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-semibold flex items-center justify-between"
                        >
                          <span className="truncate">{rel.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Ushbu dars boshlang&apos;ich tayanch mavzu hisoblanadi — 1-qadamdan boshlab o&apos;qishingiz mumkin.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ONE FOCUSED STEP CONTENT AREA */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-black/50 p-6 sm:p-8 lg:p-10 space-y-8 ring-1 ring-white/5">
            {currentStep.id === "intuition" && (
              <div className="space-y-5">
                <div className="lesson-body text-slate-200 overflow-x-auto">
                  {renderedSections.intuitionNode}
                </div>
              </div>
            )}

            {currentStep.id === "visual" && (
              <div className="space-y-6">
                {isPythonLesson ? (
                  <div className="space-y-4">
                    {slug === "functions" ? (
                      <PythonFunctionsLab />
                    ) : (
                      <PythonBasicsLab />
                    )}
                  </div>
                ) : (
                  <>
                    {slug === "transformers" && <TransformerMicroPathView />}
                    <VisualizationRenderer
                      id={microStructure.interactiveLabId}
                      title={`${title} — Interaktiv Mini-Laboratoriya`}
                      description={description}
                    />
                  </>
                )}
                <div className="lesson-body text-slate-200 overflow-x-auto">
                  {renderedSections.visualNode}
                </div>
              </div>
            )}

            {currentStep.id === "math" && (
              <div className="space-y-5">
                {selectedDepth === "overview" && (
                  <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-violet-200 leading-relaxed">
                      Siz hozir <strong>Level 1 — Overview</strong> darajasidasiz. Matematik formulalar va qadamma-qadam hisoblashlarni chuqurroq o&apos;rganishni xohlaysizmi?
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSwitchDepth("understand")}
                      className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shrink-0 cursor-pointer"
                    >
                      Chuqurroq o&apos;rganish (Understand)
                    </button>
                  </div>
                )}
                <div className="lesson-body text-slate-200 overflow-x-auto">
                  {renderedSections.mathNode}
                </div>
              </div>
            )}

            {currentStep.id === "practice" && (
              <div className="space-y-6">
                {isPythonLesson ? (
                  <Python30DaysPractice
                    initialDay={slug === "functions" ? 11 : 1}
                    allowedDays={
                      slug === "functions"
                        ? [11]
                        : slug === "python-basics"
                        ? [1, 2, 3]
                        : undefined
                    }
                  />
                ) : practice ? (
                  <div className="space-y-4">
                    <GuidedPractice
                      key={`${slug}-${selectedDepth}-${practice.exercise.id}`}
                      practice={practice}
                      initialCode={savedPractice?.code}
                      initialSubStep="theory"
                      onCompleted={(res: PracticeResultInfo) => {
                        savePracticeSubmission(lessonId, practice.exercise.id, selectedDepth, {
                          code: res.userCode,
                          testsPassed: res.testsPassed,
                          attemptCount: res.attemptCount,
                          lastRunAt: new Date().toISOString(),
                          passedAt: res.testsPassed ? new Date().toISOString() : undefined,
                          hintsRevealed: res.hintsRevealed,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <>
                    {selectedDepth !== "master" && (
                      <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs text-cyan-200 leading-relaxed">
                          Matematik isbotlar va to&apos;liq NumPy/PyTorch kodini <strong>Level 3 — Master</strong> darajasida o&apos;zlashtirishingiz mumkin.
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSwitchDepth("master")}
                          className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold shrink-0 cursor-pointer"
                        >
                          Matematika va kod bilan o&apos;rganish
                        </button>
                      </div>
                    )}
                    <div className="lesson-body text-slate-200 overflow-x-auto">
                      {renderedSections.practiceNode}
                    </div>
                  </>
                )}
                <div className="lesson-body text-slate-200 pt-4 border-t border-slate-800 overflow-x-auto">
                  {renderedSections.summaryNode}
                </div>
              </div>
            )}

            {currentStep.id === "checkpoint" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-300">
                    Bilimingizni tekshiring ({DEPTH_META[selectedDepth].title})
                  </div>
                  {isCurrentDepthDone && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Ushbu daraja yakunlangan
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {microStructure.checkpoint.question}
                </h3>

                {isInputCheckpoint ? (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={quizInputText}
                        onChange={(e) => {
                          setQuizInputText(e.target.value);
                          if (quizChecked) setQuizChecked(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleVerifyCheckpoint();
                          }
                        }}
                        placeholder={
                          microStructure.checkpoint.inputPlaceholderUz ??
                          "Javobingizni shu yerga yozing..."
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-xs sm:text-sm font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          quizChecked && !isInputCorrect
                            ? "border-rose-500/80 focus:ring-rose-500/40"
                            : quizChecked && isInputCorrect
                            ? "border-emerald-500/80 focus:ring-emerald-500/40"
                            : "border-slate-800 focus:border-violet-500 focus:ring-violet-500/30"
                        }`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {microStructure.checkpoint.options.map((option, idx) => {
                      const selected = quizChoice === idx;
                      const right = idx === microStructure.checkpoint.correctIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setQuizChoice(idx);
                            setQuizChecked(false);
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            quizChecked && selected
                              ? right
                                ? "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold"
                                : "bg-rose-950/50 border-rose-500 text-rose-200"
                              : selected
                              ? "bg-violet-950/50 border-violet-500 text-violet-200 font-semibold"
                              : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span>{option}</span>
                          {quizChecked && selected && (
                            <span>
                              {right ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-400" />
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleVerifyCheckpoint}
                    disabled={isInputCheckpoint ? !quizInputText.trim() : quizChoice === null}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    Javobni tekshirish
                  </button>

                  {quizChecked && (
                    <div
                      className={`text-xs sm:text-sm p-3 rounded-xl border flex-1 ${
                        isQuizPassed
                          ? "bg-emerald-950/30 border-emerald-600/40 text-emerald-200"
                          : "bg-amber-950/30 border-amber-600/40 text-amber-200"
                      }`}
                    >
                      {isQuizPassed ? (
                        <span>{microStructure.checkpoint.explanation}</span>
                      ) : (
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span>{microStructure.checkpoint.reviewHint}</span>
                          <button
                            type="button"
                            onClick={() => handleGoToStep(0)}
                            className="underline font-semibold text-amber-300 hover:text-white cursor-pointer"
                          >
                            1-qadamni qayta ko&apos;rish
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Progressive Depth Upgrade Callout (when user wants deeper level) */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Joriy chuqurlik:{" "}
                <strong className="text-slate-200">
                  {DEPTH_META[selectedDepth].title} ({DEPTH_META[selectedDepth].uzLabel})
                </strong>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedDepth === "overview" && (
                <button
                  type="button"
                  onClick={() => handleSwitchDepth("understand")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-950/70 hover:bg-violet-900 border border-violet-700/50 text-violet-200 font-semibold cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chuqurroq o&apos;rganish</span>
                </button>
              )}
              {selectedDepth !== "master" && (
                <button
                  type="button"
                  onClick={() => handleSwitchDepth("master")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-semibold cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Matematika va kod bilan o&apos;rganish</span>
                </button>
              )}
            </div>
          </div>

          {/* PRIMARY STEP NAVIGATION FOOTER ("Orqaga" / "Keyingi qadam" / "Bilimni tekshirish" / "Keyingi darsga o'tish") */}
          <div className="flex items-center justify-between gap-4 pt-2">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={() => handleGoToStep(stepIndex - 1)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Orqaga</span>
              </button>
            ) : prevLesson ? (
              <Link
                href={`/learn/${prevLesson.slug}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="truncate max-w-[180px]">{prevLesson.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {stepIndex < SEQUENTIAL_STEPS.length - 2 ? (
              <button
                type="button"
                onClick={() => handleGoToStep(stepIndex + 1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-violet-950/40 transition-all cursor-pointer"
              >
                <span>Keyingi qadam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : stepIndex === SEQUENTIAL_STEPS.length - 2 ? (
              <button
                type="button"
                onClick={() => handleGoToStep(SEQUENTIAL_STEPS.length - 1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-950/40 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Bilimni tekshirish</span>
              </button>
            ) : nextLesson ? (
              <Link
                href={`/learn/${nextLesson.slug}`}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isQuizPassed || isCurrentDepthDone
                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/40"
                    : "bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200"
                }`}
              >
                <span>Keyingi darsga o&apos;tish: {nextLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold transition-all"
              >
                <span>Yo&apos;nalish xaritasiga qaytish</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      ) : (
        /* REFERENCE MODE ("To'liq maqolani o'qish"): Full Research Article + Right Table of Contents */
        <div className="w-full flex flex-col xl:flex-row gap-8 xl:gap-12 items-start justify-between">
          <div className="flex-1 min-w-0 space-y-8 max-w-full">
            <header className="pb-6 border-b border-slate-800 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-xs font-mono font-bold text-cyan-300">
                To&apos;liq Ilmiy Maqola (Reference Mode)
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-4xl">
                {description}
              </p>
            </header>

            <div className="lesson-body text-slate-100 overflow-x-auto space-y-6">
              {renderedSections.fullBodyNode}
            </div>

            {renderedSections.referencesNode}
          </div>

          {headings.length > 0 && (
            <aside className="hidden xl:block w-72 shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pl-6 border-l border-slate-800/90 bg-slate-950/40 p-4 rounded-2xl">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      )}
    </div>
  );
}
