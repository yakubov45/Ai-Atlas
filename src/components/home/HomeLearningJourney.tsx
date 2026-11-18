"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  BarChart3,
  FlaskConical,
  Terminal,
  Database,
  Sliders,
  CheckCircle2,
  Clock,
  PlayCircle,
  Compass,
} from "lucide-react";
import { useLearning } from "@/hooks/use-learning";
import type { SpecializationId } from "@/lib/curriculum/paths";

export interface SixPathCardMeta {
  id: string;
  specializationId: SpecializationId;
  roadmapTab: string;
  title: string;
  oneSentenceDescription: string;
  coreSkills: string[];
  availableContentSummary: string;
  firstLessonHref: string;
  icon: React.ComponentType<{ className?: string }>;
  accentClass: string;
}

export const SIX_LEARNING_PATHS: readonly SixPathCardMeta[] = [
  {
    id: "ai-engineer",
    specializationId: "llm-engineer",
    roadmapTab: "ai-engineer",
    title: "AI Engineer",
    oneSentenceDescription:
      "Katta til modellari (LLM), Embeddings, Vector Database, RAG va avtonom AI agentlarni amaliyotda qurish yo'nalishi.",
    coreSkills: ["Embeddings & Cosine Similarity", "RAG Quvurlari", "AI Agents & MCP", "FastAPI & Production"],
    availableContentSummary: "20 ta faza (291 ta mikro-dars rejasi) • 39 ta tayyor ilmiy maqola + Cosine & RAG laboratoriyalari",
    firstLessonHref: "/learn/artificial-intelligence",
    icon: Cpu,
    accentClass: "border-violet-500/40 hover:border-violet-400",
  },
  {
    id: "ml-engineer",
    specializationId: "ml-engineer",
    roadmapTab: "ml-ds",
    title: "ML Engineer",
    oneSentenceDescription:
      "Mashinali o'rganish algoritmlari, matematik optimizatsiya (Gradient Descent), yo'qotish funksiyalari va model o'qitish muhandisligi.",
    coreSkills: ["Chiziqli Algebra & Hosila", "Gradient Descent", "Loss & Regularization", "Model Evaluation"],
    availableContentSummary: "31 ta faza (520 ta mikro-dars rejasi) • 11 qadamli Gradient Descent va Confusion Matrix laboratoriyalari",
    firstLessonHref: "/learn/machine-learning",
    icon: BarChart3,
    accentClass: "border-cyan-500/40 hover:border-cyan-400",
  },
  {
    id: "data-scientist",
    specializationId: "ml-engineer",
    roadmapTab: "ml-ds",
    title: "Data Scientist",
    oneSentenceDescription:
      "Ehtimollar nazariyasi, statistik xulosa chiqarish, A/B eksperimentlar (CUPED), Markaziy Limit Teoremasi va ma'lumotlar tahlili.",
    coreSkills: ["Ehtimollik & Statistika", "A/B Testing & CUPED", "Central Limit Theorem", "Ratio Metrics & Delta Method"],
    availableContentSummary: "20 ta faza (309 ta navigatsiya tuguni) • CUPED A/B, CLT va Ratio Metrics interaktiv laboratoriyalari",
    firstLessonHref: "/learn/probability",
    icon: FlaskConical,
    accentClass: "border-emerald-500/40 hover:border-emerald-400",
  },
  {
    id: "python-developer",
    specializationId: "mlops-engineer",
    roadmapTab: "python-dev",
    title: "Python Developer",
    oneSentenceDescription:
      "AI, Data va Backend tizimlari uchun zarur bo'lgan toza Python dasturlash, xotira semantikasi, rekursiya va algoritmlar poydevori.",
    coreSkills: ["Call Stack & Recursion", "Reference Semantics (is vs ==)", "Binary Search O(log n)", "Testing & Type Hints"],
    availableContentSummary: "20 ta faza (344 ta mikro-dars rejasi) • factorial(n) Call Stack, Aliasing va Binary Search laboratoriyalari",
    firstLessonHref: "/roadmap?tab=python-dev",
    icon: Terminal,
    accentClass: "border-amber-500/40 hover:border-amber-400",
  },
  {
    id: "data-engineer",
    specializationId: "data-engineer",
    roadmapTab: "data-eng",
    title: "Data Engineer",
    oneSentenceDescription:
      "Xom ma'lumot manbalaridan tortib ETL/ELT quvurlari, Data Warehouse, SCD Type 2, Kafka va RAG ma'lumot infratuzilmasini qurish.",
    coreSkills: ["ETL vs ELT & Quarantine", "SQL & SCD Type 2", "Kafka Partitioning", "dbt, Airflow & Lakehouse"],
    availableContentSummary: "20 ta faza (358 ta mikro-dars rejasi) • 20 qadamli ETL vs ELT, SCD Type 2 va Kafka laboratoriyalari",
    firstLessonHref: "/roadmap?tab=data-eng",
    icon: Database,
    accentClass: "border-sky-500/40 hover:border-sky-400",
  },
  {
    id: "prompt-engineer",
    specializationId: "prompt-engineer",
    roadmapTab: "prompt-eng",
    title: "Prompt Engineering",
    oneSentenceDescription:
      "Til modellariga aniq ko'rsatma berish, Temperature / Top-K / Top-P sampling ehtimolliklarini boshqarish, Red Teaming va baholash.",
    coreSkills: ["Temperature, Top-K & Top-P", "Prompt Anatomy & Escaping", "Few-Shot, CoT & ReAct", "Prompt Eval & Calibration"],
    availableContentSummary: "20 ta faza (313 ta mikro-dars rejasi) • Sintetik Logit Sampling, Prompt Boundary va Calibration laboratoriyalari",
    firstLessonHref: "/learn/prompt-engineering",
    icon: Sliders,
    accentClass: "border-fuchsia-500/40 hover:border-fuchsia-400",
  },
];

