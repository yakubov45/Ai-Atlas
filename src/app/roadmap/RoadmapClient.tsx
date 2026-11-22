"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  Brain,
  Cpu,
  Database,
  List,
  Sliders,
  Terminal,
  Workflow,
  CheckCircle2,
  Clock,
  CircleDot,
  Sparkles,
  ArrowRight,
  Filter,
  TrendingUp,
} from "lucide-react";
import type { LessonSummary } from "@/lib/content/types";
import { RoadmapGraph } from "@/components/roadmap/RoadmapGraph";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { SpecializationSelector } from "@/components/curriculum/SpecializationSelector";
import { AiEngineerExplorer } from "@/components/curriculum/AiEngineerExplorer";
import { MlDsExplorer } from "@/components/curriculum/MlDsExplorer";
import { MachineLearningExplorer } from "@/components/curriculum/MachineLearningExplorer";
import { DataScienceExplorer } from "@/components/curriculum/DataScienceExplorer";
import { PythonDeveloperExplorer } from "@/components/curriculum/PythonDeveloperExplorer";
import { DataEngineeringExplorer } from "@/components/curriculum/DataEngineeringExplorer";
import { PromptEngineeringExplorer } from "@/components/curriculum/PromptEngineeringExplorer";
import { DeepLearningArchitecturesRoadmap } from "@/components/visualizations/DeepLearningArchitecturesRoadmap";
import {
  getLessonRoleInPath,
  SPECIALIZATION_PATHS,
} from "@/lib/curriculum/paths";
import { useLearning } from "@/hooks/use-learning";
import { EmptyState } from "@/components/ui/EmptyState";
import { uz } from "@/i18n/dictionaries/uz";

type RoadmapTab =
  | "list"
  | "ai-engineer"
  | "ml-engineer"
  | "data-scientist"
  | "ml-ds"
  | "python-dev"
  | "data-eng"
  | "prompt-eng"
  | "deep-learning"
  | "graph";

const VALID_TABS = new Set<RoadmapTab>([
  "list",
  "ai-engineer",
  "ml-engineer",
  "data-scientist",
  "ml-ds",
  "python-dev",
  "data-eng",
  "prompt-eng",
  "deep-learning",
  "graph",
]);

