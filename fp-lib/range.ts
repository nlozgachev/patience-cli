export function range(start: number, end: number, step = 1): number[] {
  const dir = start <= end ? 1 : -1;
  const len = Math.floor(Math.abs(end - start) / step) + 1;
  return Array.from({ length: len }, (_, i) => start + i * step * dir);
}
