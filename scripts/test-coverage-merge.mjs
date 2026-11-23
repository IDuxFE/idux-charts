/**
 * Regression checks for cross-platform, source-mapped coverage aggregation.
 * Entry: pnpm test:coverage:merge (Node test runner; also part of check:ci).
 * Synthetic Istanbul counters exercise denominator preservation, both-Vue requirements,
 * foreign-source rejection and JSON/source-map location alignment without a browser.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mergeCoverage, normalizeCoverage } from './merge-coverage.mjs'

function sample(path, hits = [1, 0]) {
  return {
    [path]: {
      path,
      statementMap: {
        0: { start: { line: 1, column: 0 }, end: { line: 1, column: 10 } },
        1: { start: { line: 2, column: 0 }, end: { line: 2, column: 10 } },
      },
      s: { 0: hits[0], 1: hits[1] },
      fnMap: {},
      f: {},
      branchMap: {},
      b: {},
    },
  }
}

const source = 'packages/core/utils/example.ts'

test('merges both Vue versions into one source without increasing the denominator or mutating inputs', async () => {
  const unit = sample(`/home/runner/project/${source}`)
  const original = JSON.stringify(unit)
  const browser = sample(`/Users/runner/project/${source}`, [0, 1])
  const map = await mergeCoverage(unit, [
    { project: 'vue2', coverage: browser },
    { project: 'vue3', coverage: sample(source, [1, 1]) },
  ])
  assert.equal(map.files().length, 1)
  assert.equal(map.getCoverageSummary().lines.total, 2)
  assert.equal(map.getCoverageSummary().lines.covered, 2)
  assert.equal(map.getCoverageSummary().statements.total, 2)
  assert.equal(JSON.stringify(unit), original)
})

test('maps compiled browser counters back to original TypeScript sources', async () => {
  const coverage = sample('compiled.js', [0, 1])
  coverage['compiled.js'].inputSourceMap = {
    version: 3,
    file: 'compiled.js',
    sources: [source],
    sourcesContent: ['const a = 1\nconst b = 2\n'],
    names: [],
    mappings: 'AAAA;AACA',
  }
  const unit = sample(source)
  for (const statement of Object.values(unit[source].statementMap)) statement.end.column = null
  const map = await mergeCoverage(unit, [
    { project: 'vue2', coverage },
    { project: 'vue3', coverage },
  ])
  assert.equal(map.getCoverageSummary().lines.covered, 2)
  assert.equal(map.getCoverageSummary().lines.total, 2)
})

test('rejects missing Vue results, empty counters and sources absent from the baseline', async () => {
  await assert.rejects(
    mergeCoverage(sample(source), [{ project: 'vue2', coverage: sample(source) }]),
    /Both Vue/,
  )
  await assert.rejects(
    mergeCoverage(sample(source), [{ project: 'vue2', coverage: {} }]),
    /Empty coverage/,
  )
  await assert.rejects(
    mergeCoverage(sample(source), [
      { project: 'vue2', coverage: sample('packages/core/unknown.ts') },
    ]),
    /missing from unit baseline/,
  )
  await assert.rejects(
    mergeCoverage(sample(source), [{ project: 'vue4', coverage: sample(source) }]),
    /Unknown playground/,
  )
})

test('rejects incompatible counter locations instead of silently duplicating statements', async () => {
  const changed = sample(source)
  changed[source].statementMap[1].end.column = 20
  await assert.rejects(
    mergeCoverage(sample(source), [
      { project: 'vue2', coverage: changed },
      { project: 'vue3', coverage: changed },
    ]),
    /denominator changed/,
  )
})

test('normalizes Windows source paths and excludes type declarations and foreign code', () => {
  const normalized = normalizeCoverage(sample(`C:\\runner\\${source.replaceAll('/', '\\')}`))
  assert.equal(Object.keys(normalized).length, 1)
  assert.deepEqual(normalizeCoverage(sample('packages/charts/types.d.ts')), {})
  assert.throws(
    () => normalizeCoverage(sample('node_modules/vue/index.js')),
    /Unexpected coverage source/,
  )
})

test('aligns a source-mapped end-of-line column with a unique finite unit statement end', async () => {
  const browser = sample(source, [0, 1])
  browser[source].statementMap[1].end.column = null
  const map = await mergeCoverage(sample(source), [
    { project: 'vue2', coverage: browser },
    { project: 'vue3', coverage: browser },
  ])
  assert.equal(map.getCoverageSummary().statements.total, 2)
  assert.equal(map.getCoverageSummary().statements.covered, 2)
})
