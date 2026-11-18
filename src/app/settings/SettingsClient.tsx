"use client";

import React, { useState, useRef } from "react";
import {
  Sun,
  Moon,
  Laptop,
  Type,
  Layout,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Check,
  AlertTriangle,
} from "lucide-react";
import { usePreferences } from "@/hooks/use-preferences";
import { useLearning } from "@/hooks/use-learning";
import { Button } from "@/components/ui/Button";
import { uz } from "@/i18n/dictionaries/uz";
import type {
  ThemePreference,
  MotionPreference,
  FontSizePreference,
  ContentWidthPreference,
  FontFamilyPreference,
} from "@/lib/preferences/preferences";

export function SettingsClient() {
  const { preferences, updatePreferences, resetPreferences } = usePreferences();
  const { state, exportJson, importJson, reset } = useLearning();

  const [importMessage, setImportMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedCount = Object.keys(state.completed).length;
  const bookmarkCount = Object.keys(state.bookmarks).length;

  const handleExport = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-atlas-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJson(content);
      if (success) {
        setImportMessage({ type: "success", text: uz.settings.importSuccess });
      } else {
        setImportMessage({ type: "error", text: uz.settings.importError });
      }
      setTimeout(() => setImportMessage(null), 4000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClearProgress = () => {
    if (window.confirm(uz.settings.clearConfirm)) {
      reset();
      setImportMessage({ type: "success", text: uz.settings.cleared });
      setTimeout(() => setImportMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl space-y-10 text-xs sm:text-sm text-slate-200">
      {/* 1. Appearance / Theme */}
      <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sun className="w-4 h-4 text-cyan-400" />
          <span>{uz.settings.appearance}</span>
        </h2>

        <div>
          <label className="font-semibold text-slate-300 block mb-2">{uz.settings.theme}</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "dark" as ThemePreference, label: uz.settings.themes.dark, icon: Moon },
              { id: "light" as ThemePreference, label: uz.settings.themes.light, icon: Sun },
              { id: "system" as ThemePreference, label: uz.settings.themes.system, icon: Laptop },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => updatePreferences({ theme: id })}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  preferences.theme === id
                    ? "bg-violet-600/20 border-violet-500 text-white font-semibold shadow-sm"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Motion Preference */}
        <div className="pt-4 border-t border-slate-800/60">
          <label className="font-semibold text-slate-300 block mb-1">{uz.settings.motion}</label>
          <p className="text-[11px] text-slate-400 mb-2">{uz.settings.motionHint}</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "system" as MotionPreference, label: uz.settings.motions.system },
              { id: "reduce" as MotionPreference, label: uz.settings.motions.reduce },
              { id: "full" as MotionPreference, label: uz.settings.motions.full },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => updatePreferences({ motion: id })}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  preferences.motion === id
                    ? "bg-violet-600/20 border-violet-500 text-white font-semibold"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Reading Preferences */}
      <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Type className="w-4 h-4 text-violet-400" />
          <span>{uz.settings.reading}</span>
        </h2>

        {/* Font size */}
        <div>
          <label className="font-semibold text-slate-300 block mb-2">{uz.settings.fontSize}</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "sm" as FontSizePreference, label: uz.settings.fontSizes.sm },
              { id: "md" as FontSizePreference, label: uz.settings.fontSizes.md },
              { id: "lg" as FontSizePreference, label: uz.settings.fontSizes.lg },
              { id: "xl" as FontSizePreference, label: uz.settings.fontSizes.xl },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => updatePreferences({ fontSize: id })}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  preferences.fontSize === id
                    ? "bg-violet-600/20 border-violet-500 text-white font-semibold"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="pt-2">
          <label className="font-semibold text-slate-300 block mb-2">{uz.settings.fontFamily}</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "sans" as FontFamilyPreference, label: uz.settings.fontFamilies.sans },
              { id: "serif" as FontFamilyPreference, label: uz.settings.fontFamilies.serif },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => updatePreferences({ fontFamily: id })}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  preferences.fontFamily === id
                    ? "bg-violet-600/20 border-violet-500 text-white font-semibold"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Width */}
        <div className="pt-2">
          <label className="font-semibold text-slate-300 block mb-2">{uz.settings.contentWidth}</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "narrow" as ContentWidthPreference, label: uz.settings.contentWidths.narrow },
              { id: "normal" as ContentWidthPreference, label: uz.settings.contentWidths.normal },
              { id: "wide" as ContentWidthPreference, label: uz.settings.contentWidths.wide },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => updatePreferences({ contentWidth: id })}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  preferences.contentWidth === id
                    ? "bg-violet-600/20 border-violet-500 text-white font-semibold"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Reading Preview */}
        <div className="mt-4 p-4 rounded-xl border border-slate-800/80 bg-slate-950/70 text-slate-300 prose-reader">
          <p className="leading-relaxed">{uz.settings.preview}</p>
        </div>
      </section>

      {/* 3. Local Learning Data Management */}
      <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Layout className="w-4 h-4 text-emerald-400" />
          <span>{uz.settings.data}</span>
        </h2>

        <p className="text-xs text-slate-400 leading-relaxed">{uz.settings.dataHint}</p>

        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-cyan-400">
          {uz.settings.stats
            .replace("{completed}", String(completedCount))
            .replace("{bookmarks}", String(bookmarkCount))}
        </div>

        {importMessage && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              importMessage.type === "success"
                ? "bg-emerald-950/30 border-emerald-800 text-emerald-300"
                : "bg-rose-950/30 border-rose-800 text-rose-300"
            }`}
          >
            {importMessage.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span>{importMessage.text}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download className="w-3.5 h-3.5" />
            <span>{uz.settings.export}</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{uz.settings.import}</span>
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          />

          <Button variant="danger" size="sm" onClick={handleClearProgress}>
            <Trash2 className="w-3.5 h-3.5" />
            <span>{uz.settings.clearProgress}</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-800/60">
          <Button variant="ghost" size="sm" onClick={resetPreferences}>
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{uz.settings.resetPreferences}</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
