"use client";

import React, { useMemo } from "react";
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
  ListChecks,
  Layers,
  Clock,
} from "lucide-react";
import type { KnowledgeConcept } from "@/lib/knowledge-graph/types";
import { DOMAIN_COLORS, DOMAIN_TITLES_UZ } from "@/lib/knowledge-graph/layout";
import { YOUTUBE_CATALOG_VIDEOS } from "@/lib/media/youtube-videos-data";
import { getKgConceptFullBreakdown } from "@/lib/learning-os/node-details";

export interface ConceptDetailsModalProps {
  concept: KnowledgeConcept | null;
  onClose: () => void;
  onSelectConcept: (conceptId: string) => void;
  isKnown: boolean;
  onToggleKnown: (conceptId: string) => void;
  knownConceptIds?: readonly string[];
  completedLessonIds?: readonly string[];
}

export function ConceptDetailsModal({
  concept,
  onClose,
  onSelectConcept,
  isKnown,
  onToggleKnown,
  knownConceptIds = [],
  completedLessonIds = [],
}: ConceptDetailsModalProps) {
  const effectiveKnownIds = useMemo(() => {
    if (!concept) return knownConceptIds;
    if (isKnown && !knownConceptIds.includes(concept.id)) {
      return [...knownConceptIds, concept.id];
    }
    return knownConceptIds;
  }, [concept, isKnown, knownConceptIds]);

  const breakdown = useMemo(() => {
    if (!concept) return null;
    return getKgConceptFullBreakdown(concept.id, effectiveKnownIds, completedLessonIds);
  }, [concept, effectiveKnownIds, completedLessonIds]);

  if (!concept || !breakdown) return null;

  const domainColor = DOMAIN_COLORS[concept.domain];

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-slate-100 space-y-6"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Untruncated full titles) */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
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
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-950 border border-slate-800 text-slate-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                ~{concept.estimatedMinutes ?? 30} daqiqa
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {concept.nameUz}
            </h2>
            <p className="text-sm text-slate-400 font-mono">{concept.name}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
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
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
          {concept.summaryUz}
        </p>

        {/* KPI Box: How many topics to learn BEFORE this + What you need */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/15 p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              <span>
                Bundan oldin qancha mavzu o&apos;rganish kerak? (Tayanch Yo&apos;l)
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 font-bold">
                Jami: {breakdown.totalPrereqCount} ta mavzu
              </span>
              {breakdown.totalPrereqCount > 0 && (
                <>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300">
                    {breakdown.donePrereqCount} ta bilasiz
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                    {breakdown.remainingPrereqCount} ta qolgan (~{breakdown.prepMinutes} daq)
                  </span>
                </>
              )}
            </div>
          </div>

          {breakdown.orderedPrereqChain.length === 0 ? (
            <p className="text-xs text-slate-300">
              <strong>0 ta oldingi mavzu</strong> — bu fundamental boshlang&apos;ich nuqta, to&apos;g&apos;ridan-to&apos;g&apos;ri boshlashingiz mumkin.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400">
                Tavsiya etilgan ketma-ketlikda oldin o&apos;rganilishi kerak bo&apos;lgan mavzular (istalganini bosib ko&apos;ring):
              </p>
              <div className="flex flex-wrap gap-2">
                {breakdown.orderedPrereqChain.map((item, idx) => (
                  <button
                    key={item.concept.id}
                    type="button"
                    onClick={() => onSelectConcept(item.concept.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-colors cursor-pointer ${
                      item.isDone
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200 hover:bg-emerald-950/60"
                        : item.isDirect
                        ? "bg-amber-950/50 border-amber-500/50 text-amber-100 hover:bg-amber-900/50 font-semibold"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <span className="text-[10px] font-mono opacity-75">#{idx + 1}</span>
                    {item.isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    <span className="text-left">{item.concept.nameUz}</span>
                    {item.isDirect && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        Bevosita
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Two Column Clear Guide: What You Need (Requirements) & What Exact Subtopics You Learn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/65 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Nimalar kerak bo&apos;ladi? (Zarur poydevor)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {breakdown.requirementsUz.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/65 p-4 sm:p-5 rounded-2xl border border-violet-500/25 space-y-3">
            <h3 className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <ListChecks className="w-4 h-4" />
              <span>Ushbu mavzuda aniq nimalar o&apos;rganiladi? ({breakdown.topicsCoveredUz.length} ta mavzu)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {breakdown.topicsCoveredUz.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

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

        {/* Mathematical Formula & Code Snippet */}
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

        {concept.codeSnippet && (
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <Code2 className="w-4 h-4" />
                Kod namunasi ({concept.codeSnippet.language})
              </span>
              <span className="text-[11px] text-slate-400">{concept.codeSnippet.explanationUz}</span>
            </div>
            <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800/80">
              <code>{concept.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Next / Downstream Concepts */}
        <div className="space-y-2 text-xs">
          <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
            <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
            Ushbu mavzudan keyin ochiladigan keyingi mavzular ({breakdown.directDownstream.length} ta):
          </h4>
          {breakdown.directDownstream.length === 0 ? (
            <p className="text-slate-500 italic">Ilg&apos;or yakunlovchi tushuncha.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {breakdown.directDownstream.map(({ concept: d, type }) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onSelectConcept(d.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors border border-slate-700 cursor-pointer"
                >
                  <span>{d.nameUz}</span>
                  <span className="text-[10px] text-violet-400">({type})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cross-Track Lesson Links — Untruncated titles */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Akademiyalar va platformadagi to&apos;liq darslar ({concept.crossTrackLessonLinks.length} ta):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {concept.crossTrackLessonLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between gap-2 p-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl transition-all group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-cyan-300 rounded">
                      {link.lessonId}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {trackLabels[link.track] ?? link.track}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                    {link.title}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0" />
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
              <Link href="/videos" onClick={onClose} className="text-[11px] text-cyan-400 hover:underline">
                Barcha videolar →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {matchingVideos.slice(0, 3).map((v) => {
                const langLabel =
                  v.language === "uz" ? "O'zbekcha" : v.language === "ru" ? "Ruscha" : "Inglizcha";
                return (
                  <a
                    key={v.id}
                    href={v.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all group block"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-semibold text-slate-400">{langLabel}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-red-400" />
                    </div>
                    <p className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 leading-snug">
                      {v.title}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{v.channelTitle}</p>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Visual Lab Link */}
        {concept.visualLabIds.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 bg-violet-950/20 border border-violet-500/20 p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-violet-300 font-medium">
              <Boxes className="w-4 h-4 text-violet-400" />
              <span>Interaktiv Vizual Laboratoriya mavjud</span>
            </div>
            <Link
              href={`/visual-lab/${concept.visualLabIds[0]}`}
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors"
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
