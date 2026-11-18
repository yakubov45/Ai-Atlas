import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs py-10 transition-colors">
      <div className="w-full px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-100">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>{uz.meta.siteName}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {uz.meta.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interaktiv ta'lim tizimi faol</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              {uz.nav.primary}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/learn" className="hover:text-cyan-400 transition-colors">
                  {uz.nav.learn}
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-cyan-400 transition-colors">
                  {uz.nav.roadmap}
                </Link>
              </li>
              <li>
                <Link href="/visual-lab" className="hover:text-cyan-400 transition-colors">
                  {uz.nav.visualLab}
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-cyan-400 transition-colors">
                  {uz.nav.glossary}
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic disclaimer */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Akademik reja
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {uz.footer.note}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {uz.meta.siteName}. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/settings" className="hover:text-slate-300">
              {uz.nav.settings}
            </Link>
            <span>&bull;</span>
            <Link href="/bookmarks" className="hover:text-slate-300">
              {uz.nav.bookmarks}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
