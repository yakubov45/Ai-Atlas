"use client";

import React from "react";
import type { TocHeading } from "@/lib/content/types";
import { useTocSpy } from "@/hooks/use-toc-spy";
import { uz } from "@/i18n/dictionaries/uz";
import { List } from "lucide-react";

export function TableOfContents({ headings }: { headings: readonly TocHeading[] }) {
  const activeId = useTocSpy(headings.map((h) => h.id));

  if (headings.length === 0) return null;

  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider pb-1 border-b border-slate-800/60">
        <List className="w-3.5 h-3.5 text-cyan-400" />
        <span>{uz.lesson.onThisPage}</span>
      </div>

      <nav className="text-xs">
        <ul className="space-y-1 border-l border-slate-800/80">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li
                key={h.id}
                style={{ paddingLeft: h.depth === 3 ? "1.25rem" : "0.75rem" }}
              >
                <a
                  href={`#${h.id}`}
                  className={`block py-1.5 leading-snug transition-all border-l-2 -ml-[1px] pl-2.5 rounded-r ${
                    isActive
                      ? "text-cyan-300 font-semibold border-cyan-400 bg-cyan-950/20"
                      : "text-slate-400 hover:text-slate-200 border-transparent hover:border-slate-700"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
