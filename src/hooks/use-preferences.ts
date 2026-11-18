"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  applyPreferences,
  getPreferencesStore,
  getServerPreferencesSnapshot,
  resolveReducedMotion,
  resolveTheme,
  type Preferences,
} from "@/lib/preferences/preferences";

export function usePreferences(): {
  preferences: Preferences;
  updatePreferences: (patch: Partial<Preferences>) => void;
  resetPreferences: () => void;
  resolvedTheme: "dark" | "light";
  resolvedReducedMotion: boolean;
} {
  const store = getPreferencesStore();
  const preferences = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerPreferencesSnapshot,
  );

  const systemPrefersDark =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : true;

  const systemPrefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const resolvedTheme = resolveTheme(preferences.theme, systemPrefersDark);
  const resolvedReducedMotion = resolveReducedMotion(
    preferences.motion,
    systemPrefersReducedMotion,
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const mediaDark = window.matchMedia("(prefers-color-scheme: dark)");
    const mediaMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      applyPreferences(document.documentElement, preferences, {
        systemPrefersDark: mediaDark.matches,
        systemPrefersReducedMotion: mediaMotion.matches,
      });
    };

    sync();
    mediaDark.addEventListener("change", sync);
    mediaMotion.addEventListener("change", sync);

    return () => {
      mediaDark.removeEventListener("change", sync);
      mediaMotion.removeEventListener("change", sync);
    };
  }, [preferences]);

  return {
    preferences,
    updatePreferences: store.update,
    resetPreferences: store.reset,
    resolvedTheme,
    resolvedReducedMotion,
  };
}
