"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";
import type { FlowDiagramConfig, FlowNodeKind } from "@/lib/visualizations/configs";
import { layeredLayout } from "@/lib/graph/layout";
import { pathThrough } from "@/lib/graph/graph";
import { Button } from "@/components/ui/Button";
import { uz } from "@/i18n/dictionaries/uz";

export interface FlowDiagramProps {
  config: FlowDiagramConfig;
  className?: string;
}

export function FlowDiagram({ config, className = "" }: FlowDiagramProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const totalSteps = config.steps.length;

  // Compute node positions
  const nodePositions = useMemo(() => {
    if (config.layout === "manual") {
      const map = new Map<string, { x: number; y: number }>();
      config.nodes.forEach((n) => {
        map.set(n.id, n.position ?? { x: 0, y: 0 });
      });
      return map;
    }

    const nodeIds = config.nodes.map((n) => n.id);
    const edges = config.edges.map((e) => ({ source: e.source, target: e.target }));
    const direction = config.layout === "auto-vertical" ? "vertical" : "horizontal";

    return layeredLayout(nodeIds, edges, {
      direction,
      layerGap: 240,
      nodeGap: 110,
    });
  }, [config]);

  // Compute bounding box for fit view
  const bounds = useMemo(() => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    nodePositions.forEach((pos) => {
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    });

    if (!Number.isFinite(minX)) return { width: 800, height: 400, cx: 400, cy: 200 };
    const width = maxX - minX + 280;
    const height = maxY - minY + 200;
    return {
      minX: minX - 140,
      minY: minY - 100,
      width,
      height,
      cx: minX + (maxX - minX) / 2,
      cy: minY + (maxY - minY) / 2,
    };
  }, [nodePositions]);

  // Selected path (nodes and edges on the path)
  const highlightedPath = useMemo(() => {
    if (!selectedNodeId) return null;
    const nodeIds = config.nodes.map((n) => n.id);
    const edgesWithId = config.edges.map((e) => ({
      id: e.id ?? `${e.source}->${e.target}`,
      source: e.source,
      target: e.target,
    }));
    return pathThrough(selectedNodeId, nodeIds, edgesWithId);
  }, [selectedNodeId, config]);

  // Current active step elements
  const currentStep = currentStepIndex >= 0 ? config.steps[currentStepIndex] : null;

  // Step autoplay timer
  useEffect(() => {
    if (!isPlaying || totalSteps === 0) return;

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev + 1 >= totalSteps) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, config.stepDurationMs);

    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, config.stepDurationMs]);

  // Pan handlers
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

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNodeId(null);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
  };

  const nodeKindStyles: Record<
    FlowNodeKind,
    { bg: string; border: string; text: string; glow: string }
  > = {
    default: { bg: "fill-slate-900", border: "stroke-slate-700", text: "fill-slate-200", glow: "stroke-violet-500" },
    input: { bg: "fill-cyan-950/80", border: "stroke-cyan-700", text: "fill-cyan-200", glow: "stroke-cyan-400" },
    process: { bg: "fill-indigo-950/80", border: "stroke-indigo-700", text: "fill-indigo-200", glow: "stroke-indigo-400" },
    model: { bg: "fill-violet-950/80", border: "stroke-violet-700", text: "fill-violet-200", glow: "stroke-violet-400" },
    data: { bg: "fill-emerald-950/80", border: "stroke-emerald-700", text: "fill-emerald-200", glow: "stroke-emerald-400" },
    output: { bg: "fill-rose-950/80", border: "stroke-rose-700", text: "fill-rose-200", glow: "stroke-rose-400" },
    decision: { bg: "fill-amber-950/80", border: "stroke-amber-700", text: "fill-amber-200", glow: "stroke-amber-400" },
  };

  return (
    <div className={`relative flex flex-col w-full h-full select-none overflow-hidden ${className}`}>
      {/* Step Banner (if in a step) */}
      {currentStep && (
        <div className="absolute top-3 left-3 right-3 sm:left-4 sm:right-auto z-10 max-w-md bg-slate-900/90 backdrop-blur-md border border-violet-500/40 rounded-xl p-3 shadow-lg shadow-violet-950/20 text-xs">
          <div className="flex items-center gap-2 font-semibold text-violet-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            <span>
              {uz.viz.step} {currentStepIndex + 1} {uz.viz.of} {totalSteps}: {currentStep.title}
            </span>
          </div>
          {currentStep.description && (
            <p className="text-slate-400 text-[11px] leading-relaxed">{currentStep.description}</p>
          )}
        </div>
      )}

      {/* Selected Node Details Drawer */}
      {selectedNodeId && !currentStep && (
        <div className="absolute top-3 left-3 z-10 max-w-sm bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 rounded-xl p-3 shadow-lg text-xs">
          {(() => {
            const node = config.nodes.find((n) => n.id === selectedNodeId);
            if (!node) return null;
            return (
              <div>
                <div className="font-semibold text-cyan-300 flex items-center justify-between">
                  <span>{node.label}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {node.kind}
                  </span>
                </div>
                {node.sublabel && <p className="text-slate-400 text-[11px] mt-0.5">{node.sublabel}</p>}
                <p className="text-slate-300 text-[11px] mt-2 leading-relaxed">
                  {node.description ?? uz.viz.noDescription}
                </p>
              </div>
            );
          })()}
        </div>
      )}

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-1 shadow-md">
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title={uz.viz.zoomIn}
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title={uz.viz.zoomOut}
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={resetView}
          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title={uz.viz.fitView}
        >
          <Maximize className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG Canvas Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-full flex-1 cursor-${isDragging ? "grabbing" : "grab"}`}
      >
        <svg
          className="w-full h-full min-h-[380px]"
          viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748b" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g
            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
            style={{ transformOrigin: "center" }}
          >
            {/* Edges */}
            {config.edges.map((edge) => {
              const edgeId = edge.id ?? `${edge.source}->${edge.target}`;
              const sPos = nodePositions.get(edge.source);
              const tPos = nodePositions.get(edge.target);
              if (!sPos || !tPos) return null;

              // Node box dimensions: 160x60
              const sx = sPos.x + 80;
              const sy = sPos.y;
              const tx = tPos.x - 80;
              const ty = tPos.y;

              const dx = tx - sx;
              const controlOffset = Math.max(40, Math.abs(dx) / 2);
              const d = `M ${sx} ${sy} C ${sx + controlOffset} ${sy}, ${tx - controlOffset} ${ty}, ${tx} ${ty}`;

              const isPathHighlighted = highlightedPath?.edges.has(edgeId);
              const isStepActive = currentStep?.edges.includes(edgeId);
              const isActive = isStepActive || isPathHighlighted;

              return (
                <g key={edgeId}>
                  <path
                    d={d}
                    fill="none"
                    stroke={isActive ? "#38bdf8" : "#334155"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeDasharray={isActive ? "none" : undefined}
                    markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                    className="transition-colors duration-200"
                  />
                  {edge.label && (
                    <text
                      x={(sx + tx) / 2}
                      y={(sy + ty) / 2 - 8}
                      fill={isActive ? "#7dd3fc" : "#94a3b8"}
                      fontSize="10"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {config.nodes.map((node) => {
              const pos = nodePositions.get(node.id) ?? { x: 0, y: 0 };
              const isSelected = selectedNodeId === node.id;
              const isPathNode = highlightedPath?.nodes.has(node.id);
              const isStepNode = currentStep?.nodes.includes(node.id);
              const isHighlighted = isSelected || isPathNode || isStepNode;

              const style = nodeKindStyles[node.kind] || nodeKindStyles.default;
              const nodeWidth = 160;
              const nodeHeight = 56;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x - nodeWidth / 2}, ${pos.y - nodeHeight / 2})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId((prev) => (prev === node.id ? null : node.id));
                  }}
                  className="cursor-pointer transition-transform duration-150 hover:scale-[1.03]"
                >
                  {/* Outer selection ring */}
                  {isHighlighted && (
                    <rect
                      x="-3"
                      y="-3"
                      width={nodeWidth + 6}
                      height={nodeHeight + 6}
                      rx="12"
                      fill="none"
                      stroke={isSelected ? "#06b6d4" : "#8b5cf6"}
                      strokeWidth="2"
                      filter="url(#node-glow)"
                    />
                  )}

                  {/* Node body */}
                  <rect
                    width={nodeWidth}
                    height={nodeHeight}
                    rx="10"
                    className={`${style.bg} ${style.border} stroke-1 transition-all`}
                  />

                  {/* Node Labels */}
                  <text
                    x={nodeWidth / 2}
                    y={node.sublabel ? 24 : 32}
                    textAnchor="middle"
                    className={`${style.text} font-semibold text-[12px]`}
                  >
                    {node.label}
                  </text>
                  {node.sublabel && (
                    <text
                      x={nodeWidth / 2}
                      y={40}
                      textAnchor="middle"
                      fill="#94a3b8"
                      className="text-[10px] font-mono"
                    >
                      {node.sublabel}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Step Walkthrough Bottom Playback Bar */}
      {totalSteps > 0 && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-slate-800 bg-slate-900/70 text-xs">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? uz.viz.pause : uz.viz.play}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? uz.viz.pause : uz.viz.play}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              disabled={currentStepIndex <= 0}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              }}
              title={uz.viz.stepBack}
            >
              <SkipBack className="w-3.5 h-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              disabled={currentStepIndex >= totalSteps - 1}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1));
              }}
              title={uz.viz.stepForward}
            >
              <SkipForward className="w-3.5 h-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(-1);
              }}
              title={uz.viz.reset}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Step Progress Indicators */}
          <div className="flex items-center gap-1">
            {config.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(i);
                }}
                className={`h-2 rounded-full transition-all ${i === currentStepIndex
                  ? "w-6 bg-violet-400 shadow-sm shadow-violet-500/50"
                  : i < currentStepIndex
                    ? "w-2 bg-slate-600"
                    : "w-2 bg-slate-800"
                  }`}
                title={`${uz.viz.step} ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
