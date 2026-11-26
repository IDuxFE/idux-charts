import type { Page } from '@playwright/test'
import { expect, test, hoverCategory } from './helpers'

for (const width of [1440, 768, 390]) {
  test(`theme control follows system and persists manual choice at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('components/radar')
    const root = page.locator('html')
    await expect(root).toHaveAttribute('data-theme', 'dark')
    const lightButton = page.getByRole('button', { name: '切换到亮色模式' })
    await expect(lightButton).toBeInViewport()
    await expect(page.locator('[_echarts_instance_]').first()).toBeVisible()
    await lightButton.click()
    await expect(root).toHaveAttribute('data-theme', 'light')
    await page.reload()
    await expect(root).toHaveAttribute('data-theme', 'light')
    await page.emulateMedia({ colorScheme: 'light' })
    await page.emulateMedia({ colorScheme: 'dark' })
    await expect(root).toHaveAttribute('data-theme', 'light')
    const darkButton = page.getByRole('button', { name: '切换到暗黑模式' })
    await darkButton.focus()
    await page.keyboard.press('Enter')
    await expect(root).toHaveAttribute('data-theme', 'dark')
    await expect(page.locator('.archive-app__root-wrapper')).not.toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    )
    await page.goto('components/gauge')
    await expect(root).toHaveAttribute('data-theme', 'dark')
    await expect(page.locator('[_echarts_instance_]').first()).toBeVisible()
  })
}

test('system theme changes apply until a manual choice is made', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('components/radar')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('button', { name: '切换到亮色模式' })).toBeVisible()
})

for (const route of [
  '0-guide/Introdoction.page.md',
  '0-guide/GettingStarted.page.md',
  ...[
    'core',
    'pie',
    'bar',
    'line',
    'area',
    'radar',
    'gauge',
    'liquid-fill',
    'map',
    'word-cloud',
  ].map(name => `components/${name}`),
]) {
  test(`dark theme renders content and restores light colors on ${route}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto(route)
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(page.locator('.archive-app__root-wrapper')).toHaveCSS(
      'background-color',
      'rgb(10, 12, 15)',
    )
    if (route.startsWith('components/')) {
      const charts = page.locator('[_echarts_instance_]')
      await expect(charts.first()).toBeVisible()
      // Text clouds intentionally use palette colors; tag labels use theme text tokens.
      const surface =
        route === 'components/word-cloud'
          ? page
              .locator('.archive-app-demo')
              .filter({ has: page.getByRole('heading', { name: /^分类矩形标签/ }) })
              .locator('[_echarts_instance_]')
          : charts.first()
      const texts = surface.locator('svg text')
      await expect
        .poll(() =>
          texts.evaluateAll(nodes =>
            nodes.some(node =>
              ['--site-color-text', '--site-color-text-info'].some(
                key =>
                  node.getAttribute('fill')?.toLowerCase() ===
                  getComputedStyle(document.documentElement)
                    .getPropertyValue(key)
                    .trim()
                    .toLowerCase(),
              ),
            ),
          ),
        )
        .toBe(true)
      // API documentation is rendered by Archive's separate Vue runtime.
      await page.getByRole('radio', { name: 'API', exact: true }).click()
      await expect(page.locator('.archive-md').first()).toHaveCSS('color', 'rgb(244, 248, 255)')
    } else {
      await expect(page.locator('.archive-md').first()).toHaveCSS('color', 'rgb(244, 248, 255)')
    }
    await page.getByRole('button', { name: '切换到亮色模式' }).click()
    await expect(page.locator('.archive-app__root-wrapper')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    )
    await expect(page.locator('.archive-md').first()).not.toHaveCSS('color', 'rgb(244, 248, 255)')
    if (route === 'components/core') {
      await page.getByRole('radio', { name: '示例', exact: true }).click()
      const map = page
        .locator('.archive-app-demo')
        .filter({ has: page.getByRole('heading', { name: /^地图/ }) })
      await expect(map.locator('svg path').first()).toBeVisible()
      await expect(map.locator('[_echarts_instance_]')).toHaveAttribute(
        'data-ix-chart-theme',
        'light',
      )
    }
  })
}

async function openAlignment(page: Page) {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('components/pie')
  const demo = page.locator('.pie-align-demo')
  const buttons = demo.getByRole('button')
  await expect(buttons).toHaveCount(9)
  const chart = demo.locator('[_echarts_instance_]')
  await expect(chart.locator('svg')).toBeVisible()
  const id = await chart.getAttribute('_echarts_instance_')
  return { demo, buttons, chart, id }
}

