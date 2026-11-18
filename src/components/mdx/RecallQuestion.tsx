"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  RotateCcw,
  Eye,
  Send,
} from "lucide-react";

export interface RecallQuestionProps {
  question: string;
  placeholder?: string;
  acceptedAnswers: string[];
  hint?: string;
  explanation: string;
  conceptTitle?: string;
  className?: string;
}

export function RecallQuestion({
  question,
  placeholder = "Javobingizni shu yerga yozing...",
  acceptedAnswers,
  hint,
  explanation,
  conceptTitle,
  className = "",
}: RecallQuestionProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Normalize string for forgiving grading: lowercase, trimmed, quotes/backticks/parentheses stripped
  const normalizeAnswer = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/['"`]/g, "")
      .replace(/\(\)$/, "")
      .trim();
  };

  const handleCheck = () => {
    if (!userAnswer.trim()) return;

    setAttempts((prev) => prev + 1);
    const normalizedInput = normalizeAnswer(userAnswer);
    const isMatch = acceptedAnswers.some(
      (ans) => normalizeAnswer(ans) === normalizedInput
    );

    if (isMatch) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCheck();
    }
  };

  const handleReset = () => {
    setUserAnswer("");
    setStatus("idle");
    setShowHint(false);
    setShowAnswer(false);
  };

  return (
    <div
      className={`my-6 p-5 sm:p-6 rounded-2xl border transition-all ${
        status === "correct"
          ? "bg-emerald-950/25 border-emerald-600/60 ring-1 ring-emerald-500/20 shadow-lg shadow-emerald-950/30"
          : status === "incorrect"
          ? "bg-rose-950/20 border-rose-600/50 ring-1 ring-rose-500/20"
          : "bg-slate-900/90 border-slate-700/80 shadow-md"
      } ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-950/60 border border-violet-700/50 text-violet-300">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-300">
            {conceptTitle ? conceptTitle : "Faol savol: O‘zingizni tekshiring"}
          </span>
        </div>

        {attempts > 0 && status !== "correct" && (
          <span className="text-[11px] font-mono text-slate-400">
            Urinishlar: {attempts}
          </span>
        )}
      </div>

      {/* Question */}
      <div className="mt-3.5 space-y-3">
        <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
          {question}
        </p>

        {/* Input & Submit Row */}
        {status !== "correct" ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    if (status === "incorrect") setStatus("idle");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs sm:text-sm font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    status === "incorrect"
                      ? "border-rose-500/80 focus:ring-rose-500/40"
                      : "border-slate-800 focus:border-violet-500 focus:ring-violet-500/30"
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={handleCheck}
                disabled={!userAnswer.trim()}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-violet-900/30 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Tekshirish</span>
              </button>
            </div>

            {/* In-turn hints / assistance */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {hint && (
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showHint ? "Maslahatni yashirish" : "Maslahat (Hint)"}</span>
                </button>
              )}

              {attempts >= 3 && !showAnswer && (
                <button
                  type="button"
                  onClick={() => setShowAnswer(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Javobni ko‘rish</span>
                </button>
              )}
            </div>

            {/* Hint Box */}
            {showHint && hint && (
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{hint}</span>
              </div>
            )}

            {/* Revealed Answer Box */}
            {showAnswer && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-cyan-400">To‘g‘ri javob(lar): </span>
                <span className="font-mono text-emerald-400">
                  {acceptedAnswers.join(" yoki ")}
                </span>
              </div>
            )}

            {/* Incorrect Feedback */}
            {status === "incorrect" && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    Javobingiz mos kelmadi. Qayta urinib ko‘ring yoki yuqoridagi maslahatga qarang.
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Correct State */
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-600/50 text-xs sm:text-sm text-emerald-200 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>Ajoyib! To‘g‘ri javob!</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="mt-1 text-slate-200 text-xs leading-relaxed">
                    {explanation}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                title="Qayta sinab ko‘rish"
                className="p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/70 text-emerald-300 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
