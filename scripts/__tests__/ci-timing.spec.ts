// @vitest-environment node
/**
 * Exercise the timing CLI with real child commands, without invoking build tools.
 * Entry: Vitest / check:ci. Guard literal arguments, original failure exit codes,
 * and diagnostic output on failed installs so timing cannot conceal CI failures.
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, expect, test } from 'vitest'

const script = fileURLToPath(new URL('../ci-timing.mjs', import.meta.url))
const directories: string[] = []

afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

function run(command: string, args: string[] = []) {
  const directory = mkdtempSync(join(tmpdir(), 'idux-timing-test-'))
  directories.push(directory)
  const summary = join(directory, 'summary.md')
  const result = spawnSync(process.execPath, [script, 'Preparation', command, ...args], {
    encoding: 'utf8',
    env: { ...process.env, GITHUB_STEP_SUMMARY: summary },
  })
  return { ...result, summary: readFileSync(summary, 'utf8') }
}

test('passes literal arguments and preserves successful command output', () => {
  const argument = 'spaces; $(shell) `literal`'
  const result = run(process.execPath, ['-e', 'console.log(process.argv[1])', argument])
  expect(result.status).toBe(0)
  expect(result.stdout).toContain(argument)
  expect(result.summary).toMatch(/Preparation.*\d+\.\d+s \(passed\)/)
})

test('retains the child exit code and reports elapsed time on failure', () => {
  const result = run(process.execPath, ['-e', 'console.error("install failed"); process.exit(7)'])
  expect(result.status).toBe(7)
  expect(result.stderr).toContain('install failed')
  expect(result.summary).toMatch(/Preparation.*\d+\.\d+s \(failed\)/)
})

test('fails and reports timing when a command cannot be started', () => {
  const result = run(join(tmpdir(), 'idux-nonexistent-timing-command'))
  expect(result.status).toBe(1)
  expect(result.stderr).toContain('ENOENT')
  expect(result.summary).toContain('(failed)')
})

test.each([0, 7])('retains exit code %s when the diagnostic summary cannot be written', code => {
  const directory = mkdtempSync(join(tmpdir(), 'idux-timing-test-'))
  directories.push(directory)
  const result = spawnSync(
    process.execPath,
    [script, 'Preparation', process.execPath, '-e', `process.exit(${code})`],
    { encoding: 'utf8', env: { ...process.env, GITHUB_STEP_SUMMARY: directory } },
  )
  expect(result.status).toBe(code)
  expect(result.stderr).toContain('Could not write job summary')
})
