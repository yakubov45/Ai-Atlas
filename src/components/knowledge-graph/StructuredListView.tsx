"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Code2,
  Workflow,
  Sparkles,
} from "lucide-react";
import type { ConceptDomain, KnowledgeConcept } from "@/lib/knowledge-graph/types";
import { CANONICAL_CONCEPTS } from "@/lib/knowledge-graph/concepts";
import { DOMAIN_COLORS, DOMAIN_TITLES_UZ } from "@/lib/knowledge-graph/layout";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import { getConceptById } from "@/lib/knowledge-graph/concepts";

export interface StructuredListViewProps {
  onSelectConcept: (concept: KnowledgeConcept) => void;
  knownConceptIds: readonly string[];
  onToggleKnown: (conceptId: string) => void;
  selectedDomain: ConceptDomain | "all";
  searchQuery: string;
}

export function StructuredListView({
  onSelectConcept,
  knownConceptIds,
  onToggleKnown,
  selectedDomain,
  searchQuery,
}: StructuredListViewProps) {
  const [collapsedDomains, setCollapsedDomains] = useState<Record<string, boolean>>({});
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "known" | "unlearned">("all");

  const knownSet = useMemo(() => new Set(knownConceptIds), [knownConceptIds]);

  const toggleDomain = (domain: string) => {
    setCollapsedDomains((prev) => ({ ...prev, [domain]: !prev[domain] }));
  };

  // Filtered concepts
  const filteredConcepts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return CANONICAL_CONCEPTS.filter((concept) => {
      // Domain filter
      if (selectedDomain !== "all" && concept.domain !== selectedDomain) return false;

      // Difficulty filter
      if (difficultyFilter !== "all" && concept.difficulty !== difficultyFilter) return false;

      // Status filter
      const isKnown = knownSet.has(concept.id);
      if (statusFilter === "known" && !isKnown) return false;
      if (statusFilter === "unlearned" && isKnown) return false;

      // Search query
      if (q) {
        const matchesName = concept.name.toLowerCase().includes(q);
        const matchesNameUz = concept.nameUz.toLowerCase().includes(q);
        const matchesAliases = concept.aliases.some((a) => a.toLowerCase().includes(q));
        const matchesCategory = concept.category.toLowerCase().includes(q);
        if (!matchesName && !matchesNameUz && !matchesAliases && !matchesCategory) return false;
      }

      return true;
    });
  }, [selectedDomain, difficultyFilter, statusFilter, searchQuery, knownSet]);

  // Group by Domain
  const domains: ConceptDomain[] = [
    "programming",
    "mathematics",
    "data-science",
    "machine-learning",
    "ai-engineering",
  ];

  const groupedByDomain = useMemo(() => {
    const map = new Map<ConceptDomain, KnowledgeConcept[]>();
    domains.forEach((d) => map.set(d, []));
    filteredConcepts.forEach((c) => {
      map.get(c.domain)?.push(c);
    });
    return map;
  }, [filteredConcepts]);

  return (
    <div className="space-y-6">
      {/* Sub-filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium">Qiyinlik:</span>
          {(["all", "beginner", "intermediate", "advanced"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDifficultyFilter(lvl)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                difficultyFilter === lvl
                  ? "bg-violet-600 text-white font-medium"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {lvl === "all" ? "Barchasi" : lvl}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium">Holat:</span>
          {(["all", "known", "unlearned"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-cyan-600 text-white font-medium"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {st === "all"
                ? "Barchasi"
                : st === "known"
                ? "O'zlashtirilgan"
                : "O'rganilishi kerak"}
            </button>
          ))}
        </div>
      </div>

      {/* Domain Groups */}
      <div className="space-y-4">
        {domains.map((domain) => {
          const concepts = groupedByDomain.get(domain) ?? [];
          if (concepts.length === 0 && selectedDomain !== "all") return null;

          const isCollapsed = collapsedDomains[domain];
          const colors = DOMAIN_COLORS[domain];

          return (
            <div
              key={domain}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              {/* Domain Header Accordion */}
              <button
                onClick={() => toggleDomain(domain)}
                className="w-full flex items-center justify-between p-4 bg-slate-900/80 hover:bg-slate-850 border-b border-slate-800/60 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {isCollapsed ? (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${colors.badgeBg} border border-current/40`} />
                      {DOMAIN_TITLES_UZ[domain]}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                    {concepts.length} ta tushuncha
                  </span>
                </div>
              </button>

              {/* Concept Cards Grid */}
              {!isCollapsed && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {concepts.length === 0 ? (
                    <p className="text-xs text-slate-500 italic col-span-full py-4 text-center">
                      Ushbu filtr bo&apos;yicha hech narsa topilmadi.
                    </p>
                  ) : (
                    concepts.map((c) => {
                      const isKnown = knownSet.has(c.id);

                      // Upstream prerequisites
                      const prereqs = CONCEPT_RELATIONS.filter(
                        (r) => (r.type === "REQUIRES" || r.type === "RECOMMENDED_BEFORE") && r.target === c.id
                      ).map((r) => getConceptById(r.source)?.nameUz).filter(Boolean);

                      return (
                        <div
                          key={c.id}
                          className={`flex flex-col justify-between p-4 rounded-xl border bg-slate-950/60 transition-all hover:border-slate-700 hover:shadow-md ${
                            isKnown ? "border-emerald-500/30" : "border-slate-800"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-2">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}
                              >
                                {c.category}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleKnown(c.id);
                                }}
                                className="text-slate-400 hover:text-emerald-400 transition-colors p-0.5 cursor-pointer"
                                title={isKnown ? "O'zlashtirilgan" : "Bilaman deb belgilash"}
                              >
                                {isKnown ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-500" />
                                )}
                              </button>
                            </div>

                            <h4 className="text-sm font-bold text-white mb-0.5">{c.nameUz}</h4>
                            <p className="text-xs text-slate-400 font-mono mb-2">{c.name}</p>
                            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                              {c.summaryUz}
                            </p>

                            {prereqs.length > 0 && (
                              <div className="mb-3 text-[11px] text-slate-400 flex flex-wrap gap-1 items-center">
                                <span className="text-slate-500">Tayanch:</span>
                                {prereqs.slice(0, 2).map((p, idx) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300 truncate max-w-[120px]"
                                  >
                                    {p}
                                  </span>
                                ))}
                                {prereqs.length > 2 && (
                                  <span className="text-slate-500 text-[10px]">
                                    +{prereqs.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">
                              {c.crossTrackLessonLinks.length} ta dars
                            </span>
                            <button
                              onClick={() => onSelectConcept(c)}
                              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
                            >
                              <span>Batafsil</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
