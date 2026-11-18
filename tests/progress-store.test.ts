import { describe, it, expect } from "vitest";
import { MemoryStorage } from "@/lib/storage/storage";
import { StorageLearningRepository } from "@/lib/progress/repository";
import { createLearningStore, computeProgress } from "@/lib/progress/store";

describe("Learning Progress & Bookmarks Store", () => {
  it("tracks completed lessons and persists in storage", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    expect(store.isCompleted("lesson-1")).toBe(false);

    store.setCompleted("lesson-1", true);
    expect(store.isCompleted("lesson-1")).toBe(true);

    // Verify persistence in raw storage
    const raw = storage.getItem(repo["key"]);
    expect(raw).toContain("lesson-1");

    // Toggle off
    store.toggleCompleted("lesson-1");
    expect(store.isCompleted("lesson-1")).toBe(false);
  });

  it("calculates progress percentage only against available lessons", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    store.setCompleted("l1", true);
    store.setCompleted("l2", true);

    const available = ["l1", "l2", "l3", "l4"];
    const progress = computeProgress(store.getSnapshot(), available);

    expect(progress.total).toBe(4);
    expect(progress.completed).toBe(2);
    expect(progress.percent).toBe(50);

    // When no available lessons, percent must be null (never fake 0%)
    const emptyProgress = computeProgress(store.getSnapshot(), []);
    expect(emptyProgress.percent).toBeNull();
  });

  it("manages bookmarks and exports/imports JSON", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    store.toggleBookmark("lesson", "slug-a");
    store.toggleBookmark("visualization", "viz-1");

    expect(store.isBookmarked("lesson", "slug-a")).toBe(true);
    expect(store.isBookmarked("visualization", "viz-1")).toBe(true);

    const exported = store.exportJson();
    expect(exported).toContain("slug-a");

    // Reset store
    store.reset();
    expect(store.isBookmarked("lesson", "slug-a")).toBe(false);

    // Import back
    const success = store.importJson(exported);
    expect(success).toBe(true);
    expect(store.isBookmarked("lesson", "slug-a")).toBe(true);
  });

  it("avoids redundant emissions when recordVisit is called with identical lesson and progress", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    let emitCount = 0;
    const unsubscribe = store.subscribe(() => {
      emitCount += 1;
    });

    store.recordVisit({
      lessonId: "lesson-1",
      slug: "artificial-intelligence",
      title: "Sun'iy intellekt (AI)",
      progress: 0.2,
    });
    expect(emitCount).toBe(1);

    // Calling again with identical values must be a no-op (prevents useEffect loops)
    store.recordVisit({
      lessonId: "lesson-1",
      slug: "artificial-intelligence",
      title: "Sun'iy intellekt (AI)",
      progress: 0.2,
    });
    expect(emitCount).toBe(1);

    // Updating progress to 0.4 should emit once more
    store.recordVisit({
      lessonId: "lesson-1",
      slug: "artificial-intelligence",
      title: "Sun'iy intellekt (AI)",
      progress: 0.4,
    });
    expect(emitCount).toBe(2);

    unsubscribe();
  });
});
