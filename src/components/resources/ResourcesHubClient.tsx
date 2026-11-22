"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookMarked,
  BookOpen,
  ExternalLink,
  FileText,
  Library,
  Search,
  Sparkles,
  Video,
} from "lucide-react";
import type { LessonSummary, Reference } from "@/lib/content/types";
import { EDUCATIONAL_VIDEOS, YOUTUBE_CATALOG_VIDEOS } from "@/lib/media/educational-videos";
import { SIXTEEN_ARCHITECTURES } from "@/lib/curriculum/deep-learning-16-architectures";

interface ResourcesHubClientProps {
  lessons: readonly LessonSummary[];
  references: readonly Reference[];
  glossaryCount: number;
}

export function ResourcesHubClient({
  lessons,
  references,
  glossaryCount,
}: ResourcesHubClientProps) {
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState<"all" | "uz" | "ru" | "en">("all");
  const [activeTab, setActiveTab] = useState<"all" | "papers" | "videos" | "articles">(
    "all",
  );

  const q = query.trim().toLowerCase();

  const filteredReferences = useMemo(() => {
    if (!q) return references;
    return references.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.authors.some((a) => a.toLowerCase().includes(q)) ||
        (r.venue?.toLowerCase().includes(q) ?? false),
    );
  }, [references, q]);

  const filteredArchPapers = useMemo(() => {
    if (!q) return SIXTEEN_ARCHITECTURES;
    return SIXTEEN_ARCHITECTURES.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.paper.title.toLowerCase().includes(q) ||
        a.paper.authors.toLowerCase().includes(q) ||
        a.year.toString().includes(q),
    );
  }, [q]);

  const filteredYoutube = useMemo(() => {
    return YOUTUBE_CATALOG_VIDEOS.filter((v) => {
      const matchesLang = langFilter === "all" || v.language === langFilter;
      const matchesQ =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.topicTitle.toLowerCase().includes(q) ||
        v.channelTitle.toLowerCase().includes(q);
      return matchesLang && matchesQ;
    });
  }, [langFilter, q]);

  const filteredArticles = useMemo(() => {
    if (!q) return lessons;
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [lessons, q]);

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
          <Library className="w-4 h-4" />
          <span>Ilmiy Maqolalar, Videolar, Glossariy va Konspektlar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Resurslar Markazi
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          AI Atlas ekotizimidagi barcha ilmiy manbalar ({references.length + SIXTEEN_ARCHITECTURES.length} maqola), Manim va YouTube darslar ({EDUCATIONAL_VIDEOS.length + YOUTUBE_CATALOG_VIDEOS.length} video), {lessons.length} kanonik konspekt va {glossaryCount} glossariy atamasi.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Maqola, muallif, video yoki dars nomi..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "Barchasi" },
              { id: "papers", label: `Ilmiy Maqolalar (${filteredReferences.length + filteredArchPapers.length})` },
              { id: "videos", label: `Videolar (${EDUCATIONAL_VIDEOS.length + filteredYoutube.length})` },
              { id: "articles", label: `Kanonik Konspektlar (${filteredArticles.length})` },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  activeTab === t.id
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Shortcuts to Glossary & Bookmarks */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/35 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-200 hover:bg-violet-500/20"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>AI Glossariysi ({glossaryCount} atama)</span>
          </Link>
          <Link
            href="/bookmarks"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/20"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Saqlangan darslar va lablar</span>
          </Link>
          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20"
          >
            <Video className="w-3.5 h-3.5" />
            <span>To&apos;liq Video Katalogi</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: Research Papers & Foundational Literature */}
      {(activeTab === "all" || activeTab === "papers") && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Ilmiy Maqolalar va Kanonik Manbalar</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredReferences.map((ref) => (
              <div
                key={ref.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-mono text-amber-300 uppercase">{ref.type}</span>
                  <span className="text-slate-500 font-mono">{ref.year ?? "—"}</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{ref.title}</h3>
                {ref.authors.length > 0 && (
                  <p className="text-xs text-slate-400">{ref.authors.join(", ")}</p>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <span className="text-slate-500 truncate">{ref.venue ?? ref.sourceDocument ?? ""}</span>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold shrink-0"
                    >
                      <span>Manbani ochish</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>16 Fundamental Deep Learning Maqolasi (1958–2023)</span>
              </h3>
              <Link
                href="/learn/deep-learning-architectures"
                className="text-xs text-violet-300 hover:text-white font-semibold"
              >
                Interaktiv xarita →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {filteredArchPapers.map((arch) => (
                <Link
                  key={arch.id}
                  href="/learn/deep-learning-architectures"
                  className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 hover:border-violet-500/40 space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-300">
                    <span>#{arch.number} {arch.name}</span>
                    <span>{arch.year}</span>
                  </div>
                  <div className="text-xs font-semibold text-white line-clamp-2">
                    {arch.paper.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {arch.paper.authors}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: Self-hosted Manim + Curated YouTube Videos */}
      {(activeTab === "all" || activeTab === "videos") && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-400" />
              <span>Videolar Kutubxonasi ({EDUCATIONAL_VIDEOS.length} Manim + {filteredYoutube.length} YouTube)</span>
            </h2>
            <div className="flex gap-1.5">
              {(["all", "uz", "ru", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLangFilter(lang)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase cursor-pointer ${
                    langFilter === lang
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-900 border border-slate-800 text-slate-400"
                  }`}
                >
                  {lang === "all" ? "Barcha tillar" : lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EDUCATIONAL_VIDEOS.map((vid) => (
              <Link
                key={vid.id}
                href={vid.lessonId ? `/learn/${vid.lessonId}` : "/videos"}
                className="rounded-2xl border border-emerald-500/25 bg-slate-900/60 p-4 hover:border-emerald-400 space-y-1.5"
              >
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                  Manim Animatsiya • {vid.trackTitle}
                </span>
                <div className="text-xs font-bold text-white">{vid.title}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{vid.description}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredYoutube.slice(0, 12).map((vid) => (
              <a
                key={vid.id}
                href={vid.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-800 bg-slate-950/75 p-3 hover:border-cyan-500/40 space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-mono uppercase text-cyan-300">{vid.language}</span>
                  <span className="truncate max-w-[160px]">{vid.channelTitle}</span>
                </div>
                <div className="text-xs font-semibold text-slate-100 line-clamp-2">{vid.title}</div>
                <div className="text-[10px] text-slate-400">{vid.topicTitle}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: 41 Core Knowledge Articles */}
      {(activeTab === "all" || activeTab === "articles") && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <span>Kanonik Ilmiy Konspektlar ({filteredArticles.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredArticles.map((l) => (
              <Link
                key={l.id}
                href={`/learn/${l.slug}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-violet-500/40 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="uppercase font-mono text-violet-300">{l.category}</span>
                  <span>{l.readingMinutes} daq</span>
                </div>
                <h3 className="text-xs font-bold text-white">{l.title}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">{l.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
