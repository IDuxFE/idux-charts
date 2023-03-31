import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { basename, dirname, resolve } from 'path'

import yaml from 'yaml-front-matter'

import { defineConfig } from '@idux/archive'
import { createArchiveVuePageLoader, createArchiveVueDemoLoader } from '@idux/archive-loader-vue'
import { getNavFromDirectory } from '@idux/archive-utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(__dirname, './src'),

  theme: {
    themeStyle: 'default',
    logo: {
      image: '/favicon.ico',
      title: 'iDux Charts',
    },
    layout: {
      type: 'sider',
      siderCollapsable: false,
    },
    page: {
      anchorMaxLevel: 6,
    },
  },
  navConfig(root) {
    const pathPageMetaMap = new Map()
    const idPageMetaMap = new Map()

    const _getDirMeta = dir => {
      const {
        id = basename(dir),
        name,
        title,
        description = '',
        index = 999,
      } = JSON.parse(readFileSync(resolve(dir, './meta.json'), 'utf-8'))

      return {
        index,
        id,
        name: name ?? id,
        title: title ?? name ?? id,
        description,
      }
    }

    const _getMdMeta = file => {
      const {
        index,
        type = 'tab',
        title,
        description = '',
      } = yaml.loadFront(readFileSync(file, 'utf-8'))

      return {
        index,
        id: basename(file),
        type,
        name: title,
        title: '',
        description,
      }
    }
    const getMetaInfo = (file, isDir) => {
      if (pathPageMetaMap.has(file)) {
        return pathPageMetaMap.get(file)
      }

      let meta
      if (isDir) {
        meta = _getDirMeta(file)
      } else if (file.endsWith('.md')) {
        meta = _getMdMeta(file)
      }

      idPageMetaMap.set(meta.id, meta)
      pathPageMetaMap.set(file, meta)
      return meta
    }

    const navRecords = getNavFromDirectory(root, {
      getPageInfo(file, isDir) {
        const { id, name, title, description } = getMetaInfo(file, isDir)

        let tabs = []
        let demos = []
        if (isDir) {
          const files = readdirSync(file)

          tabs = files
            .filter(file => /\.md$/.test(file))
            .map(tab => {
              const src = resolve(file, tab)
              const meta = _getMdMeta(src)
              if (meta.type !== 'tab') {
                return undefined
              }
              return {
                ...meta,
                src,
              }
            })
            .filter(Boolean)
            .sort((tab1, tab2) => {
              return tab1.index - tab2.index
            })

          const demoDir = resolve(file, './demos')
          if (existsSync(demoDir)) {
            demos = readdirSync(demoDir).map(demo => resolve(demoDir, demo))
          }

          if (demos.length) {
            tabs.unshift({
              id: 'demos',
              name: '示例',
              demos,
            })
          }
        }

        return {
          id,
          name,
          title,
          description,
          tabs: tabs.length ? tabs : undefined,
          demos: !tabs.length ? demos : undefined,
        }
      },
    })

    return navRecords
  },
  pageLoaders: [createArchiveVuePageLoader()],
  demoLoaders: [createArchiveVueDemoLoader({ setup: resolve(__dirname, './setup.ts') })],
})
