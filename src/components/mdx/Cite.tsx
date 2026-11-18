import React from "react";
import Link from "next/link";
import type { Reference } from "@/lib/content/schema";
import { ExternalLink, BookOpen } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";

export function Cite({ id, index }: { id: string; index?: number }) {
  const display = index !== undefined ? index + 1 : id;
  return (
    <a
      href={`#ref-${id}`}
      className="inline-flex items-center text-[11px] font-mono font-semibold text-cyan-400 hover:text-cyan-300 hover:underline px-1 py-0.5 align-super"
      title={`Manba: ${id}`}
    >
      [{display}]
    </a>
  );
}

export function CitationList({ references }: { references: readonly Reference[] }) {
  if (references.length === 0) {
    return (
      <p className="text-xs text-slate-500 italic py-2">{uz.lesson.noReferences}</p>
    );
  }

  return (
    <div className="space-y-3 pt-2">
      <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside">
        {references.map((ref, _idx) => (
          <li key={ref.id} id={`ref-${ref.id}`} className="leading-relaxed pl-1">
            <span className="font-semibold text-slate-100">{ref.title}</span>
            {ref.authors && ref.authors.length > 0 && (
              <span className="text-slate-400"> &mdash; {ref.authors.join(", ")}</span>
            )}
            {ref.venue && <span className="text-slate-400 italic">, {ref.venue}</span>}
            {ref.year && <span className="text-slate-400"> ({ref.year})</span>}
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline ml-2"
              >
                <span>Havola</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {ref.note && <p className="text-[11px] text-slate-400 mt-0.5">{ref.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Term({ id, children }: { id: string; children?: React.ReactNode }) {
  return (
    <Link
      href={`/glossary#${id}`}
      className="text-violet-400 hover:text-violet-300 underline decoration-violet-500/50 hover:decoration-violet-400 underline-offset-4 font-medium transition-colors"
      title={`Glossariy: ${id}`}
    >
      {children ?? id}
    </Link>
  );
}

export function LessonLink({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description?: string;
}) {
  return (
    <Link
      href={`/learn/${slug}`}
      className="block my-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-violet-500/50 hover:bg-slate-900 transition-all text-xs group"
    >
      <div className="flex items-center gap-2 font-semibold text-slate-200 group-hover:text-violet-300">
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span>{title}</span>
      </div>
      {description && <p className="text-slate-400 mt-1 line-clamp-1">{description}</p>}
    </Link>
  );
}
