"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";
import type { LessonSummary } from "@/lib/content/types";
import { useLearning } from "@/hooks/use-learning";
import { DifficultyBadge } from "@/components/ui/Badge";
import { getLessonRoleInPath, type SpecializationId } from "@/lib/curriculum/paths";
import { uz } from "@/i18n/dictionaries/uz";

export function RoadmapList({
  lessons,
  selectedPathId,
}: {
  lessons: readonly LessonSummary[];
  selectedPathId?: SpecializationId | null;
}) {
  const { isCompleted } = useLearning();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const lessonMap = new Map(lessons.map((l) => [l.id, l]));

  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => {
        const completed = mounted && isCompleted(lesson.id);
        const prereqLessons = lesson.prerequisites
          .map((id) => lessonMap.get(id))
          .filter(Boolean) as LessonSummary[];

        const roleInfo = selectedPathId
          ? getLessonRoleInPath(lesson.slug, selectedPathId)
          : null;

        const isCoreOrSupporting =
          roleInfo?.role === "core" ||
          roleInfo?.role === "supporting" ||
          roleInfo?.role === "advanced";

        return (
          <div
            key={lesson.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all text-xs ${isCoreOrSupporting
              ? "border-violet-500/40 bg-slate-900/80 shadow-md shadow-violet-950/20"
              : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
              }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5">
                {completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle
                    className={`w-5 h-5 ${isCoreOrSupporting ? "text-violet-400" : "text-slate-600"
                      }`}
                  />
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-500 font-semibold">
                    #{index + 1}
                  </span>

                  {/* Path-Specific Role Badge */}
                  {roleInfo && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${roleInfo.role === "core"
                        ? "bg-violet-950/90 text-violet-300 border-violet-500/50 shadow-sm"
                        : roleInfo.role === "supporting"
                          ? "bg-cyan-950/90 text-cyan-300 border-cyan-500/50"
                          : roleInfo.role === "advanced"
                            ? "bg-amber-950/90 text-amber-300 border-amber-500/50"
                            : "bg-slate-950 text-slate-400 border-slate-800"
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${roleInfo.role === "core"
                          ? "bg-violet-400 animate-pulse"
                          : roleInfo.role === "supporting"
                            ? "bg-cyan-400"
                            : roleInfo.role === "advanced"
                              ? "bg-amber-400"
                              : "bg-slate-500"
                          }`}
                      />
                      {roleInfo.role === "core"
                        ? "Deep Learning Path • Master (Level 3)"
                        : roleInfo.role === "supporting"
                          ? "Tayanch Mavzu • Understand (Level 2)"
                          : roleInfo.role === "advanced"
                            ? "Chuqur Tadqiqot • Master (Level 3)"
                            : "Overview Mode (Level 1)"}
                    </span>
                  )}

                  <DifficultyBadge difficulty={lesson.difficulty} />
                </div>

                <h4 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                  <span>{lesson.title}</span>
                  {roleInfo?.role === "core" && (
                    <span className="text-[10px] font-mono text-violet-400 font-normal">
                      [Asosiy yo‘nalish]
                    </span>
                  )}
                </h4>

                <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                  {lesson.description}
                </p>

                {/* Path Pedagogical Role Label */}
                {roleInfo?.roleLabelUz && (
                  <p className="text-[11px] text-violet-300/90 flex items-center gap-1.5 pt-0.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>{roleInfo.roleLabelUz}</span>
                  </p>
                )}

                {prereqLessons.length > 0 && (
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <span className="text-slate-500 font-medium">
                      {uz.roadmap.requires}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prereqLessons.map((p) => (
                        <Link
                          key={p.id}
                          href={`/learn/${p.slug}`}
                          className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-700 transition-colors"
                        >
                          {p.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <span className="text-slate-400 font-mono text-xs">
                {lesson.readingMinutes} {uz.common.minutes}
              </span>
              <Link
                href={`/learn/${lesson.slug}`}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${isCoreOrSupporting
                  ? "bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-900/30"
                  : "bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  }`}
              >
                <span>
                  {roleInfo?.role === "core"
                    ? "Master darajada o‘rganish"
                    : roleInfo?.role === "supporting"
                      ? "Understand darajada"
                      : uz.roadmap.openLesson}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
