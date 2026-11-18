"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Compass,
  PlayCircle,
  X,
  Code2,
  Cpu,
  BarChart3,
  Terminal,
} from "lucide-react";
import { HeroAiVisual } from "./HeroAiVisual";
import { ManimVideoPlayer } from "@/components/visualizations/ManimVideoPlayer";
import { getFeaturedVideo } from "@/lib/media/educational-videos";

export function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const featuredVideo = getFeaturedVideo();

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-violet-600/15 via-cyan-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-700/50 bg-violet-950/40 text-violet-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Atlas • Premium Interaktiv Ta&apos;lim Platformasi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.12]">
              Sun&apos;iy intellektni shunchaki o‘qima.{" "}
              <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Uni yaratishni o‘rgan.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Python dasturlashdan Machine Learning, Data Science va zamonaviy AI tizimlarigacha.
              Nazariyani o‘rganing, kod yozing, algoritmlarni vizual tushuning va haqiqiy loyihalar yarating.
            </p>

            {/* Quick Metrics Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <strong>Python</strong> (344 dars)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-violet-400" />
                <strong>AI Engineering</strong> (291 dars)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                <strong>ML Engineering</strong> (466 dars)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <strong>Data Science</strong> (376 dars)
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
              <Link
                href="/roadmap"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-900/40 hover:shadow-violet-800/60 transition-all"
              >
                <span>O‘rganishni boshlash</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-750 font-medium text-sm transition-all"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Yo‘nalishlarni ko‘rish</span>
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-violet-500/50 font-medium text-sm transition-all"
                title="Tanishuv videosini ko'rish"
              >
                <PlayCircle className="w-4 h-4 text-emerald-400" />
                <span>Video tahlil</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300">Interaktiv Neyron Tarmoq & Dinamika</span>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Videoni tomosha qilish</span>
                </button>
              </div>

              <div className="relative group">
                <HeroAiVisual />
                {/* Floating Quick Play Overlay Button */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-violet-600 border border-slate-700 hover:border-violet-400 text-xs text-slate-200 hover:text-white transition-all shadow-lg backdrop-blur-sm"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white" />
                  <span>Manim darsi (42s)</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-tight">
                Vektorlar, neyron qatlamlari va optimizatsiya algoritmlarini har bir darsda jonli boshqaring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Preview */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  {featuredVideo.trackTitle}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {featuredVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black aspect-video">
              <ManimVideoPlayer
                src={featuredVideo.sourceUrl}
                title={featuredVideo.title}
                description={featuredVideo.description}
                autoPlay={false}
                loop={true}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 pt-1">
              <p className="line-clamp-2 max-w-xl">{featuredVideo.description}</p>
              <Link
                href="/roadmap?tab=ml-engineer"
                onClick={() => setIsVideoModalOpen(false)}
                className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold shrink-0"
              >
                <span>To&apos;liq yo&apos;nalishni ko&apos;rish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
