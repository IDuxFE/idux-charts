import { fileURLToPath } from 'node:url'

import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

import viteConfig from './vite.config'

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
      exclude: [...configDefaults.exclude, 'e2e/**', 'playgrounds/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
