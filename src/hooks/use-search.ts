"use client";

import { useEffect, useState } from "react";
import {
  createSearchEngine,
  type SearchDocument,
  type SearchEngine,
  type SearchOptions,
  type SearchResult,
} from "@/lib/search/core";

let cachedEngine: SearchEngine | null = null;
let fetchPromise: Promise<SearchEngine> | null = null;

async function loadSearchEngine(): Promise<SearchEngine> {
  if (cachedEngine) return cachedEngine;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/search-index")
    .then((res) => {
      if (!res.ok) throw new Error(`Qidiruv indeksini yuklab bo'lmadi: ${res.status}`);
      return res.json();
    })
    .then((data: { documents?: SearchDocument[] }) => {
      const engine = createSearchEngine(data.documents ?? []);
      cachedEngine = engine;
      return engine;
    })
    .catch((err) => {
      fetchPromise = null;
      throw err;
    });

  return fetchPromise;
}

export function useSearch(initialDocuments?: SearchDocument[]) {
  const [engine, setEngine] = useState<SearchEngine | null>(() => {
    if (initialDocuments) return createSearchEngine(initialDocuments);
    return cachedEngine;
  });
  const [loading, setLoading] = useState<boolean>(!engine);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (engine) return;
    let active = true;
    loadSearchEngine()
      .then((eng) => {
        if (active) {
          setEngine(eng);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [engine]);

  const search = (query: string, options?: SearchOptions): SearchResult[] => {
    if (!engine) return [];
    return engine.search(query, options);
  };

  return { engine, loading, error, search, totalDocuments: engine?.size ?? 0 };
}
