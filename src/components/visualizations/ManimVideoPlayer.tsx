"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  AlertCircle,
  Film,
} from "lucide-react";

export interface ManimVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export function ManimVideoPlayer({
  src,
  poster,
  title = "Manim Matematik Animatsiyasi",
  description,
  autoPlay = false,
  loop = false,
  className = "",
}: ManimVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  // Time formatter (mm:ss)
  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key === "f") {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (videoRef.current) videoRef.current.currentTime -= 3;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (videoRef.current) videoRef.current.currentTime += 3;
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 group select-none ${className}`}
    >
      {/* Top Header Badge */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none transition-opacity duration-300">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 shadow-lg pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-slate-200">{title}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400/90 bg-violet-950/70 px-1.5 py-0.5 rounded border border-violet-800/50">
            Manim CE
          </span>
        </div>
      </div>

      {/* Video Canvas Container */}
      <div className="relative w-full aspect-video flex items-center justify-center bg-[#090d16]">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090d16] z-10">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-xs text-slate-400 font-mono">Animatsiya yuklanmoqda...</span>
          </div>
        )}

        {hasError ? (
          <div className="p-8 text-center max-w-md">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-200 mb-1">Animatsiya fayli tayyorlanmoqda</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Ushbu matematik dars uchun Manim animatsiyasi render qilinmoqda yoki yuklanmoqda ({src}).
            </p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Qayta urinish</span>
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            playsInline
            preload="metadata"
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration);
                setIsLoading(false);
              }
            }}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />
        )}

        {/* Center Giant Play Button (when paused) */}
        {!isPlaying && !isLoading && !hasError && (
          <button
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute z-10 w-16 h-16 rounded-full bg-violet-600/90 hover:bg-violet-500 text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-transform transform hover:scale-110 active:scale-95 group/btn"
          >
            <Play className="w-7 h-7 fill-white ml-1 transition-transform group-hover/btn:scale-105" />
          </button>
        )}
      </div>

      {/* Description caption bar if provided */}
      {description && (
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/60 text-xs text-slate-300 flex items-start gap-2">
          <Film className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{description}</p>
        </div>
      )}

      {/* Control Bar */}
      <div
        className={`px-4 py-2.5 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex flex-col gap-2 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Timeline Scrubber */}
        <div className="relative w-full flex items-center group/scrub">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.05}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-violet-400 hover:accent-violet-300 focus:outline-none transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 text-slate-300">
          {/* Left Buttons: Play, Restart, Time */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pauza" : "Ijro etish"}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={handleRestart}
              aria-label="Boshidan boshlash"
              title="Qayta boshlash"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="font-mono text-xs text-slate-400 pl-1">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-slate-600">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Buttons: Speed, Mute, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center rounded-lg bg-slate-800/80 p-0.5 border border-slate-700/50">
              {[0.75, 1.0, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleSpeedChange(rate)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors ${
                    playbackRate === rate
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Kichik ekranga qaytish" : "To'liq ekran"}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
