"use client";

import React, { useState } from "react";
import { ManimVideoPlayer } from "./ManimVideoPlayer";
import { FunctionExplorer } from "./FunctionExplorer";
import { GradientDescent } from "./GradientDescent";
import { NeuralNetworkExplorer } from "./NeuralNetworkExplorer";
import { AttentionExplorer } from "./AttentionExplorer";
import { CosineSimilarityExplorer } from "./CosineSimilarityExplorer";
import { RagPipelineExplorer } from "./RagPipelineExplorer";
import { PythonBasicsLab } from "./PythonBasicsLab";
import { PythonFunctionsLab } from "./PythonFunctionsLab";
import { FlowDiagram } from "./FlowDiagram";
import { FunctionPlot } from "./FunctionPlot";
import { GradientDescentPlot } from "./GradientDescentPlot";
import {
  Sparkles,
  Sliders,
  Film,
  Maximize2,
  Minimize2,
} from "lucide-react";
import type { ParsedVisualizationConfig } from "@/lib/visualizations/validation";

export interface VisualizationRendererProps {
  id: string;
  type?: string;
  title: string;
  description?: string;
  videoSrc?: string;
  videoPoster?: string;
  parsedConfig?: ParsedVisualizationConfig;
  initialTab?: "interactive" | "video" | "theory";
  className?: string;
}

export function VisualizationRenderer({
  id,
  type,
  title,
  description,
  videoSrc,
  videoPoster,
  parsedConfig,
  initialTab = "interactive",
  className = "",
}: VisualizationRendererProps) {
  // Automatic video path lookup if not explicitly given
  const resolvedVideoSrc = useMemoVideoSrc(id, videoSrc);

  const [activeTab, setActiveTab] = useState<"interactive" | "video" | "theory">(
    resolvedVideoSrc && initialTab === "video" ? "video" : "interactive"
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Render the appropriate interactive engine based on id or type
  const renderInteractiveEngine = () => {
    // 0. Strict Top Guard: Never display mathematical AI graphs, derivatives or activation functions for Python topics
    const lowerTitle = title.toLowerCase();
    const isPythonTopic =
      id.includes("python") ||
      id.includes("py-") ||
      id === "python-basics-lab" ||
      id === "python-basics" ||
      type === "python-basics" ||
      type?.includes("python") ||
      lowerTitle.includes("python") ||
      lowerTitle.includes("dasturlash asoslari");

    if (isPythonTopic) {
      if (
        id === "python-functions-lab" ||
        id === "functions" ||
        id.includes("function") ||
        id.includes("recursion") ||
        id.includes("factorial") ||
        lowerTitle.includes("funksiya")
      ) {
        return <PythonFunctionsLab />;
      }
      return <PythonBasicsLab />;
    }
    if (
      id === "python-functions-lab" ||
      id === "functions" ||
      id === "factorial-call-stack" ||
      type === "python-functions"
    ) {
      return <PythonFunctionsLab />;
    }
    if (id === "function-explorer") {
      return <FunctionExplorer />;
    }
    if (id === "gradient-descent" || id === "gradient-descent-1d") {
      return <GradientDescent />;
    }
    if (id === "neural-network" || id === "neural-network-explorer") {
      return <NeuralNetworkExplorer />;
    }
    if (
      id === "self-attention-explorer" ||
      id === "attention-explorer" ||
      id === "attention-matrix"
    ) {
      return <AttentionExplorer />;
    }
    if (
      id === "cosine-similarity-explorer" ||
      id === "cosine-similarity" ||
      id === "embedding-space"
    ) {
      return <CosineSimilarityExplorer />;
    }
    if (
      id === "rag-sandbox-explorer" ||
      id === "rag-pipeline"
    ) {
      return <RagPipelineExplorer />;
    }

    // Fall back to parsedConfig from legacy flow or function plots
    if (parsedConfig) {
      if (parsedConfig.type === "flow-diagram") {
        return <FlowDiagram config={parsedConfig.config} />;
      }
      if (parsedConfig.type === "function-plot") {
        return <FunctionPlot config={parsedConfig.config} />;
      }
      if (parsedConfig.type === "gradient-descent") {
        return <GradientDescentPlot config={parsedConfig.config} />;
      }
      if (parsedConfig.type === "attention-matrix") {
        return <AttentionExplorer initialMode={parsedConfig.config.defaultMode} />;
      }
      if (parsedConfig.type === "embedding-space") {
        return <CosineSimilarityExplorer />;
      }
      if (parsedConfig.type === "rag-pipeline") {
        return <RagPipelineExplorer />;
      }
    }

    // Strict guard for Python Foundation: Never show mathematical gradient or activation graphs
    if (
      id.includes("python") ||
      title.toLowerCase().includes("python") ||
      type?.includes("python")
    ) {
      if (
        id.includes("function") ||
        title.toLowerCase().includes("funksiya") ||
        type?.includes("function")
      ) {
        return <PythonFunctionsLab />;
      }
      return <PythonBasicsLab />;
    }

    // Default fallbacks by type
    if (type === "python-basics") return <PythonBasicsLab />;
    if (type === "python-functions") return <PythonFunctionsLab />;
    if (type === "function-plot") return <FunctionExplorer />;
    if (type === "gradient-descent") return <GradientDescent />;
    if (type === "neural-network") return <NeuralNetworkExplorer />;
    if (type === "attention-matrix") return <AttentionExplorer />;
    if (type === "embedding-space") return <CosineSimilarityExplorer />;
    if (type === "rag-pipeline") return <RagPipelineExplorer />;

    return <GradientDescent />;
  };

  return (
    <div
      className={`relative w-full rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl p-4 sm:p-6 flex flex-col gap-5 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none bg-slate-950 overflow-y-auto p-6" : ""
      } ${className}`}
    >
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-800/40">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Navigation Tabs (Interactive vs Video vs Theory) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "interactive"
                ? "bg-violet-600 text-white shadow-md shadow-violet-900/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interaktiv Simulyator</span>
          </button>

          {resolvedVideoSrc && (
            <button
              onClick={() => setActiveTab("video")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "video"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>Manim Video</span>
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? "Kichik ekranga qaytish" : "To'liq ekran"}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ml-1"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="w-full">
        {activeTab === "interactive" && (
          <div className="w-full transition-opacity duration-300">
            {renderInteractiveEngine()}
          </div>
        )}

        {activeTab === "video" && resolvedVideoSrc && (
          <div className="w-full max-w-6xl mx-auto transition-opacity duration-300">
            <ManimVideoPlayer
              src={resolvedVideoSrc}
              poster={videoPoster}
              title={`${title} — Manim Animatsiyasi`}
              description="Ushbu animatsiya Manim Community Edition yordamida matematik qonuniyatlarni ko'rsatish maqsadida yaratilgan."
              autoPlay={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function useMemoVideoSrc(id: string, customSrc?: string): string | undefined {
  if (customSrc) return customSrc;
  // Python lessons have no mathematical calculus Manim video
  if (id.startsWith("python-") || id.includes("python")) return undefined;
  if (id === "function-explorer") return "/animations/functions/function_explorer.mp4";
  if (id.includes("gradient-descent")) return "/animations/gradient-descent/gradient_descent.mp4";
  if (id.includes("neural-network")) return "/animations/neural-network/neural_network.mp4";
  if (id.includes("attention")) return "/animations/attention/self_attention.mp4";
  if (id.includes("cosine") || id.includes("embedding")) return "/animations/vectors/cosine_similarity.mp4";
  return undefined;
}
