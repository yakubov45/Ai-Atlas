"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  GitBranch,
} from "lucide-react";
import type { ConceptDomain, KnowledgeConcept } from "@/lib/knowledge-graph/types";
import {
  computeGraphLayout,
  DOMAIN_COLORS,
} from "@/lib/knowledge-graph/layout";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import { CANONICAL_CONCEPTS } from "@/lib/knowledge-graph/concepts";
import type { CareerBranchId } from "@/lib/learning-os/global-roadmap";
import { getKgConceptSubsetForCareer } from "@/lib/learning-os/node-details";

export interface InteractiveGraphCanvasProps {
  onSelectConcept: (concept: KnowledgeConcept) => void;
  knownConceptIds: readonly string[];
  completedLessonIds?: readonly string[];
  selectedDomain: ConceptDomain | "all";
  selectedCareerTrack?: CareerBranchId;
  searchQuery: string;
}

const NODE_WIDTH = 260;
const NODE_ANCHOR_Y = 58;

export function InteractiveGraphCanvas({
  onSelectConcept,
  knownConceptIds,
  completedLessonIds = [],
  selectedDomain,
  selectedCareerTrack = "all",
  searchQuery,
}: InteractiveGraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(0.8);
  const [pan, setPan] = useState({ x: 36, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const knownSet = useMemo(() => new Set(knownConceptIds), [knownConceptIds]);
  const completedLessonSet = useMemo(() => new Set(completedLessonIds), [completedLessonIds]);
  const careerSubset = useMemo(
    () => getKgConceptSubsetForCareer(selectedCareerTrack),
    [selectedCareerTrack],
  );

  // Filter concepts based on career track, domain, and search query
  const filteredConceptIds = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return new Set(
      CANONICAL_CONCEPTS.filter((c) => {
        const matchesCareer = !careerSubset || careerSubset.has(c.id);
        const matchesDomain = selectedDomain === "all" || c.domain === selectedDomain;
        const matchesQuery =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.nameUz.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q)) ||
          c.category.toLowerCase().includes(q);
        return matchesCareer && matchesDomain && matchesQuery;
      }).map((c) => c.id)
    );
  }, [careerSubset, selectedDomain, searchQuery]);

  // Compute graph layout
  const { nodes } = useMemo(() => {
    return computeGraphLayout(filteredConceptIds, 350, 175);
  }, [filteredConceptIds]);

  // Direct prerequisite count per concept
  const directPrereqCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of CONCEPT_RELATIONS) {
      if (r.type === "REQUIRES" || r.type === "RECOMMENDED_BEFORE" || r.type === "EXTENDS") {
        counts.set(r.target, (counts.get(r.target) ?? 0) + 1);
      }
    }
    return counts;
  }, []);

  // Map for fast coordinate lookup
  const nodePositionMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number; concept: KnowledgeConcept }>();
    nodes.forEach((n) => map.set(n.id, { x: n.x, y: n.y, concept: n.concept }));
    return map;
  }, [nodes]);

  // Visible edges
  const visibleEdges = useMemo(() => {
    return CONCEPT_RELATIONS.filter((r) => {
      return nodePositionMap.has(r.source) && nodePositionMap.has(r.target);
    });
  }, [nodePositionMap]);

  // Connected nodes when a node is hovered or selected
  const activeNodeId = hoveredNodeId || selectedNodeId;
  const connectedContext = useMemo(() => {
    if (!activeNodeId) return null;
    const incomingSources = new Set<string>();
    const outgoingTargets = new Set<string>();

    for (const rel of visibleEdges) {
      if (rel.target === activeNodeId) incomingSources.add(rel.source);
      if (rel.source === activeNodeId) outgoingTargets.add(rel.target);
    }

    return { incomingSources, outgoingTargets };
  }, [activeNodeId, visibleEdges]);

  // Mouse pan handlers with drag-threshold protection
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragOriginRef.current = { x: e.clientX, y: e.clientY };
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (
      Math.hypot(e.clientX - dragOriginRef.current.x, e.clientY - dragOriginRef.current.y) > 5
    ) {
      didDragRef.current = true;
    }
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = useCallback(() => {
    setZoom(0.8);
    setPan({ x: 36, y: 50 });
    setSelectedNodeId(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-[700px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-inner"
    >
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          transform: `translate(${pan.x % 24}px, ${pan.y % 24}px)`,
        }}
      />

      {/* Top Left Summary Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 shadow-lg pointer-events-none">
        <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
        <span>
          <strong className="text-white">{nodes.length}</strong> tushuncha •{" "}
          <strong className="text-white">{visibleEdges.length}</strong> bog&apos;liqlik
        </span>
        <span className="hidden md:inline text-slate-500">
          • Batafsil o&apos;quv rejasini ko&apos;rish uchun mavzuni bosing
        </span>
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          title="Kattalashtirish (Zoom in)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.3, z - 0.15))}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          title="Kichraytirish (Zoom out)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={resetView}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          title="Ko'rinishni tiklash (Fit view)"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Legend pill */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex flex-wrap items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl text-[11px] text-slate-300 shadow-lg pointer-events-none">
        <span className="font-semibold text-slate-400">Yo&apos;nalishlar:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Dasturlash</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Matematika</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>Data Science</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <span>ML</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
          <span>AI Eng &amp; LLM</span>
        </div>
        <span className="text-slate-600">|</span>
        <span className="text-amber-300">Sariq: Oldin o&apos;rganish kerak</span>
        <span className="text-violet-300">Binafsha: Keyingi bosqich</span>
      </div>

      {/* Main Graph Content */}
      <div
        className="absolute inset-0 origin-top-left transition-transform duration-75"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        {/* SVG Edges Layer */}
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
            </marker>
            <marker
              id="arrow-incoming"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fbbf24" />
            </marker>
            <marker
              id="arrow-outgoing"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a78bfa" />
            </marker>
          </defs>

          {visibleEdges.map((rel) => {
            const src = nodePositionMap.get(rel.source);
            const tgt = nodePositionMap.get(rel.target);
            if (!src || !tgt) return null;

            const startX = src.x + NODE_WIDTH;
            const startY = src.y + NODE_ANCHOR_Y;
            const endX = tgt.x;
            const endY = tgt.y + NODE_ANCHOR_Y;

            const dx = Math.max(45, Math.abs(endX - startX) * 0.48);
            const pathData = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

            const isIncoming = activeNodeId && rel.target === activeNodeId;
            const isOutgoing = activeNodeId && rel.source === activeNodeId;
            const isDimmed = activeNodeId && !isIncoming && !isOutgoing;

            let strokeColor = "#475569";
            let strokeWidth = 1.6;
            let marker = "url(#arrow-default)";

            if (isIncoming) {
              strokeColor = "#fbbf24";
              strokeWidth = 2.6;
              marker = "url(#arrow-incoming)";
            } else if (isOutgoing) {
              strokeColor = "#a78bfa";
              strokeWidth = 2.6;
              marker = "url(#arrow-outgoing)";
            } else if (rel.type === "EXTENDS") {
              strokeColor = "#22d3ee";
            } else if (rel.type === "ALTERNATIVE_TO") {
              strokeColor = "#34d399";
            } else if (rel.type === "REQUIRES") {
              strokeColor = "#64748b";
            }

            return (
              <path
                key={rel.id}
                d={pathData}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={
                  rel.type === "RECOMMENDED_BEFORE"
                    ? "5 4"
                    : rel.type === "ALTERNATIVE_TO"
                    ? "3 3"
                    : undefined
                }
                markerEnd={marker}
                opacity={isDimmed ? 0.14 : 0.85}
                className="transition-all duration-150"
              />
            );
          })}
        </svg>

        {/* HTML Nodes Layer */}
        {nodes.map((node) => {
          const concept = node.concept;
          const colors = DOMAIN_COLORS[concept.domain];
          const isKnown =
            knownSet.has(concept.id) ||
            concept.crossTrackLessonLinks.some((l) => completedLessonSet.has(l.lessonId));

          const isSelf = activeNodeId === concept.id;
          const isIncoming = connectedContext?.incomingSources.has(concept.id);
          const isOutgoing = connectedContext?.outgoingTargets.has(concept.id);
          const isDimmed = activeNodeId && !isSelf && !isIncoming && !isOutgoing;

          let borderClass = colors.border;
          const shadowClass = colors.glow;

          if (isSelf) {
            borderClass = "border-white ring-2 ring-white/50";
          } else if (isIncoming) {
            borderClass = "border-amber-400 ring-2 ring-amber-400/50";
          } else if (isOutgoing) {
            borderClass = "border-violet-400 ring-2 ring-violet-400/50";
          }

          const prereqCount = directPrereqCounts.get(concept.id) ?? 0;

          return (
            <div
              key={node.id}
              onClick={() => {
                if (didDragRef.current) return;
                setSelectedNodeId(concept.id);
                onSelectConcept(concept);
              }}
              onMouseEnter={() => setHoveredNodeId(concept.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${NODE_WIDTH}px`,
              }}
              className={`absolute p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-150 cursor-pointer ${
                colors.bg
              } ${borderClass} ${shadowClass} shadow-lg ${
                isDimmed ? "opacity-30 scale-95" : "opacity-100 scale-100 hover:scale-[1.03]"
              }`}
            >
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}
                >
                  {concept.category}
                </span>

                {isKnown && (
                  <span title="O'zlashtirilgan">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </span>
                )}
              </div>

              {/* Full untruncated titles */}
              <h4 className="text-xs font-bold text-slate-100 leading-snug">
                {concept.nameUz}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono leading-snug mt-0.5">
                {concept.name}
              </p>

              <div className="mt-2.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="capitalize">{concept.difficulty}</span>
                <span>
                  {prereqCount} oldin • {concept.crossTrackLessonLinks.length} dars
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
