"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowRight, BookOpen, Boxes } from "lucide-react";
import type { LessonSummary, VisualizationInstance } from "@/lib/content/types";
import { useLearning } from "@/hooks/use-learning";
import { EmptyState } from "@/components/ui/EmptyState";
import { DifficultyBadge } from "@/components/ui/Badge";
import { uz } from "@/i18n/dictionaries/uz";

export interface BookmarksClientProps {
  allLessons: readonly LessonSummary[];
  allVisualizations: readonly VisualizationInstance[];
}

export function BookmarksClient({
  allLessons,
  allVisualizations,
}: BookmarksClientProps) {
  const { state, removeBookmark } = useLearning();

  const lessonMap = new Map(allLessons.map((l) => [l.id, l]));
  const vizMap = new Map(allVisualizations.map((v) => [v.id, v]));

  const savedEntries = Object.values(state.bookmarks);
  const savedLessons = savedEntries
    .filter((b) => b.kind === "lesson")
    .map((b) => ({ bookmark: b, item: lessonMap.get(b.id) }))
    .filter((entry) => Boolean(entry.item)) as Array<{
    bookmark: (typeof savedEntries)[number];
    item: LessonSummary;
  }>;

  const savedVisualizations = savedEntries
    .filter((b) => b.kind === "visualization")
    .map((b) => ({ bookmark: b, item: vizMap.get(b.id) }))
    .filter((entry) => Boolean(entry.item)) as Array<{
    bookmark: (typeof savedEntries)[number];
    item: VisualizationInstance;
  }>;

  const hasAnyBookmarks = savedLessons.length > 0 || savedVisualizations.length > 0;

  return (
    <div className="space-y-10">
      {hasAnyBookmarks ? (
        <>
          {/* Saved Lessons */}
          {savedLessons.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>{uz.bookmarks.lessons} ({savedLessons.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedLessons.map(({ bookmark, item }) => (
                  <div
                    key={bookmark.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between text-xs space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <DifficultyBadge difficulty={item.difficulty} />
                        <button
                          onClick={() => removeBookmark("lesson", item.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title={uz.common.remove}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h3 className="font-semibold text-slate-100 text-sm leading-snug">{item.title}</h3>
                      <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {uz.bookmarks.savedOn}: {new Date(bookmark.addedAt).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/learn/${item.slug}`}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        <span>O'qish</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Visualizations */}
          {savedVisualizations.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-violet-400" />
                <span>{uz.bookmarks.visualizations} ({savedVisualizations.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedVisualizations.map(({ bookmark, item }) => (
                  <div
                    key={bookmark.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between text-xs space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {item.type}
                        </span>
                        <button
                          onClick={() => removeBookmark("visualization", item.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title={uz.common.remove}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h3 className="font-semibold text-slate-100 text-sm leading-snug">{item.title}</h3>
                      <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {uz.bookmarks.savedOn}: {new Date(bookmark.addedAt).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/visual-lab/${item.id}`}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        <span>Ochish</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={Bookmark}
          title={uz.bookmarks.emptyTitle}
          description={uz.bookmarks.emptyBody}
          actionLabel={uz.home.explore}
          actionHref="/learn"
        />
      )}
    </div>
  );
}
