/** Invalid or missing values have no geometry; zero is a valid measurement. */
export function valueRatio(
  value: number | null | undefined,
  min = 0,
  max = 100,
): number | undefined {
  if (
    value == null ||
    !Number.isFinite(value) ||
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    max <= min
  )
    return undefined
  if (value <= min) return 0
  if (value >= max) return 1
  const range = max - min
  // Finite endpoints can still overflow when they straddle zero. Halving all
  // operands preserves the ratio without producing Infinity / Infinity.
  return Number.isFinite(range)
    ? (value - min) / range
    : (value / 2 - min / 2) / (max / 2 - min / 2)
}
