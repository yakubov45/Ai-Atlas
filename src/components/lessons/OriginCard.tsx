import React from "react";
import type { Origin } from "@/lib/content/schema";
import { FileSearch, BookOpen } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";

export function OriginCard({ origins }: { origins: readonly Origin[] }) {
  if (origins.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-300">
      <div className="flex items-center gap-2 font-semibold text-slate-200 mb-2">
        <FileSearch className="w-4 h-4 text-cyan-400" />
        <span>{uz.lesson.origin} (Traceability)</span>
      </div>
      <p className="text-slate-400 text-[11px] mb-3">{uz.lesson.originHint}</p>
      <div className="space-y-2">
        {origins.map((orig, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 font-mono text-[11px]"
          >
            <div className="flex items-center gap-2 text-slate-200 truncate">
              <BookOpen className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span className="font-semibold truncate">{orig.document}</span>
              {orig.section && <span className="text-slate-400">&mdash; {orig.section}</span>}
            </div>
            <div className="flex items-center gap-2 text-slate-400 shrink-0">
              {orig.pages && (
                <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[10px]">
                  {uz.lesson.originPages}: {orig.pages}
                </span>
              )}
              {orig.note && <span className="text-[10px] text-slate-500 font-sans">{orig.note}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
