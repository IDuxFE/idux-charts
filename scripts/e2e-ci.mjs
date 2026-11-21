import { execFileSync, spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import {
  appendFileSync,
  existsSync,
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { browsers, caseId, collectCases, partitionCases, testList } from './e2e-partition.mjs'

const [browser, ...args] = process.argv.slice(2)
if (!browsers.includes(browser)) throw new Error('Expected a browser: webkit, firefox or chromium')
const root = fileURLToPath(new URL('..', import.meta.url))
const cli = createRequire(import.meta.url).resolve('@playwright/test/cli')
const seed =
  process.env.IDUX_E2E_SEED || process.env.GITHUB_RUN_ID || randomBytes(8).toString('hex')
const planOnly = args.includes('--plan-only')
const forwarded = args.filter(arg => arg !== '--plan-only')
const filters = [
  '--project',
  '--shard',
  '--grep',
  '--grep-invert',
  '--test-list',
  '--test-list-invert',
  '--config',
  '--list',
  '--pass-with-no-tests',
]
if (forwarded.some(arg => filters.some(flag => arg === flag || arg.startsWith(`${flag}=`)))) {
  throw new Error(
    'Filtering a CI partition would drop coverage; use test:e2e:full for custom selection',
  )
}
const temporary = mkdtempSync(join(tmpdir(), 'idux-e2e-plan-'))
const listPath = join(temporary, `${browser}.txt`)
const manifestPath = join(temporary, 'assignments.json')
const output = process.env.IDUX_E2E_PLAN_DIR || join(root, 'test-results', 'ci-plan')

function listTests(extra = []) {
  const report = join(temporary, 'collection.json')
  execFileSync(
    process.execPath,
    [cli, 'test', `--project=${browser}`, '--list', '--reporter=json', ...extra],
    {
      cwd: root,
      env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_FILE: report },
      stdio: ['ignore', 'pipe', 'inherit'],
    },
  )
  return collectCases(JSON.parse(readFileSync(report, 'utf8')))
}

try {
  const cases = listTests()
  const assignments = partitionCases(cases, seed)
  const selected = assignments[browser]
  if (!selected.length) throw new Error(`No tests assigned to ${browser}`)
  writeFileSync(listPath, testList(selected, browser))
  writeFileSync(
    manifestPath,
    JSON.stringify({ seed, total: cases.length, assignments }, null, 2) + '\n',
  )
  // Playwright's test-list format accepts title prefixes. Verify its actual
  // selection, so an ambiguous title cannot silently duplicate/drop coverage.
  const actual = listTests([`--test-list=${listPath}`])
    .map(caseId)
    .sort()
  const expected = selected.map(caseId).sort()
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    throw new Error(
      `Playwright test-list selection differs from seed ${seed}: extra=${JSON.stringify(actual.filter(id => !expected.includes(id)))}, missing=${JSON.stringify(expected.filter(id => !actual.includes(id)))}`,
    )
  const message = `Random E2E partition: seed=${seed}, ${browser}=${selected.length}/${cases.length}`
  console.log(message)
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `## Random browser assignment\n\n${message}\n\nThe complete assignment and selected test list are included in the browser report artifact.\n\n`,
    )
  }
  if (!planOnly) {
    const result = spawnSync(
      process.execPath,
      [cli, 'test', `--project=${browser}`, `--test-list=${listPath}`, ...forwarded],
      { cwd: root, env: process.env, stdio: 'inherit' },
    )
    if (result.error) throw result.error
    process.exitCode = result.status ?? 1
  }
} finally {
  try {
    mkdirSync(output, { recursive: true })
    for (const [source, name] of [
      [manifestPath, `${browser}-assignments.json`],
      [listPath, `${browser}.txt`],
    ]) {
      if (existsSync(source)) copyFileSync(source, join(output, name))
    }
  } catch (error) {
    console.error('Could not retain the E2E assignment:', error)
    process.exitCode = 1
  }
  rmSync(temporary, { recursive: true, force: true })
}
