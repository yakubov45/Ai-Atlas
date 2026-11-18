"use client";

import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Terminal,
  Cpu,
  BarChart3,
  FlaskConical,
  ArrowRight,
  Code2,
  Layers,
  Sparkles,
} from "lucide-react";

export interface PracticalProject {
  id: string;
  title: string;
  category: "Python" | "AI Engineer" | "ML Engineer" | "Data Science";
  trackTab: "python-dev" | "ai-engineer" | "ml-engineer" | "data-scientist";
  phaseTarget: string;
  description: string;
  technologies: string[];
  deliverable: string;
  href: string;
}

export const PRACTICAL_PROJECTS: readonly PracticalProject[] = [
  {
    id: "proj-python-cli",
    title: "Python Xotira Xavfsizligi va CLI Boshqaruv Dasturi",
    category: "Python",
    trackTab: "python-dev",
    phaseTarget: "Faza 10: Mini-loyiha",
    description:
      "Call Stack chuqurligini o‘lchovchi, xotira bo‘yicha is vs == xatolarini tekshiruvchi va algoritmik samaradorlikni (O(1) vs O(n)) taqqoslovchi mustaqil konsol utilitasi.",
    technologies: ["Python 3.12", "Call Stack", "Type Hints", "pytest"],
    deliverable: "Mustaqil CLI modul va avtomatlashtirilgan testlar",
    href: "/roadmap?tab=python-dev",
  },
  {
    id: "proj-rag-vector-search",
    title: "RAG Qidiruv Tizimi va Manba Ko‘rsatish (Citation Engine)",
    category: "AI Engineer",
    trackTab: "ai-engineer",
    phaseTarget: "Faza 12-15: Vektorlar & RAG",
    description:
      "Hujjatlarni semantik qismlarga (chunking) ajratish, Cosine Similarity orqali relevant qismlarni topish va javoblarni havola (citation) bilan qaytarish quvuri.",
    technologies: ["Embeddings", "Cosine Similarity", "Vector DB", "FastAPI"],
    deliverable: "Grounded RAG tizimi va aniqlik baholash kodi",
    href: "/roadmap?tab=ai-engineer",
  },
  {
    id: "proj-react-agent-mcp",
    title: "Avtonom ReAct AI Agent va Model Context Protocol (MCP)",
    category: "AI Engineer",
    trackTab: "ai-engineer",
    phaseTarget: "Faza 17: AI Agentlar & MCP",
    description:
      "Tashqi API, fayllar va hisoblash vositalarini mustaqil chaqiruvchi (Tool Calling), ko‘p qadamli fikrlash sikli (Thought-Action-Observation) va ruxsatlar bilan ishlovchi agent.",
    technologies: ["ReAct Loop", "MCP Tools", "JSON Schema", "Structured Output"],
    deliverable: "Interaktiv Tool Calling agent servisi",
    href: "/roadmap?tab=ai-engineer",
  },
  {
    id: "proj-ridge-lasso-benchmark",
    title: "Ko‘p O‘lchovli Regressiya va Ridge / Lasso Regularizatsiya",
    category: "ML Engineer",
    trackTab: "ml-engineer",
    phaseTarget: "Faza 08: Chiziqli Modellar",
    description:
      "Multicollinearity va overfitting muammosini L1 (Lasso) va L2 (Ridge) chto'qirish parametrlari yordamida hal qilish hamda MSE / R² koeffitsientlarini tahlil qilish.",
    technologies: ["Gradient Descent", "L1 / L2 Penalty", "Scikit-Learn", "Matplotlib"],
    deliverable: "Regularizatsiya koeffitsientlarini sinovchi laboratoriya",
    href: "/roadmap?tab=ml-engineer",
  },
  {
    id: "proj-pandas-eda-dashboard",
    title: "Katta Ma‘lumotlar Tahlili va Guruhlash (EDA Notebook)",
    category: "Data Science",
    trackTab: "data-scientist",
    phaseTarget: "Faza 07: Ma‘lumotlar Wrangling",
    description:
      "Xom ma‘lumotlar to‘plamidan yetishmayotgan qiymatlarni tozalash, ko‘p darajali GroupBy va Pivot jadvallar tuzish hamda anomal ko‘rsatkichlarni (Outliers) aniqlash.",
    technologies: ["Pandas", "Polars", "Aggregation", "Data Visualization"],
    deliverable: "Tozalangan ma‘lumotlar quvuri va statistik xulosa",
    href: "/roadmap?tab=data-scientist",
  },
  {
    id: "proj-ab-testing-cuped",
    title: "A/B Eksperiment Tizimi va CUPED Variatsiya Qisqartirish",
    category: "Data Science",
    trackTab: "data-scientist",
    phaseTarget: "Faza 12: Eksperimentlar",
    description:
      "Statistik gipotezalarni tekshirish (p-value, t-test) va eksperiment muddatini 3 barobargacha qisqartiruvchi kovariantlar yordamida CUPED tahlili.",
    technologies: ["Hypothesis Testing", "CUPED", "P-Value", "Statistical Power"],
    deliverable: "Ishonchli A/B tahlil moduli",
    href: "/roadmap?tab=data-scientist",
  },
];

export function PracticalProjectsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-violet-400">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Portfobio Loyihalari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Nazariya emas — Haqiqiy dasturlash loyihalari
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            O‘quv dasturining har bir asosiy fazasida o‘rgangan bilimlaringizni real ishlab chiqarish darajasidagi loyihalarda qo‘llaysiz.
          </p>
        </div>

        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 shrink-0"
        >
          <span>Barcha yo‘nalish loyihalarini ko‘rish</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRACTICAL_PROJECTS.map((proj) => {
          const Icon =
            proj.trackTab === "python-dev"
              ? Terminal
              : proj.trackTab === "ai-engineer"
              ? Cpu
              : proj.trackTab === "ml-engineer"
              ? BarChart3
              : FlaskConical;

          return (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between space-y-5 transition-all hover:bg-slate-900 shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{proj.category}</span>
                  </span>
                  <span className="text-[11px] font-mono text-violet-300">
                    {proj.phaseTarget}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[10px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
                    <strong className="text-emerald-400">Natija:</strong> {proj.deliverable}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  href={proj.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <span>Yo‘nalishda loyihani ochish</span>
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
