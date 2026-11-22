"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  DL_QUESTION_GROUPS,
  SIXTEEN_ARCHITECTURES,
  type DlArchitecture,
  type DlQuestionCategory,
  getDlArchitectureById,
} from "@/lib/curriculum/deep-learning-16-architectures";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Flame,
  GitBranch,
  Layers,
  Lightbulb,
  Maximize2,
  Network,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export function DeepLearningArchitecturesRoadmap() {
  const [selectedArchId, setSelectedArchId] = useState<string>("perceptron");
  const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<
    DlQuestionCategory | "all"
  >("all");
  const [activeTab, setActiveTab] = useState<
    "schematic" | "paper" | "math_code"
  >("schematic");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Interactive toy playground states for the selected architecture
  const [playgroundInputA, setPlaygroundInputA] = useState<number>(1);
  const [playgroundInputB, setPlaygroundInputB] = useState<number>(0);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);

  const selectedArch = useMemo(() => {
    return getDlArchitectureById(selectedArchId) ?? SIXTEEN_ARCHITECTURES[0]!;
  }, [selectedArchId]);

  const filteredArchitectures = useMemo(() => {
    return SIXTEEN_ARCHITECTURES.filter((arch) => {
      const matchesQuestion =
        selectedQuestionFilter === "all" ||
        arch.questionCategory === selectedQuestionFilter;
      const matchesSearch =
        searchQuery === "" ||
        arch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arch.fullNameUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arch.year.toString().includes(searchQuery) ||
        arch.paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesQuestion && matchesSearch;
    });
  }, [selectedQuestionFilter, searchQuery]);

  // Run architecture simulation
  const handleSimulate = () => {
    switch (selectedArch.id) {
      case "perceptron": {
        const w1 = 0.6,
          w2 = 0.7,
          b = -0.5;
        const total = playgroundInputA * w1 + playgroundInputB * w2 + b;
        const res = total >= 0 ? 1 : 0;
        setSimulatedOutput(
          `w1·x1 + w2·x2 + b = (${playgroundInputA}·0.6 + ${playgroundInputB}·0.7 - 0.5) = ${total.toFixed(
            2
          )} >= 0 ➔ Chiqish: ${res}`
        );
        break;
      }
      case "mlp": {
        const hidden1 = Math.max(0, playgroundInputA * 0.8 - 0.2);
        const hidden2 = Math.max(0, playgroundInputB * 0.9 - 0.1);
        const out = hidden1 * 1.2 + hidden2 * 1.5;
        setSimulatedOutput(
          `Hidden ReLU: [${hidden1.toFixed(2)}, ${hidden2.toFixed(
            2
          )}] ➔ Output Dense: ${out.toFixed(3)}`
        );
        break;
      }
      case "resnet": {
        const fx = playgroundInputA * 0.5;
        const out = fx + playgroundInputA;
        setSimulatedOutput(
          `F(x) = ${fx.toFixed(2)}, Identity Shortcut = ${playgroundInputA} ➔ y = F(x) + x = ${out.toFixed(
            2
          )} (Gradient to'siqsiz oqadi)`
        );
        break;
      }
      case "self_attention": {
        setSimulatedOutput(
          `Softmax(Q·K^T / √d_k)·V ➔ Barcha so'zlar bir vaqtda O(1) qadamda bog'landi. Parallel matritsa tayyor.`
        );
        break;
      }
      case "moe": {
        const expId = (playgroundInputA + playgroundInputB) % 8;
        const exp2Id = (expId + 3) % 8;
        setSimulatedOutput(
          `Router Top-2 gating: Token faqat Expert #${expId} va Expert #${exp2Id} ga yuborildi (6 ta ekspert uxlab turibdi, FLOPs tejaldi).`
        );
        break;
      }
      case "mamba": {
        const delta = 0.25;
        const a_bar = 1.0 - delta * 0.8;
        const h_new = a_bar * 0.5 + delta * playgroundInputA;
        setSimulatedOutput(
          `Selective SSM S6 step: h_t = Ā·h_{t-1} + B̄·x_t = ${h_new.toFixed(
            3
          )} (Chiziqli O(N) vaqt, KV-cache talab qilinmaydi).`
        );
        break;
      }
      default: {
        setSimulatedOutput(
          `Arxitektura forward pass: ${selectedArch.name} modeli kiruvchi qiymatlarni muvaffaqiyatli transformatsiya qildi.`
        );
      }
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/40 border border-violet-500/30 p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Deep Learning Evolutsiyasi: 1958 — 2023</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
              16 Landmark Papers
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-300 font-bold">
              6 Fundamental Savol
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Sixteen Architectures — 16 Ta Asosiy Deep Learning Arxitekturasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Perseptron (1958) dan to Mamba (2023) gacha bo‘lgan 65 yillik neyron
            tarmoqlar evolutsiyasi xaritasi. 6 ta eng muhim ilmiy savol, 16 ta
            tarixiy tadqiqot maqolasi va ularning aniq arxitekturaviy
            sxemalari.
          </p>
        </div>

        {/* Filter by the 6 Questions */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-violet-400" />
            <span>6 Ta Asosiy Bosqich / Savol Bo‘yicha Filtr:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedQuestionFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                selectedQuestionFilter === "all"
                  ? "bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-950"
                  : "bg-slate-950 text-slate-300 hover:text-white border-slate-800"
              }`}
            >
              Barcha 16 Arxitektura
            </button>
            {DL_QUESTION_GROUPS.map((q) => {
              const active = selectedQuestionFilter === q.id;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedQuestionFilter(q.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? `${q.colorScheme.bg} ${q.colorScheme.border} ${q.colorScheme.text} shadow-md`
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800"
                  }`}
                >
                  <span className="font-mono">{q.number}.</span>
                  <span>{q.questionEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* THE MAP: 16 ARCHITECTURES ROADMAP (Matching Image 3)                */}
      {/* =================================================================== */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Network className="w-4 h-4" />
              <span>The Map: Sixteen Architectures, Six Questions</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Evolutsiya Yo‘li va Arxitekturalar Oqimi
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Tanlangan arxitektura:{" "}
            <strong className="text-violet-300 font-mono text-sm">
              #{selectedArch.number} {selectedArch.name} ({selectedArch.year})
            </strong>
          </div>
        </div>

        {/* Serpentine Roadmap Timeline Grid (2 Rows of 3 Questions each) */}
        <div className="space-y-6">
          {/* Row 1: Questions 1, 2, 3 (Left to Right) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {DL_QUESTION_GROUPS.slice(0, 3).map((q) => {
              const archs = SIXTEEN_ARCHITECTURES.filter(
                (a) => a.questionCategory === q.id
              );
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    selectedQuestionFilter === q.id ||
                    selectedQuestionFilter === "all"
                      ? `${q.colorScheme.bg} ${q.colorScheme.border}`
                      : "bg-slate-900/40 border-slate-800/60 opacity-60"
                  }`}
                >
                  <div className="space-y-1 mb-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      Qadam {q.number} • {q.timeSpan}
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">
                      {q.questionEn}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-1 italic">
                      &ldquo;{q.questionUz}&rdquo;
                    </p>
                  </div>

                  {/* Architecture Badges along timeline */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                    {archs.map((arch) => {
                      const isSel = selectedArch.id === arch.id;
                      return (
                        <button
                          key={arch.id}
                          type="button"
                          onClick={() => setSelectedArchId(arch.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSel
                              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105"
                              : "bg-slate-950 text-slate-200 hover:text-white border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black ${
                              isSel
                                ? "bg-slate-950 text-amber-300"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {arch.number}
                          </span>
                          <span className="truncate">{arch.name}</span>
                          <span className="text-[10px] opacity-75 font-mono">
                            {arch.year}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Serpentine Connecting Curve Indicator */}
          <div className="hidden md:flex items-center justify-between px-8 py-1 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <Flame className="w-3.5 h-3.5" /> 1958: Birinchi Neyron
            </span>
            <div className="flex-1 mx-4 border-t border-dashed border-slate-700/80 relative">
              <span className="absolute right-0 -top-2 text-violet-400">⤵</span>
            </div>
            <span className="flex items-center gap-1 text-violet-400">
              2014: Tarjima & E&apos;tibor Inqilobi
            </span>
          </div>

          {/* Row 2: Questions 4, 5, 6 (Sequence, Attention, Scaling) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DL_QUESTION_GROUPS.slice(3, 6).map((q) => {
              const archs = SIXTEEN_ARCHITECTURES.filter(
                (a) => a.questionCategory === q.id
              );
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    selectedQuestionFilter === q.id ||
                    selectedQuestionFilter === "all"
                      ? `${q.colorScheme.bg} ${q.colorScheme.border}`
                      : "bg-slate-900/40 border-slate-800/60 opacity-60"
                  }`}
                >
                  <div className="space-y-1 mb-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      Qadam {q.number} • {q.timeSpan}
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">
                      {q.questionEn}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-1 italic">
                      &ldquo;{q.questionUz}&rdquo;
                    </p>
                  </div>

                  {/* Architecture Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                    {archs.map((arch) => {
                      const isSel = selectedArch.id === arch.id;
                      return (
                        <button
                          key={arch.id}
                          type="button"
                          onClick={() => setSelectedArchId(arch.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSel
                              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105"
                              : "bg-slate-950 text-slate-200 hover:text-white border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black ${
                              isSel
                                ? "bg-slate-950 text-amber-300"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {arch.number}
                          </span>
                          <span className="truncate">{arch.name}</span>
                          <span className="text-[10px] opacity-75 font-mono">
                            {arch.year}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* DETAILED ARCHITECTURE EXPLORER & INTERACTIVE SCHEMATIC              */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Detail & Explanation Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center font-mono text-xs">
                    {selectedArch.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-amber-300 border border-slate-800 font-mono text-xs font-bold">
                    {selectedArch.year}-yil
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {
                      DL_QUESTION_GROUPS.find(
                        (q) => q.id === selectedArch.questionCategory
                      )?.questionEn
                    }
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {selectedArch.name}
                </h3>
                <p className="text-xs text-cyan-300 font-semibold">
                  {selectedArch.fullNameUz}
                </p>
              </div>

              {/* View Switcher: Schematic vs Paper vs Math/Code */}
              <div className="flex gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab("schematic")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "schematic"
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sxema (Image 2)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("paper")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "paper"
                      ? "bg-amber-500 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Maqola (Image 1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("math_code")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "math_code"
                      ? "bg-emerald-500 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Formula & Kod
                </button>
              </div>
            </div>

            {/* Content Tabs */}
            {activeTab === "schematic" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>Nima uchun ixtiro qilingan? (Muammo va Yechim)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                    {selectedArch.whyInventedUz}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>Asosiy Ilmiy Yangilik (Key Breakthrough)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                    {selectedArch.keyInnovationUz}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Afzalliklari</span>
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      {selectedArch.strengthsUz.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Keyingi Avlodga Sabab Bo‘lgan Cheklovi</span>
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      {selectedArch.limitationsUz.map((l, idx) => (
                        <li key={idx}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "paper" && (
              <div className="space-y-4">
                {/* Paper Banner matching Image 1 */}
                <div className="p-5 rounded-2xl bg-stone-900 border border-amber-500/40 text-stone-100 space-y-3 font-serif shadow-inner">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-mono border-b border-stone-700 pb-2">
                    <span>
                      ORIGINAL RESEARCH PAPER • {selectedArch.paper.year}
                    </span>
                    <span>{selectedArch.paper.institution}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {selectedArch.paper.title}
                  </h4>
                  <div className="text-xs text-amber-200/90 font-sans font-semibold">
                    Mualliflar: {selectedArch.paper.authors}
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    Iqtibos: {selectedArch.paper.citationKey}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Natija va Tarixiy Ta&apos;siri:
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedArch.summaryUz}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "math_code" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Matematik Ifodasi:
                  </span>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-amber-200 overflow-x-auto">
                    {selectedArch.formula}
                  </div>
                  <p className="text-xs text-slate-400">
                    {selectedArch.formulaExplanationUz}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Minimal Pure-Python Amalga Oshirish:
                  </span>
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{selectedArch.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Visual Schematic & Playground (Matching Image 2) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Schematic Box */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-violet-500/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-violet-400" />
                <span>Arxitektura Sxemasi (Image 2)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                #{selectedArch.number} {selectedArch.name}
              </span>
            </div>

            {/* Render Architecture SVG Diagram */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 p-4 flex items-center justify-center relative overflow-hidden">
              <ArchitectureSvgSchematic diagramType={selectedArch.diagramType} />
            </div>

            {/* Interactive Simulation Playground */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interaktiv Parametrlar & Forward Pass:</span>
                </span>
                <button
                  type="button"
                  onClick={handleSimulate}
                  className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Hisoblash
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">
                    Kirish parametri X₁: {playgroundInputA}
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="5"
                    step="1"
                    value={playgroundInputA}
                    onChange={(e) =>
                      setPlaygroundInputA(parseFloat(e.target.value))
                    }
                    className="w-full accent-violet-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">
                    Kirish parametri X₂: {playgroundInputB}
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="5"
                    step="1"
                    value={playgroundInputB}
                    onChange={(e) =>
                      setPlaygroundInputB(parseFloat(e.target.value))
                    }
                    className="w-full accent-violet-500"
                  />
                </div>
              </div>

              {simulatedOutput && (
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  {simulatedOutput}
                </div>
              )}
            </div>

            {/* Prev / Next Architecture Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={selectedArch.number === 1}
                onClick={() =>
                  setSelectedArchId(
                    SIXTEEN_ARCHITECTURES[selectedArch.number - 2]?.id ??
                      selectedArch.id
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Oldingi ({selectedArch.number - 1})
              </button>
              <span className="text-xs font-mono text-slate-400">
                {selectedArch.number} / 16
              </span>
              <button
                type="button"
                disabled={selectedArch.number === 16}
                onClick={() =>
                  setSelectedArchId(
                    SIXTEEN_ARCHITECTURES[selectedArch.number]?.id ??
                      selectedArch.id
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Keyingi ({selectedArch.number + 1}) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * High-fidelity SVG Schematics representing the 16 iconic drawings from Image 2
 */
function ArchitectureSvgSchematic({
  diagramType,
}: {
  diagramType: DlArchitecture["diagramType"];
}) {
  switch (diagramType) {
    case "perceptron":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Inputs */}
          <rect
            x="30"
            y="50"
            width="60"
            height="50"
            rx="10"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="60"
            y="80"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            x₁
          </text>
          <rect
            x="30"
            y="140"
            width="60"
            height="50"
            rx="10"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="60"
            y="170"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            x₂
          </text>
          {/* Lines to Sum */}
          <line
            x1="90"
            y1="75"
            x2="170"
            y2="120"
            className="stroke-teal-400 stroke-2"
          />
          <line
            x1="90"
            y1="165"
            x2="170"
            y2="120"
            className="stroke-teal-400 stroke-2"
          />
          {/* Sum Circle */}
          <circle
            cx="190"
            cy="120"
            r="24"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="190"
            y="126"
            textAnchor="middle"
            className="fill-pink-300 text-lg font-bold"
          >
            +
          </text>
          {/* Line to Step */}
          <line
            x1="214"
            y1="120"
            x2="260"
            y2="120"
            className="stroke-pink-400 stroke-2"
          />
          {/* Step Function Box */}
          <rect
            x="260"
            y="95"
            width="55"
            height="50"
            rx="10"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <path
            d="M 270 130 L 287 130 L 287 110 L 305 110"
            fill="none"
            className="stroke-white stroke-2"
          />
          {/* Output Arrow */}
          <line
            x1="315"
            y1="120"
            x2="370"
            y2="120"
            className="stroke-teal-400 stroke-2"
          />
          <polygon points="370,116 380,120 370,124" className="fill-teal-400" />
          <text
            x="360"
            y="105"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono"
          >
            y ∈ {"{0, 1}"}
          </text>
        </svg>
      );

    case "mlp":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Layer 1: Inputs (Blue) */}
          <circle
            cx="70"
            cy="80"
            r="16"
            className="fill-sky-950 stroke-sky-400 stroke-2"
          />
          <circle
            cx="70"
            cy="160"
            r="16"
            className="fill-sky-950 stroke-sky-400 stroke-2"
          />
          {/* Layer 2: Hidden (Emerald) */}
          <circle
            cx="200"
            cy="50"
            r="16"
            className="fill-emerald-950 stroke-emerald-400 stroke-2"
          />
          <circle
            cx="200"
            cy="100"
            r="16"
            className="fill-emerald-950 stroke-emerald-400 stroke-2"
          />
          <circle
            cx="200"
            cy="150"
            r="16"
            className="fill-emerald-950 stroke-emerald-400 stroke-2"
          />
          <circle
            cx="200"
            cy="200"
            r="16"
            className="fill-emerald-950 stroke-emerald-400 stroke-2"
          />
          {/* Layer 3: Output */}
          <circle
            cx="330"
            cy="125"
            r="16"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          {/* Dense Connections */}
          {[80, 160].map((y1) =>
            [50, 100, 150, 200].map((y2) => (
              <line
                key={`${y1}-${y2}`}
                x1="86"
                y1={y1}
                x2="184"
                y2={y2}
                className="stroke-slate-600 stroke-1 opacity-70"
              />
            ))
          )}
          {[50, 100, 150, 200].map((y2) => (
            <line
              key={y2}
              x1="216"
              y1={y2}
              x2="314"
              y2="125"
              className="stroke-emerald-400 stroke-1 opacity-70"
            />
          ))}
          <text
            x="70"
            y="235"
            textAnchor="middle"
            className="fill-slate-400 text-[10px] font-mono"
          >
            Input x
          </text>
          <text
            x="200"
            y="235"
            textAnchor="middle"
            className="fill-emerald-300 text-[10px] font-mono"
          >
            Hidden h
          </text>
          <text
            x="330"
            y="235"
            textAnchor="middle"
            className="fill-teal-300 text-[10px] font-mono"
          >
            Output ŷ
          </text>
        </svg>
      );

    case "cnn":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Input Feature Map Cuboid */}
          <rect
            x="30"
            y="50"
            width="50"
            height="130"
            rx="4"
            className="fill-sky-900/60 stroke-sky-400 stroke-2"
          />
          <text
            x="55"
            y="120"
            textAnchor="middle"
            className="fill-sky-200 text-xs font-mono font-bold"
          >
            Image
          </text>
          {/* Conv block 1 */}
          <rect
            x="110"
            y="70"
            width="40"
            height="100"
            rx="4"
            className="fill-sky-950 stroke-sky-400 stroke-2"
          />
          {/* Conv block 2 */}
          <rect
            x="180"
            y="85"
            width="35"
            height="75"
            rx="4"
            className="fill-sky-950 stroke-sky-400 stroke-2"
          />
          {/* Pooling block 3 */}
          <rect
            x="245"
            y="95"
            width="30"
            height="55"
            rx="4"
            className="fill-sky-950 stroke-sky-400 stroke-2"
          />
          {/* Dense vector */}
          <rect
            x="315"
            y="75"
            width="16"
            height="100"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          {/* Connection Lines */}
          <line
            x1="80"
            y1="115"
            x2="110"
            y2="115"
            className="stroke-sky-400 stroke-1 stroke-dasharray-2"
          />
          <line
            x1="150"
            y1="115"
            x2="180"
            y2="115"
            className="stroke-sky-400 stroke-1 stroke-dasharray-2"
          />
          <line
            x1="215"
            y1="115"
            x2="245"
            y2="115"
            className="stroke-sky-400 stroke-1 stroke-dasharray-2"
          />
          <line
            x1="275"
            y1="115"
            x2="315"
            y2="115"
            className="stroke-teal-400 stroke-1 stroke-dasharray-2"
          />
          <text
            x="323"
            y="200"
            textAnchor="middle"
            className="fill-teal-300 text-[10px] font-mono"
          >
            Dense Class
          </text>
        </svg>
      );

    case "resnet":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Weight blocks */}
          <rect
            x="40"
            y="100"
            width="55"
            height="45"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="67"
            y="127"
            textAnchor="middle"
            className="fill-teal-300 text-[11px] font-mono"
          >
            F(x)
          </text>
          {/* Residual Add (+) */}
          <circle
            cx="135"
            cy="122"
            r="16"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="135"
            y="128"
            textAnchor="middle"
            className="fill-pink-300 text-sm font-bold"
          >
            +
          </text>
          {/* Block 2 */}
          <rect
            x="180"
            y="100"
            width="55"
            height="45"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="207"
            y="127"
            textAnchor="middle"
            className="fill-teal-300 text-[11px] font-mono"
          >
            F(x)
          </text>
          {/* Residual Add 2 (+) */}
          <circle
            cx="275"
            cy="122"
            r="16"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="275"
            y="128"
            textAnchor="middle"
            className="fill-pink-300 text-sm font-bold"
          >
            +
          </text>
          {/* Block 3 */}
          <rect
            x="320"
            y="100"
            width="55"
            height="45"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          {/* Curving Skip Connections (Identity Shortcuts) */}
          <path
            d="M 20 122 C 20 50, 135 50, 135 106"
            fill="none"
            className="stroke-emerald-400 stroke-2"
          />
          <circle cx="20" cy="122" r="4" className="fill-emerald-400" />
          <path
            d="M 151 122 C 151 50, 275 50, 275 106"
            fill="none"
            className="stroke-emerald-400 stroke-2"
          />
          <circle cx="151" cy="122" r="4" className="fill-emerald-400" />
          <text
            x="135"
            y="42"
            textAnchor="middle"
            className="fill-emerald-300 text-xs font-mono font-bold"
          >
            Skip Connection (+x)
          </text>
        </svg>
      );

    case "word_embeddings":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* One hot token input */}
          <rect
            x="30"
            y="95"
            width="50"
            height="50"
            rx="8"
            className="fill-sky-950 stroke-sky-400 stroke-2"
          />
          <text
            x="55"
            y="125"
            textAnchor="middle"
            className="fill-sky-300 text-xs font-mono"
          >
            token
          </text>
          {/* Arrow */}
          <path
            d="M 80 120 L 130 120"
            className="stroke-sky-400 stroke-2"
            markerEnd="url(#arrow)"
          />
          {/* Embedding Table Grid */}
          <rect
            x="130"
            y="40"
            width="100"
            height="160"
            rx="6"
            className="fill-slate-900 stroke-teal-400 stroke-2"
          />
          {/* Highlighted Row */}
          <rect
            x="130"
            y="85"
            width="100"
            height="25"
            className="fill-amber-500/80 stroke-amber-300 stroke-1"
          />
          <text
            x="180"
            y="102"
            textAnchor="middle"
            className="fill-slate-950 text-xs font-mono font-bold"
          >
            Lookup Row
          </text>
          <text
            x="180"
            y="180"
            textAnchor="middle"
            className="fill-slate-400 text-[10px] font-mono"
          >
            Vocab Matrix
          </text>
          {/* Arrow to Vector */}
          <path d="M 230 97 L 270 97" className="stroke-amber-400 stroke-2" />
          {/* Dense vector slots */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={275 + i * 22}
              y="85"
              width="18"
              height="25"
              rx="3"
              className="fill-amber-500 stroke-amber-300 stroke-1"
            />
          ))}
          <text
            x="330"
            y="135"
            textAnchor="middle"
            className="fill-amber-300 text-xs font-mono font-bold"
          >
            Dense Vector (300D)
          </text>
        </svg>
      );

    case "rnn":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${60 + i * 110}, 0)`}>
              {/* Input */}
              <line
                x1="40"
                y1="200"
                x2="40"
                y2="155"
                className="stroke-sky-400 stroke-2"
              />
              <text
                x="40"
                y="225"
                textAnchor="middle"
                className="fill-sky-300 text-xs font-mono"
              >
                x_{i + 1}
              </text>
              {/* Cell */}
              <rect
                x="15"
                y="100"
                width="50"
                height="55"
                rx="10"
                className="fill-teal-950 stroke-teal-400 stroke-2"
              />
              <text
                x="40"
                y="132"
                textAnchor="middle"
                className="fill-teal-300 text-xs font-mono font-bold"
              >
                tanh
              </text>
              {/* Output */}
              <line
                x1="40"
                y1="100"
                x2="40"
                y2="55"
                className="stroke-teal-400 stroke-2"
              />
              <text
                x="40"
                y="45"
                textAnchor="middle"
                className="fill-teal-300 text-xs font-mono"
              >
                h_{i + 1}
              </text>
              {/* Recurrent Horizontal Connection */}
              {i < 2 && (
                <line
                  x1="65"
                  y1="127"
                  x2="125"
                  y2="127"
                  className="stroke-teal-400 stroke-2"
                />
              )}
            </g>
          ))}
        </svg>
      );

    case "lstm":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Main Highway Cell State Line */}
          <line
            x1="30"
            y1="70"
            x2="370"
            y2="70"
            className="stroke-emerald-400 stroke-4"
          />
          <text
            x="200"
            y="50"
            textAnchor="middle"
            className="fill-emerald-300 text-xs font-mono font-bold"
          >
            Cell State Highway (c_t)
          </text>
          {/* 3 Cells */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${50 + i * 115}, 0)`}>
              <rect
                x="10"
                y="95"
                width="65"
                height="80"
                rx="12"
                className="fill-teal-950 stroke-teal-400 stroke-2"
              />
              {/* Gate circles */}
              <circle
                cx="42"
                cy="70"
                r="7"
                className="fill-pink-950 stroke-pink-400 stroke-2"
              />
              <circle
                cx="25"
                cy="135"
                r="6"
                className="fill-emerald-400 stroke-slate-900"
              />
              <circle
                cx="42"
                cy="135"
                r="6"
                className="fill-emerald-400 stroke-slate-900"
              />
              <circle
                cx="60"
                cy="135"
                r="6"
                className="fill-emerald-400 stroke-slate-900"
              />
              <text
                x="42"
                y="165"
                textAnchor="middle"
                className="fill-slate-300 text-[9px] font-mono"
              >
                f, i, o gates
              </text>
              <line
                x1="42"
                y1="95"
                x2="42"
                y2="77"
                className="stroke-pink-400 stroke-2"
              />
            </g>
          ))}
        </svg>
      );

    case "gru":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          <line
            x1="30"
            y1="90"
            x2="370"
            y2="90"
            className="stroke-teal-400 stroke-3"
          />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${50 + i * 115}, 0)`}>
              <rect
                x="10"
                y="110"
                width="65"
                height="65"
                rx="10"
                className="fill-teal-950 stroke-teal-400 stroke-2"
              />
              <circle
                cx="30"
                cy="90"
                r="8"
                className="fill-pink-950 stroke-pink-400 stroke-2"
              />
              <circle
                cx="55"
                cy="90"
                r="8"
                className="fill-pink-950 stroke-pink-400 stroke-2"
              />
              <text
                x="42"
                y="148"
                textAnchor="middle"
                className="fill-teal-300 text-[10px] font-mono"
              >
                r & z gates
              </text>
            </g>
          ))}
          <text
            x="200"
            y="65"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            Hidden State Highway h_t (Reset + Update)
          </text>
        </svg>
      );

    case "seq2seq":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Encoder side (3 cells) */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={30 + i * 45}
              y="100"
              width="35"
              height="45"
              rx="6"
              className="fill-teal-950 stroke-teal-400 stroke-2"
            />
          ))}
          {/* Bottleneck Vector */}
          <rect
            x="175"
            y="70"
            width="22"
            height="105"
            rx="4"
            className="fill-amber-500 stroke-amber-300 stroke-2"
          />
          <text
            x="186"
            y="55"
            textAnchor="middle"
            className="fill-amber-300 text-[10px] font-mono font-bold"
          >
            Context Vector
          </text>
          {/* Decoder side (3 cells) */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={225 + i * 45}
              y="100"
              width="35"
              height="45"
              rx="6"
              className="fill-teal-950 stroke-teal-400 stroke-2"
            />
          ))}
          <text
            x="75"
            y="180"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            Encoder
          </text>
          <text
            x="270"
            y="180"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            Decoder
          </text>
        </svg>
      );

    case "attention":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Encoder states bottom */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${50 + i * 55}, 160)`}>
              <rect
                x="0"
                y="0"
                width="40"
                height="40"
                rx="8"
                className="fill-teal-950 stroke-teal-400 stroke-2"
              />
              <text
                x="20"
                y="24"
                textAnchor="middle"
                className="fill-teal-300 text-xs font-mono"
              >
                h_{i + 1}
              </text>
            </g>
          ))}
          {/* Attention Sun / Softmax */}
          <circle
            cx="135"
            cy="80"
            r="20"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="135"
            y="85"
            textAnchor="middle"
            className="fill-pink-300 text-base font-bold"
          >
            +
          </text>
          {/* Beams */}
          {[50, 105, 160, 215].map((x, idx) => (
            <line
              key={idx}
              x1={x + 20}
              y1="160"
              x2="135"
              y2="100"
              className={`stroke-2 ${
                idx === 1
                  ? "stroke-amber-400 stroke-3"
                  : "stroke-slate-600 opacity-60"
              }`}
            />
          ))}
          {/* Decoder state */}
          <rect
            x="240"
            y="60"
            width="65"
            height="45"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="272"
            y="87"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            s_i (Dec)
          </text>
          <line
            x1="155"
            y1="80"
            x2="240"
            y2="80"
            className="stroke-sky-400 stroke-2"
          />
          <text
            x="135"
            y="35"
            textAnchor="middle"
            className="fill-amber-300 text-xs font-mono font-bold"
          >
            Weighted Context c_i
          </text>
        </svg>
      );

    case "self_attention":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* 3 Projections Q, K, V */}
          <rect
            x="50"
            y="40"
            width="50"
            height="35"
            rx="6"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="75"
            y="62"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            Q
          </text>
          <rect
            x="50"
            y="95"
            width="50"
            height="35"
            rx="6"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="75"
            y="117"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            K
          </text>
          <rect
            x="50"
            y="150"
            width="50"
            height="35"
            rx="6"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="75"
            y="172"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            V
          </text>
          {/* MatMul Q and K */}
          <circle
            cx="160"
            cy="70"
            r="16"
            className="fill-sky-950 stroke-sky-400 stroke-2"
          />
          <text
            x="160"
            y="75"
            textAnchor="middle"
            className="fill-sky-300 text-sm font-bold"
          >
            ×
          </text>
          <line
            x1="100"
            y1="57"
            x2="144"
            y2="70"
            className="stroke-sky-400 stroke-2"
          />
          <line
            x1="100"
            y1="112"
            x2="144"
            y2="70"
            className="stroke-sky-400 stroke-2"
          />
          {/* Softmax Heatmap */}
          <rect
            x="200"
            y="52"
            width="55"
            height="36"
            rx="8"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <line
            x1="176"
            y1="70"
            x2="200"
            y2="70"
            className="stroke-pink-400 stroke-2"
          />
          <text
            x="227"
            y="74"
            textAnchor="middle"
            className="fill-pink-300 text-[10px] font-mono font-bold"
          >
            Softmax
          </text>
          {/* Matmul with V */}
          <circle
            cx="290"
            cy="115"
            r="16"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="290"
            y="120"
            textAnchor="middle"
            className="fill-pink-300 text-sm font-bold"
          >
            ×
          </text>
          <line
            x1="255"
            y1="70"
            x2="290"
            y2="99"
            className="stroke-pink-400 stroke-2"
          />
          <line
            x1="100"
            y1="167"
            x2="274"
            y2="115"
            className="stroke-teal-400 stroke-2"
          />
          {/* Output */}
          <line
            x1="306"
            y1="115"
            x2="360"
            y2="115"
            className="stroke-emerald-400 stroke-3"
          />
          <polygon
            points="360,111 370,115 360,119"
            className="fill-emerald-400"
          />
          <text
            x="345"
            y="100"
            textAnchor="middle"
            className="fill-emerald-300 text-xs font-mono font-bold"
          >
            Attn(Q,K,V)
          </text>
        </svg>
      );

    case "transformer":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Main Block Box */}
          <rect
            x="60"
            y="30"
            width="240"
            height="180"
            rx="16"
            className="fill-slate-900/90 stroke-slate-700 stroke-2"
          />
          {/* Multi-head attention inner */}
          <rect
            x="85"
            y="120"
            width="65"
            height="55"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="117"
            y="152"
            textAnchor="middle"
            className="fill-teal-300 text-[10px] font-mono font-bold"
          >
            Self-Attn
          </text>
          <circle
            cx="175"
            cy="147"
            r="12"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="175"
            y="152"
            textAnchor="middle"
            className="fill-pink-300 text-xs font-bold"
          >
            +
          </text>
          {/* Feed forward inner */}
          <rect
            x="205"
            y="120"
            width="65"
            height="55"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="237"
            y="152"
            textAnchor="middle"
            className="fill-teal-300 text-[10px] font-mono font-bold"
          >
            FFN
          </text>
          {/* LayerNorm & N badge */}
          <text
            x="340"
            y="125"
            textAnchor="middle"
            className="fill-white text-2xl font-bold font-mono"
          >
            × N
          </text>
          <text
            x="180"
            y="65"
            textAnchor="middle"
            className="fill-slate-300 text-xs font-mono font-bold"
          >
            Transformer Layer (Add & Norm)
          </text>
        </svg>
      );

    case "bert":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Horizontal bidirectional arc lines */}
          <path
            d="M 50 140 C 50 40, 350 40, 350 140"
            fill="none"
            className="stroke-teal-400 stroke-2"
          />
          <path
            d="M 125 140 C 125 70, 275 70, 275 140"
            fill="none"
            className="stroke-amber-400 stroke-2"
          />
          {/* Token boxes */}
          {[
            { id: "x₁", x: 50 },
            { id: "x₂", x: 125 },
            { id: "[?]", x: 200, mask: true },
            { id: "x₄", x: 275 },
            { id: "x₅", x: 350 },
          ].map((tok, i) => (
            <g key={i}>
              <rect
                x={tok.x - 25}
                y="140"
                width="50"
                height="45"
                rx="8"
                className={`stroke-2 ${
                  tok.mask
                    ? "fill-amber-950/80 stroke-amber-400 stroke-dashed"
                    : "fill-teal-950 stroke-teal-400"
                }`}
              />
              <text
                x={tok.x}
                y="167"
                textAnchor="middle"
                className={`font-mono text-xs font-bold ${
                  tok.mask ? "fill-amber-300 text-sm" : "fill-teal-300"
                }`}
              >
                {tok.id}
              </text>
            </g>
          ))}
          <text
            x="200"
            y="220"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono font-bold"
          >
            Bidirectional Context + Masked LM
          </text>
        </svg>
      );

    case "gpt":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Lower triangular causal mask grid */}
          <g transform="translate(60, 60)">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => {
                const allowed = col <= row;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 22}
                    y={row * 22}
                    width="18"
                    height="18"
                    rx="3"
                    className={
                      allowed
                        ? "fill-amber-500 stroke-amber-300 stroke-1"
                        : "fill-slate-900 stroke-slate-800 opacity-40"
                    }
                  />
                );
              })
            )}
            <text
              x="44"
              y="115"
              textAnchor="middle"
              className="fill-amber-300 text-[10px] font-mono"
            >
              Causal Mask
            </text>
          </g>
          {/* Autoregressive Loop Box */}
          <rect
            x="200"
            y="70"
            width="140"
            height="85"
            rx="12"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="270"
            y="110"
            textAnchor="middle"
            className="fill-white text-xs font-mono font-bold"
          >
            Decoder Layer
          </text>
          <text
            x="270"
            y="130"
            textAnchor="middle"
            className="fill-amber-300 text-[10px] font-mono"
          >
            P(x_t | x_&lt;t)
          </text>
          {/* Autoregressive feedback arrow */}
          <path
            d="M 340 112 C 380 112, 380 180, 270 180 C 180 180, 180 112, 200 112"
            fill="none"
            className="stroke-amber-400 stroke-2"
          />
        </svg>
      );

    case "moe":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Input token */}
          <rect
            x="20"
            y="100"
            width="45"
            height="45"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="42"
            y="127"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono"
          >
            Token
          </text>
          {/* Router */}
          <path
            d="M 65 122 L 105 122"
            className="stroke-amber-400 stroke-2"
            markerEnd="url(#arrow)"
          />
          {/* Parallel Experts (8 boxes, 2 highlighted) */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const active = i === 1 || i === 4;
            return (
              <g key={i} transform={`translate(${115 + i * 36}, 90)`}>
                <rect
                  x="0"
                  y="0"
                  width="28"
                  height="65"
                  rx="6"
                  className={`stroke-2 ${
                    active
                      ? "fill-amber-500/80 stroke-amber-300"
                      : "fill-slate-900 stroke-slate-700 opacity-50"
                  }`}
                />
                <text
                  x="14"
                  y="38"
                  textAnchor="middle"
                  className={`text-[10px] font-mono ${
                    active ? "fill-slate-950 font-bold" : "fill-slate-400"
                  }`}
                >
                  E{i + 1}
                </text>
              </g>
            );
          })}
          {/* Output Sum */}
          <circle
            cx="355"
            cy="122"
            r="16"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="355"
            y="127"
            textAnchor="middle"
            className="fill-pink-300 text-sm font-bold"
          >
            +
          </text>
          <text
            x="215"
            y="55"
            textAnchor="middle"
            className="fill-amber-300 text-xs font-mono font-bold"
          >
            Sparse Top-2 Gating (6 Inactive Experts)
          </text>
        </svg>
      );

    case "mamba":
      return (
        <svg viewBox="0 0 400 250" className="w-full h-full max-h-60">
          {/* Input */}
          <rect
            x="30"
            y="100"
            width="45"
            height="45"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="52"
            y="127"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono"
          >
            x_t
          </text>
          {/* Continuous SSM Discretization Matrix Box */}
          <g transform="translate(110, 80)">
            <rect
              x="0"
              y="0"
              width="170"
              height="85"
              rx="12"
              className="fill-slate-900 stroke-violet-400 stroke-2"
            />
            {/* Inner scanning grid */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={12 + i * 21}
                y="15"
                width="15"
                height="55"
                rx="3"
                className={`stroke-1 ${
                  i === 3
                    ? "fill-violet-500 stroke-violet-300"
                    : i === 4
                    ? "fill-emerald-500 stroke-emerald-300"
                    : "fill-slate-950 stroke-slate-800"
                }`}
              />
            ))}
          </g>
          {/* Skip Connection */}
          <path
            d="M 75 110 C 75 40, 310 40, 310 110"
            fill="none"
            className="stroke-sky-400 stroke-2"
          />
          {/* Output Gated */}
          <circle
            cx="310"
            cy="122"
            r="16"
            className="fill-pink-950 stroke-pink-400 stroke-2"
          />
          <text
            x="310"
            y="127"
            textAnchor="middle"
            className="fill-pink-300 text-sm font-bold"
          >
            ×
          </text>
          <line
            x1="280"
            y1="122"
            x2="294"
            y2="122"
            className="stroke-violet-400 stroke-2"
          />
          <rect
            x="345"
            y="100"
            width="45"
            height="45"
            rx="8"
            className="fill-teal-950 stroke-teal-400 stroke-2"
          />
          <text
            x="367"
            y="127"
            textAnchor="middle"
            className="fill-teal-300 text-xs font-mono"
          >
            y_t
          </text>
          <text
            x="200"
            y="200"
            textAnchor="middle"
            className="fill-violet-300 text-xs font-mono font-bold"
          >
            Selective State Space (S6) • O(N) Linear Time
          </text>
        </svg>
      );
  }
}
