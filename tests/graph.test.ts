import { describe, it, expect } from "vitest";
import { findCycles, computeDepths, pathThrough } from "@/lib/graph/graph";
import { layeredLayout } from "@/lib/graph/layout";

describe("Graph and Layout Algorithms", () => {
  it("finds directed cycles in a graph", () => {
    const nodeIds = ["A", "B", "C", "D"];
    const edges = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "A" },
      { source: "C", target: "D" },
    ];
    const cycles = findCycles(nodeIds, edges);
    expect(cycles.length).toBeGreaterThan(0);
    expect(cycles[0]).toEqual(["A", "B", "C", "A"]);
  });

  it("computes longest-path depths for a DAG", () => {
    const nodeIds = ["root", "mid1", "mid2", "leaf"];
    const edges = [
      { source: "root", target: "mid1" },
      { source: "mid1", target: "leaf" },
      { source: "root", target: "mid2" },
    ];
    const depths = computeDepths(nodeIds, edges);
    expect(depths.get("root")).toBe(0);
    expect(depths.get("mid1")).toBe(1);
    expect(depths.get("mid2")).toBe(1);
    expect(depths.get("leaf")).toBe(2);
  });

  it("extracts full upstream and downstream path", () => {
    const nodeIds = ["A", "B", "C", "D"];
    const edges = [
      { id: "e1", source: "A", target: "B" },
      { id: "e2", source: "B", target: "C" },
      { id: "e3", source: "D", target: "C" },
    ];
    const { nodes, edges: edgeIds } = pathThrough("B", nodeIds, edges);
    expect(nodes.has("A")).toBe(true);
    expect(nodes.has("B")).toBe(true);
    expect(nodes.has("C")).toBe(true);
    expect(nodes.has("D")).toBe(false);
    expect(edgeIds.has("e1")).toBe(true);
    expect(edgeIds.has("e2")).toBe(true);
  });

  it("generates deterministic layered layout coordinates", () => {
    const nodeIds = ["A", "B", "C"];
    const edges = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
    ];
    const positions = layeredLayout(nodeIds, edges, { layerGap: 200 });
    expect(positions.get("A")?.x).toBe(0);
    expect(positions.get("B")?.x).toBe(200);
    expect(positions.get("C")?.x).toBe(400);
  });
});
