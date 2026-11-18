import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "subtle";
}

export function Card({ variant = "default", className = "", children, ...props }: CardProps) {
  const variants = {
    default:
      "bg-slate-900/80 border border-slate-800/80 rounded-xl p-6 text-slate-100 shadow-sm backdrop-blur-sm",
    elevated:
      "bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-lg shadow-black/20",
    interactive:
      "bg-slate-900/70 border border-slate-800/80 hover:border-violet-500/50 rounded-xl p-6 text-slate-100 transition-all duration-200 hover:shadow-md hover:shadow-violet-950/20 hover:-translate-y-0.5 cursor-pointer",
    subtle:
      "bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 text-slate-200",
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
