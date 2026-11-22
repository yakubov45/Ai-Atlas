"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  FolderGit2,
  Layers,
  LayoutDashboard,
  Network,
  PlayCircle,
  Sparkles,
  Target,
} from "lucide-react";
import type { LessonSummary } from "@/lib/content/types";
import { useLearning } from "@/hooks/use-learning";
import type { ContentAuditSummary } from "@/lib/learning-os/catalog";
import {
  computeUnifiedProgressStats,
  detectKnowledgeGaps,
  isCanonicalItemCompleted,
} from "@/lib/learning-os/progress-sync";
import { SPECIALIZATION_PATHS, type SpecializationId } from "@/lib/curriculum/paths";
import { GLOBAL_ROADMAP_NODES } from "@/lib/learning-os/global-roadmap";
import { PRACTICAL_PROJECTS as HOME_PROJECTS } from "@/components/home/PracticalProjectsSection";

interface DashboardClientProps {
  publishedLessons: readonly LessonSummary[];
  auditSummary: ContentAuditSummary;
}

export function DashboardClient({
  publishedLessons,
  auditSummary,
}: DashboardClientProps) {
  const {
    state,
    setSelectedPath,
    toggleConceptKnown,
    isConceptKnown,
  } = useLearning();

  const publishedIds = useMemo(
    () => publishedLessons.map((l) => l.id),
    [publishedLessons],
  );

  const stats = useMemo(
    () => computeUnifiedProgressStats(state, publishedIds),
    [state, publishedIds],
  );

  const knowledgeGaps = useMemo(() => detectKnowledgeGaps(state), [state]);

  const activePath = useMemo(
    () => SPECIALIZATION_PATHS.find((p) => p.id === state.selectedPathId) ?? null,
    [state.selectedPathId],
  );

  const recommendedNextNodes = useMemo(() => {
    return GLOBAL_ROADMAP_NODES.filter(
      (node) =>
        !isCanonicalItemCompleted(state, node.canonicalConceptId) &&
        !isConceptKnown(node.canonicalConceptId),
    ).slice(0, 4);
  }, [state, isConceptKnown]);

  const bookmarkedLessons = useMemo(() => {
    const lessonKeys = new Set(
      Object.values(state.bookmarks)
        .filter((b) => b.kind === "lesson")
        .map((b) => b.id),
    );
    return publishedLessons.filter(
      (l) => lessonKeys.has(l.id) || lessonKeys.has(l.slug),
    );
  }, [state.bookmarks, publishedLessons]);

  const hasAnyProgress =
    stats.uniqueCompletedCount > 0 ||
    stats.knownConceptsCount > 0 ||
    stats.passedExercisesCount > 0 ||
    stats.bookmarksCount > 0 ||
    Boolean(state.lastVisited);

  const mdxPercent =
    publishedLessons.length > 0
      ? Math.round((stats.mdxCompletedCount / publishedLessons.length) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* 1. Top Personal Action / Continue Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 p-6 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <LayoutDashboard className="w-4 h-4" />
              <span>Shaxsiy AI O&apos;quv Boshqaruv Markazi</span>
            </span>
            {activePath && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-200">
                Yo&apos;nalish: {activePath.title}
              </span>
            )}
          </div>

          {state.lastVisited ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">Oxirgi o&apos;qilgan mavzu:</p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {state.lastVisited.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/learn/${state.lastVisited.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>O&apos;qishni davom ettirish</span>
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Global Roadmapda ko&apos;rish</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {hasAnyProgress
                  ? "Keyingi o'quv qadamingizni tanlang"
                  : "AI Atlas bilan tizimli o'rganishni boshlang"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {hasAnyProgress
                  ? "Sizning yakunlangan darslaringiz va bilgan tushunchalaringiz kanonik kalitlar bo'yicha birlashtirilib hisoblanmoqda."
                  : "Hali birorta dars tugatilmagan yoki ochilmagan. Sun'iy progress raqamlari ko'rsatilmaydi — Global Roadmap yoki Kutubxonadan birinchi qadamni boshlang."}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg"
                >
                  <Compass className="w-4 h-4" />
                  <span>Global Roadmap (10 bosqich)</span>
                </Link>
                <Link
                  href="/learn/python-basics"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>1-dars: Python Asoslari</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Career Focus Selector */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-300">
            <Target className="w-4 h-4" />
            <span>Maqsadli Yo&apos;nalish</span>
          </div>
          <p className="text-xs text-slate-400">
            Tanlangan yo&apos;nalish bo&apos;yicha tavsiya etiladigan mavzular va bo&apos;shliqlar moslashadi.
          </p>
          <select
            value={state.selectedPathId ?? ""}
            onChange={(e) =>
              setSelectedPath((e.target.value || null) as SpecializationId | null)
            }
            aria-label="Maqsadli yo'nalishni tanlash"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">Yo&apos;nalish tanlanmagan (Umumiy)</option>
            {SPECIALIZATION_PATHS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          {activePath && (
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {activePath.description}
            </p>
          )}
        </div>
      </div>

      {/* 2. Verified Deduplicated Progress KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">
            Yagona tugatilgan mavzular
          </span>
          <div className="text-2xl font-black text-emerald-300 font-mono">
            {stats.uniqueCompletedCount}
          </div>
          <span className="text-[10px] text-slate-500 block">
            Dublikatlarsiz kanonik hisob
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">
            Kanonik MDX Darslar
          </span>
          <div className="text-2xl font-black text-cyan-300 font-mono">
            {stats.mdxCompletedCount}
            <span className="text-xs font-normal text-slate-500">/{publishedLessons.length}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mt-1">
            <div
              className="h-full bg-cyan-500 transition-all"
              style={{ width: `${mdxPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">
            Mikro-darslar (Akademiya)
          </span>
          <div className="text-2xl font-black text-violet-300 font-mono">
            {stats.microCompletedCount}
          </div>
          <span className="text-[10px] text-slate-500 block">
            HF, Python, AI, ML, DS
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">
            Allaqachon bilaman
          </span>
          <div className="text-2xl font-black text-amber-300 font-mono">
            {stats.knownConceptsCount}
          </div>
          <span className="text-[10px] text-slate-500 block">
            Tugatilgandan alohida saqlanadi
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1 col-span-2 md:col-span-1">
          <span className="text-[11px] font-medium text-slate-400 block">
            O&apos;tgan Pyodide mashqlar
          </span>
          <div className="text-2xl font-black text-sky-300 font-mono">
            {stats.passedExercisesCount}
          </div>
          <span className="text-[10px] text-slate-500 block">
            Saqlanganlar: {stats.bookmarksCount}
          </span>
        </div>
      </div>

      {/* 3. Knowledge Gaps & Recommended Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 rounded-3xl border border-amber-500/25 bg-slate-900/60 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Bilim Bo&apos;shliqlari Tahlili (Knowledge Gaps)</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {knowledgeGaps.length} ta tavsiya
            </span>
          </div>

          {knowledgeGaps.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400 leading-relaxed">
              Hozirgi o&apos;quv kontekstingizda aniqlangan oldingi shart (prerequisite) bo&apos;shliqlari yo&apos;q. Istalgan mavzuni ochsangiz, uning talab qilinadigan poydevor darslari shu yerda tahlil qilinadi.
            </div>
          ) : (
            <div className="space-y-2.5">
              {knowledgeGaps.map((gap) => (
                <div
                  key={gap.conceptId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/75 p-3.5"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-white">{gap.conceptNameUz}</div>
                    <div className="text-[11px] text-slate-400">
                      <span className="text-amber-300/90">{gap.requiredForUz}</span> uchun tavsiya etilgan poydevor
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleConceptKnown(gap.conceptId)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-300 hover:border-amber-500/50 hover:text-amber-200 cursor-pointer"
                    >
                      Bilaman
                    </button>
                    <Link
                      href={gap.href}
                      className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/40 px-2.5 py-1 text-[11px] font-semibold text-amber-200 hover:bg-amber-500/25"
                    >
                      <span>O&apos;rganish</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Tavsiya Etiladigan Keyingi Bosqichlar</span>
            </h3>
            <Link
              href="/roadmap"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Barcha 10 bosqich →
            </Link>
          </div>

          <div className="space-y-2.5">
            {recommendedNextNodes.map((node) => (
              <Link
                key={node.id}
                href={node.associatedLessons[0]?.href ?? "/roadmap"}
                className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/75 p-3.5 hover:border-cyan-500/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {node.titleUz}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {node.whyItMattersUz}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 shrink-0">
                  ~{node.estimatedMinutes} daq
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bookmarks & Portfolio Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-violet-400" />
              <span>Saqlangan darslar</span>
            </h3>
            <Link href="/bookmarks" className="text-xs text-violet-400 hover:text-violet-300">
              Barchasi →
            </Link>
          </div>
          {bookmarkedLessons.length === 0 ? (
            <p className="text-xs text-slate-500">
              Hali saqlangan darslar yo&apos;q. Istalgan dars sahifasidagi &ldquo;Saqlash&rdquo; tugmasi orqali qo&apos;shing.
            </p>
          ) : (
            <div className="space-y-2">
              {bookmarkedLessons.slice(0, 5).map((l) => (
                <Link
                  key={l.id}
                  href={`/learn/${l.slug}`}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-200 hover:border-violet-500/40"
                >
                  <span className="truncate font-medium">{l.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-emerald-400" />
              <span>Amaliy Loyihalar va Portfolio</span>
            </h3>
            <Link href="/practice" className="text-xs text-emerald-400 hover:text-emerald-300">
              Amaliyot Hub →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HOME_PROJECTS.slice(0, 4).map((proj) => (
              <Link
                key={proj.id}
                href={proj.href}
                className="rounded-2xl border border-slate-800 bg-slate-950/75 p-3 hover:border-emerald-500/40 transition-colors space-y-1"
              >
                <span className="text-[10px] font-semibold uppercase text-emerald-400">
                  {proj.category} • {proj.phaseTarget}
                </span>
                <div className="text-xs font-bold text-white line-clamp-1">{proj.title}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{proj.deliverable}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Verified Content Registry Audit */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Platforma Kontent Reestri (Haqiqiy Nashr Holati)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Faqat haqiqiy ishlaydigan darslar &ldquo;Nashr etilgan&rdquo;, skaffold tugunlari esa ochiqchasiga &ldquo;Rejalashtirilgan (Planned)&rdquo; deb ko&apos;rsatiladi.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span>{auditSummary.mdxLessons.published} MDX</span>
            <span>•</span>
            <span>{auditSummary.hfAudit.publishedLessonsCount} HF LLM</span>
            <span>•</span>
            <span>{auditSummary.glossaryTermsCount} Glossariy</span>
            <span>•</span>
            <span>{auditSummary.visualLabsCount} Vizual Lab</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {auditSummary.coursesAndTracks.map((course) => (
            <Link
              key={course.id}
              href={course.href}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5 hover:border-slate-600 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white truncate">{course.titleUz}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 shrink-0">
                  {course.publishedItems}/{course.totalItems}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">{course.honestStatusNoteUz}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
