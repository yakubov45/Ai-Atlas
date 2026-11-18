"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  X,
  BookOpen,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Eye,
  Terminal,
  Cpu,
  BarChart3,
  Database,
  Sliders,
} from "lucide-react";
import type { CategoryWithCount, LessonSummary } from "@/lib/content/types";
import type { Difficulty } from "@/lib/content/schema";
import { LessonCard } from "@/components/lessons/LessonCard";
import { SpecializationSelector } from "@/components/curriculum/SpecializationSelector";
import { PythonDeveloperExplorer } from "@/components/curriculum/PythonDeveloperExplorer";
import { AiEngineerExplorer } from "@/components/curriculum/AiEngineerExplorer";
import { MlDsExplorer } from "@/components/curriculum/MlDsExplorer";
import { MachineLearningExplorer } from "@/components/curriculum/MachineLearningExplorer";
import { DataScienceExplorer } from "@/components/curriculum/DataScienceExplorer";
import { DataEngineeringExplorer } from "@/components/curriculum/DataEngineeringExplorer";
import { PromptEngineeringExplorer } from "@/components/curriculum/PromptEngineeringExplorer";
import { getLessonRoleInPath } from "@/lib/curriculum/paths";
import { useLearning } from "@/hooks/use-learning";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { uz } from "@/i18n/dictionaries/uz";

export type LearnTrackTab =
  | "articles"
  | "python-dev"
  | "ai-engineer"
  | "ml-engineer"
  | "data-scientist"
  | "ml-ds"
  | "data-eng"
  | "prompt-eng";

export interface LearnCatalogClientProps {
  initialLessons: readonly LessonSummary[];
  categories: readonly CategoryWithCount[];
  preview: boolean;
}

