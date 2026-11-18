/**
 * Unified AI Knowledge Graph — Visual Canvas Layout Engine
 * 
 * Computes deterministic (X, Y) coordinates and layer depths for all concept nodes,
 * grouping them cleanly by depth layers and semantic domains.
 */

import { CANONICAL_CONCEPTS } from "./concepts";
import { CONCEPT_RELATIONS } from "./relations";
import { buildPrerequisiteAdjacency } from "./learning-paths";
import type { ConceptDomain, GraphLayoutNode } from "./types";

export interface CanvasDimensions {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export const DOMAIN_COLORS: Record<
  ConceptDomain,
  {
    bg: string;
    border: string;
    text: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  programming: {
    bg: "bg-emerald-950/80",
    border: "border-emerald-500/60",
    text: "text-emerald-300",
    glow: "shadow-emerald-500/20",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
  },
  mathematics: {
    bg: "bg-amber-950/80",
    border: "border-amber-500/60",
    text: "text-amber-300",
    glow: "shadow-amber-500/20",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
  },
  "data-science": {
    bg: "bg-cyan-950/80",
    border: "border-cyan-500/60",
    text: "text-cyan-300",
    glow: "shadow-cyan-500/20",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400",
  },
  "machine-learning": {
    bg: "bg-blue-950/80",
    border: "border-blue-500/60",
    text: "text-blue-300",
    glow: "shadow-blue-500/20",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
  },
  "ai-engineering": {
    bg: "bg-violet-950/80",
    border: "border-violet-500/60",
    text: "text-violet-300",
    glow: "shadow-violet-500/20",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
  },
};

export const DOMAIN_TITLES_UZ: Record<ConceptDomain, string> = {
  programming: "Dasturlash & Muhandislik",
  mathematics: "Matematika & Analiz",
  "data-science": "Data Science & Tahlil",
  "machine-learning": "Machine Learning & DL",
  "ai-engineering": "AI Engineering & LLM",
};

/** Compute depth from roots (longest path from foundation) */
export function computeConceptDepths(): Map<string, number> {
  const { prereqsOf } = buildPrerequisiteAdjacency(true);
  const depths = new Map<string, number>();
  const visiting = new Set<string>();

  const getDepth = (id: string): number => {
    if (depths.has(id)) return depths.get(id)!;
    if (visiting.has(id)) return 0; // guard
    visiting.add(id);

    let maxDepth = 0;
    for (const parent of prereqsOf.get(id) ?? []) {
      maxDepth = Math.max(maxDepth, getDepth(parent) + 1);
    }

    visiting.delete(id);
    depths.set(id, maxDepth);
    return maxDepth;
  };

  for (const c of CANONICAL_CONCEPTS) {
    getDepth(c.id);
  }

  return depths;
}

/** Compute node positions in layered grid */
export function computeGraphLayout(
  filteredConceptIds?: Set<string>,
  colGap = 320,
  rowGap = 140
): {
  nodes: GraphLayoutNode[];
  bounds: CanvasDimensions;
} {
  const depths = computeConceptDepths();
  const visibleConcepts = filteredConceptIds
    ? CANONICAL_CONCEPTS.filter((c) => filteredConceptIds.has(c.id))
    : CANONICAL_CONCEPTS;

  // Group by layer depth
  const layers = new Map<number, typeof visibleConcepts>();
  for (const c of visibleConcepts) {
    const d = depths.get(c.id) ?? 0;
    if (!layers.has(d)) layers.set(d, []);
    layers.get(d)!.push(c);
  }

  const nodes: GraphLayoutNode[] = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const sortedLayerKeys = Array.from(layers.keys()).sort((a, b) => a - b);

  for (const layerIdx of sortedLayerKeys) {
    const conceptsInLayer = layers.get(layerIdx)!;

    // Group within layer by domain for neat visual clustering
    const domainOrder: Record<ConceptDomain, number> = {
      programming: 1,
      mathematics: 2,
      "data-science": 3,
      "machine-learning": 4,
      "ai-engineering": 5,
    };
    conceptsInLayer.sort((a, b) => domainOrder[a.domain] - domainOrder[b.domain]);

    const layerHeight = conceptsInLayer.length * rowGap;
    const startY = -layerHeight / 2;

    conceptsInLayer.forEach((concept, itemIdx) => {
      const x = layerIdx * colGap + 100;
      const y = startY + itemIdx * rowGap + 300;
      const depth = layerIdx;

      nodes.push({ id: concept.id, concept, x, y, depth });

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });
  }

  if (!Number.isFinite(minX)) {
    return {
      nodes: [],
      bounds: { minX: 0, minY: 0, maxX: 1200, maxY: 800, width: 1200, height: 800 },
    };
  }

  const padding = 200;
  return {
    nodes,
    bounds: {
      minX: minX - padding,
      minY: minY - padding,
      maxX: maxX + padding,
      maxY: maxY + padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2,
    },
  };
}
