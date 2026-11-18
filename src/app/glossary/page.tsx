import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { GlossaryClient } from "./GlossaryClient";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Glossariysi — Interaktiv Atamalar Lug‘ati",
  description:
    "Murakkab AI terminlarini sodda tushuntirishlar, misollar va vizualizatsiyalar orqali o‘rganing.",
};

export default function GlossaryPage() {
  const repo = getContentRepository();
  const terms = repo.glossary;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Interaktiv Bilimlar Lug‘ati</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          AI Glossariysi
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Murakkab AI terminlarini sodda tushuntirishlar, hayotiy misollar, matematik formulalar va interaktiv dars havolalari orqali o‘rganing.
        </p>
      </div>

      <GlossaryClient terms={terms} />
    </div>
  );
}
