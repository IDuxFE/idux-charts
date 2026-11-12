import { resolve } from 'path'

import { chartEntries } from '../../build/chartEntries.ts'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import { chartDeclarations } from '../../build/declarations'

const externalDeps = ['echarts', 'lodash-es', 'vue', 'vue-demi', '@idux']

const globalsMap: Record<string, string> = {
  '@idux/charts-core': 'IduxChartsCore',
  '@idux/charts-plots': 'IduxChartsPlots',
  'lodash-es': '_',
  vue: 'Vue',
  'vue-demi': 'VueDemi',
}

export default defineConfig(({ mode }) => ({
  plugins: [
    mode !== 'modular' && dts(chartDeclarations(resolve(import.meta.dirname, 'tsconfig.json'))),
    vue(),
  ],
  build: {
    emptyOutDir: mode !== 'modular',
    lib: {
      ...chartEntries(import.meta.dirname, mode, '/index.ts'),
      name: 'IduxChartsPlots',
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
}))
