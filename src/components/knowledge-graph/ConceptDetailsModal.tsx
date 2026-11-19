"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Boxes,
  Code2,
  Workflow,
  Sparkles,
  ArrowRight,
  Calculator,
  Film,
} from "lucide-react";
import type { ConceptRelationType, KnowledgeConcept } from "@/lib/knowledge-graph/types";
import { DOMAIN_COLORS, DOMAIN_TITLES_UZ } from "@/lib/knowledge-graph/layout";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import { getConceptById } from "@/lib/knowledge-graph/concepts";
import { YOUTUBE_CATALOG_VIDEOS } from "@/lib/media/youtube-videos-data";

export interface ConceptDetailsModalProps {
  concept: KnowledgeConcept | null;
  onClose: () => void;
  onSelectConcept: (conceptId: string) => void;
  isKnown: boolean;
  onToggleKnown: (conceptId: string) => void;
}

export function ConceptDetailsModal({
  concept,
  onClose,
  onSelectConcept,
  isKnown,
  onToggleKnown,
}: ConceptDetailsModalProps) {
  if (!concept) return null;

  const domainColor = DOMAIN_COLORS[concept.domain];

  // Upstream prerequisites
  const upstreamPrereqs: Array<{
    concept: KnowledgeConcept;
    type: ConceptRelationType;
    desc: string | undefined;
  }> = [];
  for (const r of CONCEPT_RELATIONS) {
    if ((r.type === "REQUIRES" || r.type === "RECOMMENDED_BEFORE") && r.target === concept.id) {
      const c = getConceptById(r.source);
      if (c) upstreamPrereqs.push({ concept: c, type: r.type, desc: r.descriptionUz });
    }
  }

  // Downstream dependents
  const downstreamDependents: Array<{
    concept: KnowledgeConcept;
    type: ConceptRelationType;
    desc: string | undefined;
  }> = [];
  for (const r of CONCEPT_RELATIONS) {
    if ((r.type === "REQUIRES" || r.type === "RECOMMENDED_BEFORE") && r.source === concept.id) {
      const c = getConceptById(r.target);
      if (c) downstreamDependents.push({ concept: c, type: r.type, desc: r.descriptionUz });
    }
  }

  const trackLabels: Record<string, string> = {
    "python-dev": "Python Akademiyasi",
    "ai-engineer": "AI Engineering",
    "ml-engineer": "ML Engineering",
    "data-science": "Data Science",
    core: "Asosiy Platforma",
  };

  const conceptToYtTopic: Record<string, string[]> = {
    "python-variables-types": ["A1"],
    "python-control-flow": ["A2"],
    "python-functions-scope": ["A3"],
    "python-oop": ["A5"],
    "linear-regression": ["B2"],
    "gradient-descent-optimizers": ["B3"],
    "model-evaluation-metrics": ["B4"],
    "decision-trees": ["B5"],
    "ensemble-random-forests": ["B5"],
    "neural-networks-perceptrons": ["B6"],
    "backpropagation-autograd": ["B6"],
    "pandas-data-wrangling": ["C2"],
    "exploratory-data-analysis": ["C3"],
    "sql-relational-databases": ["C4"],
    "ab-testing-experimentation": ["C5"],
    "tokenization-bpe": ["D1"],
    "dot-product-cosine": ["D2"],
    "embeddings-vector-spaces": ["D2"],
    "attention-mechanism": ["D3"],
    "transformer-architecture": ["D3"],
    "vector-databases-indexing": ["D4"],
    "rag-retrieval-augmented": ["D4", "D5"],
    "function-calling-tools": ["D6"],
    "ai-agents-react-loop": ["D6"],
    "prompt-engineering-cot": ["F1", "F2"],
    "fine-tuning-lora-peft": ["F4"],
  };

  const matchingTopicIds = conceptToYtTopic[concept.id] ?? [];
  const matchingVideos = YOUTUBE_CATALOG_VIDEOS.filter((v) =>
    matchingTopicIds.includes(v.topicId)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${domainColor.badgeBg} ${domainColor.badgeText} border border-current/20`}
              >
                {DOMAIN_TITLES_UZ[concept.domain]}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">
                {concept.category}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800/80 text-slate-400 capitalize">
                {concept.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{concept.nameUz}</h2>
            <p className="text-sm text-slate-400 font-mono">{concept.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleKnown(concept.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isKnown
                  ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30"
                  : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {isKnown ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>O&apos;zlashtirilgan</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Bilaman deb belgilash</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          {concept.summaryUz}
        </p>

        {/* Detailed What & Why */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-1.5">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Nima bu?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{concept.whatIsItUz}</p>
          </div>

          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-1.5">
            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Nega kerak va qayerda qo&apos;llanadi?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{concept.whyItMattersUz}</p>
          </div>
        </div>

        {/* Mathematical Formula (if present) */}
        {concept.formula && (
          <div className="bg-amber-950/10 border border-amber-500/20 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Calculator className="w-4 h-4" />
              <span>Matematik Ifoda</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-lg overflow-x-auto text-amber-200 font-mono text-sm text-center">
              {concept.formula.latex}
            </div>
            <p className="text-xs text-slate-400">{concept.formula.explanationUz}</p>
          </div>
        )}

        {/* Code Snippet (if present) */}
        {concept.codeSnippet && (
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <Code2 className="w-4 h-4" />
                Kod namunasi ({concept.codeSnippet.language})
              </span>
              <span className="text-[11px] text-slate-500">{concept.codeSnippet.explanationUz}</span>
            </div>
            <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800/80">
              <code>{concept.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Prerequisite & Dependent Graph Relations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Prerequisites */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-amber-400" />
              Tayanch tushunchalar (Oldin o&apos;rganish kerak):
            </h4>
            {upstreamPrereqs.length === 0 ? (
              <p className="text-slate-500 italic">Boshlang&apos;ich fundamental tushuncha.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {upstreamPrereqs.map(({ concept: p, type }) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectConcept(p.id)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700 cursor-pointer"
                  >
                    <span>{p.nameUz}</span>
                    <span className="text-[10px] text-amber-400">({type})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dependents */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
              Ushbu bilim asosida ochiladigan mavzular:
            </h4>
            {downstreamDependents.length === 0 ? (
              <p className="text-slate-500 italic">Ilg&apos;or yakunlovchi tushuncha.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {downstreamDependents.map(({ concept: d, type }) => (
                  <button
                    key={d.id}
                    onClick={() => onSelectConcept(d.id)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700 cursor-pointer"
                  >
                    <span>{d.nameUz}</span>
                    <span className="text-[10px] text-violet-400">({type})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cross-Track Lesson Links */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Akademiyalardagi bog&apos;langan mikro-darslar:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {concept.crossTrackLessonLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center justify-between p-2.5 bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all group"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">
                      {link.lessonId}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate">
                      {trackLabels[link.track] ?? link.track}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                    {link.title}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* YouTube Video Lessons */}
        {matchingVideos.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-red-500" />
                <span>Mavzuga oid YouTube Video Darslar:</span>
              </h4>
              <Link href="/videos" className="text-[11px] text-cyan-400 hover:underline">
                Barcha videolar →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {matchingVideos.slice(0, 3).map((v) => {
                const langLabel =
                  v.language === "uz" ? "🇺🇿 O'zbekcha" : v.language === "ru" ? "🇷🇺 Ruscha" : "🇬🇧 Inglizcha";
                return (
                  <a
                    key={v.id}
                    href={v.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all group block"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-semibold text-slate-400">{langLabel}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-red-400" />
                    </div>
                    <p className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 truncate">
                      {v.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{v.channelTitle}</p>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Visual Lab Link (if available) */}
        {concept.visualLabIds.length > 0 && (
          <div className="pt-2 flex items-center justify-between bg-violet-950/20 border border-violet-500/20 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-violet-300 font-medium">
              <Boxes className="w-4 h-4 text-violet-400" />
              <span>Interaktiv Vizual Laboratoriya mavjud</span>
            </div>
            <Link
              href={`/visual-lab/${concept.visualLabIds[0]}`}
              className="flex items-center gap-1 px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <span>Laboratoriyani ochish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
