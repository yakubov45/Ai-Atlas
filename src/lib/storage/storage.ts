/** Minimal key-value storage abstraction (localStorage-compatible). */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export class MemoryStorage implements KeyValueStorage {
  private readonly data = new Map<string, string>();
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
}

/**
 * Returns window.localStorage when available and writable (it can throw in
 * private mode or when storage is disabled), otherwise null.
 */
export function getBrowserStorage(): KeyValueStorage | null {
  if (typeof window === "undefined") return null;
  try {
    const storage = window.localStorage;
    const probe = "__ai_atlas_probe__";
    storage.setItem(probe, "1");
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

export const STORAGE_PREFIX = "ai-atlas:";
