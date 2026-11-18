import { describe, expect, it } from "vitest";
import {
  DATA_ENGINEERING_PHASES,
  DATA_ENGINEERING_LESSONS,
  DATA_ENGINEERING_RESOURCES,
  ETL_VS_ELT_VERTICAL_SLICE,
  getDataEngineeringPhaseRoleForTrack,
  getDataEngineeringSummaryStats,
} from "@/lib/curriculum/data-engineering";
import {
  parseAmountCents,
  formatAmountCents,
  runEtlVsEltPipeline,
  buildScdType2History,
  simulateKafkaPartitioning,
} from "@/lib/math/data-engineering-semantics";

describe("Data Engineering 20-Phase Curriculum Registry (de-01..de-20)", () => {
  it("loads all 20 phases and 358 micro-lessons with honest status flags", () => {
    const stats = getDataEngineeringSummaryStats();
    expect(stats.totalPhases).toBe(20);
    expect(stats.totalLessons).toBe(358);
    expect(stats.publishedLessons).toBe(1);
    expect(stats.plannedLessons).toBe(357);
    expect(stats.resourceCount).toBe(27);

    expect(DATA_ENGINEERING_PHASES[0]?.id).toBe("de-01");
    expect(DATA_ENGINEERING_PHASES[19]?.id).toBe("de-20");
    expect(DATA_ENGINEERING_LESSONS[0]?.id).toBe("de-01-01");
    expect(DATA_ENGINEERING_LESSONS[DATA_ENGINEERING_LESSONS.length - 1]?.id).toBe(
      "de-20-30"
    );

    const publishedNode = DATA_ENGINEERING_LESSONS.find((l) => l.id === "de-11-08");
    expect(publishedNode?.status).toBe("published");
    expect(publishedNode?.publishedDepths).toEqual([
      "overview",
      "understand",
      "master",
    ]);

    const plannedNode = DATA_ENGINEERING_LESSONS.find((l) => l.id === "de-01-01");
    expect(plannedNode?.status).toBe("planned");
    expect(plannedNode?.publishedDepths).toEqual([]);
  });

  it("preserves user-supplied external resources with unverified status", () => {
    expect(DATA_ENGINEERING_RESOURCES).toHaveLength(27);
    for (const res of DATA_ENGINEERING_RESOURCES) {
      expect(res.urlStatus).toBe("user_supplied_not_live_verified");
      expect(res.availabilityStatus).toBe("not_verified");
    }
  });

  it("classifies phase priorities across all 5 platform tracks", () => {
    expect(getDataEngineeringPhaseRoleForTrack("de-11", "data-engineer").role).toBe(
      "core"
    );
    expect(getDataEngineeringPhaseRoleForTrack("de-20", "ai-engineer").role).toBe(
      "advanced"
    );
    expect(getDataEngineeringPhaseRoleForTrack("de-11", "ai-engineer").role).toBe(
      "supporting"
    );
    expect(getDataEngineeringPhaseRoleForTrack("de-13", "ml-engineer").role).toBe(
      "supporting"
    );
    expect(getDataEngineeringPhaseRoleForTrack("de-08", "data-scientist").role).toBe(
      "supporting"
    );
    expect(
      getDataEngineeringPhaseRoleForTrack("de-02", "python-developer").role
    ).toBe("supporting");
  });

  it("authors the complete de-11-08 vertical slice with detour prerequisites and checkpoints", () => {
    expect(ETL_VS_ELT_VERTICAL_SLICE.lessonId).toBe("de-11-08");
    expect(ETL_VS_ELT_VERTICAL_SLICE.detourPrerequisites.map((d) => d.lessonId)).toEqual([
      "de-01-15",
      "de-02-06",
      "de-03-01",
      "de-11-01",
    ]);
    expect(ETL_VS_ELT_VERTICAL_SLICE.checkpoints).toHaveLength(4);
  });
});

