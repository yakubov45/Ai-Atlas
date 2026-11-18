"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, BookOpen } from "lucide-react";
import type { SidebarGroup } from "@/lib/content/types";
import { useLearning } from "@/hooks/use-learning";
import { uz } from "@/i18n/dictionaries/uz";

export function LessonSidebar({ groups }: { groups: readonly SidebarGroup[] }) {
  const pathname = usePathname();
  const { isCompleted } = useLearning();

  // Keep all categories expanded by default
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (id: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="w-full text-xs space-y-4">
      <div className="flex items-center gap-2 font-semibold text-slate-300 uppercase tracking-wider px-2">
        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
        <span>{uz.lesson.lessonsNav}</span>
      </div>

      <div className="space-y-3">
        {groups.map((group) => {
          const isCollapsed = collapsedCategories.has(group.category.id);
          return (
            <div key={group.category.id} className="rounded-xl overflow-hidden border border-slate-800/60 bg-slate-900/30">
              <button
                onClick={() => toggleCategory(group.category.id)}
                className="w-full flex items-center justify-between p-2.5 text-slate-200 hover:text-white hover:bg-slate-800/40 font-semibold transition-colors text-left"
              >
                <span className="truncate pr-2">{group.category.title}</span>
                <span className="flex items-center gap-1.5 text-slate-500 text-[11px] shrink-0 font-mono">
                  <span>{group.lessons.length}</span>
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              {!isCollapsed && (
                <ul className="py-1 px-1.5 space-y-0.5 border-t border-slate-800/60">
                  {group.lessons.map((lesson) => {
                    const active = pathname === `/learn/${lesson.slug}`;
                    const completed = isCompleted(lesson.id);

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/learn/${lesson.slug}`}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                            active
                              ? "bg-violet-600/30 text-white font-medium border border-violet-500/40"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate flex-1">{lesson.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
