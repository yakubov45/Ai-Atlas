"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Play,
  Film,
  Search,
  Filter,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Globe,
  Layers,
  Sparkles,
  X,
  BookOpen,
} from "lucide-react";
import {
  YOUTUBE_CATALOG_VIDEOS,
  YOUTUBE_TOPICS,
  YouTubeEducationalVideo,
  VideoLanguage,
  VideoTrackId,
} from "@/lib/media/youtube-videos-data";

export function VideoCatalogClient() {
  const [selectedLanguage, setSelectedLanguage] = useState<VideoLanguage | "all">("all");
  const [selectedTrack, setSelectedTrack] = useState<VideoTrackId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<YouTubeEducationalVideo | null>(null);
  const [showGapsInfo, setShowGapsInfo] = useState(false);

  // Filtered videos list
  const filteredVideos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return YOUTUBE_CATALOG_VIDEOS.filter((v) => {
      // Language filter
      if (selectedLanguage !== "all" && v.language !== selectedLanguage) {
        return false;
      }

      // Track filter
      if (selectedTrack !== "all" && v.trackId !== selectedTrack) {
        return false;
      }

      // Search query
      if (q) {
        const matchesTitle = v.title.toLowerCase().includes(q);
        const matchesTopic = v.topicTitle.toLowerCase().includes(q);
        const matchesChannel = v.channelTitle.toLowerCase().includes(q);
        const matchesId = v.topicId.toLowerCase().includes(q);
        const matchesLearns = v.whatLearnsUz.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTopic && !matchesChannel && !matchesId && !matchesLearns) {
          return false;
        }
      }

      return true;
    });
  }, [selectedLanguage, selectedTrack, searchQuery]);

  // Language counts
  const langCounts = useMemo(() => {
    return {
      all: YOUTUBE_CATALOG_VIDEOS.length,
      uz: YOUTUBE_CATALOG_VIDEOS.filter((v) => v.language === "uz").length,
      ru: YOUTUBE_CATALOG_VIDEOS.filter((v) => v.language === "ru").length,
      en: YOUTUBE_CATALOG_VIDEOS.filter((v) => v.language === "en").length,
    };
  }, []);

  // Language flag and label helpers
  const getLangBadge = (lang: VideoLanguage) => {
    switch (lang) {
      case "uz":
        return { label: "O'zbekcha", flag: "🇺🇿", bg: "bg-emerald-950/80 text-emerald-300 border-emerald-600/30" };
      case "ru":
        return { label: "Ruscha", flag: "🇷🇺", bg: "bg-blue-950/80 text-blue-300 border-blue-600/30" };
      case "en":
        return { label: "Inglizcha", flag: "🇬🇧", bg: "bg-violet-950/80 text-violet-300 border-violet-600/30" };
    }
  };

  // Sibling videos for the active modal video (same topic in different languages)
  const siblingVideos = useMemo(() => {
    if (!activeVideo) return [];
    return YOUTUBE_CATALOG_VIDEOS.filter(
      (v) => v.topicId === activeVideo.topicId && v.id !== activeVideo.id
    );
  }, [activeVideo]);

  return (
    <div className="space-y-8">
      {/* Top Banner & Stats */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
          <Film className="w-3.5 h-3.5 text-red-500" />
          <span>3 Tilda Saralangan YouTube Darslar Katalogi</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          AI Atlas Video Darslar Kutubxonasi
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
          AI Atlas platformasining 6 ta asosiy yo‘nalishi (Python Developer, Machine Learning, Data Science, AI Engineer, Data Engineer va Prompt Engineering) bo‘yicha 36 ta mavzuni o‘zbek, rus va ingliz tillaridagi tasdiqlangan, sara video darslar bilan o‘rganing.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
            <span className="text-xl sm:text-2xl font-bold text-white">{YOUTUBE_CATALOG_VIDEOS.length} ta</span>
            <p className="text-xs text-slate-400">Tasdiqlangan Video Dars</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
            <span className="text-xl sm:text-2xl font-bold text-white">{YOUTUBE_TOPICS.length} ta</span>
            <p className="text-xs text-slate-400">Asosiy Mavzu (A1–F6)</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">{langCounts.uz} ta</span>
            <p className="text-xs text-slate-400">O&apos;zbek Tilidagi Darslar</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
            <span className="text-xl sm:text-2xl font-bold text-violet-400">6 ta</span>
            <p className="text-xs text-slate-400">Muhandislik Yo&apos;nalishi</p>
          </div>
        </div>
      </div>

      {/* Language Filter Tabs */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium self-start overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedLanguage("all")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedLanguage === "all"
                  ? "bg-violet-600 text-white font-semibold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Barcha Tillar</span>
              <span className="text-[10px] opacity-80">({langCounts.all})</span>
            </button>

            <button
              onClick={() => setSelectedLanguage("uz")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedLanguage === "uz"
                  ? "bg-emerald-600 text-white font-semibold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇺🇿 O&apos;zbekcha</span>
              <span className="text-[10px] opacity-80">({langCounts.uz})</span>
            </button>

            <button
              onClick={() => setSelectedLanguage("ru")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedLanguage === "ru"
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇷🇺 Ruscha</span>
              <span className="text-[10px] opacity-80">({langCounts.ru})</span>
            </button>

            <button
              onClick={() => setSelectedLanguage("en")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedLanguage === "en"
                  ? "bg-violet-600 text-white font-semibold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇬🇧 Inglizcha</span>
              <span className="text-[10px] opacity-80">({langCounts.en})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mavzu, kanal yoki kalit so'z..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Track Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {[
            { id: "all", label: "Barcha Yo'nalishlar" },
            { id: "python-dev", label: "Python Developer" },
            { id: "ml-engineer", label: "Machine Learning" },
            { id: "data-scientist", label: "Data Science" },
            { id: "ai-engineer", label: "AI Engineering" },
            { id: "data-engineer", label: "Data Engineering" },
            { id: "prompt-engineer", label: "Prompt Engineering" },
          ].map((trk) => (
            <button
              key={trk.id}
              onClick={() => setSelectedTrack(trk.id as any)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                selectedTrack === trk.id
                  ? "bg-slate-100 text-slate-950 font-semibold shadow"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80"
              }`}
            >
              {trk.label}
            </button>
          ))}
        </div>
      </div>

      {/* Uzbek Language Gap Warning & Guidance */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>O&apos;zbek tilidagi audio qamrovi va tavsiyalar</span>
          </div>
          <button
            onClick={() => setShowGapsInfo(!showGapsInfo)}
            className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
          >
            {showGapsInfo ? "Yopish" : "Batafsil ma'lumot"}
          </button>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Python asoslari (A1–A6) o&apos;zbek tilida to&apos;liq shakllangan. Ilg&apos;or ML baholash, A/B test, RAG va Prompt xavfsizligi kabi 19 ta tor mavzuda bevosita o&apos;zbekcha audio mavjud bo&apos;lmagani sababli, ularning yoniga ruscha va inglizcha eng sara darslar qo&apos;shildi.
        </p>

        {showGapsInfo && (
          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-slate-400">
            <p>
              💡 <strong>Tavsiya:</strong> Agar siz tanlagan mavzuda o&apos;zbekcha video mavjud bo&apos;lmasa, video kartochkasi orqali uning ruscha (🇷🇺) yoki inglizcha (🇬🇧) hamroh darsini tanlang.
            </p>
          </div>
        )}
      </div>

      {/* Video Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{filteredVideos.length} ta dars ko&apos;rsatilmoqda</span>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 border border-slate-800 rounded-2xl space-y-2">
            <Film className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Dars topilmadi</p>
            <p className="text-xs text-slate-500">Qidiruv so&apos;rovini yoki filtrlarni o&apos;zgartirib ko&apos;ring.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((video) => {
              const langBadge = getLangBadge(video.language);

              return (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="group bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-950">
                        <Film className="w-10 h-10 text-slate-800" />
                      </div>
                    )}

                    {/* Play Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Language Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md ${langBadge.bg}`}
                      >
                        <span>{langBadge.flag}</span>
                        <span>{langBadge.label}</span>
                      </span>
                    </div>

                    {/* Timestamp / Chapter Pill */}
                    {video.timestampLabel && (
                      <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2 py-0.5 rounded-md text-[10px] text-slate-300 font-mono">
                        {video.timestampLabel}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      {/* Topic Pill */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                          {video.topicId}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate">
                          {video.trackTitle}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">
                        {video.title}
                      </h3>

                      <p className="text-[11px] text-slate-400 font-medium truncate">
                        Kanal: {video.channelTitle}
                      </p>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1 border-t border-slate-800/60">
                        {video.whatLearnsUz}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>Mavzu: {video.topicTitle}</span>
                      </span>

                      <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Ko&apos;rish</span>
                        <Play className="w-3 h-3 fill-current" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-100 space-y-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs font-mono font-bold">
                    {activeVideo.topicId}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeVideo.trackTitle} • {activeVideo.topicTitle}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getLangBadge(activeVideo.language).bg}`}
                  >
                    {getLangBadge(activeVideo.language).flag} {getLangBadge(activeVideo.language).label}
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-bold text-white">{activeVideo.title}</h2>
                <p className="text-xs text-slate-400">Muallif / Kanal: {activeVideo.channelTitle}</p>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded YouTube Iframe */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
              {activeVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&start=${activeVideo.startSeconds}`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <Film className="w-10 h-10 text-slate-600" />
                  <p className="text-sm font-semibold text-slate-300">Video havolasi to&apos;g&apos;ridan-to&apos;g&apos;ri YouTube&apos;da ochiladi</p>
                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold"
                  >
                    <span>YouTube&apos;da tomosha qilish</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Learning Outcomes & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <h4 className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Talaba nimani o&apos;rganadi?
                </h4>
                <p className="text-slate-300 leading-relaxed">{activeVideo.whatLearnsUz}</p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <h4 className="font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Tekshiruv dalili & Bob vaqti
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {activeVideo.timestampLabel ? `Bob / Vaqt: ${activeVideo.timestampLabel}. ` : ""}
                  {activeVideo.evidenceUz}
                </p>
              </div>
            </div>

            {/* Sibling Videos (Same topic in other languages) */}
            {siblingVideos.length > 0 && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Ushbu mavzu bo&apos;yicha boshqa tillardagi darslar:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {siblingVideos.map((sib) => {
                    const badge = getLangBadge(sib.language);
                    return (
                      <button
                        key={sib.id}
                        onClick={() => setActiveVideo(sib)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 transition-all text-left cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                            {badge.flag} {badge.label}
                          </span>
                          <p className="text-xs font-medium text-white truncate mt-1">{sib.title}</p>
                          <p className="text-[11px] text-slate-400 truncate">{sib.channelTitle}</p>
                        </div>
                        <Play className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <span>YouTube rasmiy sahifasida ochish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
