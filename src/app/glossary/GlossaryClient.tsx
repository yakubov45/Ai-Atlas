"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  Calculator,
  X,
  ExternalLink,
} from "lucide-react";
import type { GlossaryTerm } from "@/lib/content/types";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { renderLatexToHtml } from "@/components/visualizations/FormulaDisplay";
import { uz } from "@/i18n/dictionaries/uz";

const CATEGORIES = [
  "Barchasi",
  "AI Asoslari",
  "Modellar & Arxitektura",
  "Agentic AI & Avtomatlashtirish",
  "LLM & Generative AI",
  "Data & O‘qitish",
  "MLOps & Ishga Tushirish",
  "AI Xavfsizlik & Etika",
  "AI Imkoniyatlari",
  "Frontier & Ilg‘or Texnologiyalar",
  "Machine Learning",
  "Deep Learning",
  "Prompt Engineering",
  "AI Engineer",
  "Data Engineering",
  "Matematika",
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

const LEVEL_CONFIG: Record<
  string,
  { label: string; badgeClass: string; dotClass: string }
> = {
  beginner: {
    label: "Boshlang‘ich",
    badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
    dotClass: "bg-emerald-400",
  },
  intermediate: {
    label: "O‘rta daraja",
    badgeClass: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
    dotClass: "bg-cyan-400",
  },
  advanced: {
    label: "Chuqur / Master",
    badgeClass: "bg-violet-950/80 text-violet-300 border-violet-500/40",
    dotClass: "bg-violet-400",
  },
};

export function GlossaryClient({ terms }: { terms: readonly GlossaryTerm[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Barchasi");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");
  const [activeModalTerm, setActiveModalTerm] = useState<GlossaryTerm | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalTerm(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Barchasi: terms.length };
    for (const term of terms) {
      const cat = term.category ?? "Boshqa";
      counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return counts;
  }, [terms]);

  // Compute available letters
  const letters = useMemo(() => {
    const set = new Set<string>();
    terms.forEach((t) => {
      const first = t.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) set.add(first);
    });
    return Array.from(set).sort();
  }, [terms]);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      // Category filter
      if (selectedCategory !== "Barchasi") {
        if (term.category !== selectedCategory) return false;
      }

      // Letter filter
      if (selectedLetter !== "all") {
        const first = term.term.charAt(0).toUpperCase();
        if (first !== selectedLetter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTerm = term.term.toLowerCase().includes(q);
        const matchesTrans = term.translation?.toLowerCase().includes(q);
        const matchesBody = term.plainText.toLowerCase().includes(q);
        const matchesSimple = term.simpleDefinition?.toLowerCase().includes(q);
        const matchesTech = term.technicalExplanation?.toLowerCase().includes(q);
        const matchesAliases = term.aliases.some((a) => a.toLowerCase().includes(q));
        if (
          !matchesTerm &&
          !matchesTrans &&
          !matchesBody &&
          !matchesSimple &&
          !matchesTech &&
          !matchesAliases
        ) {
          return false;
        }
      }

      return true;
    });
  }, [terms, selectedCategory, selectedLetter, searchQuery]);

  // Quick lookup map for related terms
  const termMap = useMemo(() => {
    return new Map(terms.map((t) => [t.id, t]));
  }, [terms]);

  return (
    <div className="space-y-6">
      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin text-xs">
        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] ?? 0;
          if (cat !== "Barchasi" && count === 0) return null;
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${isSelected
                ? "bg-violet-600 text-white shadow-md shadow-violet-900/30"
                : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected
                  ? "bg-white/20 text-white"
                  : "bg-slate-950 text-slate-400"
                  }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input & Alphabetical Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-md relative">
            <Input
              icon={<Search className="w-4 h-4 text-violet-400" />}
              placeholder="Atamalarni, ta'riflarni yoki formulalarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                title="Tozalash"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 self-start sm:self-auto">
            <span>Topilgan atamalar:</span>
            <span className="font-bold text-violet-300 font-mono text-sm">
              {filteredTerms.length} ta
            </span>
          </div>
        </div>

        {/* Alphabetical Filter Bar */}
        {letters.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-slate-800/80 text-xs">
            <button
              type="button"
              onClick={() => setSelectedLetter("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${selectedLetter === "all"
                ? "bg-violet-600 text-white"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
            >
              {uz.common.all}
            </button>
            {letters.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-lg font-mono font-bold transition-colors cursor-pointer ${selectedLetter === letter
                  ? "bg-violet-600 text-white"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Term Cards Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredTerms.map((term) => {
            const levelMeta = term.level ? LEVEL_CONFIG[term.level] : null;

            return (
              <div
                key={term.id}
                id={term.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-800/90 bg-slate-900/60 hover:border-violet-500/40 transition-all flex flex-col justify-between space-y-4 text-xs group"
              >
                <div className="space-y-3">
                  {/* Category & Level Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-950/70 text-violet-300 border border-violet-500/30">
                      {term.category ?? "AI Glossariy"}
                    </span>
                    {levelMeta && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${levelMeta.badgeClass}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${levelMeta.dotClass}`}
                        />
                        <span>{levelMeta.label}</span>
                      </span>
                    )}
                  </div>

                  {/* Term Header */}
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-100 group-hover:text-violet-200 transition-colors">
                      {term.term}
                    </h3>
                    {term.translation && (
                      <p className="text-cyan-400 font-medium text-xs mt-0.5">
                        {term.translation}
                      </p>
                    )}
                  </div>

                  {/* 1. Progressive Disclosure: Oddiy tushuntirish */}
                  <div className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                    {term.simpleDefinition ?? term.plainText}
                  </div>

                  {/* 2. Visual / Concrete Example snippet box */}
                  {term.example && (
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Vizual / Hayotiy Misol:</span>
                      </div>
                      <div className="font-mono text-[11px] text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {term.example}
                      </div>
                    </div>
                  )}

                  {/* Related terms pills */}
                  {term.related.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-500 font-medium mr-1">
                        Bog‘liq:
                      </span>
                      {term.related.map((relId) => {
                        const relTerm = termMap.get(relId);
                        return (
                          <button
                            key={relId}
                            type="button"
                            onClick={() => {
                              if (relTerm) setActiveModalTerm(relTerm);
                            }}
                            className="px-2 py-0.5 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-violet-300 border border-slate-800 text-[10px] font-mono transition-colors cursor-pointer"
                          >
                            {relTerm ? relTerm.term.split("(")[0]?.trim() : relId}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Card Footer: Detail Modal Trigger + Lesson Link */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setActiveModalTerm(term)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                    <span>Batafsil / Formula</span>
                  </button>

                  {term.lessons.length > 0 && (
                    <Link
                      href={`/learn/${term.lessons[0]}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 font-semibold text-xs transition-colors"
                    >
                      <span>To‘liq darsga o‘tish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : terms.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title={uz.glossary.emptyTitle}
          description={uz.glossary.emptyBody}
        />
      ) : (
        <EmptyState
          icon={Search}
          title={uz.learn.noResultsTitle}
          description="Siz qidirgan mezon bo‘yicha atamalar topilmadi."
          actionLabel={uz.common.reset}
          onAction={() => {
            setSearchQuery("");
            setSelectedCategory("Barchasi");
            setSelectedLetter("all");
          }}
        />
      )}

      {/* Deep-Dive Slide-Over Detail Modal / Drawer */}
      {activeModalTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5 text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-950 text-violet-300 border border-violet-500/30">
                    {activeModalTerm.category ?? "AI Glossariy"}
                  </span>
                  {activeModalTerm.level && LEVEL_CONFIG[activeModalTerm.level] ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${LEVEL_CONFIG[activeModalTerm.level]!.badgeClass
                        }`}
                    >
                      {LEVEL_CONFIG[activeModalTerm.level]!.label}
                    </span>
                  ) : null}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {activeModalTerm.term}
                </h2>
                {activeModalTerm.translation && (
                  <p className="text-sm font-semibold text-cyan-400">
                    {activeModalTerm.translation}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveModalTerm(null)}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition-colors"
                title="Yopish (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. Oddiy tushuntirish */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                1. Oddiy Tushuntirish (Beginner Definition)
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {activeModalTerm.simpleDefinition ?? activeModalTerm.plainText}
              </p>
            </div>

            {/* 2. Vizual / Amaliy misol */}
            {activeModalTerm.example && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>2. Vizual / Hayotiy Misol</span>
                </h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 font-mono text-xs text-amber-100 leading-relaxed whitespace-pre-wrap">
                  {activeModalTerm.example}
                </div>
              </div>
            )}

            {/* 3. Texnik tushuntirish */}
            {activeModalTerm.technicalExplanation && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  3. Texnik Izoh (Engineering Deep Dive)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {activeModalTerm.technicalExplanation}
                </p>
              </div>
            )}

            {/* 4. Matematik formula */}
            {activeModalTerm.formula && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-violet-400" />
                  <span>4. Matematik Formula</span>
                </h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-violet-500/30 overflow-x-auto text-violet-100 text-base sm:text-lg">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(activeModalTerm.formula, true),
                    }}
                  />
                </div>
              </div>
            )}

            {/* 5. Bog'liq atamalar */}
            {activeModalTerm.related.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  5. Bog‘liq Tushunchalar
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalTerm.related.map((relId) => {
                    const relTerm = termMap.get(relId);
                    return (
                      <button
                        key={relId}
                        type="button"
                        onClick={() => {
                          if (relTerm) setActiveModalTerm(relTerm);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-violet-950/60 text-slate-300 hover:text-violet-200 border border-slate-800 hover:border-violet-500/40 text-xs font-medium transition-colors cursor-pointer"
                      >
                        {relTerm ? relTerm.term : relId}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. Bog'liq darslar & Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400">Tegishli darslar:</span>
                {activeModalTerm.lessons.map((lessonSlug) => (
                  <Link
                    key={lessonSlug}
                    href={`/learn/${lessonSlug}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-700 font-mono transition-colors"
                  >
                    {lessonSlug}
                  </Link>
                ))}
              </div>

              {activeModalTerm.lessons.length > 0 && (
                <Link
                  href={`/learn/${activeModalTerm.lessons[0]}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-colors shadow-lg shadow-violet-900/40"
                >
                  <span>Darsni ochish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
