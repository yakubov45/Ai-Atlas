"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Plus,
  Trash2,
  EyeOff,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Grid,
  Play,
  Pause,
  Sparkles,
  Sliders,
  HelpCircle,
  Activity,
} from "lucide-react";
import { compileExpression, EXPRESSION_CONSTANTS } from "@/lib/math/expression";
import { niceTicks, formatNumber, numericDerivative } from "@/lib/math/numeric";

export interface GraphFunction {
  id: string;
  expr: string;
  color: string;
  visible: boolean;
  name: string;
}

const PALETTE = [
  "#06b6d4", // cyan
  "#a855f7", // purple
  "#10b981", // emerald
  "#f59e0b", // amber
  "#f43f5e", // rose
  "#38bdf8", // sky
  "#ec4899", // pink
];

interface PresetItem {
  name: string;
  category: "ai" | "loss" | "math";
  functions: Array<{ expr: string; color: string; name: string }>;
  params?: Record<string, number>;
  description: string;
}

const PRESETS: PresetItem[] = [
  {
    name: "Sigmoid & Tanh (AI)",
    category: "ai",
    description: "Klassik chegaralovchi aktivatsiya funksiyalari (0..1 va -1..1 oraliqlari)",
    functions: [
      { expr: "sigmoid(x)", color: "#06b6d4", name: "Sigmoid" },
      { expr: "tanh(x)", color: "#a855f7", name: "Tanh" },
    ],
  },
  {
    name: "ReLU, GELU va Swish",
    category: "ai",
    description: "Zamonaviy Transformer va LLM modellarida ishlatiladigan nolinchiq aktivatsiyalar",
    functions: [
      { expr: "relu(x)", color: "#10b981", name: "ReLU" },
      { expr: "gelu(x)", color: "#38bdf8", name: "GELU" },
      { expr: "swish(x)", color: "#f59e0b", name: "Swish" },
    ],
  },
  {
    name: "MSE Yo‘qotish (Loss) Parabolasi",
    category: "loss",
    description: "Gradient tushish optimizatsiyasini o‘rganish uchun kvadratik xatolik: (x - w)^2",
    functions: [{ expr: "(x - w)^2", color: "#f43f5e", name: "MSE Loss" }],
    params: { w: 2 },
  },
  {
    name: "Kubik Polinom (Lokal Minimum)",
    category: "loss",
    description: "Lokal va global ekstremum nuqtalarini ko‘rish uchun x^3 - 3*x",
    functions: [{ expr: "x^3 - 3*x", color: "#ec4899", name: "Kubik" }],
  },
  {
    name: "Chiziqli Neyron: w*x + b",
    category: "ai",
    description: "Vazn (w) va bias (b) parametrlarining to‘g‘ri chiziq qiyaligi va siljishiga ta’siri",
    functions: [{ expr: "w * x + b", color: "#06b6d4", name: "Perceptron" }],
    params: { w: 1.5, b: 0.5 },
  },
  {
    name: "Gausian (Qo‘ng‘iroqsimon)",
    category: "math",
    description: "Normal taqsimot va ehtimollik zichligi profili: exp(-x^2)",
    functions: [{ expr: "exp(-x^2)", color: "#10b981", name: "Gauss" }],
  },
  {
    name: "Sinc To‘lqini: sin(x) / x",
    category: "math",
    description: "Raqamli signallarni qayta ishlash va Furye tahlilidagi asosiy to‘lqin",
    functions: [{ expr: "sinc(x)", color: "#a855f7", name: "Sinc" }],
  },
  {
    name: "So‘nuvchi Tebranish",
    category: "math",
    description: "Eksponentsial so‘nuvchi garmonik to‘lqin: exp(-0.2*x) * cos(2*x)",
    functions: [{ expr: "exp(-0.2*x) * cos(2*x)", color: "#38bdf8", name: "Tebranish" }],
  },
];

const INITIAL_FUNCTIONS: GraphFunction[] = [
  {
    id: "f1",
    expr: "sigmoid(x)",
    color: "#06b6d4",
    visible: true,
    name: "f_1(x)",
  },
  {
    id: "f2",
    expr: "tanh(x)",
    color: "#a855f7",
    visible: true,
    name: "f_2(x)",
  },
];

