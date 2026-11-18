"use client";

import React, { useState, useEffect } from "react";
import { uz } from "@/i18n/dictionaries/uz";

interface Node {
  id: number;
  x: number;
  y: number;
  r: number;
  layer: number;
  label: string;
}

export function HeroAiVisual() {
  const [pulse, setPulse] = useState(0);

  // Layers of an abstract AI network (3 -> 4 -> 3)
  const nodes: Node[] = [
    // Input layer
    { id: 1, x: 60, y: 70, r: 8, layer: 0, label: "x₁" },
    { id: 2, x: 60, y: 150, r: 8, layer: 0, label: "x₂" },
    { id: 3, x: 60, y: 230, r: 8, layer: 0, label: "x₃" },
    // Hidden layer
    { id: 4, x: 180, y: 50, r: 9, layer: 1, label: "h₁" },
    { id: 5, x: 180, y: 115, r: 9, layer: 1, label: "h₂" },
    { id: 6, x: 180, y: 185, r: 9, layer: 1, label: "h₃" },
    { id: 7, x: 180, y: 250, r: 9, layer: 1, label: "h₄" },
    // Output layer
    { id: 8, x: 300, y: 80, r: 8, layer: 2, label: "y₁" },
    { id: 9, x: 300, y: 150, r: 8, layer: 2, label: "y₂" },
    { id: 10, x: 300, y: 220, r: 8, layer: 2, label: "y₃" },
  ];

  // Connect layer 0 to layer 1, and layer 1 to layer 2
  const connections: Array<[number, number]> = [];
  nodes.filter((n) => n.layer === 0).forEach((n1) => {
    nodes.filter((n) => n.layer === 1).forEach((n2) => {
      connections.push([n1.id, n2.id]);
    });
  });
  nodes.filter((n) => n.layer === 1).forEach((n1) => {
    nodes.filter((n) => n.layer === 2).forEach((n2) => {
      connections.push([n1.id, n2.id]);
    });
  });

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full max-w-md h-[320px] rounded-2xl border border-violet-900/40 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950 p-4 shadow-2xl shadow-violet-950/30 overflow-hidden flex items-center justify-center"
      aria-label={uz.home.heroVisualLabel}
    >
      {/* Background glow radial */}
      <div className="absolute inset-0 bg-radial from-violet-600/10 via-transparent to-transparent pointer-events-none" />

      <svg
        viewBox="0 0 360 300"
        className="w-full h-full select-none"
      >
        <defs>
          <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections */}
        {connections.map(([id1, id2], i) => {
          const n1 = nodeMap.get(id1)!;
          const n2 = nodeMap.get(id2)!;
          const isHighlighted = (i + pulse) % 7 === 0;

          return (
            <line
              key={`${id1}-${id2}`}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke={isHighlighted ? "#38bdf8" : "url(#edge-grad)"}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeOpacity={isHighlighted ? 0.9 : 0.25}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isPulsing = (node.id + Math.floor(pulse / 10)) % 4 === 0;

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* Outer halo */}
              <circle
                r={node.r + 4}
                fill="none"
                stroke={isPulsing ? "#06b6d4" : "#8b5cf6"}
                strokeWidth="1.5"
                strokeOpacity={isPulsing ? 0.8 : 0.2}
                filter={isPulsing ? "url(#glow-filter)" : undefined}
                className="transition-all duration-300"
              />

              {/* Node core */}
              <circle
                r={node.r}
                fill={node.layer === 1 ? "#1e1b4b" : "#0f172a"}
                stroke={node.layer === 1 ? "#8b5cf6" : "#06b6d4"}
                strokeWidth="2"
              />

              {/* Label */}
              <text
                y="3"
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
