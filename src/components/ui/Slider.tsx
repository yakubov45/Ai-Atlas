import React from "react";

export interface SliderProps {
  id?: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (val: number) => string;
  description?: string;
  unit?: string;
}

export function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue = (v) => v.toString(),
  description,
  unit,
}: SliderProps) {
  const inputId = id ?? `slider-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={inputId} className="font-medium text-slate-300">
          {label}
        </label>
        <span className="font-mono text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 text-[11px]">
          {formatValue(value)} {unit ? <span className="text-slate-400">{unit}</span> : null}
        </span>
      </div>

      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
      />

      {description && <p className="text-[11px] text-slate-400 leading-tight">{description}</p>}
    </div>
  );
}
