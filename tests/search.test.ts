import { describe, it, expect } from "vitest";
import { normalizeText, tokenize, createSearchEngine, type SearchDocument } from "@/lib/search/core";

describe("Search Engine", () => {
  it("normalizes Uzbek apostrophes and diacritics", () => {
    expect(normalizeText("Oʻquvchi")).toBe("o'quvchi");
    expect(normalizeText("O’qish")).toBe("o'qish");
    expect(normalizeText("KOGNITIV")).toBe("kognitiv");
  });

  it("tokenizes sentences properly into words", () => {
    const tokens = tokenize("Sun'iy intellekt va neyron tarmoqlar");
    expect(tokens).toEqual(["sun'iy", "intellekt", "va", "neyron", "tarmoqlar"]);
  });

  it("indexes documents and scores matches across title, tags and body", () => {
    const docs: SearchDocument[] = [
      {
        id: "doc-1",
        kind: "lesson",
        title: "Transformer Arxitekturasi",
        description: "Self-attention mexanizmi haqida batafsil dars.",
        tags: ["llm", "attention"],
        body: "Query, Key va Value vektorlari orqali hisoblanadi.",
        url: "/learn/transformer",
      },
      {
        id: "doc-2",
        kind: "lesson",
        title: "Gradient Tushish",
        description: "Optimizatsiya algoritmi.",
        tags: ["optimization"],
        body: "Hosilalar va o'rganish tezligi.",
        url: "/learn/gradient-descent",
      },
    ];

    const engine = createSearchEngine(docs);

    // Search for "transformer"
    const res1 = engine.search("transformer");
    expect(res1.length).toBe(1);
    expect(res1[0]!.document.id).toBe("doc-1");

    // Search for "attention"
    const res2 = engine.search("attention");
    expect(res2.length).toBe(1);
    expect(res2[0]!.document.id).toBe("doc-1");

    // Search for "optimizatsiya"
    const res3 = engine.search("optimizatsiya");
    expect(res3.length).toBe(1);
    expect(res3[0]!.document.id).toBe("doc-2");
  });
});
