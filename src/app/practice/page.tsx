import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { PracticeHubClient } from "@/components/practice/PracticeHubClient";

export const metadata: Metadata = {
  title: "Amaliyot & Laboratoriya Markazi | AI Atlas",
  description:
    "Python Pyodide mashqlari, 30 Days of Python, interaktiv vizual laboratoriyalar va portfolio loyihalari.",
};

export default function PracticeHubPage() {
  const repo = getContentRepository();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <PracticeHubClient visualizations={repo.visualizations} />
    </div>
  );
}
