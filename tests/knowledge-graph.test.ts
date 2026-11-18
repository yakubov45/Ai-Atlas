import { describe, it, expect } from "vitest";
import {
  CANONICAL_CONCEPTS,
  CONCEPTS_BY_ID,
  getConceptById,
} from "@/lib/knowledge-graph/concepts";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import {
  detectPrerequisiteCycles,
  generateLearningPath,
  LEARNING_GOAL_PRESETS,
  topologicalSortConcepts,
} from "@/lib/knowledge-graph/learning-paths";
import { computeGraphLayout } from "@/lib/knowledge-graph/layout";

describe("Knowledge Graph Data Integrity", () => {
  it("has unique canonical concept IDs", () => {
    const ids = CANONICAL_CONCEPTS.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
    expect(ids.length).toBeGreaterThanOrEqual(25);
  });

  it("ensures every relation references valid existing concepts", () => {
    for (const rel of CONCEPT_RELATIONS) {
      const sourceConcept = getConceptById(rel.source);
      const targetConcept = getConceptById(rel.target);

      expect(sourceConcept, `Missing source concept ${rel.source} in relation ${rel.id}`).toBeDefined();
      expect(targetConcept, `Missing target concept ${rel.target} in relation ${rel.id}`).toBeDefined();
    }
  });

  it("verifies that cross-track lesson links are properly formed", () => {
    for (const concept of CANONICAL_CONCEPTS) {
      expect(concept.crossTrackLessonLinks.length).toBeGreaterThan(0);
      for (const link of concept.crossTrackLessonLinks) {
        expect(link.track).toMatch(/python-dev|ai-engineer|ml-engineer|data-science|core/);
        expect(link.href).toBeTruthy();
        expect(link.lessonId).toBeTruthy();
        expect(link.title).toBeTruthy();
      }
    }
  });

  it("ensures the prerequisite graph is a strict DAG (0 cycles)", () => {
    const cycles = detectPrerequisiteCycles();
    if (cycles.length > 0) {
      console.error("Found prerequisite cycles:", cycles);
    }
    expect(cycles).toHaveLength(0);
  });
});

describe("Learning Path Generator", () => {
  it("successfully generates valid ordered paths for all goal presets", () => {
    for (const preset of LEARNING_GOAL_PRESETS) {
      const path = generateLearningPath(preset.targetConceptId, [], [], preset.id);
      expect(path).not.toBeNull();
      expect(path!.totalSteps).toBeGreaterThanOrEqual(2);
      expect(path!.orderedSteps.length).toBe(path!.totalSteps);

      // Final step must be the target concept
      const lastStep = path!.orderedSteps[path!.orderedSteps.length - 1]!;
      expect(lastStep.concept.id).toBe(preset.targetConceptId);
      expect(lastStep.isTarget).toBe(true);

      // First incomplete step is marked recommendedNext
      const firstStep = path!.orderedSteps[0]!;
      expect(firstStep.recommendedNext).toBe(true);
    }
  });

  it("properly marks completed steps when knownConceptIds are provided", () => {
    const preset = LEARNING_GOAL_PRESETS[0]!; // Transformers
    const pathBefore = generateLearningPath(preset.targetConceptId, [], []);
    expect(pathBefore!.completedSteps).toBe(0);

    const firstConceptId = pathBefore!.orderedSteps[0]!.concept.id;
    const pathAfter = generateLearningPath(preset.targetConceptId, [firstConceptId], []);
    expect(pathAfter!.completedSteps).toBe(1);
    expect(pathAfter!.orderedSteps[0]!.isCompleted).toBe(true);
    // The second step should now be recommended next
    expect(pathAfter!.orderedSteps[1]!.recommendedNext).toBe(true);
  });

  it("topologically sorts concepts such that prerequisites always precede dependents", () => {
    const allIds = CANONICAL_CONCEPTS.map((c) => c.id);
    const sorted = topologicalSortConcepts(allIds);
    expect(sorted.length).toBe(allIds.length);

    const indexMap = new Map(sorted.map((c, i) => [c.id, i]));
    for (const rel of CONCEPT_RELATIONS) {
      if (rel.type === "REQUIRES") {
        const sourceIdx = indexMap.get(rel.source);
        const targetIdx = indexMap.get(rel.target);
        if (sourceIdx !== undefined && targetIdx !== undefined) {
          expect(
            sourceIdx,
            `Prerequisite ${rel.source} (idx: ${sourceIdx}) should precede ${rel.target} (idx: ${targetIdx})`
          ).toBeLessThan(targetIdx);
        }
      }
    }
  });
});

describe("Visual Canvas Layout Engine", () => {
  it("computes finite canvas layout bounds and coordinates for all nodes", () => {
    const layout = computeGraphLayout();
    expect(layout.nodes.length).toBe(CANONICAL_CONCEPTS.length);
    expect(layout.bounds.width).toBeGreaterThan(500);
    expect(layout.bounds.height).toBeGreaterThan(300);

    for (const node of layout.nodes) {
      expect(Number.isFinite(node.x)).toBe(true);
      expect(Number.isFinite(node.y)).toBe(true);
      expect(node.depth).toBeGreaterThanOrEqual(0);
    }
  });
});
