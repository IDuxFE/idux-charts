/**
 * Share the public aggregate/subpath entry layout between plots and charts builds.
 * Called by their Vite configs: the default pass emits legacy aggregate formats,
 * then mode=modular emits one ESM graph without clearing the first pass's output.
 * Keep plot names aligned with package exports; extraEntries adds package-specific APIs.
 */
import { resolve } from 'node:path'
import type { LibraryOptions } from 'vite'

const plots = ['bar', 'line', 'pie', 'radar', 'gauge', 'liquid-fill', 'map']

/** plotSuffix distinguishes plots' <name>/index.ts from charts' <name>.ts wrappers. */
export function chartEntries(
  directory: string,
  mode: string,
  plotSuffix: string,
  extraEntries: Record<string, string> = {},
): Pick<LibraryOptions, 'entry' | 'formats' | 'fileName'> {
  const index = resolve(directory, 'index.ts')
  if (mode !== 'modular') return { entry: index, fileName: 'index' }

  // Build the aggregate and subpaths together so mixed ESM imports reuse the
  // same components and injection tokens. The first build provides legacy UMD.
  return {
    entry: {
      index,
      ...Object.fromEntries(
        plots.map(name => [
          plotSuffix === '.ts' ? name : `${name}/index`,
          resolve(directory, name + plotSuffix),
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(extraEntries).map(([name, file]) => [name, resolve(directory, file)]),
      ),
    },
    // UMD is a single-entry format; only the first pass may produce it.
    formats: ['es'],
  }
}
