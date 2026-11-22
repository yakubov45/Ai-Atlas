"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Workflow,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import type { ConceptDomain, KnowledgeConcept } from "@/lib/knowledge-graph/types";
import {
  computeGraphLayout,
  DOMAIN_COLORS,
  DOMAIN_TITLES_UZ,
} from "@/lib/knowledge-graph/layout";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import { CANONICAL_CONCEPTS } from "@/lib/knowledge-graph/concepts";

export interface InteractiveGraphCanvasProps {
  onSelectConcept: (concept: KnowledgeConcept) => void;
  knownConceptIds: readonly string[];
  selectedDomain: ConceptDomain | "all";
  searchQuery: string;
}

export function InteractiveGraphCanvas({
  onSelectConcept,
  knownConceptIds,
  selectedDomain,
  searchQuery,
}: InteractiveGraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(0.85);
  const [pan, setPan] = useState({ x: 40, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const knownSet = useMemo(() => new Set(knownConceptIds), [knownConceptIds]);

  // Filter concepts based on domain and search query
  const filteredConceptIds = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return new Set(
      CANONICAL_CONCEPTS.filter((c) => {
        const matchesDomain = selectedDomain === "all" || c.domain === selectedDomain;
        const matchesQuery =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.nameUz.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q)) ||
          c.category.toLowerCase().includes(q);
        return matchesDomain && matchesQuery;
      }).map((c) => c.id)
    );
  }, [selectedDomain, searchQuery]);

  // Compute graph layout
  const { nodes, bounds } = useMemo(() => {
    return computeGraphLayout(filteredConceptIds);
  }, [filteredConceptIds]);

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

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = useCallback(() => {
    setZoom(0.8);
    setPan({ x: 80, y: 100 });
    setSelectedNodeId(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-[680px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-inner"
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

      {/* Floating Canvas Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
        <button
          onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Kattalashtirish (Zoom in)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.35, z - 0.15))}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Kichraytirish (Zoom out)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Ko'rinishni tiklash (Fit view)"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Legend pill */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl text-xs text-slate-300 shadow-lg">
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
          <span>AI Eng</span>
        </div>
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

            // Compute card anchor points: Right side of source to Left side of target
            const startX = src.x + 220;
            const startY = src.y + 45;
            const endX = tgt.x;
            const endY = tgt.y + 45;

            // Bezier control points
            const dx = Math.max(40, (endX - startX) * 0.5);
            const pathData = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

            const isIncoming = activeNodeId && rel.target === activeNodeId;
            const isOutgoing = activeNodeId && rel.source === activeNodeId;
            const isDimmed = activeNodeId && !isIncoming && !isOutgoing;

            let strokeColor = "#475569";
            let strokeWidth = 1.5;
            let marker = "url(#arrow-default)";

            if (isIncoming) {
              strokeColor = "#fbbf24";
              strokeWidth = 2.5;
              marker = "url(#arrow-incoming)";
            } else if (isOutgoing) {
              strokeColor = "#a78bfa";
              strokeWidth = 2.5;
              marker = "url(#arrow-outgoing)";
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
                strokeDasharray={rel.type === "RECOMMENDED_BEFORE" ? "5 4" : undefined}
                markerEnd={marker}
                opacity={isDimmed ? 0.15 : 0.85}
                className="transition-all duration-150"
              />
            );
          })}
        </svg>

        {/* HTML Nodes Layer */}
        {nodes.map((node) => {
          const concept = node.concept;
          const colors = DOMAIN_COLORS[concept.domain];
          const isKnown = knownSet.has(concept.id);

          const isSelf = activeNodeId === concept.id;
          const isIncoming = connectedContext?.incomingSources.has(concept.id);
          const isOutgoing = connectedContext?.outgoingTargets.has(concept.id);
          const isDimmed = activeNodeId && !isSelf && !isIncoming && !isOutgoing;

          let borderClass = colors.border;
          const shadowClass = colors.glow;

          if (isSelf) {
            borderClass = "border-white ring-2 ring-white/40";
          } else if (isIncoming) {
            borderClass = "border-amber-400 ring-2 ring-amber-400/40";
          } else if (isOutgoing) {
            borderClass = "border-violet-400 ring-2 ring-violet-400/40";
          }

          return (
            <div
              key={node.id}
              onClick={() => {
                setSelectedNodeId(concept.id);
                onSelectConcept(concept);
              }}
              onMouseEnter={() => setHoveredNodeId(concept.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: "220px",
              }}
              className={`absolute p-3 rounded-xl border backdrop-blur-md transition-all duration-150 cursor-pointer ${
                colors.bg
              } ${borderClass} ${shadowClass} shadow-lg ${
                isDimmed ? "opacity-30 scale-95" : "opacity-100 scale-100 hover:scale-105"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}
                >
                  {concept.category}
                </span>

                {isKnown && (
                  <span title="O'zlashtirilgan">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-100 line-clamp-1 leading-snug">
                {concept.nameUz}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono line-clamp-1">{concept.name}</p>

              <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="capitalize">{concept.difficulty}</span>
                <span>{concept.crossTrackLessonLinks.length} ta dars</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
