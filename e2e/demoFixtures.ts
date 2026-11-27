import type { Page } from '@playwright/test'
import { expect } from './helpers'
import { fixtureBaseURL } from './environment'

export const barDemoKeys: Record<string, string> = {
  '基础柱状图-竖向': 'bar-basic',
  '基础柱状图-横向': 'bar-horizontal',
  '基础柱状图-横向上方': 'bar-above',
  '分组柱状图-竖向': 'bar-grouped-vertical',
  '分组柱状图-横向': 'bar-grouped-horizontal',
  '堆叠柱状图-竖向': 'bar-stacked-vertical',
  '堆叠柱状图-横向': 'bar-stacked-horizontal',
  '图例多列排列（以分组柱状图为例）': 'bar-legend',
  外部配置覆盖默认值: 'bar-options',
}

// Mount the actual documentation component with site setup and responsive sizing.
// Route, catalogue, theme controls and complete-page layout retain separate site tests.
export async function openDemo(page: Page, key: string) {
  await page.goto(`${fixtureBaseURL}demo.html?demo=${encodeURIComponent(key)}`)
  const demo = page.locator('#behavior-demo')
  await expect(demo.locator('[_echarts_instance_]')).toHaveCount(1)
  return demo
}
