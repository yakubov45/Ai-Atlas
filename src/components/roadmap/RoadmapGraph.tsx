"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ZoomIn, ZoomOut, Maximize, ArrowRight } from "lucide-react";
import type { LessonSummary } from "@/lib/content/types";
import { layeredLayout } from "@/lib/graph/layout";
import { useLearning } from "@/hooks/use-learning";
import { uz } from "@/i18n/dictionaries/uz";
import { DifficultyBadge } from "@/components/ui/Badge";

export interface RoadmapGraphProps {
  lessons: readonly LessonSummary[];
}

export function RoadmapGraph({ lessons }: { lessons: readonly LessonSummary[] }) {
  const { isCompleted } = useLearning();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Lesson Map
  const lessonMap = useMemo(() => new Map(lessons.map((l) => [l.id, l])), [lessons]);

  // Edges derived strictly from prerequisites
  const edges = useMemo(() => {
    const list: Array<{ id: string; source: string; target: string }> = [];
    lessons.forEach((lesson) => {
      lesson.prerequisites.forEach((prereqId) => {
        // Prereq is source (must be studied first), lesson is target
        if (lessonMap.has(prereqId)) {
          list.push({
            id: `${prereqId}->${lesson.id}`,
            source: prereqId,
            target: lesson.id,
          });
        }
      });
    });
    return list;
  }, [lessons, lessonMap]);

  // Compute node positions using layered layout (left to right horizontal)
  const nodePositions = useMemo(() => {
    const nodeIds = lessons.map((l) => l.id);
    return layeredLayout(nodeIds, edges, {
      direction: "horizontal",
      layerGap: 260,
      nodeGap: 120,
    });
  }, [lessons, edges]);

  // Bounding box
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

    if (!Number.isFinite(minX)) return { width: 800, height: 500, minX: 0, minY: 0 };
    return {
      minX: minX - 160,
      minY: minY - 100,
      width: maxX - minX + 320,
      height: maxY - minY + 200,
    };
  }, [nodePositions]);

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

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedLessonId(null);
  };

  const selectedLesson = selectedLessonId ? lessonMap.get(selectedLessonId) : null;

  return (
    <div className="relative w-full h-[600px] border border-slate-800 rounded-2xl bg-slate-950/90 shadow-xl overflow-hidden select-none">
      {/* Zoom / Pan controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-1 shadow-md">
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title={uz.viz.zoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title={uz.viz.zoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title={uz.viz.fitView}
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Lesson Preview Drawer */}
      {selectedLesson && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 bg-slate-900/95 backdrop-blur-md border border-violet-500/50 rounded-xl p-4 shadow-xl text-xs text-slate-200 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            <DifficultyBadge difficulty={selectedLesson.difficulty} />
            <button
              onClick={() => setSelectedLessonId(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              &times;
            </button>
          </div>
          <h4 className="font-semibold text-sm text-slate-100">{selectedLesson.title}</h4>
          <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
            {selectedLesson.description}
          </p>
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800">
            <span className="text-[11px] text-slate-400">
              {selectedLesson.readingMinutes} {uz.common.minutes}
            </span>
            <Link
              href={`/learn/${selectedLesson.slug}`}
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              <span>{uz.roadmap.openLesson}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* SVG Interactive Canvas */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-full cursor-${isDragging ? "grabbing" : "grab"}`}
      >
        <svg
          className="w-full h-full"
          viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="roadmap-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748b" />
            </marker>
          </defs>

          <g
            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
            style={{ transformOrigin: "center" }}
          >
            {/* Prerequisite relationship arrows */}
            {edges.map((edge) => {
              const sPos = nodePositions.get(edge.source);
              const tPos = nodePositions.get(edge.target);
              if (!sPos || !tPos) return null;

              const sx = sPos.x + 85;
              const sy = sPos.y;
              const tx = tPos.x - 85;
              const ty = tPos.y;

              const dx = tx - sx;
              const offset = Math.max(40, Math.abs(dx) / 2);
              const d = `M ${sx} ${sy} C ${sx + offset} ${sy}, ${tx - offset} ${ty}, ${tx} ${ty}`;

              return (
                <path
                  key={edge.id}
                  d={d}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  markerEnd="url(#roadmap-arrow)"
                />
              );
            })}

            {/* Lesson Nodes */}
            {lessons.map((lesson) => {
              const pos = nodePositions.get(lesson.id) ?? { x: 0, y: 0 };
              const completed = isCompleted(lesson.id);
              const isSelected = selectedLessonId === lesson.id;
              const nodeWidth = 170;
              const nodeHeight = 60;

              return (
                <g
                  key={lesson.id}
                  transform={`translate(${pos.x - nodeWidth / 2}, ${pos.y - nodeHeight / 2})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLessonId(lesson.id);
                  }}
                  className="cursor-pointer transition-transform duration-150 hover:scale-105"
                >
                  {/* Outer selection ring */}
                  {isSelected && (
                    <rect
                      x="-3"
                      y="-3"
                      width={nodeWidth + 6}
                      height={nodeHeight + 6}
                      rx="12"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                    />
                  )}

                  {/* Node box */}
                  <rect
                    width={nodeWidth}
                    height={nodeHeight}
                    rx="10"
                    fill={completed ? "#064e3b" : "#0f172a"}
                    stroke={completed ? "#10b981" : "#334155"}
                    strokeWidth="1.5"
                  />

                  {/* Completion indicator circle */}
                  <circle
                    cx="20"
                    cy={nodeHeight / 2}
                    r="8"
                    fill={completed ? "#10b981" : "transparent"}
                    stroke={completed ? "#10b981" : "#64748b"}
                    strokeWidth="1.5"
                  />
                  {completed && (
                    <path
                      d={`M 17 ${nodeHeight / 2} L 19 ${nodeHeight / 2 + 3} L 24 ${nodeHeight / 2 - 3}`}
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Lesson title */}
                  <text
                    x="35"
                    y={nodeHeight / 2 + 4}
                    fill={completed ? "#a7f3d0" : "#f1f5f9"}
                    fontSize="11"
                    fontWeight="600"
                    className="font-sans"
                  >
                    {lesson.title.length > 18 ? lesson.title.slice(0, 17) + "…" : lesson.title}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
