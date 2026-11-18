import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = "", ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full bg-slate-900/90 border border-slate-700/80 focus:border-violet-500 rounded-lg py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all ${
            icon ? "pl-10 pr-4" : "px-4"
          } ${className}`}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
