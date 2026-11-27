import type { Locator } from '@playwright/test'
import { test as base, expect } from './browserTest'

export const test = base.extend<{ browserErrors: void }>({
  browserErrors: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.stack ?? error.message))
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text())
      })
      await use()
      expect(errors, 'browser errors').toEqual([])
    },
    { auto: true },
  ],
})
export { expect }

// Send every real key event while avoiding repeated resolution of a complex
// slider locator. Value assertions at the call site still verify the full range.
export async function pressSliderKeys(slider: Locator, key: string, count: number) {
  await slider.focus()
  await expect(slider).toBeFocused()
  for (let index = 0; index < count; index++) await slider.page().keyboard.press(key)
}

export async function expectFillsContainer(container: Locator, childSelector: string) {
  await expect(container.locator(childSelector)).toBeVisible()
  await expect(async () => {
    const boxes = await container.evaluate((element, selector) => {
      const child = element.querySelector(selector)
      if (!child) return null
      const bounds = (node: Element) => {
        const { x, y, width, height } = node.getBoundingClientRect()
        return { x, y, width, height }
      }
      return { parent: bounds(element), child: bounds(child) }
    }, childSelector)
    expect(boxes, `${childSelector} exists`).not.toBeNull()
    expect(boxes!.parent.width).toBeGreaterThan(0)
    expect(boxes!.parent.height).toBeGreaterThan(0)
    expect(boxes!.child).toEqual(boxes!.parent)
  }).toPass({ timeout: 5000 })
}

// Resolve geometry only after scrolling the persistent surface. ECharts can
// replace SVG children during resize, scrolling or pointer entry.
async function svgPoint(surface: Locator, target: Locator, plotOffsetY?: number | 'category') {
  await surface.scrollIntoViewIfNeeded()
  await expect(target).toBeVisible()
  const point = { x: 0, y: 0 }
  await expect(async () => {
    const current = await target.evaluate(async (element, offsetY) => {
      const bounds = () => {
        const box = element.getBoundingClientRect()
        return [box.x, box.y, box.width, box.height]
      }
      const before = bounds()
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
      const after = bounds()
      if (
        !element.isConnected ||
        after.some((value, index) => Math.abs(value - before[index]!) > 0.5)
      )
        return null
      let x = after[0]! + after[2]! / 2
      let y = after[1]! + after[3]! / 2
      if (element instanceof SVGTextElement) {
        // WebKit can include a legend's icon origin in its text bounding box.
        const anchor = getComputedStyle(element).textAnchor
        const width = element.getComputedTextLength()
        const local = new DOMPoint(
          (element.x.baseVal.numberOfItems ? element.x.baseVal.getItem(0).value : 0) +
            (anchor === 'middle' ? 0 : anchor === 'end' ? -width / 2 : width / 2),
          element.y.baseVal.numberOfItems ? element.y.baseVal.getItem(0).value : 0,
        ).matrixTransform(element.getScreenCTM()!)
        x = local.x
        y = local.y
      }
      if (offsetY !== undefined) {
        const box = (element as SVGElement).ownerSVGElement!.getBoundingClientRect()
        y = box.y + (offsetY === 'category' ? box.height / 3 : offsetY)
      }
      const svg = (element as SVGElement).ownerSVGElement
      const hit = document.elementFromPoint(x, y)
      if (!hit || !svg?.contains(hit)) return null
      return { x, y }
    }, plotOffsetY)
    expect(current, 'stable SVG hit target').not.toBeNull()
    Object.assign(point, current)
  }).toPass({ timeout: 5000 })
  return point
}

export async function hoverSvg(surface: Locator, target: Locator) {
  await target.page().mouse.move(0, 0)
  const point = await svgPoint(surface, target)
  await target.page().mouse.move(point.x, point.y)
}

export async function clickSvg(surface: Locator, target: Locator) {
  await hoverSvg(surface, target)
  // Pointer entry may redraw emphasis; resolve the current target again.
  const point = await svgPoint(surface, target)
  // Never retry an input action: a second click could undo the first toggle.
  await target.page().mouse.click(point.x, point.y)
}

