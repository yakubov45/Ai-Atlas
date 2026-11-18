"use client";

import React from "react";
import { Network, Sparkles, BookOpen, Layers, CheckCircle, Boxes } from "lucide-react";
import { CANONICAL_CONCEPTS } from "@/lib/knowledge-graph/concepts";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";

export interface KnowledgeDashboardStatsProps {
  knownCount: number;
}

export function KnowledgeDashboardStats({ knownCount }: KnowledgeDashboardStatsProps) {
  const totalConcepts = CANONICAL_CONCEPTS.length;
  const totalRelations = CONCEPT_RELATIONS.length;
  const progressPercent = totalConcepts > 0 ? Math.round((knownCount / totalConcepts) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400">
          <Network className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-bold text-white">{totalConcepts}</span>
          <p className="text-xs text-slate-400">Kanonik tushuncha</p>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-bold text-white">{totalRelations}</span>
          <p className="text-xs text-slate-400">Tizimli bog&apos;lanish</p>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            {knownCount} <span className="text-xs text-emerald-400 font-normal">({progressPercent}%)</span>
          </span>
          <p className="text-xs text-slate-400">O&apos;zlashtirildi</p>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-bold text-white">4 ta</span>
          <p className="text-xs text-slate-400">Ulangan Akademiya</p>
        </div>
      </div>
    </div>
  );
}
