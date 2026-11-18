"use client";

import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useLearning } from "@/hooks/use-learning";
import { uz } from "@/i18n/dictionaries/uz";

export function CompleteButton({
  lessonId,
  className = "",
}: {
  lessonId: string;
  className?: string;
}) {
  const { isCompleted, toggleCompleted } = useLearning();
  const completed = isCompleted(lessonId);

  return (
    <button
      onClick={() => toggleCompleted(lessonId)}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
        completed
          ? "bg-emerald-950/70 text-emerald-300 border border-emerald-700/80 shadow-sm"
          : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
      } ${className}`}
    >
      {completed ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <Circle className="w-4 h-4 text-slate-500 shrink-0" />
      )}
      <span>{completed ? uz.lesson.markedComplete : uz.lesson.markComplete}</span>
    </button>
  );
}
