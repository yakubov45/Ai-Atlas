"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart3,
  Filter,
  Sliders,
  RotateCcw,
  Info,
  CheckCircle2,
  Table as TableIcon,
} from "lucide-react";

export interface SalesRecord {
  id: number;
  region: "Toshkent" | "Samarqand" | "Farg‘ona" | "Buxoro";
  category: "Elektronika" | "Kiyim-kechak" | "Kitoblar" | "Uy-ro‘zg‘or";
  sales: number;
  units: number;
}

export const INITIAL_SALES_DATASET: readonly SalesRecord[] = [
  { id: 1, region: "Toshkent", category: "Elektronika", sales: 1200, units: 4 },
  { id: 2, region: "Toshkent", category: "Kiyim-kechak", sales: 450, units: 10 },
  { id: 3, region: "Samarqand", category: "Elektronika", sales: 850, units: 3 },
  { id: 4, region: "Farg‘ona", category: "Kitoblar", sales: 220, units: 15 },
  { id: 5, region: "Toshkent", category: "Uy-ro‘zg‘or", sales: 640, units: 8 },
  { id: 6, region: "Buxoro", category: "Elektronika", sales: 990, units: 2 },
  { id: 7, region: "Samarqand", category: "Kiyim-kechak", sales: 510, units: 12 },
  { id: 8, region: "Farg‘ona", category: "Elektronika", sales: 780, units: 3 },
  { id: 9, region: "Toshkent", category: "Kitoblar", sales: 310, units: 20 },
  { id: 10, region: "Buxoro", category: "Uy-ro‘zg‘or", sales: 430, units: 6 },
  { id: 11, region: "Samarqand", category: "Kitoblar", sales: 190, units: 11 },
  { id: 12, region: "Farg‘ona", category: "Kiyim-kechak", sales: 380, units: 9 },
];

export type GroupByColumn = "region" | "category";
export type AggFunction = "mean" | "sum" | "count" | "max" | "min";

export function computeGroupedData(
  dataset: readonly SalesRecord[],
  groupByCol: GroupByColumn,
  metricCol: "sales" | "units",
  aggFunc: AggFunction,
  minSalesFilter: number
): {
  filteredRows: SalesRecord[];
  groupedResults: Array<{ group: string; value: number; count: number }>;
  totalValue: number;
} {
  const filtered = dataset.filter((row) => row.sales >= minSalesFilter);
  const groups: Record<string, number[]> = {};

  for (const row of filtered) {
    const key = String(row[groupByCol]);
    if (!groups[key]) groups[key] = [];
    groups[key].push(row[metricCol]);
  }

  const groupedResults = Object.entries(groups).map(([group, values]) => {
    let computed = 0;
    const n = values.length;
    if (aggFunc === "count") computed = n;
    else if (aggFunc === "sum") computed = values.reduce((a, b) => a + b, 0);
    else if (aggFunc === "mean") computed = n > 0 ? values.reduce((a, b) => a + b, 0) / n : 0;
    else if (aggFunc === "max") computed = Math.max(...values);
    else if (aggFunc === "min") computed = Math.min(...values);

    return {
      group,
      value: Number(computed.toFixed(2)),
      count: n,
    };
  });

  // Sort descending by value
  groupedResults.sort((a, b) => b.value - a.value);

  const totalValue = groupedResults.reduce((acc, curr) => acc + curr.value, 0);

  return {
    filteredRows: filtered,
    groupedResults,
    totalValue: Number(totalValue.toFixed(2)),
  };
}

