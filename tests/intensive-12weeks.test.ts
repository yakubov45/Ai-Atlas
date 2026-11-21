import { describe, it, expect } from "vitest";
import {
  INTENSIVE_12_WEEKS,
  ALL_INTENSIVE_LESSONS,
  getIntensiveLessonById,
  CURRICULUM_55_SOURCES,
  ORIGINAL_9_GAP_MATERIALS,
  PORTFOLIO_PROJECTS,
} from "@/lib/curriculum/ds-ml-ai-12weeks";

describe("12-Week Intensive Curriculum Dataset", () => {
  it("contains exactly 12 weeks", () => {
    expect(INTENSIVE_12_WEEKS).toHaveLength(12);
  });

  it("contains exactly 42 lessons spanning D01.1 to D12.3", () => {
    expect(ALL_INTENSIVE_LESSONS).toHaveLength(42);
    expect(ALL_INTENSIVE_LESSONS[0]!.id).toBe("D01.1");
    expect(ALL_INTENSIVE_LESSONS[ALL_INTENSIVE_LESSONS.length - 1]!.id).toBe("D12.3");
  });

  it("finds lessons by id via getIntensiveLessonById", () => {
    const l1 = getIntensiveLessonById("D01.1");
    expect(l1).toBeDefined();
    expect(l1?.titleUz).toContain("Zamonaviy Python Muhiti");
    expect(l1?.codeSnippet).toContain("argparse");

    const lRAG = getIntensiveLessonById("D08.2");
    expect(lRAG).toBeDefined();
    expect(lRAG?.titleUz).toContain("Gibrid Qidiruv");
  });

  it("catalogues all 55 sources from M01 to M55", () => {
    expect(CURRICULUM_55_SOURCES).toHaveLength(55);
    expect(CURRICULUM_55_SOURCES[0]!.id).toBe("M01");
    expect(CURRICULUM_55_SOURCES[54]!.id).toBe("M55");
    expect(CURRICULUM_55_SOURCES.every((s) => s.url && s.name && s.author && s.license)).toBe(true);
  });

  it("includes all 9 original gap materials", () => {
    expect(ORIGINAL_9_GAP_MATERIALS).toHaveLength(9);
    expect(ORIGINAL_9_GAP_MATERIALS.every((g) => g.id.startsWith("ORIGINAL_GAP_"))).toBe(true);
  });

  it("defines 3 comprehensive portfolio projects", () => {
    expect(PORTFOLIO_PROJECTS).toHaveLength(3);
    const [p1, p2, p3] = PORTFOLIO_PROJECTS;
    expect(p1?.id).toBe("portfolio-1");
    expect(p1?.techStack).toContain("FastAPI");
    expect(p2?.id).toBe("portfolio-2");
    expect(p2?.techStack).toContain("Ollama / llama.cpp");
    expect(p3?.id).toBe("portfolio-3");
    expect(p3?.techStack).toContain("Docker Compose");
  });
});
