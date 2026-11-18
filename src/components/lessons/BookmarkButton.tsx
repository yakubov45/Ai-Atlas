"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { useLearning } from "@/hooks/use-learning";
import { uz } from "@/i18n/dictionaries/uz";
import type { BookmarkKind } from "@/lib/progress/repository";

export function BookmarkButton({
  kind = "lesson",
  id,
  className = "",
}: {
  kind?: BookmarkKind;
  id: string;
  className?: string;
}) {
  const { isBookmarked, toggleBookmark } = useLearning();
  const bookmarked = isBookmarked(kind, id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(kind, id);
      }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
        bookmarked
          ? "bg-violet-950/70 text-violet-300 border border-violet-700 shadow-sm"
          : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
      } ${className}`}
      title={bookmarked ? uz.lesson.bookmarked : uz.lesson.bookmark}
    >
      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-violet-400 text-violet-400" : ""}`} />
      <span>{bookmarked ? uz.lesson.bookmarked : uz.lesson.bookmark}</span>
    </button>
  );
}
