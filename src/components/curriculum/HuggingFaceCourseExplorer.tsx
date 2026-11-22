"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  HF_COURSE_CHAPTERS,
  ALL_HF_MICRO_LESSONS,
  SIX_EXISTING_CAREER_TRACKS,
  getHfChapterOverlayForTrack,
  getHfCourseImportAuditReport,
  resolveHfCanonicalLessonId,
  type ExistingCareerTrackId,
} from "@/lib/curriculum/hf-llm-course";
import type { LearningDepth } from "@/lib/curriculum/paths";
import { useLearning } from "@/hooks/use-learning";
import { PythonCodeEditor } from "@/components/practice/PythonCodeEditor";
import { TokenPaddingLab } from "@/components/visualizations/TokenPaddingLab";
import { runPythonCode } from "@/lib/runner/python-runner";
import type { TestCaseResult } from "@/lib/runner/types";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  FileCheck2,
  Film,
  FlaskConical,
  GitMerge,
  HelpCircle,
  Layers,
  Lightbulb,
  Lock,
  Play,
  ShieldAlert,
  Sparkles,
  Terminal,
  Wrench,
  XCircle,
} from "lucide-react";

export interface HuggingFaceCourseExplorerProps {
  defaultTrackId?: ExistingCareerTrackId;
  initialChapterId?: string;
  initialLessonId?: string;
  embedded?: boolean;
}

