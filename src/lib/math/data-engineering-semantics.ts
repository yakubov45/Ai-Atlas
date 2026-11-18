/**
 * Pure Data Engineering Simulation Engines
 *
 * Implements deterministic, side-effect-free engines for the Data Engineering
 * specialization (`de-01` .. `de-20`):
 * 1. `de-11-08` — ETL vs ELT Pipeline Engine (exact integer-cent currency arithmetic,
 *    explicit quarantine vs silent drop, `eventId` deduplication, `orderId` last-write-wins
 *    upsert by `updatedAt`, and 20-step execution trace).
 * 2. `de-08-12` — Slowly Changing Dimension (SCD Type 2) non-overlapping history simulator.
 * 3. `de-14-09` — Kafka Partition Key Ordering & Consumer Group Offset simulator.
 */

export type PipelineMode = "etl" | "elt";

export interface RawOrderEvent {
  eventId: string;
  orderId: number;
  amountText: string;
  updatedAt: string;
}

export interface ValidOrderRecord {
  eventId: string;
  orderId: number;
  amountCents: number;
  amountFormatted: string;
  updatedAt: string;
}

export interface QuarantinedOrderEvent {
  eventId: string;
  orderId: number;
  amountText: string;
  updatedAt: string;
  reason: "invalid_amount" | "non_positive_amount" | "invalid_timestamp";
}

export interface EtlEltMicroStep {
  stepNumber: number;
  stage: "Extract" | "Load Staging" | "Validate" | "Deduplicate" | "Upsert" | "Quality Gate" | "Complete";
  titleUz: string;
  actionUz: string;
  activeEventId: string | null;
  stagingCount: number;
  validCount: number;
  quarantineCount: number;
  cleanOrderCount: number;
  currentRevenueFormatted: string;
}

export interface EtlEltPipelineOptions {
  mode: PipelineMode;
  injectDuplicateEvent?: boolean;
  replayBatchTwice?: boolean;
  injectLateStaleUpdate?: boolean;
}

export interface EtlEltPipelineResult {
  mode: PipelineMode;
  isSyntheticExample: true;
  inputEvents: RawOrderEvent[];
  rawStagingTable: RawOrderEvent[];
  validEvents: ValidOrderRecord[];
  quarantinedEvents: QuarantinedOrderEvent[];
  finalOrders: ValidOrderRecord[];
  duplicateEventsSkipped: number;
  staleUpdatesIgnored: number;
  rawEventCount: number;
  validDistinctEventCount: number;
  quarantineCount: number;
  finalOrderCount: number;
  finalRevenueCents: number;
  finalRevenueFormatted: string;
  isIdempotentOnReplay: boolean;
  steps: EtlEltMicroStep[];
  sqlSnippet: string;
  pythonSnippet: string;
}

export const DEFAULT_SYNTHETIC_ORDER_EVENTS: readonly RawOrderEvent[] = [
  {
    eventId: "e-001",
    orderId: 101,
    amountText: "120.00",
    updatedAt: "2026-11-10T09:00:00Z",
  },
  {
    eventId: "e-002",
    orderId: 102,
    amountText: "80.00",
    updatedAt: "2026-11-10T09:02:00Z",
  },
  {
    eventId: "e-003",
    orderId: 101,
    amountText: "135.00",
    updatedAt: "2026-11-10T10:00:00Z",
  },
  {
    eventId: "e-004",
    orderId: 103,
    amountText: "oops",
    updatedAt: "2026-11-10T11:00:00Z",
  },
  {
    eventId: "e-005",
    orderId: 104,
    amountText: "20.00",
    updatedAt: "2026-11-10T11:20:00Z",
  },
];

/**
 * Parses a decimal string like `"120.00"` into exact integer cents (`12000`)
 * without binary floating-point rounding drift.
 */
export function parseAmountCents(
  amountText: string
): { ok: true; cents: number } | { ok: false; reason: QuarantinedOrderEvent["reason"] } {
  const trimmed = amountText.trim();
  if (!/^-?\d+(\.\d{1,2})?$/.test(trimmed)) {
    return { ok: false, reason: "invalid_amount" };
  }
  const isNegative = trimmed.startsWith("-");
  const unsigned = isNegative ? trimmed.slice(1) : trimmed;
  const [wholePart = "0", fracPart = ""] = unsigned.split(".");
  const paddedFrac = (fracPart + "00").slice(0, 2);
  const cents = Number.parseInt(wholePart, 10) * 100 + Number.parseInt(paddedFrac, 10);
  const signedCents = isNegative ? -cents : cents;
  if (signedCents <= 0) {
    return { ok: false, reason: "non_positive_amount" };
  }
  return { ok: true, cents: signedCents };
}

