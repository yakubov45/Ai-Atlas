import React from "react";
import type { Metadata } from "next";
import { KnowledgeMapClient } from "@/components/knowledge-graph/KnowledgeMapClient";

export const metadata: Metadata = {
  title: "AI Knowledge Map — Umumiy bilimlar xaritasi | Antigravity AI",
  description:
    "Python, AI Engineering, Machine Learning va Data Science bo'yicha yagona bilimlar grafigi, tushunchalar taksonomiyasi va shaxsiy o'quv yo'li generatori.",
};

export default function KnowledgeMapPage() {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">
      <KnowledgeMapClient />
    </div>
  );
}
