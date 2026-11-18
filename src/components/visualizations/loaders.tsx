"use client";

import React, { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { AlertTriangle } from "lucide-react";
import type { ParsedVisualizationConfig } from "@/lib/visualizations/validation";
import { uz } from "@/i18n/dictionaries/uz";

// Dynamic imports for heavy interactive modules
const DynamicFlowDiagram = dynamic(
  () => import("./FlowDiagram").then((mod) => mod.FlowDiagram),
  {
    loading: () => <VisualizationSkeleton />,
    ssr: false,
  },
);

const DynamicFunctionPlot = dynamic(
  () => import("./FunctionPlot").then((mod) => mod.FunctionPlot),
  {
    loading: () => <VisualizationSkeleton />,
    ssr: false,
  },
);

const DynamicGradientDescentPlot = dynamic(
  () => import("./GradientDescentPlot").then((mod) => mod.GradientDescentPlot),
  {
    loading: () => <VisualizationSkeleton />,
    ssr: false,
  },
);

const DynamicNeuralNetworkExplorer = dynamic(
  () => import("./NeuralNetworkExplorer").then((mod) => mod.NeuralNetworkExplorer),
  {
    loading: () => <VisualizationSkeleton />,
    ssr: false,
  },
);

const DynamicAttentionExplorer = dynamic(
  () => import("./AttentionExplorer").then((mod) => mod.AttentionExplorer),
  {
    loading: () => <VisualizationSkeleton />,
    ssr: false,
  },
);

const DynamicCosineSimilarityExplorer = dynamic(
  () => import("./CosineSimilarityExplorer").then((mod) => mod.CosineSimilarityExplorer),
  {
    loading: () => <VisualizationSkeleton />,
    ssr: false,
  },
);

const DynamicRagPipelineExplorer = dynamic(
  () => import("./RagPipelineExplorer").then((mod) => mod.RagPipelineExplorer),
  {
    loading: () => <VisualizationSkeleton />,
    ssr: false,
  },
);

export function VisualizationSkeleton() {
  return (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center bg-slate-950/50">
      <div className="flex flex-col items-center gap-2 text-slate-500 text-xs">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <span>{uz.lab.loading}</span>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class VisualizationErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="p-8 text-center text-xs text-rose-400 bg-rose-950/20 border border-rose-900/40 rounded-xl my-4">
          <AlertTriangle className="w-5 h-5 mx-auto mb-2 text-rose-400" />
          <p className="font-semibold">{uz.lab.errorTitle}</p>
          <p className="text-slate-400 mt-1">{this.state.error?.message ?? uz.lab.errorBody}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function RenderVisualization({
  parsed,
  className = "",
}: {
  parsed: ParsedVisualizationConfig;
  className?: string;
}) {
  return (
    <VisualizationErrorBoundary>
      {parsed.type === "flow-diagram" && (
        <DynamicFlowDiagram config={parsed.config} className={className} />
      )}
      {parsed.type === "function-plot" && (
        <DynamicFunctionPlot config={parsed.config} className={className} />
      )}
      {parsed.type === "gradient-descent" && (
        <DynamicGradientDescentPlot config={parsed.config} className={className} />
      )}
      {parsed.type === "neural-network" && (
        <DynamicNeuralNetworkExplorer className={className} />
      )}
      {parsed.type === "attention-matrix" && (
        <DynamicAttentionExplorer
          initialMode={parsed.config.defaultMode}
          className={className}
        />
      )}
      {parsed.type === "embedding-space" && (
        <DynamicCosineSimilarityExplorer className={className} />
      )}
      {parsed.type === "rag-pipeline" && (
        <DynamicRagPipelineExplorer className={className} />
      )}
    </VisualizationErrorBoundary>
  );
}
