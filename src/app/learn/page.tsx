import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { LearnCatalogClient } from "./LearnCatalogClient";
import { uz } from "@/i18n/dictionaries/uz";

export const metadata: Metadata = {
  title: uz.learn.title,
  description: uz.learn.lead,
};

export default function LearnPage() {
  const repo = getContentRepository();
  const summaries = repo.getSummaries();
  const categories = repo.categories;

  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {uz.learn.title}
        </h1>
        <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
          {uz.learn.lead}
        </p>
      </div>

      {/* Catalog Client */}
      <LearnCatalogClient
        initialLessons={summaries}
        categories={categories}
        preview={repo.preview}
      />
    </div>
  );
}
