import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/50 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-slate-200">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>{uz.meta.siteName}</span>
          </Link>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            {uz.meta.description}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            O&apos;quv Tizimi
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                Shaxsiy Dashboard
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="hover:text-cyan-400 transition-colors">
                Global Yo&apos;l Xaritasi
              </Link>
            </li>
            <li>
              <Link href="/learn" className="hover:text-cyan-400 transition-colors">
                O&apos;quv Kutubxonasi
              </Link>
            </li>
            <li>
              <Link href="/learn/map" className="hover:text-cyan-400 transition-colors">
                Bilimlar Xaritasi
              </Link>
            </li>
            <li>
              <Link href="/practice" className="hover:text-cyan-400 transition-colors">
                Amaliyot &amp; Vizual Lab
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources & Tools */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Resurslar va Sozlamalar
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/resources" className="hover:text-cyan-400 transition-colors">
                Resurslar Markazi
              </Link>
            </li>
            <li>
              <Link href="/videos" className="hover:text-cyan-400 transition-colors">
                Video Darslar Katalogi
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="hover:text-cyan-400 transition-colors">
                {uz.nav.glossary}
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="hover:text-cyan-400 transition-colors">
                {uz.nav.bookmarks}
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-cyan-400 transition-colors">
                {uz.nav.settings}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>{uz.meta.siteName} • {uz.meta.tagline}</p>
          <p className="text-[11px] font-mono text-slate-600">
            Personal AI Learning Operating System
          </p>
        </div>
      </div>
    </footer>
  );
}
