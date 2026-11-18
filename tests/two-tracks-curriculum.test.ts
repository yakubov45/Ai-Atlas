import { describe, it, expect } from "vitest";
import {
  MACHINE_LEARNING_PHASES,
  TOTAL_ML_MICRO_LESSONS,
  getMlPhaseById,
  getMlLessonById,
  validateMlTrackGraph,
} from "@/lib/curriculum/machine-learning";
import {
  DATA_SCIENCE_PHASES,
  TOTAL_DS_MICRO_LESSONS,
  CANONICAL_DS_LESSONS,
  OPTIONAL_DS_EXTENSIONS_COUNT,
  getDsPhaseById,
  getDsLessonById,
  validateDsTrackGraph,
} from "@/lib/curriculum/data-science";
import { ML_DS_520_DATASET } from "@/lib/curriculum/ml-ds-520-dataset";
import {
  computeOls,
  computeRegressionMetrics,
} from "@/components/visualizations/RegressionExplorerLab";
import {
  computeGroupedData,
  INITIAL_SALES_DATASET,
} from "@/components/visualizations/PandasAggregationLab";
import { MemoryStorage } from "@/lib/storage/storage";
import { StorageLearningRepository } from "@/lib/progress/repository";
import { createLearningStore } from "@/lib/progress/store";

