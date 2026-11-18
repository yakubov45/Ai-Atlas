"use client";

import React from "react";
import Link from "next/link";
import { Clock, CheckCircle2, ArrowRight, Compass } from "lucide-react";
import type { LessonSummary } from "@/lib/content/types";
import { DifficultyBadge, StatusBadge } from "@/components/ui/Badge";
import { BookmarkButton } from "./BookmarkButton";
import { useLearning } from "@/hooks/use-learning";
import { DEPTH_META, getLessonRoleInPath } from "@/lib/curriculum/paths";
import { uz } from "@/i18n/dictionaries/uz";

export function LessonCard({ lesson }: { lesson: LessonSummary }) {
  const { state, isCompleted } = useLearning();
  const completed = isCompleted(lesson.id);
  const roleInfo = getLessonRoleInPath(lesson.slug, state.selectedPathId);
  const completedDepths = state.completedDepths[lesson.id] ?? [];

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-violet-500/50 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-violet-950/20">
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <DifficultyBadge difficulty={lesson.difficulty} />
            <StatusBadge status={lesson.status} />
            {state.selectedPathId && (
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  roleInfo.role === "core" || roleInfo.role === "advanced"
                    ? "bg-violet-950/60 border-violet-700/60 text-violet-300"
                    : roleInfo.role === "supporting"
                      ? "bg-cyan-950/50 border-cyan-800/50 text-cyan-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <Compass className="w-2.5 h-2.5" />
                <span>{DEPTH_META[roleInfo.recommendedDepth].badge}</span>
              </span>
            )}
            {completed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>{uz.learn.completed}</span>
              </span>
            )}
          </div>

          <BookmarkButton id={lesson.id} kind="lesson" />
        </div>

        {/* Title & Description */}
        <Link href={`/learn/${lesson.slug}`} className="block group-hover:text-violet-300">
          <h3 className="font-semibold text-slate-100 text-base leading-snug group-hover:text-violet-300 transition-colors">
            {lesson.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {lesson.description}
          </p>
        </Link>

        {/* Completed Depths or Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {completedDepths.map((d) => (
            <span
              key={d}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/50"
            >
              ✓ {DEPTH_META[d].badge}
            </span>
          ))}
          {lesson.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Metadata & Link */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/70 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>
            {lesson.readingMinutes} {uz.common.minutes}
          </span>
        </div>

        <Link
          href={`/learn/${lesson.slug}`}
          className="inline-flex items-center gap-1 font-medium text-cyan-400 group-hover:text-cyan-300"
        >
          <span>
            {lesson.slug === "transformers" ? "20 ta mikro-dars" : "Mikro-darsni ochish"}
          </span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
