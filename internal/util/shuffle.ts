/**
 * Basic Fisher–Yates shuffle
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export function shuffle<T>(array: T[], rngFunc: () => number): T[] {
  const result = array.slice(); // make a copy
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rngFunc() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
