// @vitest-environment node
/**
 * Exercise the report CLI against temporary JSON files and CI summary destinations.
 * Entry: Vitest / check:ci; no browser needed. Cover missing reports and successful retries
 * so reporting remains diagnostic and cannot silently conceal flaky execution.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, expect, test } from 'vitest'

const script = fileURLToPath(new URL('../e2e-summary.mjs', import.meta.url))
const directories: string[] = []
afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

function summarize(report?: object) {
  const directory = mkdtempSync(join(tmpdir(), 'idux-e2e-summary-'))
  directories.push(directory)
  const input = join(directory, 'results.json')
  const summary = join(directory, 'summary.md')
  if (report) writeFileSync(input, JSON.stringify(report))
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
