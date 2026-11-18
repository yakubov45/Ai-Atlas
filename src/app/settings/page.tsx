import React from "react";
import type { Metadata } from "next";
import { SettingsClient } from "./SettingsClient";
import { uz } from "@/i18n/dictionaries/uz";

export const metadata: Metadata = {
  title: uz.settings.title,
  description: uz.settings.lead,
};

export default function SettingsPage() {
  return (
    <div className="w-full px-3 sm:px-5 lg:px-6 py-6 sm:py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {uz.settings.title}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          {uz.settings.lead}
        </p>
      </div>

      <SettingsClient />
    </div>
  );
}
