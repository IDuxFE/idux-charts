import type { Locator } from '@playwright/test'
import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'
import { expectMapGeometry, readMapState, selectMapControl } from './mapDemoHelpers'

async function regionPoint(chart: Locator, coordinate: number[]) {
  await chart.scrollIntoViewIfNeeded()
  return chart.evaluate((element, coordinate) => {
    const instance = window.getDemoChart(element as HTMLElement)!
    const [x, y] = instance.convertToPixel({ geoIndex: 0 }, coordinate)
    const box = element.getBoundingClientRect()
    return { x: box.x + x!, y: box.y + y! }
  }, coordinate)
}

async function regionFill(chart: Locator, coordinate: number[]) {
  const point = await regionPoint(chart, coordinate)
  return chart.page().evaluate(point => {
    const target = document
      .elementsFromPoint(point.x, point.y)
      .find(element => element instanceof SVGPathElement)
    return target ? getComputedStyle(target).fill : null
  }, point)
}

for (const kind of ['status', 'density', 'lines'] as const) {
  for (const scope of ['china', 'world'] as const) {
    test(`map ${kind} ${scope} applies geometry, values and zero-state colors`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(`${fixtureBaseURL}?demo-visual=map-${kind}`)
      const demo = page.locator('#visual-demo')
      const chart = demo.locator('[_echarts_instance_]')
      await expect(chart.locator('svg')).toBeVisible()
      // Switch away and back even when this is the demo's initial scope.
      for (const next of [scope === 'china' ? 'world' : 'china', scope] as const) {
        await selectMapControl(demo, '地图范围', next === 'china' ? '中国地图' : '世界地图')
        await expectMapGeometry(chart, next)
      }
      const normal = (await readMapState(chart))!
      if (kind === 'lines') {
        const routes = normal.series.find(series => series.id === 'connections')!.data
        expect(routes).toHaveLength(4)
        expect(routes.map(route => route.metrics!.map(metric => metric.value))).toEqual(
          (scope === 'china' ? [35, 48, 42, 68] : [185, 185, 185, 185]).map(delay => [
            delay,
            0.01,
            2,
          ]),
        )
        await selectMapControl(demo, '数据状态', '数值为 0')
        await expect
          .poll(async () =>
            (await readMapState(chart))?.series.map(series =>
              series.data.map(item => ({
                value: item.mapValue,
                metrics: item.metrics?.map(metric => metric.value),
              })),
            ),
          )
          .toEqual([
            Array.from({ length: 4 }, () => ({ value: 0, metrics: [0, 0, 0] })),
            Array.from({ length: 5 }, () => ({ value: 0, metrics: undefined })),
            [{ value: 0, metrics: undefined }],
          ])
      } else {
        expect(normal.regions).toHaveLength(kind === 'status' ? 5 : scope === 'china' ? 17 : 25)
        const coordinate = scope === 'china' ? [101, 32] : [-100, 39]
        const expectedValue =
          kind === 'status' ? (scope === 'china' ? 112 : 770) : scope === 'china' ? 560 : 330
        const unit = kind === 'status' ? '次' : '台'
        await page.mouse.move(0, 0)
        await expect.poll(() => regionFill(chart, coordinate)).not.toBeNull()
        const normalFill = await regionFill(chart, coordinate)
        const tooltip = chart.locator('.charts-tooltips')
        const hoverRegion = async (value: number) => {
          const point = await regionPoint(chart, coordinate)
          await page.mouse.move(point.x, point.y)
          await expect(tooltip).toBeVisible()
          await expect(tooltip.locator('.charts-tooltips-item-value')).toHaveText(
            `${value} ${unit}`,
          )
        }
        await hoverRegion(expectedValue)
        await selectMapControl(demo, '数据状态', '数值为 0')
        await page.mouse.move(0, 0)
        await expect.poll(() => regionFill(chart, coordinate)).not.toBe(normalFill)
        const zeroFill = await regionFill(chart, coordinate)
        expect(zeroFill).not.toBeNull()
        await hoverRegion(0)
        const zero = (await readMapState(chart))!
        expect(new Set(zero.regions.map(region => region.color)).size).toBe(1)
        if (kind === 'status') {
          expect(zero.series[0]!.data.map(item => item.mapValue)).toEqual([0, 0, 0, 0, 0])
        } else {
          // Missing regions retain their background instead of becoming valid zeroes.
          await page.mouse.move(0, 0)
          const missingFill = await regionFill(chart, scope === 'china' ? [88, 31] : [18, -12])
          expect(missingFill).not.toBeNull()
          expect(missingFill).not.toBe(zeroFill)
        }
        await selectMapControl(demo, '数据状态', '正常')
        await page.mouse.move(0, 0)
        await expect.poll(() => regionFill(chart, coordinate)).toBe(normalFill)
        await hoverRegion(expectedValue)
      }
      await selectMapControl(demo, '数据状态', '正常')
      await expect.poll(() => readMapState(chart)).toEqual(normal)
      await expectMapGeometry(chart, scope)
    })
  }
}
