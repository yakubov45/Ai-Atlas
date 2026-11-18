import React from "react";
import type { Metadata } from "next";
import { getContentRepository } from "@/lib/content/repository";
import { VisualLabClient } from "./VisualLabClient";
import { uz } from "@/i18n/dictionaries/uz";

export const metadata: Metadata = {
  title: uz.lab.title,
  description: uz.lab.lead,
};

export default function VisualLabPage() {
  const repo = getContentRepository();
  const instances = repo.visualizations;

  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {uz.lab.title}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          {uz.lab.lead}
        </p>
      </div>

      <VisualLabClient instances={instances} />
    </div>
  );
}
