import { afterEach, expect, test, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

test.each([
  [undefined, '/'],
  ['', '/'],
  ['/', '/'],
  ['/idux-charts', '/idux-charts/'],
  ['/common/idux-charts/', '/common/idux-charts/'],
])('normalizes SITE_BASE %s to %s', async (base, expected) => {
  vi.stubEnv('SITE_BASE', base)
  const { siteDeploymentBase } = await import('../../packages/site/deployment')
  expect(siteDeploymentBase).toBe(expected)
})

test.each(['https://example.com/', '//example.com/', 'charts/', '/a?b', '/a#b', '/a/../b'])(
  'rejects unsupported SITE_BASE %s',
  async base => {
    vi.stubEnv('SITE_BASE', base)
    await expect(import('../../packages/site/deployment')).rejects.toThrow('SITE_BASE')
  },
)
