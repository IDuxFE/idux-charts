import type { JSHandle, Locator, Page } from '@playwright/test'
import { test, expect } from './helpers'
import { fixtureBaseURL } from './environment'
import { readMapState } from './mapDemoHelpers'

async function expectArea(page: Page, code: string, name: string) {
  const chart = page.locator('#visual-demo [_echarts_instance_]')
  await expect(page.locator('.map-drilldown-chart')).toHaveAttribute('aria-busy', 'false')
  await expect
    .poll(async () => (await readMapState(chart))?.map)
    .toBe(code === '100000' ? 'china' : `drilldown-${code}`)
  // The native animation's finished callback removes its cover on the next paint.
  await chart.evaluate(
    () =>
      new Promise<void>(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  )
  await expect(page.locator('[aria-label="当前区域"]')).toContainText(name)
  await expect(page.locator('.ix-cascader .ix-selector-item-label')).toHaveText(
    (await page.locator('[aria-label="当前区域"]').textContent())!,
  )
  const state = (await readMapState(chart))!
  expect(state.regions.length).toBeGreaterThan(0)
  expect(state.regions.length).toBeLessThanOrEqual(Math.ceil(state.regionNames.length / 3))
  expect(state.regions.every(region => state.regionNames.includes(region.name))).toBe(true)
  return chart
}

async function selectArea(page: Page, name: string) {
  const input = page.locator('.ix-cascader input')
  await input.click()
  await input.fill(name)
  await page
    .locator('.ix-cascader-option')
    .filter({ hasText: new RegExp(`(?:^| / )${name}$`) })
    .click()
}

async function clickMapArea(chart: Locator, name: string, marker = false) {
  await chart.scrollIntoViewIfNeeded()
  await chart.evaluate(element => window.finishDemoAnimations(element as HTMLElement))
  const point = await chart.evaluate(
    (element, { name, marker }) => {
      const instance = window.getDemoChart(element as HTMLElement)!
      const option = instance.getOption() as any
      const item = option.series[0].data.find((item: any) => item.name === name)
      const box = element.getBoundingClientRect()
      if (marker) {
        const [x, y] = instance.convertToPixel({ geoIndex: 0 }, item.value.slice(0, 2) as number[])
        return { x: box.x + x!, y: box.y + y! - 12 }
      }
      const region = (instance as any)
        .getModel()
        .getComponent('geo')
        .coordinateSystem.getRegion(name)
      // Find an interior point clear of the pins, which can overlap nearby regions at national scale.
      for (let y = 8; y < box.height - 8; y += 4) {
        for (let x = 8; x < box.width - 8; x += 4) {
          if (
            ![
              [-2, 0],
              [2, 0],
              [0, -2],
              [0, 2],
            ].every(([dx, dy]) =>
              region.contain(instance.convertFromPixel({ geoIndex: 0 }, [x + dx!, y + dy!])),
            )
          )
            continue
          const hit = document.elementFromPoint(box.x + x, box.y + y)
          if (hit instanceof SVGPathElement && element.contains(hit)) {
            return { x: box.x + x, y: box.y + y }
          }
        }
      }
      throw new Error(`No unobstructed region hit target: ${name}`)
    },
    { name, marker },
  )
  await chart.page().mouse.click(point.x, point.y)
}

test('map drilldown animates region clicks and return navigation', async ({ page }) => {
  await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
  const chart = await expectArea(page, '100000', '全国')
  const camera = await chart.evaluateHandle(element => {
    const instance = window.getDemoChart(element as HTMLElement)!
    const zooms = new Set<number>()
    const record = () => {
      const option = instance.getOption() as any
      zooms.add(option.geo[0].zoom as number)
    }
    instance.on('rendered', record)
    return { zooms, dispose: () => instance.off('rendered', record) }
  })
  expect((await readMapState(chart))!.regionNames).toContain('中国台湾')
  expect((await readMapState(chart))!.regionNames).toContain('南海诸岛')
  const highest = chart.locator('svg text').filter({ hasText: /^>700$/ })
  const lowest = chart.locator('svg text').filter({ hasText: /^0$/ })
  await expect(highest).toBeVisible()
  const textY = (label: Locator) =>
    label.evaluate(element => {
      const text = element as SVGTextElement
      const box = text.getBBox()
      return new DOMPoint(box.x, box.y).matrixTransform(text.getScreenCTM()!).y
    })
  expect(await textY(highest)).toBeLessThan(await textY(lowest))
  await expect(page.locator('.ix-cascader .ix-icon-down svg')).toBeVisible()
  await page.locator('.ix-cascader').click()
  await expect(
    page.locator('.ix-cascader-option-expand-icon .ix-icon-right svg').first(),
  ).toBeVisible()
  await page.locator('.ix-cascader').click()
  await clickMapArea(chart, '广东省')
  await expectArea(page, '440000', '广东省')
  await page.getByRole('button', { name: '返回上级' }).click()
  await expectArea(page, '100000', '全国')
  await expect(page.getByRole('button', { name: '返回上级' })).toBeDisabled()
  const zooms = await camera.evaluate(({ zooms }) => [...zooms])
  expect(zooms.some(zoom => zoom > 1)).toBe(true)
  expect(zooms.some(zoom => zoom < 1)).toBe(true)
  await camera.evaluate(({ dispose }) => dispose())
  await camera.dispose()
})

test.describe('map drilldown geometry and data', () => {
  test.use({ reducedMotion: 'reduce' })

  test('map drilldown links real marker clicks with the cascader', async ({ page }) => {
    await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
    const chart = await expectArea(page, '100000', '全国')
    await selectArea(page, '广东省')
    await expectArea(page, '440000', '广东省')
    const marker = await chart.evaluate(element => {
      const option = window.getDemoChart(element as HTMLElement)!.getOption() as any
      const { id, name } = option.series[0].data[0]
      return { id: id as string, name: name as string }
    })
    await clickMapArea(chart, marker.name, true)
    await expectArea(page, marker.id, marker.name)
  })

  test('map drilldown regenerates status data and navigates between districts and provinces', async ({
    page,
  }) => {
    await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
    const chart = await expectArea(page, '100000', '全国')
    await selectArea(page, '深圳市')
    await expectArea(page, '440300', '深圳市')
    const before = (await readMapState(chart))!.series[0]!.data
    await page.getByRole('button', { name: '重新生成数据' }).click()
    await expect.poll(async () => (await readMapState(chart))!.series[0]!.data).not.toEqual(before)
    await clickMapArea(chart, '南山区')
    await expectArea(page, '440305', '南山区')
    expect((await readMapState(chart))!.regionNames).toEqual(['南山区'])
    await expect(page.getByText('已到区县级，可通过级联选择查看其他地区。')).toBeVisible()
    await page.getByRole('button', { name: '返回上级' }).click()
    await expectArea(page, '440300', '深圳市')
    await selectArea(page, '浙江省')
    await expectArea(page, '330000', '浙江省')
    await page.getByRole('button', { name: '返回全国' }).click()
    await expectArea(page, '100000', '全国')
    await expect(page.getByRole('button', { name: '返回上级' })).toBeDisabled()
  })

  test('map drilldown restores municipality geometry after direct district selection', async ({
    page,
  }) => {
    await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
    await expectArea(page, '100000', '全国')
    await selectArea(page, '东城区')
    const chart = await expectArea(page, '110101', '东城区')
    expect((await readMapState(chart))!.regionNames).toEqual(['东城区'])
    await page.getByRole('button', { name: '返回上级' }).click()
    await expectArea(page, '110000', '北京市')
    await expect(page.locator('[aria-label="当前区域"]')).toHaveText('全国 / 北京市')
    expect((await readMapState(chart))!.regionNames).toContain('海淀区')
    await page.getByRole('button', { name: '返回上级' }).click()
    await expectArea(page, '100000', '全国')
  })

  test('map drilldown resolves alternate district codes and recovers from missing boundaries', async ({
    page,
  }) => {
    await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
    const chart = await expectArea(page, '100000', '全国')
    await selectArea(page, '香港岛')
    await expectArea(page, '810100', '香港岛')
    await clickMapArea(chart, '中西区')
    await expectArea(page, '810101', '中西区')
    expect((await readMapState(chart))!.regionNames).toEqual(['中西区'])
    await selectArea(page, '台北市')
    await expect(page.getByText('该地区暂无可用地图边界，请选择其他地区')).toBeVisible()
    await expect(page.locator('[aria-label="当前区域"]')).toContainText('台北市')
    await expect(chart).toHaveCount(1)
    const emptyOverlay = page.locator('.map-drilldown-chart .ix-chart-overlay .ix-empty')
    await expect(emptyOverlay).toBeVisible()
    await page.getByRole('button', { name: '返回全国' }).click()
    await expectArea(page, '100000', '全国')
    await expect(emptyOverlay).toHaveCount(0)
  })

  for (const [provinceCode, provinceName, districtCode, districtName] of [
    ['110000', '北京市', '110101', '东城区'],
    ['120000', '天津市', '120101', '和平区'],
    ['310000', '上海市', '310101', '黄浦区'],
    ['500000', '重庆市', '500103', '渝中区'],
    ['500000', '重庆市', '500229', '城口县'],
  ] as const) {
    test(`map drilldown skips municipality groups for ${provinceName} ${districtName}`, async ({
      page,
    }) => {
      await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
      await expectArea(page, '100000', '全国')
      await selectArea(page, provinceName)
      await expectArea(page, provinceCode, provinceName)
      const path = `全国 / ${provinceName} / ${districtName}`

      // The cascader must expose the district directly below the municipality as well.
      await page.locator('.ix-cascader').click()
      await page.locator('.ix-cascader-option[aria-label="全国"]').hover()
      await page.locator(`.ix-cascader-option[aria-label="全国 / ${provinceName}"]`).hover()
      const district = page
        .locator('.ix-cascader-option')
        .filter({ hasText: new RegExp(`^${districtName}$`) })
      await expect(district).toHaveAttribute('aria-label', path)
      await expect(
        page.locator(`.ix-cascader-option[aria-label="全国 / ${provinceName} / ${provinceName}"]`),
      ).toHaveCount(0)
      if (provinceCode === '500000') {
        await expect(
          page.locator('.ix-cascader-option[aria-label="全国 / 重庆市 / 县"]'),
        ).toHaveCount(0)
      }
      await district.click()
      await expectArea(page, districtCode, districtName)
      await expect(page.locator('[aria-label="当前区域"]')).toHaveText(path)
      await expect(page.locator('.ix-cascader .ix-selector-item-label')).toHaveText(path)

      await page.getByRole('button', { name: '返回上级' }).click()
      await expectArea(page, provinceCode, provinceName)
      await expect(page.locator('[aria-label="当前区域"]')).toHaveText(`全国 / ${provinceName}`)
      await page.getByRole('button', { name: '返回上级' }).click()
      await expectArea(page, '100000', '全国')
    })
  }
})

test('map drilldown keeps a slow request covered until the destination map is ready', async ({
  page,
}) => {
  await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
  const chart = await expectArea(page, '100000', '全国')
  let release!: () => void
  const held = new Promise<void>(resolve => {
    release = resolve
  })
  await page.route(/\/440000[.-].*\.js/, async route => {
    await held
    await route.continue()
  })
  let recording: JSHandle<{ frames: string[]; stop: () => void }> | undefined
  try {
    await clickMapArea(chart, '广东省')
    await expect(page.locator('.map-drilldown-chart .ix-chart-loading')).toBeVisible()
    recording = await chart.evaluateHandle(element => {
      const instance = window.getDemoChart(element as HTMLElement)!
      const frames: string[] = []
      let frame: number
      const record = () => {
        if (!element.querySelector('.ix-chart-loading')) {
          frames.push((instance.getOption() as any).geo[0].map as string)
        }
        frame = requestAnimationFrame(record)
      }
      frame = requestAnimationFrame(record)
      return { frames, stop: () => cancelAnimationFrame(frame) }
    })
    release()
    await expectArea(page, '440000', '广东省')
    const frames = await recording.evaluate(({ frames }) => frames)
    expect(frames.length).toBeGreaterThan(0)
    expect(new Set(frames)).toEqual(new Set(['drilldown-440000']))
  } finally {
    release()
    if (recording) {
      await recording.evaluate(({ stop }) => stop())
      await recording.dispose()
    }
    await page.unrouteAll({ behavior: 'wait' })
  }
})

test('map drilldown ignores an older map response after selecting another region', async ({
  page,
}) => {
  await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
  await expectArea(page, '100000', '全国')
  let release!: () => void
  const held = new Promise<void>(resolve => {
    release = resolve
  })
  let requested!: () => void
  const started = new Promise<void>(resolve => {
    requested = resolve
  })
  await page.route(/\/440000[.-].*\.js/, async route => {
    requested()
    await held
    await route.continue()
  })
  try {
    await selectArea(page, '广东省')
    await started
    await selectArea(page, '浙江省')
    await expectArea(page, '330000', '浙江省')
  } finally {
    release()
  }
  await page.unrouteAll({ behavior: 'wait' })
  await expectArea(page, '330000', '浙江省')
})

test('map drilldown commits the latest region when a theme change rebuilds the chart mid-transition', async ({
  page,
}) => {
  await page.goto(`${fixtureBaseURL}?demo-visual=map-drilldown`)
  const chart = await expectArea(page, '100000', '全国')
  const original = await chart.getAttribute('_echarts_instance_')
  await chart.evaluate(element => {
    const instance = window.getDemoChart(element as HTMLElement)!
    const switchDuringZoom = () => {
      const option = instance.getOption() as any
      if (option.geo[0].zoom > 1) {
        instance.off('rendered', switchDuringZoom)
        window.setDemoTheme(true)
      }
    }
    instance.on('rendered', switchDuringZoom)
  })
  await selectArea(page, '广东省')
  await expect(chart).not.toHaveAttribute('_echarts_instance_', original!)
  await expectArea(page, '440000', '广东省')
})
