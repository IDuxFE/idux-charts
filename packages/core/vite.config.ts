import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const externalDeps = ['echarts', 'lodash-es', 'vue', 'vue-demi', '@idux']

const globalsMap: Record<string, string> = {
  '@idux/charts-core': 'IduxChartsCore',
  '@idux/charts-plots': 'IduxChartsPlots',
  'lodash-es': '_',
  vue: 'Vue',
  'vue-demi': 'VueDemi',
}
export default defineConfig({
  plugins: [dts(), vue()],
  build: {
    outDir: resolve(__dirname, '../../dist/core'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'IduxChartsCore',
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
})
