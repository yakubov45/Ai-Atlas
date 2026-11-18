import { describe, it, expect } from "vitest";
import {
  SPECIALIZATION_PATHS,
  getLessonRoleInPath,
  DEPTH_META,
} from "@/lib/curriculum/paths";
import {
  TRANSFORMER_MODULES,
  TRANSFORMER_MICRO_LESSONS,
} from "@/lib/curriculum/transformer-path";
import { splitLessonBodyIntoSections } from "@/lib/curriculum/micro-lessons";
import { MemoryStorage } from "@/lib/storage/storage";
import { StorageLearningRepository } from "@/lib/progress/repository";
import { createLearningStore } from "@/lib/progress/store";
import { getContentRepository } from "@/lib/content/repository";

describe("Personalized Micro-Learning Curriculum Engine", () => {
  it("defines 7 specialization tracks with valid lesson slugs from the content repository", () => {
    const repo = getContentRepository();
    const validSlugs = new Set(repo.lessons.map((l) => l.slug));

    expect(SPECIALIZATION_PATHS).toHaveLength(7);

    for (const path of SPECIALIZATION_PATHS) {
      expect(path.coreSlugs.length).toBeGreaterThan(0);
      for (const slug of [
        ...path.coreSlugs,
        ...path.supportingSlugs,
        ...path.advancedSlugs,
      ]) {
        expect(validSlugs.has(slug), `Slug '${slug}' in path '${path.id}' must exist`).toBe(
          true,
        );
      }
    }
  }, 15000);

  it("classifies lessons into Deep Learning Path (master/understand) vs Overview (optional) per track", () => {
    // In LLM Engineer track, 'transformers' is core -> master, while 'cnn' is optional -> overview
    const tfInLlm = getLessonRoleInPath("transformers", "llm-engineer");
    expect(tfInLlm.role).toBe("core");
    expect(tfInLlm.recommendedDepth).toBe("master");

    const cnnInLlm = getLessonRoleInPath("cnn", "llm-engineer");
    expect(cnnInLlm.role).toBe("optional");
    expect(cnnInLlm.recommendedDepth).toBe("overview");

    // In Deep Learning track, 'cnn' is core -> master
    const cnnInDl = getLessonRoleInPath("cnn", "deep-learning");
    expect(cnnInDl.role).toBe("core");
    expect(cnnInDl.recommendedDepth).toBe("master");

    expect(DEPTH_META.overview.levelNumber).toBe(1);
    expect(DEPTH_META.understand.levelNumber).toBe(2);
    expect(DEPTH_META.master.levelNumber).toBe(3);
  });

  it("structures Transformer into 5 modules and 20 micro-lessons (4 + 4 + 6 + 3 + 3)", () => {
    expect(TRANSFORMER_MODULES).toHaveLength(5);
    expect(TRANSFORMER_MICRO_LESSONS).toHaveLength(20);

    const counts = TRANSFORMER_MODULES.map((m) => m.lessons.length);
    expect(counts).toEqual([4, 4, 6, 3, 3]);

    const repo = getContentRepository();
    const validSlugs = new Set(repo.lessons.map((l) => l.slug));

    for (const micro of TRANSFORMER_MICRO_LESSONS) {
      expect(validSlugs.has(micro.relatedSlug)).toBe(true);
      expect(micro.checkpoint.options.length).toBeGreaterThanOrEqual(2);
      expect(micro.checkpoint.correctIndex).toBeGreaterThanOrEqual(0);
      expect(micro.checkpoint.correctIndex).toBeLessThan(micro.checkpoint.options.length);
      for (const pre of micro.adaptiveHelp.prerequisiteSlugs) {
        expect(validSlugs.has(pre.slug), `Prerequisite '${pre.slug}' must exist`).toBe(true);
      }
    }
  });

  it("tracks per-depth completion independently and preserves progress when switching specialization", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    store.setSelectedPath("llm-engineer");
    expect(store.getSnapshot().selectedPathId).toBe("llm-engineer");

    // Completing Level 1 (Overview) must NOT mark Level 3 (Master) complete
    store.setDepthCompleted("transformers", "overview", true);
    expect(store.isDepthCompleted("transformers", "overview")).toBe(true);
    expect(store.isDepthCompleted("transformers", "understand")).toBe(false);
    expect(store.isDepthCompleted("transformers", "master")).toBe(false);

    // Complete micro-lesson #10 (Q, K, V)
    store.setMicroLessonCompleted("tf-10-query-key-value", true);
    expect(store.isMicroLessonCompleted("tf-10-query-key-value")).toBe(true);

    // Switch specialization to 'agent-engineer' — progress must remain intact
    store.setSelectedPath("agent-engineer");
    expect(store.getSnapshot().selectedPathId).toBe("agent-engineer");
    expect(store.isDepthCompleted("transformers", "overview")).toBe(true);
    expect(store.isMicroLessonCompleted("tf-10-query-key-value")).toBe(true);
  });

  it("splits canonical lesson MDX bodies into Intuition, Visual, Math, Practice, and Summary sections", () => {
    const sampleMdx = [
      "## 1. Qisqacha ta'rif\nTa'rif matni.",
      "## 3. Intuitiv tushuntirish (Level 1 — Beginner)\nIntuitsiya matni.",
      "## 4. Qanday ishlaydi? (Level 2 — Intermediate)\nMexanizm matni.",
      "## 5. Matematik asoslari (Level 3 — Advanced)\nFormula matni.",
      "## Python / PyTorch Amaliy Misoli\n```python\nprint(1)\n```",
      "## 7. Bog'liq tushunchalar\nBog'liq darslar.",
    ].join("\n\n");

    const split = splitLessonBodyIntoSections(sampleMdx);
    expect(split.intuitionMdx).toContain("Intuitsiya matni");
    expect(split.visualMdx).toContain("Mexanizm matni");
    expect(split.mathMdx).toContain("Formula matni");
    expect(split.practiceMdx).toContain("print(1)");
    expect(split.summaryMdx).toContain("Bog'liq darslar");
  });
});
