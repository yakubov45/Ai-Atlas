"use client";

import React, { useMemo, useState } from "react";
import {
  NN_COLORED_TERMS,
  TERM_FAMILY_STYLES,
  splitTextWithColoredTerms,
  type ColoredTermMeta,
  type TermColorFamily,
} from "@/lib/curriculum/how-neural-learn-terms";
import { BookOpen, Search, X } from "lucide-react";

interface ColoredTermTextProps {
  text: string;
  className?: string;
}

/**
 * Matn ichidagi asosiy neyron tarmoq terminlarini o'z semantik oilasiga mos
 * ajratilgan rangli badge bilan ko'rsatadi. Ustiga bosilganda qisqa o'zbekcha
 * izoh chiqadi.
 */
export function ColoredTermText({ text, className = "" }: ColoredTermTextProps) {
  const tokens = useMemo(() => splitTextWithColoredTerms(text), [text]);
  const [activeTerm, setActiveTerm] = useState<ColoredTermMeta | null>(null);

  return (
    <span className={className}>
      {tokens.map((chunk, idx) => {
        if (!chunk.meta) {
          return <React.Fragment key={idx}>{chunk.text}</React.Fragment>;
        }
        const meta = chunk.meta;
        const style = TERM_FAMILY_STYLES[meta.family];
        return (
          <button
            key={idx}
            type="button"
            onClick={() =>
              setActiveTerm((prev) => (prev?.term === meta.term ? null : meta))
            }
            title={`${meta.term} (${style.labelUz}): ${meta.meaningUz}`}
            className={`mx-0.5 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.92em] font-semibold transition hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-white/30 ${style.badgeCls}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${style.dotCls}`} aria-hidden="true" />
            <span>{chunk.text}</span>
          </button>
        );
      })}
      {activeTerm ? (
        <span className="mt-2 flex items-start justify-between gap-2 rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-xs text-neutral-200">
          <span>
            <strong className="font-semibold text-white">{activeTerm.term}</strong>{" "}
            <span className="text-neutral-400">
              ({TERM_FAMILY_STYLES[activeTerm.family].labelUz})
            </span>
            : {activeTerm.meaningUz}
          </span>
          <button
            type="button"
            onClick={() => setActiveTerm(null)}
            className="rounded p-0.5 text-neutral-400 hover:bg-white/10 hover:text-white"
            aria-label="Izohni yopish"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      ) : null}
    </span>
  );
}

/**
 * 5 ta termin rang oilasi va barcha rangli atamalar lug'atini ko'rsatuvchi panel.
 */
export function ColoredTermsLegend() {
  const [selectedFamily, setSelectedFamily] = useState<TermColorFamily | "all">("all");
  const [query, setQuery] = useState("");

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NN_COLORED_TERMS.filter((item) => {
      if (selectedFamily !== "all" && item.family !== selectedFamily) return false;
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.meaningUz.toLowerCase().includes(q)
      );
    });
  }, [selectedFamily, query]);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0b101b] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          <span>Terminlar Rang Kodlari (bosib izohni o&apos;qing)</span>
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Termin qidirish..."
            className="w-full rounded-lg border border-white/10 bg-black/40 py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-neutral-500 focus:border-cyan-400/50 focus:outline-none"
          />
        </div>
      </div>

      {/* 5 rang oilasi tugmalari */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setSelectedFamily("all")}
          className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
            selectedFamily === "all"
              ? "border-white/40 bg-white/15 text-white"
              : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
          }`}
        >
          Hammasi ({NN_COLORED_TERMS.length})
        </button>
        {(Object.keys(TERM_FAMILY_STYLES) as TermColorFamily[]).map((fam) => {
          const st = TERM_FAMILY_STYLES[fam];
          const active = selectedFamily === fam;
          return (
            <button
              key={fam}
              type="button"
              onClick={() => setSelectedFamily(fam)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                active
                  ? `${st.legendCls} ring-1 ring-white/30`
                  : `${st.legendCls} opacity-75 hover:opacity-100`
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${st.dotCls}`} />
              <span>{st.labelUz}</span>
            </button>
          );
        })}
      </div>

      {/* Terminlar ro'yxati */}
      <div className="grid max-h-60 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
        {filteredTerms.map((item) => {
          const st = TERM_FAMILY_STYLES[item.family];
          return (
            <div
              key={item.term}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-xs"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-semibold ${st.badgeCls}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${st.dotCls}`} />
                  {item.term}
                </span>
                <span className="text-[10px] text-neutral-500">{st.labelUz}</span>
              </div>
              <p className="leading-relaxed text-neutral-300">{item.meaningUz}</p>
            </div>
          );
        })}
        {filteredTerms.length === 0 ? (
          <p className="col-span-full py-4 text-center text-xs text-neutral-500">
            Mos termin topilmadi.
          </p>
        ) : null}
      </div>
    </div>
  );
}