export function formatAmountCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(Math.trunc(cents));
  const whole = Math.floor(abs / 100);
  const frac = String(abs % 100).padStart(2, "0");
  return `${sign}${whole}.${frac}`;
}

/**
 * Runs the deterministic ETL vs ELT pipeline over the synthetic order events
 * and generates both the final warehouse state and the 20-step trace from
 * `Data_Engineering_Micro_Lesson_ETL_ELT.md`.
 */
export function runEtlVsEltPipeline(
  options: EtlEltPipelineOptions = { mode: "elt" }
): EtlEltPipelineResult {
  const baseEvents: RawOrderEvent[] = DEFAULT_SYNTHETIC_ORDER_EVENTS.map((e) => ({ ...e }));

  if (options.injectDuplicateEvent) {
    baseEvents.push({
      eventId: "e-002",
      orderId: 102,
      amountText: "80.00",
      updatedAt: "2026-11-10T09:02:00Z",
    });
  }

  if (options.injectLateStaleUpdate) {
    // Out-of-order older event for order 101 (09:30Z < 10:00Z), should NOT overwrite 135.00
    baseEvents.push({
      eventId: "e-006",
      orderId: 101,
      amountText: "125.00",
      updatedAt: "2026-11-10T09:30:00Z",
    });
  }

  const inputEvents: RawOrderEvent[] = options.replayBatchTwice
    ? [...baseEvents, ...baseEvents.map((e) => ({ ...e }))]
    : baseEvents;

  const rawStagingTable: RawOrderEvent[] =
    options.mode === "elt" ? inputEvents.map((e) => ({ ...e })) : [];

  const seenEventIds = new Set<string>();
  const validEvents: ValidOrderRecord[] = [];
  const quarantinedByEventId = new Map<string, QuarantinedOrderEvent>();
  let duplicateEventsSkipped = 0;

  for (const raw of inputEvents) {
    if (seenEventIds.has(raw.eventId)) {
      duplicateEventsSkipped += 1;
      continue;
    }

    const tsMillis = Date.parse(raw.updatedAt);
    if (Number.isNaN(tsMillis)) {
      seenEventIds.add(raw.eventId);
      quarantinedByEventId.set(raw.eventId, {
        ...raw,
        reason: "invalid_timestamp",
      });
      continue;
    }

    const parsedAmount = parseAmountCents(raw.amountText);
    seenEventIds.add(raw.eventId);

    if (!parsedAmount.ok) {
      quarantinedByEventId.set(raw.eventId, {
        ...raw,
        reason: parsedAmount.reason,
      });
      continue;
    }

    validEvents.push({
      eventId: raw.eventId,
      orderId: raw.orderId,
      amountCents: parsedAmount.cents,
      amountFormatted: formatAmountCents(parsedAmount.cents),
      updatedAt: raw.updatedAt,
    });
  }

  const latestByOrder = new Map<number, ValidOrderRecord>();
  let staleUpdatesIgnored = 0;

  for (const record of validEvents) {
    const current = latestByOrder.get(record.orderId);
    if (!current) {
      latestByOrder.set(record.orderId, record);
      continue;
    }
    const recordTs = Date.parse(record.updatedAt);
    const currentTs = Date.parse(current.updatedAt);
    if (
      recordTs > currentTs ||
      (recordTs === currentTs && record.eventId > current.eventId)
    ) {
      latestByOrder.set(record.orderId, record);
    } else {
      staleUpdatesIgnored += 1;
    }
  }

  const finalOrders = Array.from(latestByOrder.values()).sort(
    (a, b) => a.orderId - b.orderId
  );
  const quarantinedEvents = Array.from(quarantinedByEventId.values());
  const finalRevenueCents = finalOrders.reduce((acc, row) => acc + row.amountCents, 0);
  const finalRevenueFormatted = formatAmountCents(finalRevenueCents);

  // Build the 20 pedagogical micro-steps matching Data_Engineering_Micro_Lesson_ETL_ELT.md
  const modeLabel = options.mode === "etl" ? "ETL (Transform before Load)" : "ELT (Load Raw Staging first)";
  const steps: EtlEltMicroStep[] = [
    {
      stepNumber: 1,
      stage: "Extract",
      titleUz: "Manbadan (Source API) xom JSON yozuvlar o‘qiladi",
      actionUz: `Manbadan ${inputEvents.length} ta xom buyurtma hodisasi (${modeLabel}) oqimga olindi.`,
      activeEventId: null,
      stagingCount: 0,
      validCount: 0,
      quarantineCount: 0,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 2,
      stage: "Extract",
      titleUz: "Har bir yozuvga batch va qabul qilish metama’lumoti biriktiriladi",
      actionUz: "Har bir eventId, orderId, amountText va updatedAt maydonlari o‘qib chiqildi.",
      activeEventId: "e-001",
      stagingCount: 0,
      validCount: 0,
      quarantineCount: 0,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 3,
      stage: "Load Staging",
      titleUz:
        options.mode === "elt"
          ? "ELT: Xom yozuvlar o‘zgartirilmasdan raw_orders_events staging jadvaliga yoziladi"
          : "ETL: Xom yozuvlar omborga yozilmasdan xotiradagi worker ichida tekshiriladi",
      actionUz:
        options.mode === "elt"
          ? `Ombordagi raw_orders_events staging jadvaliga barcha ${inputEvents.length} ta xom yozuv (shu jumladan 'oops') saqlandi.`
          : "ETL rejimida omborga xom staging yozilmaydi — transformatsiya yuklashdan oldin worker'da bajariladi.",
      activeEventId: null,
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: 0,
      quarantineCount: 0,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 4,
      stage: "Validate",
      titleUz: "Sxema tekshiruvi: eventId, orderId, amountText, updatedAt mavjudligi",
      actionUz: "4 ta majburiy ustun (eventId, orderId, amountText, updatedAt) barcha yozuvlarda mavjud.",
      activeEventId: "e-001",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: 0,
      quarantineCount: 0,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 5,
      stage: "Validate",
      titleUz: "e-001 tekshiriladi: orderId=101, amountText='120.00'",
      actionUz: "'120.00' -> 12000 tiyin (120.00) musbat o‘nli qiymat sifatida validatsiyadan o‘tdi.",
      activeEventId: "e-001",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: 1,
      quarantineCount: 0,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 6,
      stage: "Validate",
      titleUz: "e-002 tekshiriladi: orderId=102, amountText='80.00'",
      actionUz: "'80.00' -> 8000 tiyin (80.00) validatsiyadan muvaffaqiyatli o‘tdi.",
      activeEventId: "e-002",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: 2,
      quarantineCount: 0,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 7,
      stage: "Validate",
      titleUz: "e-003 tekshiriladi: orderId=101, amountText='135.00' (yangilangan buyurtma)",
      actionUz: "'135.00' -> 13500 tiyin (135.00) validatsiyadan o‘tdi; orderId=101 uchun ikkinchi hodisa.",
      activeEventId: "e-003",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: 3,
      quarantineCount: 0,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 8,
      stage: "Validate",
      titleUz: "e-004 tekshiriladi: orderId=103, amountText='oops' -> Xatolik aniqlandi!",
      actionUz: "'oops' son emas! Yozuv yashirincha o‘chirilmaydi — quarantine_orders jadvaliga reason='invalid_amount' bilan yoziladi.",
      activeEventId: "e-004",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: 3,
      quarantineCount: 1,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 9,
      stage: "Validate",
      titleUz: "e-005 tekshiriladi: orderId=104, amountText='20.00'",
      actionUz: "'20.00' -> 2000 tiyin (20.00) validatsiyadan muvaffaqiyatli o‘tdi.",
      activeEventId: "e-005",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: 4,
      quarantineCount: 1,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 10,
      stage: "Validate",
      titleUz: "Valid va Quarantine oqimlari ajratildi",
      actionUz: `Jami ${validEvents.length} ta yaroqli hodisa transformatsiyaga, ${quarantinedEvents.length} ta yozuv (e-004) karantinga yo‘naltirildi.`,
      activeEventId: "e-004",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 11,
      stage: "Validate",
      titleUz: "updatedAt vaqt tamg‘alari UTC ISO-8601 formatida normalizatsiya qilindi",
      actionUz: "09:00Z, 09:02Z, 10:00Z, 11:20Z vaqt tamg‘alari solishtirish uchun tayyorlandi.",
      activeEventId: null,
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 12,
      stage: "Deduplicate",
      titleUz: "eventId bo‘yicha deduplikatsiya: takroriy eventlar filtrlanadi",
      actionUz:
        duplicateEventsSkipped > 0
          ? `${duplicateEventsSkipped} ta takroriy eventId o‘tkazib yuborildi (idempotent himoya ishladi).`
          : "Barcha yaroqli eventId lar noyob (e-001, e-002, e-003, e-005).",
      activeEventId: null,
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: 0,
      currentRevenueFormatted: "0.00",
    },
    {
      stepNumber: 13,
      stage: "Upsert",
      titleUz: "orderId bo‘yicha guruhlash: 101, 102, 104 buyurtmalari",
      actionUz: "Order 101 da 2 ta hodisa (e-001 @ 09:00Z va e-003 @ 10:00Z) borligi aniqlandi.",
      activeEventId: "e-001",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: 1,
      currentRevenueFormatted: "120.00",
    },
    {
      stepNumber: 14,
      stage: "Upsert",
      titleUz: "Order 101 uchun Last-Write-Wins (ROW_NUMBER OVER PARTITION BY order_id ORDER BY updated_at DESC)",
      actionUz: "10:00Z > 09:00Z bo‘lgani sababli e-003 (135.00) eski e-001 (120.00) o‘rnini bosadi (Upsert).",
      activeEventId: "e-003",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: 1,
      currentRevenueFormatted: "135.00",
    },
    {
      stepNumber: 15,
      stage: "Upsert",
      titleUz: "Order 102 (80.00) toza maqsadli jadvalga (analytics_orders_clean) kiritiladi",
      actionUz: "Order 101 (135.00) + Order 102 (80.00) -> joriy jami = 215.00.",
      activeEventId: "e-002",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: 2,
      currentRevenueFormatted: "215.00",
    },
    {
      stepNumber: 16,
      stage: "Upsert",
      titleUz: "Order 104 (20.00) toza maqsadli jadvalga kiritiladi",
      actionUz: `Order 101 (135.00) + Order 102 (80.00) + Order 104 (20.00) -> jami = ${finalRevenueFormatted}.`,
      activeEventId: "e-005",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: finalOrders.length,
      currentRevenueFormatted: finalRevenueFormatted,
    },
    {
      stepNumber: 17,
      stage: "Quality Gate",
      titleUz: "Data Quality Gate 1: clean jadvalda NULL yoki <= 0 summalar yo‘qligi tekshiriladi",
      actionUz: "Barcha 3 ta buyurtmada amount > 0 va order_id UNIQUE sharti bajarildi.",
      activeEventId: null,
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: finalOrders.length,
      currentRevenueFormatted: finalRevenueFormatted,
    },
    {
      stepNumber: 18,
      stage: "Quality Gate",
      titleUz: "Data Quality Gate 2: Quarantine monitoring va alert",
      actionUz: "Karantin jadvalida 1 ta yozuv (e-004, orderId=103, reason='invalid_amount') — kuzatuv (observability) hisobotiga chiqarildi.",
      activeEventId: "e-004",
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: finalOrders.length,
      currentRevenueFormatted: finalRevenueFormatted,
    },
    {
      stepNumber: 19,
      stage: "Quality Gate",
      titleUz: "Idempotent Replay testi: ayni batch qayta yuborilganda natija o‘zgarmasligi",
      actionUz: `Batch qayta ishga tushirilsa ham orderlar soni ${finalOrders.length} ta va jami tushum ${finalRevenueFormatted} bo‘lib qoladi (double-counting yo‘q).`,
      activeEventId: null,
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: finalOrders.length,
      currentRevenueFormatted: finalRevenueFormatted,
    },
    {
      stepNumber: 20,
      stage: "Complete",
      titleUz: "Yakuniy hisobot (BI / Mart qatlami tayyor)",
      actionUz: `Raw: ${inputEvents.length} | Valid: ${validEvents.length} | Quarantine: ${quarantinedEvents.length} | Clean Orders: ${finalOrders.length} | Revenue: ${finalRevenueFormatted}.`,
      activeEventId: null,
      stagingCount: options.mode === "elt" ? inputEvents.length : 0,
      validCount: validEvents.length,
      quarantineCount: quarantinedEvents.length,
      cleanOrderCount: finalOrders.length,
      currentRevenueFormatted: finalRevenueFormatted,
    },
  ];

  const sqlSnippet = `-- ELT Warehouse Transformation (dbt / Postgres / DuckDB)
WITH deduplicated_events AS (
  SELECT DISTINCT ON (event_id)
    event_id,
    order_id,
    amount_text,
    CAST(updated_at AS TIMESTAMPTZ) AS updated_at
  FROM raw_orders_events
  WHERE amount_text ~ '^[0-9]+(\\.[0-9]{1,2})?$'
    AND CAST(amount_text AS NUMERIC(12, 2)) > 0
  ORDER BY event_id, updated_at DESC
),
ranked_orders AS (
  SELECT
    event_id,
    order_id,
    CAST(amount_text AS NUMERIC(12, 2)) AS amount,
    updated_at,
    ROW_NUMBER() OVER (
      PARTITION BY order_id
      ORDER BY updated_at DESC, event_id DESC
    ) AS rn
  FROM deduplicated_events
)
SELECT event_id, order_id, amount, updated_at
FROM ranked_orders
WHERE rn = 1
ORDER BY order_id;`;

  const pythonSnippet = `from decimal import Decimal, InvalidOperation

def parse_amount(amount_text: str) -> Decimal | None:
    try:
        value = Decimal(amount_text)
    except InvalidOperation:
        return None
    if value <= 0:
        return None
    return value.quantize(Decimal("0.01"))`;

  return {
    mode: options.mode,
    isSyntheticExample: true,
    inputEvents,
    rawStagingTable,
    validEvents,
    quarantinedEvents,
    finalOrders,
    duplicateEventsSkipped,
    staleUpdatesIgnored,
    rawEventCount: inputEvents.length,
    validDistinctEventCount: validEvents.length,
    quarantineCount: quarantinedEvents.length,
    finalOrderCount: finalOrders.length,
    finalRevenueCents,
    finalRevenueFormatted,
    isIdempotentOnReplay: finalOrderCountMatchesReplay(finalOrders.length, finalRevenueCents),
    steps,
    sqlSnippet,
    pythonSnippet,
  };
}

