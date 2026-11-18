/**
 * Search core — shared by the build-time index generator (server) and the
 * in-browser search engine (client). No dependencies.
 */

export type SearchDocumentKind = "lesson" | "section" | "glossary" | "visualization";

export interface SearchDocument {
  /** Unique id inside the index. */
  id: string;
  kind: SearchDocumentKind;
  title: string;
  /** Parent title for sections (lesson title). */
  parentTitle?: string;
  description: string;
  tags: string[];
  body: string;
  url: string;
  category?: string;
}

export interface SearchIndex {
  version: 1;
  generatedAt: string;
  documents: SearchDocument[];
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  snippet: string | null;
}

const APOSTROPHES = /[ʻʼ’‘`´']/g;

/** Lower-cases, strips diacritics and unifies Uzbek apostrophes (oʻ / o' / o’ → o'). */
export function normalizeText(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(APOSTROPHES, "'")
    .toLowerCase();
}

export function tokenize(input: string): string[] {
  return normalizeText(input)
    .split(/[^\p{L}\p{N}']+/u)
    .map((token) => token.replace(/^'+|'+$/g, ""))
    .filter((token) => token.length > 0);
}

interface PreparedDocument {
  document: SearchDocument;
  title: string[];
  tags: string[];
  description: string[];
  body: string;
  bodyTokens: Set<string>;
}

const FIELD_WEIGHTS = { titleExact: 12, titlePrefix: 8, tag: 6, description: 4, body: 1 } as const;
const KIND_BOOST: Record<SearchDocumentKind, number> = { lesson: 1.2, glossary: 1.15, visualization: 1, section: 0.9 };

function prepare(document: SearchDocument): PreparedDocument {
  const body = normalizeText(document.body);
  return {
    document,
    title: tokenize(document.title),
    tags: document.tags.flatMap((tag) => tokenize(tag)),
    description: tokenize(document.description),
    body,
    bodyTokens: new Set(tokenize(document.body)),
  };
}

function scoreToken(doc: PreparedDocument, token: string): number {
  let score = 0;
  if (doc.title.includes(token)) score += FIELD_WEIGHTS.titleExact;
  else if (doc.title.some((t) => t.startsWith(token))) score += FIELD_WEIGHTS.titlePrefix;
  if (doc.tags.some((t) => t.startsWith(token))) score += FIELD_WEIGHTS.tag;
  if (doc.description.some((t) => t.startsWith(token))) score += FIELD_WEIGHTS.description;
  if (doc.bodyTokens.has(token)) score += FIELD_WEIGHTS.body * 2;
  else if (token.length >= 3 && doc.body.includes(token)) score += FIELD_WEIGHTS.body;
  return score;
}

/** Extracts a short excerpt around the first query match in the body. */
export function makeSnippet(body: string, tokens: readonly string[], radius = 80): string | null {
  if (!body) return null;
  const normalized = normalizeText(body);
  let index = -1;
  for (const token of tokens) {
    const found = normalized.indexOf(token);
    if (found !== -1 && (index === -1 || found < index)) index = found;
  }
  if (index === -1) return null;
  const start = Math.max(0, index - radius);
  const end = Math.min(body.length, index + radius * 2);
  return `${start > 0 ? "…" : ""}${body.slice(start, end).trim()}${end < body.length ? "…" : ""}`;
}

export interface SearchOptions {
  limit?: number;
  kinds?: readonly SearchDocumentKind[];
}

export interface SearchEngine {
  size: number;
  search(query: string, options?: SearchOptions): SearchResult[];
}

/**
 * Creates an in-memory search engine. Every query token must match at least
 * one field (AND semantics); prefix matching on title/tags/description.
 */
export function createSearchEngine(documents: readonly SearchDocument[]): SearchEngine {
  const prepared = documents.map(prepare);
  return {
    size: prepared.length,
    search(query, options = {}) {
      const tokens = tokenize(query);
      if (tokens.length === 0) return [];
      const kinds = options.kinds ? new Set(options.kinds) : null;
      const results: SearchResult[] = [];
      for (const doc of prepared) {
        if (kinds && !kinds.has(doc.document.kind)) continue;
        let total = 0;
        let matchedAll = true;
        for (const token of tokens) {
          const s = scoreToken(doc, token);
          if (s === 0) {
            matchedAll = false;
            break;
          }
          total += s;
        }
        if (!matchedAll) continue;
        results.push({
          document: doc.document,
          score: total * KIND_BOOST[doc.document.kind],
          snippet: makeSnippet(doc.document.body, tokens),
        });
      }
      results.sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title));
      return results.slice(0, options.limit ?? 30);
    },
  };
}
