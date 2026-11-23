/**
 * Merge unit and instrumented Vue 2/3 consumer coverage onto original source files.
 * Entry: pnpm coverage:merge; also exports helpers for test-coverage-merge.mjs.
 * Reads coverage-final.json and JSON files under coverage/playgrounds; writes coverage/combined/.
 * Normalize cross-runner paths and source maps without increasing the unit denominator.
 * Both Vue consumer results are mandatory; missing/foreign sources are errors.
 */
import { readFileSync, readdirSync, rmSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import coverageLibrary from 'istanbul-lib-coverage'
import sourceMaps from 'istanbul-lib-source-maps'
import reportLibrary from 'istanbul-lib-report'
import reports from 'istanbul-reports'

const { createCoverageMap } = coverageLibrary
const { createContext } = reportLibrary

const root = fileURLToPath(new URL('..', import.meta.url))
const directory = resolve(root, 'coverage')
const read = file => JSON.parse(readFileSync(file, 'utf8'))

// CI combines Linux unit results and macOS browser results. Use checkout-relative
// source identities, then resolve against this checkout for HTML source lookup.
// JSON serializes the remapper's end-of-line Infinity columns as null.
// Restore them before comparing Istanbul locations from JSON and source maps.
function restoreColumns(value) {
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    if (key === 'column' && child === null) value[key] = Infinity
    else restoreColumns(child)
  }
}

export function normalizeCoverage(data, sourceRoot = root) {
  const result = {}
  for (const value of Object.values(data)) {
    const coverage = structuredClone(typeof value.toJSON === 'function' ? value.toJSON() : value)
    for (const key of ['statementMap', 'fnMap', 'branchMap']) restoreColumns(coverage[key])
    const path = coverage.path.replaceAll('\\', '/')
    if (path.endsWith('.d.ts')) continue
    const file = path.slice(path.indexOf('packages/'))
    if (
      !/^packages\/(core|plots|charts)\//.test(file) ||
      /(?:^|\/)(?:dist|__tests__)\//.test(file) ||
      file.endsWith('.d.ts') ||
      file.includes('/../')
    ) {
      throw new Error(`Unexpected coverage source: ${path}`)
    }
    const absolute = resolve(sourceRoot, file)
    result[absolute] = { ...coverage, path: absolute }
  }
  return result
}

function jsonFiles(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap(entry => {
    const file = resolve(path, entry.name)
    return entry.isDirectory() ? jsonFiles(file) : entry.name.endsWith('.json') ? [file] : []
  })
}

// A source map may map an expression's end to the end of its source line,
// while Vitest retains the exact end column. Reuse the baseline location only
// for a unique statement with the same start and end line and an open-ended end.
function alignStatementEnds(baseline, incoming) {
  for (const [id, location] of Object.entries(incoming.statementMap)) {
    const candidates = Object.values(baseline.statementMap).filter(
      other =>
        other.start.line === location.start.line &&
        other.start.column === location.start.column &&
        other.end.line === location.end.line &&
        (other.end.column === location.end.column ||
          other.end.column === Infinity ||
          location.end.column === Infinity),
    )
    if (candidates.length === 1) incoming.statementMap[id] = structuredClone(candidates[0])
  }
}

export async function mergeCoverage(unit, playgrounds) {
  const map = createCoverageMap(normalizeCoverage(unit))
  const baseline = map.getCoverageSummary().toJSON()
  const projects = new Set()
  for (const { project, coverage } of playgrounds) {
    if (!['vue2', 'vue3'].includes(project)) throw new Error(`Unknown playground: ${project}`)
    const remapped = await sourceMaps
      .createSourceMapStore()
      .transformCoverage(createCoverageMap(coverage))
    const normalized = normalizeCoverage(remapped.toJSON())
    if (!Object.keys(normalized).length) throw new Error(`Empty coverage: ${project}`)
    for (const file of Object.keys(normalized)) {
      if (!map.files().includes(file)) throw new Error(`Source missing from unit baseline: ${file}`)
      alignStatementEnds(map.fileCoverageFor(file).toJSON(), normalized[file])
    }
    map.merge(normalized)
    projects.add(project)
  }
  if (projects.size !== 2) throw new Error('Both Vue 2 and Vue 3 coverage are required')
  const combined = map.getCoverageSummary().toJSON()
  for (const metric of ['statements', 'functions', 'branches', 'lines']) {
    if (combined[metric].total !== baseline[metric].total) {
      throw new Error(
        `Coverage denominator changed for ${metric}: ${baseline[metric].total} -> ${combined[metric].total}`,
      )
    }
  }
  return map
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = resolve(directory, 'combined')
  rmSync(output, { recursive: true, force: true })
  const unit = read(resolve(directory, 'coverage-final.json'))
  const inputs = jsonFiles(resolve(directory, 'playgrounds')).map(read)
  const map = await mergeCoverage(unit, inputs)
  const context = createContext({ dir: output, coverageMap: map })
  for (const name of ['text-summary', 'html', 'lcovonly', 'json', 'json-summary']) {
    reports.create(name).execute(context)
  }
  console.log(
    `Combined coverage: ${relative(root, output)}/index.html (${inputs.length} browser snapshots)`,
  )
}
