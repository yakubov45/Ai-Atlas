import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { BookmarksClient } from "./BookmarksClient";
import { uz } from "@/i18n/dictionaries/uz";

export const metadata: Metadata = {
  title: uz.bookmarks.title,
  description: uz.bookmarks.lead,
};

export default function BookmarksPage() {
  const repo = getContentRepository();
  const allLessons = repo.getSummaries();
  const allVisualizations = repo.visualizations;

  return (
    <div className="w-full px-3 sm:px-5 lg:px-6 py-6 sm:py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {uz.bookmarks.title}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          {uz.bookmarks.lead}
        </p>
      </div>

      <BookmarksClient
        allLessons={allLessons}
        allVisualizations={allVisualizations}
      />
    </div>
  );
}
