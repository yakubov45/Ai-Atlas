import { describe, it, expect } from "vitest";
import {
  YOUTUBE_TOPICS,
  YOUTUBE_CATALOG_VIDEOS,
  getAllYouTubeVideos,
  getYouTubeVideosByTopic,
  getYouTubeVideosByTrack,
  getYouTubeVideosByLanguage,
} from "@/lib/media/youtube-videos-data";

describe("YouTube Educational Video Catalog Integrity", () => {
  it("contains all 36 canonical curriculum topics from A1 to F6", () => {
    expect(YOUTUBE_TOPICS.length).toBe(36);

    const topicIds = YOUTUBE_TOPICS.map((t) => t.id);
    for (const prefix of ["A", "B", "C", "D", "E", "F"]) {
      for (let num = 1; num <= 6; num++) {
        expect(topicIds).toContain(`${prefix}${num}`);
      }
    }
  });

  it("contains verified videos across all 3 languages (uz, ru, en)", () => {
    const videos = getAllYouTubeVideos();
    expect(videos.length).toBe(88);

    const uzVideos = getYouTubeVideosByLanguage("uz");
    const ruVideos = getYouTubeVideosByLanguage("ru");
    const enVideos = getYouTubeVideosByLanguage("en");

    expect(uzVideos.length).toBe(17);
    expect(ruVideos.length).toBe(35);
    expect(enVideos.length).toBe(36);
  });

  it("ensures each video has valid metadata, YouTube ID and URL", () => {
    for (const v of YOUTUBE_CATALOG_VIDEOS) {
      expect(v.id).toBeTruthy();
      expect(v.topicId).toMatch(/^[A-F][1-6]$/);
      expect(v.title).toBeTruthy();
      expect(v.channelTitle).toBeTruthy();
      expect(v.youtubeUrl).toMatch(/^https?:\/\//);
      expect(v.youtubeId).toHaveLength(11);
      expect(v.thumbnailUrl).toContain(v.youtubeId);
      expect(["uz", "ru", "en"]).toContain(v.language);
      expect([
        "python-dev",
        "ml-engineer",
        "data-scientist",
        "ai-engineer",
        "data-engineer",
        "prompt-engineer",
      ]).toContain(v.trackId);
    }
  });

  it("correctly filters videos by topic and track", () => {
    const a1Videos = getYouTubeVideosByTopic("A1");
    expect(a1Videos.length).toBe(3); // uz, ru, en
    expect(a1Videos.map((v) => v.language).sort()).toEqual(["en", "ru", "uz"]);

    const pythonVideos = getYouTubeVideosByTrack("python-dev");
    expect(pythonVideos.length).toBe(18); // 6 topics * 3 languages

    const promptVideos = getYouTubeVideosByTrack("prompt-engineer");
    expect(promptVideos.length).toBeGreaterThanOrEqual(14);
  });
});
