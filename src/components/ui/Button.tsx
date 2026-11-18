import React, { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none rounded-lg cursor-pointer";

    const variants = {
      primary:
        "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-sm shadow-violet-900/20 active:scale-[0.98]",
      secondary:
        "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 active:scale-[0.98] dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 light:bg-slate-100 light:hover:bg-slate-200 light:text-slate-900 light:border-slate-300",
      outline:
        "border border-slate-700 hover:bg-slate-800/60 text-slate-200 hover:text-white dark:border-slate-700 dark:text-slate-200 light:border-slate-300 light:text-slate-700 light:hover:bg-slate-100",
      ghost:
        "text-slate-300 hover:text-white hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100",
      danger:
        "bg-rose-600 hover:bg-rose-500 text-white active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-5 py-2.5 gap-2.5",
      icon: "p-2 w-9 h-9",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