export function PandasAggregationLab() {
  const [groupByCol, setGroupByCol] = useState<GroupByColumn>("region");
  const [metricCol, setMetricCol] = useState<"sales" | "units">("sales");
  const [aggFunc, setAggFunc] = useState<AggFunction>("mean");
  const [minSalesFilter, setMinSalesFilter] = useState<number>(0);

  const { filteredRows, groupedResults, totalValue } = useMemo(() => {
    return computeGroupedData(
      INITIAL_SALES_DATASET,
      groupByCol,
      metricCol,
      aggFunc,
      minSalesFilter
    );
  }, [groupByCol, metricCol, aggFunc, minSalesFilter]);

  const maxGroupValue = useMemo(() => {
    return Math.max(...groupedResults.map((r) => r.value), 1);
  }, [groupedResults]);

  const handleReset = () => {
    setGroupByCol("region");
    setMetricCol("sales");
    setAggFunc("mean");
    setMinSalesFilter(0);
  };

  return (
    <div className="space-y-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Interaktiv Pandas GroupBy, Filter & Aggregatsiya Laboratoriyasi
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pandas DataFrame ustida <code className="text-sky-300 font-mono">df.groupby()</code> va{" "}
            <code className="text-sky-300 font-mono">.agg()</code> amallari qanday ishlashini
            real hisoblash va diagramma orqali tahlil qiling.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
          <span>Asliga qaytarish</span>
        </button>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
        {/* 1. GroupBy Column */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span>Guruhlash ustuni (groupby):</span>
          </label>
          <select
            value={groupByCol}
            onChange={(e) => setGroupByCol(e.target.value as GroupByColumn)}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="region">Hudud (region)</option>
            <option value="category">Kategoriya (category)</option>
          </select>
        </div>

        {/* 2. Target Metric Column */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span>O‘lchov ustuni (metric):</span>
          </label>
          <select
            value={metricCol}
            onChange={(e) => setMetricCol(e.target.value as "sales" | "units")}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="sales">Savdo hajmi ($ sales)</option>
            <option value="units">Sotilgan dona (units)</option>
          </select>
        </div>

        {/* 3. Aggregation Function */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span>Agregatsiya funksiyasi (agg):</span>
          </label>
          <select
            value={aggFunc}
            onChange={(e) => setAggFunc(e.target.value as AggFunction)}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="mean">O‘rtacha (mean / avg)</option>
            <option value="sum">Jami yig‘indi (sum)</option>
            <option value="count">Qatorlar soni (count)</option>
            <option value="max">Maksimal (max)</option>
            <option value="min">Minimal (min)</option>
          </select>
        </div>

        {/* 4. Min Sales Filter Threshold */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Filter (sales ≥ {minSalesFilter}$):</span>
            <span className="text-sky-400">{filteredRows.length}/{INITIAL_SALES_DATASET.length} qator</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={minSalesFilter}
            onChange={(e) => setMinSalesFilter(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Code Equivalent Snippet */}
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
        <span className="text-slate-500"># Ekvivalent Pandas kodi:</span>
        <div className="mt-1 text-sky-300 font-bold">
          df[df[&apos;sales&apos;] &gt;= {minSalesFilter}].groupby(&apos;{groupByCol}&apos;)[&apos;{metricCol}&apos;].{aggFunc}()
        </div>
      </div>

      {/* Main Results Grid: Bar Chart + Summary Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual Bar Chart (7 cols) */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
            <span>Guruhlar bo‘yicha taqsimot</span>
            <span className="text-sky-400 font-bold">Jami: {totalValue}</span>
          </div>

          <div className="space-y-3 pt-1">
            {groupedResults.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                Filter natijasida hech qanday ma’lumot qolmadi. Filterni kamaytiring.
              </div>
            ) : (
              groupedResults.map((item) => {
                const pct = maxGroupValue > 0 ? (item.value / maxGroupValue) * 100 : 0;
                return (
                  <div key={item.group} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{item.group}</span>
                      <span className="text-sky-400 font-bold">
                        {item.value} {metricCol === "sales" && aggFunc !== "count" ? "$" : ""}
                        <span className="text-slate-500 text-[10px] ml-1.5 font-normal">
                          ({item.count} ta buyurtma)
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-3.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${Math.max(4, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Aggregation Table & Explanation (5 cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mb-2">
              <TableIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>Agregatsiya jadvali</span>
            </div>

            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase">
                  <th className="py-1.5 px-2">Guruh</th>
                  <th className="py-1.5 px-2 text-right">Qatorlar</th>
                  <th className="py-1.5 px-2 text-right">Natija</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {groupedResults.map((r) => (
                  <tr key={r.group} className="hover:bg-slate-800/40">
                    <td className="py-1.5 px-2 font-semibold text-white">{r.group}</td>
                    <td className="py-1.5 px-2 text-right text-slate-400">{r.count}</td>
                    <td className="py-1.5 px-2 text-right font-bold text-sky-300">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Educational Note */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-200">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Data Science tushunchasi:</span>
            </div>
            <p>
              GroupBy — bu <strong>Split-Apply-Combine</strong> tamoyilidir: avval ma’lumotlar
              guruhlarga ajratiladi (Split), so‘ng har biriga funksiya qo‘llaniladi (Apply),
              va yakunda bitta natijaviy DataFrame shakllantiriladi (Combine).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