export interface HomeLearningJourneyProps {
  publishedLessons: ReadonlyArray<{
    id: string;
    slug: string;
    title: string;
    description: string;
  }>;
}

export function HomeLearningJourney({
  publishedLessons,
}: HomeLearningJourneyProps) {
  const { state, setSelectedPath } = useLearning();

  const lastVisited = state.lastVisited;
  const completedCount = publishedLessons.filter((l) =>
    Boolean(state.completed[l.id])
  ).length;

  const hasReturningState =
    Boolean(lastVisited) || completedCount > 0 || Boolean(state.selectedPathId);

  // Recommend the next uncompleted lesson in canonical order
  const nextRecommendedLesson =
    publishedLessons.find((l) => !state.completed[l.id]) ??
    publishedLessons[0];

  const selectedCareerCard = SIX_LEARNING_PATHS.find(
    (p) => p.specializationId === state.selectedPathId || p.id === state.selectedPathId
  );

  return (
    <div className="space-y-14">
      {/* Returning Student Priority Card ("Qolgan joyimdan davom etish") */}
      {hasReturningState && (
        <section
          aria-label="Qolgan joyimdan davom etish"
          className="w-full px-3 sm:px-5 lg:px-6"
        >
          <div className="rounded-3xl bg-slate-900/90 border border-violet-500/40 p-6 sm:p-8 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <Clock className="w-4 h-4" />
                  <span>Qolgan joyimdan davom etish</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                  {lastVisited
                    ? lastVisited.title
                    : nextRecommendedLesson?.title ?? "O'quv yo'lingizni davom ettiring"}
                </h2>
                {selectedCareerCard && (
                  <p className="text-xs text-slate-400">
                    Tanlangan yo&apos;nalish:{" "}
                    <strong className="text-violet-300">{selectedCareerCard.title}</strong>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={
                    lastVisited
                      ? `/learn/${lastVisited.slug}`
                      : `/learn/${nextRecommendedLesson?.slug ?? "artificial-intelligence"}`
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold shadow-md transition-all"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Qolgan joyimdan davom etish</span>
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <span>Yo&apos;nalish xaritasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
                <div className="text-slate-400">Haqiqiy o&apos;zlashtirish</div>
                <div className="text-sm font-bold text-slate-100">
                  {completedCount} / {publishedLessons.length} ta tayyor maqola yakunlangan
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
                <div className="text-slate-400">Oxirgi faol dars</div>
                <div className="text-sm font-bold text-slate-100 truncate">
                  {lastVisited ? lastVisited.title : "Hali dars ochilmagan"}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
                <div className="text-slate-400">Keyingi tavsiya etilgan dars</div>
                {nextRecommendedLesson ? (
                  <Link
                    href={`/learn/${nextRecommendedLesson.slug}`}
                    className="text-sm font-bold text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1 truncate"
                  >
                    <span className="truncate">{nextRecommendedLesson.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                ) : (
                  <div className="text-sm font-bold text-emerald-300">
                    Barcha asosiy darslar yakunlangan
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6 Learning Path Cards ("Yo'nalishni tanlash") */}
      <section id="choose-path" className="w-full px-3 sm:px-5 lg:px-6 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-violet-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>6 ta Kasbiy O&apos;quv Yo&apos;nalishi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            O&apos;zingizga mos yo&apos;nalishni tanlang
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Har bir yo&apos;nalish noldan boshlab ketma-ket bosqichlarga bo&apos;lingan. Asosiy fanlarni chuqur, yondosh mavzularni esa qisqa umumiy tushuncha (Overview) shaklida o&apos;rganishingiz mumkin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SIX_LEARNING_PATHS.map((path) => {
            const Icon = path.icon;
            const isSelected = state.selectedPathId === path.specializationId;

            return (
              <div
                key={path.id}
                className={`rounded-2xl bg-slate-900/75 border p-6 flex flex-col justify-between gap-5 transition-all ${path.accentClass}`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-[11px] font-semibold text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        Tanlangan
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-100">
                      {path.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {path.oneSentenceDescription}
                    </p>
                  </div>

                  {/* Core Skills */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Asosiy ko&apos;nikmalar:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {path.coreSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 leading-snug">
                    {path.availableContentSummary}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/roadmap?tab=${path.roadmapTab}`}
                      onClick={() => setSelectedPath(path.specializationId)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors"
                    >
                      <span>{isSelected ? "Xaritadan davom etish" : "Yo'nalishni boshlash"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={path.firstLessonHref}
                      onClick={() => setSelectedPath(path.specializationId)}
                      className="px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
                    >
                      1-dars
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