export function RoadmapClient({ lessons }: { lessons: readonly LessonSummary[] }) {
  const { state } = useLearning();
  const [view, setView] = useState<RoadmapTab>("ai-engineer");
  const [onlyCorePath, setOnlyCorePath] = useState<boolean>(false);
  const [urlParams, setUrlParams] = useState<{
    tab?: string;
    phase?: string;
    lesson?: string;
    step?: string;
  }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab") || params.get("track");
    const phaseParam = params.get("phase") || undefined;
    const lessonParam = params.get("lesson") || undefined;
    const stepParam = params.get("step") || undefined;

    let targetTab: RoadmapTab = "ai-engineer";

    if (tabParam) {
      if (tabParam === "python" || tabParam === "python-dev") {
        targetTab = "python-dev";
      } else if (tabParam === "ai" || tabParam === "ai-engineer") {
        targetTab = "ai-engineer";
      } else if (tabParam === "ml" || tabParam === "ml-engineer" || tabParam === "mle") {
        targetTab = "ml-engineer";
      } else if (tabParam === "ds" || tabParam === "data-scientist" || tabParam === "data-science") {
        targetTab = "data-scientist";
      } else if (tabParam === "ml-ds") {
        targetTab = "ml-engineer";
      } else if (tabParam === "data" || tabParam === "data-eng") {
        targetTab = "data-eng";
      } else if (tabParam === "prompt" || tabParam === "prompt-eng") {
        targetTab = "prompt-eng";
      } else if (tabParam === "deep-learning" || tabParam === "dl" || tabParam === "architectures") {
        targetTab = "deep-learning";
      } else if (VALID_TABS.has(tabParam as RoadmapTab)) {
        targetTab = tabParam as RoadmapTab;
      }
    } else if (lessonParam) {
      if (lessonParam.startsWith("py-")) {
        targetTab = "python-dev";
      } else if (lessonParam.startsWith("dsx-")) {
        targetTab = "data-scientist";
      } else if (lessonParam.startsWith("mlds-")) {
        targetTab = phaseParam?.startsWith("ds-") ? "data-scientist" : "ml-engineer";
      } else if (lessonParam.includes(".")) {
        targetTab = "ai-engineer";
      }
    } else if (phaseParam) {
      if (phaseParam.startsWith("py-")) {
        targetTab = "python-dev";
      } else if (phaseParam.startsWith("mle-")) {
        targetTab = "ml-engineer";
      } else if (phaseParam.startsWith("ds-")) {
        targetTab = "data-scientist";
      } else if (phaseParam.startsWith("mlds-")) {
        targetTab = "ml-engineer";
      } else if (phaseParam.startsWith("de-")) {
        targetTab = "data-eng";
      } else if (phaseParam.startsWith("pe-")) {
        targetTab = "prompt-eng";
      } else if (/^\d+$/.test(phaseParam)) {
        targetTab = "ai-engineer";
      }
    }

    setView(targetTab);
    setUrlParams({
      tab: targetTab,
      phase: phaseParam,
      lesson: lessonParam,
      step: stepParam,
    });
  }, []);

  const handleTabChange = (nextTab: RoadmapTab) => {
    setView(nextTab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", nextTab);
      // Clean up previous tab's phase/lesson/step when manually switching tabs
      url.searchParams.delete("phase");
      url.searchParams.delete("lesson");
      url.searchParams.delete("step");
      window.history.replaceState(null, "", url.toString());
    }
  };

  const pathStats = useMemo(() => {
    if (!state.selectedPathId) return null;
    let coreCount = 0;
    let supportingCount = 0;
    let optionalCount = 0;

    for (const l of lessons) {
      const r = getLessonRoleInPath(l.slug, state.selectedPathId);
      if (r.role === "core" || r.role === "advanced") coreCount++;
      else if (r.role === "supporting") supportingCount++;
      else optionalCount++;
    }

    const pathMeta = SPECIALIZATION_PATHS.find((p) => p.id === state.selectedPathId);

    return {
      id: state.selectedPathId,
      title: pathMeta?.title ?? state.selectedPathId,
      coreCount,
      supportingCount,
      optionalCount,
      totalTrack: coreCount + supportingCount,
    };
  }, [lessons, state.selectedPathId]);

  const displayedLessons = useMemo(() => {
    if (!state.selectedPathId) return lessons;

    const roleRank: Record<string, number> = {
      core: 1,
      supporting: 2,
      advanced: 3,
      optional: 4,
    };

    let list = [...lessons];
    if (onlyCorePath) {
      list = list.filter((l) => {
        const r = getLessonRoleInPath(l.slug, state.selectedPathId);
        return r.role === "core" || r.role === "supporting" || r.role === "advanced";
      });
    }

    return list.sort((a, b) => {
      const roleA = getLessonRoleInPath(a.slug, state.selectedPathId);
      const roleB = getLessonRoleInPath(b.slug, state.selectedPathId);
      const diff = (roleRank[roleA.role] ?? 9) - (roleRank[roleB.role] ?? 9);
      if (diff !== 0) return diff;
      return a.order - b.order;
    });
  }, [lessons, state.selectedPathId, onlyCorePath]);

  return (
    <div className="space-y-6">
      {/* Top Sequential Learning Path Switcher + Node Status Legend */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-sm sm:text-base font-bold text-slate-100">
              O‘quv Yo‘nalishlari va Interaktiv Dasturlar
            </h2>
            <p className="text-xs text-slate-400">
              Tartibli o‘quv rejasi: Nazariya → Misollar → Test savollari → Brauzerda mustaqil kodlash.
            </p>
          </div>

          {/* Clear 4-State Legend (Available, Completed, In Progress, Planned) */}
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
              <CircleDot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mavjud</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tugatilgan</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <span>Jarayonda</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Rejada</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <button
            type="button"
            onClick={() => handleTabChange("ai-engineer")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "ai-engineer"
                ? "bg-violet-600 text-white font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Engineer (20 Faza • 291 Dars)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("ml-engineer")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "ml-engineer" || view === "ml-ds"
                ? "bg-emerald-600 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>ML Engineer (22 Faza • 466 Dars)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("data-scientist")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "data-scientist"
                ? "bg-sky-600 text-white font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Data Science (23 Faza • 376 Dars)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("deep-learning")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "deep-learning"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Deep Learning (16 Arxitektura • 6 Savol)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("python-dev")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "python-dev"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Python Developer (20 Faza • 344 Dars)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("list")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "list"
                ? "bg-violet-600 text-white font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
            <span>Maqolalar (39 ta)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("data-eng")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "data-eng"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Engineer (20 Faza)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("prompt-eng")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "prompt-eng"
                ? "bg-fuchsia-600 text-white font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Prompt Engineering (20 Faza)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("graph")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              view === "graph"
                ? "bg-violet-600 text-white font-bold shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>{uz.roadmap.graphView}</span>
          </button>
        </div>
      </div>

      {/* Shared Course Module Callout: Hugging Face LLM Course */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/35 via-slate-900/90 to-violet-950/35 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
              🤗 Shared Collection • Hugging Face LLM Course
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              13 Bob • 99 Bo&apos;lim • 220 Mikro-Dars (6 ta mavjud yo&apos;nalish uchun umumiy modul)
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Tanlangan kasbiy yo&apos;nalishga moslashtirilgan trackOverlay (Deep / Supporting / Overview), Tokenizer &amp; Padding Lab va kanonik progress integratsiyasi.
          </p>
        </div>
        <Link
          href={`/learn/hugging-face-llm-course?track=${
            view === "data-scientist"
              ? "data-sci"
              : view === "list" || view === "graph" || view === "ml-ds"
              ? "ai-engineer"
              : view
          }`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shrink-0 self-start sm:self-auto transition-all"
        >
          <span>HF LLM Kursini Ko&apos;rish</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {view === "deep-learning" ? (
        <DeepLearningArchitecturesRoadmap />
      ) : view === "prompt-eng" ? (
        <PromptEngineeringExplorer initialPhaseId={urlParams.phase} />
      ) : view === "data-eng" ? (
        <DataEngineeringExplorer initialPhaseId={urlParams.phase} />
      ) : view === "ml-engineer" ? (
        <MachineLearningExplorer
          initialLessonId={urlParams.lesson || "mlds-17-08"}
          initialPhaseId={urlParams.phase || "mle-08"}
          initialStep={urlParams.step as "theory" | "examples" | "quiz" | "practice" | undefined}
        />
      ) : view === "data-scientist" ? (
        <DataScienceExplorer
          initialLessonId={urlParams.lesson || "mlds-04-09"}
          initialPhaseId={urlParams.phase || "ds-07"}
          initialStep={urlParams.step as "theory" | "examples" | "quiz" | "practice" | undefined}
        />
      ) : view === "ml-ds" ? (
        <MachineLearningExplorer
          initialLessonId={urlParams.lesson || "mlds-17-08"}
          initialPhaseId={urlParams.phase || "mle-08"}
          initialStep={urlParams.step as "theory" | "examples" | "quiz" | "practice" | undefined}
        />
      ) : view === "python-dev" ? (
        <PythonDeveloperExplorer
          initialLessonId={urlParams.lesson || "py-01-01"}
          initialPhaseId={urlParams.phase}
          initialStep={urlParams.step as "theory" | "examples" | "quiz" | "practice" | undefined}
        />
      ) : view === "ai-engineer" ? (
        <AiEngineerExplorer
          initialLessonId={urlParams.lesson || "12.07"}
          initialPhaseId={urlParams.phase}
          initialStep={urlParams.step as "theory" | "examples" | "quiz" | "practice" | undefined}
        />
      ) : (
        <>
          <SpecializationSelector compact />

          {/* Active Specialization Dynamic Filter & Sorting Banner */}
          {pathStats && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-slate-900 to-cyan-950/40 border border-violet-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">
                    Moslashtirilgan O&apos;quv Tartibi: {pathStats.title}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-200 border border-violet-500/40 font-semibold">
                    {pathStats.coreCount} ta Core (Master)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-semibold">
                    {pathStats.supportingCount} ta Tayanch (Understand)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {pathStats.optionalCount} ta Overview (Level 1)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {pathStats.title} mutaxassisligi uchun eng muhim mavzular ro&apos;yxat boshiga saralandi.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setOnlyCorePath((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${onlyCorePath
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                    }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>
                    {onlyCorePath
                      ? `Faqat ${pathStats.title} mavzulari (${pathStats.totalTrack} ta)`
                      : `Barcha 39 ta mavzu (Saralangan)`}
                  </span>
                </button>

                {/* Quick Link to Specialized Interactive 20-Phase Lab */}
                {(pathStats.id === "ml-engineer" ||
                  pathStats.id === "deep-learning" ||
                  pathStats.id === "mlops-engineer") && (
                    <button
                      type="button"
                      onClick={() => setView("ml-ds")}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>ML/DS laboratoriyasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                {(pathStats.id === "llm-engineer" ||
                  pathStats.id === "agent-engineer") && (
                    <button
                      type="button"
                      onClick={() => setView("ai-engineer")}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>AI Engineer laboratoriyasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                {pathStats.id === "data-engineer" && (
                  <button
                    type="button"
                    onClick={() => setView("data-eng")}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Data Eng laboratoriyasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {pathStats.id === "prompt-engineer" && (
                  <button
                    type="button"
                    onClick={() => setView("prompt-eng")}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-fuchsia-600/20 hover:bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/30 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Prompt Eng laboratoriyasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {displayedLessons.length > 0 ? (
            view === "graph" ? (
              <RoadmapGraph lessons={displayedLessons} />
            ) : (
              <RoadmapList
                lessons={displayedLessons}
                selectedPathId={state.selectedPathId}
              />
            )
          ) : (
            <EmptyState
              icon={Workflow}
              title={uz.roadmap.emptyTitle}
              description={uz.roadmap.emptyBody}
            />
          )}
        </>
      )}
    </div>
  );
}
