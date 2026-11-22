"use client";

import React, { useMemo, useState } from "react";
import type { TransformerVisualId } from "@/lib/curriculum/transformers-cme295";
import { TRANSFORMER_TERM_DICTIONARY } from "@/lib/curriculum/transformers-cme295-terms";
import { ColoredTermText } from "@/components/curriculum/ColoredTermText";
import type { ColoredTermDictionary } from "@/lib/curriculum/colored-terms-engine";

const TR_DICT = TRANSFORMER_TERM_DICTIONARY as unknown as ColoredTermDictionary<string>;

interface TransformersCme295VisualsProps {
  visualId: TransformerVisualId;
}

/**
 * Stanford CME 295 (Transformers & LLMs) ning 12 ta mikro-darsi uchun
 * boshlang'ichlar va muhandislarga mo'ljallangan sodda interaktiv vizualizatsiyalar.
 */
export function TransformersCme295Visuals({
  visualId,
}: TransformersCme295VisualsProps) {
  switch (visualId) {
    case "bpe-tradeoff":
      return <BpeTradeoffVisual />;
    case "word2vec-vs-rnn":
      return <Word2VecVsRnnVisual />;
    case "qkv-attention":
      return <QkvAttentionVisual />;
    case "encoder-decoder-flow":
      return <EncoderDecoderFlowVisual />;
    case "bert-vs-gpt":
      return <BertVsGptVisual />;
    case "chinchilla-moe":
      return <ChinchillaMoeVisual />;
    case "rope-gqa-rmsnorm":
      return <RopeGqaRmsNormVisual />;
    case "decoding-temperature":
      return <DecodingTemperatureVisual />;
    case "pretrain-bpb-collapse":
      return <PretrainBpbCollapseVisual />;
    case "yarn-sft-lora":
      return <YarnSftLoraVisual />;
    case "rlhf-vs-dpo":
      return <RlhfVsDpoVisual />;
    case "grpo-onpolicy-distill":
      return <GrpoOnPolicyDistillVisual />;
    case "rl-policy-gradient":
      return <RlPolicyGradientVisual />;
    case "ppo-grpo-clip":
      return <PpoGrpoClipVisual />;
    case "distill-reverse-kl":
      return <DistillReverseKlVisual />;
    case "flash-attention-tiling":
      return <FlashAttentionTilingVisual />;
    case "parallelism-5d":
      return <Parallelism5dVisual />;
    case "roofline-speculative":
      return <RooflineSpeculativeVisual />;
    case "rag-hybrid-ndcg":
      return <RagHybridNdcgVisual />;
    case "mcp-prompt-caching":
      return <McpPromptCachingVisual />;
    case "react-harness-memory":
      return <ReactHarnessMemoryVisual />;
    case "kappa-passk-metrics":
      return <KappaPasskMetricsVisual />;
    case "llm-judge-biases":
      return <LlmJudgeBiasesVisual />;
    case "benchmax-pareto":
      return <BenchmaxParetoVisual />;
  }
}

/* -------------------------------------------------------------------------- */
/* 1. BPE Merge Tradeoff                                                      */
/* -------------------------------------------------------------------------- */

