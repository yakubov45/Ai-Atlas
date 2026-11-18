"use client";

import React from "react";
import {
  Compass,
  BookOpen,
  FlaskConical,
  Code2,
  FolderGit2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export interface WorkflowStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    step: 1,
    title: "Yo‘nalishni tanlang",
    subtitle: "Maqsadga mos yo‘l",
    description:
      "Python dasturlash, AI Engineering, Machine Learning yoki Data Science — o‘zingiz qiziqqan aniq yo‘nalishni tanlaysiz.",
    icon: Compass,
    accentColor: "text-amber-400 border-amber-500/40 bg-amber-950/40",
  },
  {
    step: 2,
    title: "Nazariyani o‘rganing",
    subtitle: "Matn, diagramma & video",
    description:
      "Chalg‘ituvchi ortiqcha matnlarsiz, har bir tushuncha qisqa nazariya, ilmiy arxitektura diagrammalari va Manim animatsiyalari bilan tushuntiriladi.",
    icon: BookOpen,
    accentColor: "text-violet-400 border-violet-500/40 bg-violet-950/40",
  },
  {
    step: 3,
    title: "Vizual laboratoriya",
    subtitle: "Jonli tajriba",
    description:
      "Formulalar qanday ishlashini parametrlarni o‘zgartirib (learning rate, og‘irliklar, vektorlar) bevosita brauzerda sinab ko‘rasiz.",
    icon: FlaskConical,
    accentColor: "text-cyan-400 border-cyan-500/40 bg-cyan-950/40",
  },
  {
    step: 4,
    title: "Test va kod yozish",
    subtitle: "Mustaqil algoritm",
    description:
      "Nazariy testlar, kod natijasini topish (output prediction), xatolarni to‘g‘rilash (debugging) va Python'da mustaqil algoritm yozish.",
    icon: Code2,
    accentColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
  },
  {
    step: 5,
    title: "Haqiqiy loyiha",
    subtitle: "Portfobio darajasidagi amaliyot",
    description:
      "Har bir bosqich yakunida haqiqiy kodli loyiha: CLI vosita, RAG qidiruv tizimi, A/B test hisoblagich yoki AI agent yaratasiz.",
    icon: FolderGit2,
    accentColor: "text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-950/40",
  },
  {
    step: 6,
    title: "Haqiqiy progress",
    subtitle: "Qaytariladigan natija",
    description:
      "Barcha yechilgan mashqlar va tugatilgan mikro-darslar profilingizda saqlanib, keyingi mantiqiy qadam avtomatik tavsiya etiladi.",
    icon: TrendingUp,
    accentColor: "text-sky-400 border-sky-500/40 bg-sky-950/40",
  },
];

export function HowLearningWorksSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
          <span>Metodologiya</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          O‘rganish jarayoni qanday tuzilgan?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Natijasiz darslar va behuda vaqt sarflash yo‘q. 6 ta aniq qadam orqali boshlang‘ich tushunchadan tayyor AI muhandisi darajasiga o‘ting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WORKFLOW_STEPS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${item.accentColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    Qadam 0{item.step}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {item.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                <span>Bosqich {item.step} / 6</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
