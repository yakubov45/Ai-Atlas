"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Plus,
  RotateCcw,
  Scissors,
  ShieldAlert,
  Sparkles,
  Trash2,
} from "lucide-react";

export interface TokenPaddingLabProps {
  initialSentences?: string[];
  className?: string;
}

interface TokenizedRow {
  rawText: string;
  tokens: string[];
  tokenIds: number[];
  paddedIds: number[];
  attentionMask: number[];
  truncatedCount: number;
  paddedCount: number;
}

const DEFAULT_SENTENCES = [
  "Men AI o'rganaman",
  "Hugging Face Transformers kutubxonasi juda qulay",
  "Tokenizatsiya va padding",
];

/**
 * Deterministic educational subword simulator (synthetic vocabulary for visual demonstration).
 * Illustrative only — does not claim to be an official pretrained model's exact vocabulary.
 */
function deterministicToyTokenize(text: string): {
  tokens: string[];
  ids: number[];
} {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const tokens: string[] = ["[CLS]"];
  const ids: number[] = [101];

  for (const w of words) {
    if (w.length > 8) {
      const stem = w.slice(0, 6);
      const suffix = "##" + w.slice(6);
      tokens.push(stem, suffix);
      ids.push(
        200 + ( Array.from(stem).reduce((a, c) => a + c.charCodeAt(0), 0) % 700 ),
        900 + ( Array.from(suffix).reduce((a, c) => a + c.charCodeAt(0), 0) % 90 )
      );
    } else {
      tokens.push(w);
      ids.push(
        200 + ( Array.from(w).reduce((a, c) => a + c.charCodeAt(0), 0) % 700 )
      );
    }
  }

  tokens.push("[SEP]");
  ids.push(102);
  return { tokens, ids };
}

