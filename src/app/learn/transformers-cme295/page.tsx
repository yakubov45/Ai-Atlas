import type { Metadata } from "next";
import { TransformersCme295Explorer } from "@/components/curriculum/TransformersCme295Explorer";

export const metadata: Metadata = {
  title: "Stanford CME 295: Transformers & Large Language Models (7 Ma'ruza / 24 Dars) | AI Atlas",
  description:
    "7 ta Stanford CME 295 ma'ruzasi asosida: Tokenization/BPE, Self-Attention, BERT/GPT, MoE, RoPE/GQA, Pre-Training/SFT, PPO/GRPO/On-Policy Distillation, FlashAttention/5D Parallelism/Speculative Decoding, Hybrid RAG/MCP/Harness hamda Pass@K/LLM-as-a-Judge/Bench Maxing.",
};

export default function TransformersCme295Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-6">
      <TransformersCme295Explorer />
    </main>
  );
}
