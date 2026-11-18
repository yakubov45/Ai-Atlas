import { describe, expect, it } from "vitest";
import {
  DS_DEEP_PHASES,
  DS_RESOURCE_INDEX,
  DS_WORKFLOW_STAGES,
  TOTAL_DS_DEEP_NODES,
  TOTAL_DS_DEEP_PHASES,
  getDsNodeByIdOrContentRef,
  resolveCanonicalProgressKey,
  validateDsDeepCurriculum,
} from "@/lib/curriculum/ds-deep";
import {
  computeCupedSampleAdjustment,
  computeDeltaMethodRatio,
  simulateCltSampling,
} from "@/lib/math/ml-ds-labs";

describe("Data Scientist 20-Phase Deep-Dive Curriculum & CUPED / CLT / Delta Method Engines", () => {
  it("loads all 20 phases (dsx-01..dsx-20), 309 nodes (152 reuse-existing + 157 proposed-extension), and 5 workflow stages", () => {
    expect(TOTAL_DS_DEEP_PHASES).toBe(20);
    expect(DS_DEEP_PHASES).toHaveLength(20);
    expect(TOTAL_DS_DEEP_NODES).toBe(309);
    expect(DS_WORKFLOW_STAGES).toHaveLength(5);

    const report = validateDsDeepCurriculum();
    expect(report.valid).toBe(true);
    expect(report.reuseExistingCount).toBe(152);
    expect(report.proposedExtensionCount).toBe(157);
    expect(report.unresolvedReuseRefs).toEqual([]);
    expect(report.duplicateNodeIds).toEqual([]);
    expect(report.missingResourceIds).toEqual([]);
    expect(Object.keys(DS_RESOURCE_INDEX).length).toBeGreaterThanOrEqual(45);
  });

  it("synchronizes shared progress keys via contentRef without duplicating existing mlds-* lessons", () => {
    const reusedNode = getDsNodeByIdOrContentRef("dsx-01-n001");
    expect(reusedNode).toBeDefined();
    expect(reusedNode?.contentPolicy).toBe("reuse-existing");
    expect(resolveCanonicalProgressKey(reusedNode!)).toBe("mlds-01-01");

    const cupedNode = getDsNodeByIdOrContentRef("dsx-12-c011");
    expect(cupedNode).toBeDefined();
    expect(cupedNode?.status).toBe("sample-authored");
    expect(cupedNode?.steps).toHaveLength(9);
    expect(cupedNode?.manimAssetPath).toBe("/animations/ab_experiment.mp4");
    expect(cupedNode?.pythonRunnablePath).toBe("examples/python/cuped_demo.py");
    expect(resolveCanonicalProgressKey(cupedNode!)).toBe("dsx-12-c011");
  });

  it("computes the exact 8-observation CUPED numbers from Data_Scientist_Micro_Lesson_AB_CUPED.md", () => {
    const res = computeCupedSampleAdjustment();

    expect(res.pooledMeanX).toBeCloseTo(3.5, 6);
    expect(res.theta).toBeCloseTo(38 / 18, 6); // 2.111111...
    expect(res.controlRawMean).toBeCloseTo(5.5, 6);
    expect(res.treatmentRawMean).toBeCloseTo(10.5, 6);
    expect(res.rawDifference).toBeCloseTo(5.0, 6);
    expect(res.controlAdjustedMean).toBeCloseTo(7.611111, 3);
    expect(res.treatmentAdjustedMean).toBeCloseTo(8.388889, 3);
    expect(res.adjustedDifference).toBeCloseTo(0.777778, 3);
    expect(res.zeroVarianceWarning).toBe(false);
  });

  it("handles balanced covariates (X_bar_T == X_bar_C) and Var(X) = 0 zero-denominator safety in CUPED", () => {
    // 1. Balanced pre-period covariate (shift Treatment X by -2 so both groups have X = [1, 2, 3, 4])
    const balanced = computeCupedSampleAdjustment(undefined, {
      treatmentCovariateShift: -2,
    });
    expect(balanced.controlMeanX).toBeCloseTo(2.5, 6);
    expect(balanced.treatmentMeanX).toBeCloseTo(2.5, 6);
    expect(balanced.rawDifference).toBeCloseTo(5.0, 6);
    expect(balanced.adjustedDifference).toBeCloseTo(5.0, 6);
    expect(balanced.controlAdjustedVariance).toBeLessThan(
      balanced.controlRawVariance,
    );

    // 2. Zero variance Var(X) = 0 edge case
    const zeroVar = computeCupedSampleAdjustment(undefined, {
      forceZeroVarianceX: true,
    });
    expect(zeroVar.zeroVarianceWarning).toBe(true);
    expect(zeroVar.theta).toBe(0);
    expect(Number.isNaN(zeroVar.adjustedDifference)).toBe(false);
    expect(zeroVar.adjustedDifference).toBeCloseTo(zeroVar.rawDifference, 6);
  });

  it("verifies Central Limit Theorem (CLT) Standard Error scaling SE = sigma / sqrt(n)", () => {
    const smallN = simulateCltSampling({
      shape: "skewed-right",
      sampleSize: 4,
      numDraws: 100,
    });
    const largeN = simulateCltSampling({
      shape: "skewed-right",
      sampleSize: 64,
      numDraws: 100,
    });

    // When n increases 16x (from 4 to 64), theoretical SE shrinks 4x
    expect(smallN.theoreticalStandardError / largeN.theoreticalStandardError).toBeCloseTo(
      4.0,
      6,
    );
    expect(largeN.ci95CoverageRate).toBeGreaterThan(0.8);
  });

  it("computes Ratio of Sums vs Mean of User Ratios and Delta Method variance with zero-denominator protection", () => {
    const res = computeDeltaMethodRatio();
    // Total clicks = 1+2+1+3+0+5 = 12, Total impressions = 2+4+10+20+14+30 = 80 -> Ratio of sums = 12/80 = 0.15
    expect(res.ratioOfSums).toBeCloseTo(0.15, 6);
    expect(res.meanOfUserRatios).not.toBeCloseTo(0.15, 3);
    expect(res.deltaMethodStandardError).not.toBeNull();
    expect(res.deltaMethodStandardError!).toBeGreaterThan(0);

    // Zero denominator total safety
    const allZeroDenom = computeDeltaMethodRatio([
      { unitId: "u1", numerator: 0, denominator: 0 },
      { unitId: "u2", numerator: 0, denominator: 0 },
    ]);
    expect(allZeroDenom.ratioOfSums).toBeNull();
    expect(allZeroDenom.deltaMethodStandardError).toBeNull();
    expect(allZeroDenom.warnings.length).toBeGreaterThan(0);
  });
});
