"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TRANSFORMER_MODULES,
  TRANSFORMER_MICRO_LESSONS,
  type TransformerMicroLesson,
} from "@/lib/curriculum/transformer-path";
import { useLearning } from "@/hooks/use-learning";
import { AttentionExplorer } from "@/components/visualizations/AttentionExplorer";
import { FunctionExplorer } from "@/components/visualizations/FunctionExplorer";
import { NeuralNetworkExplorer } from "@/components/visualizations/NeuralNetworkExplorer";
import { FormulaDisplay } from "@/components/visualizations/FormulaDisplay";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import {
  CheckCircle2,
  Circle,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Eye,
  Calculator,
  Code2,
  Check,
  XCircle,
  BookOpen,
} from "lucide-react";

export function TransformerMicroPathView() {
  const { isMicroLessonCompleted, setMicroLessonCompleted } = useLearning();
  // Default to Lesson #10 ("Query, Key va Value") or #1 so the user can immediately explore any of the 20 micro-lessons
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [activePillar, setActivePillar] = useState<
    "all" | "intuition" | "visual" | "math" | "practice"
  >("all");
  const [showSimplerHelp, setShowSimplerHelp] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const activeLesson: TransformerMicroLesson =
    TRANSFORMER_MICRO_LESSONS.find((l) => l.index === activeIndex) ??
    TRANSFORMER_MICRO_LESSONS[0]!;

  const completedCount = TRANSFORMER_MICRO_LESSONS.filter((l) =>
    isMicroLessonCompleted(l.id),
  ).length;

  const selectMicroLesson = (idx: number) => {
    setActiveIndex(idx);
    setShowSimplerHelp(false);
    setSelectedOption(null);
    setQuizSubmitted(false);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    if (selectedOption === activeLesson.checkpoint.correctIndex) {
      setMicroLessonCompleted(activeLesson.id, true);
    }
  };

  const isCorrect =
    quizSubmitted && selectedOption === activeLesson.checkpoint.correctIndex;

  return (
    <div className="space-y-8 my-6">
      {/* Top Overview Banner: Transformer — Learning Path (20 ta mikro-dars • 5 ta modul) */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950/40 border border-violet-800/50 p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/70 border border-violet-700/50 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>20 ta mikro-dars &bull; 5 ta modul &bull; Attention Is All You Need</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Transformer — Bosqichma-bosqich Mikro-Darslar Yo‘li
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Bitta katta maqolani o‘qish o‘rniga Transformer arxitekturasini 20 ta kichik, hazm bo‘ladigan qadamda: Intuitsiya &rarr; Vizual Laboratoriya &rarr; Matematika &rarr; Kod &rarr; Mini-test ketma-ketligida o‘zlashtiring.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-right min-w-[170px]">
            <div className="text-[11px] font-mono text-slate-400">O‘zlashtirish ko‘rsatkichi</div>
            <div className="text-lg font-extrabold font-mono text-emerald-400 mt-0.5">
              {completedCount} / {TRANSFORMER_MICRO_LESSONS.length} dars
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1.5">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all"
                style={{
                  width: `${Math.round(
                    (completedCount / TRANSFORMER_MICRO_LESSONS.length) * 100,
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 5 Modules Grid (20 Micro-Lessons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {TRANSFORMER_MODULES.map((mod) => (
            <div
              key={mod.moduleNumber}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold text-slate-200">{mod.title}</span>
                <span className="text-[10px] font-mono text-violet-300 bg-violet-950/50 px-2 py-0.5 rounded-md border border-violet-800/40 shrink-0">
                  {mod.lessons.length} dars
                </span>
              </div>

              <div className="space-y-1.5">
                {mod.lessons.map((item) => {
                  const isCurrent = item.index === activeIndex;
                  const isDone = isMicroLessonCompleted(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectMicroLesson(item.index)}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs transition-all flex items-start gap-2 cursor-pointer border ${
                        isCurrent
                          ? "bg-violet-600/25 border-violet-500 text-white font-semibold shadow-sm"
                          : isDone
                            ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-200 hover:bg-emerald-950/30"
                            : "bg-slate-900/60 border-slate-800/60 text-slate-300 hover:bg-slate-800/70 hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 ${
                          isDone
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : isCurrent
                              ? "bg-violet-600 text-white"
                              : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {isDone ? <Check className="w-3 h-3" /> : item.index}
                      </span>
                      <span className="leading-snug">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Micro-Lesson Workspace */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-7 space-y-6 shadow-2xl">
        {/* Micro-lesson Header & Pillar Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-violet-600 text-white font-mono font-bold">
                Mikro-dars #{activeLesson.index} / 20
              </span>
              <span className="text-slate-400 font-medium">
                {activeLesson.moduleTitle}
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="font-mono text-cyan-400">
                ~{activeLesson.estimatedMinutes} daqiqa
              </span>
              {isMicroLessonCompleted(activeLesson.id) && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  Tugallangan
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              {activeLesson.index}. {activeLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">{activeLesson.subtitle}</p>
          </div>

          {/* 4 Pedagogical Pillars Filter + "Tushunmadim" Button */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: "all", label: "Barchasi", icon: Sparkles },
                { id: "intuition", label: "Intuitsiya", icon: Lightbulb },
                { id: "visual", label: "Vizual", icon: Eye },
                { id: "math", label: "Matematika", icon: Calculator },
                { id: "practice", label: "Amaliyot", icon: Code2 },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePillar(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activePillar === tab.id
                      ? "bg-violet-600 text-white"
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setShowSimplerHelp((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showSimplerHelp
                  ? "bg-amber-500/20 border-amber-500 text-amber-200"
                  : "bg-amber-950/40 border-amber-800/60 text-amber-300 hover:bg-amber-950/70"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bu qismni tushunmadim</span>
            </button>
          </div>
        </div>

        {/* Adaptive Help ("Bu qismni tushunmadim / Soddaroq tushuntir") Drawer */}
        {showSimplerHelp && (
          <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-700/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Soddaroq tushuntirish: {activeLesson.adaptiveHelp.analogyTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSimplerHelp(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Yopish
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeLesson.adaptiveHelp.simplerExplanation}
            </p>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-300">
              Sonli misol: {activeLesson.adaptiveHelp.numericWalkthrough}
            </div>

            {activeLesson.adaptiveHelp.prerequisiteSlugs.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400">Tayanch darsga o‘tish:</span>
                {activeLesson.adaptiveHelp.prerequisiteSlugs.map((pre) => (
                  <Link
                    key={pre.slug}
                    href={`/learn/${pre.slug}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-violet-300 border border-slate-700"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>{pre.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pillar 1: Intuitsiya */}
        {(activePillar === "all" || activePillar === "intuition") && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Lightbulb className="w-4 h-4" />
              <span>1. Intuitsiya — Nima va nega kerak?</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {activeLesson.intuition}
            </p>
          </div>
        )}

        {/* Pillar 2: Vizual & Mini-Laboratoriya */}
        {(activePillar === "all" || activePillar === "visual") && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Eye className="w-4 h-4" />
                <span>2. Vizual Mexanizm &amp; Interaktiv Mini-Laboratoriya</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeLesson.visualExplanation}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800">
              {activeLesson.interactiveLab === "attention-1d" && (
                <AttentionExplorer initialMode="mini-lab" />
              )}
              {activeLesson.interactiveLab === "attention-matrix" && (
                <AttentionExplorer initialMode="matrix" />
              )}
              {activeLesson.interactiveLab === "function-explorer" && <FunctionExplorer />}
              {activeLesson.interactiveLab === "neural-network" && (
                <NeuralNetworkExplorer />
              )}
            </div>
          </div>
        )}

        {/* Pillar 3: Matematika */}
        {(activePillar === "all" || activePillar === "math") && (
          <div className="space-y-3">
            <FormulaDisplay
              title="3. Matematik Ifoda va Qonuniyat"
              symbolic={activeLesson.mathFormula}
              context={activeLesson.mathExplanation}
            />
          </div>
        )}

        {/* Pillar 4: Amaliyot (Kod) */}
        {(activePillar === "all" || activePillar === "practice") && (
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Code2 className="w-4 h-4" />
                <span>4. Amaliyot — Python / NumPy Hisoblash Namuna Kodi</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Python 3 + NumPy</span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
              <code>{activeLesson.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Step 5: Tushunganini tekshiradi va keyingisiga o'tadi (Checkpoint Quiz) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/30 via-slate-950 to-slate-950 border border-violet-700/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>5. Tushunganlikni tekshirish (Mini-test)</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setMicroLessonCompleted(
                  activeLesson.id,
                  !isMicroLessonCompleted(activeLesson.id),
                )
              }
              className="text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              {isMicroLessonCompleted(activeLesson.id) ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">O‘zlashtirildi deb belgilangan</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5" />
                  <span>Qo‘lda tugallangan deb belgilash</span>
                </>
              )}
            </button>
          </div>

          <div className="text-sm sm:text-base font-bold text-slate-100">
            {activeLesson.checkpoint.question}
          </div>

          <div className="space-y-2">
            {getShuffledQuizOptions(
              activeLesson.id + "-transformer-checkpoint",
              activeLesson.checkpoint.options,
              activeLesson.checkpoint.correctIndex
            ).map((opt) => {
              const isSelected = selectedOption === opt.originalIndex;
              const isRightOption = opt.isCorrect;
              let btnStyle =
                "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";
              if (quizSubmitted && isSelected) {
                btnStyle = isRightOption
                  ? "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold"
                  : "bg-rose-950/50 border-rose-500 text-rose-200";
              } else if (isSelected) {
                btnStyle =
                  "bg-violet-950/50 border-violet-500 text-violet-200 font-semibold";
              }

              return (
                <button
                  key={opt.originalIndex}
                  type="button"
                  onClick={() => {
                    setSelectedOption(opt.originalIndex);
                    setQuizSubmitted(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>{opt.text}</span>
                  {quizSubmitted && isSelected && (
                    <span>
                      {isRightOption ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              Javobni tekshirish
            </button>

            {quizSubmitted && (
              <div
                className={`text-xs flex-1 p-3 rounded-xl border ${
                  isCorrect
                    ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-200"
                    : "bg-amber-950/30 border-amber-800/60 text-amber-200"
                }`}
              >
                {isCorrect
                  ? activeLesson.checkpoint.explanation
                  : `Maslahat: ${activeLesson.checkpoint.reviewHint}`}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Prev / Next Micro-Lesson Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            disabled={activeIndex <= 1}
            onClick={() => selectMicroLesson(activeIndex - 1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-800 text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Oldingi kichik dars</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            {activeIndex} / 20
          </span>

          <button
            type="button"
            disabled={activeIndex >= 20}
            onClick={() => selectMicroLesson(activeIndex + 1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-xs font-semibold cursor-pointer"
          >
            <span>Keyingi kichik dars</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
