import React from "react";
import { Info, Lightbulb, AlertCircle, AlertTriangle, BookMarked, FlaskConical } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";

export type CalloutType = "note" | "tip" | "important" | "warning" | "definition" | "example";

export interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_STYLES: Record<
  CalloutType,
  {
    border: string;
    bg: string;
    iconColor: string;
    icon: React.ElementType;
    defaultTitle: string;
  }
> = {
  note: {
    border: "border-cyan-800/60",
    bg: "bg-cyan-950/20",
    iconColor: "text-cyan-400",
    icon: Info,
    defaultTitle: uz.callout.note,
  },
  tip: {
    border: "border-emerald-800/60",
    bg: "bg-emerald-950/20",
    iconColor: "text-emerald-400",
    icon: Lightbulb,
    defaultTitle: uz.callout.tip,
  },
  important: {
    border: "border-violet-800/60",
    bg: "bg-violet-950/20",
    iconColor: "text-violet-400",
    icon: AlertCircle,
    defaultTitle: uz.callout.important,
  },
  warning: {
    border: "border-amber-800/60",
    bg: "bg-amber-950/20",
    iconColor: "text-amber-400",
    icon: AlertTriangle,
    defaultTitle: uz.callout.warning,
  },
  definition: {
    border: "border-indigo-800/60",
    bg: "bg-indigo-950/20",
    iconColor: "text-indigo-400",
    icon: BookMarked,
    defaultTitle: uz.callout.definition,
  },
  example: {
    border: "border-slate-700/80",
    bg: "bg-slate-900/40",
    iconColor: "text-slate-400",
    icon: FlaskConical,
    defaultTitle: uz.callout.example,
  },
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  const style = CALLOUT_STYLES[type] || CALLOUT_STYLES.note;
  const Icon = style.icon;

  return (
    <div className={`my-5 rounded-xl border ${style.border} ${style.bg} p-4.5 text-xs sm:text-sm text-slate-200 shadow-sm leading-relaxed`}>
      <div className="flex items-center gap-2 font-semibold mb-2">
        <Icon className={`w-4 h-4 ${style.iconColor} shrink-0`} />
        <span className={style.iconColor}>{title ?? style.defaultTitle}</span>
      </div>
      <div className="text-slate-300 space-y-2">{children}</div>
    </div>
  );
}
