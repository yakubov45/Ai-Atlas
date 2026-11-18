import React from "react";
import { getContentRepository } from "@/lib/content/repository";
import { parseVisualizationConfig } from "@/lib/visualizations/validation";
import { VisualizationContainer } from "@/components/visualizations/VisualizationContainer";
import { RenderVisualization } from "@/components/visualizations/loaders";
import { VisualizationRenderer } from "@/components/visualizations/VisualizationRenderer";
import { AlertTriangle } from "lucide-react";

export function Visualization({ id }: { id: string }) {
  const repo = getContentRepository();
  const viz = repo.getVisualization(id);

  if (!viz) {
    return (
      <div className="p-4 my-4 rounded-xl border border-rose-900/50 bg-rose-950/20 text-rose-300 text-xs flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        <span>Vizualizatsiya topilmadi: {id}</span>
      </div>
    );
  }

  // Check for hybrid Manim + interactive modules
  if (
    id === "function-explorer" ||
    id === "gradient-descent-1d" ||
    id === "gradient-descent" ||
    id === "neural-network-explorer" ||
    id === "neural-network"
  ) {
    return (
      <div className="my-8">
        <VisualizationRenderer
          id={id}
          type={viz.type}
          title={viz.title}
          description={viz.description}
        />
      </div>
    );
  }

  const parsed = parseVisualizationConfig(viz.type, viz.config);
  if (!parsed.ok) {
    return (
      <div className="p-4 my-4 rounded-xl border border-rose-900/50 bg-rose-950/20 text-rose-300 text-xs">
        <div className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Vizualizatsiya konfiguratsiyasida xatolik ({id}):</span>
        </div>
        <ul className="list-disc list-inside mt-2 text-[11px] text-rose-400">
          {parsed.errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="my-6">
      <VisualizationContainer
        title={viz.title}
        description={viz.description}
        status={viz.status}
        synthetic={viz.synthetic}
      >
        <RenderVisualization parsed={parsed.value} />
      </VisualizationContainer>
    </div>
  );
}
