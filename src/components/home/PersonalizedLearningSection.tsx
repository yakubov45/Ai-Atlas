"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  PlayCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { useLearning } from "@/hooks/use-learning";

export interface PersonalizedLearningSectionProps {
  publishedLessons: ReadonlyArray<{
    id: string;
    slug: string;
    title: string;
    description: string;
  }>;
}

export function PersonalizedLearningSection({
  publishedLessons,
}: PersonalizedLearningSectionProps) {
  const { state } = useLearning();

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

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      {hasReturningState ? (
        /* Authenticated / Returning User View */
        <div className="rounded-3xl bg-slate-900/90 border border-violet-500/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Clock className="w-4 h-4" />
                <span>Shaxsiy Ta&apos;lim Paneli • Qolgan joyingizdan davom eting</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                {lastVisited
                  ? lastVisited.title
                  : nextRecommendedLesson?.title ?? "O‘quv yo‘lingizni davom ettiring"}
              </h2>
              {state.selectedPathId && (
                <p className="text-xs text-slate-400">
                  Tanlangan ixtisoslik:{" "}
                  <strong className="text-violet-300 uppercase">
                    {state.selectedPathId}
                  </strong>
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
                <span>Darsga o‘tish</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-xs font-semibold text-cyan-200 transition-colors"
              >
                <span>Dashboard</span>
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
              >
                <span>Xarita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
              <div className="text-slate-400">Haqiqiy o‘zlashtirish</div>
              <div className="text-sm font-bold text-slate-100">
                {completedCount} / {publishedLessons.length} ta nashr etilgan dars
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
              <div className="text-slate-400">Oxirgi kirilgan dars</div>
              <div className="text-sm font-bold text-slate-100 truncate">
                {lastVisited ? lastVisited.title : "Hali dars ochilmagan"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
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
                  Barcha darslar yakunlangan!
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Guest / First-time Visitor Discovery View */
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ochiq Ta&apos;lim & Erkin Kirish</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Hech qanday to‘siqlarsiz o‘rganishni hoziroq boshlang
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Barcha {publishedLessons.length} ta ilmiy maqola, 1,400+ ta mikro-dars yo‘l xaritasi, interaktiv vizual laboratoriyalar va Manim videolari bepul va ochiq.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Darslar katalogi</span>
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Yo‘nalish xaritasi</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