for (const [row, start] of [
  ['top', 0],
  ['middle', 3],
  ['bottom', 6],
] as const) {
  test(`nine-position controls align the ${row} row without recreating the chart`, async ({
    page,
  }) => {
    const { demo, buttons, chart, id } = await openAlignment(page)
    for (const button of (await buttons.all()).slice(start, start + 3)) {
      await expect(button).toHaveClass(/ix-button/)
      await button.click()
      await expect(button).toHaveAttribute('aria-pressed', 'true')
      await expect(demo.locator('[aria-pressed="true"]')).toHaveCount(1)
      await expect(chart).toHaveAttribute('_echarts_instance_', id!)
      await expect(chart).toContainText('554')
    }
  })
}

test('nine-position controls follow iDux themes and support keyboard interaction', async ({
  page,
}) => {
  const { buttons } = await openAlignment(page)
  const first = buttons.first()
  await expect(first).toHaveCSS('background-color', 'rgb(10, 12, 15)')
  await first.focus()
  await page.keyboard.press('Enter')
  await expect(first).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: '切换到亮色模式' }).click()
  await expect(buttons.last()).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(first).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: '切换到暗黑模式' }).click()
  await expect(buttons.last()).toHaveCSS('background-color', 'rgb(10, 12, 15)')
})

test('loading illustration and mask follow dark and light themes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('components/radar')
  const demo = page.locator('.radar-scale-demo')
  await demo.getByText('内置加载状态', { exact: true }).click()
  const loading = demo.getByRole('status')
  await expect(loading).toContainText('正在更新评估数据')
  await expect(loading).toHaveCSS('color', 'rgb(244, 248, 255)')
  await expect(loading).toHaveCSS('background-color', 'rgb(10, 12, 15)')
  const icon = loading.locator('img')
  await expect(icon).toBeVisible()
  expect(decodeURIComponent((await icon.getAttribute('src'))!)).toContain('#465163')
  await page.getByRole('button', { name: '切换到亮色模式' }).click()
  await expect(loading).toHaveCSS('color', 'rgb(106, 112, 125)')
  await expect(loading).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  expect(decodeURIComponent((await icon.getAttribute('src'))!)).toContain('#E1E5EB')
  await demo.getByText('展示数据', { exact: true }).click()
  await expect(loading).toHaveCount(0)
})

test('manual preferences synchronize across tabs and clearing storage restores the system', async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('components/pie')
  const other = await context.newPage()
  await other.emulateMedia({ colorScheme: 'light' })
  await other.goto('components/gauge')
  await page.getByRole('button', { name: '切换到暗黑模式' }).click()
  await expect(other.locator('html')).toHaveAttribute('data-theme', 'dark')
  await other.evaluate(() => localStorage.removeItem('idux-charts-theme'))
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await other.close()
})

test('invalid stored values follow the system', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('idux-charts-theme', 'invalid'))
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('components/pie')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('storage denial still allows a manual choice for the current page', async ({ page }) => {
  await page.addInitScript(() => {
    for (const key of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, key, {
        value: () => {
          throw new DOMException('Blocked', 'SecurityError')
        },
      })
    }
  })
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('components/pie')
  await page.getByRole('button', { name: '切换到暗黑模式' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: '切换到亮色模式' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

for (const [kind, title] of [
  ['bar', '基础柱状图-竖向'],
  ['line', '基础折线图'],
  ['area', '基础面积图（状态示例）'],
] as const) {
  test(`${kind} ${title} tooltips inherit dark surfaces`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto(`components/${kind}`)
    const demo = page
      .locator('.archive-app-demo')
      .filter({ has: page.getByRole('heading', { name: title }) })
    const chart = demo.locator('[_echarts_instance_]')
    await chart.scrollIntoViewIfNeeded()
    await expect(chart).toHaveAttribute('data-ix-chart-theme', 'dark')
    await expect(chart.locator('svg text').first()).toBeAttached()
    await hoverCategory(
      chart.locator('svg'),
      chart.locator('svg text').filter({ hasText: kind === 'bar' ? /^微信网页$/ : /^07-03$/ }),
    )
    const tooltip = chart.locator('.charts-tooltips')
    await expect(tooltip).toBeVisible()
    await expect(tooltip.locator('..')).toHaveCSS('background-color', 'rgb(10, 12, 15)')
    await expect(tooltip.locator('.charts-tooltips-title')).toHaveCSS('color', 'rgb(244, 248, 255)')
    await page.getByRole('button', { name: '切换到亮色模式' }).click()
    await chart.scrollIntoViewIfNeeded()
    await expect(chart).toHaveAttribute('data-ix-chart-theme', 'light')
    await expect(chart.locator('svg text').first()).toBeAttached()
    await hoverCategory(
      chart.locator('svg'),
      chart.locator('svg text').filter({ hasText: kind === 'bar' ? /^微信网页$/ : /^07-03$/ }),
    )
    await expect(tooltip).toBeVisible()
    await expect(tooltip.locator('..')).toHaveCSS('background-color', 'rgba(251, 253, 255, 0.72)')
    await expect(tooltip.locator('..')).toHaveCSS('backdrop-filter', 'blur(4px)')
  })
}