export function HuggingFaceCourseExplorer({
  defaultTrackId = "ai-engineer",
  initialChapterId = "hf-02",
  initialLessonId = "hf-02-05-01",
  embedded = false,
}: HuggingFaceCourseExplorerProps) {
  const {
    state,
    isCompleted,
    setCompleted,
    isDepthCompleted,
    setDepthCompleted,
    isMicroLessonCompleted,
    setMicroLessonCompleted,
    savePracticeSubmission,
    getPracticeSubmission,
  } = useLearning();

  const [selectedTrackId, setSelectedTrackId] =
    useState<ExistingCareerTrackId>(defaultTrackId);
  const [selectedChapterId, setSelectedChapterId] =
    useState<string>(initialChapterId);
  const [selectedLessonId, setSelectedLessonId] =
    useState<string>(initialLessonId);
  const [activeDepth, setActiveDepth] = useState<LearningDepth>("understand");
  const [viewTab, setViewTab] = useState<
    "lesson_player" | "canonical_map" | "audit_report"
  >("lesson_player");
  const [statusFilter, setStatusFilter] = useState<"all" | "published_only">(
    "all"
  );

  // Coding practice state
  const [studentCode, setStudentCode] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runStdout, setRunStdout] = useState<string>("");
  const [runError, setRunError] = useState<string>("");
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [allTestsPassed, setAllTestsPassed] = useState<boolean | null>(null);
  const [revealedHintsCount, setRevealedHintsCount] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const auditReport = useMemo(() => getHfCourseImportAuditReport(), []);

  const currentChapter = useMemo(() => {
    return (
      HF_COURSE_CHAPTERS.find((c) => c.id === selectedChapterId) ??
      HF_COURSE_CHAPTERS[2]!
    );
  }, [selectedChapterId]);

  const currentLesson = useMemo(() => {
    return (
      ALL_HF_MICRO_LESSONS.find((l) => l.id === selectedLessonId) ??
      currentChapter.lessons[0]!
    );
  }, [selectedLessonId, currentChapter]);

  const canonicalLessonId = useMemo(
    () => resolveHfCanonicalLessonId(currentLesson.id),
    [currentLesson.id]
  );

  const chapterOverlay = useMemo(
    () => getHfChapterOverlayForTrack(currentChapter.id, selectedTrackId),
    [currentChapter.id, selectedTrackId]
  );

  // Sync starter code or saved submission when lesson changes
  useEffect(() => {
    const pub = currentLesson.publishedContent;
    if (!pub) {
      setStudentCode("");
      setRunStdout("");
      setRunError("");
      setTestResults([]);
      setAllTestsPassed(null);
      setRevealedHintsCount(0);
      return;
    }

    const saved = getPracticeSubmission(
      canonicalLessonId,
      pub.exercise.id,
      activeDepth
    );
    setStudentCode(saved?.code ?? pub.exercise.starterCode);
    setRunStdout("");
    setRunError("");
    setTestResults([]);
    setAllTestsPassed(saved ? saved.testsPassed : null);
    setRevealedHintsCount(saved?.hintsRevealed ?? 0);
  }, [
    currentLesson.id,
    currentLesson.publishedContent,
    canonicalLessonId,
    activeDepth,
    getPracticeSubmission,
  ]);

  const selectLesson = (lessonId: string) => {
    const target = ALL_HF_MICRO_LESSONS.find((l) => l.id === lessonId);
    if (!target) return;
    setSelectedChapterId(target.chapterId);
    setSelectedLessonId(target.id);
    setViewTab("lesson_player");
  };

  const handleRunPracticeCode = async () => {
    const pub = currentLesson.publishedContent;
    if (!pub) return;

    setIsRunning(true);
    setRunStdout("");
    setRunError("");

    try {
      const result = await runPythonCode(studentCode, pub.exercise.testCases, {
        runTests: true,
        timeoutMs: 6000,
      });

      setRunStdout(result.stdout || "");
      if (!result.success) {
        setRunError(
          result.errorDetailsUz ||
            result.error ||
            result.stderr ||
            "Kodni bajarishda xatolik yuz berdi."
        );
      }
      setTestResults(result.testResults ?? []);
      const passed = Boolean(result.allTestsPassed);
      setAllTestsPassed(passed);

      const prevSub = getPracticeSubmission(
        canonicalLessonId,
        pub.exercise.id,
        activeDepth
      );
      const nextAttempts = (prevSub?.attemptCount ?? 0) + 1;

      savePracticeSubmission(canonicalLessonId, pub.exercise.id, activeDepth, {
        code: studentCode,
        testsPassed: passed,
        attemptCount: nextAttempts,
        lastRunAt: new Date().toISOString(),
        passedAt: passed
          ? prevSub?.passedAt ?? new Date().toISOString()
          : prevSub?.passedAt,
        hintsRevealed: revealedHintsCount,
      });

      if (passed) {
        setDepthCompleted(canonicalLessonId, activeDepth, true);
        setMicroLessonCompleted(currentLesson.id, true);
        setCompleted(canonicalLessonId, true);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const isCurrentLessonDone =
    isMicroLessonCompleted(currentLesson.id) ||
    isCompleted(canonicalLessonId) ||
    isDepthCompleted(canonicalLessonId, activeDepth);

  return (
    <div
      data-testid="hf-llm-course-explorer"
      className={
        embedded
          ? "space-y-6"
          : "space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      }
    >
      {/* Top Banner: Shared Course Module (NOT a 7th Career Track) */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/30 border border-amber-500/30 p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Shared Learning Module • 6 ta Mavjud Yo‘nalish Uchun Umumiy Kurs
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              13 Bob (0–12) • 99 Bo‘lim • 220 Reja Tuguni
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
              {auditReport.publishedLessonsCount} / {auditReport.totalMicroLessonsCount} ta Dars To‘liq Nashr Etilgan (100% Published)
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Hugging Face LLM Course — AI Atlas Adaptatsiyasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Ushbu modul yangi 7-kasbiy yo‘nalish emas — u{" "}
            <strong>
              AI Engineer, ML Engineer, Data Scientist, Python Developer, Data
              Engineer va Prompt Engineering
            </strong>{" "}
            yo‘nalishlari bo‘ylab umumiy (shared) bilimlar qatlami sifatida
            ishlaydi. Bir xil kanonik dars bitta yo‘nalishda tugatilsa,
            boshqalarida ham hisobga olinadi (`overview`, `understand`, `master`
            chuqurliklari alohida saqlanadi).
          </p>
        </div>

        {/* Six Existing Career Tracks Overlay Selector */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Kasbiy Yo‘nalishingizni Tanlang (6 ta Mavjud Track Overlay):
            </span>
            <Link
              href={
                SIX_EXISTING_CAREER_TRACKS.find((t) => t.id === selectedTrackId)
                  ?.roadmapHref ?? "/roadmap"
              }
              className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Asosiy Track Roadmap’ga qaytish</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {SIX_EXISTING_CAREER_TRACKS.map((track) => {
              const isSelected = selectedTrackId === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950/30"
                      : "bg-slate-950 text-slate-300 hover:text-white border-slate-800"
                  }`}
                >
                  {track.labelUz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setViewTab("lesson_player")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewTab === "lesson_player"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>13 Bob & Mikro-Darslar Пleyeri</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab("canonical_map")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewTab === "canonical_map"
                  ? "bg-violet-500 text-white"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <GitMerge className="w-3.5 h-3.5" />
              <span>
                Kanonik Darslar Bog‘lanishi ({auditReport.canonicalLinkedCount})
              </span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab("audit_report")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewTab === "audit_report"
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Import Audit & Apache-2.0 Litsenziya</span>
            </button>
          </div>

          {/* Quick Jump to Chapters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-emerald-400 mr-1">
              Asosiy Boblarga Sakrash:
            </span>
            {[
              { id: "hf-00-01-01", label: "Ch.0 Setup" },
              { id: "hf-01-01-01", label: "Ch.1 Models" },
              { id: "hf-02-05-01", label: "Ch.2 Padding" },
              { id: "hf-03-01-01", label: "Ch.3 Fine-tune" },
              { id: "hf-05-01-01", label: "Ch.5 Datasets" },
              { id: "hf-06-06-02", label: "Ch.6 BPE Merge" },
              { id: "hf-07-01-01", label: "Ch.7 NLP" },
              { id: "hf-09-01-01", label: "Ch.9 Gradio" },
              { id: "hf-11-04-02", label: "Ch.11 LoRA" },
              { id: "hf-12-04-02", label: "Ch.12 GRPO" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectLesson(item.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border transition-all cursor-pointer ${
                  selectedLessonId === item.id
                    ? "bg-emerald-500 text-slate-950 border-emerald-400"
                    : "bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* VIEW 1: 13 CHAPTERS & MICRO-LESSON PLAYER                           */}
      {/* =================================================================== */}
      {viewTab === "lesson_player" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar: 13 Chapters & Micro-Lessons */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                13 ta Bob (Chapters 0–12)
              </span>
              <button
                type="button"
                onClick={() =>
                  setStatusFilter((s) =>
                    s === "all" ? "published_only" : "all"
                  )
                }
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                  statusFilter === "published_only"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-900 text-slate-400 border-slate-800"
                }`}
              >
                {statusFilter === "published_only"
                  ? `Faqat Published (${auditReport.publishedLessonsCount})`
                  : `Barchasi (${auditReport.totalMicroLessonsCount})`}
              </button>
            </div>

            <div className="space-y-2 max-h-[820px] overflow-y-auto pr-1">
              {HF_COURSE_CHAPTERS.map((ch) => {
                const overlay = getHfChapterOverlayForTrack(
                  ch.id,
                  selectedTrackId
                );
                const isSelected = ch.id === currentChapter.id;
                const visibleLessons =
                  statusFilter === "published_only"
                    ? ch.lessons.filter((l) => l.publishStatus === "published")
                    : ch.lessons;

                if (
                  statusFilter === "published_only" &&
                  visibleLessons.length === 0
                ) {
                  return null;
                }

                const pubCountInCh = ch.lessons.filter(
                  (l) => l.publishStatus === "published"
                ).length;

                return (
                  <div
                    key={ch.id}
                    className={`rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-slate-900 border-amber-500/70 shadow-lg"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedChapterId(ch.id);
                        const firstPub = ch.lessons.find(
                          (l) => l.publishStatus === "published"
                        );
                        setSelectedLessonId(
                          (firstPub ?? ch.lessons[0])!.id
                        );
                      }}
                      className="w-full text-left p-3.5 cursor-pointer space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          Chapter {ch.sourceChapter} ({ch.id})
                        </span>
                        <div className="flex items-center gap-1">
                          {pubCountInCh > 0 && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                              {pubCountInCh} published
                            </span>
                          )}
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              overlay.role === "deep"
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                                : overlay.role === "supporting"
                                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {overlay.role.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {ch.title}
                      </div>
                      {ch.isAdvancedOptionalForBeginners && (
                        <div className="text-[11px] text-amber-300/90 font-semibold">
                          ⚠️ Ilg‘or bob: boshlang‘ich AI Engineer uchun majburiy
                          emas
                        </div>
                      )}
                    </button>

                    {isSelected && (
                      <div className="px-3 pb-3 pt-1.5 space-y-1 border-t border-slate-800/80 max-h-72 overflow-y-auto">
                        {visibleLessons.map((les) => {
                          const isCur = les.id === currentLesson.id;
                          const canId = resolveHfCanonicalLessonId(les.id);
                          const done =
                            isMicroLessonCompleted(les.id) ||
                            isCompleted(canId);
                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => setSelectedLessonId(les.id)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isCur
                                  ? "bg-amber-500 text-slate-950 font-bold"
                                  : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800/70"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {done ? (
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isCur
                                        ? "text-slate-950"
                                        : "text-emerald-400"
                                    }`}
                                  />
                                ) : les.publishStatus === "published" ? (
                                  <Play
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isCur
                                        ? "text-slate-950"
                                        : "text-emerald-400"
                                    }`}
                                  />
                                ) : les.publishStatus === "unavailable" ? (
                                  <Lock className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                                ) : (
                                  <Clock className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                                )}
                                <span className="truncate">
                                  <span className="font-mono">{les.id}:</span>{" "}
                                  {les.title}
                                </span>
                              </div>
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                                  isCur
                                    ? "bg-slate-950/20 text-slate-950 font-bold"
                                    : les.publishStatus === "published"
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : les.publishStatus === "unavailable"
                                    ? "bg-rose-500/20 text-rose-300"
                                    : "bg-slate-900 text-slate-400"
                                }`}
                              >
                                {les.publishStatus}
                              </span>
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

          {/* Right Area: Active Chapter Header & Lesson Experience */}
          <div className="lg:col-span-8 space-y-6">
            {/* Chapter Context & Track Overlay Bar */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                    Chapter {currentChapter.sourceChapter}
                  </span>
                  <h2 className="text-base sm:text-lg font-extrabold text-white">
                    {currentChapter.title}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  {
                    SIX_EXISTING_CAREER_TRACKS.find(
                      (t) => t.id === selectedTrackId
                    )?.labelUz
                  }
                  : {chapterOverlay.badgeLabelUz}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                🎯 <strong>Bob maqsadi:</strong> {currentChapter.summary} •{" "}
                <strong>Mini-loyiha:</strong> {currentChapter.chapterProject}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <Cpu className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{currentChapter.environmentNotesUz}</span>
              </div>
            </div>

            {/* Active Micro-Lesson Card */}
            <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 space-y-6">
              {/* Lesson Title & Status Badge */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                      {currentLesson.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      Bo‘lim: <strong>{currentLesson.sourceSection}</strong>
                    </span>
                    <span
                      data-testid="hf-lesson-status-badge"
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        currentLesson.publishStatus === "published"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : currentLesson.publishStatus === "unavailable"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      }`}
                    >
                      {currentLesson.publishStatus === "published"
                        ? "PUBLISHED (To'liq Amaliy Dars)"
                        : currentLesson.publishStatus === "unavailable"
                        ? "UNAVAILABLE (Manbada hali chiqmagan)"
                        : "PLANNED (Rejalashtirilgan Syllabus Tuguni)"}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentLesson.title}
                  </h3>
                </div>

                {/* Shared Completion Indicator */}
                <button
                  type="button"
                  onClick={() => {
                    const nextVal = !isCurrentLessonDone;
                    setMicroLessonCompleted(currentLesson.id, nextVal);
                    setCompleted(canonicalLessonId, nextVal);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isCurrentLessonDone
                      ? "bg-emerald-500 text-slate-950 border-emerald-400"
                      : "bg-slate-950 text-slate-300 hover:text-white border-slate-800"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isCurrentLessonDone
                      ? "O'zlashtirildi (Shared Progress)"
                      : "Tugatildi deb belgilash"}
                  </span>
                </button>
              </div>

              {/* Canonical Match Notice (if overlapping with an existing AI Atlas lesson) */}
              {currentLesson.canonicalMatch.existingLessonId && (
                <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/40 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5 text-xs">
                    <div className="font-bold text-violet-300 flex items-center gap-1.5">
                      <GitMerge className="w-4 h-4" />
                      <span>
                        Kanonik Ekvivalent Topildi:{" "}
                        <code className="font-mono text-white">
                          {currentLesson.canonicalMatch.existingLessonId}
                        </code>{" "}
                        ({currentLesson.canonicalMatch.status})
                      </span>
                    </div>
                    <p className="text-slate-300">
                      {currentLesson.canonicalMatch.rationaleUz} — Progress
                      ushbu kanonik ID bilan umumiy saqlanadi.
                    </p>
                  </div>
                  <Link
                    href={
                      currentLesson.canonicalMatch.existingTrack === "mdx-core"
                        ? `/learn/${currentLesson.canonicalMatch.existingLessonId}`
                        : `/roadmap?tab=${currentLesson.canonicalMatch.existingTrack}&lesson=${currentLesson.canonicalMatch.existingLessonId}`
                    }
                    className="px-3.5 py-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Kanonik Darsni Ochish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* =========================================================== */}
              {/* CASE A: PUBLISHED LESSON (Full 9-Step Actionable Flow)      */}
              {/* =========================================================== */}
              {currentLesson.publishStatus === "published" &&
                currentLesson.publishedContent && (
                  <div className="space-y-8">
                    {/* 1. Why It Matters & Learning Objective */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-xs font-bold uppercase text-cyan-400">
                          Nega Bu Muhim? (Why It Matters)
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {currentLesson.publishedContent.whyItMattersUz}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-xs font-bold uppercase text-amber-400">
                          O‘quv Maqsadi & Atomik Konsept
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {currentLesson.publishedContent.atomicConceptUz}
                        </p>
                        <div className="text-[11px] text-slate-400 pt-1">
                          <strong>Talab etiladigan bilimlar:</strong>{" "}
                          {currentLesson.publishedContent.prerequisitesUz.join(
                            " • "
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 2. Three Learning Depths (Overview -> Understand -> Master) */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                          <Layers className="w-4 h-4 text-cyan-400" />
                          <span>
                            1. Nazariya (3 Chuqurlik Darajasi: Overview →
                            Understand → Master)
                          </span>
                        </h4>
                        <div className="flex gap-1.5">
                          {(
                            [
                              { id: "overview", label: "1. Overview" },
                              { id: "understand", label: "2. Understand" },
                              { id: "master", label: "3. Master" },
                            ] as const
                          ).map((d) => {
                            const depthDone = isDepthCompleted(
                              canonicalLessonId,
                              d.id
                            );
                            return (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => setActiveDepth(d.id)}
                                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                  activeDepth === d.id
                                    ? "bg-cyan-500 text-slate-950 border-cyan-400"
                                    : "bg-slate-950 text-slate-400 hover:text-white border-slate-800"
                                }`}
                              >
                                {depthDone && (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                )}
                                <span>{d.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {(() => {
                        const depthObj =
                          currentLesson.publishedContent.depths[activeDepth];
                        return (
                          <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="text-base font-bold text-cyan-300">
                                {depthObj.titleUz}
                              </h5>
                              <button
                                type="button"
                                onClick={() =>
                                  setDepthCompleted(
                                    canonicalLessonId,
                                    activeDepth,
                                    !isDepthCompleted(
                                      canonicalLessonId,
                                      activeDepth
                                    )
                                  )
                                }
                                className="text-xs text-slate-400 hover:text-emerald-300 cursor-pointer"
                              >
                                {isDepthCompleted(
                                  canonicalLessonId,
                                  activeDepth
                                )
                                  ? "✓ Ushbu daraja o'qildi"
                                  : "Darajani o'qildi deb belgilash"}
                              </button>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                              {depthObj.bodyUz}
                            </p>
                            {depthObj.keyFormulaOrRule && (
                              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-200">
                                {depthObj.keyFormulaOrRule}
                              </div>
                            )}
                            {depthObj.codeOrTrace && (
                              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto">
                                {depthObj.codeOrTrace}
                              </pre>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* 3. Example 1 & Example 2 */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                        <span>
                          2. Namuna Misollar (Example 1 & Example 2 — Kirish,
                          Kod va Chiqish)
                        </span>
                      </h4>

                      <div className="grid grid-cols-1 gap-4">
                        {[
                          currentLesson.publishedContent.example1,
                          currentLesson.publishedContent.example2,
                        ].map((ex, idx) => (
                          <div
                            key={ex.id}
                            className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h5 className="text-sm sm:text-base font-bold text-emerald-300">
                                {ex.titleUz}
                              </h5>
                              <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-xs">
                                Example {idx + 1}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-300">
                              {ex.explanationUz}
                            </p>
                            {ex.input && (
                              <div className="text-xs font-mono text-slate-400">
                                <strong>Kirish (Input):</strong> {ex.input}
                              </div>
                            )}
                            <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-200 overflow-x-auto">
                              <code>{ex.code}</code>
                            </pre>
                            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-mono">
                              <span className="text-slate-400 block mb-1">
                                Kutilgan Chiqish (Output):
                              </span>
                              <pre className="text-amber-200 whitespace-pre-wrap">
                                {ex.expectedOutput}
                              </pre>
                            </div>
                            {ex.walkthrough && ex.walkthrough.length > 0 && (
                              <ul className="space-y-1 text-xs text-slate-300">
                                {ex.walkthrough.map((w, wIdx) => (
                                  <li key={wIdx}>• {w}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Interactive Visualization (React Lab + Honest Manim Script Reference) */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-cyan-400" />
                        <span>
                          3. Interaktiv Vizualizatsiya (React Lab & Manim Sahna
                          Kodi)
                        </span>
                      </h4>

                      <TokenPaddingLab />

                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="font-bold text-slate-200 flex items-center gap-1.5">
                            <Film className="w-4 h-4 text-violet-400" />
                            <span>
                              Manim Matematik Sahna Skripti:{" "}
                              <code className="text-violet-300 font-mono">
                                {
                                  currentLesson.publishedContent.manimMeta
                                    .scriptPath
                                }
                              </code>
                            </span>
                          </div>
                          <p className="text-slate-400">
                            {
                              currentLesson.publishedContent.manimMeta
                                .conceptNoteUz
                            }
                          </p>
                        </div>
                        <code className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[11px] shrink-0">
                          {
                            currentLesson.publishedContent.manimMeta
                              .renderCommand
                          }
                        </code>
                      </div>
                    </div>

                    {/* 5. Coding Practice -> Run Code -> Automated Tests -> Feedback */}
                    <div className="space-y-4 pt-2 border-t border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span>
                            4. Mustaqil Kod Yozish Amaliyoti & Avtomatlashtirilgan
                            Testlar
                          </span>
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                          Safe Python Sandbox / Pyodide
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <h5 className="text-sm font-bold text-white">
                          {currentLesson.publishedContent.exercise.titleUz}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                          {
                            currentLesson.publishedContent.exercise
                              .instructionsUz
                          }
                        </p>
                      </div>

                      <PythonCodeEditor
                        value={studentCode}
                        onChange={setStudentCode}
                        onRun={handleRunPracticeCode}
                        onReset={() => {
                          setStudentCode(
                            currentLesson.publishedContent!.exercise.starterCode
                          );
                          setRunStdout("");
                          setRunError("");
                          setTestResults([]);
                          setAllTestsPassed(null);
                        }}
                        isRunning={isRunning}
                        output={runStdout}
                        error={runError}
                        minHeight="280px"
                      />

                      {/* Progressive Hints */}
                      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4" />
                            <span>
                              Progressiv Maslahatlar ({revealedHintsCount} /{" "}
                              {
                                currentLesson.publishedContent.exercise.hintsUz
                                  .length
                              }
                              )
                            </span>
                          </span>
                          {revealedHintsCount <
                            currentLesson.publishedContent.exercise.hintsUz
                              .length && (
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedHintsCount((c) => c + 1)
                              }
                              className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-bold cursor-pointer"
                            >
                              Keyingi maslahatni ochish (+1)
                            </button>
                          )}
                        </div>
                        {revealedHintsCount > 0 && (
                          <ul className="space-y-1.5 text-xs text-amber-100">
                            {currentLesson.publishedContent.exercise.hintsUz
                              .slice(0, revealedHintsCount)
                              .map((h, i) => (
                                <li
                                  key={i}
                                  className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30"
                                >
                                  {h}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>

                      {/* Automated Test Results & Uzbek Feedback */}
                      {testResults.length > 0 && (
                        <div
                          data-testid="hf-practice-test-results"
                          className={`p-5 rounded-2xl border space-y-3 ${
                            allTestsPassed
                              ? "bg-emerald-950/25 border-emerald-500/40"
                              : "bg-rose-950/20 border-rose-500/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h5
                              className={`text-sm font-extrabold flex items-center gap-2 ${
                                allTestsPassed
                                  ? "text-emerald-300"
                                  : "text-rose-300"
                              }`}
                            >
                              {allTestsPassed ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                              <span>
                                {allTestsPassed
                                  ? "Barcha Avtomatlashtirilgan Testlar Muvaffaqiyatli O'tdi! 🎉"
                                  : "Ba'zi Testlar O'tmadi — Xatolar Tahlili (Feedback):"}
                              </span>
                            </h5>
                            <span className="text-xs font-mono text-slate-300">
                              {testResults.filter((t) => t.passed).length} /{" "}
                              {testResults.length} PASS
                            </span>
                          </div>

                          <div className="space-y-2">
                            {testResults.map((tr) => (
                              <div
                                key={tr.id}
                                className={`p-3 rounded-xl border text-xs flex flex-col gap-1 ${
                                  tr.passed
                                    ? "bg-slate-950/80 border-emerald-500/30 text-emerald-200"
                                    : "bg-slate-950/90 border-rose-500/40 text-rose-200"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold">
                                    {tr.passed ? "✓ PASS:" : "✗ FAIL:"}{" "}
                                    {tr.descriptionUz}
                                  </span>
                                  <span className="font-mono text-[11px] text-slate-400">
                                    {tr.durationMs ?? 5} ms
                                  </span>
                                </div>
                                {!tr.passed && (
                                  <div className="text-amber-200 mt-1">
                                    <strong>Nega xato berdi:</strong>{" "}
                                    {tr.errorMessage ||
                                      "Funksiya qaytargan qiymat kutilgan (input_ids, attention_mask) natijaga mos kelmadi yoki chegaraviy holatda ValueError ko'tarilmadi. Maslahatlarni ochib qayta urinib ko'ring."}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 6. Original Checkpoint Quiz */}
                    {currentLesson.publishedContent.quiz.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-slate-800">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-cyan-400" />
                          <span>5. Nazorat Savollari (Checkpoint Quiz)</span>
                        </h4>

                        {currentLesson.publishedContent.quiz.map((q) => {
                          const chosen = quizAnswers[q.id];
                          return (
                            <div
                              key={q.id}
                              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5"
                            >
                              <div className="text-xs sm:text-sm font-bold text-white">
                                {q.promptUz}
                              </div>
                              <div className="space-y-1.5">
                                {getShuffledQuizOptions(
                                  q.id,
                                  q.options,
                                  q.correctIndex
                                ).map((opt) => {
                                  const isChosen = chosen === opt.originalIndex;
                                  let style =
                                    "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                                  if (chosen !== undefined) {
                                    if (opt.isCorrect) {
                                      style =
                                        "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-bold";
                                    } else if (isChosen) {
                                      style =
                                        "bg-rose-950/80 border-rose-500 text-rose-100";
                                    }
                                  }
                                  return (
                                    <button
                                      key={opt.originalIndex}
                                      type="button"
                                      onClick={() =>
                                        setQuizAnswers((p) => ({
                                          ...p,
                                          [q.id]: opt.originalIndex,
                                        }))
                                      }
                                      className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${style}`}
                                    >
                                      <span>{opt.text}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              {chosen !== undefined && (
                                <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-200">
                                  <strong>Izoh: </strong>
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

              {/* =========================================================== */}
              {/* CASE B: PLANNED LESSON (Honest Planned Syllabus View)       */}
              {/* =========================================================== */}
              {currentLesson.publishStatus === "planned" && (
                <div
                  data-testid="hf-planned-lesson-notice"
                  className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <h4 className="text-base font-extrabold text-amber-300">
                        Rejalashtirilgan Mikro-Dars (Planned Syllabus Node)
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        AI Atlas nashr siyosatiga ko‘ra, rejalashtirilgan
                        syllabus tugunlari to‘liq 2 ta misol, interaktiv
                        laboratoriya va avtomatlashtirilgan testlar bilan
                        tekshirilmaguncha tayyor dars sifatida ko‘rsatilmaydi.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                    <div>
                      <strong className="text-white">
                        Rejalashtirilgan O‘quv Maqsadi:
                      </strong>{" "}
                      {currentLesson.objective}
                    </div>
                    <div>
                      <strong className="text-white">
                        Manba Bo‘limi (Ch.{currentLesson.chapterNumber}):
                      </strong>{" "}
                      {currentLesson.sourceSection}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={currentLesson.sourceAttribution.chapterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                    >
                      <span>
                        Rasmiy Hugging Face Bobini O‘qish (Ch.
                        {currentLesson.chapterNumber})
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => selectLesson("hf-02-05-01")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>
                        Tayyor Tokenizer & Padding Darsiga O‘tish (hf-02-05-01)
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* CASE C: UNAVAILABLE FUTURE MATERIAL (hf-12-08-01)           */}
              {/* =========================================================== */}
              {currentLesson.publishStatus === "unavailable" && (
                <div
                  data-testid="hf-unavailable-lesson-notice"
                  className="p-6 rounded-2xl bg-rose-950/25 border border-rose-500/40 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-rose-300">
                        Kelajakdagi Material: Rasmiy Manbada Hali Mavjud Emas
                        (Unavailable)
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Hugging Face LLM Course 12-bobidagi ushbu bo‘lim (
                        <code>Coming soon...</code>) rasmiy manbada hali e’lon
                        qilinmagan. AI Atlas yolg‘on yoki to‘qima material
                        yaratmaydi.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer: Prev / Next Lesson & Apache-2.0 Source Attribution */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {currentLesson.prevLessonId ? (
                    <button
                      type="button"
                      onClick={() => selectLesson(currentLesson.prevLessonId!)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Oldingi: {currentLesson.prevLessonId}</span>
                    </button>
                  ) : (
                    <span />
                  )}

                  {currentLesson.nextLessonId && (
                    <button
                      type="button"
                      onClick={() => selectLesson(currentLesson.nextLessonId!)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      <span>
                        Keyingi Dars ({currentLesson.nextLessonId})
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Source Attribution Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    📜{" "}
                    <strong>
                      Attribution ({currentLesson.sourceAttribution.license}):
                    </strong>{" "}
                    {currentLesson.sourceAttribution.adaptationNoticeUz}{" "}
                    (Tekshirilgan sana:{" "}
                    {currentLesson.sourceAttribution.verifiedDate})
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={currentLesson.sourceAttribution.chapterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>HF Chapter {currentLesson.chapterNumber}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={currentLesson.sourceAttribution.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Apache-2.0 License</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 2: CANONICAL LESSON EQUIVALENCE MAPPINGS                       */}
      {/* =================================================================== */}
      {viewTab === "canonical_map" && (
        <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Kanonik Darslar Ekvivalentlik Xaritasi (Shared Progress
              Reconciliation)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Takroriy darslar yaratmaslik uchun Hugging Face kursining{" "}
              {auditReport.canonicalLinkedCount} ta tuguni o‘quv natijasi
              (learning-outcome) bo‘yicha mavjud AI Atlas kanonik darslariga
              bog‘langan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase">
                  <th className="py-2.5 px-3">HF Lesson ID</th>
                  <th className="py-2.5 px-3">HF Mavzu</th>
                  <th className="py-2.5 px-3">Kanonik AI Atlas ID</th>
                  <th className="py-2.5 px-3">Mavjud Track</th>
                  <th className="py-2.5 px-3">Asos (Rationale)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {ALL_HF_MICRO_LESSONS.filter(
                  (l) => l.canonicalMatch.existingLessonId !== null
                ).map((l) => (
                  <tr key={l.id} className="hover:bg-slate-950/60">
                    <td className="py-2.5 px-3 font-mono text-amber-300 font-bold">
                      <button
                        type="button"
                        onClick={() => selectLesson(l.id)}
                        className="hover:underline cursor-pointer"
                      >
                        {l.id}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-white font-semibold">
                      {l.title}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold">
                      {l.canonicalMatch.existingLessonId}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {l.canonicalMatch.existingTrack}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {l.canonicalMatch.rationaleUz}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 3: IMPORT AUDIT REPORT & APACHE-2.0 ATTRIBUTION                */}
      {/* =================================================================== */}
      {viewTab === "audit_report" && (
        <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white">
              Hugging Face LLM Course — Import Audit Hisoboti & Litsenziya
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Idempotent import tekshiruvi: mavjud foydalanuvchi progressi va 6
              ta kasbiy yo‘nalish buzilmagan.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Mavjud Kasbiy Yo'nalishlar",
                val: `${auditReport.existingCareerTracksCount} ta (7-track yo'q)`,
              },
              {
                label: "Kurs Boblari & Bo'limlar",
                val: `${auditReport.sourceChaptersCount} bob / ${auditReport.outlineSectionsCount} bo'lim`,
              },
              {
                label: "Jami Import Qilingan Tugunlar",
                val: `${auditReport.totalMicroLessonsCount} ta mikro-dars`,
              },
              {
                label: "Published / Planned / Unavailable",
                val: `${auditReport.publishedLessonsCount} / ${auditReport.plannedLessonsCount} / ${auditReport.unavailableLessonsCount}`,
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1"
              >
                <div className="text-[11px] text-slate-400 uppercase font-bold">
                  {stat.label}
                </div>
                <div className="text-base font-extrabold text-cyan-300 font-mono">
                  {stat.val}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
            <div className="font-bold text-white">
              Apache-2.0 Litsenziya va Mualliflik Huquqi Bayonoti:
            </div>
            <p>
              Ushbu o‘quv moduli strukturasi{" "}
              <a
                href={auditReport.officialCourseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline"
              >
                Hugging Face LLM Course
              </a>{" "}
              (Apache-2.0 litsenziyasi:{" "}
              <a
                href={auditReport.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 underline"
              >
                github.com/huggingface/course/blob/main/LICENSE
              </a>
              ) asosida tuzilgan. Barcha o‘zbekcha tushuntirishlar, interaktiv
              React simulyatorlari, Manim sahna kodlari va original test
              savollari AI Atlas platformasi uchun maxsus yozilgan. Hugging Face
              AI Atlas platformasini rasman tasdiqlamaydi (no endorsement
              implied).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
