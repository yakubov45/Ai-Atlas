"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  FlaskConical,
  FolderGit2,
  GitBranch,
  Layers,
  LayoutGrid,
  List,
  ListChecks,
  Maximize2,
  Network,
  Search,
  Workflow,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  CAREER_BRANCHES,
  GLOBAL_ROADMAP_NODES,
  GLOBAL_STAGES,
  getGlobalNodeById,
  type CareerBranchId,
  type GlobalRoadmapNode,
} from "@/lib/learning-os/global-roadmap";
import { isCanonicalItemCompleted } from "@/lib/learning-os/progress-sync";
import { getGlobalNodeFullBreakdown } from "@/lib/learning-os/node-details";
import { useLearning } from "@/hooks/use-learning";
import { KnowledgeRelationshipsButton } from "@/components/lessons/KnowledgeRelationshipsPanel";

const SOURCE_BADGE: Readonly<Record<string, string>> = {
  mdx: "Kanonik MDX",
  "python-dev": "Python Dev",
  "ai-eng": "AI Engineer",
  "ml-ds": "ML / DS",
  "hf-llm": "HF LLM",
  "dl-16": "16 DL Arx",
  "nn-learn": "NN Asoslari",
  "stanford-cme295": "CME 295",
  "data-eng": "Data Eng",
  "prompt-eng": "Prompt Eng",
};

