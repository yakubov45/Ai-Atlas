import React from "react";
import type { Metadata } from "next";
import { Python30DaysPractice } from "@/components/practice/Python30DaysPractice";
import { Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "30 Days of Python — 5-Darajali Amaliyot Tizimi | AI Ta'lim Platformasi",
  description:
    "Asabeneh / 30-Days-Of-Python asosidagi 30 kunlik to'liq dastur: 90 ta test, 90 ta amaliy mashq, brauzerda Pyodide orqali xavfsiz kod tekshirish va 900 ballik reyting tizimi.",
};

export default function Python30DaysPage() {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>Amaliy Dasturlash Laboratoriyasi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
          30 Days of Python — Amaliy Dasturlash Banki
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Ushbu tizim nazariyadan boshlab mustaqil algoritm yozish va murakkab loyihalargacha bosqichma-bosqich
          o&apos;rgatadi. Har bir kunda <strong>5 ta daraja</strong>: Nazariy test, Output prediction, Debugging,
          Problem solving va Real-world Challenge.
        </p>
      </div>

      {/* Main Practice Component */}
      <Python30DaysPractice />
    </div>
  );
}