export async function hoverCategory(
  svg: Locator,
  label: Locator,
  offsetY: number | 'category' = 'category',
) {
  await svg.page().mouse.move(0, 0)
  const point = await svgPoint(svg, label, offsetY)
  await svg.page().mouse.move(point.x, point.y)
}

export async function hoverPieSector(chart: Locator) {
  await chart.scrollIntoViewIfNeeded()
  await expect(chart.locator('svg')).toBeVisible()
  await chart.page().mouse.move(0, 0)
  // Find a point inside an actual filled arc, rather than sweeping the pointer
  // across the page and hoping a tooltip appears before the next mouse move.
  const point = { x: 0, y: 0 }
  await expect
    .poll(
      async () => {
        const current = await chart.evaluate(async element => {
          for (const path of element.querySelectorAll<SVGPathElement>('svg path')) {
            const style = getComputedStyle(path)
            const drawing = path.getAttribute('d') ?? ''
            if (
              !drawing.includes('A') ||
              // Full-circle backgrounds and zero-state rings are silent.
              !drawing.includes('L') ||
              style.fill === 'none' ||
              style.fill === 'transparent' ||
              style.fill === 'rgba(0, 0, 0, 0)' ||
              Number(style.fillOpacity) === 0
            )
              continue
            const box = path.getBBox()
            if (box.width < 24 || box.height < 24) continue
            for (let row = 1; row < 20; row++) {
              for (let column = 1; column < 20; column++) {
                const local = new DOMPoint(
                  box.x + (box.width * column) / 20,
                  box.y + (box.height * row) / 20,
                )
                // Stay clear of stroke/antialias boundaries and neighboring sectors.
                if (
                  ![
                    [-2, 0],
                    [2, 0],
                    [0, -2],
                    [0, 2],
                  ].every(([x, y]) => path.isPointInFill(new DOMPoint(local.x + x!, local.y + y!)))
                )
                  continue
                await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
                if (!path.isConnected || path.getAttribute('d') !== drawing) return
                const screen = local.matrixTransform(path.getScreenCTM()!)
                if (!path.ownerSVGElement?.contains(document.elementFromPoint(screen.x, screen.y)))
                  return
                return { x: screen.x, y: screen.y }
              }
            }
          }
        })
        if (current) Object.assign(point, current)
        return current
      },
      { message: 'rendered pie sector hit target' },
    )
    .toBeTruthy()
  await chart.page().mouse.move(point.x, point.y)
  return point
}

export async function reloadDemo(demo: Locator) {
  await expect(demo.locator('.ix-chart-loading')).toHaveCount(0)
  // A slow runner can miss an 800ms loader between two protocol calls. Record
  // its real DOM transition before clicking, without changing application time.
  const recording = await demo.evaluateHandle(element => {
    const state = { loading: null as { text: string; busy: string | null; image: boolean } | null }
    const observer = new MutationObserver(() => {
      const loading = element.querySelector('.ix-chart-loading')
      if (loading && !state.loading) {
        state.loading = {
          text: loading.textContent ?? '',
          busy: loading.getAttribute('aria-busy'),
          image: !!loading.querySelector('img'),
        }
      }
    })
    observer.observe(element, { childList: true, subtree: true, attributes: true })
    return { state, observer }
  })
  try {
    await demo.getByRole('button', { name: '重新加载', exact: true }).click()
    await expect.poll(() => recording.evaluate(({ state }) => state.loading)).not.toBeNull()
    const loading = (await recording.evaluate(({ state }) => state.loading))!
    await expect(demo.locator('.ix-chart-loading')).toHaveCount(0)
    await expect(demo.locator('.ix-chart-overlay .ix-empty')).toHaveCount(0)
    return loading
  } finally {
    if (!demo.page().isClosed()) {
      await recording.evaluate(({ observer }) => observer.disconnect())
    }
    await recording.dispose()
  }
}
