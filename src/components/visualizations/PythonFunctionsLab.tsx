"use client";

import React, { useState } from "react";
import {
  Code2,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  GitBranch,
} from "lucide-react";
import { FactorialCallStackLab } from "./FactorialCallStackLab";

export type PythonFunctionsTab =
  | "call-stack"
  | "return-vs-print"
  | "legb-scope"
  | "default-args";

export function PythonFunctionsLab({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<PythonFunctionsTab>("call-stack");

  // Tab 2: return vs print demo state
  const [returnVsPrintMode, setReturnVsPrintMode] = useState<"print" | "return">("return");
  const numA = 10;
  const numB = 20;

  return (
    <div
      className={`p-4 sm:p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6 ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Terminal className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
              Python Funksiyalar va Call Stack Laboratoriyasi
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            <code>def</code>, parametrlar, <code>return</code> va <code>print</code> farqi, Call Stack
            va LEGB ko&apos;rinish sohasi (scope) qoidalarini interaktiv o&apos;rganing.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto scrollbar-none">
          {(
            [
              { id: "call-stack", label: "1. Call Stack (Rekursiya)", icon: Layers },
              { id: "return-vs-print", label: "2. return vs print", icon: Code2 },
              { id: "legb-scope", label: "3. LEGB Scope Qoidasi", icon: GitBranch },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* TAB 1: CALL STACK & RECURSION FRAMES */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "call-stack" && (
        <div className="space-y-4">
          <FactorialCallStackLab initialTab="factorial-stack" />
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 2: RETURN VS PRINT COMPARISON */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "return-vs-print" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setReturnVsPrintMode("return")}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                returnVsPrintMode === "return"
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              ✅ To&apos;g&apos;ri Yondashuv: return a + b (Natija saqlanadi)
            </button>
            <button
              type="button"
              onClick={() => setReturnVsPrintMode("print")}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                returnVsPrintMode === "print"
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              ❌ Keng tarqalgan xato: faqat print(a + b) (None qaytadi)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Code Snippet */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono text-slate-400">
                <span className="text-amber-300 font-bold">
                  {returnVsPrintMode === "return" ? "return_example.py" : "print_mistake.py"}
                </span>
                <span>{returnVsPrintMode === "return" ? "Qaytaruvchi funksiya" : "Ekranga chiqaruvchi funksiya"}</span>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed border border-slate-800">
                {returnVsPrintMode === "return" ? (
                  <code>
                    {`def hisobla(a, b):
    return a + b   # Qiymat xotiraga qaytariladi

natija = hisobla(${numA}, ${numB})
umumiy = natija * 2   # ${numA + numB} * 2 = ${(numA + numB) * 2}
print(umumiy)`}
                  </code>
                ) : (
                  <code>
                    {`def hisobla(a, b):
    print(a + b)   # Faqat konsolga chiqaradi, return yo'q!

natija = hisobla(${numA}, ${numB})
# natija == None !
umumiy = natija * 2   # 💥 XATOLIK: TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'`}
                  </code>
                )}
              </pre>
            </div>

            {/* Analysis & Memory Impact */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Xotira va Natija Tahlili:
              </div>

              {returnVsPrintMode === "return" ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs text-emerald-200 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>natija = {numA + numB} (int obyekti saqlandi)</span>
                    </div>
                    <p className="leading-relaxed">
                      <code>return</code> funksiya hisoblagan natijani uni chaqirgan o&apos;zgaruvchiga (<code>natija</code>) uzatadi.
                      Uni keyingi barcha hisob-kitoblarda, matematik formulalarda bemalol ishlatishingiz mumkin.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 text-xs text-rose-200 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>natija = None (Bo&apos;sh qiymat!)</span>
                    </div>
                    <p className="leading-relaxed">
                      <code>print()</code> faqat kompyuter terminaliga yozuv chiqaradi, lekin xotiraga hech qanday qiymat qaytarmaydi.
                      Python&apos;da ochiq <code>return</code> yozilmagan funksiya sukut bo&apos;yicha <code>None</code> qaytaradi!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 3: LEGB SCOPE RULE */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "legb-scope" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>LEGB Scope Qoidasi: Python O&apos;zgaruvchilarni Qayerdan Qidiradi?</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Python kodda o&apos;zgaruvchi nomini ko&apos;rganda, uni quyidagi qat&apos;iy ketma-ketlikda (ichkaridan tashqariga) qidiradi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold">1. L - Local</span>
                <p className="text-slate-300 text-[11px] font-sans">
                  Funksiya ichida e&apos;lon qilingan o&apos;zgaruvchilar (eng birinchi shu yerdan tekshiriladi).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-violet-500/40 space-y-2">
                <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 font-bold">2. E - Enclosing</span>
                <p className="text-slate-300 text-[11px] font-sans">
                  Ichma-ich joylashgan funksiyalarda tashqi o&apos;rab turgan funksiya sohasi (Closure).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold">3. G - Global</span>
                <p className="text-slate-300 text-[11px] font-sans">
                  Fayl (modul)ning eng yuqori darajasida joylashgan umumiy o&apos;zgaruvchilar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">4. B - Built-in</span>
                <p className="text-slate-300 text-[11px] font-sans">
                  Pythonning o&apos;ziga o&apos;rnatilgan kalit funksiyalar (<code>len</code>, <code>range</code>, <code>sum</code>, <code>print</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200">
              <span className="text-slate-500"># LEGB Misoli:</span><br />
              x = &quot;global&quot;          <span className="text-amber-300"># G - Global</span><br />
              <br />
              def tashqi():<br />
              &nbsp;&nbsp;&nbsp;&nbsp;x = &quot;enclosing&quot;     <span className="text-violet-300"># E - Enclosing</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;def ichki():<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = &quot;local&quot;         <span className="text-cyan-300"># L - Local</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(x)             <span className="text-slate-400"># Birinchi Local x ni topadi va &quot;local&quot; chiqaradi</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;ichki()<br />
              tashqi()
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
