"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Cpu,
  BarChart3,
  FlaskConical,
  Sparkles,
  Layers,
  CheckCircle2,
  Workflow,
} from "lucide-react";

export interface LearningTrackCardData {
  id: string;
  tabKey: "python-dev" | "ai-engineer" | "ml-engineer" | "data-scientist";
  title: string;
  tagline: string;
  description: string;
  phasesCount: number;
  microLessonsCount: number;
  level: string;
  coreTopics: string[];
  practicalHighlights: string;
  visualPreview: {
    type: "python" | "ai" | "ml" | "ds";
    badgeText: string;
  };
  accentColor: {
    badge: string;
    border: string;
    hoverBorder: string;
    glow: string;
    button: string;
  };
}

export const FOUR_LEARNING_TRACKS: readonly LearningTrackCardData[] = [
  {
    id: "python-dev",
    tabKey: "python-dev",
    title: "Python Programming",
    tagline: "Toza kod, xotira modeli va mustahkam algoritmik poydevor",
    description:
      "Python interpretatori qanday ishlashidan tortib, ma'lumotlar tuzilmalari, OOP, Call Stack, rekursiya va O(log n) qidiruv algoritmlarigacha.",
    phasesCount: 20,
    microLessonsCount: 344,
    level: "Boshlang'ichdan Ilg'orgacha",
    coreTopics: [
      "Xotira semantikasi (Heap, is vs ==)",
      "Rekursiya va Call Stack tahlili",
      "O(1), O(n), O(log n) murakkablik",
      "OOP, Generatorlar va Unit Testing",
    ],
    practicalHighlights: "90 ta test + 90 ta mustaqil kod yozish laboratoriyasi",
    visualPreview: {
      type: "python",
      badgeText: "Call Stack & O(log n)",
    },
    accentColor: {
      badge: "bg-amber-950/60 text-amber-300 border-amber-700/50",
      border: "border-amber-500/30",
      hoverBorder: "hover:border-amber-400/80",
      glow: "group-hover:shadow-amber-950/30",
      button: "bg-amber-600 hover:bg-amber-500 text-white",
    },
  },
  {
    id: "ai-engineer",
    tabKey: "ai-engineer",
    title: "AI Engineering",
    tagline: "LLM, Embeddings, RAG va avtonom AI Agentlar arxitekturasi",
    description:
      "Tayyor sun'iy intellekt modellarini biznes tizimlariga integratsiya qilish: Vektorli ma'lumotlar bazasi, ReAct sikli, Tool Calling va Model Context Protocol (MCP).",
    phasesCount: 20,
    microLessonsCount: 291,
    level: "O'rta va Professional",
    coreTopics: [
      "Vektor fazosi & Cosine Similarity",
      "RAG quvurlari (Chunking, Retrieval, Eval)",
      "Avtonom AI Agentlar (ReAct & Tool Calling)",
      "Model Context Protocol (MCP) & Production",
    ],
    practicalHighlights: "6 ta to'liq loyiha: Vektorli qidiruv, Agent va Capstone",
    visualPreview: {
      type: "ai",
      badgeText: "Vector Space & RAG",
    },
    accentColor: {
      badge: "bg-violet-950/60 text-violet-300 border-violet-700/50",
      border: "border-violet-500/30",
      hoverBorder: "hover:border-violet-400/80",
      glow: "group-hover:shadow-violet-950/30",
      button: "bg-violet-600 hover:bg-violet-500 text-white",
    },
  },
  {
    id: "ml-engineer",
    tabKey: "ml-engineer",
    title: "Machine Learning Engineering",
    tagline: "Matematik optimizatsiya, chuqur neyron tarmoqlar va MLOps",
    description:
      "Mashinali o'rganish modellarini matematik poydevordan boshlab yaratish, o'qitish va serverlarga joylashtirish: Gradient Descent, PyTorch, CNN, Transformer va MLOps.",
    phasesCount: 22,
    microLessonsCount: 466,
    level: "Chuqur Muhandislik",
    coreTopics: [
      "Chiziqli algebra, hosila va optimizatsiya",
      "Gradient Descent & Loss Minimization",
      "Deep Learning (MLP, CNN, Transformer)",
      "Model Registry, Drift Monitoring & MLOps",
    ],
    practicalHighlights: "22 ta faza laboratoriyasi: Ridge/Lasso, PyTorch va CI/CD",
    visualPreview: {
      type: "ml",
      badgeText: "Loss Surface & PyTorch",
    },
    accentColor: {
      badge: "bg-cyan-950/60 text-cyan-300 border-cyan-700/50",
      border: "border-cyan-500/30",
      hoverBorder: "hover:border-cyan-400/80",
      glow: "group-hover:shadow-cyan-950/30",
      button: "bg-cyan-600 hover:bg-cyan-500 text-white",
    },
  },
  {
    id: "data-scientist",
    tabKey: "data-scientist",
    title: "Data Science",
    tagline: "Statistik xulosa, A/B eksperimentlar va ma'lumotlar tahlili",
    description:
      "Xom ma'lumotlardan to'g'ri biznes xulosalar chiqarish: Pandas/Polars, Ehtimollar nazariyasi, Markaziy Limit Teoremasi, CUPED bilan A/B test va vaqtli qatorlar tahlili.",
    phasesCount: 23,
    microLessonsCount: 376,
    level: "Tahliliy va Amaliy",
    coreTopics: [
      "Pandas & SQL bilan ma'lumotlarni tozalash",
      "Statistika, Gipotezalar va P-Value",
      "A/B Testing, Variatsiya kamaytirish (CUPED)",
      "EDA, Vizualizatsiya va Eksperiment dizayni",
    ],
    practicalHighlights: "23 ta faza laboratoriyasi: Pandas Aggregation va A/B Test",
    visualPreview: {
      type: "ds",
      badgeText: "Pandas & A/B Testing",
    },
    accentColor: {
      badge: "bg-emerald-950/60 text-emerald-300 border-emerald-700/50",
      border: "border-emerald-500/30",
      hoverBorder: "hover:border-emerald-400/80",
      glow: "group-hover:shadow-emerald-950/30",
      button: "bg-emerald-600 hover:bg-emerald-500 text-white",
    },
  },
];