export function LearnCatalogClient({
  initialLessons,
  categories,
  preview: _preview,
}: LearnCatalogClientProps) {
  const { state } = useLearning();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "all">("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [pathFilter, setPathFilter] = useState<"all" | "deep-path" | "overview-only">(
    "all",
  );

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    initialLessons.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [initialLessons]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return initialLessons.filter((lesson) => {
      // Specialization Path Role Filter
      if (state.selectedPathId && pathFilter !== "all") {
        const roleInfo = getLessonRoleInPath(lesson.slug, state.selectedPathId);
        if (pathFilter === "deep-path" && roleInfo.role === "optional") return false;
        if (pathFilter === "overview-only" && roleInfo.role !== "optional") return false;
      }
      // Category filter
      if (selectedCategory !== "all" && lesson.category !== selectedCategory) return false;
      // Difficulty filter
      if (selectedDifficulty !== "all" && lesson.difficulty !== selectedDifficulty)
        return false;
      // Tag filter
      if (selectedTag !== "all" && !lesson.tags.includes(selectedTag)) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = lesson.title.toLowerCase().includes(q);
        const matchesDesc = lesson.description.toLowerCase().includes(q);
        const matchesTags = lesson.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [
    initialLessons,
    state.selectedPathId,
    pathFilter,
    selectedCategory,
    selectedDifficulty,
    selectedTag,
    searchQuery,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedDifficulty !== "all" ||
    selectedTag !== "all" ||
    pathFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedTag("all");
    setPathFilter("all");
  };

  const [activeTab, setActiveTab] = useState<LearnTrackTab>("articles");
  const [initialLessonId, setInitialLessonId] = useState<string | undefined>(undefined);
  const [initialPhaseId, setInitialPhaseId] = useState<string | undefined>(undefined);
  const [initialStep, setInitialStep] = useState<"theory" | "examples" | "quiz" | "practice" | undefined>(undefined);

  // Synchronize activeTab and deep links with URL query parameter (?tab=, ?phase=, ?lesson=, ?step=)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tab = (params.get("tab") || params.get("track")) as string | null;
    const lessonParam = params.get("lesson") || params.get("lessonId") || undefined;
    const phaseParam = params.get("phase") || params.get("phaseId") || undefined;
    const stepParam = params.get("step") as "theory" | "examples" | "quiz" | "practice" | null;

    if (lessonParam) setInitialLessonId(lessonParam);
    if (phaseParam) setInitialPhaseId(phaseParam);
    if (stepParam && ["theory", "examples", "quiz", "practice"].includes(stepParam)) {
      setInitialStep(stepParam);
    }

    if (tab) {
      if (tab === "python" || tab === "python-dev") setActiveTab("python-dev");
      else if (tab === "ai" || tab === "ai-engineer") setActiveTab("ai-engineer");
      else if (tab === "ml" || tab === "ml-engineer" || tab === "mle") setActiveTab("ml-engineer");
      else if (tab === "ds" || tab === "data-scientist" || tab === "data-science") setActiveTab("data-scientist");
      else if (tab === "ml-ds") setActiveTab("ml-engineer");
      else if (tab === "data" || tab === "data-eng") setActiveTab("data-eng");
      else if (tab === "prompt" || tab === "prompt-eng") setActiveTab("prompt-eng");
      else if (tab === "articles" || tab === "all") setActiveTab("articles");
    } else if (lessonParam) {
      if (lessonParam.startsWith("py-")) setActiveTab("python-dev");
      else if (lessonParam.startsWith("dsx-")) setActiveTab("data-scientist");
      else if (lessonParam.startsWith("mlds-")) setActiveTab(phaseParam?.startsWith("ds-") ? "data-scientist" : "ml-engineer");
      else if (lessonParam.startsWith("de-")) setActiveTab("data-eng");
      else if (lessonParam.startsWith("pe-")) setActiveTab("prompt-eng");
      else if (/^\d{2}\.\d{2}$/.test(lessonParam)) setActiveTab("ai-engineer");
    } else if (phaseParam) {
      if (phaseParam.startsWith("py-")) setActiveTab("python-dev");
      else if (phaseParam.startsWith("mle-")) setActiveTab("ml-engineer");
      else if (phaseParam.startsWith("ds-")) setActiveTab("data-scientist");
      else if (phaseParam.startsWith("mlds-")) setActiveTab("ml-engineer");
      else if (phaseParam.startsWith("de-")) setActiveTab("data-eng");
      else if (phaseParam.startsWith("pe-")) setActiveTab("prompt-eng");
      else setActiveTab("ai-engineer");
    }
  }, []);

  const handleTabChange = (tab: LearnTrackTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "articles") {
        url.searchParams.delete("tab");
        url.searchParams.delete("track");
      } else {
        url.searchParams.set("tab", tab);
        url.searchParams.delete("track");
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  const TRACK_TABS: readonly {
    id: LearnTrackTab;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
    colorClasses: {
      active: string;
      badgeActive: string;
      badgeInactive: string;
      iconColor: string;
    };
  }[] = [
    {
      id: "articles",
      label: "Barcha Mavzular & Darslar",
      shortLabel: "Mavzular",
      icon: BookOpen,
      badge: `${initialLessons.length} ta dars`,
      colorClasses: {
        active: "bg-slate-800 text-white border-violet-500/60 shadow-lg shadow-violet-950/40",
        badgeActive: "bg-violet-500/20 text-violet-300 border-violet-500/30",
        badgeInactive: "bg-slate-950/60 text-slate-400 border-slate-800",
        iconColor: "text-violet-400",
      },
    },
    {
      id: "python-dev",
      label: "Python Dasturchi",
      shortLabel: "Python",
      icon: Terminal,
      badge: "20 faza • 344 dars",
      colorClasses: {
        active: "bg-amber-950/50 text-amber-200 border-amber-500/60 shadow-lg shadow-amber-950/40",
        badgeActive: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        badgeInactive: "bg-slate-950/60 text-slate-400 border-slate-800",
        iconColor: "text-amber-400",
      },
    },
    {
      id: "ai-engineer",
      label: "AI Engineer",
      shortLabel: "AI Eng",
      icon: Cpu,
      badge: "20 faza • 291 dars",
      colorClasses: {
        active: "bg-violet-950/50 text-violet-200 border-violet-500/60 shadow-lg shadow-violet-950/40",
        badgeActive: "bg-violet-500/20 text-violet-300 border-violet-500/30",
        badgeInactive: "bg-slate-950/60 text-slate-400 border-slate-800",
        iconColor: "text-violet-400",
      },
    },
    {
      id: "ml-engineer",
      label: "Machine Learning Engineer",
      shortLabel: "ML Eng",
      icon: Cpu,
      badge: "22 faza • 466 dars",
      colorClasses: {
        active: "bg-emerald-950/50 text-emerald-200 border-emerald-500/60 shadow-lg shadow-emerald-950/40",
        badgeActive: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        badgeInactive: "bg-slate-950/60 text-slate-400 border-slate-800",
        iconColor: "text-emerald-400",
      },
    },
    {
      id: "data-scientist",
      label: "Data Science & Analytics",
      shortLabel: "Data Sci",
      icon: BarChart3,
      badge: "23 faza • 376 dars",
      colorClasses: {
        active: "bg-sky-950/50 text-sky-200 border-sky-500/60 shadow-lg shadow-sky-950/40",
        badgeActive: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        badgeInactive: "bg-slate-950/60 text-slate-400 border-slate-800",
        iconColor: "text-sky-400",
      },
    },
    {
      id: "data-eng",
      label: "Data Engineer",
      shortLabel: "Data Eng",
      icon: Database,
      badge: "20 faza • 358 dars",
      colorClasses: {
        active: "bg-cyan-950/50 text-cyan-200 border-cyan-500/60 shadow-lg shadow-cyan-950/40",
        badgeActive: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        badgeInactive: "bg-slate-950/60 text-slate-400 border-slate-800",
        iconColor: "text-cyan-400",
      },
    },
    {
      id: "prompt-eng",
      label: "Prompt Engineer",
      shortLabel: "Prompt",
      icon: Sliders,
      badge: "20 faza • 313 dars",
      colorClasses: {
        active: "bg-fuchsia-950/50 text-fuchsia-200 border-fuchsia-500/60 shadow-lg shadow-fuchsia-950/40",
        badgeActive: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
        badgeInactive: "bg-slate-950/60 text-slate-400 border-slate-800",
        iconColor: "text-fuchsia-400",
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Multi-Track Navigation Tabs */}
      <div className="p-2 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex items-center gap-2 overflow-x-auto scrollbar-thin">
        {TRACK_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer border ${
                isActive
                  ? tab.colorClasses.active
                  : "bg-slate-950/50 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800/80"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "" : tab.colorClasses.iconColor}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                  isActive ? tab.colorClasses.badgeActive : tab.colorClasses.badgeInactive
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Conditionally Render Track Explorer or General Articles Catalog */}
      {activeTab === "python-dev" ? (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/30 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Python Developer Poydevori • 20 ta Faza • 344 ta Mikro-Dars</span>
              </div>
              <h2 className="text-xl font-black text-white">
                AI va ML uchun Professional Python Dasturlash Kursi
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Sintaksisdan tortib xotira boshqaruvi, Call Stack, OOP, PyTorch poydevori va Algoritmlargacha.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/practice/python-30-days"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shrink-0 self-start sm:self-auto transition-all shadow-md"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>30 Days of Python Amaliyot Banki</span>
              </Link>
              <Link
                href="/roadmap?tab=python-dev"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 self-start sm:self-auto transition-all"
              >
                <span>Yo&apos;nalish xaritasida ko&apos;rish</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <PythonDeveloperExplorer
            initialLessonId={initialLessonId}
            initialPhaseId={initialPhaseId}
            initialStep={initialStep}
          />
        </div>
      ) : activeTab === "ai-engineer" ? (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-violet-950/40 via-slate-900 to-cyan-950/30 border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-violet-300 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>AI Engineer Yo&apos;nalishi • 20 ta Faza • 291 ta Mikro-Dars</span>
              </div>
              <h2 className="text-xl font-black text-white">
                Zamonaviy AI & LLM Muhandisligi Dasturi
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Vektorlar, Cosine Similarity, RAG, Hit@k, MRR va Avtonom Agentlar arxitekturasi.
              </p>
            </div>
            <Link
              href="/roadmap?tab=ai-engineer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shrink-0 self-start sm:self-auto transition-all"
            >
              <span>Yo&apos;nalish xaritasida ko&apos;rish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <AiEngineerExplorer
            initialLessonId={initialLessonId || "12.07"}
            initialPhaseId={initialPhaseId}
            initialStep={initialStep}
          />
        </div>
      ) : activeTab === "ml-engineer" || activeTab === "ml-ds" ? (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Machine Learning Yo&apos;nalishi • 22 ta Faza • 466 ta Mikro-Dars</span>
              </div>
              <h2 className="text-xl font-black text-white">
                Machine Learning Engineering Dasturi
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Regressiya, klassifikatsiya, optimallashtirish, neyron tarmoqlar va MLOps.
              </p>
            </div>
            <Link
              href="/roadmap?tab=ml-engineer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 self-start sm:self-auto transition-all"
            >
              <span>Yo&apos;nalish xaritasida ko&apos;rish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <MachineLearningExplorer
            initialLessonId={initialLessonId || "mlds-17-08"}
            initialPhaseId={initialPhaseId || "mle-08"}
            initialStep={initialStep}
          />
        </div>
      ) : activeTab === "data-scientist" ? (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/30 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Data Science Yo&apos;nalishi • 23 ta Faza • 376 Asosiy + 50 Taklif Dars</span>
              </div>
              <h2 className="text-xl font-black text-white">
                Data Science & Analytics Dasturi
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                SQL, Pandas, EDA, statistika, A/B testlar, vaqtli qatorlar va vizualizatsiya.
              </p>
            </div>
            <Link
              href="/roadmap?tab=data-scientist"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shrink-0 self-start sm:self-auto transition-all"
            >
              <span>Yo&apos;nalish xaritasida ko&apos;rish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <DataScienceExplorer
            initialLessonId={initialLessonId || "mlds-04-09"}
            initialPhaseId={initialPhaseId || "ds-07"}
            initialStep={initialStep}
          />
        </div>
      ) : activeTab === "data-eng" ? (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/30 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Data Engineer Yo&apos;nalishi • 20 ta Faza • 358 ta Mikro-Dars</span>
              </div>
              <h2 className="text-xl font-black text-white">
                Data Engineering va Katta Ma&apos;lumotlar Quvurlari
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                ETL vs ELT, Idempotent Replay, SCD Type 2, Kafka, Spark va RAG Data Ingestion.
              </p>
            </div>
            <Link
              href="/roadmap?tab=data-eng"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shrink-0 self-start sm:self-auto transition-all"
            >
              <span>Yo&apos;nalish xaritasida ko&apos;rish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <DataEngineeringExplorer initialPhaseId={initialPhaseId} />
        </div>
      ) : activeTab === "prompt-eng" ? (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-fuchsia-950/40 via-slate-900 to-violet-950/30 border border-fuchsia-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-fuchsia-300 text-xs font-bold uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Prompt Engineer Yo&apos;nalishi • 20 ta Faza • 313 ta Mikro-Dars</span>
              </div>
              <h2 className="text-xl font-black text-white">
                Prompt Engineering, Sampling va LLM Alignment
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Temperature, Top-K, Top-P, System Prompts, Red Teaming va Evaluation.
              </p>
            </div>
            <Link
              href="/roadmap?tab=prompt-eng"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold shrink-0 self-start sm:self-auto transition-all"
            >
              <span>Yo&apos;nalish xaritasida ko&apos;rish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <PromptEngineeringExplorer initialPhaseId={initialPhaseId} />
        </div>
      ) : (
        <>
      {/* 1. Specialization Selector & 3-Depth Overview */}
      <SpecializationSelector />

      {/* 2. Featured Flagship Learning Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-fuchsia-950/40 border border-violet-700/50 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Prompt Engineer • 20 ta Faza • 313 ta Mikro-Dars (pe-01..pe-20)</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              🎛️ Prompt Engineering Specialist: Temperature, Top-K, Top-P Sampling (pe-06-06 / pe-07-04), Red Teaming va Calibration
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              20 ta bosqich va 313 ta mikro-dars rejasi: sintetik logitlar (`62.21% / 22.89% / 10.28% / 4.62%`) ustida Temperature, Top-K, Top-P va Frequency Penalty interaktiv laboratoriyasi, Prompt Boundary Escaping hamda Calibration.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleTabChange("prompt-eng")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-violet-950/50 transition-all cursor-pointer"
            >
              <span>20-Fazali Prompt Engineer dasturini ochish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/40 border border-cyan-700/50 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Data Engineer • 20 ta Faza • 358 ta Mikro-Dars (de-01..de-20)</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              🗄️ Data Engineering: ETL vs ELT (de-11-08), Quarantine, SCD Type 2, Kafka va RAG Data Quvurlari
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              20 ta bosqich va 358 ta mikro-dars rejasi: ETL vs ELT interaktiv mini-laboratoriyasi (20 qadam, Decimal hisob-kitob, Quarantine vs Silent Drop, Idempotent Replay), SCD Type 2 va Kafka Partitioning.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleTabChange("data-eng")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
            >
              <span>20-Fazali Data Engineer dasturini ochish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-emerald-950/40 border border-amber-700/50 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Python Developer • 20 ta Faza • 344 ta Mikro-Dars (py-01..py-20)</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              🐍 Python Developer Poydevori: Call Stack (factorial), Reference Semantics va Binary Search
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AI, ML va Data Science uchun umumiy Python poydevori: 20 ta faza, 344 ta mikro-dars, Recursion Call Stack (`factorial(n)`) interaktiv laboratoriyasi va Manim animatsiyasi.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleTabChange("python-dev")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-950/50 transition-all cursor-pointer"
            >
              <span>20-Fazali Python Developer dasturini ochish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/40 border border-emerald-700/50 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>ML & Data Science • 31 ta Faza • 520 ta Mikro-Dars</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              ML Engineer + Data Scientist: Gradient Descent (mlds-11-13), Confusion Matrix va A/B Testing (CUPED)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              3 ta ixtisoslik yo‘nalishi, 31 ta faza, 520 ta atomik mikro-dars, 11 qadamli Gradient Descent darsi hamda Confusion Matrix va CUPED A/B laboratoriyalari.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleTabChange("ml-ds")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <span>31-Fazali ML & DS dasturini ochish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-cyan-950/40 border border-violet-700/50 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Engineer Dasturi • 20 ta Faza • 291 ta Mikro-Dars</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              AI Engineer Roadmap: Vektorlar, Cosine Similarity (12.07), RAG (14.06) va Agentlar
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              6 ta ixtisoslik yo‘nalishi, 20 ta faza, 6 ta amaliy loyiha va 13 qadamli Cosine Similarity hamda RAG Hit@k / MRR interaktiv laboratoriyalari.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleTabChange("ai-engineer")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-violet-950/50 transition-all cursor-pointer"
            >
              <span>20-Fazali AI Engineer dasturini ochish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-violet-950/40 border border-cyan-700/40 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Namuna Learning Path • 20 ta mikro-dars • 5 ta modul</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              Transformer va Self-Attention (Q, K, V) — Interaktiv Mikro-Kurs
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              “Attention Is All You Need” maqolasini 5 ta modul va 20 ta kichik qadamda o‘rganing: Query (Q), Key (K), Value (V) slayderli mini-laboratoriyasi bilan.
            </p>
          </div>
          <div>
            <Link
              href="/learn/transformers"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-950/50 transition-all"
            >
              <span>Transformer 20 ta mikro-darsni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="max-w-md w-full">
          <Input
            icon={<Search className="w-4 h-4" />}
            placeholder={uz.learn.searchLabel}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Deep Learning Path vs Overview Filter (when a path is selected) */}
        {state.selectedPathId && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setPathFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                pathFilter === "all"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Barchasi ({initialLessons.length})
            </button>
            <button
              type="button"
              onClick={() => setPathFilter("deep-path")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                pathFilter === "deep-path"
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Deep Learning Path</span>
            </button>
            <button
              type="button"
              onClick={() => setPathFilter("overview-only")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                pathFilter === "overview-only"
                  ? "bg-cyan-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Overview (Boshqa yo‘nalishlar)</span>
            </button>
          </div>
        )}

        {/* Filter summary and clear */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            {filteredLessons.length} {uz.learn.results}
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
              <span>{uz.common.clearFilters}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
            selectedCategory === "all"
              ? "bg-violet-600 text-white shadow-sm"
              : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
          }`}
        >
          {uz.common.all}
        </button>

        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
                active
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <span>{cat.title}</span>
              <span className="font-mono text-[10px] opacity-70">({cat.lessonCount})</span>
            </button>
          );
        })}
      </div>

      {/* Difficulty & Tag secondary filters */}
      <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
        {/* Difficulty */}
        <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 rounded-lg p-1">
          <span className="text-slate-500 text-[11px] px-2">{uz.learn.difficulty}:</span>
          {(["all", "beginner", "intermediate", "advanced"] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                selectedDifficulty === diff
                  ? "bg-slate-800 text-cyan-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {diff === "all" ? uz.common.all : uz.difficulty[diff]}
            </button>
          ))}
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 rounded-lg p-1 overflow-x-auto">
            <span className="text-slate-500 text-[11px] px-2">{uz.learn.tags}:</span>
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                selectedTag === "all"
                  ? "bg-slate-800 text-violet-300 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {uz.common.all}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedTag === tag
                    ? "bg-slate-800 text-violet-300 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lesson Grid or Empty State */}
      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : initialLessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={uz.learn.noLessonsTitle}
          description={uz.learn.noLessonsBody}
        />
      ) : (
        <EmptyState
          icon={Search}
          title={uz.learn.noResultsTitle}
          description={uz.learn.noResultsBody}
          actionLabel={uz.common.clearFilters}
          onAction={clearFilters}
        />
      )}
        </>
      )}
    </div>
  );
}
