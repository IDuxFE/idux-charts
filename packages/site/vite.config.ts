import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import chartsPkg from '@idux/charts/package.json'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    plugins: [vue()],
    resolve: {
      alias: [],
    },
    build: {
      outDir: resolve(__dirname, '../../dist/site'),
      emptyOutDir: true,
      target: ['chrome79', 'edge79', 'firefox72', 'safari13'],
    },
    define: {
      __DEV__: !isBuild,
      __VERSION__: `'${chartsPkg.version}'`,
    },
  }
})
