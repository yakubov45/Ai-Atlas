import React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkHeadingIds } from "@/lib/content/markdown";
import { CodeBlock } from "./CodeBlock";
import { MathBlock, MathInline } from "./MathBlock";
import { Callout } from "./Callout";
import { Cite, Term, LessonLink } from "./Cite";
import { Visualization } from "./Visualization";
import { RecallQuestion } from "./RecallQuestion";

export interface MdxRendererProps {
  source: string;
}

const customComponents = {
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    // Look inside child code element
    const child = React.Children.only(props.children) as React.ReactElement<{
      className?: string;
      children?: string;
    }>;
    if (child && child.props) {
      return (
        <CodeBlock className={child.props.className}>
          {child.props.children}
        </CodeBlock>
      );
    }
    return <pre {...props} />;
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-mono text-xs border border-slate-700/60"
        {...props}
      />
    );
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-10 mb-4 pb-3 border-b border-slate-700/80 flex items-center justify-between"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg font-bold text-slate-200 mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-slate-100 leading-relaxed my-4 text-base sm:text-lg font-normal" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-6 my-4 space-y-2.5 text-slate-100 text-base sm:text-lg" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-6 my-4 space-y-2.5 text-slate-100 text-base sm:text-lg" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-violet-500/70 bg-violet-950/20 pl-4 py-2 my-5 italic text-slate-300 rounded-r-lg"
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-800">
      <table className="w-full text-left text-xs sm:text-sm text-slate-300 divide-y divide-slate-800" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 bg-slate-900/90 font-semibold text-slate-100" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 bg-slate-950/40 border-t border-slate-800/60" {...props} />
  ),
  hr: () => <hr className="my-8 border-slate-800" />,
  // Custom Domain Components for Lessons
  Callout,
  MathBlock,
  MathInline,
  Cite,
  Term,
  LessonLink,
  Visualization,
  RecallQuestion,
};

export async function MdxRenderer({ source }: MdxRendererProps) {
  try {
    const { default: ContentComponent } = await evaluate(source, {
      ...jsxRuntime,
      remarkPlugins: [remarkGfm, remarkMath, remarkHeadingIds],
      rehypePlugins: [rehypeKatex],
    });

    return (
      <div className="prose-reader max-w-none">
        <ContentComponent components={customComponents} />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-300 text-xs">
        <p className="font-semibold mb-1">MDX render xatoligi:</p>
        <pre className="overflow-x-auto font-mono text-[11px] text-rose-400">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
}
