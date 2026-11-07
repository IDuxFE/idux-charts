import { existsSync, readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'
import { siteBaseURL } from './environment'

test('Pages fallback preserves deep links, query parameters and navigation', async ({ page }) => {
  const output = new URL('../packages/site/dist/', import.meta.url)
  const fallback = readFileSync(new URL('404.html', output), 'utf8')
  expect(fallback).toBe(readFileSync(new URL('index.html', output), 'utf8'))
  const domain = process.env.SITE_DOMAIN?.trim()
  if (domain) {
    expect(readFileSync(new URL('CNAME', output), 'utf8').trim()).toBe(domain)
  } else {
    expect(existsSync(new URL('CNAME', output))).toBe(false)
  }
  expect(readFileSync(new URL('.nojekyll', output), 'utf8')).toBe('')
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('response', response => {
    if (response.status() >= 400 && response.request().resourceType() !== 'document') {
      errors.push(`${response.status()} ${response.url()}`)
    }
  })
  // Vite preview normally rewrites missing routes with a 200 response. Emulate
  // Pages instead: serve the deployed 404 document at the original request URL.
  await page.route(`${siteBaseURL}**`, async route => {
    if (
      route.request().isNavigationRequest() &&
      new URL(route.request().url()).pathname !== new URL(siteBaseURL).pathname
    ) {
      await route.fulfill({ status: 404, contentType: 'text/html', body: fallback })
    } else {
      await route.continue()
    }
  })
  const path = 'components/pie?source=a%26b#pages-smoke'
  await page.goto(new URL(path, siteBaseURL).href)
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeVisible()
  await expect(page).toHaveURL(new URL(path, siteBaseURL).href)
  await page.reload()
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeVisible()
  await expect(page).toHaveURL(new URL(path, siteBaseURL).href)
  await page.getByRole('radio', { name: '示例', exact: true }).click()
  await expect(page.locator('[_echarts_instance_] svg').first()).toBeVisible()
  await page.goto(siteBaseURL)
  await page.getByRole('menuitem', { name: '组件', exact: true }).click()
  await page.getByRole('menuitem', { name: '饼图', exact: true }).click()
  await expect(page.getByRole('radio', { name: '示例', exact: true })).toBeVisible()
  expect(errors).toEqual([])
})
