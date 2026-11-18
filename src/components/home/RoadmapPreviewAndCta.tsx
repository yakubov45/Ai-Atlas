"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Cpu,
  BarChart3,
  FlaskConical,
  Workflow,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export function RoadmapPreviewAndCta() {
  const [selectedTrack, setSelectedTrack] = useState<"python" | "ai" | "ml" | "ds">("ai");

  const roadmaps = {
    python: {
      title: "Python Programming",
      tab: "python-dev",
      icon: Terminal,
      accent: "text-amber-400 border-amber-500/30",
      description: "20 faza • 344 mikro-dars • Sintaksisdan boshlab Call Stack, Rekursiya va Algoritmlar",
      phases: [
        { num: "01-04", name: "Python Asoslari, Tiplar va Xotira Semantikasi" },
        { num: "05-08", name: "Funksiyalar, Scope, List Comprehension va Xatolar" },
        { num: "09-12", name: "Obyektga Yo‘naltirilgan Dasturlash (OOP) va Modullar" },
        { num: "13-16", name: "Fayllar, JSON, Regex, Call Stack va Rekursiya" },
        { num: "17-20", name: "Qidiruv/Tartiblash Algoritmlari va Final CLI Loyiha" },
      ],
    },
    ai: {
      title: "AI Engineering",
      tab: "ai-engineer",
      icon: Cpu,
      accent: "text-violet-400 border-violet-500/30",
      description: "20 faza • 291 mikro-dars • LLM, Prompting, Vektorlar, RAG va Avtonom Agentlar",
      phases: [
        { num: "01-04", name: "AI Kirish, LLM Asoslari va Prompt Anatomiyasi" },
        { num: "05-08", name: "Prompt Muhandisligi, Few-Shot, CoT va ReAct" },
        { num: "09-12", name: "Embeddings, Vektor Fazosi va Cosine Similarity" },
        { num: "13-16", name: "RAG Quvurlari, Chunking, Retrieval va Citation" },
        { num: "17-20", name: "Avtonom AI Agentlar, MCP, Evaluatsiya va Production" },
      ],
    },
    ml: {
      title: "Machine Learning Engineering",
      tab: "ml-engineer",
      icon: BarChart3,
      accent: "text-cyan-400 border-cyan-500/30",
      description: "22 faza • 466 mikro-dars • Matematika, Gradient Descent, Deep Learning va MLOps",
      phases: [
        { num: "01-04", name: "Matematik Poydevor: Chiziqli Algebra va Hosilalar" },
        { num: "05-08", name: "Gradient Descent, Loss Surface va Chiziqli Regressiya" },
        { num: "09-12", name: "Klassifikatsiya, Logistic Regression va Metrikalar" },
        { num: "13-16", name: "Neyron Tarmoqlari, Backpropagation va PyTorch" },
        { num: "17-22", name: "CNN, Transformer, Fine-Tuning va Production MLOps" },
      ],
    },
    ds: {
      title: "Data Science",
      tab: "data-scientist",
      icon: FlaskConical,
      accent: "text-emerald-400 border-emerald-500/30",
      description: "23 faza • 376 mikro-dars • SQL, Pandas, Statistika, CUPED va A/B Testing",
      phases: [
        { num: "01-04", name: "Python for Data, Numpy va SQL Asoslari" },
        { num: "05-08", name: "Pandas/Polars Data Wrangling va EDA Tahlil" },
        { num: "09-12", name: "Ehtimollar Nazariyasi, Taqsimotlar va Gipoteza" },
        { num: "13-16", name: "A/B Testing, Variatsiya Qisqartirish (CUPED) va Quvvat" },
        { num: "17-23", name: "Vaqtli Qatorlar, Churn Bashorati va Vizualizatsiya" },
      ],
    },
  };

  const activeRoadmap = roadmaps[selectedTrack];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 9. Learning Roadmap Mini-Preview */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
            <Workflow className="w-3.5 h-3.5" />
            <span>Bosqichma-bosqich O‘quv Xaritasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Noldan professional darajagacha bo‘lgan aniq yo‘l
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Har bir yo‘nalish faza-faza rejalashtirilgan. Hech narsani o‘tkazib yubormasdan, tartib bilan o‘rganing.
          </p>

          {/* Track Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "ai", label: "AI Engineering" },
              { id: "ml", label: "ML Engineering" },
              { id: "python", label: "Python Programming" },
              { id: "ds", label: "Data Science" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTrack(t.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTrack === t.id
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/30"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Phase Cards Preview */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                {activeRoadmap.title}
              </h3>
              <p className="text-xs text-slate-400">{activeRoadmap.description}</p>
            </div>

            <Link
              href={`/roadmap?tab=${activeRoadmap.tab}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-cyan-300 transition-colors shrink-0"
            >
              <span>To‘liq interaktiv xaritani ochish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {activeRoadmap.phases.map((phase, idx) => (
              <div
                key={phase.num}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold">
                    <span>Faza {phase.num}</span>
                    <span className="text-slate-400">0{idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 leading-snug">
                    {phase.name}
                  </h4>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Laboratoriya mavjud</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-950/80 via-slate-900 to-slate-950 border border-violet-800/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/40 border border-violet-700/50 text-xs font-semibold text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kelajak Kasbini Bugun O‘rganing</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Sun&apos;iy intellekt muhandisi bo‘lishga tayyormisiz?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Keraksiz nazariyalarsiz, bitta platformada — Python, AI Engineering, Machine Learning va Data Science.
            Hoziroq xaritani oching va birinchi darsdan boshlang.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-900/40 transition-all"
          >
            <span>Yo‘l xaritasiga o‘tish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-750 font-medium text-sm transition-all"
          >
            <span>Darslar katalogi</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
