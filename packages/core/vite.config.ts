import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'

import viteConfig from '../../vite.config'

const externalDeps = ['echarts', 'lodash-es', 'vue-demi', '@idux']

const globalsMap: Record<string, string> = {
  '@idux/charts-core': 'IduxChartsCore',
  '@idux/charts-plots': 'IduxChartsPlots',
  'lodash-es': '_',
  'vue-demi': 'VueDemi',
}

export default mergeConfig(viteConfig, {
  plugins: [dts(), vue(), vueJsx()],
  build: {
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
