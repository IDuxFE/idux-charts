// @vitest-environment node
/**
 * Exercise the report CLI against temporary JSON files and CI summary destinations.
 * Entry: Vitest / check:ci; no browser needed. Cover missing reports and successful retries
 * so reporting remains diagnostic and cannot silently conceal flaky execution.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, expect, test } from 'vitest'

const script = fileURLToPath(new URL('../e2e-summary.mjs', import.meta.url))
const directories: string[] = []
afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

function summarize(report?: object, startups: object[] = []) {
  const directory = mkdtempSync(join(tmpdir(), 'idux-e2e-summary-'))
  directories.push(directory)
  const input = join(directory, 'results.json')
  const summary = join(directory, 'summary.md')
  if (report) writeFileSync(input, JSON.stringify(report))
  if (startups.length) {
    mkdirSync(join(directory, 'browser-startup'))
    startups.forEach((startup, index) =>
      writeFileSync(join(directory, 'browser-startup', `${index}.json`), JSON.stringify(startup)),
    )
  }
  const output = execFileSync(process.execPath, [script, input], {
    encoding: 'utf8',
    env: { ...process.env, GITHUB_STEP_SUMMARY: summary },
  })
  return { output, summary: readFileSync(summary, 'utf8') }
}

test('reports successful retries without failing the reporting step', () => {
  const { output, summary } = summarize({
    stats: { expected: 1, unexpected: 1, flaky: 1, skipped: 1, duration: 1240 },
    suites: [
      {
        title: 'group|name',
        specs: [
          {
            title: 'normal',
            tests: [
              {
                projectName: 'webkit',
                status: 'expected',
                results: [{ status: 'passed', duration: 10 }],
              },
            ],
          },
          {
            title: 'retry success',
            tests: [
              {
                projectName: 'webkit',
                status: 'flaky',
                results: [
                  { status: 'failed', duration: 20 },
                  { status: 'passed', duration: 30 },
                ],
              },
            ],
          },
          {
            title: 'failure',
            tests: [
              {
                projectName: 'webkit',
                status: 'unexpected',
                results: [
                  { status: 'failed', duration: 40 },
                  { status: 'failed', duration: 50 },
                  { status: 'failed', duration: 60 },
                ],
              },
            ],
          },
          {
            title: 'skipped',
            tests: [
              {
                projectName: 'webkit',
                status: 'skipped',
                results: [{ status: 'skipped', duration: 0 }],
              },
            ],
          },
        ],
      },
    ],
  })
  expect(output).toContain('::warning title=Flaky browser tests::1 tests passed only after retry.')
  expect(summary).toContain('| 1 | 1 | 1 | 1 | 2 | 2 | 1.2s |')
  expect(summary).toContain(String.raw`group\|name`)
  expect(summary).toContain('| flaky | 2 |')
  expect(summary).toContain('| unexpected | 3 |')
  expect(summary.indexOf('failure | 0.1s')).toBeLessThan(summary.indexOf('retry success | 0.1s'))
})

test('explains missing reports after a server or runner startup failure', () => {
  const { summary } = summarize()
  expect(summary).toContain('No JSON report was produced.')
  expect(summary).toContain('test/server startup step')
})

test('shows runner errors even when no test could start', () => {
  const { output, summary } = summarize({
    suites: [],
    stats: {},
    errors: [{ message: 'webServer refused' }],
  })
  expect(summary).toContain('webServer refused')
  expect(output).not.toContain('::warning title=Flaky browser tests')
})

test('lists every slow attempt with precise durations and separate retry totals', () => {
  const { summary } = summarize({
    suites: [
      {
        title: 'timings',
        specs: [
          ...Array.from({ length: 12 }, (_, index) => ({
            title: `slow ${index}`,
            tests: [{ projectName: 'firefox', results: [{ duration: 10_001 + index }] }],
          })),
          { title: 'exact threshold', tests: [{ results: [{ duration: 10_000 }] }] },
          {
            title: 'fast attempts with a slow total',
            tests: [{ results: [{ duration: 6000 }, { duration: 7000 }] }],
          },
          {
            title: 'slow retry',
            tests: [{ projectName: 'webkit', results: [{ duration: 8000 }, { duration: 10_039 }] }],
          },
        ],
      },
    ],
  })
  const allSlow = summary
    .split('### All tests with an attempt over 10 seconds')[1]!
    .split('### Slowest tests')[0]!
  expect(allSlow.match(/\| firefox \|/g)).toHaveLength(12)
  expect(allSlow).toContain('| webkit | timings › slow retry | 8.000s | 10.039s | 18.039s | 1 |')
  expect(allSlow).not.toContain('exact threshold')
  expect(allSlow).not.toContain('fast attempts with a slow total')
})

test('discloses empty-page engine setup separately while retaining overall elapsed time', () => {
  const { summary } = summarize(
    {
      stats: { expected: 1, duration: 20_345 },
      suites: [{ specs: [{ title: 'application', tests: [{ results: [{ duration: 8000 }] }] }] }],
    },
    [{ project: 'firefox', worker: 0, duration: 12_345 }],
  )
  expect(summary).toContain('Browser engine preparation (empty page, included in elapsed)')
  expect(summary).toContain('| firefox | 0 | 12.345s |')
  expect(summary).toContain('20.3s |')
  expect(summary).not.toContain('### All tests with an attempt over 10 seconds')
  expect(summary).toContain('|  | application | 8.0s |')
})
