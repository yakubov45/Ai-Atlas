import { describe, it, expect } from "vitest";
import {
  resolveTheme,
  resolveReducedMotion,
  applyPreferences,
} from "@/lib/preferences/preferences";

describe("User Preferences System", () => {
  it("resolves theme preferences correctly based on system match", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
  });

  it("resolves reduced motion preferences", () => {
    expect(resolveReducedMotion("reduce", false)).toBe(true);
    expect(resolveReducedMotion("full", true)).toBe(false);
    expect(resolveReducedMotion("system", true)).toBe(true);
    expect(resolveReducedMotion("system", false)).toBe(false);
  });

  it("applies preferences to the root HTML element attributes", () => {
    const root = document.createElement("html");
    const prefs = {
      theme: "dark" as const,
      motion: "reduce" as const,
      fontSize: "lg" as const,
      contentWidth: "normal" as const,
      fontFamily: "serif" as const,
    };

    applyPreferences(root, prefs, {
      systemPrefersDark: true,
      systemPrefersReducedMotion: false,
    });

    expect(root.classList.contains("dark")).toBe(true);
    expect(root.dataset.theme).toBe("dark");
    expect(root.dataset.motion).toBe("reduce");
    expect(root.dataset.fontSize).toBe("lg");
    expect(root.dataset.fontFamily).toBe("serif");
  });
});
