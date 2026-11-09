import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fixturePort, serverHost } from '../environment'

const fromRoot = (path: string) => fileURLToPath(new URL(`../../${path}`, import.meta.url))

export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  define: { __VERSION__: JSON.stringify('test'), __DEV__: command !== 'build' },
  plugins: [vue()],
  resolve: {
    alias: {
      '@idux/charts': fromRoot('packages/charts/index.ts'),
      '@idux/charts-core': fromRoot('packages/core/index.ts'),
      '@idux/charts-plots': fromRoot('packages/plots/index.ts'),
      echarts: fromRoot('packages/core/node_modules/echarts'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fromRoot('e2e/fixture/index.html'),
        special: fromRoot('e2e/fixture/special.html'),
        cartesian: fromRoot('e2e/fixture/cartesian.html'),
      },
    },
  },
  server: { host: serverHost, port: fixturePort, strictPort: true, fs: { allow: [fromRoot('')] } },
  preview: { host: serverHost, port: fixturePort, strictPort: true },
}))
