import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { computeContentAuditSummary } from "@/lib/learning-os/catalog";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Shaxsiy Dashboard — Progress va Bilim Bo'shliqlari | AI Atlas",
  description:
    "AI Atlas shaxsiy o'quv boshqaruv markazi: o'qishni davom ettirish, kanonik progress, bilim bo'shliqlari tahlili va amaliy loyihalar.",
};

export default function DashboardPage() {
  const repo = getContentRepository();
  const publishedLessons = repo.getSummaries();
  const auditSummary = computeContentAuditSummary({
    lessons: publishedLessons,
    glossaryCount: repo.glossary.length,
    visualizations: repo.visualizations,
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <DashboardClient
        publishedLessons={publishedLessons}
        auditSummary={auditSummary}
      />
    </div>
  );
}
