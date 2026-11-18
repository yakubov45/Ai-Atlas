import React from "react";
import Link from "next/link";
import type { RelatedLesson } from "@/lib/content/resolve";
import { ArrowRight, GitFork } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";
import { DifficultyBadge } from "@/components/ui/Badge";

export function RelatedLessons({ items }: { items: readonly RelatedLesson[] }) {
  if (items.length === 0) return null;

  return (
    <div className="my-8 pt-6 border-t border-slate-800">
      <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
        <GitFork className="w-4 h-4 text-cyan-400" />
        <span>{uz.lesson.related}</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(({ lesson, reason }) => (
          <Link
            key={lesson.id}
            href={`/learn/${lesson.slug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-violet-500/50 transition-all text-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {uz.lesson.relation[reason]}
                </span>
                <DifficultyBadge difficulty={lesson.difficulty} />
              </div>
              <h4 className="font-semibold text-slate-100 group-hover:text-violet-300 transition-colors line-clamp-1">
                {lesson.title}
              </h4>
              <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                {lesson.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800/60 group-hover:text-slate-300">
              <span>{lesson.readingMinutes} {uz.common.minutes}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
