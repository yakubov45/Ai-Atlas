import { describe, it, expect } from "vitest";
import {
  lessonFrontmatterSchema,
} from "@/lib/content/schema";
import { validateCollection } from "@/lib/content/validate";
import type { ContentCollection } from "@/lib/content/types";

describe("Content Schemas", () => {
  it("validates a correct lesson frontmatter", () => {
    const raw = {
      id: "intro-neural-networks",
      title: "Neyron tarmoqlar kirish",
      slug: "intro-neural-networks",
      description: "Sun'iy neyron tarmoqlar tuzilishi va ishlash prinsipi.",
      category: "neural-networks",
      difficulty: "beginner",
      order: 1,
      tags: ["neural-network", "perceptron"],
      prerequisites: [],
      related: [],
      visualizations: [],
      sources: ["vaswani-2017"],
      origin: [
        {
          document: "deep-research-part1.docx",
          section: "1.2",
          pages: "12-15",
        },
      ],
      status: "draft",
    };

    const res = lessonFrontmatterSchema.safeParse(raw);
    expect(res.success).toBe(true);
  });

  it("rejects invalid lesson slugs with uppercase or special chars", () => {
    const invalid = {
      id: "Invalid Slug!",
      title: "Test",
      slug: "invalid_slug",
      description: "Test",
      category: "test",
      difficulty: "beginner",
      order: 1,
    };
    const res = lessonFrontmatterSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it("detects prerequisite cycles across lessons", () => {
    const fakeLessons = [
      {
        id: "lesson-a",
        slug: "lesson-a",
        title: "A",
        description: "A",
        category: "foundations",
        difficulty: "beginner" as const,
        order: 1,
        tags: [],
        prerequisites: ["lesson-b"],
        related: [],
        visualizations: [],
        sources: [],
        origin: [],
        status: "published" as const,
        locale: "uz",
        filePath: "lessons/a.md",
        format: "md" as const,
        body: "",
        headings: [],
        sections: [],
        plainText: "",
        wordCount: 100,
        readingMinutes: 1,
        refs: [],
        hasEsm: false,
      },
      {
        id: "lesson-b",
        slug: "lesson-b",
        title: "B",
        description: "B",
        category: "foundations",
        difficulty: "beginner" as const,
        order: 2,
        tags: [],
        prerequisites: ["lesson-a"],
        related: [],
        visualizations: [],
        sources: [],
        origin: [],
        status: "published" as const,
        locale: "uz",
        filePath: "lessons/b.md",
        format: "md" as const,
        body: "",
        headings: [],
        sections: [],
        plainText: "",
        wordCount: 100,
        readingMinutes: 1,
        refs: [],
        hasEsm: false,
      },
    ];

    const fakeCollection: ContentCollection = {
      rootDir: "",
      lessons: fakeLessons,
      categories: [{ id: "foundations", title: "Asoslar", order: 1, example: false }],
      glossary: [],
      references: [],
      visualizations: [],
      issues: [],
    };

    const issues = validateCollection(fakeCollection);
    const cycleIssue = issues.find((i) => i.code === "prerequisite-cycle");
    expect(cycleIssue).toBeDefined();
    expect(cycleIssue?.message).toContain("lesson-b → lesson-a");
  });
});