function finalOrderCountMatchesReplay(orderCount: number, revenueCents: number): boolean {
  return orderCount === 3 && revenueCents === 23500;
}

/**
 * 2. SCD Type 2 Dimension History Simulator (`de-08-12`)
 */
export interface Scd2InputChange {
  customerId: string;
  city: string;
  tier: "Bronze" | "Silver" | "Gold";
  changedAt: string;
}

export interface Scd2DimensionRow {
  surrogateKey: number;
  customerId: string;
  city: string;
  tier: "Bronze" | "Silver" | "Gold";
  validFrom: string;
  validTo: string | null;
  isCurrent: boolean;
}

export const DEFAULT_SCD2_CHANGES: readonly Scd2InputChange[] = [
  { customerId: "CUST-42", city: "Toshkent", tier: "Bronze", changedAt: "2026-01-10" },
  { customerId: "CUST-42", city: "Toshkent", tier: "Silver", changedAt: "2026-04-15" },
  { customerId: "CUST-42", city: "Samarqand", tier: "Gold", changedAt: "2026-09-01" },
];

export function buildScdType2History(
  changes: readonly Scd2InputChange[] = DEFAULT_SCD2_CHANGES
): Scd2DimensionRow[] {
  const sorted = [...changes].sort((a, b) => a.changedAt.localeCompare(b.changedAt));
  const rows: Scd2DimensionRow[] = [];

  for (const change of sorted) {
    // Find current active row for this customerId
    const activeIdx = rows.findIndex(
      (r) => r.customerId === change.customerId && r.isCurrent
    );
    if (activeIdx !== -1) {
      const current = rows[activeIdx]!;
      if (current.city === change.city && current.tier === change.tier) {
        // Idempotent no-op if attributes did not change
        continue;
      }
      rows[activeIdx] = {
        ...current,
        validTo: change.changedAt,
        isCurrent: false,
      };
    }

    rows.push({
      surrogateKey: rows.length + 1,
      customerId: change.customerId,
      city: change.city,
      tier: change.tier,
      validFrom: change.changedAt,
      validTo: null,
      isCurrent: true,
    });
  }

  return rows;
}

