"use client";

import { useEffect, useState } from "react";

export function useTocSpy(headingIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headingIds.length === 0 || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    for (const id of headingIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headingIds]);

  return activeId;
}