describe("Data Engineering Semantics Engine — de-11-08 ETL vs ELT", () => {
  it("parses decimal currency strings into exact integer cents without float drift", () => {
    expect(parseAmountCents("120.00")).toEqual({ ok: true, cents: 12000 });
    expect(parseAmountCents("80.00")).toEqual({ ok: true, cents: 8000 });
    expect(parseAmountCents("135.00")).toEqual({ ok: true, cents: 13500 });
    expect(parseAmountCents("20.00")).toEqual({ ok: true, cents: 2000 });
    expect(parseAmountCents("oops")).toEqual({ ok: false, reason: "invalid_amount" });
    expect(parseAmountCents("-5.00")).toEqual({
      ok: false,
      reason: "non_positive_amount",
    });
    expect(formatAmountCents(23500)).toBe("235.00");
  });

  it("matches exact benchmark numbers from Data_Engineering_Micro_Lesson_ETL_ELT.md in both ETL and ELT modes", () => {
    const etl = runEtlVsEltPipeline({ mode: "etl" });
    const elt = runEtlVsEltPipeline({ mode: "elt" });

    // ETL transforms before warehouse load -> 0 raw staging rows in warehouse
    expect(etl.rawEventCount).toBe(5);
    expect(etl.rawStagingTable).toHaveLength(0);
    expect(etl.validDistinctEventCount).toBe(4);
    expect(etl.quarantineCount).toBe(1);
    expect(etl.quarantinedEvents[0]?.eventId).toBe("e-004");
    expect(etl.quarantinedEvents[0]?.reason).toBe("invalid_amount");
    expect(etl.finalOrderCount).toBe(3);
    expect(etl.finalRevenueCents).toBe(23500);
    expect(etl.finalRevenueFormatted).toBe("235.00");
    expect(etl.steps).toHaveLength(20);

    // ELT loads all 5 raw events (including 'oops') into raw_orders_events staging first
    expect(elt.rawEventCount).toBe(5);
    expect(elt.rawStagingTable).toHaveLength(5);
    expect(elt.validDistinctEventCount).toBe(4);
    expect(elt.quarantineCount).toBe(1);
    expect(elt.finalOrderCount).toBe(3);
    expect(elt.finalRevenueFormatted).toBe("235.00");

    // Verify per-order winners: 101 -> 135.00 (e-003), 102 -> 80.00 (e-002), 104 -> 20.00 (e-005)
    expect(
      elt.finalOrders.map((o) => ({
        orderId: o.orderId,
        amount: o.amountFormatted,
        eventId: o.eventId,
      }))
    ).toEqual([
      { orderId: 101, amount: "135.00", eventId: "e-003" },
      { orderId: 102, amount: "80.00", eventId: "e-002" },
      { orderId: 104, amount: "20.00", eventId: "e-005" },
    ]);
  });

  it("remains 100% idempotent under duplicate eventId, full batch replay, and late stale events", () => {
    const withDup = runEtlVsEltPipeline({
      mode: "elt",
      injectDuplicateEvent: true,
    });
    expect(withDup.rawEventCount).toBe(6);
    expect(withDup.duplicateEventsSkipped).toBe(1);
    expect(withDup.finalOrderCount).toBe(3);
    expect(withDup.finalRevenueFormatted).toBe("235.00");

    const replayed = runEtlVsEltPipeline({
      mode: "elt",
      replayBatchTwice: true,
    });
    expect(replayed.rawEventCount).toBe(10);
    expect(replayed.duplicateEventsSkipped).toBe(5);
    expect(replayed.finalOrderCount).toBe(3);
    expect(replayed.finalRevenueFormatted).toBe("235.00");

    const withStale = runEtlVsEltPipeline({
      mode: "elt",
      injectLateStaleUpdate: true,
    });
    expect(withStale.staleUpdatesIgnored).toBe(1);
    expect(withStale.finalOrderCount).toBe(3);
    expect(withStale.finalRevenueFormatted).toBe("235.00");
  });

  it("simulates SCD Type 2 non-overlapping history and Kafka per-partition ordering", () => {
    const scdRows = buildScdType2History();
    expect(scdRows).toHaveLength(3);
    expect(scdRows.filter((r) => r.isCurrent)).toHaveLength(1);
    expect(scdRows[0]?.validTo).toBe(scdRows[1]?.validFrom);
    expect(scdRows[1]?.validTo).toBe(scdRows[2]?.validFrom);
    expect(scdRows[2]?.validTo).toBeNull();

    const partitions = simulateKafkaPartitioning(3);
    expect(partitions).toHaveLength(3);
    // Order 101 % 3 === 2 -> both e-001 and e-003 land in partition 2 in exact order
    const p2 = partitions[2]!;
    const order101Events = p2.events.filter((e) => e.orderId === 101);
    expect(order101Events.map((e) => e.eventId)).toEqual(["e-001", "e-003"]);
    expect(order101Events[0]!.offset).toBeLessThan(order101Events[1]!.offset);
  });
});
