"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, CheckCircle2, Search } from "lucide-react";
import type { SidebarGroup } from "@/lib/content/types";
import { useLearning } from "@/hooks/use-learning";

export function LessonSidebar({
  groups,
  onNavigate,
}: {
  groups: readonly SidebarGroup[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { isCompleted } = useLearning();
  const [searchQuery, setSearchQuery] = useState("");

  // Default to COLLAPSED categories; expand only the active lesson's category if present
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const group of groups) {
      if (group.lessons.some((l) => `/learn/${l.slug}` === pathname)) {
        initial.add(group.category.id);
      }
    }
    return initial;
  });

  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        lessons: g.lessons.filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.slug.toLowerCase().includes(q) ||
            l.tags.some((t) => t.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.lessons.length > 0);
  }, [groups, searchQuery]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const allExpanded =
    filteredGroups.length > 0 &&
    filteredGroups.every((g) => expandedCategories.has(g.category.id));

  const handleToggleAll = () => {
    if (allExpanded) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(filteredGroups.map((g) => g.category.id)));
    }
  };

  return (
    <aside className="w-full flex flex-col gap-3">
      {/* Compact filter + Collapse/Expand All */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Dars qidirish..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-8 pr-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleToggleAll}
          className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-[11px] font-medium text-slate-300 hover:text-white shrink-0 cursor-pointer"
        >
          {allExpanded ? "Barchasini yig'ish" : "Barchasini ochish"}
        </button>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Darslar ro'yxati">
        {filteredGroups.map((group) => {
          const isExpanded =
            searchQuery.trim().length > 0 || expandedCategories.has(group.category.id);
          const completedInGroup = group.lessons.filter((l) => isCompleted(l.id)).length;

          return (
            <div
              key={group.category.id}
              className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-1.5 space-y-1"
            >
              <button
                type="button"
                onClick={() => toggleCategory(group.category.id)}
                className="w-full flex items-center justify-between gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
              >
                <span className="truncate">{group.category.title}</span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500">
                    {completedInGroup}/{group.lessons.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </span>
              </button>

              {isExpanded && (
                <ul className="space-y-0.5 pl-1 pt-0.5">
                  {group.lessons.map((item) => {
                    const href = `/learn/${item.slug}`;
                    const isActive = pathname === href;
                    const done = isCompleted(item.id);

                    return (
                      <li key={item.id}>
                        <Link
                          href={href}
                          onClick={onNavigate}
                          className={`group flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                            isActive
                              ? "bg-slate-800 text-cyan-300 border-l-2 border-cyan-400 font-semibold shadow-sm"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                          {done && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
