"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useLearning } from "@/hooks/use-learning";
import { uz } from "@/i18n/dictionaries/uz";

export function ContinueCard() {
  const { state } = useLearning();
  const last = state.lastVisited;

  if (!last) return null;

  const percent = Math.round((last.progress || 0) * 100);

  return (
    <div className="w-full max-w-xl mx-auto mb-12 p-4 sm:p-5 rounded-2xl border border-violet-800/60 bg-gradient-to-r from-violet-950/40 to-slate-900/60 backdrop-blur-md shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{uz.home.continueTitle}</span>
        </div>
        <h4 className="font-semibold text-slate-100 text-sm sm:text-base line-clamp-1">{last.title}</h4>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>{percent}% o'qildi</span>
          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <Link
        href={`/learn/${last.slug}`}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-sm transition-all sm:shrink-0"
      >
        <span>{uz.home.continueAction}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
