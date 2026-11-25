import { IduxResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'

/** Resolve the same chart and UI components in docs and real-demo browser fixtures. */
export function createDemoComponentsPlugin(declarations = true): PluginOption {
  return Components({
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    dts: declarations,
    resolvers: [
      (name: string) =>
        name.startsWith('Ix') && name.endsWith('Chart')
          ? { name, from: '@idux/charts' }
          : undefined,
      IduxResolver(),
    ],
  })
}
