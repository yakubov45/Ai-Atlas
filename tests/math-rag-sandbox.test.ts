import { describe, it, expect } from "vitest";
import {
  chunkDocuments,
  runRagSandboxPipeline,
  evaluateRetrievalMetrics,
  DEFAULT_RAG_DOCUMENTS,
  DEFAULT_EVAL_CASES,
} from "@/lib/math/rag-sandbox";

describe("Phase 13–16 — RAG Sandbox, Grounded Citations, No-Answer Policy & Hit@k/MRR", () => {
  it("chunks corpus documents with configurable chunkSizeWords and chunkOverlapWords", () => {
    const chunksSmall = chunkDocuments(DEFAULT_RAG_DOCUMENTS, 14, 4);
    const chunksLarge = chunkDocuments(DEFAULT_RAG_DOCUMENTS, 45, 0);

    expect(chunksSmall.length).toBeGreaterThan(chunksLarge.length);
    expect(chunksSmall[0]?.id).toContain("#c1");
    expect(chunksSmall[0]?.embedding.length).toBe(8);
  });

  it("retrieves relevant chunks and produces a grounded answer with [chunkId] citation", () => {
    const ragCase = DEFAULT_EVAL_CASES[0]!;
    const result = runRagSandboxPipeline({
      query: ragCase.question,
      chunkSizeWords: 28,
      chunkOverlapWords: 6,
      topK: 2,
      minSimilarityThreshold: 0.25,
    });

    expect(result.answered).toBe(true);
    expect(result.selectedChunks.length).toBeGreaterThan(0);
    expect(result.selectedChunks[0]?.chunk.docId).toBe(ragCase.expectedDocId);
    expect(result.citations.length).toBeGreaterThan(0);
    expect(result.groundedAnswer).toContain("[doc-rag-chunking#c");
  });

  it("enforces No-Answer Policy when top chunk similarity is below threshold or out-of-domain", () => {
    const result = runRagSandboxPipeline({
      query: "Mars sayyorasida kartoshka yetishtirish ob-havo harorati qanday?",
      chunkSizeWords: 28,
      chunkOverlapWords: 6,
      topK: 2,
      minSimilarityThreshold: 0.35,
    });

    expect(result.answered).toBe(false);
    expect(result.citations).toEqual([]);
    expect(result.groundedAnswer).toContain("No-Answer Policy");
  });

  it("computes real Hit@k and MRR metrics across benchmark queries", () => {
    const evalSummary = evaluateRetrievalMetrics({
      chunkSizeWords: 28,
      chunkOverlapWords: 6,
      k: 2,
    });

    expect(evalSummary.cases.length).toBeGreaterThanOrEqual(4);
    expect(evalSummary.hitRateAtK).toBeGreaterThanOrEqual(0.75);
    expect(evalSummary.mrr).toBeGreaterThanOrEqual(0.75);
  });
});