export function TokenPaddingLab({
  initialSentences = DEFAULT_SENTENCES,
  className = "",
}: TokenPaddingLabProps) {
  const [sentences, setSentences] = useState<string[]>(initialSentences);
  const [newSentence, setNewSentence] = useState<string>("");
  const [padId, setPadId] = useState<number>(0);
  const [paddingMode, setPaddingMode] = useState<"longest" | "max_length">(
    "longest"
  );
  const [truncationEnabled, setTruncationEnabled] = useState<boolean>(true);
  const [maxLength, setMaxLength] = useState<number>(8);
  const [paddingSide, setPaddingSide] = useState<"right" | "left">("right");

  const batchResult = useMemo(() => {
    const rawRows = sentences.map((s) => {
      const { tokens, ids } = deterministicToyTokenize(s);
      return { rawText: s, tokens, ids };
    });

    const longestInBatch = Math.max(
      ...rawRows.map((r) => r.ids.length),
      0
    );

    const effectiveMaxLen = truncationEnabled
      ? maxLength
      : Math.max(longestInBatch, maxLength);

    const targetLength =
      paddingMode === "max_length"
        ? maxLength
        : truncationEnabled
        ? Math.min(longestInBatch, maxLength)
        : longestInBatch;

    const rows: TokenizedRow[] = rawRows.map((r) => {
      const cutIds = truncationEnabled
        ? r.ids.slice(0, targetLength)
        : r.ids.slice(0, effectiveMaxLen);
      const cutTokens = truncationEnabled
        ? r.tokens.slice(0, targetLength)
        : r.tokens.slice(0, effectiveMaxLen);

      const truncatedCount = Math.max(0, r.ids.length - cutIds.length);
      const padCount = Math.max(0, targetLength - cutIds.length);

      const pads = Array(padCount).fill(padId);
      const padTokens = Array(padCount).fill("[PAD]");
      const ones = Array(cutIds.length).fill(1);
      const zeros = Array(padCount).fill(0);

      const paddedIds =
        paddingSide === "right" ? [...cutIds, ...pads] : [...pads, ...cutIds];
      const finalTokens =
        paddingSide === "right"
          ? [...cutTokens, ...padTokens]
          : [...padTokens, ...cutTokens];
      const attentionMask =
        paddingSide === "right" ? [...ones, ...zeros] : [...zeros, ...ones];

      return {
        rawText: r.rawText,
        tokens: finalTokens,
        tokenIds: r.ids,
        paddedIds,
        attentionMask,
        truncatedCount,
        paddedCount: padCount,
      };
    });

    return {
      rows,
      longestInBatch,
      targetLength,
      batchShape: [rows.length, targetLength] as const,
    };
  }, [
    sentences,
    padId,
    paddingMode,
    truncationEnabled,
    maxLength,
    paddingSide,
  ]);

  const handleAddSentence = () => {
    if (!newSentence.trim()) return;
    setSentences((prev) => [...prev, newSentence.trim()]);
    setNewSentence("");
  };

  const handleRemoveSentence = (idx: number) => {
    if (sentences.length <= 1) return;
    setSentences((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleReset = () => {
    setSentences(DEFAULT_SENTENCES);
    setPadId(0);
    setPaddingMode("longest");
    setTruncationEnabled(true);
    setMaxLength(8);
    setPaddingSide("right");
  };

  return (
    <div
      data-testid="token-padding-lab"
      className={`rounded-3xl bg-slate-900/95 border border-cyan-500/30 p-5 sm:p-6 space-y-5 shadow-xl ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Interactive React Lab • HF Chapter 2 (hf-02-05)</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-white">
            Tokenizer Batch, Padding, Truncation & Attention Mask Simulyatori
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Asl holatga qaytarish</span>
        </button>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
        {/* Padding Strategy */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Padding Strategiyasi
          </label>
          <div className="flex gap-1.5">
            {(["longest", "max_length"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPaddingMode(mode)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                  paddingMode === mode
                    ? "bg-cyan-500 text-slate-950 border-cyan-400"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Padding Side (Encoder right vs Decoder left) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Padding Tomoni (padding_side)
          </label>
          <div className="flex gap-1.5">
            {(
              [
                { id: "right", label: "right (BERT)" },
                { id: "left", label: "left (LLM Gen)" },
              ] as const
            ).map((side) => (
              <button
                key={side.id}
                type="button"
                onClick={() => setPaddingSide(side.id)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  paddingSide === side.id
                    ? "bg-violet-500 text-white border-violet-400"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {side.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Length & Truncation */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="hf-max-len-slider"
              className="text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              max_length:{" "}
              <span className="text-cyan-300 font-mono">{maxLength}</span>
            </label>
            <button
              type="button"
              onClick={() => setTruncationEnabled((v) => !v)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer ${
                truncationEnabled
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-900 text-slate-500 border-slate-800"
              }`}
            >
              truncation={String(truncationEnabled)}
            </button>
          </div>
          <input
            id="hf-max-len-slider"
            type="range"
            min={2}
            max={14}
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Pad Token ID */}
        <div className="space-y-1.5">
          <label
            htmlFor="hf-pad-id-input"
            className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block"
          >
            pad_token_id
          </label>
          <input
            id="hf-pad-id-input"
            type="number"
            min={0}
            max={99999}
            value={padId}
            onChange={(e) =>
              setPadId(Math.max(0, parseInt(e.target.value || "0", 10)))
            }
            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white"
          />
        </div>
      </div>

      {/* Add / Edit Sentences */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newSentence}
          onChange={(e) => setNewSentence(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSentence()}
          placeholder="Yangi gap qo'shib batch o'lchamini sinab ko'ring..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="button"
          onClick={handleAddSentence}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Batchga Qo‘shish</span>
        </button>
      </div>

      {/* Tensor Shape Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-slate-300">
            Batch Tensor Shape:{" "}
            <strong className="text-cyan-300">
              ({batchResult.batchShape[0]}, {batchResult.batchShape[1]})
            </strong>
          </span>
          <span className="font-mono text-slate-400">
            Eng uzun gap: <strong>{batchResult.longestInBatch} token</strong>
          </span>
          <span className="font-mono text-slate-400">
            Maqsadli uzunlik: <strong>{batchResult.targetLength} token</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40 border border-emerald-400 inline-block" />
            Mask = 1 (Haqiqiy)
          </span>
          <span className="inline-flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 border border-slate-700 inline-block" />
            Mask = 0 (Padding)
          </span>
        </div>
      </div>

      {/* Visual Batch Rows */}
      <div className="space-y-4">
        {batchResult.rows.map((row, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-400">
                  Gap #{idx + 1}
                </span>
                <span>&ldquo;{row.rawText}&rdquo;</span>
                <span className="text-slate-500 font-mono">
                  (asl uzunlik: {row.tokenIds.length})
                </span>
              </div>
              <div className="flex items-center gap-2">
                {row.truncatedCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
                    <Scissors className="w-3 h-3" />-{row.truncatedCount} kesildi
                  </span>
                )}
                {row.paddedCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
                    <Layers className="w-3 h-3" />+{row.paddedCount} [PAD]
                  </span>
                )}
                {sentences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSentence(idx)}
                    className="p-1 rounded hover:bg-rose-950/60 text-slate-500 hover:text-rose-300 cursor-pointer"
                    title="Gapni o'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Token Cells Grid */}
            <div className="overflow-x-auto pb-1">
              <div className="inline-flex gap-1.5 min-w-full">
                {row.paddedIds.map((idVal, colIdx) => {
                  const maskVal = row.attentionMask[colIdx] ?? 0;
                  const tokStr = row.tokens[colIdx] ?? "[PAD]";
                  const isReal = maskVal === 1;
                  return (
                    <div
                      key={colIdx}
                      className={`min-w-[74px] p-2 rounded-xl border text-center space-y-1 transition-all ${
                        isReal
                          ? "bg-emerald-950/25 border-emerald-500/40 text-emerald-100"
                          : "bg-slate-900/50 border-slate-800/80 text-slate-500 opacity-75"
                      }`}
                    >
                      <div className="text-[11px] font-mono font-bold truncate">
                        {tokStr}
                      </div>
                      <div className="text-xs font-mono text-cyan-300">
                        ID: {idVal}
                      </div>
                      <div
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isReal
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        mask: {maskVal}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Provenance & Architecture Note */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Muhim izoh (Source Fidelity):</strong> Ushbu vizual
          simulyator o‘quv maqsadida sintetik token ID’lardan foydalanadi.{" "}
          <code>1/0</code> attention mask odatiy Hugging Face tokenizer
          konventsiyasidir; Encoder modellar (BERT/RoBERTa) odatda o‘ng tomondan{" "}
          (<code>padding_side=&quot;right&quot;</code>), avtoregressiv Decoder
          LLM’lar (Llama/Qwen batch generatsiyada) esa chap tomondan (
          <code>padding_side=&quot;left&quot;</code>) to‘ldiriladi.
        </div>
      </div>
    </div>
  );
}
