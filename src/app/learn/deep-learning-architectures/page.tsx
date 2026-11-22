import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Brain, Sparkles, Workflow } from "lucide-react";
import { DeepLearningArchitecturesRoadmap } from "@/components/visualizations/DeepLearningArchitecturesRoadmap";

export const metadata: Metadata = {
  title: "16 Asosiy Deep Learning Arxitekturasi va 6 Savol (1958–2023) | AI Atlas",
  description:
    "Perceptron (1958) dan Mamba (2023) gacha bo'lgan 16 ta eng muhim ilmiy maqola, arxitektura sxemalari, matematik formulalar va interaktiv simulyatsiya laboratoriyasi.",
  keywords: [
    "deep learning",
    "sixteen architectures",
    "16 architectures",
    "neural networks",
    "perceptron",
    "mlp",
    "cnn",
    "resnet",
    "word embeddings",
    "rnn",
    "lstm",
    "gru",
    "seq2seq",
    "attention",
    "self-attention",
    "transformer",
    "bert",
    "gpt",
    "mixture of experts",
    "mamba",
  ],
};

export default function DeepLearningArchitecturesPage() {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8 space-y-6">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/roadmap?tab=deep-learning"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Roadmap ga qaytish</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/learn" className="hover:text-slate-200">
              Darslar
            </Link>
            <span>/</span>
            <Link href="/learn/deep-learning" className="hover:text-slate-200">
              Deep Learning
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">16 Arxitektura</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/roadmap?tab=deep-learning"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Roadmap Tabida Ochish</span>
          </Link>
          <Link
            href="/learn/deep-learning"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/40 border border-violet-500/30 text-violet-300 text-xs font-semibold transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Deep Learning Asosiy Darsi</span>
          </Link>
        </div>
      </div>

      {/* Main Interactive Roadmap Component */}
      <DeepLearningArchitecturesRoadmap />
    </div>
  );
}
