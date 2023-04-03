/* eslint-disable import/no-unresolved */
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { IduxResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    plugins: [
      vue({ include: [/\.(vue|md)$/] }),
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
        resolvers: [
          (name: string) => {
            return name.startsWith('Ix') && name.endsWith('Chart')
              ? { name, from: '@idux/charts' }
              : undefined
          },
          IduxResolver({ importStyle: 'css' }),
        ],
      }),
    ],
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
      __VERSION__: `'develop'`,
    },
  }
})
