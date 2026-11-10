import type { Locator, Page } from '@playwright/test'

import { test, expect } from './helpers'

test.describe.configure({ timeout: 60_000 })

const barPaths = 'path[fill^="url("]:not([transform])'
const referencePath = 'path[stroke="#F5654F"][stroke-dasharray]'
const trackPaths = 'path[fill="rgb(143,162,191)"]'
const missingPath = 'path[fill="rgb(245,101,79)"][fill-opacity="0.12"]'
const hoverPath = 'path[stroke="rgb(129,130,136)"][stroke-opacity="0.2"]'
const missingState = '数据未上报（单点值缺失）'

function demoByTitle(page: Page, title: string) {
  return page.locator('.archive-app-demo').filter({
    has: page.getByRole('heading', { name: new RegExp(`^${title}\\s*#?$`), level: 3 }),
  })
}

async function selectState(demo: Locator, name: string) {
  const label = demo
    .getByRole('radiogroup', { name: '图表状态' })
    .locator('label')
    .filter({
      has: demo.page().getByText(name, { exact: true }),
    })
  await label.click()
  await expect(label.getByRole('radio')).toHaveAttribute('aria-checked', 'true')
}

function thickness(bars: Locator, horizontal = false) {
  return bars.first().evaluate((el, horizontal) => {
    const box = (el as SVGGraphicsElement).getBBox()
    return horizontal ? box.height : box.width
  }, horizontal)
}

async function aboveLabelGaps(labels: Locator, bars: Locator) {
  // The SVG renderer centers its text on y. Use the chart's line box since
  // browser glyph bounds vary with font fallback and the native SVG engine.
  // SVG text positioning can still differ by a fraction of a pixel.
  const labelBottoms = await labels.evaluateAll(nodes =>
    nodes.map(el => {
      const text = el as SVGTextElement
      return (
        text.getCTM()!.f +
        Number(text.getAttribute('y')) +
        parseFloat(getComputedStyle(text).fontSize) / 2
      )
    }),
  )
  const barTops = await bars.evaluateAll(nodes =>
    nodes.map(el => (el as SVGGraphicsElement).getBBox().y),
  )
  // After zooming, the DOM order of reused bars can differ from category order.
  labelBottoms.sort((a, b) => a - b)
  return barTops.sort((a, b) => a - b).map((top, index) => top - (labelBottoms[index] ?? NaN))
}

async function aboveLabelGap(label: Locator, bar: Locator) {
  return (await aboveLabelGaps(label, bar))[0] ?? NaN
}

async function hoverCategory(page: Page, svg: Locator, name: string) {
  const label = svg.getByText(name, { exact: true })
  await label.scrollIntoViewIfNeeded()
  const labelBox = (await label.boundingBox())!
  const chartBox = (await svg.boundingBox())!
  await page.mouse.move(labelBox.x + labelBox.width / 2, chartBox.y + chartBox.height / 3)
}

