"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookMarked,
  BookOpen,
  Brain,
  ChevronDown,
  Code2,
  Compass,
  FlaskConical,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Library,
  Menu,
  Moon,
  Network,
  Search,
  Settings,
  Sun,
  Video,
  X,
} from "lucide-react";
import { usePreferences } from "@/hooks/use-preferences";
import { uz } from "@/i18n/dictionaries/uz";
import { SearchDialog } from "@/components/search/SearchDialog";

const PRIMARY_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Global Roadmap", icon: Compass },
  { href: "/learn", label: "Kutubxona", icon: Library },
  { href: "/learn/map", label: "Bilimlar xaritasi", icon: Network },
  { href: "/practice", label: "Amaliyot & Lab", icon: Code2 },
  { href: "/resources", label: "Resurslar", icon: BookOpen },
] as const;

const MODULE_LINKS = [
  { href: "/learn/ds-ml-ai-12weeks", label: "12-Haftalik Intensiv Reja", badge: "42 dars", icon: GraduationCap },
  { href: "/learn/hugging-face-llm-course", label: "Hugging Face LLM Course", badge: "220 dars", icon: Layers },
  { href: "/learn/deep-learning-architectures", label: "Deep Learning: 16 Arxitektura", badge: "16 maqola", icon: Network },
  { href: "/learn/how-neural-networks-learn", label: "Neyron Tarmoqlar Qanday O'rganadi?", badge: "12 dars", icon: Brain },
  { href: "/learn/transformers-cme295", label: "Stanford Transformers & LLM (CME 295)", badge: "24 dars", icon: Layers },
  { href: "/practice/python-30-days", label: "30 Days of Python", badge: "Pyodide", icon: Code2 },
  { href: "/visual-lab", label: "Vizual Laboratoriya", badge: "Desmos", icon: FlaskConical },
  { href: "/videos", label: "Video Darslar Katalogi", badge: "97 video", icon: Video },
  { href: "/glossary", label: "Glossariy", badge: "341 atama", icon: BookOpen },
  { href: "/bookmarks", label: "Saqlanganlar", badge: "", icon: BookMarked },
] as const;

export function Header() {
  const pathname = usePathname();
  const { updatePreferences, resolvedTheme } = usePreferences();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const modulesRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    updatePreferences({ theme: resolvedTheme === "dark" ? "light" : "dark" });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (modulesRef.current && !modulesRef.current.contains(e.target as Node)) {
        setModulesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/learn/map") {
      return pathname?.startsWith("/learn/map");
    }
    if (href === "/learn") {
      return pathname === "/learn" || (pathname?.startsWith("/learn/") && !pathname?.startsWith("/learn/map"));
    }
    if (href === "/practice") {
      return pathname?.startsWith("/practice") || pathname?.startsWith("/visual-lab");
    }
    if (href === "/resources") {
      return (
        pathname?.startsWith("/resources") ||
        pathname?.startsWith("/videos") ||
        pathname?.startsWith("/glossary") ||
        pathname?.startsWith("/bookmarks")
      );
    }
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const isModuleRoute = MODULE_LINKS.some((m) => pathname?.startsWith(m.href));

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        {uz.nav.skipToContent}
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-base sm:text-lg tracking-tight text-white hover:opacity-90 transition-opacity shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-sm shadow-violet-900/40">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Compass className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              {uz.meta.siteName}
            </span>
          </Link>

          {/* Desktop 6-section Learning OS Nav + Grouped Modules */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label={uz.nav.primary}
          >
            {PRIMARY_NAV.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? "text-white bg-slate-800/90 shadow-sm border border-slate-700/70"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/70"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400/80" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Compact Modules Dropdown */}
            <div className="relative" ref={modulesRef}>
              <button
                type="button"
                onClick={() => setModulesOpen((prev) => !prev)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  modulesOpen || isModuleRoute
                    ? "text-cyan-200 bg-cyan-950/40 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/70"
                }`}
                aria-expanded={modulesOpen}
              >
                <Layers className="w-3.5 h-3.5 text-violet-400" />
                <span>Modullar</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${modulesOpen ? "rotate-180" : ""}`} />
              </button>

              {modulesOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-2xl p-2 space-y-1">
                  {MODULE_LINKS.map((mod) => {
                    const MIcon = mod.icon;
                    const active = pathname?.startsWith(mod.href);
                    return (
                      <Link
                        key={mod.href}
                        href={mod.href}
                        onClick={() => setModulesOpen(false)}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs transition-colors ${
                          active
                            ? "bg-slate-800 text-white font-semibold"
                            : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <MIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{mod.label}</span>
                        </span>
                        {mod.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                            {mod.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls: Search, Theme, Settings, Mobile Drawer */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 transition-all cursor-pointer shadow-inner"
              aria-label={uz.common.search}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline text-slate-400">{uz.common.search}</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer"
              title={resolvedTheme === "dark" ? uz.theme.toLight : uz.theme.toDark}
              aria-label={resolvedTheme === "dark" ? uz.theme.toLight : uz.theme.toDark}
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href="/settings"
              className={`p-2 rounded-lg transition-all ${
                pathname === "/settings"
                  ? "text-white bg-slate-800 border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
              aria-label={uz.nav.settings}
              title={uz.nav.settings}
            >
              <Settings className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 cursor-pointer"
              aria-label={mobileMenuOpen ? uz.nav.closeMenu : uz.nav.openMenu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-4 max-h-[82vh] overflow-y-auto">
            <div className="space-y-1">
              <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Asosiy bo&apos;limlar
              </div>
              {PRIMARY_NAV.map((item) => {
                const Icon = item.icon;
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-white bg-slate-800 border border-slate-700"
                        : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="space-y-1 border-t border-slate-800 pt-3">
              <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Modullar va kataloglar
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {MODULE_LINKS.map((mod) => {
                  const MIcon = mod.icon;
                  return (
                    <Link
                      key={mod.href}
                      href={mod.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-900 hover:text-white"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <MIcon className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span className="truncate">{mod.label}</span>
                      </span>
                      {mod.badge && <span className="text-[10px] font-mono text-slate-500">{mod.badge}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
