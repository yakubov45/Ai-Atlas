"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Cpu,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  BookOpen,
  HelpCircle,
  Sparkles,
  Link2,
  Play,
  RotateCcw,
  Search,
  AlertTriangle,
  FlaskConical,
  Award,
  Layers,
} from "lucide-react";
import {
  MACHINE_LEARNING_PHASES,
  getMlPhaseById,
  getMlLessonById,
  type MlPhase,
} from "@/lib/curriculum/machine-learning";
import type { MlDs520LessonItem } from "@/lib/curriculum/ml-ds-520-dataset";
import { useLearning } from "@/hooks/use-learning";
import { RegressionExplorerLab } from "@/components/visualizations/RegressionExplorerLab";
import { runPythonCode } from "@/lib/runner/python-runner";

export interface MachineLearningExplorerProps {
  initialLessonId?: string;
  initialPhaseId?: string;
  initialStep?: "theory" | "examples" | "quiz" | "practice";
}

export function MachineLearningExplorer({
  initialLessonId = "mlds-17-08",
  initialPhaseId = "mle-08",
  initialStep = "theory",
}: MachineLearningExplorerProps) {
  const { isMicroLessonCompleted, toggleMicroLessonCompleted } = useLearning();

  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(initialPhaseId);
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [lessonStep, setLessonStep] = useState<"theory" | "examples" | "quiz" | "practice">(initialStep);
  const [showVisualLab, setShowVisualLab] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Active Phase
  const activePhase = useMemo<MlPhase>(() => {
    return getMlPhaseById(selectedPhaseId) ?? MACHINE_LEARNING_PHASES[7]!; // fallback mle-08
  }, [selectedPhaseId]);

  // Active Lesson
  const activeLesson = useMemo<MlDs520LessonItem>(() => {
    const found = activePhase.lessons.find((l) => l.id === activeLessonId);
    if (found) return found;
    return activePhase.lessons[0] ?? MACHINE_LEARNING_PHASES[7]!.lessons[7]!;
  }, [activePhase, activeLessonId]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Practice state
  const [userCode, setUserCode] = useState<string>("");
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [practicePassed, setPracticePassed] = useState<boolean>(false);

  // Sync userCode when active lesson changes
  useEffect(() => {
    const starter = activeLesson.practiceTasks?.[0]?.starterCode ||
      `# ${activeLesson.title}\n# Quyida amaliy yechimni yozing:\n\ndef solution():\n    pass\n\nprint("Natija:", solution())`;
    setUserCode(starter);
    setCodeOutput("");
    setPracticePassed(false);
  }, [activeLesson]);

  // URL sync
  const syncUrl = (lessonId: string, phaseId: string, step: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "ml-engineer");
    url.searchParams.set("phase", phaseId);
    url.searchParams.set("lesson", lessonId);
    url.searchParams.set("step", step);
    window.history.replaceState(null, "", url.toString());
  };

  const handleShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "ml-engineer");
    url.searchParams.set("phase", selectedPhaseId);
    url.searchParams.set("lesson", activeLessonId);
    url.searchParams.set("step", lessonStep);
    navigator.clipboard?.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleSelectPhase = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    const targetPhase = getMlPhaseById(phaseId);
    if (targetPhase && targetPhase.lessons.length > 0) {
      const firstLesson = targetPhase.lessons[0]!.id;
      setActiveLessonId(firstLesson);
      syncUrl(firstLesson, phaseId, lessonStep);
    }
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    syncUrl(lessonId, selectedPhaseId, lessonStep);
  };

  const handleSetLessonStep = (step: "theory" | "examples" | "quiz" | "practice") => {
    setLessonStep(step);
    syncUrl(activeLessonId, selectedPhaseId, step);
  };

  // Run student code using Pyodide
  const handleRunCode = async () => {
    setIsExecuting(true);
    setCodeOutput("Pyodide dvigateli ishga tushirilmoqda...");
    try {
      const testCode = activeLesson.practiceTasks?.[0]?.testCode || "";
      const fullScript = `${userCode}\n\n${testCode}`;
      const res = await runPythonCode(fullScript);
      if (res.success) {
        setCodeOutput(res.stdout || "Dastur muvaffaqiyatli bajarildi (Chiqish bo‘sh).");
        setPracticePassed(true);
      } else {
        setCodeOutput(`Xatolik yuz berdi:\n${res.stderr || res.stdout}`);
        setPracticePassed(false);
      }
    } catch (err: unknown) {
      setCodeOutput(`Bajarishda xatolik: ${err instanceof Error ? err.message : String(err)}`);
      setPracticePassed(false);
    } finally {
      setIsExecuting(false);
    }
  };

  const completedCount = useMemo(() => {
    let count = 0;
    for (const p of MACHINE_LEARNING_PHASES) {
      for (const l of p.lessons) {
        if (isMicroLessonCompleted(l.id)) count++;
      }
    }
    return count;
  }, [isMicroLessonCompleted]);

  return (
    <div className="space-y-6">
      {/* Track Flagship Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/40 border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mustaqil Yo‘nalish: Machine Learning Engineering (22 ta Faza • 466 ta Dars)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Machine Learning Engineering Akademiyasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Model o‘qitish, baholash, xatoliklar tahlili, optimallashtirish, neyron tarmoqlar
              va ishlab chiqarish (MLOps) arxitekturasi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[110px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">O‘zlashtirildi</div>
              <div className="text-xl font-black text-emerald-400 font-mono">
                {completedCount} <span className="text-xs text-slate-500 font-normal">/ 466</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShareLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-md"
              title="Havolani nusxalash"
            >
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span>{copiedLink ? "Havola nusxalandi! 🔗" : "Ulashish"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 22 Phases Horizontal Navigator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>O‘quv Fazalari (mle-01 .. mle-22):</span>
          <span>{MACHINE_LEARNING_PHASES.length} ta faza mavjud</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          {MACHINE_LEARNING_PHASES.map((p) => {
            const isSelected = p.id === selectedPhaseId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPhase(p.id)}
                className={`px-3 py-2 rounded-xl text-left border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-950/80 border-emerald-400 text-white shadow-lg"
                    : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-emerald-400">{p.id}</div>
                <div className="text-xs font-semibold whitespace-nowrap line-clamp-1 max-w-[140px]">
                  {p.titleUz}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Card & Mini-Project */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="text-xs font-mono text-emerald-400">
              {activePhase.id} • {activePhase.level.toUpperCase()} • {activePhase.lessonCount} ta dars
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{activePhase.titleUz}</h2>
            <p className="text-xs text-slate-300">{activePhase.outcomeUz}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowVisualLab(!showVisualLab)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showVisualLab ? "Laboratoriyani yopish" : "Vizual Laboratoriyani ochish"}</span>
            </button>
          </div>
        </div>

        {/* Phase Mini-Project Box */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Faza Mini-Loyihasi: {activePhase.miniProject.titleUz}</span>
            </div>
            <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
              {activePhase.miniProject.requirementsUz.slice(0, 3).map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
          <div className="text-[11px] font-mono text-slate-400 shrink-0 border-l border-emerald-500/20 pl-3">
            Qoidasi: {activePhase.miniProject.completionRule}
          </div>
        </div>

        {/* Visual Lab Section (For mle-08, renders RegressionExplorerLab!) */}
        {showVisualLab && (
          <div className="pt-2">
            {activePhase.id === "mle-08" ? (
              <RegressionExplorerLab />
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4" />
                  <span>Vizual Laboratoriya Spetsifikatsiyasi: {activePhase.visualLab.titleUz}</span>
                </div>
                <div className="text-slate-400">
                  Kirish talablari: {activePhase.visualLab.inputRequirements.join("; ")}
                </div>
                <div className="text-slate-400">
                  Natijaviy talablar: {activePhase.visualLab.outputRequirements.join("; ")}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lesson Selection Pills for this Phase */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-slate-400">
          Ushbu fazadagi mikro-darslar ({activePhase.lessons.length} ta):
        </div>
        <div className="flex flex-wrap gap-2">
          {activePhase.lessons.map((lesson) => {
            const isSelected = lesson.id === activeLesson.id;
            const isDone = isMicroLessonCompleted(lesson.id);
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => handleSelectLesson(lesson.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md"
                    : isDone
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="font-mono text-[10px] opacity-80">{lesson.id}</span>
                <span>{lesson.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Lesson View with 4 Sequential Steps */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
        {/* Lesson Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>{activeLesson.id}</span>
              <span>•</span>
              <span className="text-slate-400">{activePhase.titleUz}</span>
              {activeLesson.status === "published" && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Published
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{activeLesson.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300">{activeLesson.learningObjectiveUz}</p>
          </div>

          <button
            type="button"
            onClick={() => toggleMicroLessonCompleted(activeLesson.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shrink-0 ${
              isMicroLessonCompleted(activeLesson.id)
                ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                : "bg-slate-900 text-slate-200 border border-slate-700 hover:border-emerald-500"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMicroLessonCompleted(activeLesson.id) ? "Tugatildi ✓" : "Darsni tugatish"}</span>
          </button>
        </div>

        {/* 4 Step Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "theory" as const, label: "1. Nazariya", icon: BookOpen },
            { id: "examples" as const, label: "2. Misollar (2 ta)", icon: Code2 },
            { id: "quiz" as const, label: "3. Test (3 ta)", icon: HelpCircle },
            { id: "practice" as const, label: "4. Amaliy Kod", icon: Play },
          ].map((step) => {
            const isActive = lessonStep === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleSetLessonStep(step.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Step 1: Nazariya */}
        {lessonStep === "theory" && (
          <div className="space-y-4 pt-2">
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              {activeLesson.theoryUz}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => handleSetLessonStep("examples")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>2. Namunaviy Misollarni ko‘rish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Misollar */}
        {lessonStep === "examples" && (
          <div className="space-y-4 pt-2">
            {activeLesson.examples.map((ex, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-300 font-mono">
                  {ex.titleUz || `${idx + 1}-Namunaviy Misol`}
                </div>
                {ex.explanationUz && (
                  <p className="text-xs text-slate-300">{ex.explanationUz}</p>
                )}
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-200 overflow-x-auto">
                  {ex.code}
                </pre>
                {ex.expectedOutput && (
                  <div className="text-[11px] font-mono text-slate-400">
                    Kutilayotgan natija: <code className="text-amber-300">{ex.expectedOutput}</code>
                  </div>
                )}
              </div>
            ))}

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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>3. Testga o‘tish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Test */}
        {lessonStep === "quiz" && (
          <div className="space-y-4 pt-2">
            {activeLesson.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id];
              const isChecked = quizSubmitted[q.id];
              return (
                <div key={q.id || qIdx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-200">
                    {qIdx + 1}. {q.promptUz}
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let optClass = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                      if (isChecked) {
                        if (isCorrect) optClass = "bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold";
                        else if (isChosen) optClass = "bg-rose-950/80 border-rose-500 text-rose-200";
                      } else if (isChosen) {
                        optClass = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                      }
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => {
                            if (!isChecked) {
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                            }
                          }}
                          className={`w-full p-2.5 rounded-xl text-left text-xs border transition-all cursor-pointer flex items-center justify-between ${optClass}`}
                        >
                          <span>{opt}</span>
                          {isChecked && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {!isChecked && selectedOpt !== undefined && (
                    <button
                      type="button"
                      onClick={() => setQuizSubmitted((prev) => ({ ...prev, [q.id]: true }))}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      Javobni tekshirish
                    </button>
                  )}

                  {isChecked && q.explanationUz && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                      <strong>Izoh:</strong> {q.explanationUz}
                    </div>
                  )}
                </div>
              );
            })}

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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>4. Amaliy Kod Yozishga o‘tish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Amaliy Kod Yozish */}
        {lessonStep === "practice" && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Mustaqil Dasturlash Topshirig‘i (Pyodide):</span>
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isExecuting ? "Bajarilmoqda..." : "Kodni Ishga Tushirish"}</span>
                </button>
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={10}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {codeOutput && (
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Terminal Chiqishi (Stdout):</div>
                <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap">{codeOutput}</pre>
                {practicePassed && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold pt-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Barcha testlardan muvaffaqiyatli o‘tdi!</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleSetLessonStep("quiz")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>3. Testga qaytish</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