const DIFFICULTY_UZ: Readonly<Record<string, { label: string; cls: string }>> = {
  beginner: { label: "Boshlang'ich", cls: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30" },
  intermediate: { label: "O'rta", cls: "text-amber-300 bg-amber-500/10 border-amber-500/30" },
  advanced: { label: "Ilg'or", cls: "text-violet-300 bg-violet-500/10 border-violet-500/30" },
};

const STAGE_THEME: Readonly<Record<string, { bg: string; border: string; badge: string }>> = {
  "stage-1-programming": { bg: "bg-emerald-950/75", border: "border-emerald-500/55", badge: "bg-emerald-500/15 text-emerald-300" },
  "stage-2-math": { bg: "bg-amber-950/75", border: "border-amber-500/55", badge: "bg-amber-500/15 text-amber-300" },
  "stage-3-data": { bg: "bg-cyan-950/75", border: "border-cyan-500/55", badge: "bg-cyan-500/15 text-cyan-300" },
  "stage-4-classical-ml": { bg: "bg-blue-950/75", border: "border-blue-500/55", badge: "bg-blue-500/15 text-blue-300" },
  "stage-5-deep-learning": { bg: "bg-orange-950/75", border: "border-orange-500/55", badge: "bg-orange-500/15 text-orange-300" },
  "stage-6-architectures": { bg: "bg-indigo-950/75", border: "border-indigo-500/55", badge: "bg-indigo-500/15 text-indigo-300" },
  "stage-7-transformers": { bg: "bg-violet-950/80", border: "border-violet-500/60", badge: "bg-violet-500/15 text-violet-300" },
  "stage-8-llms": { bg: "bg-fuchsia-950/75", border: "border-fuchsia-500/55", badge: "bg-fuchsia-500/15 text-fuchsia-300" },
  "stage-9-genai": { bg: "bg-purple-950/80", border: "border-purple-500/60", badge: "bg-purple-500/15 text-purple-300" },
  "stage-10-production": { bg: "bg-teal-950/80", border: "border-teal-500/60", badge: "bg-teal-500/15 text-teal-300" },
};

const CARD_WIDTH = 264;
const COL_GAP = 340;
const ROW_GAP = 185;

export function GlobalUnifiedRoadmap() {
  const { state, toggleCompleted, toggleConceptKnown, isConceptKnown } = useLearning();
  const [branch, setBranch] = useState<CareerBranchId>("all");
  const [viewMode, setViewMode] = useState<"graph" | "grid" | "list">("graph");
  const [difficulty, setDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [search, setSearch] = useState("");
  const [modalNodeId, setModalNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  // Interactive Graph Pan/Zoom State
  const [graphZoom, setGraphZoom] = useState<number>(0.82);
  const [pan, setPan] = useState({ x: 32, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);

  const activeBranchMeta = useMemo(
    () => CAREER_BRANCHES.find((b) => b.id === branch) ?? CAREER_BRANCHES[0]!,
    [branch],
  );

  const visibleNodes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return GLOBAL_ROADMAP_NODES.filter((n) => {
      const matchBranch = branch === "all" || n.availableTracks.includes(branch);
      const matchDiff = difficulty === "all" || n.difficulty === difficulty;
      const matchSearch =
        !q ||
        n.titleUz.toLowerCase().includes(q) ||
        n.titleEn.toLowerCase().includes(q) ||
        n.whyItMattersUz.toLowerCase().includes(q);
      return matchBranch && matchDiff && matchSearch;
    });
  }, [branch, difficulty, search]);

  const stageGroups = useMemo(() => {
    return GLOBAL_STAGES.map((stage) => ({
      stage,
      nodes: visibleNodes
        .filter((n) => n.stageId === stage.id)
        .sort((a, b) => a.orderInStage - b.orderInStage),
    })).filter((g) => g.nodes.length > 0);
  }, [visibleNodes]);

  // Compute stage-based Graph coordinates (X by active stage column, Y centered vertically)
  const graphLayout = useMemo(() => {
    const positions = new Map<string, { x: number; y: number; node: GlobalRoadmapNode }>();
    const stageHeaders: Array<{ id: string; order: number; titleUz: string; x: number; colorClass: string }> = [];

    stageGroups.forEach((grp, colIdx) => {
      const x = colIdx * COL_GAP + 40;
      stageHeaders.push({
        id: grp.stage.id,
        order: grp.stage.order,
        titleUz: grp.stage.titleUz,
        x,
        colorClass: grp.stage.colorClass,
      });

      grp.nodes.forEach((node, rowIdx) => {
        const y = 78 + rowIdx * ROW_GAP;
        positions.set(node.id, { x, y, node });
      });
    });

    const visibleIds = new Set(positions.keys());
    const edges: Array<{
      id: string;
      source: string;
      target: string;
      kind: "required" | "recommended";
    }> = [];

    for (const node of visibleNodes) {
      for (const reqId of node.requiredPrerequisites) {
        if (visibleIds.has(reqId)) {
          edges.push({ id: `${reqId}->${node.id}-req`, source: reqId, target: node.id, kind: "required" });
        }
      }
      for (const recId of node.recommendedPrerequisites) {
        if (visibleIds.has(recId)) {
          edges.push({ id: `${recId}->${node.id}-rec`, source: recId, target: node.id, kind: "recommended" });
        }
      }
    }

    return { positions, stageHeaders, edges };
  }, [stageGroups, visibleNodes]);

  const isNodeDone = (node: GlobalRoadmapNode) =>
    isCanonicalItemCompleted(state, node.canonicalConceptId) ||
    node.associatedLessons.some((l) => isCanonicalItemCompleted(state, l.id));

  const isNodeKnown = (node: GlobalRoadmapNode) =>
    isConceptKnown(node.canonicalConceptId) ||
    node.associatedLessons.some((l) => isConceptKnown(l.id));

  const getDirectPrereqCount = (node: GlobalRoadmapNode) =>
    node.requiredPrerequisites.length + node.recommendedPrerequisites.length;

  const activeNodeId = hoveredNodeId || focusedNodeId;
  const connectedSet = useMemo(() => {
    if (!activeNodeId) return null;
    const incoming = new Set<string>();
    const outgoing = new Set<string>();
    for (const e of graphLayout.edges) {
      if (e.target === activeNodeId) incoming.add(e.source);
      if (e.source === activeNodeId) outgoing.add(e.target);
    }
    return { incoming, outgoing };
  }, [activeNodeId, graphLayout.edges]);

  const modalBreakdown = useMemo(() => {
    if (!modalNodeId) return null;
    return getGlobalNodeFullBreakdown(modalNodeId, state);
  }, [modalNodeId, state]);

  const totalHoursVisible = Math.round(
    visibleNodes.reduce((sum, n) => sum + n.estimatedMinutes, 0) / 60,
  );
  const completedVisibleCount = visibleNodes.filter(isNodeDone).length;
  const knownVisibleCount = visibleNodes.filter((n) => !isNodeDone(n) && isNodeKnown(n)).length;

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
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetGraphView = () => {
    setGraphZoom(0.82);
    setPan({ x: 32, y: 40 });
    setFocusedNodeId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Career Filter & Mode Switcher Bar */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Compass className="w-4 h-4" />
              <span>Interaktiv Global Yo&apos;l Xaritasi ({stageGroups.length} Bosqich • {visibleNodes.length} Mavzu • ~{totalHoursVisible} soat)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {activeBranchMeta.label}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {activeBranchMeta.descriptionUz} Istalgan mavzuga bosing — undan oldin nechta mavzu kerakligi, zarur bilimlar va aniq mavzular ro&apos;yxati to&apos;liq ochiladi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              Tugatilgan: <span className="text-emerald-300 font-bold">{completedVisibleCount}</span>/{visibleNodes.length}
              {knownVisibleCount > 0 && (
                <span className="text-amber-300 ml-2">+{knownVisibleCount} bilaman</span>
              )}
            </div>

            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode("graph")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  viewMode === "graph" ? "bg-violet-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Graf Xarita</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  viewMode === "grid" ? "bg-violet-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bosqichlar</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  viewMode === "list" ? "bg-violet-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Ro&apos;yxat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Career Branch Filter Chips */}
        <div className="flex flex-wrap gap-1.5">
          {CAREER_BRANCHES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBranch(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                branch === b.id
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {b.shortLabel}
            </button>
          ))}
        </div>

        {/* Search & Difficulty Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative min-w-[210px] flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mavzu yoki bosqich qidirish..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-1">
              {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                    difficulty === d
                      ? "bg-slate-700 text-white"
                      : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {d === "all" ? "Barcha daraja" : DIFFICULTY_UZ[d]?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE NODE-LINK GRAPH CANVAS (Matching screenshot dark dot-grid + curved SVG edges) */}
      {viewMode === "graph" && (
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-[700px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-2xl"
        >
          {/* Background Dot Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              transform: `translate(${pan.x % 24}px, ${pan.y % 24}px)`,
            }}
          />

          {/* Top-Left Hint Pill */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 text-[11px] text-slate-300 pointer-events-none shadow-lg">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              <strong className="text-white">{visibleNodes.length}</strong> mavzu •{" "}
              <strong className="text-white">{graphLayout.edges.length}</strong> bog&apos;liqlik
            </span>
            <span className="hidden md:inline text-slate-500">
              • Sudrab suring • To&apos;liq darslar ro&apos;yxatini ko&apos;rish uchun mavzuga bosing
            </span>
          </div>

          {/* Floating Zoom Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
            <button
              type="button"
              onClick={() => setGraphZoom((z) => Math.min(1.6, z + 0.12))}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title="Kattalashtirish"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setGraphZoom((z) => Math.max(0.32, z - 0.12))}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title="Kichraytirish"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={resetGraphView}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title="Asl ko'rinishga qaytarish"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Legend */}
          <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 text-[11px] text-slate-300 pointer-events-none shadow-lg">
            <span className="text-amber-300 font-medium">━━ Sariq: Oldin o&apos;rganish shart</span>
            <span className="text-slate-500">╌╌ Punktr: Tavsiya etilgan</span>
            <span className="text-violet-300 font-medium">━━ Binafsha: Keyingi mavzular</span>
          </div>

          {/* Transformed Graph Content */}
          <div
            className="absolute inset-0 origin-top-left transition-transform duration-75"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${graphZoom})`,
            }}
          >
            {/* Stage Column Headers */}
            {graphLayout.stageHeaders.map((sh) => (
              <div
                key={sh.id}
                style={{ left: `${sh.x}px`, top: "16px", width: `${CARD_WIDTH}px` }}
                className={`absolute px-3 py-2 rounded-xl border text-xs font-bold shadow ${sh.colorClass}`}
              >
                {sh.titleUz}
              </div>
            ))}

            {/* Curved SVG Edges */}
            <svg
              className="absolute inset-0 pointer-events-none overflow-visible"
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                <marker id="gr-arrow-default" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
                </marker>
                <marker id="gr-arrow-incoming" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fbbf24" />
                </marker>
                <marker id="gr-arrow-outgoing" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a78bfa" />
                </marker>
              </defs>

              {graphLayout.edges.map((edge) => {
                const src = graphLayout.positions.get(edge.source);
                const tgt = graphLayout.positions.get(edge.target);
                if (!src || !tgt) return null;

                const startX = src.x + CARD_WIDTH;
                const startY = src.y + 62;
                const endX = tgt.x;
                const endY = tgt.y + 62;

                const dx = Math.max(45, Math.abs(endX - startX) * 0.48);
                const pathData = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

                const isIncoming = activeNodeId && edge.target === activeNodeId;
                const isOutgoing = activeNodeId && edge.source === activeNodeId;
                const isDimmed = activeNodeId && !isIncoming && !isOutgoing;

                let strokeColor = edge.kind === "required" ? "#64748b" : "#475569";
                let strokeWidth = 1.6;
                let marker = "url(#gr-arrow-default)";

                if (isIncoming) {
                  strokeColor = "#fbbf24";
                  strokeWidth = 2.6;
                  marker = "url(#gr-arrow-incoming)";
                } else if (isOutgoing) {
                  strokeColor = "#a78bfa";
                  strokeWidth = 2.6;
                  marker = "url(#gr-arrow-outgoing)";
                }

                return (
                  <path
                    key={edge.id}
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={edge.kind === "recommended" ? "5 4" : undefined}
                    markerEnd={marker}
                    opacity={isDimmed ? 0.14 : 0.85}
                  />
                );
              })}
            </svg>

            {/* Node Cards */}
            {Array.from(graphLayout.positions.values()).map(({ x, y, node }) => {
              const theme = STAGE_THEME[node.stageId] ?? STAGE_THEME["stage-1-programming"]!;
              const done = isNodeDone(node);
              const known = !done && isNodeKnown(node);
              const prereqCount = getDirectPrereqCount(node);
              const diffMeta = DIFFICULTY_UZ[node.difficulty]!;

              const isSelf = activeNodeId === node.id;
              const isIncoming = connectedSet?.incoming.has(node.id);
              const isOutgoing = connectedSet?.outgoing.has(node.id);
              const isDimmed = activeNodeId && !isSelf && !isIncoming && !isOutgoing;

              const borderCls = isSelf
                ? "border-white ring-2 ring-white/50"
                : isIncoming
                ? "border-amber-400 ring-2 ring-amber-400/50"
                : isOutgoing
                ? "border-violet-400 ring-2 ring-violet-400/50"
                : done
                ? "border-emerald-400/80"
                : theme.border;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => {
                    if (didDragRef.current) return;
                    setFocusedNodeId(node.id);
                    setModalNodeId(node.id);
                  }}
                  style={{ left: `${x}px`, top: `${y}px`, width: `${CARD_WIDTH}px` }}
                  className={`absolute p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-150 cursor-pointer shadow-xl ${
                    theme.bg
                  } ${borderCls} ${isDimmed ? "opacity-30 scale-95" : "opacity-100 hover:scale-[1.03]"}`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.badge}`}>
                      {diffMeta.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {done && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {known && (
                        <span className="text-[10px] font-bold text-amber-300">Bilaman ✓</span>
                      )}
                    </div>
                  </div>

                  {/* Full untruncated node titles */}
                  <h4 className="text-xs font-bold text-white leading-snug">{node.titleUz}</h4>
                  <p className="text-[10.5px] text-slate-400 font-mono leading-snug mt-0.5">
                    {node.titleEn}
                  </p>

                  <div className="mt-2.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                    <span>Oldin: {prereqCount} ta</span>
                    <span>
                      {node.associatedLessons.length} dars • ~{node.estimatedMinutes}d
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2 & 3: STAGE CARDS GRID OR ACCESSIBLE LIST VIEW */}
      {(viewMode === "grid" || viewMode === "list") && (
        <div className="space-y-4">
          {stageGroups.map(({ stage, nodes }) => (
            <div
              key={stage.id}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${stage.colorClass}`}>
                    {stage.titleUz}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">{stage.subtitleUz}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{nodes.length} mavzu</span>
              </div>

              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" : "space-y-2.5"}>
                {nodes.map((node) => {
                  const done = isNodeDone(node);
                  const known = !done && isNodeKnown(node);
                  const diffMeta = DIFFICULTY_UZ[node.difficulty]!;
                  const prereqCount = getDirectPrereqCount(node);

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => {
                        setFocusedNodeId(node.id);
                        setModalNodeId(node.id);
                      }}
                      className={`w-full text-left rounded-xl border p-3.5 transition-all cursor-pointer space-y-1.5 ${
                        done
                          ? "border-emerald-500/40 bg-emerald-950/15 hover:border-emerald-400"
                          : known
                          ? "border-amber-500/40 bg-amber-950/15 hover:border-amber-400"
                          : "border-slate-800 bg-slate-950/75 hover:border-cyan-500/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${diffMeta.cls}`}>
                          {diffMeta.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Oldin: {prereqCount} ta • ~{node.estimatedMinutes} daq
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {node.titleUz}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{node.whyItMattersUz}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL NODE DETAILS MODAL (Opens whenever user clicks any topic on the map/list!) */}
      {modalBreakdown && (() => {
        const node = modalBreakdown.node;
        const done = isNodeDone(node);
        const known = isNodeKnown(node);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150"
            role="dialog"
            aria-modal="true"
            aria-label={node.titleUz}
            onClick={() => setModalNodeId(null)}
          >
            <div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/40 bg-slate-950 text-slate-100 shadow-2xl p-5 sm:p-7 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold">
                      {GLOBAL_STAGES.find((s) => s.id === node.stageId)?.titleUz}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      ~{node.estimatedMinutes} daqiqa
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {node.titleUz}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-slate-400">{node.titleEn}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <KnowledgeRelationshipsButton
                    entityId={node.canonicalConceptId}
                    fallbackMeta={{ title: node.titleUz, summary: node.whyItMattersUz }}
                  />
                  <button
                    type="button"
                    onClick={() => setModalNodeId(null)}
                    className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
                    aria-label="Yopish"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                {node.whyItMattersUz}
              </p>

              {/* Progress Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => toggleCompleted(node.canonicalConceptId)}
                  className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                    done
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-200"
                      : "border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-500/50"
                  }`}
                >
                  {done ? "✓ Mavzu tugatilgan deb belgilangan" : "Tugatilgan deb belgilash"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleConceptKnown(node.canonicalConceptId)}
                  className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                    known
                      ? "border-amber-500 bg-amber-500/20 text-amber-200"
                      : "border-slate-700 bg-slate-900 text-slate-200 hover:border-amber-500/50"
                  }`}
                >
                  {known ? "✓ Allaqachon bilaman (O'zlashtirilgan)" : "Allaqachon bilaman deb belgilash"}
                </button>
              </div>

              {/* 1. How many topics needed BEFORE this + Ordered Chain */}
              <div className="rounded-2xl border border-amber-500/35 bg-amber-950/15 p-4 sm:p-5 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Workflow className="w-4 h-4" />
                    <span>Bundan oldin qancha mavzu o&apos;rganish kerak?</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 font-bold">
                      Jami: {modalBreakdown.totalPrereqCount} ta oldingi mavzu
                    </span>
                    {modalBreakdown.totalPrereqCount > 0 && (
                      <>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300">
                          {modalBreakdown.donePrereqCount} ta tugatilgan
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-200 border border-slate-700">
                          {modalBreakdown.remainingPrereqCount} ta qolgan (~{modalBreakdown.prepMinutes} daq)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {modalBreakdown.orderedPrereqChain.length === 0 ? (
                  <p className="text-xs text-slate-300">
                    <strong>0 ta oldingi mavzu</strong> — bu fundamental boshlang&apos;ich bosqich, hech qanday shartlarsiz boshlashingiz mumkin.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-400">
                      Tavsiya etiladigan ketma-ketlik (bosib ko&apos;ring; ilg&apos;or darslar qulflanmagan):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {modalBreakdown.orderedPrereqChain.map((item, idx) => (
                        <button
                          key={item.node.id}
                          type="button"
                          onClick={() => setModalNodeId(item.node.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                            item.isDone
                              ? "border-emerald-500/40 bg-emerald-950/35 text-emerald-200"
                              : item.relationKind === "required"
                              ? "border-amber-500/45 bg-slate-900 text-amber-100 hover:bg-amber-950/40 font-semibold"
                              : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600"
                          }`}
                        >
                          <span className="text-[10px] font-mono opacity-70">#{idx + 1}</span>
                          {item.isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          <span>{item.node.titleUz}</span>
                          {item.relationKind === "required" && (
                            <span className="text-[10px] px-1.5 rounded bg-amber-500/20 text-amber-300">
                              Zarur
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {modalBreakdown.remainingPrereqCount > 0 && (
                  <div className="flex items-start gap-2 text-[11px] text-amber-200/90 pt-1">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>
                      Ushbu mavzuni boshlashdan avval yuqoridagi qolgan {modalBreakdown.remainingPrereqCount} ta tayanch mavzuni ko&apos;rib chiqish tavsiya etiladi (lekin istasangiz darhol boshlashingiz mumkin).
                    </span>
                  </div>
                )}
              </div>

              {/* 2 & 3. What is Needed + Explicit Topics Covered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Nimalar kerak bo&apos;ladi? (Zarur poydevor)</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {modalBreakdown.requirementsUz.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-5 h-5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-violet-500/25 bg-slate-900/60 p-4 sm:p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4" />
                    <span>Shu mavzuda aniq nimalar o&apos;rganiladi? ({modalBreakdown.topicsCoveredUz.length} ta)</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {modalBreakdown.topicsCoveredUz.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-5 h-5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Associated Lessons (Full untruncated labels) */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>O&apos;qish uchun bog&apos;langan barcha darslar ({node.associatedLessons.length} ta)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {node.associatedLessons.map((lesson) => (
                    <Link
                      key={`${lesson.source}-${lesson.id}`}
                      href={lesson.href}
                      onClick={() => setModalNodeId(null)}
                      className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-cyan-300 shrink-0">
                          {SOURCE_BADGE[lesson.source] ?? lesson.source}
                        </span>
                        <span className="text-slate-100 font-semibold leading-snug">
                          {lesson.label}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Next Unlocked Topics */}
              {modalBreakdown.nextUnlockedNodes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
                    <span>Bu mavzudan keyingi qadamlar ({modalBreakdown.nextUnlockedNodes.length} ta)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {modalBreakdown.nextUnlockedNodes.map((nxt) => (
                      <button
                        key={nxt.id}
                        type="button"
                        onClick={() => setModalNodeId(nxt.id)}
                        className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 hover:border-violet-500/50 text-xs text-slate-200 cursor-pointer"
                      >
                        {nxt.titleUz} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Labs & Projects */}
              {(node.relatedLabs.length > 0 || node.associatedProjects.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {node.relatedLabs.length > 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                      <span className="text-[11px] font-bold uppercase text-emerald-300 flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Vizual Laboratoriyalar</span>
                      </span>
                      <div className="space-y-1.5">
                        {node.relatedLabs.map((lab) => (
                          <Link
                            key={lab.id}
                            href={lab.href}
                            onClick={() => setModalNodeId(null)}
                            className="flex items-center justify-between text-xs text-slate-200 hover:text-emerald-300"
                          >
                            <span>{lab.titleUz}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {node.associatedProjects.length > 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase text-violet-300 flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Amaliy Loyihalar</span>
                      </span>
                      <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                        {node.associatedProjects.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