for (const [title, seriesCount] of [
  ['基础柱状图-竖向', 1],
  ['基础柱状图-横向', 1],
  ['基础柱状图-横向上方', 1],
  ['分组柱状图-竖向', 3],
  ['分组柱状图-横向', 2],
  ['堆叠柱状图-竖向', 2],
  ['堆叠柱状图-横向', 3],
] as const) {
  test(`${title} fills its demo and switches through all seven states`, async ({ page }) => {
    await page.goto('components/bar')
    const demo = demoByTitle(page, title)
    const body = demo.locator('.bar-demo')
    const chart = body.locator('[_echarts_instance_]')
    const svg = chart.locator('svg')
    const bars = svg.locator(barPaths)
    const width = async () => {
      const bounds = (await svg.boundingBox())!
      const available = (await body.boundingBox())!
      return Math.abs(bounds.width - available.width)
    }

    await expect(bars).toHaveCount(5 * seriesCount)
    await expect.poll(width).toBeLessThan(1)
    const horizontal = title.includes('横向')
    const defaultWidth = title.startsWith('分组') ? 6 : 10
    await expect.poll(() => thickness(bars, horizontal)).toBeCloseTo(defaultWidth)
    const above = title.endsWith('横向上方')
    const firstLabel = svg.getByText('服务器终端（200.200.1.1）', { exact: true })
    if (above) {
      await expect.poll(() => aboveLabelGap(firstLabel, bars.first())).toBeCloseTo(5, 0)
    }
    await expect
      .poll(() =>
        bars.evaluateAll(paths => {
          const canvas = document.createElement('canvas').getContext('2d')!
          const normalize = (value: string) => {
            canvas.fillStyle = value
            return canvas.fillStyle
          }
          return paths.filter(path => {
            const svg = path.closest('svg')!
            const linked = (attribute: string) => {
              const id = path.getAttribute(attribute)?.match(/^url\(#(.+)\)$/)?.[1]
              return id ? svg.getElementById(id) : null
            }
            const shadow = linked('filter')?.querySelector('feDropShadow')
            if (
              !shadow ||
              shadow.getAttribute('dx') !== '0' ||
              shadow.getAttribute('dy') !== '-4' ||
              shadow.getAttribute('stdDeviation') !== '5 5' ||
              Number(shadow.getAttribute('flood-opacity')) !== 0.16
            )
              return false
            const shadowColor = normalize(shadow.getAttribute('flood-color')!)
            return Array.from(linked('fill')?.querySelectorAll('stop') ?? []).some(
              stop => normalize(stop.getAttribute('stop-color')!) === shadowColor,
            )
          }).length
        }),
      )
      .toBe(5 * seriesCount)
    const instance = await chart.getAttribute('_echarts_instance_')

    await selectState(demo, '极限场景')
    await expect(bars).toHaveCount((horizontal ? 5 : 10) * seriesCount)
    await expect.poll(() => thickness(bars, horizontal)).toBeCloseTo(horizontal ? defaultWidth : 6)
    await selectState(demo, '全部值为 0')
    if (above) {
      await expect(svg.locator(trackPaths)).toHaveCount(5)
      await expect(svg.locator(`${trackPaths}[filter]`)).toHaveCount(0)
      await expect
        .poll(() => aboveLabelGap(firstLabel, svg.locator(trackPaths).first()))
        .toBeCloseTo(5, 0)
    } else {
      await expect(svg.getByText('暂无数据', { exact: true })).toHaveAttribute('fill', '#A1A7B3')
    }

    await selectState(demo, missingState)
    await expect(bars).toHaveCount(seriesCount === 1 ? 4 : 4 * seriesCount - 1)
    await expect(svg.locator(missingPath)).toHaveCount(seriesCount === 1 ? 1 : 2)
    if (above) {
      const band = (await svg.locator(missingPath).boundingBox())!
      const tracks = svg.locator(trackPaths)
      await expect(tracks).toHaveCount(4)
      await expect.poll(() => aboveLabelGap(firstLabel, svg.locator(missingPath))).toBeCloseTo(5, 0)
      const secondLabel = svg.getByText('服务器终端（200.200.1.2）', { exact: true })
      await expect.poll(() => aboveLabelGap(secondLabel, tracks.first())).toBeCloseTo(5, 0)
      for (const track of await tracks.all()) {
        expect((await track.boundingBox())!.y).toBeGreaterThan(band.y + band.height)
      }
      // A shorter plot caps the missing band's thickness independently of bar width.
      await chart.evaluate(el => (el.style.height = '180px'))
      await expect.poll(() => thickness(svg.locator(missingPath), true)).toBeLessThan(band.height)
      await expect.poll(() => aboveLabelGap(firstLabel, svg.locator(missingPath))).toBeCloseTo(5, 0)
      await chart.evaluate(el => (el.style.height = '300px'))
    }
    await selectState(demo, '带参考线')
    await expect(svg.locator(missingPath)).toHaveCount(0)
    await expect(svg.locator(referencePath).first()).toBeAttached()
    await expect(svg).toContainText('异常')
    await expect(chart).toHaveAttribute('_echarts_instance_', instance!)
    await selectState(demo, '加载中')
    const loading = body.getByRole('status')
    await expect(loading).toContainText('图表正在加载中，请稍后...')
    await expect(loading).toHaveAttribute('aria-live', 'polite')
    await expect(loading).toHaveAttribute('aria-busy', 'true')
    await expect(loading.locator('svg[data-icon="bar-chart"]')).toBeVisible()
    await expect(chart).toHaveCount(0)
    await selectState(demo, '空状态')
    await expect(body.locator('.ix-empty')).toContainText('未配置数据源，请先配置采集任务')
    await expect(chart).toHaveCount(0)
    await selectState(demo, '正常')
    await expect(bars).toHaveCount(5 * seriesCount)
    await page.setViewportSize({ width: 480, height: 800 })
    await expect.poll(width).toBeLessThan(1)
    expect((await svg.boundingBox())!.width).toBeLessThan(480)
    expect((await svg.boundingBox())!.height).toBe(300)
  })
}

test('missing data shows a persistent red band and a reason on hover', async ({ page }) => {
  await page.goto('components/bar')
  const demo = demoByTitle(page, '基础柱状图-竖向')
  const chart = demo.locator('[_echarts_instance_]')
  const svg = chart.locator('svg')
  const tooltip = chart.locator('.charts-tooltips')
  const band = svg.locator(missingPath)
  await selectState(demo, missingState)
  await expect(band).toBeVisible()
  await expect(tooltip).toBeHidden()
  await hoverCategory(page, svg, '微信网页')
  await expect(band).toBeVisible()
  await expect(tooltip).toContainText('微信网页')
  await expect(tooltip).toContainText('数据缺失，采集任务未返回结果，请检查采集配置')
  await expect(tooltip.locator('.charts-tooltips-item')).toHaveCount(0)
  const shade = (await band.boundingBox())!
  expect(shade.width).toBeCloseTo(20, 1)
  expect(shade.height).toBeGreaterThan(150)

  await hoverCategory(page, svg, '百度网盘')
  await expect(band).toBeVisible()
  await expect(tooltip.locator('.charts-tooltips-item')).toContainText('200')
  await expect(tooltip).not.toContainText('数据缺失')

  await hoverCategory(page, svg, '微信网页')
  await expect(tooltip).toContainText('数据缺失')
  await demo.getByRole('radiogroup', { name: '图表状态' }).hover()
  await expect(tooltip).toBeHidden()
  await expect(band).toBeVisible()
})

test('grouped hover keeps valid values and shows reasons for only the missing series', async ({
  page,
}) => {
  await page.goto('components/bar')
  const demo = demoByTitle(page, '分组柱状图-竖向')
  const chart = demo.locator('[_echarts_instance_]')
  const svg = chart.locator('svg')
  await selectState(demo, missingState)
  await hoverCategory(page, svg, '2024')
  await expect(svg.locator(missingPath)).toHaveCount(2)
  await expect(chart.locator('.charts-tooltips-item')).toHaveCount(2)
  await expect(
    chart.getByText('大闸蟹: 数据缺失，采集结果未包含此系列，请检查采集配置'),
  ).toBeVisible()
})

test('the gray hover band adds 6px to each side of a bar', async ({ page }) => {
  await page.goto('components/bar')
  const demo = demoByTitle(page, '基础柱状图-竖向')
  const svg = demo.locator('[_echarts_instance_] svg')
  const bar = svg.locator(barPaths).first()
  await bar.scrollIntoViewIfNeeded()
  const bounds = (await bar.boundingBox())!
  const chart = (await svg.boundingBox())!
  const band = svg.locator(hoverPath)
  await expect(band).toHaveCount(0)

  // The tooltip still opens when the cursor is in the category but outside the band.
  await page.mouse.move(bounds.x + bounds.width / 2 + 28, chart.y + chart.height / 3)
  await expect(demo.locator('.charts-tooltips-title')).toHaveText('微信网页')
  await expect(band).toHaveAttribute('stroke-width', '22')
  const center = await band.evaluate(el => {
    const line = el as SVGGraphicsElement
    return new DOMPoint(line.getBBox().x, 0).matrixTransform(line.getScreenCTM()!).x
  })
  expect(Math.abs(center - (bounds.x + bounds.width / 2))).toBeLessThan(1)
  await demo.getByRole('radiogroup', { name: '图表状态' }).hover()
  await expect(band).toHaveCount(0)
})

test('category bars follow the site theme for the slider, tooltip and data states', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('components/bar')
  const demo = demoByTitle(page, '基础柱状图-竖向')
  const chart = demo.locator('[_echarts_instance_]')
  const svg = chart.locator('svg')
  await expect(chart).toHaveAttribute('data-ix-chart-theme', 'dark')
  await expect(svg.locator('path[fill="rgb(104,159,255)"][fill-opacity="0.24"]')).toBeAttached()
  await hoverCategory(page, svg, '微信网页')
  await expect(svg.locator('path[stroke="rgb(128,137,153)"][stroke-opacity="0.25"]')).toBeAttached()
  const tooltip = chart.locator('.charts-tooltips')
  await expect(tooltip.locator('..')).toHaveCSS('background-color', 'rgb(10, 12, 15)')
  await expect(tooltip.locator('.charts-tooltips-title')).toHaveCSS('color', 'rgb(244, 248, 255)')

  await selectState(demo, missingState)
  await expect(svg.locator('path[fill="rgb(54, 26, 27)"]')).toBeVisible()
  await hoverCategory(page, svg, '微信网页')
  await expect(tooltip).toContainText('数据缺失，采集任务未返回结果，请检查采集配置')
  await expect(tooltip.locator('..')).toHaveCSS('background-color', 'rgb(10, 12, 15)')
  await selectState(demo, '带参考线')
  await expect(svg.locator('path[stroke="#FF957B"][stroke-dasharray]').first()).toBeAttached()

  const above = demoByTitle(page, '基础柱状图-横向上方')
  const aboveSvg = above.locator('[_echarts_instance_] svg')
  await selectState(above, missingState)
  await expect(aboveSvg.locator('path[fill="#687080"]')).toHaveCount(4)
  await expect(aboveSvg.locator('path[fill="rgb(54, 26, 27)"]')).toBeVisible()

  await selectState(demo, '全部值为 0')
  const zero = svg.getByText('暂无数据', { exact: true })
  await expect(zero).toHaveAttribute('fill', '#808999')
  await page.getByRole('button', { name: '切换到亮色模式' }).click()
  await expect(chart).toHaveAttribute('data-ix-chart-theme', 'light')
  await expect(zero).toHaveAttribute('fill', '#A1A7B3')
})

test('the dashed reference draws beneath the bars and can be toggled by its legend', async ({
  page,
}) => {
  await page.goto('components/bar')
  const demo = demoByTitle(page, '基础柱状图-竖向')
  const svg = demo.locator('[_echarts_instance_] svg')
  await selectState(demo, '带参考线')
  const line = svg.locator(referencePath).first()
  await expect
    .poll(() => line.evaluate(el => (el as SVGPathElement).getTotalLength()))
    .toBeGreaterThan(10)
  expect(
    await line.evaluate((el, selector) => {
      const bar = el.closest('svg')!.querySelector(selector)!
      return Boolean(el.compareDocumentPosition(bar) & Node.DOCUMENT_POSITION_FOLLOWING)
    }, barPaths),
  ).toBe(true)
  const toggle = () => svg.getByText('异常', { exact: true }).click({ force: true })
  await toggle()
  await expect(line).toHaveCount(0)
  await toggle()
  await expect(line).toBeAttached()
})

for (const [title, horizontal, first, last, seriesCount, grouped] of [
  ['基础柱状图-竖向', false, '微信网页', '应用 50', 1, false],
  ['基础柱状图-横向', true, '服务器终端（200.200.1.1）', '服务器终端（200.200.2.45）', 1, false],
  [
    '基础柱状图-横向上方',
    true,
    '服务器终端（200.200.1.1）',
    '服务器终端（200.200.2.45）',
    1,
    false,
  ],
  ['分组柱状图-竖向', false, '2022', '2071', 3, true],
  ['堆叠柱状图-竖向', false, '2022', '2071', 2, false],
] as const) {
  test(`${title} pans to the last category and applies its fixed width rule when zooming`, async ({
    page,
  }) => {
    await page.goto('components/bar')
    const demo = demoByTitle(page, title)
    await selectState(demo, '极限场景')
    const svg = demo.locator('[_echarts_instance_] svg')
    await svg.scrollIntoViewIfNeeded()
    const bars = svg.locator(barPaths)
    const initialCount = horizontal ? 5 : 10
    const initialWidth = horizontal && !grouped ? 10 : 6
    await expect(bars).toHaveCount(initialCount * seriesCount)
    await expect(svg).toContainText(first)
    await expect(svg).not.toContainText(last)
    await expect.poll(() => thickness(bars, horizontal)).toBeCloseTo(initialWidth)

    const selection = svg.locator('path[fill="rgb(135,175,255)"][fill-opacity="0.2"]')
    const slider = svg.locator('path[stroke="#e0e4f2"][transform^="matrix"]')
    const box = (await selection.boundingBox())!
    const track = (await slider.boundingBox())!
    const drag = async (x: number, y: number, amount: number) => {
      await page.mouse.move(x, y)
      await page.mouse.down()
      await page.mouse.move(horizontal ? x : x + amount, horizontal ? y + amount : y, { steps: 12 })
      await page.mouse.up()
    }
    const length = horizontal ? track.height : track.width
    expect(length).toBeGreaterThan(150)
    const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 }
    const trackStart = horizontal ? track.y : track.x
    const axis = horizontal ? 'y' : 'x'
    // Move far enough to clamp the window at the end and release inside the slider.
    await drag(center.x, center.y, trackStart + length - 3 - center[axis])
    await expect(svg).toContainText(last)
    await expect(svg).not.toContainText(first)
    await expect(bars).toHaveCount(initialCount * seriesCount)
    await expect.poll(() => thickness(bars, horizontal)).toBeCloseTo(initialWidth)

    const resizeWindow = async (visible: number) => {
      const range = (await selection.boundingBox())!
      const start = horizontal ? range.y : range.x
      const end = start + (horizontal ? range.height : range.width)
      // Resize from the leading handle and keep the last category in view.
      const handles = svg.locator('path[d^="M0 1.628L0 2M0 0L0 0.375"]')
      await expect(handles).toHaveCount(2)
      const centers = await Promise.all(
        [handles.first(), handles.last()].map(async handle => {
          const { x, y, width, height } = (await handle.boundingBox())!
          return { x: x + width / 2, y: y + height / 2 }
        }),
      )
      const handle = centers.sort((a, b) => a[axis] - b[axis])[0]!
      const target = end - (length * (visible - 1)) / 49
      await drag(handle.x, handle.y, target - start)
    }
    const zoomSteps = horizontal
      ? ([
          [4, 10],
          [3, 20],
          [5, 10],
        ] as const)
      : ([
          [6, 6],
          [5, 10],
          [4, 10],
          [3, 20],
          [10, 6],
        ] as const)
    for (const [visible, width] of zoomSteps) {
      await resizeWindow(visible)
      await expect(bars).toHaveCount(visible * seriesCount)
      await expect.poll(() => thickness(bars, horizontal)).toBeCloseTo(grouped ? 6 : width)
      if (title.endsWith('横向上方')) {
        const visibleLabels = svg.locator('text').filter({ hasText: /^服务器终端（/ })
        await expect(visibleLabels).toHaveCount(visible)
        await expect
          .poll(async () =>
            Math.max(...(await aboveLabelGaps(visibleLabels, bars)).map(gap => Math.abs(gap - 5))),
          )
          .toBeLessThan(0.5)
      }
      const bar = (await bars.first().boundingBox())!
      const chart = (await svg.boundingBox())!
      await page.mouse.move(
        horizontal ? chart.x + chart.width * 0.75 : bar.x + bar.width / 2,
        horizontal ? bar.y + bar.height / 2 : chart.y + chart.height / 3,
      )
      const band = svg.locator(hoverPath)
      // A grouped band includes the three 6px bars, their 30% gaps, and 12px padding.
      await expect
        .poll(async () => Number(await band.getAttribute('stroke-width')))
        .toBeCloseTo(grouped ? 33.6 : width + 12)
    }
  })
}

