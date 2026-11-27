import { test, expect } from './helpers'

test('documentation tabs persist through reload and browser history', async ({ page }) => {
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

test('tab deep links work across components and fall back for unavailable tabs', async ({
  page,
}) => {
  await page.goto('components/bar?tab=design')
  await expect(page.getByRole('radio', { name: '设计指南', exact: true })).toBeChecked()

  await page.getByRole('menuitem', { name: '组件', exact: true }).click()
  await page.getByRole('menuitem', { name: '基础组件', exact: true }).click()
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
  await expect(page).toHaveURL(/components\/core$/)

  await page.goto('components/core?tab=design')
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
  await page.getByRole('radio', { name: 'API', exact: true }).click()
  await expect(page).toHaveURL(/components\/core\?tab=api$/)

  await page.goto('components/pie?tab=unknown')
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeChecked()
})
