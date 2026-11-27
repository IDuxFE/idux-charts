import { test, expect } from './helpers'

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

test('documentation tab history survives reload and restores the demo route', async ({ page }) => {
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
  // A deep link can already expand its route's group; clicking again would collapse it.
  if ((await components.getAttribute('aria-expanded')) !== 'true') await components.click()
  await expect(components).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('menuitem', { name: '基础组件', exact: true }).click()
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
  await expect(page).toHaveURL(/components\/core$/)
})

test('unavailable and unknown tab deep links fall back to demos', async ({ page }) => {
  await page.goto('components/core?tab=design')
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
  await page.getByRole('radio', { name: 'API', exact: true }).click()
  await expect(page).toHaveURL(/components\/core\?tab=api$/)

  await page.goto('components/pie?tab=unknown')
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
})
