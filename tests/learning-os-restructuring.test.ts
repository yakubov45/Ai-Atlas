import { describe, it, expect } from "vitest";
import { buildLearningLibraryCatalog, SUBJECT_GROUPS } from "@/lib/learning-os/catalog";
import {
  CAREER_BRANCHES,
  GLOBAL_ROADMAP_NODES,
  GLOBAL_STAGES,
  getGlobalNodeById,
} from "@/lib/learning-os/global-roadmap";
import { getRelationshipsForEntity } from "@/lib/learning-os/relationships";
import {
  computeUnifiedProgressStats,
  detectKnowledgeGaps,
  isCanonicalItemCompleted,
} from "@/lib/learning-os/progress-sync";
import { EMPTY_LEARNING_STATE, type LearningState } from "@/lib/progress/repository";
import {
  DL_ARCHITECTURE_ENRICHMENT,
  DL_PRACTICAL_COMPARISONS,
} from "@/lib/curriculum/deep-learning-16-enrichment";
import { SIXTEEN_ARCHITECTURES } from "@/lib/curriculum/deep-learning-16-architectures";
import { detectPrerequisiteCycles } from "@/lib/knowledge-graph/learning-paths";
import { getContentRepository } from "@/lib/content/repository";
import { buildSearchIndex } from "@/lib/search/build-index";

describe("AI Atlas Learning OS Restructuring", () => {
  it("groups courses honestly across 6 Subject Groups without inflating planned counts", () => {
    expect(SUBJECT_GROUPS.length).toBe(6);
    const catalog = buildLearningLibraryCatalog();
    expect(catalog.length).toBeGreaterThanOrEqual(9);
    const deCourse = catalog.find((c) => c.id === "data-eng")!;
    expect(deCourse.publishedItems).toBe(1);
    expect(deCourse.plannedOrDraftItems).toBe(357);
  });

  it("defines a 10-stage Global Roadmap spanning 10 career branches + All without cycles", () => {
    expect(GLOBAL_STAGES.length).toBe(10);
    expect(CAREER_BRANCHES.length).toBe(11);

    for (const node of GLOBAL_ROADMAP_NODES) {
      for (const req of node.requiredPrerequisites) {
        expect(getGlobalNodeById(req)).toBeDefined();
      }
      expect(node.associatedLessons.length).toBeGreaterThan(0);
    }

    // Verify KG prerequisite graph including new 16 DL architectures stays a strict DAG
    expect(detectPrerequisiteCycles()).toEqual([]);
  });

  it("enriches all 16 Deep Learning architectures and contrasts Transformer vs Mamba fairly", () => {
    for (const arch of SIXTEEN_ARCHITECTURES) {
      const enrich = DL_ARCHITECTURE_ENRICHMENT[arch.id];
      expect(enrich, `Missing enrichment for ${arch.id}`).toBeDefined();
      expect(enrich!.pytorchCode.length).toBeGreaterThan(30);
      expect(enrich!.tensorShapesUz.length).toBeGreaterThan(10);
    }

    expect(DL_PRACTICAL_COMPARISONS.length).toBe(8);
    const mambaCmp = DL_PRACTICAL_COMPARISONS.find((c) => c.id === "transformer-vs-mamba");
    expect(mambaCmp).toBeDefined();
    expect(mambaCmp!.tradeOffWarningUz).toContain("Transformerning o'rnini to'liq bosuvchi");
  });

  it("resolves Bog'liqliklar (Knowledge Relationships) for MDX slugs, tracks, and DL 16", () => {
    const ragBundle = getRelationshipsForEntity("rag");
    expect(ragBundle.prerequisites.length).toBeGreaterThan(0);
    expect(ragBundle.associatedLabs.length).toBeGreaterThan(0);

    const mambaBundle = getRelationshipsForEntity("mamba");
    expect(mambaBundle.matchedConceptId).toBe("dl-mamba");
    expect(mambaBundle.directRelations.some((r) => r.edgeType === "alternative_to")).toBe(true);

    const hfTokBundle = getRelationshipsForEntity("hf-02-05-01");
    expect(hfTokBundle.matchedConceptId).toBe("tokenization-bpe");
  });

  it("deduplicates canonical progress across courses and separates Known concepts from Completed", () => {
    const state: LearningState = {
      ...EMPTY_LEARNING_STATE,
      completed: {
        "python-basics": { completedAt: "2026-01-01T00:00:00Z" },
      },
      completedMicroLessons: {
        "py-01-01": { completedAt: "2026-01-01T00:00:00Z" },
      },
      knownConcepts: {
        probability: { markedAt: "2026-01-01T00:00:00Z" },
      },
      lastVisited: {
        lessonId: "rag",
        slug: "rag",
        title: "RAG",
        visitedAt: "2026-01-01T00:00:00Z",
        progress: 0.5,
      },
    };

    const stats = computeUnifiedProgressStats(state, ["python-basics", "rag"]);
    expect(stats.uniqueCompletedCount).toBe(1); // python-basics + py-01-01 deduplicated to 1
    expect(stats.knownConceptsCount).toBe(1); // never merged into uniqueCompletedCount
    expect(isCanonicalItemCompleted(state, "py-01-01")).toBe(true);

    const gaps = detectKnowledgeGaps(state);
    expect(gaps.length).toBeGreaterThan(0);
  });

  it("expands Global Search across lessons, courses, concepts, papers, and practice", () => {
    const repo = getContentRepository();
    const index = buildSearchIndex(repo);
    const kinds = new Set(index.documents.map((d) => d.kind));
    expect(kinds.has("lesson")).toBe(true);
    expect(kinds.has("course")).toBe(true);
    expect(kinds.has("concept")).toBe(true);
    expect(kinds.has("paper")).toBe(true);
    expect(kinds.has("practice")).toBe(true);
  });
});
