"use client";

import React, { useEffect, useState } from "react";
import { useLearning } from "@/hooks/use-learning";

export function ReadingProgress({ lessonId }: { lessonId: string }) {
  const [progress, setProgress] = useState(0);
  const { updateVisitProgress } = useLearning();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const current = Math.min(1, Math.max(0, window.scrollY / docHeight));
            setProgress(current);
            updateVisitProgress(lessonId, current);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lessonId, updateVisitProgress]);

  return (
    <div className="fixed top-16 left-0 right-0 h-1 z-30 bg-slate-800/40 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 transition-all duration-150 ease-out shadow-sm shadow-cyan-400/30"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
