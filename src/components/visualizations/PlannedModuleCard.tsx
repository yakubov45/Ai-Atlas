import React from "react";
import { CheckCircle2, Circle, Clock, Workflow, LineChart, TrendingDown, Network, Boxes, Grid, ScatterChart, Database } from "lucide-react";
import type { VisualizationModuleMeta } from "@/lib/visualizations/registry";
import { Badge } from "@/components/ui/Badge";
import { uz } from "@/i18n/dictionaries/uz";

const ICON_MAP = {
  workflow: Workflow,
  "line-chart": LineChart,
  "trending-down": TrendingDown,
  network: Network,
  boxes: Boxes,
  grid: Grid,
  scatter: ScatterChart,
  database: Database,
};

export function PlannedModuleCard({ module }: { module: VisualizationModuleMeta }) {
  const Icon = ICON_MAP[module.icon] || Boxes;

  const statusMap = {
    implemented: { label: uz.lab.status.implemented, variant: "emerald" as const },
    partial: { label: uz.lab.status.partial, variant: "cyan" as const },
    planned: { label: uz.lab.status.planned, variant: "default" as const },
  };

  const statusInfo = statusMap[module.status];

  return (
    <div className="flex flex-col border border-slate-800 rounded-2xl bg-slate-900/60 p-6 shadow-sm hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-950/50 border border-violet-800/40 flex items-center justify-center text-violet-400">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 text-sm sm:text-base">{module.title}</h4>
            <span className="font-mono text-[11px] text-slate-500">{module.type}</span>
          </div>
        </div>
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-1">{module.summary}</p>

      {/* Capabilities Checklist */}
      <div className="border-t border-slate-800/60 pt-4 space-y-2">
        <h5 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
          {uz.lab.capabilities}
        </h5>
        <ul className="space-y-1.5 text-xs">
          {module.capabilities.map((cap, i) => (
            <li key={i} className="flex items-center gap-2">
              {cap.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <span className={cap.done ? "text-slate-300" : "text-slate-500"}>{cap.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {module.status === "planned" && (
        <div className="mt-5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>{uz.lab.plannedNotice}</span>
        </div>
      )}
    </div>
  );
}
