import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

const externalDeps = ['echarts', 'lodash-es', 'vue', 'vue-demi', '@idux']

const globalsMap: Record<string, string> = {
  '@idux/charts-core': 'IduxChartsCore',
  '@idux/charts-plots': 'IduxChartsPlots',
  'lodash-es': '_',
  vue: 'Vue',
  'vue-demi': 'VueDemi',
}

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    plugins: [dts({ outputDir: resolve(__dirname, '../../dist') }), vue()],
    build: {
      outDir: resolve(__dirname, '../../dist/charts'),
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'index.ts'),
        name: 'IduxCharts',
        fileName: 'index',
      },
      rollupOptions: {
        external: (id: string) => externalDeps.some(k => new RegExp('^' + k).test(id)),
        output: {
          globals: (id: string) => {
            if (id.startsWith('echarts')) {
              return 'echarts'
            }
            return globalsMap[id] || id
          },
        },
      },
    },
    define: {
      __DEV__: !isBuild,
      __VERSION__: `'${pkg.version}'`,
    },
  }
})
