"use client";

import React, { useState } from "react";
import {
  Code2,
  Layers,
  Sparkles,
  Play,
  RotateCcw,
  Info,
  GitBranch,
  Database,
  Terminal,
} from "lucide-react";
import { runPythonCode } from "@/lib/runner/python-runner";

export type PythonBasicsTab =
  | "memory-model"
  | "dynamic-typing"
  | "collections"
  | "conditionals"
  | "live-sandbox";

export function PythonBasicsLab({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<PythonBasicsTab>("memory-model");

  // ---------------------------------------------------------------------------
  // Tab 1: Memory Model (is vs ==) & Aliasing
  // ---------------------------------------------------------------------------
  const [memoryScenario, setMemoryScenario] = useState<
    "aliasing" | "separate-copy" | "small-int" | "mutation-demo"
  >("aliasing");
  const [aliasedList, setAliasedList] = useState<number[]>([1, 2, 3]);
  const [copiedListA, setCopiedListA] = useState<number[]>([10, 20]);
  const [copiedListB, setCopiedListB] = useState<number[]>([10, 20]);
  const [mutationActionTaken, setMutationActionTaken] = useState(false);

  const handleAppendAliased = () => {
    setAliasedList((prev) => [...prev, prev.length * 10 + 10]);
    setMutationActionTaken(true);
  };

  const handleResetAliased = () => {
    setAliasedList([1, 2, 3]);
    setMutationActionTaken(false);
  };

  const handleAppendCopiedB = () => {
    setCopiedListB((prev) => [...prev, 30]);
  };

  const handleResetCopied = () => {
    setCopiedListA([10, 20]);
    setCopiedListB([10, 20]);
  };

  // ---------------------------------------------------------------------------
  // Tab 2: Dynamic Typing & Mutability
  // ---------------------------------------------------------------------------
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);
  const TYPE_SAMPLES = [
    {
      code: "x = 42",
      type: "int",
      category: "Butun son (Scalar)",
      mutable: false,
      sizeBytes: 28,
      explanation:
        "Python'da kichik butun sonlar xotirada optimallashtirilgan CPython obyekti sifatida saqlanadi. Ular o'zgarmasdir (immutable).",
      example: "y = x + 10  # yangi int obyekti yaratiladi",
    },
    {
      code: "x = 3.14159",
      type: "float",
      category: "Haqiqiy son (Floating point)",
      mutable: false,
      sizeBytes: 24,
      explanation:
        "C tilidagi 64-bitli double formatidagi son. Matematik hisob-kitoblar va AI vaznlarida qo'llanadi.",
      example: "x = x * 2.0  # yangi float obyekti hosil bo'ladi",
    },
    {
      code: "x = 'Python Asoslari'",
      type: "str",
      category: "Matn (Unicode String)",
      mutable: false,
      sizeBytes: 66,
      explanation:
        "Satrlar o'zgarmas (immutable). x[0] = 'J' deb bitta harfni o'zgartirib bo'lmaydi, faqat yangi satr yaratiladi.",
      example: "x.upper()  # 'PYTHON ASOSLARI' yangi string qaytaradi",
    },
    {
      code: "x = [10, 20, 30]",
      type: "list",
      category: "Ro'yxat (Dinamik massiv)",
      mutable: true,
      sizeBytes: 88,
      explanation:
        "O'zgaruvchan (mutable) to'plam. Xotiradagi aynan shu obyektga yangi element qo'shish yoki o'chirish mumkin.",
      example: "x.append(40)  # xotira manzili o'zgarmasdan yangi element qo'shiladi",
    },
    {
      code: "x = {'nomi': 'Transformer', 'faza': 5}",
      type: "dict",
      category: "Lug'at (Hash Table)",
      mutable: true,
      sizeBytes: 184,
      explanation:
        "Kalit-qiymat juftliklari. Kalit orqali qidirish O(1) vaqt oladi. Lug'at o'zgaruvchan (mutable) obyekt hisoblanadi.",
      example: "x['status'] = 'tayyor'  # lug'at kengaytiriladi",
    },
    {
      code: "x = (1, 2, 3)",
      type: "tuple",
      category: "Kortej (Himoyalangan to'plam)",
      mutable: false,
      sizeBytes: 64,
      explanation:
        "Ro'yxatga o'xshash, lekin mutlaqo o'zgarmas (immutable). Funksiyalardan ko'p qiymat qaytarishda xavfsiz.",
      example: "a, b, c = x  # unpack qilish mumkin, lekin x[0]=99 xato beradi",
    },
  ];

  const currentTypeSample = TYPE_SAMPLES[selectedTypeIndex]!;

  // ---------------------------------------------------------------------------
  // Tab 3: Collections (list, tuple, dict, set)
  // ---------------------------------------------------------------------------
  const [collectionTab, setCollectionTab] = useState<"list" | "tuple" | "dict" | "set">("list");

  const COLLECTIONS_INFO = {
    list: {
      name: "List (Ro'yxat)",
      syntax: "my_list = [10, 20, 30, 20]",
      ordered: "Ha (Tartiblangan)",
      mutable: "Ha (O'zgaruvchan)",
      duplicates: "Ha (Ruxsat etilgan)",
      indexingTime: "O(1) (Indeks bo'yicha kirish juda tez)",
      searchTime: "O(n) (To'liq qidirish kerak)",
      sampleItems: [10, 20, 30, 20],
      iconText: "[]",
      bestFor: "Ketma-ket ma'lumotlar, navbatlar, dinamik massivlar",
    },
    tuple: {
      name: "Tuple (Kortej)",
      syntax: "my_tuple = (10, 20, 30)",
      ordered: "Ha (Tartiblangan)",
      mutable: "Yo'q (O'zgarmas - Immutable)",
      duplicates: "Ha (Ruxsat etilgan)",
      indexingTime: "O(1)",
      searchTime: "O(n)",
      sampleItems: [10, 20, 30],
      iconText: "()",
      bestFor: "O'zgarmas parametrlar, lug'at kalitlari, xavfsiz konfiguratsiya",
    },
    dict: {
      name: "Dict (Lug'at)",
      syntax: 'my_dict = {"lr": 0.01, "epochs": 50, "batch": 32}',
      ordered: "Ha (Python 3.7+ dan kiritilish tartibi saqlanadi)",
      mutable: "Ha (O'zgaruvchan)",
      duplicates: "Kalitlar unikal bo'lishi shart",
      indexingTime: "O(1) (Kalit bo'yicha hash qidiruv)",
      searchTime: "O(1) (O'rtacha vaqt)",
      sampleItems: ["lr: 0.01", "epochs: 50", "batch: 32"],
      iconText: "{:}",
      bestFor: "AI konfiguratsiyasi, JSON obyektlar, kalit bo'yicha tezkor qidiruv",
    },
    set: {
      name: "Set (To'plam)",
      syntax: "my_set = {10, 20, 30}",
      ordered: "Yo'q (Tartiblanmagan)",
      mutable: "Ha (O'zgaruvchan)",
      duplicates: "Yo'q (Dublikatlar avtomatik o'chiriladi)",
      indexingTime: "Indeks yo'q (my_set[0] xato)",
      searchTime: "O(1) (Hash asosida bir zumda tekshiradi)",
      sampleItems: [10, 20, 30],
      iconText: "{}",
      bestFor: "Noyob elementlarni saralash, to'plamlar kesishmasi (&), birlashmasi (|)",
    },
  };

  const curCol = COLLECTIONS_INFO[collectionTab];

  // ---------------------------------------------------------------------------
  // Tab 4: Conditionals (if / elif / else)
  // ---------------------------------------------------------------------------
  const [score, setScore] = useState<number>(85);

  const getBranchInfo = (val: number) => {
    if (val >= 90) {
      return {
        grade: "A (A'lo)",
        activeLine: 2,
        comment: "90 dan yuqori bo'lgani uchun 1-shart (score >= 90) bajarildi va elif tekshirilmadi.",
        color: "text-emerald-300",
      };
    }
    if (val >= 75) {
      return {
        grade: "B (Yaxshi)",
        activeLine: 4,
        comment: "1-shart yolg'on (False) chiqdi, lekin 2-shart (score >= 75) to'g'ri (True) bo'ldi.",
        color: "text-cyan-300",
      };
    }
    if (val >= 60) {
      return {
        grade: "C (Qoniqarli)",
        activeLine: 6,
        comment: "Oldingi ikki shart False bo'ldi va 3-shart (score >= 60) True bo'ldi.",
        color: "text-amber-300",
      };
    }
    return {
      grade: "F (Qoniqarsiz)",
      activeLine: 8,
      comment: "Barcha yuqoridagi shartlar False bo'lgani sababli else bloki avtomatik ishga tushdi.",
      color: "text-rose-400",
    };
  };

  const branch = getBranchInfo(score);

  // ---------------------------------------------------------------------------
  // Tab 5: Live Code Sandbox
  // ---------------------------------------------------------------------------
  const DEFAULT_SANDBOX_CODE = `# Python Asoslari Jonli Laboratoriyasi
# is va == operatorlarini xotirada tekshiring:

a = [1, 2, 3]
b = a          # b ham aynan bitta xotiraga ko'rsatadi
c = [1, 2, 3]  # c alohida yangi list

print("a == b (qiymati tengmi?):", a == b)
print("a is b (xotira manzili birmi?):", a is b)
print("a == c (qiymati tengmi?):", a == c)
print("a is c (xotira manzili birmi?):", a is c)
print("id(a) manzili:", id(a))
print("id(c) manzili:", id(c))

# b ga element qo'shib ko'ramiz
b.append(99)
print("\\nb ga 99 qo'shilgandan so'ng:")
print("a ro'yxati:", a)
print("b ro'yxati:", b)
`;

  const [sandboxCode, setSandboxCode] = useState<string>(DEFAULT_SANDBOX_CODE);
  const [sandboxOutput, setSandboxOutput] = useState<string>("");
  const [sandboxRunning, setSandboxRunning] = useState<boolean>(false);

  const handleRunCode = async () => {
    setSandboxRunning(true);
    setSandboxOutput("Kod bajarilmoqda...");
    try {
      const result = await runPythonCode(sandboxCode, []);
      if (result.success) {
        setSandboxOutput(result.stdout || "Kod muvaffaqiyatli bajarildi (hech qanday print chiqishi bo'lmadi).");
      } else {
        setSandboxOutput(`Xatolik:\n${result.error || result.stderr}`);
      }
    } catch (err: unknown) {
      setSandboxOutput(`Xatolik yuz berdi: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSandboxRunning(false);
    }
  };

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
              Python Dasturlash Asoslari — Interaktiv Mini-Laboratoriya
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Python sintaksisi, o&apos;zgaruvchilar, dinamik tiplash, xotira modeli (`is` vs `==`),
            to&apos;plamlar va shart operatorlarini ko&apos;rgazmali tahlil qiling.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto scrollbar-none">
          {(
            [
              { id: "memory-model", label: "1. Xotira Modeli (is vs ==)", icon: Layers },
              { id: "dynamic-typing", label: "2. Dinamik Tiplash", icon: Sparkles },
              { id: "collections", label: "3. To'plamlar (List, Dict)", icon: Database },
              { id: "conditionals", label: "4. Shartlar (if/else)", icon: GitBranch },
              { id: "live-sandbox", label: "5. Jonli Kod Sandbox", icon: Code2 },
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
      {/* TAB 1: MEMORY MODEL (is vs ==) & HEAP VISUALIZER */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "memory-model" && (
        <div className="space-y-6">
          {/* Scenario Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider mr-1">
              Xotira Holatlari:
            </span>
            {[
              { id: "aliasing" as const, label: "1. Aliasing (b = a)" },
              { id: "separate-copy" as const, label: "2. Nusxalash (b = a.copy())" },
              { id: "small-int" as const, label: "3. Small Integer Cache (256 vs 1000)" },
            ].map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setMemoryScenario(sc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  memoryScenario === sc.id
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Visual Memory Representation */}
          {memoryScenario === "aliasing" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Code & Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span className="text-amber-300 font-bold">aliasing_example.py</span>
                    <span>Bitta obyektga ikki nom</span>
                  </div>
                  <pre className="text-slate-200 leading-relaxed">
                    <code>
                      {`a = ${JSON.stringify(aliasedList)}
b = a  # Yangi xotira ajratilmadi!
# b faqat a ning xotira manziliga ko'rsatmoqda`}
                    </code>
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleAppendAliased}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all"
                  >
                    <span>b.append({aliasedList.length * 10 + 10})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetAliased}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Qayta o&apos;rnatish</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-300">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Natija tahlili:</span>
                  </div>
                  <p className="leading-relaxed">
                    <code>b = a</code> qilinganda yangi list yaratilmaydi! <code>b</code> nomi ham <code>a</code> ko&apos;rsatib turgan
                    aynan o&apos;sha xotira manziliga (Heap ID: <code>0x7f10a</code>) bog&apos;lanadi. Shuning uchun <code>b</code> ga element qo&apos;shsangiz,
                    <code>a</code> ham avtomatik o&apos;zgaradi!
                  </p>
                </div>
              </div>

              {/* Right Visual Heap Diagram */}
              <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Xotira Tasviri (Stack &rarr; Heap)
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Variables Column */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">
                      O&apos;ZGARUVCHILAR (Stack / Names):
                    </span>
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-between">
                      <span className="font-mono font-bold text-cyan-300 text-sm">nom: &quot;a&quot;</span>
                      <span className="text-[11px] font-mono text-slate-400">&rarr; 0x7f10a</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-between">
                      <span className="font-mono font-bold text-cyan-300 text-sm">nom: &quot;b&quot;</span>
                      <span className="text-[11px] font-mono text-slate-400">&rarr; 0x7f10a</span>
                    </div>
                  </div>

                  {/* Heap Objects Column */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      HAQIQIY XOTIRA (Heap Memory):
                    </span>
                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        mutationActionTaken
                          ? "bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-950/50"
                          : "bg-slate-950 border-amber-500/40"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-1 mb-2">
                        <span>Manzil: 0x7f10a</span>
                        <span className="text-amber-300 font-bold">list obyekti</span>
                      </div>
                      <div className="font-mono text-base font-bold text-white tracking-wider">
                        [{aliasedList.join(", ")}]
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Comparison Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-400 font-mono">a == b (Tenglik):</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30">
                      True (Bir xil qiymat)
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-400 font-mono">a is b (Identiklik):</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30">
                      True (Aynan bitta manzil!)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {memoryScenario === "separate-copy" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span className="text-cyan-300 font-bold">copy_example.py</span>
                    <span>Alohida nusxa olish</span>
                  </div>
                  <pre className="text-slate-200 leading-relaxed">
                    <code>
                      {`a = ${JSON.stringify(copiedListA)}
b = a.copy()   # Alohida yangi list yaratildi!
# b.append(30) faqat b ni o'zgartiradi`}
                    </code>
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleAppendCopiedB}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all"
                  >
                    <span>b.append(30)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetCopied}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Qayta o&apos;rnatish</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-cyan-300">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Nusxa olishning ahamiyati:</span>
                  </div>
                  <p className="leading-relaxed">
                    <code>a.copy()</code> yoki <code>list(a)</code> yangi xotira katakchasini ajratadi. <code>b</code> ga qilingan har qanday
                    o&apos;zgarish <code>a</code> ga aslo ta&apos;sir qilmaydi!
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Ikki Alohida Obyekt Tasviri
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold">
                      <span>a obyekti (0x104a)</span>
                      <span>list</span>
                    </div>
                    <div className="font-mono text-lg font-bold text-white">
                      [{copiedListA.join(", ")}]
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold">
                      <span>b obyekti (0x208f)</span>
                      <span>list</span>
                    </div>
                    <div className="font-mono text-lg font-bold text-cyan-200">
                      [{copiedListB.join(", ")}]
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-400 font-mono">a == b:</span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold ${
                        copiedListA.length === copiedListB.length
                          ? "text-emerald-400 bg-emerald-950/50"
                          : "text-rose-400 bg-rose-950/50"
                      }`}
                    >
                      {copiedListA.length === copiedListB.length ? "True (Teng)" : "False (Turli)"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-400 font-mono">a is b:</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-rose-400 bg-rose-950/50 border border-rose-500/30">
                      False (Turli xotira!)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {memoryScenario === "small-int" && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Python Kichik Butun Sonlar Keshlanishi (Small Integer Caching: -5 dan 256 gacha)</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Python dasturni ishga tushirayotganda <code>-5</code> dan <code>256</code> gacha bo&apos;lgan sonlarni xotirada oldindan
                yaratib keshlaydi. Agar siz <code>x = 100</code> va <code>y = 100</code> desangiz, ikkisi ham bir xil manzilga ko&apos;rsatadi!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                  <div className="text-emerald-300 font-bold">256 gacha bo&apos;lgan sonlar (Keshda):</div>
                  <div className="text-slate-200">
                    x = 256<br />
                    y = 256<br />
                    print(x == y) &rarr; <span className="text-emerald-400 font-bold">True</span><br />
                    print(x is y) &rarr; <span className="text-emerald-400 font-bold">True</span> (Bitta xotira obyekti!)
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
                  <div className="text-amber-300 font-bold">256 dan katta sonlar (Yangi xotira):</div>
                  <div className="text-slate-200">
                    x = 1000<br />
                    y = 1000<br />
                    print(x == y) &rarr; <span className="text-emerald-400 font-bold">True</span> (Qiymat teng)<br />
                    print(x is y) &rarr; <span className="text-rose-400 font-bold">False</span> (Alohida xotira ajratildi!)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 2: DYNAMIC TYPING & MUTABILITY */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "dynamic-typing" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider mr-1">
              Ma&apos;lumot turi:
            </span>
            {TYPE_SAMPLES.map((s, idx) => (
              <button
                key={s.type}
                type="button"
                onClick={() => setSelectedTypeIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer font-mono ${
                  selectedTypeIndex === idx
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {s.type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sample Card */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="font-mono text-base font-bold text-white">
                  {currentTypeSample.code}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                    currentTypeSample.mutable
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  }`}
                >
                  {currentTypeSample.mutable ? "O'zgaruvchan (Mutable)" : "O'zgarmas (Immutable)"}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Toifasi:</span>
                  <span className="text-white font-semibold">{currentTypeSample.category}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Python type():</span>
                  <span className="text-amber-300 font-mono font-bold">&lt;class &apos;{currentTypeSample.type}&apos;&gt;</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>CPython Xotira Hajmi (approx):</span>
                  <span className="text-cyan-300 font-mono">~{currentTypeSample.sizeBytes} bayt</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {currentTypeSample.explanation}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-amber-300">
                {currentTypeSample.example}
              </div>
            </div>

            {/* Educational Dynamic Typing Principle */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Python Dinamik Tiplashining Oltin Qoidasi</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                C, C++ yoki Java&apos;dan farqli o&apos;laroq, Python&apos;da o&apos;zgaruvchining o&apos;zi tipga ega emas.
                Tip har doim <strong>o&apos;zgaruvchi ko&apos;rsatib turgan xotiradagi ob&apos;yektga</strong> tegishli bo&apos;ladi:
              </p>

              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 space-y-1.5 border border-slate-800">
                <div>x = 100        <span className="text-slate-500"># x hozir int obyektiga ko&apos;rsatmoqda</span></div>
                <div>x = &quot;salom&quot;    <span className="text-slate-500"># endi aynan o&apos;sha x nomi str ga bog&apos;landi</span></div>
                <div>x = [1, 2, 3]   <span className="text-slate-500"># xato bermaydi: til to'liq dinamik!</span></div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                💡 <strong>Maslahat:</strong> Katta AI loyihalarida chalkashmaslik uchun Python 3.5+ dan
                boshlab Type Hints (masalan: <code>x: int = 100</code>) yozish professional standart hisoblanadi.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 3: COLLECTIONS COMPARISON */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "collections" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {(["list", "tuple", "dict", "set"] as const).map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setCollectionTab(col)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer font-mono ${
                  collectionTab === col
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {COLLECTIONS_INFO[col].name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-base font-bold text-white">{curCol.name}</span>
                <span className="px-2 py-0.5 rounded font-mono text-xs bg-slate-950 text-cyan-300 border border-slate-800">
                  {curCol.iconText}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800">
                <code>{curCol.syntax}</code>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Tartiblanganmi:</div>
                  <div className="font-bold text-white mt-1">{curCol.ordered}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">O&apos;zgaruvchanmi (Mutable):</div>
                  <div className="font-bold text-amber-300 mt-1">{curCol.mutable}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Dublikat elementlar:</div>
                  <div className="font-bold text-white mt-1">{curCol.duplicates}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Qidiruv tezligi:</div>
                  <div className="font-bold text-cyan-300 font-mono mt-1">{curCol.searchTime}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                <strong>Tavsiya etiladi:</strong> {curCol.bestFor}.
              </div>
            </div>

            {/* Quick Summary Matrix */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Python To&apos;plamlari Taqqoslama Jadvali
              </div>
              <div className="overflow-x-auto text-xs font-mono">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 pr-3">To&apos;plam</th>
                      <th className="py-2 px-2">Qavs</th>
                      <th className="py-2 px-2">Mutable</th>
                      <th className="py-2 px-2">Qidiruv</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr className={collectionTab === "list" ? "bg-amber-500/10 font-bold" : ""}>
                      <td className="py-2 pr-3 text-white">list</td>
                      <td className="py-2 px-2 text-cyan-300">[]</td>
                      <td className="py-2 px-2 text-rose-300">Ha</td>
                      <td className="py-2 px-2 text-amber-300">O(n)</td>
                    </tr>
                    <tr className={collectionTab === "tuple" ? "bg-amber-500/10 font-bold" : ""}>
                      <td className="py-2 pr-3 text-white">tuple</td>
                      <td className="py-2 px-2 text-cyan-300">()</td>
                      <td className="py-2 px-2 text-emerald-300">Yo&apos;q</td>
                      <td className="py-2 px-2 text-amber-300">O(n)</td>
                    </tr>
                    <tr className={collectionTab === "dict" ? "bg-amber-500/10 font-bold" : ""}>
                      <td className="py-2 pr-3 text-white">dict</td>
                      <td className="py-2 px-2 text-cyan-300">{`{k:v}`}</td>
                      <td className="py-2 px-2 text-rose-300">Ha</td>
                      <td className="py-2 px-2 text-emerald-400">O(1) ★</td>
                    </tr>
                    <tr className={collectionTab === "set" ? "bg-amber-500/10 font-bold" : ""}>
                      <td className="py-2 pr-3 text-white">set</td>
                      <td className="py-2 px-2 text-cyan-300">{}</td>
                      <td className="py-2 px-2 text-rose-300">Ha</td>
                      <td className="py-2 px-2 text-emerald-400">O(1) ★</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 4: CONDITIONALS (if / elif / else) */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "conditionals" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Shartli Shoxlanish (if / elif / else) Interaktiv Simulyatori
                </h4>
                <p className="text-xs text-slate-400">
                  Slayderni o&apos;zgartirib, Python interpretatori shartlarni ketma-ket qanday tekshirishini kuzating.
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm font-bold text-amber-300">
                score = {score}
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
              {/* Code with Line Highlight */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                {[
                  { line: 1, text: "if score >= 90:" },
                  { line: 2, text: '    grade = "A (A\'lo)"' },
                  { line: 3, text: "elif score >= 75:" },
                  { line: 4, text: '    grade = "B (Yaxshi)"' },
                  { line: 5, text: "elif score >= 60:" },
                  { line: 6, text: '    grade = "C (Qoniqarli)"' },
                  { line: 7, text: "else:" },
                  { line: 8, text: '    grade = "F (Qoniqarsiz)"' },
                ].map((l) => {
                  const isCurrent = branch.activeLine === l.line || branch.activeLine - 1 === l.line;
                  return (
                    <div
                      key={l.line}
                      className={`px-2 py-0.5 rounded flex items-center gap-2 ${
                        isCurrent
                          ? "bg-amber-500/20 border-l-2 border-amber-400 text-amber-200 font-bold"
                          : "text-slate-400"
                      }`}
                    >
                      <span className="text-slate-600 w-4 select-none">{l.line}</span>
                      <span>{l.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Execution Explanation */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Natijaviy Baho (grade):</span>
                  <span className={`text-base font-bold font-mono ${branch.color}`}>
                    {branch.grade}
                  </span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2">
                  {branch.comment}
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                  <strong>Muhim qoida:</strong> <code>if / elif</code> zanjirida bitta shart True bo&apos;lishi bilan,
                  qolgan barcha pastdagi <code>elif</code> va <code>else</code> bloklari tashlab o&apos;tiladi (short-circuit).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 5: LIVE CODE REPL SANDBOX */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === "live-sandbox" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Ushbu maydonda xohlagan Python kodingizni yozib, real natijani tekshirib ko&apos;rishingiz mumkin:
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSandboxCode(DEFAULT_SANDBOX_CODE)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 cursor-pointer"
              >
                Namuna Kodni Qaytarish
              </button>

              <button
                type="button"
                disabled={sandboxRunning}
                onClick={handleRunCode}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer disabled:opacity-50 shadow-md transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{sandboxRunning ? "Bajarilmoqda..." : "Kodni Bajarish"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Code Input */}
            <div className="lg:col-span-7 flex flex-col rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
              <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>main.py (Python 3.12 Sandbox)</span>
              </div>
              <textarea
                value={sandboxCode}
                onChange={(e) => setSandboxCode(e.target.value)}
                rows={12}
                className="w-full flex-1 p-4 bg-transparent font-mono text-xs text-slate-100 resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Output Console */}
            <div className="lg:col-span-5 flex flex-col rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Terminal Chiqishi (Stdout)</span>
                </span>
              </div>
              <pre className="p-4 flex-1 font-mono text-xs text-cyan-300 whitespace-pre-wrap overflow-y-auto leading-relaxed min-h-[200px]">
                {sandboxOutput || "Natijani ko'rish uchun 'Kodni Bajarish' tugmasini bosing."}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
