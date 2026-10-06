/** Deterministic 0..1 from a string, so every visitor sees the same "random" outcomes. */
export function unit(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

export const usd = (n: number, digits = 2) => `$${n.toFixed(digits)}`
export const pct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`
