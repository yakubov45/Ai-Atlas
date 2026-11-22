"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Code2,
  Cpu,
  FlaskConical,
  FolderGit2,
  Layers,
  Terminal,
} from "lucide-react";
import type { VisualizationInstance } from "@/lib/content/types";
import { PUBLISHED_PRACTICES } from "@/lib/practice/registry";
import { PYTHON_30_DAYS_DATA } from "@/lib/curriculum/python-30-days-data";
import { PRACTICAL_PROJECTS as HOME_PROJECTS } from "@/components/home/PracticalProjectsSection";
import { PRACTICAL_PROJECTS as AI_MILESTONES } from "@/lib/curriculum/ai-engineer";
import { useLearning } from "@/hooks/use-learning";

interface PracticeHubClientProps {
  visualizations: readonly VisualizationInstance[];
}

export function PracticeHubClient({ visualizations }: PracticeHubClientProps) {
  const { state } = useLearning();
  const [sectionFilter, setSectionFilter] = useState<
    "all" | "coding" | "labs" | "projects"
  >("all");

  const passedKeys = useMemo(
    () =>
      new Set(
        Object.entries(state.practiceSubmissions)
          .filter(([, s]) => s.testsPassed)
          .map(([k]) => k.split(":")[0]),
      ),
    [state.practiceSubmissions],
  );

  const groupedLabs = useMemo(() => {
    return [
      {
        group: "Matematika va Hisob (Desmos & Vektor)",
        items: visualizations.filter((v) =>
          ["function-explorer", "cosine-similarity-explorer"].includes(v.id),
        ),
      },
      {
        group: "Machine Learning va Deep Learning",
        items: visualizations.filter((v) =>
          ["gradient-descent-1d", "neural-network-explorer"].includes(v.id),
        ),
      },
      {
        group: "Generative AI, Transformers va RAG",
        items: visualizations.filter((v) =>
          ["self-attention-explorer", "rag-sandbox-explorer", "rag-pipeline-flow"].includes(v.id),
        ),
      },
    ];
  }, [visualizations]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
          <Terminal className="w-4 h-4" />
          <span>Amaliyot, Kodlash va Vizual Laboratoriyalar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Amaliyot &amp; Laboratoriya Markazi
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Brauzerda Pyodide Python interpretatori, 30 kunlik Python mashqlar banki, interaktiv matematik/DL/RAG simulyatorlari va real portfolio loyihalari yagona joyda jamlangan.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { id: "all", label: "Barcha bo'limlar" },
            { id: "coding", label: `Kodlash mashqlari (${PUBLISHED_PRACTICES.length + 1})` },
            { id: "labs", label: `Vizual laboratoriyalar (${visualizations.length + 2})` },
            { id: "projects", label: `Portfolio loyihalari (${HOME_PROJECTS.length + 3})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSectionFilter(tab.id as typeof sectionFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sectionFilter === tab.id
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Coding Exercises & 30 Days of Python */}
      {(sectionFilter === "all" || sectionFilter === "coding") && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-400" />
              <span>Brauzerda Python Mashqlari (Pyodide)</span>
            </h2>
          </div>

          {/* 30 Days of Python Hero Card */}
          <div className="rounded-3xl border border-amber-500/35 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Asosiy Python Trening Banki
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                30 Days of Python — {PYTHON_30_DAYS_DATA.length} Kunlik Interaktiv Bank
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl">
                90 ta test/debugging/bashorat savoli va 90 ta real Pyodide Python kod yozish mashqi (jami 180 ta topshiriq, 900 ball).
              </p>
            </div>
            <Link
              href="/practice/python-30-days"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 shrink-0 transition-colors"
            >
              <span>30 Kunlik Mashqqa O&apos;tish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Canonical Coding Labs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PUBLISHED_PRACTICES.map((prac) => {
              const targetHref = prac.lessonId.startsWith("py-")
                ? `/learn?tab=python-dev&lesson=${prac.lessonId}`
                : prac.lessonId.startsWith("hf-")
                ? `/learn/hugging-face-llm-course`
                : `/learn/${prac.aliases?.[0] ?? prac.lessonId}`;
              const passed = passedKeys.has(prac.lessonId);
              return (
                <Link
                  key={prac.id}
                  href={targetHref}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-500/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                      {prac.lessonId}
                    </span>
                    {passed && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        O&apos;tilgan
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-300 line-clamp-1">
                    {prac.exercise.titleUz}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {prac.objectiveUz}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 2: Subject-Grouped Visual Labs */}
      {(sectionFilter === "all" || sectionFilter === "labs") && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              <span>Interaktiv Vizual Laboratoriyalar</span>
            </h2>
            <div className="flex items-center gap-2">
              <Link
                href="/visual-lab"
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/20"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Desmos &amp; To&apos;liq Vizual Lab</span>
              </Link>
              <Link
                href="/learn/deep-learning-architectures"
                className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-200 hover:bg-violet-500/20"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>16 DL Arxitektura Simulyatori</span>
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            {groupedLabs.map((grp) => (
              <div key={grp.group} className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {grp.group}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {grp.items.map((viz) => (
                    <Link
                      key={viz.id}
                      href={`/visual-lab/${viz.id}`}
                      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-cyan-500/40 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{viz.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300">
                          {viz.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {viz.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: Portfolio & Capstone Projects */}
      {(sectionFilter === "all" || sectionFilter === "projects") && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-emerald-400" />
              <span>Portfolio va Yakuniy Loyihalar</span>
            </h2>
            <Link
              href="/learn/ds-ml-ai-12weeks"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              12-Haftalik 3 Capstone Rejasi →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOME_PROJECTS.map((proj) => (
              <Link
                key={proj.id}
                href={proj.href}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-500/40 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-400">{proj.category}</span>
                  <span className="text-slate-500 font-mono">{proj.phaseTarget}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3">{proj.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>AI Engineer 20-Faza Loyiha Bosqichlari ({AI_MILESTONES.length} ta)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {AI_MILESTONES.map((m) => (
                <Link
                  key={m.id}
                  href={`/roadmap?tab=ai-engineer&phase=${m.phaseIds[0] ?? "01"}`}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-2.5 hover:border-violet-500/40 text-xs space-y-0.5"
                >
                  <div className="font-semibold text-white">
                    #{m.number} {m.title}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {m.phaseRange}: {m.verifiableOutcome}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
