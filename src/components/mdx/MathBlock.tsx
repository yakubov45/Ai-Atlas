import React from "react";
import katex from "katex";
import { uz } from "@/i18n/dictionaries/uz";

export function MathInline({ math }: { math: string }) {
  const html = katex.renderToString(math.replace(/—/g, "\\text{---}"), {
    displayMode: false,
    throwOnError: false,
    strict: "ignore",
  });

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="inline-math px-1 text-slate-100"
    />
  );
}

export function MathBlock({
  math,
  explanation,
}: {
  math: string;
  explanation?: string;
}) {
  const html = katex.renderToString(math.replace(/—/g, "\\text{---}"), {
    displayMode: true,
    throwOnError: false,
    strict: "ignore",
  });

  return (
    <div className="my-5 p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 shadow-sm overflow-x-auto text-slate-100">
      <div dangerouslySetInnerHTML={{ __html: html }} className="katex-display my-1" />
      {explanation && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 text-xs text-slate-400 font-sans leading-relaxed">
          <span className="font-semibold text-slate-300 mr-1.5">{uz.math.explanation}:</span>
          {explanation}
        </div>
      )}
    </div>
  );
}
