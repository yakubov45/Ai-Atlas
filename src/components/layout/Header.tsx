"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  BookOpen,
  Boxes,
  Workflow,
  Sparkles,
  Bookmark,
  Settings,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Terminal,
  Award,
  Network,
} from "lucide-react";
import { usePreferences } from "@/hooks/use-preferences";
import { uz } from "@/i18n/dictionaries/uz";
import { SearchDialog } from "@/components/search/SearchDialog";

export function Header() {
  const pathname = usePathname();
  const { updatePreferences, resolvedTheme } = usePreferences();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/learn", label: uz.nav.learn, icon: BookOpen },
    { href: "/learn/map", label: "Bilimlar xaritasi", icon: Network },
    { href: "/roadmap?tab=python-dev", label: "Python", icon: Terminal },
    { href: "/practice/python-30-days", label: "30 Days Python", icon: Award },
    { href: "/roadmap", label: uz.nav.roadmap, icon: Workflow },
    { href: "/visual-lab", label: uz.nav.visualLab, icon: Boxes },
    { href: "/glossary", label: uz.nav.glossary, icon: Sparkles },
    { href: "/bookmarks", label: uz.nav.bookmarks, icon: Bookmark },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/learn/map") {
      return pathname === "/learn/map";
    }
    if (href.includes("?tab=python-dev")) {
      if ((pathname === "/roadmap" || pathname === "/learn") && typeof window !== "undefined") {
        return window.location.search.includes("python");
      }
      return false;
    }
    if (href === "/roadmap") {
      if (pathname === "/roadmap") {
        if (typeof window !== "undefined" && window.location.search.includes("python")) {
          return false;
        }
        return true;
      }
      return false;
    }
    if (href === "/learn") {
      if (pathname === "/learn/map") {
        return false;
      }
      if (pathname === "/learn") {
        if (typeof window !== "undefined" && window.location.search.includes("python")) {
          return false;
        }
        return true;
      }
      return pathname.startsWith("/learn/");
    }
    return pathname.startsWith(href);
  };

  const toggleTheme = () => {
    updatePreferences({ theme: resolvedTheme === "dark" ? "light" : "dark" });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md transition-colors">
        <div className="w-full px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-white hover:opacity-90 transition-opacity"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label={uz.nav.primary}>
            {navLinks.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "text-white bg-slate-800/90 shadow-sm border border-slate-700/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 transition-all cursor-pointer shadow-inner"
              title={`${uz.common.search} (Ctrl+K)`}
              aria-label={uz.common.search}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">{uz.common.search}…</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer"
              title={resolvedTheme === "dark" ? uz.theme.toLight : uz.theme.toDark}
              aria-label={uz.theme.toggle}
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Settings Link */}
            <Link
              href="/settings"
              className={`p-2 rounded-lg transition-all ${
                pathname === "/settings"
                  ? "text-white bg-slate-800 border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
              title={uz.nav.settings}
              aria-label={uz.nav.settings}
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
              aria-label={mobileMenuOpen ? uz.nav.closeMenu : uz.nav.openMenu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-slate-800 text-white border border-slate-700"
                      : "text-slate-300 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
