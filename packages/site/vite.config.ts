import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import chartsPkg from '@idux/charts/package.json'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    plugins: [vue()],
    resolve: {
      alias: [
        { find: '@idux/charts', replacement: resolve(__dirname, '../charts/index.ts') },
        { find: '@idux/charts-core', replacement: resolve(__dirname, '../core/index.ts') },
        { find: '@idux/charts-plots', replacement: resolve(__dirname, '../plots/index.ts') },
      ],
    },
    build: {
      target: ['chrome79', 'edge79', 'firefox72', 'safari13'],
    },
    define: {
      __DEV__: !isBuild,
      __VERSION__: `'${chartsPkg.version}'`,
    },
  }
})
