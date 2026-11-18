"use client";

import React, { useState, useMemo } from "react";
import {
  runRagSandboxPipeline,
  evaluateRetrievalMetrics,
  DEFAULT_RAG_DOCUMENTS,
  DEFAULT_EVAL_CASES,
} from "@/lib/math/rag-sandbox";
import {
  Database,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BarChart3,
  RotateCcw,
} from "lucide-react";

export interface RagPipelineExplorerProps {
  className?: string;
}

export function RagPipelineExplorer({ className = "" }: RagPipelineExplorerProps) {
  const [activeTab, setActiveTab] = useState<"pipeline" | "evaluation">("pipeline");
  const [query, setQuery] = useState<string>(
    "Hujjatni chunk size va chunk overlap bilan bo'laklash nima uchun kerak?",
  );
  const [chunkSizeWords, setChunkSizeWords] = useState<number>(28);
  const [chunkOverlapWords, setChunkOverlapWords] = useState<number>(6);
  const [topK, setTopK] = useState<number>(2);
  const [threshold, setThreshold] = useState<number>(0.2);

  const pipelineResult = useMemo(
    () =>
      runRagSandboxPipeline({
        query,
        documents: DEFAULT_RAG_DOCUMENTS,
        chunkSizeWords,
        chunkOverlapWords,
        topK,
        minSimilarityThreshold: threshold,
      }),
    [query, chunkSizeWords, chunkOverlapWords, topK, threshold],
  );

  const evalSummary = useMemo(
    () =>
      evaluateRetrievalMetrics({
        cases: DEFAULT_EVAL_CASES,
        documents: DEFAULT_RAG_DOCUMENTS,
        chunkSizeWords,
        chunkOverlapWords,
        k: topK,
      }),
    [chunkSizeWords, chunkOverlapWords, topK],
  );

  const handleReset = () => {
    setQuery("Hujjatni chunk size va chunk overlap bilan bo'laklash nima uchun kerak?");
    setChunkSizeWords(28);
    setChunkOverlapWords(6);
    setTopK(2);
    setThreshold(0.2);
  };

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === "pipeline"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Phase 14–15: Chunking &amp; Grounded Retrieval</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("evaluation")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === "evaluation"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Phase 16: Hit@k &amp; MRR Baholash</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Parameter Sliders Bar (Chunk Size, Overlap, Top-K, Similarity Threshold) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
        <label className="space-y-1.5">
          <div className="flex justify-between font-mono text-slate-300">
            <span>Chunk size (so‘z):</span>
            <span className="text-cyan-300 font-bold">{chunkSizeWords}</span>
          </div>
          <input
            type="range"
            min={14}
            max={50}
            step={2}
            value={chunkSizeWords}
            onChange={(e) => setChunkSizeWords(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </label>

        <label className="space-y-1.5">
          <div className="flex justify-between font-mono text-slate-300">
            <span>Chunk overlap (so‘z):</span>
            <span className="text-violet-300 font-bold">{chunkOverlapWords}</span>
          </div>
          <input
            type="range"
            min={0}
            max={12}
            step={2}
            value={chunkOverlapWords}
            onChange={(e) => setChunkOverlapWords(parseInt(e.target.value, 10))}
            className="w-full accent-violet-400 cursor-pointer"
          />
        </label>

        <label className="space-y-1.5">
          <div className="flex justify-between font-mono text-slate-300">
            <span>Top-k natijalar:</span>
            <span className="text-emerald-300 font-bold">k = {topK}</span>
          </div>
          <input
            type="range"
            min={1}
            max={4}
            step={1}
            value={topK}
            onChange={(e) => setTopK(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </label>

        <label className="space-y-1.5">
          <div className="flex justify-between font-mono text-slate-300">
            <span>No-Answer chegarasi:</span>
            <span className="text-amber-300 font-bold">{threshold.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.05}
            max={0.85}
            step={0.05}
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </label>
      </div>

      {activeTab === "pipeline" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Query Input & Indexed Chunks with Live Cosine Similarity */}
          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>1. Savol (Query) tanlang yoki yozing</span>
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                placeholder="Savol kiriting..."
              />

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  ...DEFAULT_EVAL_CASES.map((c) => ({
                    label: c.id.toUpperCase(),
                    q: c.question,
                  })),
                  {
                    label: "NO-ANSWER TEST (Tashqi savol)",
                    q: "Mars sayyorasida ob-havo harorati necha gradus?",
                  },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setQuery(preset.q)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors cursor-pointer ${
                      query === preset.q
                        ? "bg-violet-600/30 border-violet-500 text-violet-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ranked Chunks List */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">
                  2. Indekslangan bo‘laklar ({pipelineResult.totalChunks} ta chunk) va Cosine Similarity:
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  Top-{topK} ajratib ko‘rsatilgan
                </span>
              </div>

              <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
                {pipelineResult.allScoredChunks.map((item) => {
                  const isSelected = pipelineResult.selectedChunks.some(
                    (s) => s.chunk.id === item.chunk.id,
                  );
                  const passesThreshold =
                    item.similarity >= threshold && item.similarity > 0;
                  return (
                    <div
                      key={item.chunk.id}
                      className={`p-3.5 rounded-xl border text-xs transition-all space-y-1.5 ${
                        isSelected && passesThreshold
                          ? "bg-emerald-950/25 border-emerald-500/60"
                          : "bg-slate-950/80 border-slate-800/80 opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[10px] text-cyan-300 font-bold">
                            #{item.rank} • [{item.chunk.id}]
                          </span>
                          <span className="font-semibold text-slate-200 truncate">
                            {item.chunk.docTitle}
                          </span>
                        </div>
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded ${
                            passesThreshold
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-700/50"
                              : "bg-slate-900 text-slate-400"
                          }`}
                        >
                          cos = {item.similarity.toFixed(3)}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{item.chunk.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Grounded Answer, Provenance Citations, or No-Answer Gate */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>3. Grounded Generation &amp; Citation (15.07–15.09)</span>
            </div>

            {pipelineResult.answered ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-700/50 space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Manbaga tayangan javob (Grounded Answer)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                    {pipelineResult.groundedAnswer}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300">
                    Tasdiqlangan Manba Havolalari (Source Provenance):
                  </div>
                  {pipelineResult.citations.map((cit) => (
                    <div
                      key={cit.chunkId}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-cyan-300 font-bold">[{cit.chunkId}]</span>
                        <span className="text-emerald-400">
                          similarity: {cit.similarity.toFixed(3)}
                        </span>
                      </div>
                      <div className="font-medium text-slate-200">{cit.docTitle}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Manba: {cit.sourceRef}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/50 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>No-Answer Siyosati Ishga Tushdi (15.09)</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {pipelineResult.groundedAnswer}
                </p>
                <p className="text-amber-200/80 font-mono text-[11px]">
                  Sabab: {pipelineResult.noAnswerReason}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Tab 2: Phase 16 Retrieval Evaluation (Hit@k & MRR) */
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Phase 16: RAG Sifatini Tekshirish (16.03 Hit@k &amp; 16.04 MRR)
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                Haqiqiy sinov savollari to‘plamida Retrieval metrikalari
              </h4>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-emerald-700/50">
                <span className="text-slate-400">Hit@{evalSummary.k}: </span>
                <span className="text-base font-extrabold text-emerald-400">
                  {(evalSummary.hitRateAtK * 100).toFixed(1)}%
                </span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-violet-700/50">
                <span className="text-slate-400">MRR: </span>
                <span className="text-base font-extrabold text-violet-300">
                  {evalSummary.mrr.toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2.5 px-3">Test Savoli</th>
                  <th className="py-2.5 px-3">Kutilgan Hujjat</th>
                  <th className="py-2.5 px-3 text-center">Topilgan O‘rin (Rank)</th>
                  <th className="py-2.5 px-3 text-center">Hit@{evalSummary.k}</th>
                  <th className="py-2.5 px-3 text-right">1 / Rank (RR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {evalSummary.cases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-950/50">
                    <td className="py-3 px-3 text-slate-200 font-medium">{c.question}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300">{c.expectedDocId}</td>
                    <td className="py-3 px-3 text-center font-mono text-slate-200">
                      {c.foundRank !== null ? `#${c.foundRank}` : "Topilmadi"}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {c.hitAtK ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50 font-mono">
                          Ha (1)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-700/50 font-mono">
                          Yo‘q (0)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-violet-300">
                      {c.reciprocalRank.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