export function DesmosGrapher() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Math View Bounds: [xMin, xMax], [yMin, yMax]
  const [view, setView] = useState({
    xMin: -10,
    xMax: 10,
    yMin: -6,
    yMax: 6,
  });

  // Functions state
  const [functions, setFunctions] = useState<GraphFunction[]>(INITIAL_FUNCTIONS);

  // Dynamic parameters state (for free variables like a, b, w, etc.)
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const [animatingParams, setAnimatingParams] = useState<Set<string>>(new Set());

  // Interactive controls state
  const [showGrid, setShowGrid] = useState(true);
  const [showTangent, setShowTangent] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Mouse interaction state (Pan & Hover)
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ clientX: number; clientY: number; view: typeof view } | null>(null);
  const [hoverMath, setHoverMath] = useState<{ x: number; clientX: number; clientY: number } | null>(null);

  // Compile expressions and track errors + free variables
  const compiledState = useMemo(() => {
    const list = functions.map((fn) => {
      try {
        const compiled = compileExpression(fn.expr.trim());
        // Extract free variables (excluding 'x' and math constants)
        const freeVars = Array.from(compiled.identifiers).filter(
          (name) => name !== "x" && !(name in EXPRESSION_CONSTANTS)
        );
        return {
          id: fn.id,
          compiled,
          error: null,
          freeVars,
        };
      } catch (err) {
        return {
          id: fn.id,
          compiled: null,
          error: err instanceof Error ? err.message : String(err),
          freeVars: [],
        };
      }
    });

    // Collect all free variables
    const allFree = new Set<string>();
    list.forEach((item) => item.freeVars.forEach((v) => allFree.add(v)));

    return { list, allFree: Array.from(allFree) };
  }, [functions]);

  // Sync parameter keys when new free variables appear
  useEffect(() => {
    setParameters((prev) => {
      const next = { ...prev };
      let changed = false;
      compiledState.allFree.forEach((v) => {
        if (next[v] === undefined) {
          next[v] = 1;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [compiledState.allFree]);

  // Animate parameters if any are in animatingParams
  useEffect(() => {
    if (animatingParams.size === 0) return;
    let animId: number;
    let startTimestamp: number | null = null;

    const step = (ts: number) => {
      if (!startTimestamp) startTimestamp = ts;
      const elapsed = (ts - startTimestamp) / 1000;

      setParameters((prev) => {
        const next = { ...prev };
        animatingParams.forEach((v) => {
          // Smooth sine oscillation between -5 and 5
          next[v] = Number((Math.sin(elapsed * 1.5) * 5).toFixed(2));
        });
        return next;
      });

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [animatingParams]);

  // Toggle animation for a parameter
  const toggleParamAnimation = (paramName: string) => {
    setAnimatingParams((prev) => {
      const next = new Set(prev);
      if (next.has(paramName)) next.delete(paramName);
      else next.add(paramName);
      return next;
    });
  };

  // Canvas dimensions updater with devicePixelRatio for ultra-sharp rendering
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const w = Math.max(300, Math.floor(rect.width));
      const h = Math.max(300, Math.floor(rect.height));
      setDimensions({ width: w, height: h });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen]);

  // Draw coordinate plane and function curves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = dimensions;

    // Set canvas internal resolution to high DPI
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);

    const { xMin, xMax, yMin, yMax } = view;
    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;

    const toScreenX = (x: number) => ((x - xMin) / xSpan) * width;
    const toScreenY = (y: number) => height - ((y - yMin) / ySpan) * height;

    // Background clear
    ctx.fillStyle = "#030712"; // slate-950 deep dark
    ctx.fillRect(0, 0, width, height);

    // 1. Grid Lines
    if (showGrid) {
      const xTicks = niceTicks(xMin, xMax, Math.max(4, Math.floor(width / 90)));
      const yTicks = niceTicks(yMin, yMax, Math.max(4, Math.floor(height / 70)));

      // Sub-grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(51, 65, 85, 0.4)"; // slate-700 faint
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(148, 163, 184, 0.65)"; // slate-400

      // Vertical grid lines
      xTicks.forEach((xVal) => {
        const sx = toScreenX(xVal);
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx, height);
        ctx.stroke();

        // Label on X-axis or bottom
        if (Math.abs(xVal) > 1e-9) {
          const labelY = Math.min(Math.max(toScreenY(0) + 14, 16), height - 8);
          ctx.fillText(formatNumber(xVal, 2), sx + 4, labelY);
        }
      });

      // Horizontal grid lines
      yTicks.forEach((yVal) => {
        const sy = toScreenY(yVal);
        ctx.beginPath();
        ctx.moveTo(0, sy);
        ctx.lineTo(width, sy);
        ctx.stroke();

        // Label on Y-axis or left
        if (Math.abs(yVal) > 1e-9) {
          const labelX = Math.min(Math.max(toScreenX(0) + 6, 8), width - 35);
          ctx.fillText(formatNumber(yVal, 2), labelX, sy - 4);
        }
      });
    }

    // 2. Main Axes (X=0 and Y=0)
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.8)"; // crisp axis lines

    const zeroX = toScreenX(0);
    const zeroY = toScreenY(0);

    // X axis (horizontal)
    if (zeroY >= 0 && zeroY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, zeroY);
      ctx.lineTo(width, zeroY);
      ctx.stroke();
    }

    // Y axis (vertical)
    if (zeroX >= 0 && zeroX <= width) {
      ctx.beginPath();
      ctx.moveTo(zeroX, 0);
      ctx.lineTo(zeroX, height);
      ctx.stroke();
    }

    // Origin "0" label
    if (zeroX >= 0 && zeroX <= width && zeroY >= 0 && zeroY <= height) {
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = "rgba(226, 232, 240, 0.8)";
      ctx.fillText("0", zeroX + 6, zeroY + 14);
    }

    // 3. Render Each Active Function
    const numSamples = Math.min(1600, Math.max(400, Math.floor(width * 1.5)));

    functions.forEach((fn) => {
      if (!fn.visible) return;
      const stateItem = compiledState.list.find((s) => s.id === fn.id);
      if (!stateItem || !stateItem.compiled) return;

      const compiled = stateItem.compiled;
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = fn.color;
      ctx.shadowColor = fn.color;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      let started = false;
      let prevScreenY = 0;

      for (let i = 0; i <= numSamples; i++) {
        const x = xMin + (i / numSamples) * xSpan;
        const y = compiled.evaluate({ ...parameters, x });

        if (!Number.isFinite(y)) {
          started = false;
          continue;
        }

        const sx = toScreenX(x);
        const sy = toScreenY(y);

        // Detect vertical asymptote jumping (e.g. tan(x))
        if (started && Math.abs(sy - prevScreenY) > height * 1.8) {
          started = false;
        }

        if (!started) {
          ctx.moveTo(sx, sy);
          started = true;
        } else {
          ctx.lineTo(sx, sy);
        }
        prevScreenY = sy;
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow
    });

    // 4. Hover Inspector & Tangents
    if (hoverMath && hoverMath.x >= xMin && hoverMath.x <= xMax) {
      const hx = hoverMath.x;
      const hsx = toScreenX(hx);

      // Vertical guide line
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.beginPath();
      ctx.moveTo(hsx, 0);
      ctx.lineTo(hsx, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Intersections for each visible function
      functions.forEach((fn) => {
        if (!fn.visible) return;
        const stateItem = compiledState.list.find((s) => s.id === fn.id);
        if (!stateItem || !stateItem.compiled) return;

        const y = stateItem.compiled.evaluate({ ...parameters, x: hx });
        if (!Number.isFinite(y)) return;
        const hsy = toScreenY(y);

        if (hsy >= -20 && hsy <= height + 20) {
          // Tangent line if enabled
          if (showTangent) {
            const fAt = (val: number) => stateItem.compiled!.evaluate({ ...parameters, x: val });
            const slope = numericDerivative(fAt, hx);
            if (Number.isFinite(slope)) {
              ctx.lineWidth = 1.2;
              ctx.strokeStyle = `${fn.color}aa`;
              ctx.setLineDash([2, 3]);

              // Line: y - y0 = slope * (x - x0)
              const tanX1 = xMin;
              const tanY1 = y + slope * (tanX1 - hx);
              const tanX2 = xMax;
              const tanY2 = y + slope * (tanX2 - hx);

              ctx.beginPath();
              ctx.moveTo(toScreenX(tanX1), toScreenY(tanY1));
              ctx.lineTo(toScreenX(tanX2), toScreenY(tanY2));
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }

          // Outer glowing ring
          ctx.fillStyle = fn.color;
          ctx.beginPath();
          ctx.arc(hsx, hsy, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(hsx, hsy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
  }, [view, functions, parameters, compiledState, showGrid, showTangent, dimensions, hoverMath]);

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      view: { ...view },
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const mathX = view.xMin + (screenX / rect.width) * (view.xMax - view.xMin);

    setHoverMath({
      x: mathX,
      clientX: e.clientX - rect.left,
      clientY: e.clientY - rect.top,
    });

    if (isDragging && dragStartRef.current) {
      const dx = e.clientX - dragStartRef.current.clientX;
      const dy = e.clientY - dragStartRef.current.clientY;

      const xSpan = dragStartRef.current.view.xMax - dragStartRef.current.view.xMin;
      const ySpan = dragStartRef.current.view.yMax - dragStartRef.current.view.yMin;

      const mathDx = (dx / rect.width) * xSpan;
      const mathDy = (dy / rect.height) * ySpan;

      setView({
        xMin: dragStartRef.current.view.xMin - mathDx,
        xMax: dragStartRef.current.view.xMax - mathDx,
        yMin: dragStartRef.current.view.yMin + mathDy,
        yMax: dragStartRef.current.view.yMax + mathDy,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    dragStartRef.current = null;
    setHoverMath(null);
  };

  // Zooming with Wheel
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const factor = e.deltaY < 0 ? 0.85 : 1.15; // zoom in or out

      setView((prev) => {
        const xSpan = prev.xMax - prev.xMin;
        const ySpan = prev.yMax - prev.yMin;

        // Current math coordinates at cursor
        const mouseMathX = prev.xMin + (mouseX / rect.width) * xSpan;
        const mouseMathY = prev.yMax - (mouseY / rect.height) * ySpan;

        const newXSpan = xSpan * factor;
        const newYSpan = ySpan * factor;

        // Bounds check
        if (newXSpan < 0.001 || newXSpan > 100000) return prev;

        const newXMin = mouseMathX - (mouseX / rect.width) * newXSpan;
        const newXMax = newXMin + newXSpan;
        const newYMin = mouseMathY - (1 - mouseY / rect.height) * newYSpan;
        const newYMax = newYMin + newYSpan;

        return { xMin: newXMin, xMax: newXMax, yMin: newYMin, yMax: newYMax };
      });
    },
    []
  );

  // Discrete zoom controls
  const zoomIn = () => {
    setView((prev) => {
      const cx = (prev.xMin + prev.xMax) / 2;
      const cy = (prev.yMin + prev.yMax) / 2;
      const halfW = ((prev.xMax - prev.xMin) * 0.75) / 2;
      const halfH = ((prev.yMax - prev.yMin) * 0.75) / 2;
      return { xMin: cx - halfW, xMax: cx + halfW, yMin: cy - halfH, yMax: cy + halfH };
    });
  };

  const zoomOut = () => {
    setView((prev) => {
      const cx = (prev.xMin + prev.xMax) / 2;
      const cy = (prev.yMin + prev.yMax) / 2;
      const halfW = ((prev.xMax - prev.xMin) * 1.33) / 2;
      const halfH = ((prev.yMax - prev.yMin) * 1.33) / 2;
      return { xMin: cx - halfW, xMax: cx + halfW, yMin: cy - halfH, yMax: cy + halfH };
    });
  };

  const resetView = () => {
    setView({ xMin: -10, xMax: 10, yMin: -6, yMax: 6 });
  };

  // Add new expression
  const addFunction = () => {
    const nextIdx = functions.length + 1;
    const color = PALETTE[(functions.length) % PALETTE.length]!;
    setFunctions((prev) => [
      ...prev,
      {
        id: `f_${Date.now()}`,
        expr: "x^2",
        color,
        visible: true,
        name: `f_${nextIdx}(x)`,
      },
    ]);
  };

  // Remove expression
  const removeFunction = (id: string) => {
    if (functions.length <= 1) return;
    setFunctions((prev) => prev.filter((f) => f.id !== id));
  };

  // Update expression text
  const updateExpr = (id: string, text: string) => {
    setFunctions((prev) => prev.map((f) => (f.id === id ? { ...f, expr: text } : f)));
  };

  // Toggle visibility
  const toggleVisibility = (id: string) => {
    setFunctions((prev) => prev.map((f) => (f.id === id ? { ...f, visible: !f.visible } : f)));
  };

  // Apply preset
  const applyPreset = (preset: PresetItem) => {
    const newFns: GraphFunction[] = preset.functions.map((f, i) => ({
      id: `p_${Date.now()}_${i}`,
      expr: f.expr,
      color: f.color,
      visible: true,
      name: f.name,
    }));
    setFunctions(newFns);
    if (preset.params) {
      setParameters((prev) => ({ ...prev, ...preset.params }));
    }
  };

  // Hovered coordinates calculation for readout HUD
  const hoverValues = useMemo(() => {
    if (!hoverMath) return null;
    const xVal = hoverMath.x;
    const results = functions
      .filter((f) => f.visible)
      .map((f) => {
        const item = compiledState.list.find((s) => s.id === f.id);
        if (!item || !item.compiled) return null;
        const yVal = item.compiled.evaluate({ ...parameters, x: xVal });
        const slope = showTangent
          ? numericDerivative((x) => item.compiled!.evaluate({ ...parameters, x }), xVal)
          : null;
        return {
          id: f.id,
          name: f.name,
          color: f.color,
          y: yVal,
          slope,
        };
      })
      .filter(Boolean);

    return { x: xVal, results };
  }, [hoverMath, functions, compiledState, parameters, showTangent]);

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-0" : "relative"
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-violet-950">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Desmos Interaktiv Funksiyalar Grafigi
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300">
                Formula Plotter
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Istalgan formulangizni yozing: neyron tarmoq aktivatsiyalari, polinomlar va erkin parametrlar.
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTangent(!showTangent)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
              showTangent
                ? "bg-amber-950/60 border-amber-800 text-amber-300 shadow-sm"
                : "border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            title="Qiyalik (Hosilasi / Tangent line)ni ko‘rsatish"
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Qiyalik / Hosila</span>
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              showGrid
                ? "bg-slate-800 border-slate-700 text-cyan-400"
                : "border-slate-800 text-slate-500 hover:text-slate-200"
            }`}
            title="Koordinata to‘rini yoqish / o‘chirish"
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowHelp(!showHelp)}
            className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
              showHelp
                ? "bg-violet-950 border-violet-800 text-violet-300"
                : "border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
            title="Sintaksis va yordam"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title={isFullscreen ? "Kichraytirish" : "To‘liq ekran"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 border-b border-slate-800/60 bg-slate-900/30 overflow-x-auto text-xs no-scrollbar">
        <span className="flex items-center gap-1.5 text-slate-400 font-medium whitespace-nowrap mr-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Tayyor namunalar:
        </span>

        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-violet-900/40 hover:text-cyan-300 border border-slate-700/60 text-slate-300 whitespace-nowrap transition-all cursor-pointer text-[11px]"
            title={preset.description}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Workspace: Left Editor Sidebar + Right Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] h-[calc(100vh-14rem)] max-h-[820px]">
        {/* Left Column: Function Editor & Sliders */}
        <div className="lg:col-span-4 border-r border-slate-800/80 bg-slate-950/70 p-4 sm:p-5 overflow-y-auto space-y-6">
          {/* Functions Input List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                Funksiyalar ro‘yxati ({functions.length})
              </span>

              <button
                onClick={addFunction}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-700/50 text-xs font-medium transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Qo‘shish</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {functions.map((fn) => {
                const stateItem = compiledState.list.find((s) => s.id === fn.id);
                const hasError = Boolean(stateItem?.error);

                return (
                  <div
                    key={fn.id}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      {/* Color & Visibility Toggle */}
                      <button
                        onClick={() => toggleVisibility(fn.id)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                        style={{
                          backgroundColor: fn.visible ? `${fn.color}25` : "transparent",
                          borderColor: fn.color,
                          borderWidth: "1.5px",
                        }}
                        title={fn.visible ? "Grafikni yashirish" : "Grafikni ko‘rsatish"}
                      >
                        {fn.visible ? (
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: fn.color }}
                          />
                        ) : (
                          <EyeOff className="w-3 h-3 text-slate-500" />
                        )}
                      </button>

                      {/* Formula Input */}
                      <div className="relative flex-1">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 select-none">
                          y =
                        </span>
                        <input
                          type="text"
                          value={fn.expr}
                          onChange={(e) => updateExpr(fn.id, e.target.value)}
                          placeholder="masalan: sin(x), x^2 - 4"
                          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      {/* Delete button */}
                      {functions.length > 1 && (
                        <button
                          onClick={() => removeFunction(fn.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                          title="O‘chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Syntax error warning */}
                    {hasError && (
                      <div className="text-[11px] text-rose-400 bg-rose-950/30 border border-rose-900/40 rounded-md px-2 py-1 font-mono">
                        ⚠ {stateItem?.error}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Parameter Sliders (e.g. w, b, a, c) */}
          {compiledState.allFree.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Parametr slayderlari ({compiledState.allFree.length})
                </span>
                <span className="text-[11px] text-slate-500">Avtomatik aniqlandi</span>
              </div>

              <div className="space-y-3.5 bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80">
                {compiledState.allFree.map((param) => {
                  const val = parameters[param] ?? 1;
                  const isAnimating = animatingParams.has(param);

                  return (
                    <div key={param} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                            {param}
                          </span>
                          <span className="text-slate-400">=</span>
                          <span className="font-mono text-slate-200">{val.toFixed(2)}</span>
                        </div>

                        {/* Animation Play/Pause */}
                        <button
                          onClick={() => toggleParamAnimation(param)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                            isAnimating
                              ? "bg-emerald-950/80 border-emerald-800 text-emerald-300 animate-pulse"
                              : "border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                          title="Harakatlantirish (Oscillate)"
                        >
                          {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isAnimating ? "To‘xtatish" : "O‘ynash"}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-mono">-10</span>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          step={0.1}
                          value={val}
                          onChange={(e) =>
                            setParameters((prev) => ({
                              ...prev,
                              [param]: parseFloat(e.target.value),
                            }))
                          }
                          className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <span className="text-[10px] text-slate-500 font-mono">+10</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Syntax Help Drawer */}
          {showHelp && (
            <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-900/40 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-violet-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                Qo‘llab-quvvatlanadigan ifodalar:
              </p>
              <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-400 leading-relaxed">
                <li>
                  <strong className="text-cyan-300">Amallar:</strong> <code className="text-slate-200">+</code>,{" "}
                  <code className="text-slate-200">-</code>, <code className="text-slate-200">*</code>,{" "}
                  <code className="text-slate-200">/</code>, <code className="text-slate-200">^</code> (daraja)
                </li>
                <li>
                  <strong className="text-cyan-300">Ko‘paytirish:</strong> <code className="text-slate-200">2x</code>,{" "}
                  <code className="text-slate-200">2(x+1)</code>, <code className="text-slate-200">w*x + b</code>
                </li>
                <li>
                  <strong className="text-cyan-300">AI funksiyalari:</strong>{" "}
                  <code className="text-violet-300">sigmoid(x)</code>, <code className="text-violet-300">relu(x)</code>,{" "}
                  <code className="text-violet-300">gelu(x)</code>, <code className="text-violet-300">swish(x)</code>,{" "}
                  <code className="text-violet-300">tanh(x)</code>, <code className="text-violet-300">softplus(x)</code>
                </li>
                <li>
                  <strong className="text-cyan-300">Standart:</strong> <code className="text-slate-200">sin</code>,{" "}
                  <code className="text-slate-200">cos</code>, <code className="text-slate-200">exp</code>,{" "}
                  <code className="text-slate-200">ln</code>, <code className="text-slate-200">sqrt</code>,{" "}
                  <code className="text-slate-200">abs</code>, <code className="text-slate-200">sinc</code>
                </li>
                <li>
                  <strong className="text-cyan-300">O‘zgarmaslar:</strong> <code className="text-amber-300">pi</code>,{" "}
                  <code className="text-amber-300">e</code>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Coordinate Plane Canvas */}
        <div className="lg:col-span-8 relative bg-slate-950 flex flex-col items-center justify-center select-none overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
            className="w-full h-full cursor-crosshair touch-none"
          />

          {/* Floating Zoom & Pan Controls (Bottom-Right) */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-xl backdrop-blur-md">
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Kattalashtirish (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Kichraytirish (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Koordinata boshiga qaytarish (0, 0)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Coordinate Inspector Tooltip (Top-Left or Cursor) */}
          {hoverValues && hoverValues.results.length > 0 && (
            <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800/90 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs space-y-1.5 pointer-events-none min-w-[180px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[11px] text-slate-400 font-mono">
                <span>x = {formatNumber(hoverValues.x, 3)}</span>
                {showTangent && <span className="text-amber-400">f'(x) qiyalik</span>}
              </div>

              {hoverValues.results.map((res) => (
                <div key={res!.id} className="flex items-center justify-between gap-4 font-mono text-[11px]">
                  <span className="flex items-center gap-1.5 font-semibold" style={{ color: res!.color }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: res!.color }} />
                    {res!.name}:
                  </span>
                  <div className="text-right">
                    <span className="text-white font-medium">{formatNumber(res!.y, 4)}</span>
                    {res!.slope !== null && (
                      <span className="ml-2 text-amber-300 font-normal">
                        ({formatNumber(res!.slope, 2)})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subtle instructions watermark on canvas */}
          <div className="absolute bottom-4 left-4 text-[10px] text-slate-600 font-mono pointer-events-none hidden sm:block">
            Sichqoncha bilan suring (Drag) • G‘ildirakcha bilan kattalashtiring (Zoom)
          </div>
        </div>
      </div>
    </div>
  );
}
