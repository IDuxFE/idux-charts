import { readdirSync } from 'node:fs'
import { test, expect } from './helpers'

const coreDemoCount = readdirSync(
  new URL('../packages/site/src/components/core/demos/', import.meta.url),
).filter(file => file.endsWith('.vue')).length

test('documentation API and design tabs preserve query parameters through reload', async ({
  page,
}) => {
  await page.goto('components/pie?source=a%26b#tab-state')
  const demos = page.getByRole('radio', { name: '示例', exact: true })
  const api = page.getByRole('radio', { name: 'API', exact: true })
  const design = page.getByRole('radio', { name: '设计指南', exact: true })
  await expect(demos).toBeChecked()

  await api.click()
  await expect(page).toHaveURL(/components\/pie\?source=a%26b&tab=api#tab-state$/)
  await expect(page.getByRole('heading', { name: 'IxPieChart', exact: true })).toBeVisible()
  await page.reload()
  await expect(api).toBeChecked()

  await design.click()
  await expect(page).toHaveURL(/tab=design#tab-state$/)
  await page.reload()
  await expect(design).toBeChecked()
  await expect(page.getByRole('heading', { name: 'IxPieChart', exact: true })).toBeHidden()
})

test('documentation tab history survives reload and back/forward navigation', async ({ page }) => {
  await page.goto('components/pie?source=a%26b#tab-state')
  const demos = page.getByRole('radio', { name: '示例', exact: true })
  const api = page.getByRole('radio', { name: 'API', exact: true })
  const design = page.getByRole('radio', { name: '设计指南', exact: true })
  await expect(demos).toBeChecked()
  await api.click()
  await expect(api).toBeChecked()
  await design.click()
  await expect(design).toBeChecked()
  await page.reload()
  await expect(design).toBeChecked()
  await page.goBack()
  await expect(api).toBeChecked()
  await page.goForward()
  await expect(design).toBeChecked()
})

test('documentation demos restore after browser history and reload', async ({ page }) => {
  // Keep real history traversal immediately before demo restoration. The other
  // history case covers reload before traversal, without combining both reloads.
  await page.goto('components/pie?source=a%26b&tab=api#tab-state')
  const demos = page.getByRole('radio', { name: '示例', exact: true })
  const api = page.getByRole('radio', { name: 'API', exact: true })
  const design = page.getByRole('radio', { name: '设计指南', exact: true })
  await expect(api).toBeChecked()
  await design.click()
  await expect(design).toBeChecked()
  await page.goBack()
  await expect(api).toBeChecked()
  await page.goForward()
  await expect(design).toBeChecked()
  await demos.click()
  await expect(page).toHaveURL(/components\/pie\?source=a%26b#tab-state$/)
  await expect(demos).toBeChecked()
  await page.reload()
  await expect(demos).toBeChecked()
  await expect(page.locator('[_echarts_instance_] svg').first()).toBeVisible()
})

test('tab deep links reset correctly across component navigation', async ({ page }) => {
  await page.goto('components/bar?tab=design')
  await expect(page.getByRole('radio', { name: '设计指南', exact: true })).toBeChecked()

  const components = page.getByRole('menuitem', { name: '组件', exact: true })
  // Hover the actual label: the menuitem includes its overlay, so its bounding
  // box centre need not land on the element that handles pointer entry.
  await components.getByText('组件', { exact: true }).hover()
  await expect(components).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('menuitem', { name: '基础组件', exact: true }).click()
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
  await expect(page).toHaveURL(/components\/core$/)
})

test('an unavailable design tab falls back to rendered core demos and allows API selection', async ({
  page,
}) => {
  await page.goto('components/core?tab=design')
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
  expect(coreDemoCount).toBeGreaterThan(0)
  // Archive loads each real demo asynchronously. Do not switch tabs while its
  // Vue application is still mounting into the outgoing content container.
  await expect
    .poll(() =>
      page
        .locator('[_echarts_instance_]')
        .evaluateAll(
          charts => charts.filter(chart => chart.querySelector('svg path, canvas')).length,
        ),
    )
    .toBe(coreDemoCount)
  await page.getByRole('radio', { name: 'API', exact: true }).click()
  await expect(page).toHaveURL(/components\/core\?tab=api$/)
  await expect(page.getByRole('heading', { name: 'IxChart', exact: true })).toBeVisible()
})

test('an unknown tab falls back to rendered pie demos', async ({ page }) => {
  await page.goto('components/pie?tab=unknown')
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
  await expect(page.locator('[_echarts_instance_] svg').first()).toBeVisible()
})
