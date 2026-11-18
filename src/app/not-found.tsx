import React from "react";
import Link from "next/link";
import { Compass, Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { uz } from "@/i18n/dictionaries/uz";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto my-16">
      <div className="w-16 h-16 rounded-2xl bg-violet-950/40 border border-violet-800/50 flex items-center justify-center text-violet-400 mb-6 shadow-lg shadow-violet-950/30">
        <Compass className="w-8 h-8 text-cyan-400" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight mb-2">404</h1>
      <h2 className="text-lg font-semibold text-slate-200 mb-2">{uz.notFound.title}</h2>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8">
        {uz.notFound.body}
      </p>

      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="primary" size="sm">
            <Home className="w-4 h-4" />
            <span>{uz.common.goHome}</span>
          </Button>
        </Link>
        <Link href="/learn">
          <Button variant="secondary" size="sm">
            <BookOpen className="w-4 h-4" />
            <span>{uz.nav.learn}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
