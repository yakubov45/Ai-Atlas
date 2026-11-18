import React from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40 max-w-lg mx-auto my-6">
      <div className="w-12 h-12 rounded-xl bg-violet-950/40 border border-violet-800/50 flex items-center justify-center text-violet-400 mb-4 shadow-sm shadow-violet-950/30">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">{description}</p>
      {actionLabel && (
        <div>
          {actionHref ? (
            <a href={actionHref}>
              <Button variant="secondary" size="sm">
                {actionLabel}
              </Button>
            </a>
          ) : onAction ? (
            <Button variant="secondary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
