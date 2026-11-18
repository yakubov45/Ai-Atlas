"use client";

import React from "react";
import { RotateCcw, Plus, Minus } from "lucide-react";

export interface ParameterItemProps {
  id: string;
  name: string;
  symbol: string;
  min: number;
  max: number;
  step: number;
  value: number;
  defaultValue: number;
  description?: string;
  unit?: string;
  onChange: (value: number) => void;
  onReset?: () => void;
}

export function ParameterSlider({
  name,
  symbol,
  min,
  max,
  step,
  value,
  defaultValue,
  description,
  unit,
  onChange,
  onReset,
}: ParameterItemProps) {
  const isModified = Math.abs(value - defaultValue) > 1e-4;

  const handleStep = (direction: -1 | 1) => {
    const nextVal = Math.min(max, Math.max(min, value + direction * step));
    onChange(Number(nextVal.toFixed(4)));
  };

  return (
    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-violet-950/80 border border-violet-800/60 font-mono text-xs font-bold text-violet-300">
            {symbol}
          </span>
          <span className="text-xs font-medium text-slate-200">{name}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700/50">
            {value.toFixed(2)}
            {unit ? ` ${unit}` : ""}
          </span>
          {onReset && isModified && (
            <button
              onClick={onReset}
              title="Boshlang'ich qiymatga qaytarish"
              className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {description && (
        <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">{description}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleStep(-1)}
          disabled={value <= min}
          aria-label="Qiymatni kamaytirish"
          className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-violet-400 hover:accent-violet-300 focus:outline-none"
        />

        <button
          onClick={() => handleStep(1)}
          disabled={value >= max}
          aria-label="Qiymatni oshirish"
          className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 px-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
