"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  INTENSIVE_12_WEEKS,
  PORTFOLIO_PROJECTS,
  CURRICULUM_55_SOURCES,
  ORIGINAL_9_GAP_MATERIALS,
  type IntensiveLessonItem,
  type IntensiveWeekItem,
} from "@/lib/curriculum/ds-ml-ai-12weeks";
import { PythonCodeEditor } from "@/components/practice/PythonCodeEditor";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  FileCode,
  FolderGit2,
  HelpCircle,
  Layers,
  Lightbulb,
  Play,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
} from "lucide-react";

export function Intensive12WeeksExplorer() {
  const [activeTab, setActiveTab] = useState<"curriculum" | "portfolios" | "gaps" | "sources">("curriculum");
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("D01.1");
  const [sourceSearch, setSourceSearch] = useState<string>("");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const [userCode, setUserCode] = useState<string>("");
  const [editorOutput, setEditorOutput] = useState<string>("");
  const [editorError, setEditorError] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const currentWeek = useMemo(() => {
    return INTENSIVE_12_WEEKS.find((w) => w.weekNumber === selectedWeekNum) ?? INTENSIVE_12_WEEKS[0]!;
  }, [selectedWeekNum]);

  const currentLesson = useMemo(() => {
    return currentWeek.lessons.find((l) => l.id === selectedLessonId) ?? currentWeek.lessons[0]!;
  }, [currentWeek, selectedLessonId]);

  React.useEffect(() => {
    setUserCode(currentLesson.codeSnippet);
    setEditorOutput("");
    setEditorError("");
  }, [currentLesson.id, currentLesson.codeSnippet]);

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
        setEditorOutput(data.stdout || "Dastur muvaffaqiyatli bajarildi (hech narsa chop etilmadi).");
      } else {
        setEditorError(data.error || "Xatolik yuz berdi");
      }
    } catch (err: unknown) {
      setEditorError(err instanceof Error ? err.message : "Serverga ulanishda xatolik");
    } finally {
      setIsExecuting(false);
    }
  };

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
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Atlas 12-Haftalik Intensiv Dastur</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            42 Dars • 55 Manba • 3 Portfolio • 16GB RAM Tayyor
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Data Science & ML-AI Engineering Akademiyasi
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Noldan boshlab production-ready AI tizimlarigacha: uv, Polars, DuckDB, klassik ML, PyTorch,
            Transformer, Ollama (16GB CPU), Gibrid RAG, FastAPI, Docker Compose, Langfuse va Capstone.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
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
            <span>12 Haftalik Reja & Darslar</span>
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
            <span>3 ta Portfolio Loyihasi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gaps")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "gaps"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>9 ta Original Laboratoriya</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sources")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "sources"
                ? "bg-violet-500 text-slate-950 shadow-lg shadow-violet-950/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>55 ta Manbalar Katalogi</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Curriculum & Lessons */}
      {activeTab === "curriculum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Week Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Haftani Tanlang (1–12)
            </div>
            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {INTENSIVE_12_WEEKS.map((w) => {
                const isSelected = selectedWeekNum === w.weekNumber;
                return (
                  <button
                    key={w.weekNumber}
                    type="button"
                    onClick={() => {
                      setSelectedWeekNum(w.weekNumber);
                      setSelectedLessonId(w.lessons[0]!.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-cyan-950/40 border-cyan-500 text-white shadow-md shadow-cyan-950/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {w.weekNumber}-Hafta
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                        {w.lessons.length} ta dars
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-1">
                      {w.titleUz}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lesson Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Week Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  {currentWeek.weekNumber}-Hafta Fokus & Natija
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Amaliy Natija</span>
                </span>
              </div>
              <h2 className="text-lg font-bold text-white">{currentWeek.titleUz}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                🎯 <strong>Fokus:</strong> {currentWeek.focusUz}
              </p>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                📦 <strong>Haftani yopadigan topshiriq:</strong> {currentWeek.deliverableUz}
              </div>

              {/* Lesson Pills */}
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

            {/* Active Lesson Deep Dive */}
            <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                    {currentLesson.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {currentLesson.titleUz}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <span>Manbalar:</span>
                  {currentLesson.sourceIds.map((sid) => (
                    <span key={sid} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                      {sid}
                    </span>
                  ))}
                </div>
              </div>

              {/* Theory */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Nazariy Asos va Tahlil</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {currentLesson.theoryUz}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Asosiy Qoidalar (Takeaways)</span>
                </h4>
                <ul className="space-y-1.5">
                  {currentLesson.keyTakeawaysUz.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-amber-400 font-bold shrink-0">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet & Interactive Python Editor */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Namunaviy Kod & Interaktiv Sinov (Python 3.12)</span>
                </h4>
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
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Bilimni Tekshirish (Tasodifiy Tartiblangan Tanlovlar)</span>
                  </div>

                  {currentLesson.quiz.map((q) => {
                    const chosen = quizAnswers[q.id];
                    return (
                      <div key={q.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="text-xs sm:text-sm font-semibold text-slate-100">
                          {q.promptUz}
                        </div>
                        <div className="space-y-2">
                          {getShuffledQuizOptions(q.id, q.options, q.correctIndex).map((opt) => {
                            const isChosen = chosen === opt.originalIndex;
                            const isCorrect = opt.isCorrect;
                            let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                            if (chosen !== undefined) {
                              if (isCorrect) {
                                btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold";
                              } else if (isChosen) {
                                btnStyle = "bg-rose-950/80 border-rose-500 text-rose-100";
                              }
                            }
                            return (
                              <button
                                key={opt.originalIndex}
                                type="button"
                                onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.originalIndex }))}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt.text}</span>
                                {chosen !== undefined && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                              </button>
                            );
                          })}
                        </div>
                        {chosen !== undefined && (
                          <div className={`p-3 rounded-xl text-xs ${chosen === q.correctIndex ? "bg-emerald-950/40 text-emerald-200 border border-emerald-500/30" : "bg-amber-950/40 text-amber-200 border border-amber-500/30"}`}>
                            <strong>{chosen === q.correctIndex ? "To'g'ri! 🎉 " : "Qayta o'ylab ko'ring: "}</strong>
                            {q.explanationUz}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 3 Portfolio Projects */}
      {activeTab === "portfolios" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                      {proj.weekSpan}
                    </span>
                    <span className="text-xs font-mono text-slate-500">Portfolio #{idx + 1}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">{proj.titleUz}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{proj.goalUz}</p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Texnologiyalar:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[11px] border border-slate-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Natijaviy Artefaktlar:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {proj.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-bold text-slate-200">Baholash mezoni:</div>
                  {proj.evaluationCriteria.map((c, cIdx) => (
                    <div key={cIdx}>• {c}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 9 Original Gap Labs */}
      {activeTab === "gaps" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ORIGINAL_9_GAP_MATERIALS.map((gap, idx) => (
            <div
              key={gap.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold">
                  Lab #{idx + 1} • {gap.lessonId}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{gap.id}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{gap.titleUz}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{gap.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: 55 Sources Catalog */}
      {activeTab === "sources" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              <input
                type="text"
                placeholder="Manbalar orasidan qidiring (masalan: M01, PyTorch, Ragas, MIT)..."
                value={sourceSearch}
                onChange={(e) => setSourceSearch(e.target.value)}
                className="bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none w-64 sm:w-80"
              />
            </div>
            <span className="text-xs font-mono text-slate-400">
              Jami: {filteredSources.length} ta manba
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 font-mono text-xs font-bold border border-cyan-800/40">
                      {s.id}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {s.license}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{s.name}</h4>
                  <div className="text-xs text-slate-400">Muallif: <strong className="text-slate-200">{s.author}</strong> ({s.lang})</div>
                  <p className="text-xs text-slate-300">{s.role}</p>
                </div>
                <div className="pt-2">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>Asl manbani ochish</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
