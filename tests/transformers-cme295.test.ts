import { describe, it, expect } from "vitest";
import {
  STANFORD_CME295_LECTURES,
  TRANSFORMER_CME295_LESSONS,
  getTransformerLessonById,
} from "@/lib/curriculum/transformers-cme295";
import {
  TRANSFORMER_COLORED_TERMS,
  TRANSFORMER_FAMILY_STYLES,
  splitTransformerTextWithColoredTerms,
  type TransformerTermFamily,
} from "@/lib/curriculum/transformers-cme295-terms";
import { executeExerciseCode } from "@/lib/runner";
import { buildLearningLibraryCatalog } from "@/lib/learning-os/catalog";
import { getRelationshipsForEntity } from "@/lib/learning-os/relationships";
import { GLOBAL_ROADMAP_NODES } from "@/lib/learning-os/global-roadmap";
import { getContentRepository } from "@/lib/content/repository";
import { buildSearchIndex } from "@/lib/search/build-index";

describe("Stanford CME 295: Transformers & Large Language Models (7 Ma'ruza / 24 Mikro-dars)", () => {
  it("defines 7 lectures with clean YouTube links (no playlist/index params) and 24 complete micro-lessons", () => {
    expect(STANFORD_CME295_LECTURES).toHaveLength(7);
    expect(STANFORD_CME295_LECTURES.map((l) => l.youtubeId)).toEqual([
      "114i2Kz-LZA",
      "GaIeu3npx04",
      "S3bCDcJhz4s",
      "3Vaj0Oka_t4",
      "25KIyaeI_Fg",
      "nU2a2lm6vDE",
      "uoSynlTDyMs",
    ]);
    for (const lec of STANFORD_CME295_LECTURES) {
      expect(lec.youtubeUrl).toBe(`https://www.youtube.com/watch?v=${lec.youtubeId}`);
      expect(lec.youtubeUrl).not.toContain("list=");
      expect(lec.youtubeUrl).not.toContain("index=");
    }
    expect(TRANSFORMER_CME295_LESSONS).toHaveLength(24);

    const ids = new Set<string>();
    const visuals = new Set<string>();

    TRANSFORMER_CME295_LESSONS.forEach((lesson, idx) => {
      expect(lesson.order).toBe(idx + 1);
      expect([1, 2, 3, 4, 5, 6, 7]).toContain(lesson.lectureNumber);
      expect(ids.has(lesson.id)).toBe(false);
      expect(visuals.has(lesson.visualId)).toBe(false);
      ids.add(lesson.id);
      visuals.add(lesson.visualId);

      expect(lesson.analogyUz.length).toBeGreaterThan(20);
      expect(lesson.theoryParagraphsUz.length).toBeGreaterThanOrEqual(2);
      expect(lesson.formulaLatex.length).toBeGreaterThan(5);
      expect(lesson.pytorchSnippet.length).toBeGreaterThan(20);
      expect(lesson.quiz.options.length).toBe(3);
      expect(getTransformerLessonById(lesson.id)?.id).toBe(lesson.id);
    });
  });

  it("tokenizes and color-codes Transformer, RL, Systems, Agents & Eval terms across all 5 families", () => {
    const families = new Set<TransformerTermFamily>(
      TRANSFORMER_COLORED_TERMS.map((t) => t.family),
    );
    expect(families.size).toBe(5);
    expect(Object.keys(TRANSFORMER_FAMILY_STYLES)).toHaveLength(5);

    const sample =
      "BPE Tokenizer Embeddings [MASK] Self-Attention RoPE GQA PPO GRPO FlashAttention HBM SRAM PagedAttention Speculative Decoding MCP Prompt Caching ReAct Loop Pass@K LLM-as-a-Judge Bench Maxing Goodhart's Law";
    const chunks = splitTransformerTextWithColoredTerms(sample);
    const matched = new Set(
      chunks.filter((c) => c.meta !== null).map((c) => c.meta!.term),
    );

    expect(matched.has("BPE")).toBe(true);
    expect(matched.has("Self-Attention")).toBe(true);
    expect(matched.has("RoPE")).toBe(true);
    expect(matched.has("PPO")).toBe(true);
    expect(matched.has("FlashAttention")).toBe(true);
    expect(matched.has("PagedAttention")).toBe(true);
    expect(matched.has("Speculative Decoding")).toBe(true);
    expect(matched.has("MCP")).toBe(true);
    expect(matched.has("Prompt Caching")).toBe(true);
    expect(matched.has("ReAct Loop")).toBe(true);
    expect(matched.has("Pass@K")).toBe(true);
    expect(matched.has("LLM-as-a-Judge")).toBe(true);
    expect(matched.has("Bench Maxing")).toBe(true);
    expect(matched.has("Goodhart's Law")).toBe(true);
  });

  it(
    "integrates with Learning OS catalog, relationships, global roadmap, and unified search",
    () => {
      const catalog = buildLearningLibraryCatalog();
      const mod = catalog.find((c) => c.id === "transformers-cme295");
      expect(mod).toBeDefined();
      expect(mod?.phasesOrChapters).toBe(7);
      expect(mod?.publishedItems).toBe(24);
      expect(mod?.plannedOrDraftItems).toBe(0);
      expect(mod?.href).toBe("/learn/transformers-cme295");

      for (const lesson of TRANSFORMER_CME295_LESSONS) {
        const rel = getRelationshipsForEntity(lesson.id, {
          title: lesson.titleUz,
        });
        expect(
          rel.matchedConceptId,
          `Missing concept link for ${lesson.id}`,
        ).not.toBeNull();
      }

      const roadmapLinkedIds = new Set(
        GLOBAL_ROADMAP_NODES.flatMap((n) => n.associatedLessons)
          .filter((a) => a.source === "stanford-cme295")
          .map((a) => a.id),
      );
      for (const lesson of TRANSFORMER_CME295_LESSONS) {
        expect(
          roadmapLinkedIds.has(lesson.id),
          `Missing roadmap link for ${lesson.id}`,
        ).toBe(true);
      }

      const repo = getContentRepository();
      const searchIndex = buildSearchIndex(repo);
      const indexedTrIds = new Set(
        searchIndex.documents
          .filter((d) => d.id.startsWith("lesson:tr-"))
          .map((d) => d.id.replace("lesson:", "")),
      );
      expect(indexedTrIds.size).toBe(24);
    },
    15000,
  );

  it(
    "passes automated Python testCases for all 24 micro-lesson modelSolution implementations",
    async () => {
      for (const lesson of TRANSFORMER_CME295_LESSONS) {
        const solution = lesson.exercise.modelSolution;
        expect(solution, `Missing modelSolution for ${lesson.id}`).toBeDefined();
        const result = await executeExerciseCode(lesson.exercise, solution!);
        expect(
          result.allTestsPassed,
          `Exercise ${lesson.id} failed: ${result.stderr || JSON.stringify(result.testResults)}`,
        ).toBe(true);
      }
    },
    45000,
  );
});