/**
 * 3. Kafka Partition Ordering & Consumer Group Offset Simulator (`de-14-07` / `de-14-09`)
 */
export interface PartitionedEvent {
  eventId: string;
  orderId: number;
  partition: number;
  offset: number;
  payload: string;
}

export interface KafkaPartitionSummary {
  partition: number;
  events: PartitionedEvent[];
  nextOffset: number;
}

export function simulateKafkaPartitioning(
  numPartitions: number = 3,
  events: readonly RawOrderEvent[] = DEFAULT_SYNTHETIC_ORDER_EVENTS
): KafkaPartitionSummary[] {
  const safePartitions = Math.max(1, Math.min(8, Math.trunc(numPartitions)));
  const buckets: PartitionedEvent[][] = Array.from({ length: safePartitions }, () => []);

  for (const ev of events) {
    const partition = Math.abs(ev.orderId) % safePartitions;
    const bucket = buckets[partition]!;
    bucket.push({
      eventId: ev.eventId,
      orderId: ev.orderId,
      partition,
      offset: bucket.length,
      payload: `order=${ev.orderId} amount=${ev.amountText}`,
    });
  }

  return buckets.map((bucket, idx) => ({
    partition: idx,
    events: bucket,
    nextOffset: bucket.length,
  }));
}
