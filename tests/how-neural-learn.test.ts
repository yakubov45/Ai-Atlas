import { describe, it, expect } from "vitest";
import {
  HOW_NEURAL_LEARN_FEATURED_VIDEO,
  HOW_NEURAL_LEARN_LESSONS,
  getNeuralLearnLessonById,
} from "@/lib/curriculum/how-neural-learn";
import {
  NN_COLORED_TERMS,
  TERM_FAMILY_STYLES,
  splitTextWithColoredTerms,
  type TermColorFamily,
} from "@/lib/curriculum/how-neural-learn-terms";
import { executeExerciseCode } from "@/lib/runner";
import { buildLearningLibraryCatalog } from "@/lib/learning-os/catalog";
import { getRelationshipsForEntity } from "@/lib/learning-os/relationships";
import { GLOBAL_ROADMAP_NODES } from "@/lib/learning-os/global-roadmap";
import { getContentRepository } from "@/lib/content/repository";
import { buildSearchIndex } from "@/lib/search/build-index";

describe("How Neural Networks Learn (12 Mikro-dars Moduli)", () => {
  it("links the verified YouTube explanation video for neural network learning", () => {
    expect(HOW_NEURAL_LEARN_FEATURED_VIDEO.youtubeId).toBe("uIMz7CHgshQ");
    expect(HOW_NEURAL_LEARN_FEATURED_VIDEO.youtubeUrl).toBe(
      "https://www.youtube.com/watch?v=uIMz7CHgshQ",
    );
    expect(HOW_NEURAL_LEARN_FEATURED_VIDEO.embedUrl).toContain("uIMz7CHgshQ");
    expect(HOW_NEURAL_LEARN_FEATURED_VIDEO.title).toBe(
      "How Neural Networks Actually Learn",
    );
    expect(HOW_NEURAL_LEARN_FEATURED_VIDEO.channelName).toBe("The Third Hinge");
  });

  it("contains 12 complete micro-lessons with unique IDs, visuals, formulas, PyTorch snippets and quizzes", () => {
    expect(HOW_NEURAL_LEARN_LESSONS).toHaveLength(12);

    const ids = new Set<string>();
    const visualIds = new Set<string>();

    HOW_NEURAL_LEARN_LESSONS.forEach((lesson, idx) => {
      expect(lesson.order).toBe(idx + 1);
      expect(ids.has(lesson.id)).toBe(false);
      expect(visualIds.has(lesson.visualId)).toBe(false);
      ids.add(lesson.id);
      visualIds.add(lesson.visualId);

      expect(lesson.analogyUz.length).toBeGreaterThan(20);
      expect(lesson.theoryParagraphsUz.length).toBeGreaterThanOrEqual(2);
      expect(lesson.formulaLatex.length).toBeGreaterThan(3);
      expect(lesson.pytorchSnippet.length).toBeGreaterThan(20);
      expect(lesson.quiz.options.length).toBeGreaterThanOrEqual(3);
      expect(lesson.quiz.correctIndex).toBeGreaterThanOrEqual(0);
      expect(lesson.quiz.correctIndex).toBeLessThan(lesson.quiz.options.length);
      expect(getNeuralLearnLessonById(lesson.id)?.id).toBe(lesson.id);
    });
  });

  it("embeds all 5 scientific accuracy corrections explicitly", () => {
    const allText = HOW_NEURAL_LEARN_LESSONS.map((l) =>
      [
        ...l.theoryParagraphsUz,
        l.scientificCorrectionUz?.mythUz ?? "",
        l.scientificCorrectionUz?.truthUz ?? "",
      ].join(" "),
    ).join("\n");

    // 1. 60% correct prediction still produces non-zero loss & updates weights
    const l01 = getNeuralLearnLessonById("nn-01-neuron-weight-bias")!;
    expect(l01.scientificCorrectionUz?.truthUz).toContain("60%");
    expect(l01.scientificCorrectionUz?.truthUz).toContain("Loss");

    // 2. Finite Difference vs Backpropagation + Backprop != Optimizer
    const l06 = getNeuralLearnLessonById("nn-06-derivatives-chain-rule")!;
    expect(l06.scientificCorrectionUz?.truthUz).toContain("Finite Difference");
    expect(l06.scientificCorrectionUz?.truthUz).toContain("Chain Rule");
    expect(allText).toContain("Optimizer");

    // 3. Small LR slows training rather than trapping in local minimum
    const l09 = getNeuralLearnLessonById("nn-09-learning-rate")!;
    expect(l09.scientificCorrectionUz?.truthUz).toContain("lokal minimum");
    expect(l09.scientificCorrectionUz?.truthUz).toContain("sekin");

    // 4. Sigmoid(0) = 0.5 counterexample
    const l02 = getNeuralLearnLessonById("nn-02-activation-functions")!;
    expect(l02.scientificCorrectionUz?.truthUz).toContain("Sigmoid(0)");
    expect(l02.scientificCorrectionUz?.truthUz).toContain("0.5");

    // 5. Causal Next-Token Prediction vs Masked Language Modeling
    const l12 = getNeuralLearnLessonById("nn-12-gpu-matmul-pytorch")!;
    expect(l12.scientificCorrectionUz?.truthUz).toContain("Causal");
    expect(l12.scientificCorrectionUz?.truthUz).toContain("Masked Language Modeling");
  });

  it("tokenizes and color-codes key terms across all 5 semantic color families", () => {
    const familiesPresent = new Set<TermColorFamily>(
      NN_COLORED_TERMS.map((t) => t.family),
    );
    expect(familiesPresent.size).toBe(5);
    expect(Object.keys(TERM_FAMILY_STYLES)).toHaveLength(5);

    const sample =
      "Weight va Bias ReLU hamda Loss Function orqali Backpropagation Gradient Descent bilan GPU Matrix Multiplication da yangilanadi.";
    const chunks = splitTextWithColoredTerms(sample);
    const matchedTerms = chunks
      .filter((c) => c.meta !== null)
      .map((c) => c.meta!.term.toLowerCase());

    expect(matchedTerms).toContain("weight");
    expect(matchedTerms).toContain("bias");
    expect(matchedTerms).toContain("relu");
    expect(matchedTerms).toContain("loss function");
    expect(matchedTerms).toContain("backpropagation");
    expect(matchedTerms).toContain("gradient descent");
    expect(matchedTerms).toContain("gpu");
    expect(matchedTerms).toContain("matrix multiplication");
  });

  it(
    "integrates with Learning OS catalog, relationships, global roadmap, and unified search",
    () => {
      const catalog = buildLearningLibraryCatalog();
      const mod = catalog.find((c) => c.id === "how-neural-learn");
      expect(mod).toBeDefined();
      expect(mod?.publishedItems).toBe(12);
      expect(mod?.plannedOrDraftItems).toBe(0);
      expect(mod?.href).toBe("/learn/how-neural-networks-learn");

      for (const lesson of HOW_NEURAL_LEARN_LESSONS) {
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
          .filter((a) => a.source === "nn-learn")
          .map((a) => a.id),
      );
      for (const lesson of HOW_NEURAL_LEARN_LESSONS) {
        expect(
          roadmapLinkedIds.has(lesson.id),
          `Missing roadmap link for ${lesson.id}`,
        ).toBe(true);
      }

      const repo = getContentRepository();
      const searchIndex = buildSearchIndex(repo);
      const indexedNnIds = new Set(
        searchIndex.documents
          .filter((d) => d.id.startsWith("lesson:nn-"))
          .map((d) => d.id.replace("lesson:", "")),
      );
      expect(indexedNnIds.size).toBe(12);
    },
    15000,
  );

  it(
    "passes automated Python testCases for all 12 micro-lesson modelSolution implementations",
    async () => {
      for (const lesson of HOW_NEURAL_LEARN_LESSONS) {
        const solution = lesson.exercise.modelSolution;
        expect(
          solution,
          `Missing modelSolution for ${lesson.id}`,
        ).toBeDefined();
        const result = await executeExerciseCode(lesson.exercise, solution!);
        expect(
          result.allTestsPassed,
          `Exercise ${lesson.id} failed: ${result.stderr || JSON.stringify(result.testResults)}`,
        ).toBe(true);
      }
    },
    30000,
  );
});
