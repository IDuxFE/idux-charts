import { relative, resolve } from 'node:path'
import { createInstrumenter } from 'istanbul-lib-instrument'
import type { Plugin } from 'vite'

/** Instrument library modules after TypeScript erasure, retaining their source maps. */
export function playgroundCoverage(): Plugin {
  const root = resolve(import.meta.dirname, '..')
  return {
    name: 'idux-playground-coverage',
    apply: 'build',
    enforce: 'post',
    transform(code, id) {
      if (process.env.CHARTS_COVERAGE !== '1') return
      const file = relative(root, id).replaceAll('\\', '/')
      if (
        !/^packages\/(core|plots|charts)\/.*\.tsx?$/.test(file) ||
        /(?:\.d\.ts$|\/__tests__\/|\/dist\/|\/vite\.config\.ts$)/.test(file)
      )
        return
      const instrumenter = createInstrumenter({
        esModules: true,
        produceSourceMap: true,
      })
      return {
        code: instrumenter.instrumentSync(
          code,
          file,
          this.getCombinedSourcemap() as unknown as Parameters<
            typeof instrumenter.instrumentSync
          >[2],
        ),
        map: JSON.stringify(instrumenter.lastSourceMap()),
      }
    },
  }
}
