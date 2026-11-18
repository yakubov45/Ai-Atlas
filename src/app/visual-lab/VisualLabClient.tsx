"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Boxes, Play, Eye, Calculator } from "lucide-react";
import type { VisualizationInstance } from "@/lib/content/types";
import { listVisualizationModules } from "@/lib/visualizations/registry";
import { parseVisualizationConfig } from "@/lib/visualizations/validation";
import { PlannedModuleCard } from "@/components/visualizations/PlannedModuleCard";
import { VisualizationContainer } from "@/components/visualizations/VisualizationContainer";
import { RenderVisualization } from "@/components/visualizations/loaders";
import { DesmosGrapher } from "@/components/visualizations/DesmosGrapher";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge, SyntheticBadge } from "@/components/ui/Badge";
import { uz } from "@/i18n/dictionaries/uz";

export interface VisualLabClientProps {
  instances: readonly VisualizationInstance[];
}

export function VisualLabClient({ instances }: { instances: readonly VisualizationInstance[] }) {
  const [activeTab, setActiveTab] = useState<"grapher" | "instances" | "modules">("grapher");
  const modules = listVisualizationModules();

  return (
    <div className="space-y-8">
      {/* Top Tabs: Desmos Grapher vs Content Instances vs Module Registry */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4 text-xs">
        <button
          onClick={() => setActiveTab("grapher")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
            activeTab === "grapher"
              ? "bg-violet-600 text-white shadow-md shadow-violet-950"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-cyan-300" />
          <span>{uz.lab.grapher}</span>
        </button>

        <button
          onClick={() => setActiveTab("instances")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
            activeTab === "instances"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>{uz.lab.instances} ({instances.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("modules")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
            activeTab === "modules"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>{uz.lab.modules} ({modules.length})</span>
        </button>
      </div>

      {/* Tab: Desmos Graphing Calculator */}
      {activeTab === "grapher" && (
        <div className="space-y-4">
          <DesmosGrapher />
        </div>
      )}

      {/* Tab: Content Instances */}
      {activeTab === "instances" && (
        <div className="space-y-12">
          {instances.length > 0 ? (
            instances.map((viz) => {
              const parsed = parseVisualizationConfig(viz.type, viz.config);
              return (
                <div key={viz.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/visual-lab/${viz.id}`}
                        className="text-base sm:text-lg font-bold text-slate-100 hover:text-cyan-400 transition-colors"
                      >
                        {viz.title}
                      </Link>
                      <StatusBadge status={viz.status} />
                      {viz.synthetic && <SyntheticBadge />}
                    </div>

                    <Link
                      href={`/visual-lab/${viz.id}`}
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{uz.lab.fullscreen}</span>
                    </Link>
                  </div>

                  {parsed.ok ? (
                    <VisualizationContainer
                      title={viz.title}
                      description={viz.description}
                      status={viz.status}
                      synthetic={viz.synthetic}
                    >
                      <RenderVisualization parsed={parsed.value} />
                    </VisualizationContainer>
                  ) : (
                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300">
                      <p className="font-semibold">{uz.lab.errorTitle}</p>
                      <ul className="list-disc list-inside mt-1 text-rose-400">
                        {parsed.errors.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <EmptyState
              icon={Boxes}
              title={uz.lab.noInstancesTitle}
              description={uz.lab.noInstancesBody}
            />
          )}
        </div>
      )}

      {/* Tab: Modules & Architecture Roadmap */}
      {activeTab === "modules" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <PlannedModuleCard key={mod.type} module={mod} />
          ))}
        </div>
      )}
    </div>
  );
}
