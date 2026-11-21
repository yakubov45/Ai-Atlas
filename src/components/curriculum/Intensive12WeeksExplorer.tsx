"use client";

import React, { useState, useMemo } from "react";
import {
  INTENSIVE_12_WEEKS,
  ALL_INTENSIVE_LESSONS,
  PORTFOLIO_PROJECTS,
  CURRICULUM_55_SOURCES,
  ORIGINAL_9_GAP_MATERIALS,
} from "@/lib/curriculum/ds-ml-ai-12weeks";
import { PythonCodeEditor } from "@/components/practice/PythonCodeEditor";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  FolderGit2,
  GitBranch,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Video,
} from "lucide-react";

type MainTab =
  | "curriculum"
  | "interview_hub"
  | "terms_graph"
  | "videos_hub"
  | "portfolios"
  | "sources";

type LessonSubFilter =
  | "all"
  | "steps"
  | "examples"
  | "terms"
  | "videos"
  | "interview"
  | "practice";

const LANG_BADGE: Record<"uz" | "en" | "ru", { label: string; style: string }> = {
  uz: {
    label: "O'zbekcha",
    style: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  en: {
    label: "English",
    style: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  },
  ru: {
    label: "Русский",
    style: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
};

const LEVEL_BADGE: Record<
  "Junior" | "Middle" | "Senior / Production",
  string
> = {
  Junior: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  Middle: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  "Senior / Production": "bg-violet-500/20 text-violet-300 border-violet-500/40",
};

export function Intensive12WeeksExplorer() {
  const [activeTab, setActiveTab] = useState<MainTab>("curriculum");
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("D01.1");
  const [lessonSection, setLessonSection] = useState<LessonSubFilter>("all");
  const [activeVideoEmbedId, setActiveVideoEmbedId] = useState<string | null>(null);

  // Global hub filters
  const [interviewSearch, setInterviewSearch] = useState<string>("");
  const [interviewLevelFilter, setInterviewLevelFilter] = useState<string>("ALL");
  const [termSearch, setTermSearch] = useState<string>("");
  const [termCategoryFilter, setTermCategoryFilter] = useState<string>("ALL");
  const [videoLangFilter, setVideoLangFilter] = useState<string>("ALL");
  const [sourceSearch, setSourceSearch] = useState<string>("");

  // Quiz & Python Editor states
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [userCode, setUserCode] = useState<string>("");
  const [editorOutput, setEditorOutput] = useState<string>("");
  const [editorError, setEditorError] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const currentWeek = useMemo(() => {
    return (
      INTENSIVE_12_WEEKS.find((w) => w.weekNumber === selectedWeekNum) ??
      INTENSIVE_12_WEEKS[0]!
    );
  }, [selectedWeekNum]);

  const currentLesson = useMemo(() => {
    return (
      currentWeek.lessons.find((l) => l.id === selectedLessonId) ??
      currentWeek.lessons[0]!
    );
  }, [currentWeek, selectedLessonId]);

  React.useEffect(() => {
    setUserCode(currentLesson.codeSnippet);
    setEditorOutput("");
    setEditorError("");
  }, [currentLesson.id, currentLesson.codeSnippet]);

  const jumpToLesson = (lessonId: string) => {
    const targetWeek = INTENSIVE_12_WEEKS.find((w) =>
      w.lessons.some((l) => l.id === lessonId)
    );
    if (targetWeek) {
      setSelectedWeekNum(targetWeek.weekNumber);
      setSelectedLessonId(lessonId);
      setActiveTab("curriculum");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const loadCodeIntoEditor = (codeSnippetToLoad: string) => {
    setUserCode(codeSnippetToLoad);
    setEditorOutput("");
    setEditorError("");
    if (lessonSection !== "all" && lessonSection !== "practice") {
      setLessonSection("all");
    }
    const el = document.getElementById("intensive-python-runner");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleRunUserCode = async () => {
    setIsExecuting(true);
    setEditorOutput("");
    setEditorError("");
    try {
      const res = await fetch("/api/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: userCode }),
      });
      const data = await res.json();
      if (data.success) {
        setEditorOutput(
          data.stdout ||
            "Dastur muvaffaqiyatli bajarildi (hech narsa chop etilmadi)."
        );
      } else {
        setEditorError(data.error || "Xatolik yuz berdi");
      }
    } catch (err: unknown) {
      setEditorError(
        err instanceof Error ? err.message : "Serverga ulanishda xatolik"
      );
    } finally {
      setIsExecuting(false);
    }
  };

  // Flattened collections for global tabs
  const allInterviewQuestions = useMemo(() => {
    return INTENSIVE_12_WEEKS.flatMap((w) =>
      w.lessons.flatMap((l) =>
        (l.interviewQA || []).map((qa) => ({
          ...qa,
          weekNumber: w.weekNumber,
          lessonId: l.id,
          lessonTitleUz: l.titleUz,
        }))
      )
    );
  }, []);

  const filteredInterviews = useMemo(() => {
    return allInterviewQuestions.filter((item) => {
      if (
        interviewLevelFilter !== "ALL" &&
        item.level !== interviewLevelFilter
      ) {
        return false;
      }
      if (!interviewSearch.trim()) return true;
      const q = interviewSearch.toLowerCase();
      return (
        item.questionUz.toLowerCase().includes(q) ||
        item.strongAnswerUz.toLowerCase().includes(q) ||
        item.lessonId.toLowerCase().includes(q) ||
        item.lessonTitleUz.toLowerCase().includes(q)
      );
    });
  }, [allInterviewQuestions, interviewLevelFilter, interviewSearch]);

  const allTermsList = useMemo(() => {
    return INTENSIVE_12_WEEKS.flatMap((w) =>
      w.lessons.flatMap((l) =>
        (l.termsAndConnections || []).map((t) => ({
          ...t,
          weekNumber: w.weekNumber,
          lessonId: l.id,
          lessonTitleUz: l.titleUz,
        }))
      )
    );
  }, []);

  const filteredTerms = useMemo(() => {
    return allTermsList.filter((t) => {
      if (termCategoryFilter !== "ALL" && t.category !== termCategoryFilter) {
        return false;
      }
      if (!termSearch.trim()) return true;
      const q = termSearch.toLowerCase();
      return (
        t.term.toLowerCase().includes(q) ||
        t.definitionUz.toLowerCase().includes(q) ||
        t.lessonId.toLowerCase().includes(q)
      );
    });
  }, [allTermsList, termCategoryFilter, termSearch]);

  const allVideosList = useMemo(() => {
    return INTENSIVE_12_WEEKS.flatMap((w) =>
      w.lessons.flatMap((l) =>
        (l.videos || []).map((v) => ({
          ...v,
          weekNumber: w.weekNumber,
          lessonId: l.id,
          lessonTitleUz: l.titleUz,
        }))
      )
    );
  }, []);

  const filteredVideos = useMemo(() => {
    if (videoLangFilter === "ALL") return allVideosList;
    return allVideosList.filter((v) => v.language === videoLangFilter);
  }, [allVideosList, videoLangFilter]);

  const filteredSources = useMemo(() => {
    if (!sourceSearch.trim()) return CURRICULUM_55_SOURCES;
    const q = sourceSearch.toLowerCase();
    return CURRICULUM_55_SOURCES.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q)
    );
  }, [sourceSearch]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/40 border border-cyan-500/30 p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              AI Atlas 12-Haftalik Chuqurlashtirilgan Dastur & Interview Hub
            </span>
          </div>
          <span className="text-xs font-mono text-slate-300 bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
            42 Dars • 126 Qadam • 84 Misol • 126 Termin • 126 Interview Q&A • 84
            Video
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Data Science & ML-AI Engineering: 12 Haftalik To‘liq Qo‘llanma
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Har bir dars qadamma-qadam maydalab tushuntirilgan: real amaliy
            misollar, terminlar va ularning o‘zaro bog‘liqlik xaritasi, Junior /
            Middle / Senior texnik intervyu savol-javoblari hamda video
            darslardan amalda foydalanish yo‘riqnomalari bilan boyitilgan.
          </p>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("curriculum")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "curriculum"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>12 Haftalik Darslar (42)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("interview_hub")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "interview_hub"
                ? "bg-violet-500 text-white shadow-lg shadow-violet-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Interview Tayyorgarlik (126 Savol-Javob)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("terms_graph")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "terms_graph"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Terminlar & Bog‘liqlik (126)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("videos_hub")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "videos_hub"
                ? "bg-rose-500 text-white shadow-lg shadow-rose-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Darslar & Qo‘llanma (84)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("portfolios")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "portfolios"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>3 Portfolio & 9 Lab</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sources")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "sources"
                ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>55 Manba Katalogi</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 12-WEEK CURRICULUM & GRANULAR LESSON PLAYER                     */}
      {/* ===================================================================== */}
      {activeTab === "curriculum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar: Week & Lesson Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Haftani Tanlang (1–12)
            </div>
            <div className="space-y-2 max-h-[820px] overflow-y-auto pr-1">
              {INTENSIVE_12_WEEKS.map((w) => {
                const isSelected = selectedWeekNum === w.weekNumber;
                return (
                  <div
                    key={w.weekNumber}
                    className={`rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-cyan-950/30 border-cyan-500/80 shadow-md shadow-cyan-950/20"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedWeekNum(w.weekNumber);
                        setSelectedLessonId(w.lessons[0]!.id);
                      }}
                      className="w-full text-left p-3.5 cursor-pointer flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          {w.weekNumber}-Hafta
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                          {w.lessons.length} ta dars
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100">
                        {w.titleUz}
                      </div>
                    </button>

                    {isSelected && (
                      <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-slate-800/80">
                        {w.lessons.map((les) => {
                          const isCur = selectedLessonId === les.id;
                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => setSelectedLessonId(les.id)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isCur
                                  ? "bg-cyan-500 text-slate-950 font-bold"
                                  : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800/80"
                              }`}
                            >
                              <span className="line-clamp-1">
                                <strong className="font-mono">{les.id}:</strong>{" "}
                                {les.titleUz}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Granular Lesson View */}
          <div className="lg:col-span-8 space-y-6">
            {/* Week Overview Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  {currentWeek.weekNumber}-Hafta: {currentWeek.titleUz}
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Haftalik Amaliy Natija & Interview Fokus</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                🎯 <strong>Nimalarni o‘rganamiz:</strong> {currentWeek.focusUz}
              </p>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                📦 <strong>Haftani yopadigan amaliy topshiriq:</strong>{" "}
                {currentWeek.deliverableUz}
              </div>

              {/* Lesson Selector Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {currentWeek.lessons.map((les) => {
                  const isCur = selectedLessonId === les.id;
                  return (
                    <button
                      key={les.id}
                      type="button"
                      onClick={() => setSelectedLessonId(les.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isCur
                          ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                          : "bg-slate-950 text-slate-400 hover:text-white border-slate-800"
                      }`}
                    >
                      {les.id}: {les.titleUz.split(":")[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Lesson Container */}
            <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 space-y-7">
              {/* Lesson Header */}
              <div className="space-y-4 border-b border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                      {currentLesson.id}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      {currentLesson.titleUz}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <span>Manbalar:</span>
                    {currentLesson.sourceIds.map((sid) => (
                      <span
                        key={sid}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300"
                      >
                        {sid}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section Sub-Navigation Filter */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "To'liq Dars (Barchasi)" },
                    {
                      id: "steps",
                      label: `1. Qadamma-Qadam Tahlil (${currentLesson.microSteps?.length || 0})`,
                    },
                    {
                      id: "examples",
                      label: `2. Amaliy Misollar (${currentLesson.practicalExamples?.length || 0})`,
                    },
                    {
                      id: "terms",
                      label: `3. Terminlar & Bog'liqlik (${currentLesson.termsAndConnections?.length || 0})`,
                    },
                    {
                      id: "videos",
                      label: `4. Video Darslar (${currentLesson.videos?.length || 0})`,
                    },
                    {
                      id: "interview",
                      label: `5. Interview Q&A (${currentLesson.interviewQA?.length || 0})`,
                    },
                    {
                      id: "practice",
                      label: `6. Kod & Test (${currentLesson.quiz?.length || 0})`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setLessonSection(tab.id as LessonSubFilter)
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        lessonSection === tab.id
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                          : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overview & Key Takeaways */}
              {(lessonSection === "all" || lessonSection === "steps") && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Darsning Qisqacha Mazmuni (Executive Summary)</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentLesson.theoryUz}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Asosiy Muhandislik Qoidalari (Key Takeaways)</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {currentLesson.keyTakeawaysUz.map((t, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-200"
                        >
                          <span className="text-amber-400 font-bold shrink-0">
                            •
                          </span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SECTION 1: GRANULAR MICRO-STEPS ("Maydalab Tushuntirish")     */}
              {/* ============================================================= */}
              {(lessonSection === "all" || lessonSection === "steps") &&
                currentLesson.microSteps &&
                currentLesson.microSteps.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <span>
                          1. Qadamma-Qadam Maydalab Tushuntirish (Micro-Steps)
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        {currentLesson.microSteps.length} ta bosqich
                      </span>
                    </div>

                    <div className="space-y-4">
                      {currentLesson.microSteps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                                {step.stepNumber}-Bosqich
                              </span>
                              <h5 className="text-sm sm:text-base font-bold text-white">
                                {step.titleUz}
                              </h5>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                loadCodeIntoEditor(step.codeExample)
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all cursor-pointer"
                            >
                              <Play className="w-3 h-3" />
                              <span>Kodni Python Muharrirga Yuklash</span>
                            </button>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {step.explanationUz}
                          </p>

                          <div className="rounded-xl bg-slate-900 border border-slate-800 p-3.5 overflow-x-auto">
                            <pre className="text-xs font-mono text-cyan-200 leading-relaxed">
                              <code>{step.codeExample}</code>
                            </pre>
                          </div>

                          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-100 leading-relaxed">
                            <strong className="text-cyan-300">
                              🔍 Natija va Tahlil:{" "}
                            </strong>
                            {step.outputOrNoteUz}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* ============================================================= */}
              {/* SECTION 2: PRACTICAL EXAMPLES & HOW-TO GUIDES                 */}
              {/* ============================================================= */}
              {(lessonSection === "all" || lessonSection === "examples") &&
                currentLesson.practicalExamples &&
                currentLesson.practicalExamples.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                        <span>
                          2. Real Amaliy Misollar va Qanday Ishlatilishi
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        {currentLesson.practicalExamples.length} ta amaliy
                        ssenariy
                      </span>
                    </div>

                    <div className="space-y-4">
                      {currentLesson.practicalExamples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h5 className="text-sm sm:text-base font-bold text-emerald-300">
                              {ex.titleUz}
                            </h5>
                            <button
                              type="button"
                              onClick={() => loadCodeIntoEditor(ex.code)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all cursor-pointer"
                            >
                              <Play className="w-3 h-3" />
                              <span>Muharrirda Sinab Ko‘rish</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                              <strong className="text-white block mb-1">
                                📌 Real Biznes / Muhandislik Vaziyati:
                              </strong>
                              {ex.scenarioUz}
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                              <strong className="text-emerald-300 block mb-1">
                                🛠️ Qanday Ishlatiladi (How-To):
                              </strong>
                              {ex.howToUseUz}
                            </div>
                          </div>

                          <div className="rounded-xl bg-slate-900 border border-slate-800 p-3.5 overflow-x-auto">
                            <pre className="text-xs font-mono text-emerald-200 leading-relaxed">
                              <code>{ex.code}</code>
                            </pre>
                          </div>

                          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs font-mono text-slate-300">
                            <div className="text-[11px] text-slate-500 uppercase font-bold mb-1">
                              Kutilgan Chiqish (Expected Output):
                            </div>
                            <pre className="whitespace-pre-wrap text-amber-200">
                              {ex.expectedOutput}
                            </pre>
                          </div>

                          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-100 leading-relaxed">
                            <strong className="text-emerald-300">
                              💡 Kod Tahlili (Breakdown):{" "}
                            </strong>
                            {ex.breakdownUz}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* ============================================================= */}
              {/* SECTION 3: TERMINOLOGY & CROSS-CONCEPT CONNECTIONS            */}
              {/* ============================================================= */}
              {(lessonSection === "all" || lessonSection === "terms") &&
                currentLesson.termsAndConnections &&
                currentLesson.termsAndConnections.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <Network className="w-4 h-4 text-amber-400" />
                        <span>
                          3. Asosiy Terminlar va Ularning O‘zaro Bog‘liqligi
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        Darslararo bilimlar grafi
                      </span>
                    </div>

                    <div className="space-y-4">
                      {currentLesson.termsAndConnections.map((tc, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h5 className="text-sm sm:text-base font-bold text-amber-300">
                              {tc.term}
                            </h5>
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-200 text-[11px] font-semibold">
                              {tc.category}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            <strong className="text-white">Ta’rif: </strong>
                            {tc.definitionUz}
                          </p>

                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                            <strong className="text-amber-300">
                              🎯 Hayotiy Analogiya / Misol:{" "}
                            </strong>
                            {tc.analogyOrExampleUz}
                          </div>

                          {tc.connectedTo && tc.connectedTo.length > 0 && (
                            <div className="space-y-2 pt-1">
                              <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                                <span>
                                  Boshqa Haftalar va Terminlar Bilan
                                  Bog‘liqligi:
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                {tc.connectedTo.map((link, lIdx) => (
                                  <div
                                    key={lIdx}
                                    className="p-3 rounded-xl bg-cyan-950/25 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                  >
                                    <div className="text-xs text-slate-200 space-y-0.5">
                                      <div className="font-bold text-cyan-300">
                                        🔗 {link.targetTerm}
                                      </div>
                                      <div className="text-slate-300">
                                        {link.relationshipUz}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        jumpToLesson(link.targetLessonId)
                                      }
                                      className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 font-mono text-xs font-bold transition-all cursor-pointer"
                                    >
                                      <span>{link.targetLessonId} darsga</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* ============================================================= */}
              {/* SECTION 4: EDUCATIONAL VIDEOS & HOW TO USE THEM               */}
              {/* ============================================================= */}
              {(lessonSection === "all" || lessonSection === "videos") &&
                currentLesson.videos &&
                currentLesson.videos.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <Video className="w-4 h-4 text-rose-400" />
                        <span>
                          4. Video Darslar va Ulardan Amalda Foydalanish
                          Yo‘riqnomasi
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        Tasdiqlangan YouTube manbalar
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {currentLesson.videos.map((vid) => {
                        const langInfo = LANG_BADGE[vid.language];
                        const isEmbedded = activeVideoEmbedId === vid.id;
                        return (
                          <div
                            key={vid.id}
                            className="p-5 rounded-2xl bg-slate-950/90 border border-rose-500/30 space-y-3.5"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${langInfo.style}`}
                                  >
                                    {langInfo.label}
                                  </span>
                                  <span className="text-xs font-semibold text-slate-400">
                                    Kanal:{" "}
                                    <strong className="text-slate-200">
                                      {vid.channel}
                                    </strong>
                                  </span>
                                  <span className="text-xs font-mono text-rose-300 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                                    ⏱ {vid.durationOrTimestamp}
                                  </span>
                                </div>
                                <h5 className="text-sm sm:text-base font-bold text-white">
                                  {vid.title}
                                </h5>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveVideoEmbedId(
                                      isEmbedded ? null : vid.id
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-all cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5" />
                                  <span>
                                    {isEmbedded
                                      ? "Pleyerni Yopish"
                                      : "Shu Yerda Ko'rish"}
                                  </span>
                                </button>
                                <a
                                  href={vid.youtubeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
                                >
                                  <span>YouTube</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>

                            {isEmbedded && (
                              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-black">
                                <iframe
                                  src={`https://www.youtube.com/embed/${vid.youtubeId}?rel=0`}
                                  title={vid.title}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
                                <strong className="text-rose-300 block mb-1">
                                  📺 Videoda Nima Tushuntirilgan?
                                </strong>
                                {vid.whatItExplainsUz}
                              </div>
                              <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-emerald-100 leading-relaxed">
                                <strong className="text-emerald-300 block mb-1">
                                  🚀 Qanday Ishlatish va Amalda Qo‘llash Kerak?
                                </strong>
                                {vid.howToUseVideoUz}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* ============================================================= */}
              {/* SECTION 5: TECHNICAL INTERVIEW PREPARATION Q&A                */}
              {/* ============================================================= */}
              {(lessonSection === "all" || lessonSection === "interview") &&
                currentLesson.interviewQA &&
                currentLesson.interviewQA.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-violet-400" />
                        <span>
                          5. Texnik Intervyu Savol-Javoblari (Junior / Middle /
                          Senior)
                        </span>
                      </h4>
                      <span className="text-xs text-violet-300 font-semibold">
                        Intervyu Tayyorgarlik Bloki
                      </span>
                    </div>

                    <div className="space-y-4">
                      {currentLesson.interviewQA.map((qa) => (
                        <div
                          key={qa.id}
                          className="p-5 rounded-2xl bg-slate-950/90 border border-violet-500/30 space-y-3.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-md border text-xs font-bold ${LEVEL_BADGE[qa.level]}`}
                            >
                              {qa.level} Interview Question
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                              {qa.id}
                            </span>
                          </div>

                          <h5 className="text-sm sm:text-base font-bold text-white leading-snug">
                            ❓ {qa.questionUz}
                          </h5>

                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                            <strong className="text-violet-300">
                              🎯 Intervyu oluvchi nimani tekshiryapti?{" "}
                            </strong>
                            {qa.interviewerIntentUz}
                          </div>

                          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                            <strong className="text-emerald-300 block mb-1">
                              ✅ Kuchli (Senior Darajadagi) Javob Namunasi:
                            </strong>
                            {qa.strongAnswerUz}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 leading-relaxed">
                              <strong className="text-rose-300 flex items-center gap-1 mb-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Xato Javob (Red Flag — Bunday demang!):</span>
                              </strong>
                              {qa.redFlagUz}
                            </div>
                            <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 text-amber-100 leading-relaxed">
                              <strong className="text-amber-300 block mb-1">
                                🔥 Qaltis Qo‘shimcha Savol (Follow-Up) & Javob:
                              </strong>
                              {qa.followUpQuestionUz}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* ============================================================= */}
              {/* SECTION 6: LIVE PYTHON 3.12 CODE EDITOR & CHECKPOINT QUIZ     */}
              {/* ============================================================= */}
              {(lessonSection === "all" || lessonSection === "practice") && (
                <div
                  id="intensive-python-runner"
                  className="space-y-6 pt-4 border-t border-slate-800"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span>
                          6. Interaktiv Python 3.12 Laboratoriya & Sinov
                          Maydoni
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        Yuqoridagi istalgan misolni yuklab o‘zgartirib
                        yurgizing
                      </span>
                    </div>
                    <PythonCodeEditor
                      value={userCode}
                      onChange={setUserCode}
                      onRun={handleRunUserCode}
                      onReset={() => {
                        setUserCode(currentLesson.codeSnippet);
                        setEditorOutput("");
                        setEditorError("");
                      }}
                      isRunning={isExecuting}
                      output={editorOutput}
                      error={editorError}
                      minHeight="260px"
                    />
                  </div>

                  {/* Checkpoint Quiz */}
                  {currentLesson.quiz && currentLesson.quiz.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-slate-800">
                      <div className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-cyan-400" />
                        <span>
                          Bilimni Tekshirish ({currentLesson.quiz.length} ta
                          Checkpoint Savoli)
                        </span>
                      </div>

                      {currentLesson.quiz.map((q) => {
                        const chosen = quizAnswers[q.id];
                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3"
                          >
                            <div className="text-xs sm:text-sm font-semibold text-slate-100">
                              {q.promptUz}
                            </div>
                            <div className="space-y-2">
                              {getShuffledQuizOptions(
                                q.id,
                                q.options,
                                q.correctIndex
                              ).map((opt) => {
                                const isChosen = chosen === opt.originalIndex;
                                const isCorrect = opt.isCorrect;
                                let btnStyle =
                                  "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                                if (chosen !== undefined) {
                                  if (isCorrect) {
                                    btnStyle =
                                      "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold";
                                  } else if (isChosen) {
                                    btnStyle =
                                      "bg-rose-950/80 border-rose-500 text-rose-100";
                                  }
                                }
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
                                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                                  >
                                    <span>{opt.text}</span>
                                    {chosen !== undefined && isCorrect && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                            {chosen !== undefined && (
                              <div
                                className={`p-3 rounded-xl text-xs ${
                                  chosen === q.correctIndex
                                    ? "bg-emerald-950/40 text-emerald-200 border border-emerald-500/30"
                                    : "bg-amber-950/40 text-amber-200 border border-amber-500/30"
                                }`}
                              >
                                <strong>
                                  {chosen === q.correctIndex
                                    ? "To'g'ri! 🎉 "
                                    : "Tushuntirish: "}
                                </strong>
                                {q.explanationUz}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: GLOBAL INTERVIEW PREPARATION HUB (126 QUESTIONS)               */}
      {/* ===================================================================== */}
      {activeTab === "interview_hub" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-violet-500/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                  <span>
                    Data Science, ML va AI Engineer Interview Tayyorgarlik
                    Markazi
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  12 hafta bo‘yicha jami {allInterviewQuestions.length} ta real
                  intervyu savoli: Intervyu oluvchi maqsadi, Senior javob
                  namunasi, Red Flag xatolar va Follow-up savollar.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["ALL", "Junior", "Middle", "Senior / Production"].map(
                  (lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setInterviewLevelFilter(lvl)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        interviewLevelFilter === lvl
                          ? "bg-violet-500 text-white border-violet-400"
                          : "bg-slate-950 text-slate-400 hover:text-white border-slate-800"
                      }`}
                    >
                      {lvl === "ALL" ? "Barcha Darajalar (126)" : lvl}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={interviewSearch}
                onChange={(e) => setInterviewSearch(e.target.value)}
                placeholder="Savol, termin yoki dars bo'yicha qidirish (masalan: Data Leakage, KV Cache, LoRA, p-value, Window)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredInterviews.map((qa) => (
              <div
                key={qa.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-violet-500/40 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md border text-xs font-bold ${LEVEL_BADGE[qa.level]}`}
                    >
                      {qa.level}
                    </span>
                    <span className="text-xs font-mono text-cyan-300 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                      {qa.weekNumber}-Hafta • {qa.lessonId}
                    </span>
                    <span className="text-xs text-slate-400 line-clamp-1">
                      {qa.lessonTitleUz}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToLesson(qa.lessonId)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-200 text-xs font-semibold cursor-pointer"
                  >
                    <span>Darsga O‘tish</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white">
                  ❓ {qa.questionUz}
                </h3>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-violet-300">
                    🎯 Intervyu oluvchi maqsadi:{" "}
                  </strong>
                  {qa.interviewerIntentUz}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  <strong className="text-emerald-300 block mb-1">
                    ✅ Kuchli Javob:
                  </strong>
                  {qa.strongAnswerUz}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/30 text-rose-200">
                    <strong className="text-rose-300 block mb-0.5">
                      🚫 Red Flag (Xato javob):
                    </strong>
                    {qa.redFlagUz}
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 text-amber-100">
                    <strong className="text-amber-300 block mb-0.5">
                      🔥 Follow-up Savol:
                    </strong>
                    {qa.followUpQuestionUz}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: TERMINOLOGY & CONCEPT CONNECTION GRAPH (126 TERMS)             */}
      {/* ===================================================================== */}
      {activeTab === "terms_graph" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-amber-400" />
                  <span>
                    Terminlar Lug‘ati va Darslararo Bog‘liqlik Xaritasi (
                    {allTermsList.length} ta Termin)
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Har bir termin nima ekanligi, hayotiy analogiyasi va u keyingi
                  haftalardagi qaysi mavzularga asos bo‘lishi ko‘rsatilgan.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                "ALL",
                "Python & Infra",
                "Data & SQL",
                "Math & Stats",
                "Classic ML",
                "Deep Learning & NLP",
                "LLM & RAG",
                "MLOps & Eval",
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTermCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    termCategoryFilter === cat
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-950 text-slate-400 hover:text-white border-slate-800"
                  }`}
                >
                  {cat === "ALL" ? "Barcha Yo'nalishlar (126)" : cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={termSearch}
                onChange={(e) => setTermSearch(e.target.value)}
                placeholder="Termin qidirish (masalan: Broadcasting, Cosine, Attention, KV Cache, RRF, LoRA, PSI)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((tc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                      {tc.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => jumpToLesson(tc.lessonId)}
                      className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                    >
                      {tc.weekNumber}-Hafta • {tc.lessonId} →
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">{tc.term}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tc.definitionUz}
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-amber-300">💡 Analogiya: </strong>
                    {tc.analogyOrExampleUz}
                  </div>
                </div>

                {tc.connectedTo && tc.connectedTo.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase text-slate-400">
                      Bog‘langan Konseptlar:
                    </div>
                    {tc.connectedTo.map((link, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/25 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="text-slate-300">
                          <strong className="text-cyan-300">
                            {link.targetTerm}:
                          </strong>{" "}
                          {link.relationshipUz}
                        </div>
                        <button
                          type="button"
                          onClick={() => jumpToLesson(link.targetLessonId)}
                          className="shrink-0 px-2 py-1 rounded bg-cyan-500/20 text-cyan-200 font-mono text-[11px] font-bold hover:bg-cyan-500/30 cursor-pointer"
                        >
                          {link.targetLessonId}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: VIDEO LIBRARY & STUDY GUIDE (84 VIDEOS)                        */}
      {/* ===================================================================== */}
      {activeTab === "videos_hub" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400" />
                <span>
                  12 Haftalik Video Darslar va Ularni Amalda Qo‘llash Qo‘llanmasi
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Har bir video uchun: nimani tushuntirishi va videoni ko‘rgach
                kod muharririda nimani mashq qilish kerakligi ko‘rsatilgan.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "ALL", label: `Barchasi (${allVideosList.length})` },
                { id: "uz", label: "O'zbekcha" },
                { id: "en", label: "English" },
                { id: "ru", label: "Русский" },
              ].map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setVideoLangFilter(l.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    videoLangFilter === l.id
                      ? "bg-rose-500 text-white border-rose-400"
                      : "bg-slate-950 text-slate-400 hover:text-white border-slate-800"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVideos.map((vid) => {
              const langInfo = LANG_BADGE[vid.language];
              const isEmbedded = activeVideoEmbedId === vid.id;
              return (
                <div
                  key={`${vid.lessonId}-${vid.id}`}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded border text-[11px] font-bold ${langInfo.style}`}
                        >
                          {langInfo.label}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          {vid.channel}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => jumpToLesson(vid.lessonId)}
                        className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                      >
                        {vid.weekNumber}-Hafta • {vid.lessonId} →
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {vid.title}
                    </h3>

                    {isEmbedded && (
                      <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${vid.youtubeId}?rel=0`}
                          title={vid.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-rose-300 block mb-0.5">
                        📺 Videoda nima tushuntirilgan:
                      </strong>
                      {vid.whatItExplainsUz}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-100">
                      <strong className="text-emerald-300 block mb-0.5">
                        🛠️ Qanday ishlatish kerak:
                      </strong>
                      {vid.howToUseVideoUz}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveVideoEmbedId(isEmbedded ? null : vid.id)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>
                        {isEmbedded ? "Pleyerni Yopish" : "Videoni Ochish"}
                      </span>
                    </button>
                    <a
                      href={vid.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white"
                    >
                      <span>YouTube’da ko‘rish</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: 3 PORTFOLIO PROJECTS & 9 ORIGINAL GAP LABORATORIES             */}
      {/* ===================================================================== */}
      {activeTab === "portfolios" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between space-y-5 shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                      {proj.weekSpan}
                    </span>
                    <FolderGit2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {proj.titleUz}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.goalUz}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase text-slate-400">
                      Texnologiyalar Steki:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-[11px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase text-slate-400">
                      Topshiriladigan Artefaktlar (Deliverables):
                    </div>
                    <ul className="space-y-1.5">
                      {proj.deliverables.map((d, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Baholash & Interview Himoya Mezonlari:</span>
                  </div>
                  <ul className="space-y-1">
                    {proj.evaluationCriteria.map((c, i) => (
                      <li key={i} className="text-[11px] text-slate-400">
                        • {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>
                9 ta Bo‘shliq To‘ldiruvchi Original O‘zbekcha Laboratoriya (Gap
                Materials)
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ORIGINAL_9_GAP_MATERIALS.map((gap) => (
                <div
                  key={gap.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                        {gap.id}
                      </span>
                      <span className="text-xs font-mono text-cyan-400">
                        Dars: {gap.lessonId}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {gap.titleUz}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {gap.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToLesson(gap.lessonId)}
                    className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 transition-all cursor-pointer"
                  >
                    {gap.lessonId} Darsida Ochish →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 6: 55 OPEN SOURCES CATALOG (M01 - M55)                            */}
      {/* ===================================================================== */}
      {activeTab === "sources" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">
                55 ta Tekshirilgan Ochiq Manbalar Katalogi (M01–M55)
              </h3>
              <p className="text-xs text-slate-400">
                MIT, Apache-2.0, CC-BY litsenziyali repozitoriylar, rasmiy
                hujjatlar va o‘zbekcha manbalar.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={sourceSearch}
                onChange={(e) => setSourceSearch(e.target.value)}
                placeholder="M01, PyTorch, RAG, Karpathy..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSources.map((src) => (
              <div
                key={src.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono text-xs font-bold">
                      {src.id}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {src.lang} • {src.license}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{src.name}</h4>
                  <div className="text-xs text-slate-400">
                    Muallif: <span className="text-slate-200">{src.author}</span>
                  </div>
                  <p className="text-xs text-slate-300">{src.role}</p>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-cyan-300 font-semibold transition-all"
                >
                  <span>Manbani Ochish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
