import { expect, it } from 'vitest'
import { PNG } from 'pngjs'
import { comparePixels } from '../../e2e/comparePixels'

function drawing(offset = 0) {
  const png = new PNG({ width: 32, height: 32 })
  png.data.fill(255)
  for (let y = 8; y < 24; y++) {
    for (let x = 8 + offset; x < 24 + offset; x++) {
      const pixel = (y * png.width + x) * 4
      png.data[pixel] = 20
      png.data[pixel + 1] = 100
      png.data[pixel + 2] = 200
    }
  }
  return png
}

it('compares decoded pixels rather than PNG encoding', () => {
  const png = drawing()
  const first = PNG.sync.write(png, { deflateLevel: 0 })
  const second = PNG.sync.write(png, { deflateLevel: 9 })
  expect(first.equals(second)).toBe(false)
  expect(comparePixels(first, second).differentPixels).toBe(0)
})

it('rejects a real geometry shift and reports its differing pixels', () => {
  const comparison = comparePixels(PNG.sync.write(drawing()), PNG.sync.write(drawing(2)))
  expect(comparison.matches).toBe(false)
  expect(comparison.differentPixels).toBeGreaterThan(0)
})

it('rejects differing image dimensions', () => {
  const small = new PNG({ width: 16, height: 16 })
  expect(comparePixels(PNG.sync.write(drawing()), PNG.sync.write(small)).matches).toBe(false)
})