describe("Independent Learning Tracks Split (ML Engineer & Data Science)", () => {
  it("defines Machine Learning track with 22 phases (mle-01..mle-22) and 466 canonical lessons", () => {
    expect(MACHINE_LEARNING_PHASES.length).toBe(22);
    expect(TOTAL_ML_MICRO_LESSONS).toBe(466);

    // Verify all phases have IDs mle-01..mle-22
    for (let i = 1; i <= 22; i++) {
      const id = `mle-${String(i).padStart(2, "0")}`;
      const phase = getMlPhaseById(id);
      expect(phase).toBeDefined();
      expect(phase?.order).toBe(i);
      expect(phase?.lessons.length).toBeGreaterThan(0);
      expect(phase?.miniProject.titleUz).toBeTruthy();
      expect(phase?.visualLab.titleUz).toBeTruthy();
    }

    // Validate graph integrity
    const validation = validateMlTrackGraph();
    expect(validation.valid).toBe(true);
    expect(validation.missingLessonIds).toEqual([]);
    expect(validation.orphanPhases).toEqual([]);
  });

  it("defines Data Science track with 23 phases (ds-01..ds-23), 376 canonical lessons and 50 optional proposals", () => {
    expect(DATA_SCIENCE_PHASES.length).toBe(23);
    expect(TOTAL_DS_MICRO_LESSONS).toBe(426);
    expect(CANONICAL_DS_LESSONS).toBe(376);
    expect(OPTIONAL_DS_EXTENSIONS_COUNT).toBe(50);

    for (let i = 1; i <= 23; i++) {
      const id = `ds-${String(i).padStart(2, "0")}`;
      const phase = getDsPhaseById(id);
      expect(phase).toBeDefined();
      expect(phase?.order).toBe(i);
      expect(phase?.lessons.length).toBeGreaterThan(0);
      expect(phase?.miniProject.titleUz).toBeTruthy();
      expect(phase?.visualLab.titleUz).toBeTruthy();
    }

    // Validate graph integrity
    const validation = validateDsTrackGraph();
    expect(validation.valid).toBe(true);
    expect(validation.missingLessonIds).toEqual([]);
    expect(validation.orphanPhases).toEqual([]);
  });

  it("preserves all 520 canonical lessons with >=1 course reference and zero missing items", () => {
    expect(ML_DS_520_DATASET.length).toBe(520);

    const referencedCanonicalIds = new Set<string>();

    for (const phase of MACHINE_LEARNING_PHASES) {
      for (const l of phase.lessons) {
        referencedCanonicalIds.add(l.id);
      }
    }

    for (const phase of DATA_SCIENCE_PHASES) {
      for (const l of phase.lessons) {
        if (!l.isOptionalProposal) {
          referencedCanonicalIds.add(l.id);
        }
      }
    }

    // Every single one of the 520 original canonical lessons must be covered!
    expect(referencedCanonicalIds.size).toBe(520);
    for (const item of ML_DS_520_DATASET) {
      expect(referencedCanonicalIds.has(item.id)).toBe(true);
    }
  });

  it("preserves exact 9 published lessons without mutation or data loss", () => {
    const publishedInDataset = ML_DS_520_DATASET.filter((l) => l.status === "published");
    expect(publishedInDataset.length).toBe(9);

    const expectedPublishedIds = [
      "mlds-01-01",
      "mlds-02-01",
      "mlds-04-09",
      "mlds-11-04",
      "mlds-11-09",
      "mlds-11-13",
      "mlds-14-01",
      "mlds-19-03",
      "mlds-22-04",
    ];

    const actualPublishedIds = publishedInDataset.map((l) => l.id).sort();
    expect(actualPublishedIds).toEqual(expectedPublishedIds.sort());

    // Check each published lesson in ML and DS tracks
    for (const id of expectedPublishedIds) {
      const mlLookup = getMlLessonById(id);
      const dsLookup = getDsLessonById(id);
      expect(mlLookup !== undefined || dsLookup !== undefined).toBe(true);
      if (mlLookup) expect(mlLookup.lesson.status).toBe("published");
      if (dsLookup) expect(dsLookup.lesson.status).toBe("published");
    }
  });

  it("strictly flags all 50 dsx-* lessons as optional proposals without auto-publishing", () => {
    const allProposals = DATA_SCIENCE_PHASES.flatMap((p) => p.lessons).filter(
      (l) => l.isOptionalProposal
    );
    expect(allProposals.length).toBe(50);

    for (const p of allProposals) {
      expect(p.id.startsWith("dsx-")).toBe(true);
      expect(p.status).toBe("planned");
      expect(p.proposalNote).toBeDefined();
    }

    // Verified across the 5 specific extension phases: ds-04, ds-05, ds-10, ds-14, ds-23
    const phase04 = getDsPhaseById("ds-04")!;
    const phase05 = getDsPhaseById("ds-05")!;
    const phase10 = getDsPhaseById("ds-10")!;
    const phase14 = getDsPhaseById("ds-14")!;
    const phase23 = getDsPhaseById("ds-23")!;

    expect(phase04.optionalExtensionCount).toBe(10);
    expect(phase05.optionalExtensionCount).toBe(10);
    expect(phase10.optionalExtensionCount).toBe(10);
    expect(phase14.optionalExtensionCount).toBe(10);
    expect(phase23.optionalExtensionCount).toBe(10);
  });

  it("evaluates Pilot Phase 1 (mle-08: Regression) mathematical calculations and OLS optimality", () => {
    const knownPoints = [
      { id: 1, x: 1, y: 3 },
      { id: 2, x: 2, y: 5 },
      { id: 3, x: 3, y: 7 },
    ];

    // Perfect line y = 2x + 1
    const ols = computeOls(knownPoints);
    expect(ols.slope).toBeCloseTo(2.0, 3);
    expect(ols.intercept).toBeCloseTo(1.0, 3);

    const metrics = computeRegressionMetrics(knownPoints, 2.0, 1.0);
    expect(metrics.mse).toBeCloseTo(0.0, 4);
    expect(metrics.rmse).toBeCloseTo(0.0, 4);
    expect(metrics.mae).toBeCloseTo(0.0, 4);
    expect(metrics.r2).toBeCloseTo(1.0, 4);

    // If slope changes to 1.0 (sub-optimal line y = 1x + 1: yHat = 2, 3, 4; err = 1, 2, 3)
    const subMetrics = computeRegressionMetrics(knownPoints, 1.0, 1.0);
    // sqErrors: 1, 4, 9 => sum = 14 => mse = 14 / 3 = 4.6667
    expect(subMetrics.mse).toBeCloseTo(14 / 3, 3);
    expect(subMetrics.mae).toBeCloseTo(2.0, 3);
  });

  it("evaluates Pilot Phase 2 (ds-07: NumPy & Pandas) aggregation and grouping accuracy", () => {
    // Test dataset groupby 'region', sum of sales with 0 filter
    const resRegionSum = computeGroupedData(
      INITIAL_SALES_DATASET,
      "region",
      "sales",
      "sum",
      0
    );

    expect(resRegionSum.filteredRows.length).toBe(INITIAL_SALES_DATASET.length);
    const toshkent = resRegionSum.groupedResults.find((r) => r.group === "Toshkent");
    expect(toshkent).toBeDefined();
    // Toshkent rows: 1200 + 450 + 640 + 310 = 2600
    expect(toshkent?.value).toBe(2600);
    expect(toshkent?.count).toBe(4);

    // Test filter threshold (sales >= 500$)
    const resFilter = computeGroupedData(
      INITIAL_SALES_DATASET,
      "region",
      "sales",
      "count",
      500
    );
    // Rows with sales >= 500:
    // id 1 (1200), id 3 (850), id 5 (640), id 6 (990), id 7 (510), id 8 (780) => 6 rows
    expect(resFilter.filteredRows.length).toBe(6);
    expect(resFilter.totalValue).toBe(6);
  });

  it("preserves shared canonical lesson progress across both tracks without cross-polluting rubrics", () => {
    const storage = new MemoryStorage();
    const repo = new StorageLearningRepository(storage);
    const store = createLearningStore(repo);

    // Lesson mlds-04-09 (Broadcasting) is shared between ML (mle-03) and DS (ds-07)
    expect(store.isMicroLessonCompleted("mlds-04-09")).toBe(false);

    // Complete in one track
    store.setMicroLessonCompleted("mlds-04-09", true);
    expect(store.isMicroLessonCompleted("mlds-04-09")).toBe(true);

    // Verify snapshot reflects it under canonical key
    const snap = store.getSnapshot();
    expect(snap.completedMicroLessons["mlds-04-09"]).toBeDefined();

    // Verify state reload from storage retains it
    const reloadedRepo = new StorageLearningRepository(storage);
    const reloadedStore = createLearningStore(reloadedRepo);
    expect(reloadedStore.isMicroLessonCompleted("mlds-04-09")).toBe(true);
  });
});
