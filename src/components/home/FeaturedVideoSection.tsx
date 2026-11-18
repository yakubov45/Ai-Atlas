"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Film,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  X,
  CheckCircle2,
} from "lucide-react";
import { ManimVideoPlayer } from "@/components/visualizations/ManimVideoPlayer";
import {
  EDUCATIONAL_VIDEOS,
  EducationalVideo,
  getFeaturedVideo,
} from "@/lib/media/educational-videos";

export function FeaturedVideoSection() {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>("all");
  const [activeModalVideo, setActiveModalVideo] = useState<EducationalVideo | null>(null);

  const featuredVideo = getFeaturedVideo();

  const filteredVideos =
    selectedTrackFilter === "all"
      ? EDUCATIONAL_VIDEOS
      : EDUCATIONAL_VIDEOS.filter((v) => v.trackId === selectedTrackFilter);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
            <Film className="w-3.5 h-3.5 text-violet-400" />
            <span>Vizual Ta&apos;lim & Manim Animatsiyalari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Murakkab algoritmlarni videoda jonli ko‘ring
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Quruq formulalar o&apos;rniga aniq matematik animatsiyalar. Har bir videoda algoritmning har bir qadami vizual tarzda ko&apos;rsatilgan.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "Barchasi (9)" },
            { id: "python-dev", label: "Python (2)" },
            { id: "ai-engineer", label: "AI Eng (3)" },
            { id: "ml-engineer", label: "ML Eng (2)" },
            { id: "data-scientist", label: "Data Science (2)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTrackFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTrackFilter === tab.id
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/30"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Video Highlight Card */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tanlangan Asosiy Video Dars • {featuredVideo.trackTitle}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            {featuredVideo.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {featuredVideo.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {featuredVideo.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-medium text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setActiveModalVideo(featuredVideo)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-md shadow-violet-900/30"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>To&apos;liq ekranda tomosha qilish</span>
            </button>

            <Link
              href={`/roadmap?tab=${featuredVideo.trackId}`}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold transition-colors"
            >
              <span>Yo&apos;nalishga o&apos;tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Video Player Container */}
        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video shadow-2xl relative group">
          <ManimVideoPlayer
            src={featuredVideo.sourceUrl}
            title={featuredVideo.title}
            description={featuredVideo.description}
            autoPlay={false}
            loop={true}
          />
        </div>
      </div>

      {/* Explore Through Videos: Horizontal Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            Mavzular bo‘yicha Manim video darslar ({filteredVideos.length} ta)
          </span>
          <span>Bosing va sahifadan chiqmasdan ko‘ring</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/50 p-5 flex flex-col justify-between space-y-4 transition-all hover:bg-slate-900"
            >
              <div className="space-y-3">
                {/* Track Badge & Duration */}
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-semibold text-cyan-300">
                    <Layers className="w-3 h-3 text-violet-400" />
                    <span>{video.trackTitle}</span>
                  </span>
                  {video.durationSeconds && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{video.durationSeconds} soniya</span>
                    </span>
                  )}
                </div>

                {/* Video Title & Short Description */}
                <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {video.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Mini Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {video.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: Play in Modal & Lesson Link */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setActiveModalVideo(video)}
                  className="inline-flex items-center gap-1.5 font-bold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Videoni ochish</span>
                </button>

                <Link
                  href={`/roadmap?tab=${video.trackId}`}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span>Darsga o‘tish</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Preview */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  {activeModalVideo.trackTitle}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {activeModalVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black aspect-video">
              <ManimVideoPlayer
                src={activeModalVideo.sourceUrl}
                title={activeModalVideo.title}
                description={activeModalVideo.description}
                autoPlay={false}
                loop={true}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 pt-1">
              <p className="line-clamp-2 max-w-xl">{activeModalVideo.description}</p>
              <Link
                href={`/roadmap?tab=${activeModalVideo.trackId}`}
                onClick={() => setActiveModalVideo(null)}
                className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold shrink-0"
              >
                <span>Yo&apos;nalish xaritasini ochish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
