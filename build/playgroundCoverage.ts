/**
 * Opt-in instrumentation for packed libraries exercised by the Vue Playgrounds.
 * All library Vite configs install this plugin; CHARTS_COVERAGE=1 enables counters.
 * Ordinary release builds remain uninstrumented. Original-source maps and relative
 * paths let scripts/merge-coverage.mjs combine macOS execution with Linux unit data.
 */
import { relative, resolve } from 'node:path'
import { createInstrumenter } from 'istanbul-lib-instrument'
import type { Plugin } from 'vite'

/** Instrument library modules after TypeScript erasure, retaining their source maps. */
export function playgroundCoverage(): Plugin {
  const root = resolve(import.meta.dirname, '..')
  return {
    name: 'idux-playground-coverage',
    apply: 'build',
    // Istanbul consumes JavaScript after Vue/TypeScript transforms, not raw TS.
    enforce: 'post',
    transform(code, id) {
      if (process.env.CHARTS_COVERAGE !== '1') return
      const file = relative(root, id).replaceAll('\\', '/')
      // Exclude consumers, third-party code and generated output from the denominator.
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
          // Compose prior transforms so browser counters map back to library sources.
          this.getCombinedSourcemap() as unknown as Parameters<
            typeof instrumenter.instrumentSync
          >[2],
        ),
        map: JSON.stringify(instrumenter.lastSourceMap()),
      }
    },
  }
}
