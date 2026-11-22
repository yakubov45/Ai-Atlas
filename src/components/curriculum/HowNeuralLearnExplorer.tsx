"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  HOW_NEURAL_LEARN_FEATURED_VIDEO,
  HOW_NEURAL_LEARN_LESSONS,
  getNeuralLearnLessonById,
} from "@/lib/curriculum/how-neural-learn";
import { ColoredTermsLegend, ColoredTermText } from "@/components/curriculum/ColoredTermText";
import { HowNeuralLearnVisuals } from "@/components/visualizations/HowNeuralLearnVisuals";
import { MathBlock } from "@/components/mdx/MathBlock";
import { PracticeLab } from "@/components/practice/PracticeLab";
import { KnowledgeRelationshipsButton } from "@/components/lessons/KnowledgeRelationshipsPanel";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import { useLearning } from "@/hooks/use-learning";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  ExternalLink,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  Palette,
  Play,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

type FocusTab = "all" | "theory" | "visual" | "math-code" | "practice";

export interface HowNeuralLearnExplorerProps {
  initialLessonId?: string;
}

export function HowNeuralLearnExplorer({
  initialLessonId = "nn-01-neuron-weight-bias",
}: HowNeuralLearnExplorerProps) {
  const {
    isMicroLessonCompleted,
    toggleMicroLessonCompleted,
    setMicroLessonCompleted,
  } = useLearning();

  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [outlineOpen, setOutlineOpen] = useState<boolean>(false);
  const [showTermsLegend, setShowTermsLegend] = useState<boolean>(false);
  const [videoOpen, setVideoOpen] = useState<boolean>(true);
  const [focusTab, setFocusTab] = useState<FocusTab>("all");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  // Sync URL ?lesson= query param safely on client mount without SSR suspense issues
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lesson");
    if (q && getNeuralLearnLessonById(q)) {
      setActiveLessonId(q);
    }
  }, []);

  const lesson = useMemo(
    () => getNeuralLearnLessonById(activeLessonId) ?? HOW_NEURAL_LEARN_LESSONS[0]!,
    [activeLessonId],
  );

  const currentIdx = useMemo(
    () => HOW_NEURAL_LEARN_LESSONS.findIndex((l) => l.id === lesson.id),
    [lesson.id],
  );

  const completedCount = useMemo(
    () =>
      HOW_NEURAL_LEARN_LESSONS.filter((l) => isMicroLessonCompleted(l.id)).length,
    [isMicroLessonCompleted],
  );

  const progressPct = Math.round(
    (completedCount / HOW_NEURAL_LEARN_LESSONS.length) * 100,
  );

  const shuffledQuizOptions = useMemo(
    () =>
      getShuffledQuizOptions(
        lesson.id,
        lesson.quiz.options,
        lesson.quiz.correctIndex,
      ),
    [lesson.id, lesson.quiz.options, lesson.quiz.correctIndex],
  );

  const selectLesson = (id: string) => {
    setActiveLessonId(id);
    setSelectedQuizOption(null);
    setCopiedCode(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lesson", id);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(lesson.pytorchSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      // Clipboard blocked in non-HTTPS contexts; ignore silently
    }
  };

  const prevLesson = currentIdx > 0 ? HOW_NEURAL_LEARN_LESSONS[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < HOW_NEURAL_LEARN_LESSONS.length - 1
      ? HOW_NEURAL_LEARN_LESSONS[currentIdx + 1]
      : null;

  const isDone = isMicroLessonCompleted(lesson.id);

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6">
      {/* Top Module Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-[#07111e] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              <Brain className="h-3.5 w-3.5" />
              <span>Neural Network Training Fundamentals • 12 Mikro-dars</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Neyron Tarmoqlar Qanday O&apos;rganadi?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <ColoredTermText text="Boshlang'ichlar uchun eng sodda qo'llanma: Weight, Bias, Activation Function, Loss Function, Backpropagation, Gradient Descent, Learning Rate, Overfitting va GPU Matrix Multiplication — rangli terminlar hamda jonli vizualizatsiyalar bilan." />
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0 w-full sm:w-auto">
            <div className="w-full sm:w-56 rounded-2xl border border-slate-800 bg-black/40 p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Modul progressi</span>
                <span className="font-mono font-bold text-emerald-300">
                  {completedCount}/{HOW_NEURAL_LEARN_LESSONS.length} ({progressPct}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setOutlineOpen((o) => !o)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white hover:border-cyan-400/50 transition-colors cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span>Darslar ro&apos;yxati (12 mikro-dars)</span>
            {outlineOpen ? (
              <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowTermsLegend((s) => !s)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              showTermsLegend
                ? "border-violet-400/60 bg-violet-500/20 text-violet-200"
                : "border-slate-700 bg-slate-900/90 text-slate-200 hover:border-violet-400/50"
            }`}
          >
            <Palette className="h-4 w-4 text-violet-300" />
            <span>Rangli Terminlar Lug&apos;ati</span>
          </button>

          <button
            type="button"
            onClick={() => setVideoOpen((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              videoOpen
                ? "border-rose-400/60 bg-rose-500/20 text-rose-200"
                : "border-slate-700 bg-slate-900/90 text-slate-200 hover:border-rose-400/50"
            }`}
          >
            <Video className="h-4 w-4 text-rose-300" />
            <span>{videoOpen ? "Video Darsni Yashirish" : "Video Darsni Ko'rish"}</span>
          </button>

          <KnowledgeRelationshipsButton
            entityId={lesson.id}
            fallbackMeta={{ title: lesson.titleUz }}
          />
        </div>

        {/* Featured YouTube Video Lesson */}
        {videoOpen && (
          <div className="rounded-2xl border border-rose-500/30 bg-black/50 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  <Play className="h-3.5 w-3.5" />
                  <span>Asosiy Video Qo&apos;llanma • {HOW_NEURAL_LEARN_FEATURED_VIDEO.channelName}</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {HOW_NEURAL_LEARN_FEATURED_VIDEO.title}
                </h2>
              </div>
              <a
                href={HOW_NEURAL_LEARN_FEATURED_VIDEO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-rose-400/50 hover:text-white transition-colors"
              >
                <span>YouTube&apos;da ochish</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
              <iframe
                src={HOW_NEURAL_LEARN_FEATURED_VIDEO.embedUrl}
                title={HOW_NEURAL_LEARN_FEATURED_VIDEO.title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              <ColoredTermText text={HOW_NEURAL_LEARN_FEATURED_VIDEO.descriptionUz} />
            </p>
          </div>
        )}

        {/* Collapsible Outline Drawer */}
        {outlineOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
            {HOW_NEURAL_LEARN_LESSONS.map((item) => {
              const active = item.id === lesson.id;
              const done = isMicroLessonCompleted(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    selectLesson(item.id);
                    setOutlineOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    active
                      ? "border-cyan-400 bg-cyan-500/15 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <span>#{String(item.order).padStart(2, "0")}</span>
                      <span>• {item.estimatedMinutes} daq</span>
                    </div>
                    <div className="truncate text-xs font-bold mt-0.5">
                      {item.titleUz}
                    </div>
                  </div>
                  {done && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Terms Color Legend Drawer */}
        {showTermsLegend && (
          <div className="pt-2 border-t border-slate-800/80">
            <ColoredTermsLegend />
          </div>
        )}
      </div>

      {/* Active Lesson Container */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 sm:p-6 space-y-6">
        {/* Lesson Title Bar */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 font-mono font-bold text-cyan-300">
                Mikro-dars #{lesson.order} / {HOW_NEURAL_LEARN_LESSONS.length}
              </span>
              <span className="text-slate-400">• ~{lesson.estimatedMinutes} daqiqa</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {lesson.titleUz}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">{lesson.subtitleEn}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleMicroLessonCompleted(lesson.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                isDone
                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-200"
                  : "border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-400/50"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isDone ? "Tugatildi ✓" : "Tugatilgan deb belgilash"}</span>
            </button>
          </div>
        </div>

        {/* Section Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "Barchasi (Ketma-ket)" },
            { id: "theory", label: "1. Sodda Tushuntirish" },
            { id: "visual", label: "2. Interaktiv Vizualizatsiya" },
            { id: "math-code", label: "3. Matematika & PyTorch" },
            { id: "practice", label: "4. Amaliy Kod & Test" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFocusTab(tab.id as FocusTab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                focusTab === tab.id
                  ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: Sodda Tushuntirish, Analogiya & Ilmiy Aniqlik */}
        {(focusTab === "all" || focusTab === "theory") && (
          <section className="space-y-4">
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Lightbulb className="h-4 w-4" />
                <span>Hayotiy Analogiya</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-100">
                <ColoredTermText text={lesson.analogyUz} />
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Sodda Tushuntirish (rangli terminlarni bosib izohini o&apos;qing)</span>
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-slate-200">
                {lesson.theoryParagraphsUz.map((paragraph, idx) => (
                  <p key={idx}>
                    <ColoredTermText text={paragraph} />
                  </p>
                ))}
              </div>
            </div>

            {lesson.scientificCorrectionUz && (
              <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-r from-amber-950/30 via-slate-900 to-emerald-950/30 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Muhim Ilmiy Aniqlik</span>
                </div>
                <div className="text-xs sm:text-sm text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    <strong>Keng tarqalgan yanglish fikr:</strong>{" "}
                    {lesson.scientificCorrectionUz.mythUz}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-100 leading-relaxed pl-6">
                  <strong>Asl ilmiy haqiqat:</strong>{" "}
                  <ColoredTermText text={lesson.scientificCorrectionUz.truthUz} />
                </div>
              </div>
            )}
          </section>
        )}

        {/* SECTION 2: Interaktiv Vizualizatsiya */}
        {(focusTab === "all" || focusTab === "visual") && (
          <section className="rounded-2xl border border-cyan-500/25 bg-slate-900/50 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <FlaskConical className="h-4 w-4 text-cyan-400" />
              <span>{lesson.visualTitleUz}</span>
            </div>
            <HowNeuralLearnVisuals visualId={lesson.visualId} />
          </section>
        )}

        {/* SECTION 3: Matematika & PyTorch Kodi */}
        {(focusTab === "all" || focusTab === "math-code") && (
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5 space-y-2">
              <h3 className="text-sm font-bold text-white">Matematik Formula</h3>
              <MathBlock
                math={lesson.formulaLatex}
                explanation={lesson.formulaNoteUz}
              />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-fuchsia-400" />
                  <span>PyTorch Namuna Kodi</span>
                </h3>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-slate-500 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" /> Nusxalandi
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Nusxa olish
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-black/70 p-3.5 text-xs font-mono leading-relaxed text-emerald-200">
                <code>{lesson.pytorchSnippet}</code>
              </pre>
            </div>
          </section>
        )}

        {/* SECTION 4: Amaliy Python Mashq (Pyodide) & Checkpoint Test */}
        {(focusTab === "all" || focusTab === "practice") && (
          <section className="space-y-5">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-400" />
                <span>Amaliy Kodlash Mashqi (Brauzerda Ishlaydi)</span>
              </h3>
              <PracticeLab
                exercise={lesson.exercise}
                lessonId={lesson.id}
                onCompleted={(res) => {
                  if (res.testsPassed) {
                    setMicroLessonCompleted(lesson.id, true);
                  }
                }}
              />
            </div>

            {/* Checkpoint Quiz */}
            <div className="rounded-2xl border border-violet-500/25 bg-violet-500/[0.04] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-200">
                <HelpCircle className="h-4 w-4 text-violet-400" />
                <span>Bilimni Tekshirish (Checkpoint Test)</span>
              </div>
              <p className="text-sm font-medium text-white">
                <ColoredTermText text={lesson.quiz.questionUz} />
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {shuffledQuizOptions.map((opt, idx) => {
                  const chosen = selectedQuizOption === idx;
                  const showResult = selectedQuizOption !== null;
                  const cls = !showResult
                    ? "border-slate-800 bg-slate-900/70 text-slate-200 hover:border-violet-400/50"
                    : opt.isCorrect
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-200"
                    : chosen
                    ? "border-rose-500/60 bg-rose-500/15 text-rose-200"
                    : "border-slate-800/60 bg-slate-900/40 text-slate-400";
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedQuizOption(idx)}
                      className={`rounded-xl border p-3 text-left text-xs leading-relaxed transition cursor-pointer ${cls}`}
                    >
                      <span className="font-mono font-bold mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {selectedQuizOption !== null && (
                <div className="rounded-xl border border-slate-700 bg-black/50 p-3 text-xs leading-relaxed text-slate-200">
                  <strong className="text-emerald-300">Izoh: </strong>
                  <ColoredTermText text={lesson.quiz.explanationUz} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          {prevLesson ? (
            <button
              type="button"
              onClick={() => selectLesson(prevLesson.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-400/50 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400" />
              <span>
                Oldingi: #{prevLesson.order} {prevLesson.titleUz}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              type="button"
              onClick={() => selectLesson(nextLesson.id)}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-cyan-400 cursor-pointer"
            >
              <span>
                Keyingi: #{nextLesson.order} {nextLesson.titleUz}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-xs font-bold text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Barcha 12 ta mikro-dars yakunlandi!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
