import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import { siteDeploymentBase } from './deployment'
import { createDemoComponentsPlugin } from './demoComponentsPlugin.ts'

export default defineConfig(({ command, isPreview }) => {
  const isBuild = command === 'build'

  return {
    base: isBuild || isPreview ? siteDeploymentBase : '/',
    plugins: [vue({ include: [/\.(vue|md)$/] }), createDemoComponentsPlugin()],
    resolve: {
      alias: [
        { find: '@idux/charts', replacement: resolve(import.meta.dirname, '../charts/index.ts') },
        {
          find: '@idux/charts-core',
          replacement: resolve(import.meta.dirname, '../core/index.ts'),
        },
        {
          find: '@idux/charts-plots',
          replacement: resolve(import.meta.dirname, '../plots/index.ts'),
        },
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
