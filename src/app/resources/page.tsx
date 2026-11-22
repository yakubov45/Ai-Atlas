import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { ResourcesHubClient } from "@/components/resources/ResourcesHubClient";

export const metadata: Metadata = {
  title: "Resurslar Markazi — Ilmiy Maqolalar, Videolar va Konspektlar | AI Atlas",
  description:
    "AI Atlas dagi barcha ilmiy maqolalar, Manim va YouTube darslar, glossariy va kanonik MDX konspektlar katalogi.",
};

export default function ResourcesPage() {
  const repo = getContentRepository();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <ResourcesHubClient
        lessons={repo.getSummaries()}
        references={repo.references}
        glossaryCount={repo.glossary.length}
      />
    </div>
  );
}
