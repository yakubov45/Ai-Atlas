"use client";

import React, { useState, useMemo } from "react";
import {
  Network,
  ListFilter,
  Target,
  Search,
  BookOpen,
  Boxes,
  Sparkles,
  Layers,
} from "lucide-react";
import type { ConceptDomain, KnowledgeConcept } from "@/lib/knowledge-graph/types";
import { useLearning } from "@/hooks/use-learning";
import { getConceptById } from "@/lib/knowledge-graph/concepts";
import { InteractiveGraphCanvas } from "./InteractiveGraphCanvas";
import { StructuredListView } from "./StructuredListView";
import { LearningPathView } from "./LearningPathView";
import { ConceptDetailsModal } from "./ConceptDetailsModal";
import { KnowledgeDashboardStats } from "./KnowledgeDashboardStats";

export function KnowledgeMapClient() {
  const { state, toggleConceptKnown } = useLearning();

  const [activeTab, setActiveTab] = useState<"graph" | "list" | "path">("graph");
  const [selectedDomain, setSelectedDomain] = useState<ConceptDomain | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedConcept, setSelectedConcept] = useState<KnowledgeConcept | null>(null);

  const knownConceptIds = useMemo(
    () => Object.keys(state.knownConcepts ?? {}),
    [state.knownConcepts]
  );
  const completedLessonIds = useMemo(
    () => Object.keys(state.completedMicroLessons ?? {}),
    [state.completedMicroLessons]
  );

  const domains: Array<{ id: ConceptDomain | "all"; labelUz: string }> = [
    { id: "all", labelUz: "Barchasi" },
    { id: "programming", labelUz: "Dasturlash" },
    { id: "mathematics", labelUz: "Matematika" },
    { id: "data-science", labelUz: "Data Science" },
    { id: "machine-learning", labelUz: "Machine Learning" },
    { id: "ai-engineering", labelUz: "AI Engineering" },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Introduction Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider">
          <Network className="w-4 h-4" />
          <span>Yagona Ta&apos;lim Ekotizimi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          AI Knowledge Map — Umumiy bilimlar xaritasi
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
          Python, AI Engineering, Machine Learning va Data Science bo&apos;yicha 4 ta
          akademiyadagi 1,600 dan ortiq mikro-darslarni bog&apos;lovchi interaktiv bilimlar grafigi
          va shaxsiy o&apos;quv yo&apos;li generatori.
        </p>
      </div>

      {/* Dashboard Stats */}
      <KnowledgeDashboardStats knownCount={knownConceptIds.length} />

      {/* Controls & Navigation Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 border-t border-slate-800">
        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium self-start">
          <button
            onClick={() => setActiveTab("graph")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "graph"
                ? "bg-violet-600 text-white shadow-md shadow-violet-950"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Interaktiv Graf</span>
          </button>

          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "list"
                ? "bg-violet-600 text-white shadow-md shadow-violet-950"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Strukturaviy Ro&apos;yxat</span>
          </button>

          <button
            onClick={() => setActiveTab("path")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "path"
                ? "bg-violet-600 text-white shadow-md shadow-violet-950"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>O&apos;quv Yo&apos;li</span>
          </button>
        </div>

        {/* Search Bar */}
        {activeTab !== "path" && (
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tushuncha yoki atamani qidirish..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        )}
      </div>

      {/* Domain Filters (For Graph and List views) */}
      {activeTab !== "path" && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {domains.map((dom) => (
            <button
              key={dom.id}
              onClick={() => setSelectedDomain(dom.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                selectedDomain === dom.id
                  ? "bg-slate-100 text-slate-950 font-semibold shadow"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80"
              }`}
            >
              {dom.labelUz}
            </button>
          ))}
        </div>
      )}

      {/* Active Tab View */}
      {activeTab === "graph" && (
        <InteractiveGraphCanvas
          onSelectConcept={setSelectedConcept}
          knownConceptIds={knownConceptIds}
          selectedDomain={selectedDomain}
          searchQuery={searchQuery}
        />
      )}

      {activeTab === "list" && (
        <StructuredListView
          onSelectConcept={setSelectedConcept}
          knownConceptIds={knownConceptIds}
          onToggleKnown={toggleConceptKnown}
          selectedDomain={selectedDomain}
          searchQuery={searchQuery}
        />
      )}

      {activeTab === "path" && (
        <LearningPathView
          onSelectConcept={setSelectedConcept}
          knownConceptIds={knownConceptIds}
          completedLessonIds={completedLessonIds}
          onToggleKnown={toggleConceptKnown}
        />
      )}

      {/* Concept Details Modal */}
      <ConceptDetailsModal
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
        onSelectConcept={(conceptId) => {
          const next = getConceptById(conceptId);
          if (next) setSelectedConcept(next);
        }}
        isKnown={selectedConcept ? knownConceptIds.includes(selectedConcept.id) : false}
        onToggleKnown={toggleConceptKnown}
      />
    </div>
  );
}
