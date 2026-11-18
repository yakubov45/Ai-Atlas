import { computeDepths, type GraphEdgeLike } from "./graph";

export type LayoutDirection = "horizontal" | "vertical";

export interface LayoutOptions {
  direction?: LayoutDirection;
  /** Distance between layers (columns when horizontal). */
  layerGap?: number;
  /** Distance between nodes inside one layer. */
  nodeGap?: number;
  /**
   * Optional sort key for nodes within a layer (e.g. category order, lesson
   * order). Defaults to the input order.
   */
  compare?: (a: string, b: string) => number;
}

export interface Positioned {
  x: number;
  y: number;
}

/**
 * Deterministic layered layout (a light Sugiyama-style placement):
 * layer = longest-path depth; nodes are centred within each layer.
 * Good enough for roadmaps and pipeline diagrams without a heavy
 * layout dependency.
 */
export function layeredLayout(
  nodeIds: readonly string[],
  edges: readonly GraphEdgeLike[],
  options: LayoutOptions = {},
): Map<string, Positioned> {
  const { direction = "horizontal", layerGap = 260, nodeGap = 120 } = options;
  const depths = computeDepths(nodeIds, edges);
  const order = new Map(nodeIds.map((id, index) => [id, index]));
  const compare = options.compare ?? ((a: string, b: string) => (order.get(a) ?? 0) - (order.get(b) ?? 0));

  const layers = new Map<number, string[]>();
  for (const id of nodeIds) {
    const depth = depths.get(id) ?? 0;
    const layer = layers.get(depth) ?? [];
    layer.push(id);
    layers.set(depth, layer);
  }

  const maxLayerSize = Math.max(0, ...[...layers.values()].map((layer) => layer.length));
  const positions = new Map<string, Positioned>();
  for (const [depth, layer] of layers) {
    layer.sort(compare);
    const offset = ((maxLayerSize - layer.length) * nodeGap) / 2;
    layer.forEach((id, index) => {
      const along = depth * layerGap;
      const across = offset + index * nodeGap;
      positions.set(id, direction === "horizontal" ? { x: along, y: across } : { x: across, y: along });
    });
  }
  return positions;
}