export function LearningTracksGrid() {
  return (
    <section id="tracks" className="w-full px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-violet-300">
          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
          <span>4 Ta Mustaqil O‘quv Yo‘nalishi</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          O‘zingizga mos AI va Muhandislik yo‘nalishini tanlang
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Har bir yo‘nalish noldan boshlab bosqichma-bosqich tuzilgan. Hech qanday chalkashliksiz — bitta faza, aniq mikro-darslar va interaktiv laboratoriyalar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {FOUR_LEARNING_TRACKS.map((track) => {
          const Icon =
            track.tabKey === "python-dev"
              ? Terminal
              : track.tabKey === "ai-engineer"
              ? Cpu
              : track.tabKey === "ml-engineer"
              ? BarChart3
              : FlaskConical;

          return (
            <div
              key={track.id}
              className={`group relative rounded-3xl bg-slate-900/80 border ${track.accentColor.border} ${track.accentColor.hoverBorder} p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl ${track.accentColor.glow}`}
            >
              <div className="space-y-5">
                {/* Header: Icon, Title & Phase/Lesson Count */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {track.level}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${track.accentColor.badge}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{track.phasesCount} Faza • {track.microLessonsCount} Dars</span>
                  </span>
                </div>

                {/* Tagline & Description */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-200">
                    {track.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                {/* Core Topics Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Asosiy mavzular va ko‘nikmalar:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {track.coreTopics.map((topic, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Highlight Badge */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Amaliyot:</span>
                  <span className="text-slate-200 font-semibold">{track.practicalHighlights}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/roadmap?tab=${track.tabKey}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Yo‘l xaritasini ko‘rish</span>
                </Link>

                <Link
                  href={`/roadmap?tab=${track.tabKey}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${track.accentColor.button}`}
                >
                  <span>Darslarni boshlash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
