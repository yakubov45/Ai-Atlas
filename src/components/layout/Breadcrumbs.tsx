import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-400 py-2">
      <ol className="flex items-center space-x-1 sm:space-x-2">
        <li>
          <Link
            href="/"
            className="flex items-center text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1 sm:space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-400 hover:text-slate-200 transition-colors truncate max-w-[140px] sm:max-w-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-200 font-medium truncate max-w-[160px] sm:max-w-sm">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
