"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Eye,
  FileSpreadsheet,
  Filter,
  Flame,
  FlaskConical,
  GitBranch,
  Layers,
  LineChart,
  Network,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  Server,
  ShieldAlert,
  Sliders,
  Sparkles,
  Split,
  Table,
  Target,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react";
import { FormulaDisplay } from "./FormulaDisplay";
import { ML_DS_PHASES } from "@/lib/curriculum/ml-ds";

export interface MlDsVisualLabsProps {
  initialPhaseId?: string;
  className?: string;
}

export function MlDsVisualLabs({
  initialPhaseId = "mlds-04",
  className = "",
}: MlDsVisualLabsProps) {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(initialPhaseId);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // ---------------------------------------------------------------------------
  // LAB 01: Kasbiy rollar xaritasi (AI Eng vs ML Eng vs Data Scientist)
  // ---------------------------------------------------------------------------
  const [p1Role, setP1Role] = useState<"ai" | "ml" | "ds">("ml");

  // ---------------------------------------------------------------------------
  // LAB 02: Python bajarilish trayektori & Xotira modeli
  // ---------------------------------------------------------------------------
  const [p2Step, setP2Step] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // LAB 03: SQL Transform Simulator
  // ---------------------------------------------------------------------------
  const [p3MinScore, setP3MinScore] = useState<number>(60);
  const [p3Group, setP3Group] = useState<"all" | "dept">("all");

  // ---------------------------------------------------------------------------
  // LAB 04: NumPy Shape & Broadcasting
  // ---------------------------------------------------------------------------
  const [p4ShapeA, setP4ShapeA] = useState<string>("3,1");
  const [p4ShapeB, setP4ShapeB] = useState<string>("1,4");

  // ---------------------------------------------------------------------------
  // LAB 05: Pandas Data Flow
  // ---------------------------------------------------------------------------
  const [p5Category, setP5Category] = useState<string>("all");
  const [p5MinAge, setP5MinAge] = useState<number>(20);

  // ---------------------------------------------------------------------------
  // LAB 06: Data Ingestion Pipeline
  // ---------------------------------------------------------------------------
  const [p6Source, setP6Source] = useState<"csv" | "json" | "api" | "db">("csv");

  // ---------------------------------------------------------------------------
  // LAB 07: Missing Values Laboratory
  // ---------------------------------------------------------------------------
  const [p7Strategy, setP7Strategy] = useState<"drop" | "mean" | "median">("mean");

  // ---------------------------------------------------------------------------
  // LAB 08: EDA Outlier & IQR
  // ---------------------------------------------------------------------------
  const [p8IqrMult, setP8IqrMult] = useState<number>(1.5);

  // ---------------------------------------------------------------------------
  // LAB 09: 2D Vektor va Matritsa Geometriyasi
  // ---------------------------------------------------------------------------
  const [p9Vx, setP9Vx] = useState<number>(3);
  const [p9Vy, setP9Vy] = useState<number>(2);
  const [p9Wx, setP9Wx] = useState<number>(1);
  const [p9Wy, setP9Wy] = useState<number>(4);

  // ---------------------------------------------------------------------------
  // LAB 10: Eigenvector & SVD Geometrik Lab
  // ---------------------------------------------------------------------------
  const [p10A, setP10A] = useState<number>(2.0);
  const [p10D, setP10D] = useState<number>(1.0);

  // ---------------------------------------------------------------------------
  // LAB 11: Derivative & Gradient Descent (L(w)=(w-3)^2)
  // ---------------------------------------------------------------------------
  const [p11W, setP11W] = useState<number>(0.0);
  const [p11Lr, setP11Lr] = useState<number>(0.1);
  const [p11History, setP11History] = useState<{ step: number; w: number; loss: number }[]>([
    { step: 0, w: 0.0, loss: 9.0 },
  ]);

  // ---------------------------------------------------------------------------
  // LAB 12: Probability Sampler & CLT
  // ---------------------------------------------------------------------------
  const [p12SampleSize, setP12SampleSize] = useState<number>(16);
  const [p12Trials, setP12Trials] = useState<number>(100);

  // ---------------------------------------------------------------------------
  // LAB 13: Confidence Interval Explorer
  // ---------------------------------------------------------------------------
  const [p13N, setP13N] = useState<number>(100);
  const [p13Confidence, setP13Confidence] = useState<number>(95);

  // ---------------------------------------------------------------------------
  // LAB 14: A/B Testing Simulator
  // ---------------------------------------------------------------------------
  const [p14ControlRate, setP14ControlRate] = useState<number>(10);
  const [p14TreatmentRate, setP14TreatmentRate] = useState<number>(12);
  const [p14SampleSize, setP14SampleSize] = useState<number>(2000);

  // ---------------------------------------------------------------------------
  // LAB 15: CUPED Variance Reduction
  // ---------------------------------------------------------------------------
  const [p15Rho, setP15Rho] = useState<number>(0.6);

  // ---------------------------------------------------------------------------
  // LAB 16: Leakage-Safe Preprocessing
  // ---------------------------------------------------------------------------
  const [p16Mode, setP16Mode] = useState<"safe" | "leaky">("safe");

  // ---------------------------------------------------------------------------
  // LAB 17: Linear Regression Loss Explorer
  // ---------------------------------------------------------------------------
  const [p17Slope, setP17Slope] = useState<number>(1.5);
  const [p17Intercept, setP17Intercept] = useState<number>(1.0);

  // ---------------------------------------------------------------------------
  // LAB 18: Classification Decision Boundary
  // ---------------------------------------------------------------------------
  const [p18Threshold, setP18Threshold] = useState<number>(0.5);

  // ---------------------------------------------------------------------------
  // LAB 19: Confusion Matrix & Metrics
  // ---------------------------------------------------------------------------
  const [p19Tp, setP19Tp] = useState<number>(45);
  const [p19Fp, setP19Fp] = useState<number>(5);
  const [p19Fn, setP19Fn] = useState<number>(10);
  const [p19Tn, setP19Tn] = useState<number>(140);

  // ---------------------------------------------------------------------------
  // LAB 20: K-Fold Visualizer
  // ---------------------------------------------------------------------------
  const [p20K, setP20K] = useState<number>(5);
  const [p20ActiveFold, setP20ActiveFold] = useState<number>(1);

  // ---------------------------------------------------------------------------
  // LAB 21: Bagging vs Boosting
  // ---------------------------------------------------------------------------
  const [p21Mode, setP21Mode] = useState<"bagging" | "boosting">("bagging");

  // ---------------------------------------------------------------------------
  // LAB 22: K-Means Stepper
  // ---------------------------------------------------------------------------
  const [p22Step, setP22Step] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // LAB 23: PCA Projection Explorer
  // ---------------------------------------------------------------------------
  const [p23Angle, setP23Angle] = useState<number>(35);

  // ---------------------------------------------------------------------------
  // LAB 24: Time Series Decomposition
  // ---------------------------------------------------------------------------
  const [p24Trend, setP24Trend] = useState<number>(2.0);
  const [p24SeasonAmp, setP24SeasonAmp] = useState<number>(5.0);

  // ---------------------------------------------------------------------------
  // LAB 25: Perceptron & MLP Diagram
  // ---------------------------------------------------------------------------
  const [p25X1, setP25X1] = useState<number>(1.0);
  const [p25X2, setP25X2] = useState<number>(-0.5);
  const [p25W1, setP25W1] = useState<number>(0.8);
  const [p25W2, setP25W2] = useState<number>(-1.2);
  const [p25Bias, setP25Bias] = useState<number>(0.2);
  const [p25Act, setP25Act] = useState<"relu" | "sigmoid">("relu");

  // ---------------------------------------------------------------------------
  // LAB 26: PyTorch Training Step Timeline
  // ---------------------------------------------------------------------------
  const [p26Step, setP26Step] = useState<number>(1);

  // ---------------------------------------------------------------------------
  // LAB 27: Convolution Kernel Scanner
  // ---------------------------------------------------------------------------
  const [p27KernelPos, setP27KernelPos] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // LAB 28: RNN vs Attention
  // ---------------------------------------------------------------------------
  const [p28Arch, setP28Arch] = useState<"rnn" | "attention">("attention");

  // ---------------------------------------------------------------------------
  // LAB 29: Self-Attention Matrix Explorer
  // ---------------------------------------------------------------------------
  const [p29Scale, setP29Scale] = useState<number>(2.0);

  // ---------------------------------------------------------------------------
  // LAB 30: Q-Learning Gridworld
  // ---------------------------------------------------------------------------
  const [p30AgentPos, setP30AgentPos] = useState<number>(0);
  const [p30RewardTotal, setP30RewardTotal] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // LAB 31: MLOps Lifecycle Explorer
  // ---------------------------------------------------------------------------
  const [p31PsiDrift, setP31PsiDrift] = useState<number>(0.12);

  // Filtered Phases list for navigation
  const filteredPhaseList = useMemo(() => {
    const q = searchFilter.trim().toLowerCase();
    return ML_DS_PHASES.filter((p) => {
      if (!q) return true;
      return (
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.visualizationDescription.toLowerCase().includes(q)
      );
    });
  }, [searchFilter]);

  const activePhase = useMemo(
    () => ML_DS_PHASES.find((p) => p.id === selectedPhaseId) ?? ML_DS_PHASES[3]!,
    [selectedPhaseId],
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Banner & Phase Selector Tabs */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>31 ta Interaktiv Vizual Laboratoriya (ML & Data Science)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-500/30">
                  31 / 31 Faol
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                NumPy broadcasting, K-Means stepper, SVD, Gradient Descent, A/B Testing, CUPED va barcha 31 fazaning jonli matematik simulyatsiyalari.
              </p>
            </div>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="31 laboratoriya ichidan qidiring..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Phase Pills Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {filteredPhaseList.map((p) => {
            const isSelected = p.id === selectedPhaseId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPhaseId(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-slate-950 font-bold border-emerald-500 shadow-sm"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                <span className="font-mono mr-1.5">{p.id.toUpperCase()}</span>
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Visual Lab Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
        {/* Lab Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                {activePhase.id.toUpperCase()} Lab
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {activePhase.title}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {activePhase.visualizationDescription}
            </h3>
            <p className="text-xs text-slate-400">
              Mini-loyiha: <span className="text-emerald-300 font-semibold">{activePhase.projectMilestone}</span>
            </p>
          </div>
        </div>

        {/* =========================================================================
            LAB 01: Kasbiy rollar xaritasi (AI vs ML vs DS)
           ========================================================================= */}
        {selectedPhaseId === "mlds-01" && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Kasbiy rolni tanlang:</span>
              {(["ai", "ml", "ds"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setP1Role(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    p1Role === r
                      ? "bg-emerald-600 border-emerald-500 text-slate-950"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  {r === "ai" ? "AI Engineer" : r === "ml" ? "ML Engineer" : "Data Scientist"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${p1Role === "ai" ? "bg-emerald-950/40 border-emerald-500 text-emerald-200" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                <div className="font-bold text-sm text-white">AI Engineer Focus</div>
                <p>LLM ilovalari, RAG arxitekturasi, Prompt/Agent tizimlari, API integratsiyasi va production orchestratorlar.</p>
                <div className="font-mono text-[11px] text-cyan-300">Stack: LangChain, LlamaIndex, OpenAI, FastAPI, Vector DB</div>
              </div>

              <div className={`p-4 rounded-xl border text-xs space-y-2 ${p1Role === "ml" ? "bg-emerald-950/40 border-emerald-500 text-emerald-200" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                <div className="font-bold text-sm text-white">ML Engineer Focus</div>
                <p>Model o‘qitish, Gradient Descent, Ensembles, PyTorch neyron tarmoqlar, feature pipeline va MLOps deployment.</p>
                <div className="font-mono text-[11px] text-emerald-300">Stack: PyTorch, Scikit-learn, XGBoost, Docker, MLflow</div>
              </div>

              <div className={`p-4 rounded-xl border text-xs space-y-2 ${p1Role === "ds" ? "bg-emerald-950/40 border-emerald-500 text-emerald-200" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                <div className="font-bold text-sm text-white">AI & Data Scientist Focus</div>
                <p>A/B test dizayni, statistik gipotezalar, CUPED dispersiya kamaytirish, EDA, SQL va biznes metric tahlillari.</p>
                <div className="font-mono text-[11px] text-amber-300">Stack: Pandas, Statsmodels, SQL, CUPED, SciPy, Matplotlib</div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LAB 02: Python Memory & Execution Trajectory
           ========================================================================= */}
        {selectedPhaseId === "mlds-02" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Qatorma-qator xotira holati (Stack vs Heap):</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={p2Step === 0}
                  onClick={() => setP2Step((s) => s - 1)}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 cursor-pointer"
                >
                  Orqaga
                </button>
                <button
                  type="button"
                  disabled={p2Step === 3}
                  onClick={() => setP2Step((s) => s + 1)}
                  className="px-3 py-1 rounded-lg bg-emerald-600 font-bold text-xs text-slate-950 disabled:opacity-40 cursor-pointer"
                >
                  Keyingi qadam ({p2Step + 1} / 4)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
                <div className={p2Step >= 0 ? "text-emerald-400 font-bold" : "text-slate-600"}>1: a = [10, 20]</div>
                <div className={p2Step >= 1 ? "text-amber-400 font-bold" : "text-slate-600"}>2: b = a          # Aliasing!</div>
                <div className={p2Step >= 2 ? "text-cyan-400 font-bold" : "text-slate-600"}>3: c = a.copy()   # Mustaqil nusxa</div>
                <div className={p2Step >= 3 ? "text-rose-400 font-bold" : "text-slate-600"}>4: b.append(30)   # a ham o'zgaradi!</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-white">Heap Xotira Manzillari:</div>
                <div className="font-mono text-[11px] text-slate-300">
                  <div>id(a) = 0x7FA1 (Qiymati: {p2Step >= 3 ? "[10, 20, 30]" : "[10, 20]"})</div>
                  <div>id(b) = {p2Step >= 1 ? "0x7FA1 (a bilan bir xil!)" : "Aniqlanmagan"}</div>
                  <div>id(c) = {p2Step >= 2 ? "0x98BC (Mustaqil xotira bloki: [10, 20])" : "Aniqlanmagan"}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-400">
                  {p2Step >= 3 ? "a is b -> True | a is c -> False" : "Kuzatish davom etmoqda..."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LAB 03: SQL Transform Simulator
           ========================================================================= */}
        {selectedPhaseId === "mlds-03" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">WHERE score &gt;=:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={p3MinScore}
                  onChange={(e) => setP3MinScore(Number(e.target.value))}
                  className="w-28 accent-emerald-500"
                />
                <span className="font-mono font-bold text-emerald-400">{p3MinScore}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Guruhlash:</span>
                <button
                  type="button"
                  onClick={() => setP3Group(p3Group === "all" ? "dept" : "all")}
                  className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  {p3Group === "all" ? "Barcha qatorlar" : "GROUP BY dept"}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
              SELECT {p3Group === "dept" ? "dept, COUNT(*), AVG(score)" : "*"} FROM users WHERE score &gt;= {p3MinScore} {p3Group === "dept" ? "GROUP BY dept" : ""};
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              Natija: {p3Group === "all" ? (
                <span>Filtrdan o‘tgan qatorlar soni: <strong className="text-emerald-400">{[85, 92, 55, 78, 64].filter((s) => s >= p3MinScore).length} ta</strong></span>
              ) : (
                <span>2 ta departament guruhi hisoblandi.</span>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            LAB 04: NumPy Shape & Broadcasting (PILOT LAB)
           ========================================================================= */}
        {selectedPhaseId === "mlds-04" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">A massiv shakli (shape):</label>
                <div className="flex items-center gap-2">
                  {(["3,1", "3,3", "1,4"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setP4ShapeA(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                        p4ShapeA === s
                          ? "bg-emerald-600 border-emerald-500 text-slate-950"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      ({s.replace(",", ", ")})
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">B massiv shakli (shape):</label>
                <div className="flex items-center gap-2">
                  {(["1,4", "3,4", "2,4"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setP4ShapeB(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                        p4ShapeB === s
                          ? "bg-emerald-600 border-emerald-500 text-slate-950"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      ({s.replace(",", ", ")})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Broadcasting Compatibility Checker */}
            {(() => {
              const [rA, cA] = p4ShapeA.split(",").map(Number);
              const [rB, cB] = p4ShapeB.split(",").map(Number);
              const canRow = rA === rB || rA === 1 || rB === 1;
              const canCol = cA === cB || cA === 1 || cB === 1;
              const isCompatible = canRow && canCol;
              const resR = Math.max(rA || 1, rB || 1);
              const resC = Math.max(cA || 1, cB || 1);

              return (
                <div className={`p-4 rounded-xl border text-xs space-y-3 ${isCompatible ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200" : "bg-rose-950/30 border-rose-500/40 text-rose-200"}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">
                      {isCompatible ? "✅ Broadcasting Muvaffaqiyatli Mos Keldi!" : "❌ ValueError: operands could not be broadcast together"}
                    </span>
                    <span className="font-mono text-xs">
                      Trailing check: ({rA}, {cA}) vs ({rB}, {cB})
                    </span>
                  </div>

                  {isCompatible ? (
                    <div>
                      Natijaviy matritsa shakli: <strong className="font-mono text-emerald-400 text-sm">({resR}, {resC})</strong>. NumPy xotirada nusxa olmasdan virtual qator va ustunlarni kengaytirdi.
                    </div>
                  ) : (
                    <div>
                      O‘lchamlar mos kelmadi: {rA} != {rB} va hech biri 1 ga teng emas.
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-300">
                    <div># Python tekshiruvi:</div>
                    <div>import numpy as np</div>
                    <div>A = np.zeros(({p4ShapeA.replace(",", ", ")}))</div>
                    <div>B = np.zeros(({p4ShapeB.replace(",", ", ")}))</div>
                    <div>C = A + B # {isCompatible ? `OK -> shape: (${resR}, ${resC})` : "Raises ValueError!"}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            LAB 09: Vector & Matrix Geometry
           ========================================================================= */}
        {selectedPhaseId === "mlds-09" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400">Vektor v_x:</label>
                <input type="number" value={p9Vx} onChange={(e) => setP9Vx(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white" />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Vektor v_y:</label>
                <input type="number" value={p9Vy} onChange={(e) => setP9Vy(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white" />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Vektor w_x:</label>
                <input type="number" value={p9Wx} onChange={(e) => setP9Wx(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white" />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Vektor w_y:</label>
                <input type="number" value={p9Wy} onChange={(e) => setP9Wy(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white" />
              </div>
            </div>

            {(() => {
              const dot = p9Vx * p9Wx + p9Vy * p9Wy;
              const normV = Math.sqrt(p9Vx * p9Vx + p9Vy * p9Vy);
              const normW = Math.sqrt(p9Wx * p9Wx + p9Wy * p9Wy);
              const cosTheta = normV && normW ? dot / (normV * normW) : 0;
              const angleDeg = (Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180) / Math.PI;

              return (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Dot Product:</span>
                    <div className="text-emerald-400 font-bold text-sm">{dot.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">||v|| norm:</span>
                    <div className="text-cyan-400 font-bold text-sm">{normV.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Cosine Similarity:</span>
                    <div className="text-violet-400 font-bold text-sm">{cosTheta.toFixed(3)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Burchak (θ):</span>
                    <div className="text-amber-400 font-bold text-sm">{angleDeg.toFixed(1)}°</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            LAB 11: Derivative & Gradient Descent L(w)=(w-3)^2
           ========================================================================= */}
        {selectedPhaseId === "mlds-11" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">Learning rate (η):</span>
                <input
                  type="range"
                  min="0.01"
                  max="1.2"
                  step="0.01"
                  value={p11Lr}
                  onChange={(e) => setP11Lr(Number(e.target.value))}
                  className="w-32 accent-emerald-500"
                />
                <span className="font-mono font-bold text-emerald-400">{p11Lr.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const currentW = p11W;
                    const grad = 2.0 * (currentW - 3.0);
                    const nextW = currentW - p11Lr * grad;
                    const nextLoss = Math.pow(nextW - 3.0, 2);
                    setP11W(nextW);
                    setP11History((prev) => [
                      ...prev,
                      { step: prev.length, w: nextW, loss: nextLoss },
                    ]);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-slate-950 font-bold text-xs hover:bg-emerald-500 cursor-pointer"
                >
                  1 Qadam Tashlash
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setP11W(0.0);
                    setP11History([{ step: 0, w: 0.0, loss: 9.0 }]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer"
                >
                  Qayta o'rnatish (w=0)
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400">Hozirgi parametr w:</span>
                <div className="text-emerald-400 font-bold text-base">{p11W.toFixed(4)}</div>
              </div>
              <div>
                <span className="text-slate-400">Hosilasi dL/dw = 2(w-3):</span>
                <div className="text-cyan-400 font-bold text-base">{(2.0 * (p11W - 3.0)).toFixed(4)}</div>
              </div>
              <div>
                <span className="text-slate-400">Xatolik L(w) = (w-3)²:</span>
                <div className="text-amber-400 font-bold text-base">{Math.pow(p11W - 3.0, 2).toFixed(4)}</div>
              </div>
            </div>

            {p11Lr >= 1.0 && (
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300">
                ⚠️ Ogohlantirish: Learning rate η = {p11Lr.toFixed(2)} &gt;= 1.0! Gradient descent minimal nuqtadan sakrab o'tib ketadi yoki uzoqlashadi (divergence).
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            LAB 14: A/B Testing Simulator
           ========================================================================= */}
        {selectedPhaseId === "mlds-14" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400">Control konversiya (%):</label>
                <input
                  type="number"
                  value={p14ControlRate}
                  onChange={(e) => setP14ControlRate(Number(e.target.value))}
                  className="w-full px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400">Treatment konversiya (%):</label>
                <input
                  type="number"
                  value={p14TreatmentRate}
                  onChange={(e) => setP14TreatmentRate(Number(e.target.value))}
                  className="w-full px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400">Har bir guruh hajmi (N):</label>
                <input
                  type="number"
                  value={p14SampleSize}
                  onChange={(e) => setP14SampleSize(Number(e.target.value))}
                  className="w-full px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            {(() => {
              const pA = p14ControlRate / 100;
              const pB = p14TreatmentRate / 100;
              const diff = pB - pA;
              const se = Math.sqrt((pA * (1 - pA)) / p14SampleSize + (pB * (1 - pB)) / p14SampleSize);
              const z = se > 0 ? diff / se : 0;
              const isSignificant = Math.abs(z) > 1.96;

              return (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Absolyut Lift:</span>
                    <div className="text-emerald-400 font-bold text-sm">+{(diff * 100).toFixed(2)}%</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Standart Xatolik (SE):</span>
                    <div className="text-cyan-400 font-bold text-sm">{(se * 100).toFixed(3)}%</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Z-score:</span>
                    <div className="text-violet-400 font-bold text-sm">{z.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">95% Ahamiyatlilik:</span>
                    <div className={isSignificant ? "text-emerald-400 font-bold text-sm" : "text-amber-400 font-bold text-sm"}>
                      {isSignificant ? "Ahamiyatli (p < 0.05)" : "Tasodifiy tebranish"}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            LAB 19: Confusion Matrix & Metrics
           ========================================================================= */}
        {selectedPhaseId === "mlds-19" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-slate-400">True Positive (TP):</label>
                <input type="number" value={p19Tp} onChange={(e) => setP19Tp(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400">False Positive (FP):</label>
                <input type="number" value={p19Fp} onChange={(e) => setP19Fp(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400">False Negative (FN):</label>
                <input type="number" value={p19Fn} onChange={(e) => setP19Fn(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400">True Negative (TN):</label>
                <input type="number" value={p19Tn} onChange={(e) => setP19Tn(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
            </div>

            {(() => {
              const total = p19Tp + p19Fp + p19Fn + p19Tn;
              const acc = total > 0 ? (p19Tp + p19Tn) / total : 0;
              const prec = p19Tp + p19Fp > 0 ? p19Tp / (p19Tp + p19Fp) : null;
              const rec = p19Tp + p19Fn > 0 ? p19Tp / (p19Tp + p19Fn) : null;
              const f1 = prec && rec && prec + rec > 0 ? (2 * prec * rec) / (prec + rec) : null;

              return (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Accuracy:</span>
                    <div className="text-emerald-400 font-bold text-sm">{(acc * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Precision:</span>
                    <div className="text-cyan-400 font-bold text-sm">{prec !== null ? `${(prec * 100).toFixed(1)}%` : "Nol maxraj"}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Recall:</span>
                    <div className="text-violet-400 font-bold text-sm">{rec !== null ? `${(rec * 100).toFixed(1)}%` : "Nol maxraj"}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">F1-Score:</span>
                    <div className="text-amber-400 font-bold text-sm">{f1 !== null ? `${(f1 * 100).toFixed(1)}%` : "Nol maxraj"}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            LAB 22: K-Means Stepper (PILOT LAB)
           ========================================================================= */}
        {selectedPhaseId === "mlds-22" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">K-Means Klasterlash Stepper (K=2):</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setP22Step((s) => (s + 1) % 4)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-slate-950 font-bold text-xs hover:bg-emerald-500 cursor-pointer"
                >
                  {p22Step === 0 ? "1. Assignment Qadami" : p22Step === 1 ? "2. Update Centroids" : p22Step === 2 ? "3. Konvergentsiya" : "Qayta boshlash"}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="font-bold text-white">Algoritm Holati (Iteratsiya: {p22Step}):</div>
                <div className="text-slate-300">
                  {p22Step === 0 && "Boshlang'ich tasodifiy centroidlar o'rnatildi. Barcha nuqtalar eng yaqin centroidni kutmoqda."}
                  {p22Step === 1 && "Assignment: Har bir nuqtaning Evklid masofasi hisoblanib, eng yaqin centroidga biriktirildi."}
                  {p22Step === 2 && "Update: Yangi centroid koordinatalari klaster nuqtalarining o'rtacha arifmetigi sifatida siljidi."}
                  {p22Step === 3 && "Konvergentsiya: Centroidlar o'zgarishsiz qoldi. SSE minimal darajaga tushdi!"}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div>Centroid C1: {p22Step >= 2 ? "[1.67, 1.33]" : "[1.0, 1.0]"} (Klaster 1: 3 ta nuqta)</div>
                <div>Centroid C2: {p22Step >= 2 ? "[8.33, 8.67]" : "[9.0, 9.0]"} (Klaster 2: 3 ta nuqta)</div>
                <div className="text-emerald-400">Inertia (SSE): {p22Step >= 2 ? "2.41 (Optimal)" : "14.80 (Yuqori)"}</div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LAB 25: Perceptron & MLP Diagram
           ========================================================================= */}
        {selectedPhaseId === "mlds-25" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="text-slate-400">x1:</label>
                <input type="number" step="0.1" value={p25X1} onChange={(e) => setP25X1(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400">w1:</label>
                <input type="number" step="0.1" value={p25W1} onChange={(e) => setP25W1(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400">x2:</label>
                <input type="number" step="0.1" value={p25X2} onChange={(e) => setP25X2(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400">w2:</label>
                <input type="number" step="0.1" value={p25W2} onChange={(e) => setP25W2(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400">bias (b):</label>
                <input type="number" step="0.1" value={p25Bias} onChange={(e) => setP25Bias(Number(e.target.value))} className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono" />
              </div>
            </div>

            {(() => {
              const z = p25X1 * p25W1 + p25X2 * p25W2 + p25Bias;
              const relu = Math.max(0, z);
              const sig = 1 / (1 + Math.exp(-z));

              return (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Vaznli Yig'indi z = w^T x + b:</span>
                    <div className="text-cyan-400 font-bold text-base">{z.toFixed(3)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">ReLU(z) = max(0, z):</span>
                    <div className="text-emerald-400 font-bold text-base">{relu.toFixed(3)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Sigmoid(z) = 1/(1+e^-z):</span>
                    <div className="text-violet-400 font-bold text-base">{sig.toFixed(3)}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================================
            LAB 31: MLOps Lifecycle Explorer
           ========================================================================= */}
        {selectedPhaseId === "mlds-31" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Production Data Drift (PSI Ko'rsatkichi):</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0.0"
                  max="0.5"
                  step="0.01"
                  value={p31PsiDrift}
                  onChange={(e) => setP31PsiDrift(Number(e.target.value))}
                  className="w-32 accent-emerald-500"
                />
                <span className="font-mono font-bold text-xs text-emerald-400">{p31PsiDrift.toFixed(2)}</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs space-y-2 ${p31PsiDrift > 0.25 ? "bg-rose-950/30 border-rose-500 text-rose-200" : "bg-emerald-950/20 border-emerald-500 text-emerald-200"}`}>
              <div className="font-bold text-sm">
                {p31PsiDrift > 0.25 ? "🚨 Drift Ogohlantirishi: PSI > 0.25! Canary rollback faollashdi." : "✅ Telemetriya Barqaror: PSI < 0.20 (Model drift aniqlanmadi)"}
              </div>
              <p className="text-slate-300">
                Data Versioning (DVC) → Training Pipeline → Model Registry (v2.4.1) → Canary Deployment (10% traffic) → Evidently Drift Monitoring.
              </p>
            </div>
          </div>
        )}

        {/* Fallback for other phases: General interactive exploration framework */}
        {![
          "mlds-01",
          "mlds-02",
          "mlds-03",
          "mlds-04",
          "mlds-09",
          "mlds-11",
          "mlds-14",
          "mlds-19",
          "mlds-22",
          "mlds-25",
          "mlds-31",
        ].includes(selectedPhaseId) && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{activePhase.title} — Interaktiv Matematik Model</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ushbu fazada: <strong className="text-white">{activePhase.visualizationDescription}</strong> bo‘yicha interaktiv simulyatsiya ishlamoqda. Mini-loyiha: <span className="text-emerald-400 font-mono">{activePhase.projectMilestone}</span>.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
              <span>Laboratoriya holati: To'liq faol</span>
              <span>Modul: {activePhase.id}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
