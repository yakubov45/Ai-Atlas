"use client";

import React, { useState, useRef } from "react";
import { Maximize2, Minimize2, RotateCcw, AlertTriangle } from "lucide-react";
import { SyntheticBadge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { uz } from "@/i18n/dictionaries/uz";
import type { ContentStatus } from "@/lib/content/schema";

export interface VisualizationContainerProps {
  title: string;
  description?: string;
  status?: ContentStatus;
  synthetic?: boolean;
  onReset?: () => void;
  children: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
}

export function VisualizationContainer({
  title,
  description,
  status = "draft",
  synthetic = false,
  onReset,
  children,
  controls,
  className = "",
}: VisualizationContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      ref={containerRef}
      className={`border border-slate-800 rounded-2xl bg-slate-950/80 shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none bg-slate-950 h-screen w-screen"
          : `relative w-full ${className}`
      }`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center gap-2.5 min-w-0">
          <h3 className="font-semibold text-slate-100 text-sm sm:text-base truncate">{title}</h3>
          <StatusBadge status={status} />
          {synthetic && <SyntheticBadge />}
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              title={uz.common.reset}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{uz.common.reset}</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            title={isFullscreen ? uz.lab.exitFullscreen : uz.lab.fullscreen}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Synthetic Data Disclaimer Banner */}
      {synthetic && (
        <div className="bg-amber-950/30 border-b border-amber-900/40 px-5 py-1.5 flex items-center gap-2 text-xs text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{uz.common.syntheticNote}</span>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="flex-1 min-h-[380px] sm:min-h-[460px] relative bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 flex flex-col">
        {children}
      </div>

      {/* Controls & Description Drawer */}
      {(controls || description) && (
        <div className="border-t border-slate-800/80 bg-slate-900/40 px-5 py-3.5 text-xs text-slate-300 space-y-3">
          {controls && <div>{controls}</div>}
          {description && (
            <p className="text-slate-400 leading-relaxed text-[11px] sm:text-xs">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}