test('legends wrap, paginate, and display totals in independent examples', async ({ page }) => {
  await page.setViewportSize({ width: 1500, height: 900 })
  await page.goto('components/bar')
  const titles = page.locator('.archive-app-demo h3')
  await expect
    .poll(() =>
      titles.evaluateAll(nodes => nodes.map(node => node.textContent?.replace(/#\s*$/, '').trim())),
    )
    .toEqual([
      '基础柱状图-竖向',
      '基础柱状图-横向',
      '基础柱状图-横向上方',
      '分组柱状图-竖向',
      '分组柱状图-横向',
      '堆叠柱状图-竖向',
      '堆叠柱状图-横向',
      '图例多列排列（以分组柱状图为例）',
      '图例带数值与百分比（以分组柱状图为例）',
      '卡片化展示（以分组柱状图为例）',
      '外部配置覆盖默认值',
    ])
  const demo = page.locator('.category-bar-legend')
  const svg = demo.locator('svg')
  const count = demo.getByRole('radiogroup', { name: '系列数量' })
  const years = svg.getByText(/^20(?:19|2[0-3])$/)
  const labels = svg.getByText(/^(服务器|终端|分支|设备类别 \d+)$/)
  const arrows = svg.locator('path[stroke-linecap="round"][stroke-linejoin="round"]')
  const rowOffset = (label: string) =>
    svg.evaluate((el, label) => {
      const labels = Array.from(el.querySelectorAll('text'))
      const box = (name: string) =>
        labels.find(item => item.textContent === name)?.getBoundingClientRect()
      const first = box('服务器')
      const other = box(label)
      return first?.width && other?.width ? other.y - first.y : NaN
    }, label)

  await expect(svg.getByText('分支', { exact: true })).toBeVisible()
  await expect.poll(() => rowOffset('分支')).toBeCloseTo(0)
  await count.getByText('18 个系列', { exact: true }).click()
  await expect(svg).toContainText('设备类别 15')
  await expect(svg).toContainText('2023')
  await expect.poll(() => rowOffset('设备类别 15')).toBeGreaterThan(0)
  await expect(arrows).toHaveCount(0)
  await labels.first().hover({ force: true })
  const unpagedY = (await svg.boundingBox())!.y
  await page.mouse.wheel(0, 120)
  await expect.poll(async () => (await svg.boundingBox())!.y).toBeLessThan(unpagedY)
  for (const series of [30, 50]) {
    await count.getByText(`${series} 个系列`, { exact: true }).click()
    await expect(arrows).toHaveCount(2)
    await expect(svg.getByText(/^1\/\d+$/)).toHaveCount(0)
    await expect(years).toHaveText(['2019', '2020', '2021'])
  }

  const selection = svg.locator('path[fill="rgb(135,175,255)"][fill-opacity="0.2"]')
  await selection.scrollIntoViewIfNeeded()
  const box = (await selection.boundingBox())!
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + box.width * 1.1, y, { steps: 12 })
  await page.mouse.up()
  await expect(years).toHaveText(['2021', '2022', '2023'])

  // Each row starts at the same column positions, including labels of different lengths.
  const layout = await labels.evaluateAll(nodes => {
    const rows = new Map<number, { text: string; x: number }[]>()
    for (const node of nodes) {
      const { x, y } = node.getBoundingClientRect()
      const row = Math.round(y)
      const items = rows.get(row) ?? []
      items.push({ text: node.textContent ?? '', x })
      rows.set(row, items)
    }
    return [...rows.values()]
  })
  expect(layout).toHaveLength(2)
  const [firstRow, secondRow] = layout
  expect(firstRow!.length).toBeGreaterThan(2)
  expect(secondRow).toHaveLength(firstRow!.length)
  for (const [index, item] of firstRow!.entries()) {
    expect(item.x).toBeCloseTo(secondRow![index]!.x)
    if (index > 1) {
      expect(item.x - firstRow![index - 1]!.x).toBeCloseTo(firstRow![1]!.x - firstRow![0]!.x)
    }
  }

  const first = svg.getByText('服务器', { exact: true })
  const activeFill = await first.getAttribute('fill')
  await first.click({ force: true })
  await expect(first).not.toHaveAttribute('fill', activeFill!)
  const inactiveFill = await first.getAttribute('fill')
  await arrows.last().click({ force: true })
  await expect(labels.first()).toHaveText(secondRow![0]!.text)
  await expect(first).toHaveCount(0)
  await expect(years).toHaveText(['2021', '2022', '2023'])
  await arrows.first().click({ force: true })
  await expect(first).toHaveAttribute('fill', inactiveFill!)

  await first.hover({ force: true })
  const legendScrollY = (await svg.boundingBox())!.y
  await page.mouse.wheel(0, 120)
  await expect(labels.first()).toHaveText(secondRow![0]!.text)
  await page.mouse.wheel(0, -120)
  await expect(first).toHaveAttribute('fill', inactiveFill!)
  expect((await svg.boundingBox())!.y).toBeCloseTo(legendScrollY)
  await expect(years).toHaveText(['2021', '2022', '2023'])

  const chartBox = (await svg.boundingBox())!
  await page.mouse.move(chartBox.x + 3, chartBox.y + 12)
  await page.mouse.wheel(0, 120)
  await expect.poll(async () => (await svg.boundingBox())!.y).toBeLessThan(legendScrollY)
  await expect(labels.first()).toHaveText('服务器')

  await hoverCategory(page, svg, '2022')
  const columns = demo.locator('.charts-tooltips-column')
  await expect(columns).toHaveCount(5)
  await expect
    .poll(() => columns.evaluateAll(nodes => nodes.map(node => node.children.length)))
    .toEqual([10, 10, 10, 10, 9])
  const firstColumnLast = columns.first().locator('.charts-tooltips-item-name').last()
  await expect(firstColumnLast).toHaveText('设备类别 8')
  const nextColumnFirst = columns.nth(1).locator('.charts-tooltips-item-name').first()
  await expect(nextColumnFirst).toHaveText('设备类别 9')
  expect((await columns.nth(1).boundingBox())!.x).toBeGreaterThan(
    (await columns.first().boundingBox())!.x,
  )
  const tooltipBox = (await demo.locator('.charts-tooltips').boundingBox())!
  expect(tooltipBox.y + tooltipBox.height).toBeLessThan((await first.boundingBox())!.y)

  await count.hover()
  await arrows.last().click({ force: true })
  const anchor = (await labels.first().textContent())!
  expect(anchor).toBe(secondRow![0]!.text)
  const resizedWidth = await demo.evaluate(el => {
    const width = Math.floor(el.clientWidth * 0.7)
    el.style.width = `${width}px`
    return width
  })
  await expect.poll(async () => (await svg.boundingBox())!.width).toBe(resizedWidth)
  await expect.poll(() => labels.count()).toBeLessThan(firstRow!.length + secondRow!.length)
  await expect(svg.getByText(anchor, { exact: true })).toBeVisible()
  await expect(first).toHaveCount(0)
  await expect(years).toHaveText(['2021', '2022', '2023'])
  await arrows.first().click({ force: true })
  await expect(first).toHaveAttribute('fill', inactiveFill!)

  const stats = page.locator('.category-bar-legend-percentage svg')
  await expect(stats.getByText(/^服务器\s+1028 次（29.8%）$/)).toBeVisible()
  await expect(stats.getByText(/^终端\s+1400 次（40.5%）$/)).toBeVisible()
  await expect(stats.getByText(/^分支\s+1025 次（29.7%）$/)).toBeVisible()
})

test('external options override the category defaults and can be removed', async ({ page }) => {
  await page.goto('components/bar')
  const demo = demoByTitle(page, '外部配置覆盖默认值')
  const chart = demo.locator('[_echarts_instance_]')
  const svg = chart.locator('svg')
  const toggle = demo.getByRole('button', { name: '应用外部配置', exact: true })
  const defaultBars = svg.locator(barPaths)
  const customBars = svg.locator('path[fill="#8352cc" i]:not([transform])')

  await expect(defaultBars).toHaveCount(5)
  await expect.poll(() => thickness(defaultBars)).toBeCloseTo(10)
  await toggle.click()
  await expect(customBars).toHaveCount(5)
  await expect.poll(() => thickness(customBars)).toBeCloseTo(14)
  await expect(svg.getByText('500', { exact: true })).toBeVisible()
  await hoverCategory(page, svg, '周一')
  await expect(chart.locator('.charts-tooltips-item-value')).toHaveText('120 次')

  await toggle.click()
  await expect(customBars).toHaveCount(0)
  await expect(defaultBars).toHaveCount(5)
  await expect.poll(() => thickness(defaultBars)).toBeCloseTo(10)
  await expect(svg.getByText('500', { exact: true })).toHaveCount(0)
})

test('the responsive card fills the card body', async ({ page }) => {
  await page.goto('components/bar')
  const card = page.locator('.category-bar-card')
  const svg = card.locator('svg')
  await expect(card.getByText('资产事件趋势', { exact: true })).toBeVisible()
  await expect(svg.getByText('服务器', { exact: true })).toBeAttached()
  const initialWidth = (await svg.boundingBox())!.width
  await page.setViewportSize({ width: 480, height: 800 })
  await expect.poll(async () => (await svg.boundingBox())!.width).toBeLessThan(initialWidth)
  const chart = (await svg.boundingBox())!
  const container = (await card.locator('.ix-card-body').boundingBox())!
  expect(chart.width).toBeCloseTo(container.width - 32)
})
