/** Generic directed-graph utilities shared by the roadmap and flow diagrams. */

export interface GraphEdgeLike {
  source: string;
  target: string;
}

export interface Adjacency {
  outgoing: Map<string, string[]>;
  incoming: Map<string, string[]>;
}

export function buildAdjacency(nodeIds: readonly string[], edges: readonly GraphEdgeLike[]): Adjacency {
  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();
  for (const id of nodeIds) {
    outgoing.set(id, []);
    incoming.set(id, []);
  }
  for (const edge of edges) {
    if (!outgoing.has(edge.source) || !incoming.has(edge.target)) continue;
    outgoing.get(edge.source)!.push(edge.target);
    incoming.get(edge.target)!.push(edge.source);
  }
  return { outgoing, incoming };
}

/** Returns every cycle found (each as a list of node ids, first node repeated at end). */
export function findCycles(nodeIds: readonly string[], edges: readonly GraphEdgeLike[]): string[][] {
  const { outgoing } = buildAdjacency(nodeIds, edges);
  const state = new Map<string, 0 | 1 | 2>(); // 0 = new, 1 = visiting, 2 = done
  const stack: string[] = [];
  const cycles: string[][] = [];
  const seen = new Set<string>();

  const visit = (id: string): void => {
    state.set(id, 1);
    stack.push(id);
    for (const next of outgoing.get(id) ?? []) {
      const s = state.get(next) ?? 0;
      if (s === 0) visit(next);
      else if (s === 1) {
        const cycle = [...stack.slice(stack.indexOf(next)), next];
        const key = [...cycle].slice(0, -1).sort().join("|");
        if (!seen.has(key)) {
          seen.add(key);
          cycles.push(cycle);
        }
      }
    }
    stack.pop();
    state.set(id, 2);
  };

  for (const id of nodeIds) if ((state.get(id) ?? 0) === 0) visit(id);
  return cycles;
}

/**
 * Longest-path depth of each node from the graph roots. Edges that would
 * close a cycle are ignored so the function always terminates.
 */
export function computeDepths(nodeIds: readonly string[], edges: readonly GraphEdgeLike[]): Map<string, number> {
  const { incoming } = buildAdjacency(nodeIds, edges);
  const depths = new Map<string, number>();
  const visiting = new Set<string>();

  const depthOf = (id: string): number => {
    const cached = depths.get(id);
    if (cached !== undefined) return cached;
    if (visiting.has(id)) return 0; // cycle guard
    visiting.add(id);
    let depth = 0;
    for (const parent of incoming.get(id) ?? []) {
      if (visiting.has(parent)) continue;
      depth = Math.max(depth, depthOf(parent) + 1);
    }
    visiting.delete(id);
    depths.set(id, depth);
    return depth;
  };

  for (const id of nodeIds) depthOf(id);
  return depths;
}

function walk(start: string, neighbours: Map<string, string[]>): Set<string> {
  const visited = new Set<string>();
  const queue = [...(neighbours.get(start) ?? [])];
  while (queue.length > 0) {
    const id = queue.shift() as string;
    if (visited.has(id) || id === start) continue;
    visited.add(id);
    queue.push(...(neighbours.get(id) ?? []));
  }
  return visited;
}

export function ancestorsOf(id: string, adjacency: Adjacency): Set<string> {
  return walk(id, adjacency.incoming);
}

export function descendantsOf(id: string, adjacency: Adjacency): Set<string> {
  return walk(id, adjacency.outgoing);
}

/**
 * Nodes and edges on any directed path passing through `id`
 * (all ancestors + all descendants + the node itself).
 */
export function pathThrough(
  id: string,
  nodeIds: readonly string[],
  edges: ReadonlyArray<GraphEdgeLike & { id: string }>,
): { nodes: Set<string>; edges: Set<string> } {
  const adjacency = buildAdjacency(nodeIds, edges);
  const up = ancestorsOf(id, adjacency);
  const down = descendantsOf(id, adjacency);
  const nodes = new Set<string>([id, ...up, ...down]);
  const edgeIds = new Set<string>();
  for (const edge of edges) {
    const upstream = (up.has(edge.source) || edge.source === id) && (up.has(edge.target) || edge.target === id);
    const downstream =
      (down.has(edge.source) || edge.source === id) && (down.has(edge.target) || edge.target === id);
    if ((upstream || downstream) && edge.source !== edge.target) edgeIds.add(edge.id);
  }
  return { nodes, edges: edgeIds };
}
