import { MemoryStorage, STORAGE_PREFIX, getBrowserStorage, type KeyValueStorage } from "@/lib/storage/storage";

export const THEME_OPTIONS = ["dark", "light", "system"] as const;
export const MOTION_OPTIONS = ["system", "reduce", "full"] as const;
export const FONT_SIZE_OPTIONS = ["sm", "md", "lg", "xl"] as const;
export const CONTENT_WIDTH_OPTIONS = ["narrow", "normal", "wide"] as const;
export const FONT_FAMILY_OPTIONS = ["sans", "serif"] as const;

export type ThemePreference = (typeof THEME_OPTIONS)[number];
export type MotionPreference = (typeof MOTION_OPTIONS)[number];
export type FontSizePreference = (typeof FONT_SIZE_OPTIONS)[number];
export type ContentWidthPreference = (typeof CONTENT_WIDTH_OPTIONS)[number];
export type FontFamilyPreference = (typeof FONT_FAMILY_OPTIONS)[number];

export interface Preferences {
  theme: ThemePreference;
  motion: MotionPreference;
  fontSize: FontSizePreference;
  contentWidth: ContentWidthPreference;
  fontFamily: FontFamilyPreference;
}

export const DEFAULT_PREFERENCES: Preferences = Object.freeze({
  theme: "dark",
  motion: "system",
  fontSize: "md",
  contentWidth: "normal",
  fontFamily: "sans",
});

export const PREFERENCES_STORAGE_KEY = `${STORAGE_PREFIX}preferences:v1`;

function pick<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === "string" && (options as readonly string[]).includes(value) ? (value as T) : fallback;
}

export function sanitizePreferences(value: unknown): Preferences {
  const v = (typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>;
  return {
    theme: pick(v.theme, THEME_OPTIONS, DEFAULT_PREFERENCES.theme),
    motion: pick(v.motion, MOTION_OPTIONS, DEFAULT_PREFERENCES.motion),
    fontSize: pick(v.fontSize, FONT_SIZE_OPTIONS, DEFAULT_PREFERENCES.fontSize),
    contentWidth: pick(v.contentWidth, CONTENT_WIDTH_OPTIONS, DEFAULT_PREFERENCES.contentWidth),
    fontFamily: pick(v.fontFamily, FONT_FAMILY_OPTIONS, DEFAULT_PREFERENCES.fontFamily),
  };
}

export interface EnvironmentSignals {
  systemPrefersDark: boolean;
  systemPrefersReducedMotion: boolean;
}

export function resolveTheme(theme: ThemePreference, systemPrefersDark: boolean): "dark" | "light" {
  if (theme === "system") return systemPrefersDark ? "dark" : "light";
  return theme;
}

export function resolveReducedMotion(motion: MotionPreference, systemPrefersReducedMotion: boolean): boolean {
  if (motion === "system") return systemPrefersReducedMotion;
  return motion === "reduce";
}

/** Applies preferences to the root element (class + data attributes read by CSS). */
export function applyPreferences(root: HTMLElement, preferences: Preferences, env: EnvironmentSignals): void {
  const theme = resolveTheme(preferences.theme, env.systemPrefersDark);
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
  root.dataset.motion = resolveReducedMotion(preferences.motion, env.systemPrefersReducedMotion) ? "reduce" : "full";
  root.dataset.fontSize = preferences.fontSize;
  root.dataset.contentWidth = preferences.contentWidth;
  root.dataset.fontFamily = preferences.fontFamily;
}

/**
 * Inline script executed before first paint to avoid a theme flash.
 * Mirrors `applyPreferences` without any imports.
 */
export const PREFERENCES_INIT_SCRIPT = `(function(){try{var d=document.documentElement;var p={};try{p=JSON.parse(localStorage.getItem(${JSON.stringify(
  PREFERENCES_STORAGE_KEY,
)})||"{}")||{};}catch(e){}var t=p.theme||${JSON.stringify(DEFAULT_PREFERENCES.theme)};if(t==="system"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t!=="light"&&t!=="dark"){t="dark";}d.classList.add(t);d.classList.remove(t==="dark"?"light":"dark");d.style.colorScheme=t;d.dataset.theme=t;var m=p.motion||"system";var r=m==="reduce"||(m==="system"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);d.dataset.motion=r?"reduce":"full";d.dataset.fontSize=p.fontSize||"md";d.dataset.contentWidth=p.contentWidth||"normal";d.dataset.fontFamily=p.fontFamily||"sans";}catch(e){}})();`;

export interface PreferencesStore {
  getSnapshot(): Preferences;
  subscribe(listener: () => void): () => void;
  update(patch: Partial<Preferences>): void;
  reset(): void;
}

export function createPreferencesStore(storage: KeyValueStorage, key: string = PREFERENCES_STORAGE_KEY): PreferencesStore {
  const read = (): Preferences => {
    try {
      return sanitizePreferences(JSON.parse(storage.getItem(key) ?? "{}"));
    } catch {
      return { ...DEFAULT_PREFERENCES };
    }
  };
  let state = read();
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key === key || event.key === null) {
        state = read();
        emit();
      }
    });
  }

  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update(patch) {
      state = sanitizePreferences({ ...state, ...patch });
      try {
        storage.setItem(key, JSON.stringify(state));
      } catch {
        /* storage unavailable — keep in memory */
      }
      emit();
    },
    reset() {
      storage.removeItem(key);
      state = { ...DEFAULT_PREFERENCES };
      emit();
    },
  };
}

let browserStore: PreferencesStore | null = null;

export function getPreferencesStore(): PreferencesStore {
  if (!browserStore) browserStore = createPreferencesStore(getBrowserStorage() ?? new MemoryStorage());
  return browserStore;
}

export const getServerPreferencesSnapshot = (): Preferences => DEFAULT_PREFERENCES;
