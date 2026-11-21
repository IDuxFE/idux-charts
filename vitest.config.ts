import { fileURLToPath } from 'node:url'

import { mergeConfig } from 'vite'
import { configDefaults, coverageConfigDefaults, defineConfig } from 'vitest/config'

import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        '@idux/charts-core': fileURLToPath(new URL('./packages/core/index.ts', import.meta.url)),
      },
    },
    test: {
      environment: 'jsdom',
      // Keep slower DOM/chart integration cases within a bounded test budget.
      testTimeout: 10_000,
      exclude: [...configDefaults.exclude, 'e2e/**', 'playgrounds/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        include: ['packages/{core,plots,charts}/**/*.{ts,tsx,vue}'],
        exclude: [
          ...coverageConfigDefaults.exclude,
          '**/__tests__/**',
          '**/vite.config.ts',
          '**/dist/**',
        ],
        reporter: ['text', 'html', 'lcov', 'json-summary', 'json'],
        reportsDirectory: './coverage',
      },
    },
  }),
)