function BpeTradeoffVisual() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(2);

  const states = [
    {
      name: "0-qadam: Character-Level",
      vocabSize: 27,
      tokens: ["r", "e", "a", "d", "i", "n", "g", "_", "b", "e", "a", "r", "s"],
      note: "Out-of-Vocabulary yo'q, lekin Sequence Length juda uzun (13 ta token).",
    },
    {
      name: "1-qadam: BPE merge ('i'+'n'+'g' -> 'ing')",
      vocabSize: 320,
      tokens: ["r", "e", "a", "d", "ing", "_", "b", "e", "a", "r", "s"],
      note: "Ko'p uchragan qo'shimcha bitta Subword bo'ldi (11 ta token).",
    },
    {
      name: "2-qadam: Subword BPE ('read' va 'bear' o'zaklari)",
      vocabSize: 50000,
      tokens: ["read", "ing", "_", "bear", "s", "<EOS>"],
      note: "Oltin o'rtalik: o'zak va qo'shimchalar saqlandi, Sequence Length 6 taga qisqardi!",
    },
    {
      name: "3-qadam: Sof Word-Level",
      vocabSize: 450000,
      tokens: ["reading", "bears", "[UNK]?"],
      note: "Vocabulary haddan tashqari katta, 'bears' va 'bear' bog'lanmaydi, notanish so'zda [UNK].",
    },
  ];

  const active = states[step] ?? states[0]!;

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap gap-1.5">
        {[
          { idx: 0, label: "Character (27)" },
          { idx: 1, label: "BPE Qadam 1" },
          { idx: 2, label: "Subword BPE (Optimal)" },
          { idx: 3, label: "Word-Level (450k)" },
        ].map((b) => (
          <button
            key={b.idx}
            type="button"
            onClick={() => setStep(b.idx as 0 | 1 | 2 | 3)}
            className={`rounded-lg border px-2.5 py-1.5 font-semibold transition ${
              step === b.idx
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-white">{active.name}</span>
          <span className="font-mono text-cyan-300">
            Vocabulary ≈ {active.vocabSize.toLocaleString()} | Sequence Length = {active.tokens.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {active.tokens.map((tok, i) => (
            <span
              key={i}
              className={`rounded-md border px-2 py-1 font-mono font-bold ${
                tok === "[UNK]?"
                  ? "border-rose-400/50 bg-rose-500/20 text-rose-200"
                  : tok.startsWith("<")
                  ? "border-amber-400/50 bg-amber-500/20 text-amber-200"
                  : "border-cyan-500/40 bg-cyan-500/15 text-cyan-100"
              }`}
            >
              {tok}
            </span>
          ))}
        </div>

        <p className="text-neutral-300 leading-relaxed">
          <ColoredTermText text={active.note} dictionary={TR_DICT} />
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Word2Vec vs RNN Limits                                                  */
/* -------------------------------------------------------------------------- */

function Word2VecVsRnnVisual() {
  const [mode, setMode] = useState<"onehot" | "w2v" | "rnn">("w2v");

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap gap-1.5">
        {[
          { id: "onehot", label: "One-Hot (Ortogonal)" },
          { id: "w2v", label: "Word2Vec (Kontekst muammosi)" },
          { id: "rnn", label: "RNN / LSTM (Hidden State cheklovi)" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id as "onehot" | "w2v" | "rnn")}
            className={`rounded-lg border px-2.5 py-1.5 font-semibold ${
              mode === tab.id
                ? "border-violet-400 bg-violet-500/20 text-violet-200"
                : "border-white/10 bg-white/5 text-neutral-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === "onehot" && (
        <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-2">
          <div className="font-mono grid gap-1.5">
            <div><span className="text-cyan-300">&quot;soft&quot; :</span> [1, 0, 0]</div>
            <div><span className="text-cyan-300">&quot;teddy&quot;:</span> [0, 1, 0]</div>
            <div><span className="text-neutral-400">Dot Product = (1×0)+(0×1)+(0×0) = </span><strong className="text-rose-300">0 (bog&apos;lanish yo&apos;q!)</strong></div>
          </div>
        </div>
      )}

      {mode === "w2v" && (
        <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-2.5">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-3">
              <div className="text-cyan-300 font-semibold">1-gap: &quot;river bank&quot; (daryo qirg&apos;og&apos;i)</div>
              <div className="mt-1 font-mono text-white">bank → [0.42, -0.18, 0.77]</div>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-3">
              <div className="text-amber-300 font-semibold">2-gap: &quot;go to the bank&quot; (moliya banki)</div>
              <div className="mt-1 font-mono text-white">bank → [0.42, -0.18, 0.77] (XUDDI BIR XIL!)</div>
            </div>
          </div>
          <p className="text-neutral-300">
            <ColoredTermText text="Word2Vec statik Embeddings yasaydi: so'z tartibi ham ('child hugs bear' vs 'bear hugs child') farqlanmaydi." dictionary={TR_DICT} />
          </p>
        </div>
      )}

      {mode === "rnn" && (
        <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 font-mono">
            {[
              { w: "My teddy", pct: "100%" },
              { w: "bear...", pct: "65%" },
              { w: "(2 gapdan keyin)", pct: "22%" },
              { w: "It is 3ft", pct: "8% (!)" },
            ].map((item, idx) => (
              <React.Fragment key={item.w}>
                <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-2.5 py-1.5 text-center">
                  <div className="text-white font-bold">{item.w}</div>
                  <div className="text-[10px] text-amber-300">Xotira: {item.pct}</div>
                </div>
                {idx < 3 && <span className="text-neutral-500">→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-neutral-300">
            <ColoredTermText text="RNN ketma-ket ishlaydi (parallel emas) va Vanishing Gradient tufayli uzoq oldingi so'zlar xotiradan o'chadi." dictionary={TR_DICT} />
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Self-Attention Q, K, V Heatmap                                          */
/* -------------------------------------------------------------------------- */

function QkvAttentionVisual() {
  const words = ["a", "cute", "teddy", "bear"];
  const [selectedQueryIdx, setSelectedQueryIdx] = useState(2); // "teddy"
  const [sharpness, setSharpness] = useState(2.2);

  // Semantik o'xshashlik ballari: "teddy" uchun "cute" va "bear" bilan kuchli aloqa
  const baseScores: readonly number[][] = [
    [1.2, 0.2, 0.4, 0.3],
    [0.3, 1.4, 1.5, 1.1],
    [0.2, 2.0, 1.8, 2.1],
    [0.2, 1.6, 2.2, 1.7],
  ];

  const probs = useMemo(() => {
    const row = baseScores[selectedQueryIdx] ?? [1, 1, 1, 1];
    const scaled = row.map((s) => s * sharpness);
    const maxS = Math.max(...scaled);
    const exps = scaled.map((s) => Math.exp(s - maxS));
    const total = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / total);
  }, [selectedQueryIdx, sharpness]);

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-violet-300 font-semibold">Query so&apos;zni tanlang:</span>
          {words.map((w, i) => (
            <button
              key={w}
              type="button"
              onClick={() => setSelectedQueryIdx(i)}
              className={`rounded-lg border px-2.5 py-1 font-mono font-bold ${
                selectedQueryIdx === i
                  ? "border-violet-400 bg-violet-500/25 text-white"
                  : "border-white/10 bg-white/5 text-neutral-300"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2">
          <span className="text-neutral-400">√d_k masshtabi:</span>
          <input
            type="range"
            min={0.5}
            max={4}
            step={0.1}
            value={sharpness}
            onChange={(e) => setSharpness(Number(e.target.value))}
            className="w-24 accent-violet-400"
          />
        </label>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-2.5">
        <div className="text-neutral-300">
          <strong className="text-violet-300">Q(&quot;{words[selectedQueryIdx]}&quot;)</strong> barcha Key larga qanchalik e&apos;tibor (Softmax) qaratmoqda:
        </div>
        {words.map((targetWord, i) => {
          const p = probs[i] ?? 0;
          return (
            <div key={targetWord} className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-white">Key: &quot;{targetWord}&quot;</span>
                <span className="text-emerald-300">{(p * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all"
                  style={{ width: `${Math.round(p * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Encoder-Decoder Flow                                                    */
/* -------------------------------------------------------------------------- */

function EncoderDecoderFlowVisual() {
  const [showMask, setShowMask] = useState(true);
  const tokens = ["<BOS>", "Un", "mignon"];

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-neutral-300">
          <ColoredTermText text="Encoder Kirishdan K va V beradi; Decoder Cross-Attention ga Q uzatadi." dictionary={TR_DICT} />
        </span>
        <button
          type="button"
          onClick={() => setShowMask((m) => !m)}
          className="rounded-lg border border-violet-400/40 bg-violet-500/15 px-2.5 py-1 font-semibold text-violet-200"
        >
          {showMask ? "Masked (-inf) yoqilgan ✓" : "Maskasiz (kelajak ochiq!)"}
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-cyan-500/30 bg-[#080d17] p-3.5 space-y-2">
          <div className="font-bold text-cyan-300">1. Encoder (6 blok) & Residual</div>
          <div className="font-mono text-[11px] space-y-1 text-neutral-200">
            <div>[a, cute, teddy, bear] + Position</div>
            <div>→ Multi-Head Self-Attention (8 ta bosh)</div>
            <div>→ LayerNorm(x + Sublayer(x))</div>
            <div>→ Feed-Forward Network → K_enc, V_enc</div>
          </div>
        </div>

        <div className="rounded-xl border border-violet-500/30 bg-[#080d17] p-3.5 space-y-2">
          <div className="font-bold text-violet-300">2. Decoder Masked Self-Attention Matritsasi</div>
          <div className="grid grid-cols-4 gap-1 font-mono text-[10px] text-center">
            <div />
            {tokens.map((t) => (
              <div key={t} className="text-neutral-400">{t}</div>
            ))}
            {tokens.map((rowTok, r) => (
              <React.Fragment key={rowTok}>
                <div className="text-right pr-1 text-neutral-300">{rowTok}</div>
                {tokens.map((__, c) => {
                  const blocked = showMask && c > r;
                  return (
                    <div
                      key={c}
                      className={`rounded py-1 font-bold ${
                        blocked
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {blocked ? "-∞ (0%)" : "ochiq ✓"}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. BERT vs GPT                                                             */
/* -------------------------------------------------------------------------- */

function BertVsGptVisual() {
  const [arch, setArch] = useState<"bert" | "gpt">("bert");
  const sample = ["[CLS]", "a", "[MASK]", "teddy", "bear"];
  const gptSample = ["<BOS>", "a", "cute", "teddy", "→ ?"];

  return (
    <div className="space-y-3 text-xs">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setArch("bert")}
          className={`rounded-lg border px-3 py-1.5 font-semibold ${
            arch === "bert"
              ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
              : "border-white/10 bg-white/5 text-neutral-300"
          }`}
        >
          BERT (Encoder-Only • Bidirectional)
        </button>
        <button
          type="button"
          onClick={() => setArch("gpt")}
          className={`rounded-lg border px-3 py-1.5 font-semibold ${
            arch === "gpt"
              ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
              : "border-white/10 bg-white/5 text-neutral-300"
          }`}
        >
          GPT / LLM (Decoder-Only • Autoregressive)
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-2.5">
        {arch === "bert" ? (
          <>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {sample.map((t, i) => (
                <span
                  key={i}
                  className={`rounded-lg border px-2.5 py-1.5 font-bold ${
                    t === "[MASK]"
                      ? "border-amber-400 bg-amber-500/20 text-amber-200"
                      : t === "[CLS]"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                      : "border-white/15 bg-white/5 text-white"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-neutral-300">
              <ColoredTermText text="BERT chapdan ham, o'ngdan ham qaraydi (Bidirectional). [CLS] klassifikatsiya uchun, [MASK] esa so'zni topish (MLM) uchun ishlatiladi." dictionary={TR_DICT} />
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-1.5 font-mono">
              {gptSample.map((t, i) => (
                <span
                  key={i}
                  className={`rounded-lg border px-2.5 py-1.5 font-bold ${
                    t.includes("?")
                      ? "border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-200"
                      : "border-cyan-500/30 bg-cyan-500/15 text-cyan-100"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-neutral-300">
              <ColoredTermText text="GPT faqat chapdagi avvalgi tokenlarga qaraydi (Causal Attention) va hamma vazifani Autoregressive keyingi token bashoratiga aylantiradi." dictionary={TR_DICT} />
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Chinchilla & MoE                                                        */
/* -------------------------------------------------------------------------- */

function ChinchillaMoeVisual() {
  const [paramsB, setParamsB] = useState(70);
  const [topK, setTopK] = useState(2);
  const totalExperts = 8;
  const activeTokensB = paramsB * 20;

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-emerald-500/25 bg-[#080d17] p-4 space-y-3">
        <div className="font-bold text-emerald-300">Chinchilla (1 Parametr : 20 Token)</div>
        <label className="block">
          <div className="mb-1 flex justify-between">
            <span>Model hajmi (Params):</span>
            <span className="font-mono font-bold text-white">{paramsB}B</span>
          </div>
          <input
            type="range"
            min={7}
            max={200}
            step={1}
            value={paramsB}
            onChange={(e) => setParamsB(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
        </label>
        <div className="rounded-lg border border-white/10 bg-black/40 p-2.5 font-mono">
          Optimal O&apos;quv Data: <strong className="text-emerald-300">{(activeTokensB / 1000).toFixed(2)} Trillion token</strong>
        </div>
      </div>

      <div className="rounded-xl border border-violet-500/25 bg-[#080d17] p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-violet-300">Sparse MoE Router (Top-{topK})</span>
          <div className="flex gap-1">
            {[1, 2, 4].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTopK(k)}
                className={`rounded px-2 py-0.5 font-mono font-bold ${
                  topK === k ? "bg-violet-500 text-white" : "bg-white/10 text-neutral-300"
                }`}
              >
                K={k}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
          {Array.from({ length: totalExperts }).map((_, idx) => {
            const active = idx < topK;
            return (
              <div
                key={idx}
                className={`rounded-lg border py-2 text-center ${
                  active
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-200 font-bold"
                    : "border-white/10 bg-white/[0.02] text-neutral-500"
                }`}
              >
                E{idx + 1} {active ? "⚡" : ""}
              </div>
            );
          })}
        </div>
        <div className="text-[11px] text-neutral-300">
          Faollashgan FFN hisobi: <strong className="text-white">{Math.round((topK / totalExperts) * 100)}%</strong> (qolganlari uxlaydi).
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. RoPE, GQA & RMSNorm                                                     */
/* -------------------------------------------------------------------------- */

function RopeGqaRmsNormVisual() {
  const [posM, setPosM] = useState(2);
  const [posN, setPosN] = useState(5);
  const [kvGroups, setKvGroups] = useState<8 | 2 | 1>(2);

  const angleDiffDeg = (posN - posM) * 18;
  const radM = (posM * 18 * Math.PI) / 180;
  const radN = (posN * 18 * Math.PI) / 180;

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-emerald-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="font-bold text-emerald-300">RoPE: Query (m={posM}) va Key (n={posN}) Aylanishi</div>
        <svg viewBox="0 0 220 130" className="w-full h-28 bg-black/30 rounded-lg">
          <circle cx="110" cy="65" r="46" fill="none" stroke="#334155" strokeWidth="1" />
          <line x1="110" y1="65" x2={110 + 44 * Math.cos(radM)} y2={65 - 44 * Math.sin(radM)} stroke="#22d3ee" strokeWidth="3" />
          <line x1="110" y1="65" x2={110 + 44 * Math.cos(radN)} y2={65 - 44 * Math.sin(radN)} stroke="#a855f7" strokeWidth="3" />
          <text x="10" y="18" fill="#22d3ee" fontSize="10">Q (pos {posM})</text>
          <text x="10" y="34" fill="#c084fc" fontSize="10">K (pos {posN})</text>
          <text x="115" y="122" fill="#34d399" fontSize="10">Nisbiy farq n-m = {posN - posM} ({angleDiffDeg}°)</text>
        </svg>
        <div className="grid grid-cols-2 gap-2">
          <label>Q pos m: <input type="range" min={0} max={8} value={posM} onChange={(e) => setPosM(Number(e.target.value))} className="w-full accent-cyan-400" /></label>
          <label>K pos n: <input type="range" min={0} max={8} value={posN} onChange={(e) => setPosN(Number(e.target.value))} className="w-full accent-violet-400" /></label>
        </div>
      </div>

      <div className="rounded-xl border border-violet-500/25 bg-[#080d17] p-3.5 space-y-3">
        <div className="font-bold text-violet-300">KV Cache Tejash (8 ta Query boshi uchun)</div>
        <div className="flex gap-1.5">
          {([8, 2, 1] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setKvGroups(g)}
              className={`rounded-lg border px-2.5 py-1 font-semibold ${
                kvGroups === g
                  ? "border-violet-400 bg-violet-500/20 text-white"
                  : "border-white/10 bg-white/5 text-neutral-400"
              }`}
            >
              {g === 8 ? "MHA (8 KV)" : g === 2 ? "GQA (2 KV)" : "MQA (1 KV)"}
            </button>
          ))}
        </div>
        <div className="rounded-lg bg-black/40 p-3 space-y-1 font-mono">
          <div>Saqlanadigan KV boshi: <strong className="text-emerald-300">{kvGroups} / 8</strong></div>
          <div>Xotira sarfi: <strong className="text-cyan-300">{Math.round((kvGroups / 8) * 100)}%</strong></div>
        </div>
        <p className="text-[11px] text-neutral-300">
          <ColoredTermText text="Zamonaviy standart: Pre-Norm + RMSNorm + RoPE + GQA!" dictionary={TR_DICT} />
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Decoding Temperature & Context Rot                                      */
/* -------------------------------------------------------------------------- */

function DecodingTemperatureVisual() {
  const [temp, setTemp] = useState(1.0);
  const [contextK, setContextK] = useState(128);
  const candidates = ["cute", "fluffy", "red", "quantum"];
  const logits = [3.2, 2.5, 1.1, -0.5];

  const probs = useMemo(() => {
    const sc = logits.map((z) => z / temp);
    const mx = Math.max(...sc);
    const ex = sc.map((v) => Math.exp(v - mx));
    const tot = ex.reduce((a, b) => a + b, 0);
    return ex.map((v) => v / tot);
  }, [temp]);

  const recallQuality = Math.max(48, Math.round(99 - (contextK / 1000) * 42));

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-fuchsia-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="flex justify-between">
          <span className="font-bold text-fuchsia-300">Temperature (T = {temp.toFixed(2)})</span>
          <span className="text-neutral-400">{temp < 0.4 ? "Aniq (Greedy ga yaqin)" : temp > 1.3 ? "Juda ijodiy" : "Muvozanatli"}</span>
        </div>
        <input type="range" min={0.15} max={2.0} step={0.05} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full accent-fuchsia-400" />
        <div className="space-y-1.5">
          {candidates.map((w, i) => {
            const p = probs[i] ?? 0;
            return (
              <div key={w}>
                <div className="flex justify-between font-mono text-[11px]">
                  <span>&quot;{w}&quot;</span>
                  <span>{(p * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-fuchsia-400 transition-all" style={{ width: `${Math.round(p * 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="font-bold text-amber-300">Context Rot (Needle-in-a-Haystack)</div>
        <label className="block">
          <div className="flex justify-between mb-1">
            <span>Context Window uzunligi:</span>
            <span className="font-mono text-white">{contextK}K token</span>
          </div>
          <input type="range" min={4} max={1000} step={32} value={contextK} onChange={(e) => setContextK(Number(e.target.value))} className="w-full accent-amber-400" />
        </label>
        <div className="rounded-lg bg-black/40 p-2.5">
          O&apos;rtadagi faktni eslab qolish ehtimoli: <strong className={recallQuality < 70 ? "text-rose-300" : "text-emerald-300"}>{recallQuality}%</strong>
        </div>
        <p className="text-[11px] text-neutral-300">
          <ColoredTermText text="Kontekst shishganda Context Rot kuchayadi — shuning uchun ortiqcha shovqinni tozalash (compaction) kerak." dictionary={TR_DICT} />
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. Pre-Training Teacher Forcing & BPB                                      */
/* -------------------------------------------------------------------------- */

function PretrainBpbCollapseVisual() {
  const [tokRatio, setTokRatio] = useState(0.25); // tokens / bytes
  const lossNats = 2.0;
  const bpb = tokRatio * (lossNats / Math.log(2));

  return (
    <div className="space-y-3 text-xs">
      <div className="rounded-xl border border-amber-500/25 bg-[#080d17] p-4 space-y-3">
        <div className="font-bold text-amber-300">Teacher Forcing: Parallel Keyingi Token Bashorati</div>
        <div className="grid grid-cols-4 gap-2 font-mono text-center text-[11px]">
          {[
            { inp: "<BOS>", tgt: "a" },
            { inp: "<BOS> a", tgt: "cute" },
            { inp: "<BOS> a cute", tgt: "teddy" },
            { inp: "<BOS> a cute teddy", tgt: "bear" },
          ].map((pair) => (
            <div key={pair.tgt} className="rounded-lg border border-white/10 bg-black/40 p-2">
              <div className="text-cyan-300 truncate">{pair.inp}</div>
              <div className="text-neutral-500">↓</div>
              <div className="text-emerald-300 font-bold">{pair.tgt}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-cyan-500/25 bg-[#080d17] p-4 space-y-2">
        <div className="flex justify-between font-bold text-white">
          <span>Tokenizerdan Mustaqil Bits Per Byte (BPB)</span>
          <span className="font-mono text-cyan-300">BPB = {bpb.toFixed(3)}</span>
        </div>
        <label className="block">
          <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
            <span>Token / Bayt nisbati (siqish samarasi)</span>
            <span>{tokRatio.toFixed(2)}</span>
          </div>
          <input type="range" min={0.18} max={0.5} step={0.01} value={tokRatio} onChange={(e) => setTokRatio(Number(e.target.value))} className="w-full accent-cyan-400" />
        </label>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 10. YaRN, SFT Mask & LoRA                                                  */
/* -------------------------------------------------------------------------- */

function YarnSftLoraVisual() {
  const [rank, setRank] = useState(16);
  const full = 4096 * 4096;
  const lora = rank * (4096 + 4096);
  const pct = ((lora / full) * 100).toFixed(2);

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-amber-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="font-bold text-amber-300">SFT Loss Mask (Prompt = 0, Javob = 1)</div>
        <div className="flex flex-wrap gap-1.5 font-mono">
          <span className="rounded bg-slate-800 px-2 py-1 text-slate-400">[Savol: Ayiqchani yuvsam bo&apos;ladimi?] Loss=0</span>
          <span className="rounded border border-emerald-400/50 bg-emerald-500/20 px-2 py-1 text-emerald-200 font-bold">
            [Javob: Yo&apos;q, qo&apos;lda yuving!] Loss=Aktiv ✓
          </span>
        </div>
        <p className="text-[11px] text-neutral-300">
          Model foydalanuvchi savolini emas, faqat yordamchi javobini bashorat qilishni o&apos;rganadi.
        </p>
      </div>

      <div className="rounded-xl border border-cyan-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="flex justify-between font-bold text-cyan-300">
          <span>LoRA (W₀ + B·A) Parametrlari</span>
          <span>rank = {rank}</span>
        </div>
        <input type="range" min={4} max={128} step={4} value={rank} onChange={(e) => setRank(Number(e.target.value))} className="w-full accent-cyan-400" />
        <div className="rounded-lg bg-black/40 p-2.5 font-mono space-y-1">
          <div>To&apos;liq FFN/Attn: <span className="text-neutral-300">{full.toLocaleString()}</span></div>
          <div>LoRA adapter: <strong className="text-emerald-300">{lora.toLocaleString()} ({pct}%)</strong></div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 11. RLHF Bradley-Terry vs DPO                                              */
/* -------------------------------------------------------------------------- */

function RlhfVsDpoVisual() {
  const [rWin, setRWin] = useState(2.2);
  const [rLose, setRLose] = useState(-0.4);
  const diff = rWin - rLose;
  const prob = 1 / (1 + Math.exp(-diff));
  const loss = -Math.log(Math.max(prob, 1e-6));

  return (
    <div className="space-y-3 text-xs">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="rounded-xl border border-emerald-500/25 bg-black/30 p-3">
          <div className="flex justify-between mb-1">
            <span className="text-emerald-300 font-semibold">G&apos;olib javob balli (r_w)</span>
            <span className="font-mono">{rWin.toFixed(1)}</span>
          </div>
          <input type="range" min={-3} max={5} step={0.1} value={rWin} onChange={(e) => setRWin(Number(e.target.value))} className="w-full accent-emerald-400" />
        </label>
        <label className="rounded-xl border border-rose-500/25 bg-black/30 p-3">
          <div className="flex justify-between mb-1">
            <span className="text-rose-300 font-semibold">Mag&apos;lub javob balli (r_l)</span>
            <span className="font-mono">{rLose.toFixed(1)}</span>
          </div>
          <input type="range" min={-3} max={5} step={0.1} value={rLose} onChange={(e) => setRLose(Number(e.target.value))} className="w-full accent-rose-400" />
        </label>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 flex flex-wrap justify-between gap-2 font-mono">
        <span>Afzallik ehtimoli P(y_w &gt; y_l): <strong className="text-emerald-300">{(prob * 100).toFixed(1)}%</strong></span>
        <span>Bradley-Terry Loss: <strong className="text-amber-300">{loss.toFixed(3)}</strong></span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 12. GRPO & On-Policy Distillation                                          */
/* -------------------------------------------------------------------------- */

function GrpoOnPolicyDistillVisual() {
  const [scores, setScores] = useState<[number, number, number, number]>([0, 1, 1, 0]);
  const mu = scores.reduce((a, b) => a + b, 0) / 4;
  const varVal = scores.reduce((a, b) => a + (b - mu) ** 2, 0) / 4;
  const std = Math.sqrt(varVal);

  const toggleAttempt = (idx: number) => {
    const next = [...scores] as [number, number, number, number];
    next[idx] = next[idx] === 1 ? 0 : 1;
    setScores(next);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-amber-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="font-bold text-amber-300">GRPO: Guruhdagi 4 ta Urinish (bosib o&apos;zgartiring)</div>
        <div className="grid grid-cols-4 gap-2 font-mono text-center">
          {scores.map((s, i) => {
            const adv = std === 0 ? 0 : (s - mu) / std;
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleAttempt(i)}
                className={`rounded-lg border p-2 transition cursor-pointer ${
                  s === 1
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                    : "border-rose-400 bg-rose-500/15 text-rose-200"
                }`}
              >
                <div className="font-bold">#{i + 1}: {s === 1 ? "To'g'ri" : "Xato"}</div>
                <div className="text-[10px]">Adv: {adv >= 0 ? "+" : ""}{adv.toFixed(2)}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-fuchsia-500/25 bg-[#080d17] p-3.5 space-y-2">
        <div className="font-bold text-fuchsia-300">Post-Training Metodlar Matritsasi</div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg border border-white/10 bg-black/40 p-2">
            <div className="font-bold text-slate-300">SFT / DPO</div>
            <div className="text-neutral-400">Dense signal, lekin Off-Policy</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 p-2">
            <div className="font-bold text-amber-300">GRPO (RLVR)</div>
            <div className="text-neutral-400">On-Policy, lekin Sparse (0/1)</div>
          </div>
          <div className="col-span-2 rounded-lg border border-emerald-400/40 bg-emerald-500/15 p-2.5">
            <div className="font-bold text-emerald-200">★ On-Policy Distillation</div>
            <div className="text-emerald-100/90">Ikkalasining eng yaxshisi: On-Policy (model o&apos;zi yozadi) + Dense (ustoz har tokenda baholaydi)!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 13. RL Policy Gradient Baseline & Importance Sampling (Lect 4)             */
/* -------------------------------------------------------------------------- */

function RlPolicyGradientVisual() {
  const [useBaseline, setUseBaseline] = useState(true);
  const [rho, setRho] = useState(1.1);
  const rewards = [101.0, 100.0];
  const avg = 100.5;
  const effA = useBaseline ? rewards.map((r) => r - avg) : rewards;

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setUseBaseline((b) => !b)}
          className={`rounded-lg border px-3 py-1.5 font-semibold ${
            useBaseline
              ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
              : "border-rose-400 bg-rose-500/15 text-rose-200"
          }`}
        >
          {useBaseline ? "Baseline = 100.5 yoqilgan (+0.5 / -0.5)" : "Baselinesiz (+101 / +100 shovqin!)"}
        </button>
        <label className="flex items-center gap-2">
          <span>Ratio ρ = π_θ / π_old: <strong className="text-amber-300 font-mono">{rho.toFixed(2)}</strong></span>
          <input type="range" min={0.5} max={1.6} step={0.05} value={rho} onChange={(e) => setRho(Number(e.target.value))} className="w-24 accent-amber-400" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 rounded-xl border border-white/10 bg-[#080d17] p-4 font-mono">
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3">
          <div className="text-emerald-300 font-bold">Yaxshi javob (R=101)</div>
          <div className="text-white mt-1">Qadam kuchi: {(rho * (effA[0] ?? 0)).toFixed(2)} (↑ ehtimol)</div>
        </div>
        <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3">
          <div className="text-rose-300 font-bold">Yomon javob (R=100)</div>
          <div className="text-white mt-1">Qadam kuchi: {(rho * (effA[1] ?? 0)).toFixed(2)} {useBaseline ? "(↓ kamayadi!)" : "(↑ XATO oshiryapti!)"}</div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 14. PPO Clipping & GRPO Length Normalization (Lect 4)                      */
/* -------------------------------------------------------------------------- */

function PpoGrpoClipVisual() {
  const [rho, setRho] = useState(1.1);
  const [advSign, setAdvSign] = useState<1 | -1>(1);
  const eps = 0.2;
  const unclipped = rho * advSign;
  const clippedVal = Math.max(1 - eps, Math.min(1 + eps, rho)) * advSign;
  const ppoVal = Math.min(unclipped, clippedVal);
  const isClipped = ppoVal !== unclipped;

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-amber-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="flex justify-between">
          <span className="font-bold text-amber-300">PPO Clipping (ε = 0.2)</span>
          <button
            type="button"
            onClick={() => setAdvSign((s) => (s === 1 ? -1 : 1))}
            className="rounded border border-white/15 bg-white/10 px-2 py-0.5 font-mono"
          >
            Advantage: {advSign === 1 ? "+1 (Musbat)" : "-1 (Manfiy)"}
          </button>
        </div>
        <label className="block">
          <div className="flex justify-between mb-1">
            <span>Importance Sampling Ratio ρ:</span>
            <span className="font-mono">{rho.toFixed(2)}</span>
          </div>
          <input type="range" min={0.5} max={1.6} step={0.05} value={rho} onChange={(e) => setRho(Number(e.target.value))} className="w-full accent-amber-400" />
        </label>
        <div className="rounded-lg bg-black/40 p-2.5 font-mono space-y-1">
          <div>Kesilmagan: {unclipped.toFixed(2)} | <strong className="text-emerald-300">PPO: {ppoVal.toFixed(2)}</strong></div>
          <div className={isClipped ? "text-amber-300 font-bold" : "text-neutral-400"}>
            {isClipped ? "✂️ Chegaraga urildi — gradient=0 (katta sakrash to'xtatildi)" : "Aktiv zona [0.8, 1.2] ichida"}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-violet-500/25 bg-[#080d17] p-3.5 space-y-2">
        <div className="font-bold text-violet-300">GRPO 1/|o_i| Uzunlik Tuzog&apos;i (vs DAPO)</div>
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <div className="rounded-lg border border-rose-400/40 bg-rose-500/10 p-2">
            <div className="font-bold text-rose-200">Qisqa Xato (20 tok)</div>
            <div>Har token zarbasi: -(1/20) = <strong>-0.050</strong></div>
          </div>
          <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-2">
            <div className="font-bold text-amber-200">Uzun Xato (200 tok)</div>
            <div>Har token zarbasi: -(1/200) = <strong>-0.005</strong></div>
          </div>
        </div>
        <p className="text-[11px] text-neutral-300">
          Model xato javoblarda kichikroq jarima olish uchun matnni cho&apos;zib yuboradi; DAPO buni umumiy token normallashtirishi bilan tuzatadi.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 15. Reverse KL Mode-Seeking Distillation (Lect 4)                          */
/* -------------------------------------------------------------------------- */

function DistillReverseKlVisual() {
  const [studentW, setStudentW] = useState(0.7);
  const teacherW = 0.9;
  const rkl =
    studentW * Math.log(studentW / teacherW) +
    (1 - studentW) * Math.log((1 - studentW) / (1 - teacherW));

  return (
    <div className="space-y-3 text-xs">
      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-3">
        <div className="flex flex-wrap justify-between gap-2">
          <span className="font-bold text-amber-300">On-Policy Reverse KL(Student || Teacher)</span>
          <span className="font-mono text-white">Teacher to&apos;g&apos;ri tokenga: 90% | Reverse KL = <strong className="text-emerald-300">{rkl.toFixed(3)}</strong></span>
        </div>
        <label className="block">
          <div className="flex justify-between mb-1">
            <span>Talaba ehtimoli s (maqsad 90%):</span>
            <span className="font-mono">{(studentW * 100).toFixed(0)}%</span>
          </div>
          <input type="range" min={0.1} max={0.95} step={0.05} value={studentW} onChange={(e) => setStudentW(Number(e.target.value))} className="w-full accent-amber-400" />
        </label>
        <p className="text-neutral-300">
          <ColoredTermText text="Talaba o'zi yaratgan noto'g'ri tokenga katta ehtimol (s katta, T=10%) bersa Reverse KL keskin portlab o'sha tokenda tuzatadi!" dictionary={TR_DICT} />
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 16. FlashAttention HBM vs SRAM Online Softmax (Lect 5)                     */
/* -------------------------------------------------------------------------- */

function FlashAttentionTilingVisual() {
  const [tileIdx, setTileIdx] = useState<1 | 2 | 3>(3);
  const scores = [1.0, 3.0, 2.0];
  const values = [10, 20, 30];

  const sim = useMemo(() => {
    let m = -Infinity;
    let D = 0;
    let N = 0;
    for (let i = 0; i < tileIdx; i++) {
      const s = scores[i] ?? 0;
      const v = values[i] ?? 0;
      const mNew = Math.max(m, s);
      const scale = m === -Infinity ? 0 : Math.exp(m - mNew);
      const w = Math.exp(s - mNew);
      D = D * scale + w;
      N = N * scale + w * v;
      m = mNew;
    }
    return { m, D, out: N / D };
  }, [tileIdx]);

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {([1, 2, 3] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTileIdx(k)}
              className={`rounded-lg border px-2.5 py-1 font-mono font-bold ${
                tileIdx === k ? "border-emerald-400 bg-emerald-500/20 text-emerald-200" : "border-white/10 bg-white/5 text-neutral-400"
              }`}
            >
              SRAM Blok 1..{k}
            </button>
          ))}
        </div>
        <span className="text-cyan-300 font-mono">HBM (~1 TB/s, 141GB) vs SRAM (~10+ TB/s, ~100MB)</span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 grid sm:grid-cols-3 gap-3 font-mono text-center">
        <div className="rounded-lg bg-black/40 p-2.5">
          <div className="text-neutral-400">Joriy Max (m_t)</div>
          <div className="text-lg font-bold text-amber-300">{sim.m.toFixed(1)}</div>
        </div>
        <div className="rounded-lg bg-black/40 p-2.5">
          <div className="text-neutral-400">Online Denominator D_t</div>
          <div className="text-lg font-bold text-cyan-300">{sim.D.toFixed(3)}</div>
        </div>
        <div className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 p-2.5">
          <div className="text-emerald-200">Aniq Natija (N_t / D_t)</div>
          <div className="text-lg font-bold text-white">{sim.out.toFixed(3)}</div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 17. 5D Parallelism Topology (Lect 5)                                       */
/* -------------------------------------------------------------------------- */

function Parallelism5dVisual() {
  const [kind, setKind] = useState<"zero" | "tensor" | "pipeline" | "context" | "expert">("pipeline");

  const info = {
    zero: {
      title: "Data Parallelism + ZeRO",
      detail: "Batch GPU larga bo'linadi; ZeRO vazn, gradient va Adam holatlarini dublikat qilmay GPU lar aro bo'ladi (sharding).",
    },
    tensor: {
      title: "Tensor Parallelism",
      detail: "Multi-Head Attention boshlari va FFN matritsalari bitta qatlam ichida bir necha GPU ga taqsimlanadi.",
    },
    pipeline: {
      title: "Pipeline Parallelism (va Bubble)",
      detail: "Model qatlamlari ketma-ket GPU 0 -> GPU 1 -> GPU 2 ga joylanadi; navbat kutish 'Bubble' bo'sh vaqtini keltirib chiqaradi.",
    },
    context: {
      title: "Context Parallelism",
      detail: "Juda uzun Sequence Length GPU larga bo'linib, Key/Value bloklari halqa bo'ylab o'zaro uzatiladi.",
    },
    expert: {
      title: "Expert Parallelism (MoE)",
      detail: "Har bir MoE eksperti alohida GPU da turadi; Router tokenni kerakli GPU dagi ekspertga yuboradi.",
    },
  }[kind];

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap gap-1.5">
        {(["zero", "tensor", "pipeline", "context", "expert"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`rounded-lg border px-2.5 py-1.5 font-semibold ${
              kind === k ? "border-violet-400 bg-violet-500/20 text-white" : "border-white/10 bg-white/5 text-neutral-400"
            }`}
          >
            {k.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-1.5">
        <div className="font-bold text-violet-300">{info.title}</div>
        <p className="text-neutral-200 leading-relaxed">
          <ColoredTermText text={info.detail} dictionary={TR_DICT} />
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 18. Roofline, PagedAttention & Speculative Decoding (Lect 5)               */
/* -------------------------------------------------------------------------- */

function RooflineSpeculativeVisual() {
  const [phase, setPhase] = useState<"prefill" | "decode">("decode");
  const draftP = 0.6;
  const targetP = 0.8;
  const acceptProb = Math.min(1, targetP / draftP);

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-emerald-500/25 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="flex justify-between">
          <span className="font-bold text-emerald-300">Roofline Model</span>
          <div className="flex gap-1">
            <button type="button" onClick={() => setPhase("prefill")} className={`rounded px-2 py-0.5 ${phase === "prefill" ? "bg-cyan-500/25 text-cyan-200" : "bg-white/5 text-neutral-400"}`}>Prefill</button>
            <button type="button" onClick={() => setPhase("decode")} className={`rounded px-2 py-0.5 ${phase === "decode" ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-neutral-400"}`}>Decode</button>
          </div>
        </div>
        <div className="rounded-lg bg-black/40 p-2.5 text-neutral-200">
          {phase === "prefill"
            ? "Compute-Bound (Ridge Point o'ngi): hamma prompt tokenlari parallel hisoblanadi — TTFT tez."
            : "Memory-Bound (Ridge Point chapi): har 1 tokenga barcha model vaznlari HBM dan tashiladi — TPOT sekin & 5x qimmat!"}
        </div>
      </div>

      <div className="rounded-xl border border-fuchsia-500/25 bg-[#080d17] p-3.5 space-y-2">
        <div className="font-bold text-fuchsia-300">Speculative Decoding (Draft vs Target)</div>
        <div className="font-mono text-[11px] bg-black/40 p-2.5 rounded-lg">
          D(x)={draftP}, T(x)={targetP} → T &gt;= D bo&apos;lgani uchun Qabul = <strong className="text-emerald-300">{(acceptProb * 100).toFixed(0)}%</strong>
        </div>
        <p className="text-[11px] text-neutral-300">
          Target Model K ta draft tokenni birga tekshiradi va bepul bitta bonus token ham chiqaradi!
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 19. Hybrid RAG & NDCG (Lect 6)                                             */
/* -------------------------------------------------------------------------- */

function RagHybridNdcgVisual() {
  const [mode, setMode] = useState<"semantic" | "bm25" | "hybrid">("hybrid");

  const ranked = {
    semantic: ["1. Huggy likes to work downstairs", "2. Where is Paris located?", "3. Cuddly spends days with books ✓"],
    bm25: ["1. He was in a cuddly mood", "2. Cuddly spends days with books ✓", "3. Huggy likes to work downstairs"],
    hybrid: ["1. Cuddly spends days with books ✓ (Ikkisida ham bor!)", "2. He was in a cuddly mood", "3. Huggy likes to work downstairs"],
  }[mode];

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-neutral-300">So&apos;rov: <strong className="text-white">&quot;Where is Cuddly?&quot;</strong></span>
        <div className="flex gap-1.5">
          {(["semantic", "bm25", "hybrid"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-lg border px-2.5 py-1 font-semibold ${
                mode === m ? "border-fuchsia-400 bg-fuchsia-500/20 text-white" : "border-white/10 bg-white/5 text-neutral-400"
              }`}
            >
              {m === "semantic" ? "Faqat Vector" : m === "bm25" ? "Faqat BM25" : "Hybrid (BM25 + Vector) ★"}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#080d17] p-3.5 space-y-1.5 font-mono">
        {ranked.map((r) => (
          <div key={r} className={`rounded px-2.5 py-1.5 ${r.includes("✓") ? "bg-emerald-500/15 text-emerald-200 font-bold" : "bg-black/40 text-neutral-300"}`}>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 20. MCP & Prompt Caching Message Ordering (Lect 6)                         */
/* -------------------------------------------------------------------------- */

function McpPromptCachingVisual() {
  const [goodOrder, setGoodOrder] = useState(true);

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGoodOrder(true)}
          className={`rounded-lg border px-3 py-1.5 font-semibold ${goodOrder ? "border-emerald-400 bg-emerald-500/20 text-emerald-200" : "border-white/10 bg-white/5 text-neutral-400"}`}
        >
          To&apos;g&apos;ri tartib (Tools tepada)
        </button>
        <button
          type="button"
          onClick={() => setGoodOrder(false)}
          className={`rounded-lg border px-3 py-1.5 font-semibold ${!goodOrder ? "border-rose-400 bg-rose-500/15 text-rose-200" : "border-white/10 bg-white/5 text-neutral-400"}`}
        >
          Xato tartib (Vaqt/Prompt tepada)
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-2">
        <div className="grid sm:grid-cols-3 gap-2 font-mono text-[11px]">
          {(goodOrder
            ? ["1. Fixed Tools (CACHED 0.1x ✓)", "2. User Context (Vaqt o'zgaradi)", "3. User Prompt (Yangi)"]
            : ["1. User Context (O'zgaradi! ✗)", "2. User Prompt (O'zgaradi!)", "3. Fixed Tools (KESH BUZILDI 1.0x!)"]
          ).map((block) => (
            <div key={block} className={`rounded-lg border p-2.5 ${block.includes("✓") ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-200" : "border-white/10 bg-black/40 text-neutral-300"}`}>
              {block}
            </div>
          ))}
        </div>
        <div className="text-neutral-300">
          Kutilayotgan narx (1000 tool + 50 user token):{" "}
          <strong className={goodOrder ? "text-emerald-300" : "text-rose-300"}>
            {goodOrder ? "150 birlik (kesh ishladi!)" : "1,050 birlik (keshdan mahrum!)"}
          </strong>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 21. ReAct Loop & Compaction (Lect 6)                                       */
/* -------------------------------------------------------------------------- */

function ReactHarnessMemoryVisual() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const steps = [
    "1. OBSERVE: Foydalanuvchi «Ayiqcham sovqotyapti» dedi.",
    "2. PLAN + ACT: `get_temperature()` tool chaqirildi → 16°C (sovuq).",
    "3. PLAN + ACT: `increase_temperature(+5)` bajarildi.",
    "4. OBSERVE & JAVOB: Harorat 21°C ga ko'tarildi, foydalanuvchiga xabar berildi ✓",
  ];

  return (
    <div className="space-y-3 text-xs">
      <div className="rounded-xl border border-fuchsia-500/25 bg-[#080d17] p-4 space-y-2.5">
        <div className="font-mono text-white font-semibold">{steps[step]}</div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i as 0 | 1 | 2 | 3)}
              className={`rounded px-2.5 py-1 font-semibold ${step === i ? "bg-fuchsia-500 text-white" : "bg-white/10 text-neutral-300"}`}
            >
              Qadam {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 22. Cohen's Kappa & Pass@K Metrics (Lect 7)                                */
/* -------------------------------------------------------------------------- */

function KappaPasskMetricsVisual() {
  const [c, setC] = useState(3);
  const [k, setK] = useState(5);
  const n = 10;

  const comb = (nn: number, rr: number): number => {
    if (rr < 0 || rr > nn) return 0;
    let res = 1;
    for (let i = 1; i <= rr; i++) res = (res * (nn - rr + i)) / i;
    return res;
  };

  const passK = n - c < k ? 1 : 1 - comb(n - c, k) / comb(n, k);

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      <div className="rounded-xl border border-fuchsia-500/25 bg-[#080d17] p-3.5 space-y-2">
        <div className="font-bold text-fuchsia-300">Unbiased Pass@K (N = {n} urinish)</div>
        <label className="block">
          <div className="flex justify-between"><span>To&apos;g&apos;ri urinishlar (c):</span><span className="font-mono">{c}</span></div>
          <input type="range" min={1} max={8} value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full accent-emerald-400" />
        </label>
        <label className="block">
          <div className="flex justify-between"><span>Tanlangan urinish (k):</span><span className="font-mono">{k}</span></div>
          <input type="range" min={1} max={8} value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-fuchsia-400" />
        </label>
        <div className="rounded-lg bg-black/40 p-2.5 font-mono">
          Pass@{k} ehtimoli: <strong className="text-emerald-300">{(passK * 100).toFixed(1)}%</strong>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-3.5 space-y-2">
        <div className="font-bold text-white">Cohen&apos;s Kappa: Tasodifni Tozalash</div>
        <p className="text-neutral-300 leading-relaxed">
          <ColoredTermText text="Alis va Bob tasodifan 50% 'Pass' aytsa ham 50% mos kelib qoladi (p_e=0.50). Cohen's Kappa haqiqiy p_o=0.90 dan 0.50 ni ayirib kappa=(0.9-0.5)/(1-0.5)=0.80 (kuchli kelishuv) chiqaradi!" dictionary={TR_DICT} />
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 23. LLM-as-a-Judge Biases (Lect 7)                                         */
/* -------------------------------------------------------------------------- */

function LlmJudgeBiasesVisual() {
  const [swapped, setSwapped] = useState(false);

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-neutral-300">Position Bias &amp; Verbosity Bias tekshiruvi:</span>
        <button
          type="button"
          onClick={() => setSwapped((s) => !s)}
          className="rounded-lg border border-fuchsia-400/50 bg-fuchsia-500/20 px-3 py-1 font-semibold text-fuchsia-200"
        >
          {swapped ? "Tartib: (B, A) — Almashtirildi" : "Tartib: (A, B) — Boshlang'ich"}
        </button>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#080d17] p-3.5 grid sm:grid-cols-2 gap-2.5 font-mono text-[11px]">
        <div className="rounded border border-emerald-500/30 bg-emerald-500/10 p-2.5">
          <strong>{(swapped ? "Javob B (Uzun va Xato)" : "Javob A (Qisqa va To'g'ri)")}</strong>
          <div className="text-amber-300 mt-1">1-o&apos;rin tanlandi! → Agar hakam doim 1-o&apos;rinni tanlasa = Position Bias!</div>
        </div>
        <div className="rounded border border-white/10 bg-black/40 p-2.5 text-neutral-300">
          Yechim: Binary Pass/Fail + Rationale FIRST (sababni balldan oldin yozdirish) + A/B almashtirib tekshirish.
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 24. Bench Maxing & Pareto Frontier (Lect 7)                                */
/* -------------------------------------------------------------------------- */

function BenchmaxParetoVisual() {
  const [formatChanged, setFormatChanged] = useState(false);

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-bold text-fuchsia-300">Max Bench Tajribasi (Bench Maxing Diagnostikasi)</span>
        <button
          type="button"
          onClick={() => setFormatChanged((f) => !f)}
          className="rounded-lg border border-amber-400/50 bg-amber-500/20 px-3 py-1 font-semibold text-amber-200"
        >
          {formatChanged ? "Format: Zulu / lowercase (O'zgartirildi)" : "Format: PT / Standard (Ommaviy benchmark)"}
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-2 font-mono">
        <div className="flex justify-between">
          <span>Model X (Yodlagan):</span>
          <span className={formatChanged ? "text-rose-400 font-bold" : "text-emerald-300 font-bold"}>
            {formatChanged ? "38% (Quladi!)" : "91% (Top-1!)"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Model Y (Haqiqiy tushunadi):</span>
          <span className="text-emerald-300 font-bold">{formatChanged ? "86% (Barqaror ✓)" : "88%"}</span>
        </div>
        <p className="font-sans text-neutral-300 text-[11px] pt-1">
          <ColoredTermText text="Goodhart's Law sababli faqat ommaviy benchmarkga intilmay, yopiq ZDR private baholar va Pareto Frontier ni kuzating." dictionary={TR_DICT} />
        </p>
      </div>
    </div>
  );
}
