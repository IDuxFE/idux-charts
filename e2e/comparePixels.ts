import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

/** Match the existing visual suite's 0.5% allowance for platform font metrics.
 * Same-browser reference charts still differ slightly because native titles and
 * rich graphic labels resolve fractional line heights differently.
 */
export function comparePixels(reference: Buffer, actual: Buffer) {
  const expected = PNG.sync.read(reference)
  const received = PNG.sync.read(actual)
  if (expected.width !== received.width || expected.height !== received.height) {
    return { matches: false, differentPixels: Infinity, maxDiffPixels: 0, diff: actual }
  }
  const diff = new PNG({ width: expected.width, height: expected.height })
  const differentPixels = pixelmatch(
    expected.data,
    received.data,
    diff.data,
    expected.width,
    expected.height,
    { threshold: 0.2, includeAA: false },
  )
  const maxDiffPixels = Math.floor(expected.width * expected.height * 0.005)
  return {
    matches: differentPixels <= maxDiffPixels,
    differentPixels,
    maxDiffPixels,
    diff: PNG.sync.write(diff),
  }
}
