import type { Metadata } from "next";
import { TransformersCme295Explorer } from "@/components/curriculum/TransformersCme295Explorer";

export const metadata: Metadata = {
  title: "Stanford CME 295: Transformers & Large Language Models (12 Dars) | AI Atlas",
  description:
    "3 ta Stanford CME 295 ma'ruzasi asosida: Tokenization/BPE, Q/K/V Self-Attention, BERT vs GPT, Scaling Laws/Chinchilla, Sparse MoE, RoPE/GQA/RMSNorm, Temperature/CoT, Pre-Training/BPB, SFT/LoRA, RLHF/DPO va GRPO/On-Policy Distillation.",
};

export default function TransformersCme295Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-6">
      <TransformersCme295Explorer />
    </main>
  );
}
