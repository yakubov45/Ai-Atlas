/**
 * Deterministic Quiz Option Shuffler
 *
 * Prevents checkpoint quizzes from having the correct answer predictably at index 0,
 * while ensuring 100% deterministic, stable option order without layout shifts.
 */

export interface ShuffledQuizOption {
  text: string;
  originalIndex: number;
  isCorrect: boolean;
}

export function getShuffledQuizOptions(
  questionId: string,
  options: readonly string[] | string[] | undefined,
  correctIndex: number,
): ShuffledQuizOption[] {
  if (!options || options.length <= 1) {
    return (options || []).map((text, idx) => ({
      text,
      originalIndex: idx,
      isCorrect: idx === correctIndex,
    }));
  }

  // DJB2 hash of questionId
  let hash = 5381;
  const str = questionId || "quiz_default";
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  const items: ShuffledQuizOption[] = options.map((text, idx) => ({
    text,
    originalIndex: idx,
    isCorrect: idx === correctIndex,
  }));

  // Seeded Linear Congruential Generator for Fisher-Yates
  let seed = Math.abs(hash) || 7919;
  for (let i = items.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    const j = Math.floor(rnd * (i + 1));
    const temp = items[i]!;
    items[i] = items[j]!;
    items[j] = temp;
  }

  return items;
}
