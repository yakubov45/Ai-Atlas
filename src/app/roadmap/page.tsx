import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { RoadmapClient } from "./RoadmapClient";
import { uz } from "@/i18n/dictionaries/uz";

export const metadata: Metadata = {
  title: uz.roadmap.title,
  description: uz.roadmap.lead,
};

export default function RoadmapPage() {
  const repo = getContentRepository();
  const summaries = repo.getSummaries();

  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {uz.roadmap.title}
        </h1>
        <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
          {uz.roadmap.lead}
        </p>
      </div>

      <RoadmapClient lessons={summaries} />
    </div>
  );
}
