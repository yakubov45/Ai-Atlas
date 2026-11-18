import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { LessonNavigation as NavData } from "@/lib/content/types";
import { uz } from "@/i18n/dictionaries/uz";

export function LessonNavigation({ nav }: { nav: NavData }) {
  if (!nav.previous && !nav.next) return null;

  return (
    <div className="my-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {nav.previous ? (
        <Link
          href={`/learn/${nav.previous.slug}`}
          className="group flex flex-col p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all text-xs"
        >
          <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-300 mb-1">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{uz.common.previous}</span>
          </span>
          <span className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {nav.previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nav.next ? (
        <Link
          href={`/learn/${nav.next.slug}`}
          className="group flex flex-col items-end p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all text-xs text-right"
        >
          <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-300 mb-1">
            <span>{uz.common.next}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {nav.next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
