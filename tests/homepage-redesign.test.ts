import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  EDUCATIONAL_VIDEOS,
  getFeaturedVideo,
  getVideosByTrack,
} from "@/lib/media/educational-videos";
import { FOUR_LEARNING_TRACKS } from "@/components/home/LearningTracksGrid";
import { PRACTICAL_PROJECTS } from "@/components/home/PracticalProjectsSection";
import { WORKFLOW_STEPS } from "@/components/home/HowLearningWorksSection";
import {
  PYTHON_DEV_PHASES,
  TOTAL_PYTHON_DEV_LESSONS,
} from "@/lib/curriculum/python-developer";
import {
  AI_ENGINEER_PHASES,
  TOTAL_AI_ENGINEER_MICRO_LESSONS,
} from "@/lib/curriculum/ai-engineer";
import {
  MACHINE_LEARNING_PHASES,
  TOTAL_ML_MICRO_LESSONS,
} from "@/lib/curriculum/machine-learning";
import {
  DATA_SCIENCE_PHASES,
  TOTAL_DS_MICRO_LESSONS,
  CANONICAL_DS_LESSONS,
} from "@/lib/curriculum/data-science";

describe("Homepage Premium Redesign (homepage.md verification)", () => {
  describe("1. Video CMS Architecture & Media Registry", () => {
    it("registers 9 verified educational videos", () => {
      expect(EDUCATIONAL_VIDEOS.length).toBe(9);
    });

    it("verifies that each self-hosted video source file physically exists in public directory", () => {
      const publicDir = path.resolve(process.cwd(), "public");

      for (const video of EDUCATIONAL_VIDEOS) {
        if (video.sourceType === "self-hosted") {
          // Remove leading slash to resolve against publicDir
          const relPath = video.sourceUrl.replace(/^\//, "");
          const filePath = path.resolve(publicDir, relPath);
          expect(
            fs.existsSync(filePath),
            `Video file does not exist on disk: ${filePath}`
          ).toBe(true);
        }
      }
    });

    it("covers all 4 independent learning tracks in video registry", () => {
      const trackIds = new Set(EDUCATIONAL_VIDEOS.map((v) => v.trackId));
      expect(trackIds.has("python-dev")).toBe(true);
      expect(trackIds.has("ai-engineer")).toBe(true);
      expect(trackIds.has("ml-engineer")).toBe(true);
      expect(trackIds.has("data-scientist")).toBe(true);
    });

    it("provides a valid featured video", () => {
      const featured = getFeaturedVideo();
      expect(featured).toBeDefined();
      expect(featured.published).toBe(true);
      expect(featured.featured).toBe(true);
    });

    it("filters videos correctly by trackId", () => {
      const pythonVideos = getVideosByTrack("python-dev");
      const aiVideos = getVideosByTrack("ai-engineer");
      const mlVideos = getVideosByTrack("ml-engineer");
      const dsVideos = getVideosByTrack("data-scientist");
      const allVideos = getVideosByTrack("all");

      expect(pythonVideos.length).toBeGreaterThan(0);
      expect(aiVideos.length).toBeGreaterThan(0);
      expect(mlVideos.length).toBeGreaterThan(0);
      expect(dsVideos.length).toBeGreaterThan(0);
      expect(allVideos.length).toBe(9);
    });
  });

  describe("2. Four Learning Tracks Integrity", () => {
    it("defines exactly 4 core tracks matching homepage.md Section 4", () => {
      expect(FOUR_LEARNING_TRACKS.length).toBe(4);
      const keys = FOUR_LEARNING_TRACKS.map((t) => t.tabKey);
      expect(keys).toEqual([
        "python-dev",
        "ai-engineer",
        "ml-engineer",
        "data-scientist",
      ]);
    });

    it("syncs phase and micro-lesson metrics with canonical curriculum sources", () => {
      const pythonTrack = FOUR_LEARNING_TRACKS.find((t) => t.tabKey === "python-dev")!;
      const aiTrack = FOUR_LEARNING_TRACKS.find((t) => t.tabKey === "ai-engineer")!;
      const mlTrack = FOUR_LEARNING_TRACKS.find((t) => t.tabKey === "ml-engineer")!;
      const dsTrack = FOUR_LEARNING_TRACKS.find((t) => t.tabKey === "data-scientist")!;

      expect(pythonTrack.phasesCount).toBe(PYTHON_DEV_PHASES.length);
      expect(pythonTrack.microLessonsCount).toBe(TOTAL_PYTHON_DEV_LESSONS);

      expect(aiTrack.phasesCount).toBe(AI_ENGINEER_PHASES.length);
      expect(aiTrack.microLessonsCount).toBe(TOTAL_AI_ENGINEER_MICRO_LESSONS);

      expect(mlTrack.phasesCount).toBe(MACHINE_LEARNING_PHASES.length);
      expect(mlTrack.microLessonsCount).toBe(TOTAL_ML_MICRO_LESSONS);

      expect(dsTrack.phasesCount).toBe(DATA_SCIENCE_PHASES.length);
      expect(dsTrack.microLessonsCount).toBe(CANONICAL_DS_LESSONS);
    });

    it("keeps ML Engineering and Data Science strictly independent", () => {
      const mlTrack = FOUR_LEARNING_TRACKS.find((t) => t.tabKey === "ml-engineer")!;
      const dsTrack = FOUR_LEARNING_TRACKS.find((t) => t.tabKey === "data-scientist")!;

      expect(mlTrack.id).not.toBe(dsTrack.id);
      expect(mlTrack.tabKey).not.toBe(dsTrack.tabKey);
      expect(mlTrack.phasesCount).not.toBe(dsTrack.phasesCount);
      expect(mlTrack.microLessonsCount).not.toBe(dsTrack.microLessonsCount);
    });
  });

  describe("3. How Learning Works & Practical Projects", () => {
    it("defines exactly 6 pedagogical workflow steps", () => {
      expect(WORKFLOW_STEPS.length).toBe(6);
      expect(WORKFLOW_STEPS.map((s) => s.step)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("includes confirmed curriculum practical projects across all 4 tracks", () => {
      expect(PRACTICAL_PROJECTS.length).toBeGreaterThanOrEqual(6);
      const categories = new Set(PRACTICAL_PROJECTS.map((p) => p.category));
      expect(categories.has("Python")).toBe(true);
      expect(categories.has("AI Engineer")).toBe(true);
      expect(categories.has("ML Engineer")).toBe(true);
      expect(categories.has("Data Science")).toBe(true);
    });
  });
});
