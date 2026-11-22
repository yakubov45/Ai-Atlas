/**
 * AI Atlas — Umumiy Rangli Terminlar Ajratish Dvigateli
 *
 * Turli modullar (Neural Networks, Stanford Transformers & LLMs va h.k.)
 * o'z termin lug'ati va semantik rang oilalarini bitta umumiy tokenizer orqali
 * ishlatishi uchun yaratilgan.
 */

export interface TermFamilyStyle {
  labelUz: string;
  badgeCls: string;
  dotCls: string;
  legendCls: string;
}

export interface GenericColoredTerm<F extends string = string> {
  term: string;
  family: F;
  meaningUz: string;
}

export interface GenericTextSegment<F extends string = string> {
  text: string;
  meta: GenericColoredTerm<F> | null;
}

export interface ColoredTermDictionary<F extends string = string> {
  terms: readonly GenericColoredTerm<F>[];
  styles: Readonly<Record<F, TermFamilyStyle>>;
  tokenize: (input: string) => GenericTextSegment<F>[];
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Terminlar ro'yxati va rang stillaridan tez va takrorlanmaydigan
 * longest-first regex tokenizer yaratadi.
 */
export function buildTermDictionary<F extends string>(
  terms: readonly GenericColoredTerm<F>[],
  styles: Readonly<Record<F, TermFamilyStyle>>,
): ColoredTermDictionary<F> {
  const lookup = new Map<string, GenericColoredTerm<F>>(
    terms.map((t) => [t.term.toLowerCase(), t]),
  );

  // Maxsus belgili terminlar ([UNK], [CLS], [MASK], <BOS>...) va oddiy so'zlarni to'g'ri ajratish
  const sortedPatterns = [...terms]
    .sort((a, b) => b.term.length - a.term.length)
    .map((t) => {
      const escaped = escapeRegExp(t.term);
      const startsAlphaNum = /^[A-Za-z0-9]/.test(t.term);
      const endsAlphaNum = /[A-Za-z0-9]$/.test(t.term);
      return `${startsAlphaNum ? "\\b" : ""}${escaped}${endsAlphaNum ? "\\b" : ""}`;
    })
    .join("|");

  const regex = new RegExp(`(${sortedPatterns})`, "g");

  const tokenize = (input: string): GenericTextSegment<F>[] => {
    const segments: GenericTextSegment<F>[] = [];
    let lastIdx = 0;

    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(input)) !== null) {
      if (match.index > lastIdx) {
        segments.push({ text: input.slice(lastIdx, match.index), meta: null });
      }
      const matchedWord = match[0];
      const meta = lookup.get(matchedWord.toLowerCase()) ?? null;
      segments.push({ text: matchedWord, meta });
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < input.length) {
      segments.push({ text: input.slice(lastIdx), meta: null });
    }

    return segments;
  };

  return { terms, styles, tokenize };
}
