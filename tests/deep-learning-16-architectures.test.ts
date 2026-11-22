import { describe, it, expect } from "vitest";
import {
  DL_QUESTION_GROUPS,
  SIXTEEN_ARCHITECTURES,
  getDlArchitectureById,
  getDlArchitecturesByQuestion,
} from "@/lib/curriculum/deep-learning-16-architectures";

describe("Deep Learning 16 Architectures Curriculum & Roadmap", () => {
  it("should define exactly 16 architectures numbered 1 to 16", () => {
    expect(SIXTEEN_ARCHITECTURES).toHaveLength(16);

    const numbers = SIXTEEN_ARCHITECTURES.map((a) => a.number);
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });

  it("should define exactly 6 question groups matching the evolutionary map", () => {
    expect(DL_QUESTION_GROUPS).toHaveLength(6);

    const questionIds = DL_QUESTION_GROUPS.map((q) => q.id);
    expect(questionIds).toEqual([
      "one_neuron",
      "picture_vision",
      "read_sentence",
      "sentence_translation",
      "all_to_all_attention",
      "scaling_and_ssm",
    ]);

    expect(DL_QUESTION_GROUPS[0]?.questionEn).toBe("What can one neuron learn?");
    expect(DL_QUESTION_GROUPS[1]?.questionEn).toBe("How do we look at a picture?");
    expect(DL_QUESTION_GROUPS[2]?.questionEn).toBe("How do we read a sentence?");
    expect(DL_QUESTION_GROUPS[3]?.questionEn).toBe("How do we turn one sentence into another?");
    expect(DL_QUESTION_GROUPS[4]?.questionEn).toBe("What if every word looks at every word?");
    expect(DL_QUESTION_GROUPS[5]?.questionEn).toBe("How do we make it bigger, and read longer?");
  });

  it("should verify correct architecture assignments to question groups", () => {
    // 1. What can one neuron learn? -> Perceptron, MLP
    const q1 = getDlArchitecturesByQuestion("one_neuron");
    expect(q1.map((a) => a.name)).toEqual(["Perceptron", "MLP (Multi-Layer Perceptron)"]);

    // 2. How do we look at a picture? -> CNN, ResNet
    const q2 = getDlArchitecturesByQuestion("picture_vision");
    expect(q2.map((a) => a.name)).toEqual([
      "CNN (Convolutional Neural Network)",
      "ResNet (Residual Networks)",
    ]);

    // 3. How do we read a sentence? -> Word Embeddings, RNN, LSTM, GRU
    const q3 = getDlArchitecturesByQuestion("read_sentence");
    expect(q3.map((a) => a.name)).toEqual([
      "Word Embeddings (Word2Vec)",
      "RNN (Recurrent Neural Network)",
      "LSTM (Long Short-Term Memory)",
      "GRU (Gated Recurrent Unit)",
    ]);

    // 4. How do we turn one sentence into another? -> Seq2Seq, Attention
    const q4 = getDlArchitecturesByQuestion("sentence_translation");
    expect(q4.map((a) => a.name)).toEqual([
      "Seq2Seq (Sequence to Sequence)",
      "Attention (Bahdanau Attention)",
    ]);

    // 5. What if every word looks at every word? -> Self-Attention, Transformer, BERT, GPT
    const q5 = getDlArchitecturesByQuestion("all_to_all_attention");
    expect(q5.map((a) => a.name)).toEqual([
      "Self-Attention",
      "Transformer",
      "BERT",
      "GPT (Generative Pre-trained Transformer)",
    ]);

    // 6. How do we make it bigger, and read longer? -> MoE, Mamba
    const q6 = getDlArchitecturesByQuestion("scaling_and_ssm");
    expect(q6.map((a) => a.name)).toEqual([
      "Mixture of Experts (MoE)",
      "Mamba (State Space Model)",
    ]);
  });

  it("should verify research paper metadata for iconic architectures", () => {
    // 1. Perceptron (1958)
    const perceptron = getDlArchitectureById("perceptron");
    expect(perceptron).toBeDefined();
    expect(perceptron?.year).toBe(1958);
    expect(perceptron?.paper.authors).toContain("Frank Rosenblatt");

    // 2. MLP (1986)
    const mlp = getDlArchitectureById("mlp");
    expect(mlp?.year).toBe(1986);
    expect(mlp?.paper.authors).toContain("Geoffrey E. Hinton");

    // 3. CNN (1998)
    const cnn = getDlArchitectureById("cnn");
    expect(cnn?.year).toBe(1998);
    expect(cnn?.paper.authors).toContain("Yann LeCun");

    // 4. ResNet (2015)
    const resnet = getDlArchitectureById("resnet");
    expect(resnet?.year).toBe(2015);
    expect(resnet?.paper.authors).toContain("Kaiming He");

    // 12. Transformer (2017)
    const transformer = getDlArchitectureById("transformer");
    expect(transformer?.year).toBe(2017);
    expect(transformer?.paper.title).toBe("Attention Is All You Need");

    // 13. BERT (2018)
    const bert = getDlArchitectureById("bert");
    expect(bert?.year).toBe(2018);
    expect(bert?.paper.title).toContain("Pre-training of Deep Bidirectional Transformers");

    // 14. GPT (2018)
    const gpt = getDlArchitectureById("gpt");
    expect(gpt?.year).toBe(2018);
    expect(gpt?.paper.authors).toContain("Alec Radford");

    // 15. MoE (2017)
    const moe = getDlArchitectureById("moe");
    expect(moe?.year).toBe(2017);
    expect(moe?.paper.title).toContain("Outrageously Large Neural Networks");

    // 16. Mamba (2023)
    const mamba = getDlArchitectureById("mamba");
    expect(mamba?.year).toBe(2023);
    expect(mamba?.paper.authors).toContain("Albert Gu");
    expect(mamba?.paper.authors).toContain("Tri Dao");
  });

  it("should have non-empty formulas, explanations, and executable python code for every architecture", () => {
    for (const arch of SIXTEEN_ARCHITECTURES) {
      expect(arch.fullNameUz.length).toBeGreaterThan(5);
      expect(arch.summaryUz.length).toBeGreaterThan(15);
      expect(arch.whyInventedUz.length).toBeGreaterThan(15);
      expect(arch.keyInnovationUz.length).toBeGreaterThan(15);
      expect(arch.formula.length).toBeGreaterThan(3);
      expect(arch.formulaExplanationUz.length).toBeGreaterThan(10);
      expect(arch.codeSnippet.length).toBeGreaterThan(30);
      expect(arch.diagramType).toBeDefined();
    }
  });
});
