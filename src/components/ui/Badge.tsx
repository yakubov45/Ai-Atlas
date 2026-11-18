import React from "react";
import type { Difficulty, ContentStatus } from "@/lib/content/schema";
import { uz } from "@/i18n/dictionaries/uz";

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: "default" | "violet" | "cyan" | "emerald" | "amber" | "rose" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    violet: "bg-violet-950/70 text-violet-300 border-violet-800/60",
    cyan: "bg-cyan-950/70 text-cyan-300 border-cyan-800/60",
    emerald: "bg-emerald-950/70 text-emerald-300 border-emerald-800/60",
    amber: "bg-amber-950/70 text-amber-300 border-amber-800/60",
    rose: "bg-rose-950/70 text-rose-300 border-rose-800/60",
    outline: "bg-transparent text-slate-400 border-slate-700/80",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const map: Record<Difficulty, { label: string; variant: BadgeProps["variant"] }> = {
    beginner: { label: uz.difficulty.beginner, variant: "emerald" },
    intermediate: { label: uz.difficulty.intermediate, variant: "cyan" },
    advanced: { label: uz.difficulty.advanced, variant: "violet" },
  };
  const { label, variant } = map[difficulty];
  return <Badge variant={variant}>{label}</Badge>;
}

export function StatusBadge({ status }: { status: ContentStatus }) {
  if (status === "published") return null;

  const map: Record<Exclude<ContentStatus, "published">, { label: string; variant: BadgeProps["variant"] }> = {
    draft: { label: uz.status.draft, variant: "amber" },
    review: { label: uz.status.review, variant: "cyan" },
    example: { label: uz.status.example, variant: "rose" },
  };

  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function SyntheticBadge() {
  return (
    <Badge variant="amber" className="tracking-wide uppercase text-[10px] font-semibold">
      {uz.common.syntheticBadge}
    </Badge>
  );
}
