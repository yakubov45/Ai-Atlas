"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  runEtlVsEltPipeline,
  buildScdType2History,
  simulateKafkaPartitioning,
  DEFAULT_SCD2_CHANGES,
  type PipelineMode,
  type Scd2InputChange,
} from "@/lib/math/data-engineering-semantics";
import {
  Database,
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  ShieldAlert,
  CheckCircle2,
  Code2,
  FileJson,
  Film,
  Layers,
  GitCommit,
} from "lucide-react";

export interface ETLvsELTLabProps {
  initialTab?: "etl-elt" | "scd2" | "kafka";
  compact?: boolean;
}

export function ETLvsELTLab({
  initialTab = "etl-elt",
  compact = false,
}: ETLvsELTLabProps) {
  const [activeTab, setActiveTab] = useState<"etl-elt" | "scd2" | "kafka">(initialTab);

  // Tab 1: ETL vs ELT state
  const [mode, setMode] = useState<PipelineMode>("elt");
  const [injectDuplicateEvent, setInjectDuplicateEvent] = useState(false);
  const [replayBatchTwice, setReplayBatchTwice] = useState(false);
  const [injectLateStaleUpdate, setInjectLateStaleUpdate] = useState(false);
  const [stepIndex, setStepIndex] = useState(19); // 0..19 (default show step 20 summary, or step through)
  const [isPlaying, setIsPlaying] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<"none" | "json" | "sql" | "python" | "manim">("none");

  const pipeline = useMemo(
    () =>
      runEtlVsEltPipeline({
        mode,
        injectDuplicateEvent,
        replayBatchTwice,
        injectLateStaleUpdate,
      }),
    [mode, injectDuplicateEvent, replayBatchTwice, injectLateStaleUpdate]
  );

  const currentStep = pipeline.steps[stepIndex] ?? pipeline.steps[pipeline.steps.length - 1]!;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= pipeline.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => window.clearInterval(timer);
  }, [isPlaying, pipeline.steps.length]);

  const handleReset = () => {
    setIsPlaying(false);
    setMode("elt");
    setInjectDuplicateEvent(false);
    setReplayBatchTwice(false);
    setInjectLateStaleUpdate(false);
    setStepIndex(19);
  };

  // Tab 2: SCD Type 2 state
  const [includeFourthScdChange, setIncludeFourthScdChange] = useState(false);
  const scdChanges = useMemo<Scd2InputChange[]>(() => {
    const base = [...DEFAULT_SCD2_CHANGES];
    if (includeFourthScdChange) {
      base.push({
        customerId: "CUST-42",
        city: "Buxoro",
        tier: "Gold",
        changedAt: "2026-11-15",
      });
    }
    return base;
  }, [includeFourthScdChange]);

  const scdRows = useMemo(() => buildScdType2History(scdChanges), [scdChanges]);

  // Tab 3: Kafka Partition state
  const [numPartitions, setNumPartitions] = useState(3);
  const kafkaPartitions = useMemo(
    () => simulateKafkaPartitioning(numPartitions, pipeline.inputEvents),
    [numPartitions, pipeline.inputEvents]
  );

  return (
    <div className="rounded-3xl bg-slate-950/95 border border-cyan-500/25 p-4 sm:p-6 space-y-5">
      {/* Header & Synthetic Data Disclosure */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/40 text-[11px] font-mono text-cyan-300">
            <Database className="w-3.5 h-3.5" />
            <span>DATA ENGINEERING MINI-LABORATORIYA • SINTETIK O‘QUV MA’LUMOTLARI</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-100">
            ETL vs ELT Quvuri, Karantin (Quarantine), SCD Type 2 va Kafka Partitioning
          </h3>
          <p className="text-xs text-slate-400">
            Ushbu laboratoriya o‘quv maqsadida tuzilgan deterministik sintetik buyurtma hodisalari (5 ta xom yozuv) ustida ishlaydi. Pul miqdorlari ikkilik float emas, aniq o‘nli tiyin (Decimal cents) da hisoblanadi.
          </p>
        </div>

        {/* Sub-lab selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("etl-elt")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              activeTab === "etl-elt"
                ? "bg-cyan-600 text-white border-cyan-400"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            1. ETL vs ELT (de-11-08)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("scd2")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              activeTab === "scd2"
                ? "bg-cyan-600 text-white border-cyan-400"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            2. SCD Type 2 (de-08-12)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("kafka")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              activeTab === "kafka"
                ? "bg-cyan-600 text-white border-cyan-400"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
            }`}
          >
            3. Kafka Partitions (de-14-09)
          </button>
        </div>
      </div>

      {activeTab === "etl-elt" && (
        <div className="space-y-5">
          {/* Controls bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
            {/* Mode Switch */}
            <div className="lg:col-span-5 space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Arxitektura Rejimi (Pipeline Mode)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode("etl")}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    mode === "etl"
                      ? "bg-violet-950/60 border-violet-400 text-violet-100"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-bold">ETL Rejimi</div>
                  <div className="text-[10px] opacity-80">Extract → Transform → Load</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("elt")}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    mode === "elt"
                      ? "bg-cyan-950/60 border-cyan-400 text-cyan-100"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-bold">ELT Rejimi</div>
                  <div className="text-[10px] opacity-80">Extract → Load Raw → Transform</div>
                </button>
              </div>
            </div>

            {/* Idempotency & Edge-Case Toggles */}
            <div className="lg:col-span-7 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Idempotentlik va Xatolik Sinovlari (Fault Injection)
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={injectDuplicateEvent}
                    onChange={(e) => setInjectDuplicateEvent(e.target.checked)}
                    className="accent-cyan-500"
                  />
                  <span>Takroriy eventId (`e-002` 2 marta)</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={replayBatchTwice}
                    onChange={(e) => setReplayBatchTwice(e.target.checked)}
                    className="accent-cyan-500"
                  />
                  <span>Batch Replay (2x qayta yuborish)</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={injectLateStaleUpdate}
                    onChange={(e) => setInjectLateStaleUpdate(e.target.checked)}
                    className="accent-cyan-500"
                  />
                  <span>Kech kelgan eski event (`09:30Z`)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Pipeline Architecture Visual Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-slate-400">1. EXTRACT (Manba JSON)</div>
              <div className="text-xl font-black text-slate-100">
                {pipeline.rawEventCount} ta xom yozuv
              </div>
              <div className="text-[11px] text-slate-400">
                {pipeline.duplicateEventsSkipped > 0
                  ? `${pipeline.duplicateEventsSkipped} ta dublikat aniqlandi`
                  : "5 ta bazaviy sintetik hodisa"}
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border space-y-1 ${
                mode === "elt"
                  ? "bg-cyan-950/30 border-cyan-500/40"
                  : "bg-violet-950/30 border-violet-500/40"
              }`}
            >
              <div className="text-[11px] font-mono text-cyan-300">
                {mode === "elt"
                  ? "2. LOAD RAW STAGING (Omborda)"
                  : "2. WORKER TRANSFORM (Omborgacha)"}
              </div>
              <div className="text-xl font-black text-slate-100">
                {mode === "elt"
                  ? `${pipeline.rawStagingTable.length} ta raw staging`
                  : `${pipeline.validDistinctEventCount} ta valid in-memory`}
              </div>
              <div className="text-[11px] text-slate-300">
                {mode === "elt"
                  ? "raw_orders_events barcha xom yozuvlarni saqlaydi"
                  : "Omborga faqat tozalangan yozuvlar yuboriladi"}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>3. QUARANTINE JADVALI</span>
              </div>
              <div className="text-xl font-black text-rose-200">
                {pipeline.quarantineCount} ta yozuv (`e-004`)
              </div>
              <div className="text-[11px] text-rose-300/90">
                amountText=&quot;oops&quot; → reason=&quot;invalid_amount&quot;
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>4. CLEAN TARGET (Upsert)</span>
              </div>
              <div className="text-xl font-black text-emerald-200">
                {pipeline.finalOrderCount} ta buyurtma • {pipeline.finalRevenueFormatted}
              </div>
              <div className="text-[11px] text-emerald-300/90">
                101→135.00, 102→80.00, 104→20.00 (Idempotent!)
              </div>
            </div>
          </div>

          {/* 20-Step Stepper Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
                  Qadam {currentStep.stepNumber} / {pipeline.steps.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300">
                  Bosqich: {currentStep.stage}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setStepIndex(0);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 inline-flex items-center gap-1 cursor-pointer"
                  title="Boshiga (Start)"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                  <span>Start</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setStepIndex((p) => Math.max(0, p - 1));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 cursor-pointer"
                >
                  Oldingi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (stepIndex >= pipeline.steps.length - 1) {
                      setStepIndex(0);
                    }
                    setIsPlaying((p) => !p);
                  }}
                  className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setStepIndex((p) => Math.min(pipeline.steps.length - 1, p + 1));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Keyingi</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={pipeline.steps.length - 1}
              value={stepIndex}
              onChange={(e) => {
                setIsPlaying(false);
                setStepIndex(Number(e.target.value));
              }}
              aria-label="ETL vs ELT qadam slayderi"
              className="w-full accent-cyan-500 cursor-pointer"
            />

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-100">{currentStep.titleUz}</div>
                <p className="text-xs text-slate-300">{currentStep.actionUz}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono shrink-0">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                  Staging: {currentStep.stagingCount}
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                  Valid: {currentStep.validCount}
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-rose-300">
                  Quarantine: {currentStep.quarantineCount}
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300">
                  Revenue: {currentStep.currentRevenueFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Tables Comparison: Raw Input vs Clean Orders & Quarantine */}
          {!compact && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left: Raw Events */}
              <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Manba Xom Oqimi ({pipeline.inputEvents.length} ta hodisa)
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    {mode === "elt" ? "→ raw_orders_events" : "→ Worker Memory"}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-1.5 pr-2">eventId</th>
                        <th className="py-1.5 pr-2">orderId</th>
                        <th className="py-1.5 pr-2">amountText</th>
                        <th className="py-1.5">updatedAt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {pipeline.inputEvents.map((ev, idx) => {
                        const isInvalid = ev.amountText === "oops";
                        const isHighlighted = currentStep.activeEventId === ev.eventId;
                        return (
                          <tr
                            key={`${ev.eventId}-${idx}`}
                            className={`${
                              isHighlighted
                                ? "bg-cyan-950/60 text-cyan-200"
                                : isInvalid
                                ? "bg-rose-950/30 text-rose-300"
                                : "text-slate-300"
                            }`}
                          >
                            <td className="py-1.5 pr-2 font-bold">{ev.eventId}</td>
                            <td className="py-1.5 pr-2">{ev.orderId}</td>
                            <td className="py-1.5 pr-2">{ev.amountText}</td>
                            <td className="py-1.5 text-[11px] text-slate-400">{ev.updatedAt}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Clean Target + Quarantine */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Toza Maqsadli Jadval: analytics_orders_clean ({pipeline.finalOrderCount} ta)
                    </h4>
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      Jami: {pipeline.finalRevenueFormatted}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-emerald-800/50 text-emerald-400/80">
                          <th className="py-1.5 pr-2">orderId</th>
                          <th className="py-1.5 pr-2">amount</th>
                          <th className="py-1.5 pr-2">winningEvent</th>
                          <th className="py-1.5">updatedAt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-900/40 text-slate-200">
                        {pipeline.finalOrders.map((row) => (
                          <tr key={row.orderId}>
                            <td className="py-1.5 pr-2 font-bold text-emerald-300">{row.orderId}</td>
                            <td className="py-1.5 pr-2 font-bold">{row.amountFormatted}</td>
                            <td className="py-1.5 pr-2">{row.eventId}</td>
                            <td className="py-1.5 text-[11px] text-slate-400">{row.updatedAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                      Karantin Jadvali: quarantine_orders ({pipeline.quarantineCount} ta)
                    </h4>
                    <span className="text-[11px] font-mono text-rose-300">
                      Yashirincha o‘chirilmaydi (No Silent Drop)
                    </span>
                  </div>
                  {pipeline.quarantinedEvents.map((q) => (
                    <div
                      key={q.eventId}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-800/50 flex items-center justify-between text-xs font-mono text-rose-200"
                    >
                      <span>
                        eventId={q.eventId} | orderId={q.orderId} | amountText=&quot;{q.amountText}&quot;
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-900/70 text-rose-200">
                        reason: {q.reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Expandable Drawers: JSON, SQL, Python, Manim Video */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setOpenDrawer((d) => (d === "json" ? "none" : "json"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5 text-cyan-400" />
              <span>Show Data (JSON)</span>
            </button>
            <button
              type="button"
              onClick={() => setOpenDrawer((d) => (d === "sql" ? "none" : "sql"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-violet-400" />
              <span>Show SQL (Warehouse Upsert)</span>
            </button>
            <button
              type="button"
              onClick={() => setOpenDrawer((d) => (d === "python" ? "none" : "python"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Show Python (Decimal Engine)</span>
            </button>
            <button
              type="button"
              onClick={() => setOpenDrawer((d) => (d === "manim" ? "none" : "manim"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Manim Animatsiya (MP4)</span>
            </button>
          </div>

          {openDrawer === "json" && (
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto">
              {JSON.stringify(
                {
                  mode: pipeline.mode,
                  rawEventCount: pipeline.rawEventCount,
                  validDistinctEventCount: pipeline.validDistinctEventCount,
                  quarantineCount: pipeline.quarantineCount,
                  finalOrderCount: pipeline.finalOrderCount,
                  finalRevenue: pipeline.finalRevenueFormatted,
                  finalOrders: pipeline.finalOrders,
                  quarantine: pipeline.quarantinedEvents,
                },
                null,
                2
              )}
            </pre>
          )}

          {openDrawer === "sql" && (
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-violet-200 overflow-x-auto">
              {pipeline.sqlSnippet}
            </pre>
          )}

          {openDrawer === "python" && (
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-200 overflow-x-auto">
              {pipeline.pythonSnippet}
            </pre>
          )}

          {openDrawer === "manim" && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-amber-300">
                Manim Community v0.22.0 orqali render qilingan: /animations/etl_elt_pipeline.mp4
              </div>
              <video
                src="/animations/etl_elt_pipeline.mp4"
                controls
                className="w-full max-w-2xl rounded-xl border border-slate-800"
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "scd2" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <GitCommit className="w-4 h-4" />
                <span>SCD Type 2 — Slowly Changing Dimension Tarix Jadvali (de-08-12)</span>
              </div>
              <p className="text-xs text-slate-400">
                Mijoz atributlari (`city`, `tier`) o‘zgarganda eski qator ustidan yozib yuborilmaydi (SCD1 emas) — eski qator `valid_to` bilan yopilib (`is_current = false`), yangi qator ochiladi.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-cyan-500/40 text-xs font-semibold text-cyan-200 cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={includeFourthScdChange}
                onChange={(e) => setIncludeFourthScdChange(e.target.checked)}
                className="accent-cyan-500"
              />
              <span>2026-11-15: Buxoro / Gold o‘zgarishini qo‘shish</span>
            </label>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-3">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 pr-3">surrogate_key</th>
                  <th className="py-2 pr-3">customer_id</th>
                  <th className="py-2 pr-3">city</th>
                  <th className="py-2 pr-3">tier</th>
                  <th className="py-2 pr-3">valid_from</th>
                  <th className="py-2 pr-3">valid_to</th>
                  <th className="py-2">is_current</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {scdRows.map((row) => (
                  <tr
                    key={row.surrogateKey}
                    className={
                      row.isCurrent
                        ? "bg-emerald-950/30 text-emerald-200 font-semibold"
                        : "text-slate-300"
                    }
                  >
                    <td className="py-2 pr-3">{row.surrogateKey}</td>
                    <td className="py-2 pr-3">{row.customerId}</td>
                    <td className="py-2 pr-3">{row.city}</td>
                    <td className="py-2 pr-3">{row.tier}</td>
                    <td className="py-2 pr-3">{row.validFrom}</td>
                    <td className="py-2 pr-3">{row.validTo ?? "NULL (∞)"}</td>
                    <td className="py-2">
                      {row.isCurrent ? "TRUE (Joriy)" : "FALSE (Tarixiy)"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "kafka" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <Layers className="w-4 h-4" />
                <span>Kafka Partition Key &amp; Ordering Kafolati (de-14-07 / de-14-09)</span>
              </div>
              <p className="text-xs text-slate-400">
                Kafka’da tartib (ordering) butun topic bo‘yicha emas, balki{" "}
                <strong className="text-slate-200">har bir partition ichida</strong> kafolatlanadi.{" "}
                <code>partition = orderId % numPartitions</code> orqali bir xil buyurtma (`101`) hodisalari har doim bitta partitionga tushadi.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-300">
                Partitionlar soni: {numPartitions}
              </span>
              <input
                type="range"
                min={1}
                max={5}
                value={numPartitions}
                onChange={(e) => setNumPartitions(Number(e.target.value))}
                aria-label="Kafka partitionlar soni"
                className="w-28 accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {kafkaPartitions.map((part) => (
              <div
                key={part.partition}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-cyan-300">Partition #{part.partition}</span>
                  <span className="text-slate-400">nextOffset: {part.nextOffset}</span>
                </div>
                {part.events.length === 0 ? (
                  <div className="text-xs text-slate-500 font-mono py-2">
                    (Hodisa tushmadi)
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {part.events.map((ev) => (
                      <div
                        key={`${ev.eventId}-${ev.offset}`}
                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-200 flex items-center justify-between"
                      >
                        <span>
                          [offset {ev.offset}] {ev.eventId}
                        </span>
                        <span className="text-cyan-300">{ev.payload}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
