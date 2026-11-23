/**
 * Collect local unit + Vue 2/3 consumer coverage from one clean generation.
 * Entry: pnpm test:coverage:all; requires Chromium and installs fresh consumer tarballs.
 * Order matters: Vitest clears coverage/, then both instrumented Playgrounds run.
 * Only merge after both consumers pass; output is coverage/combined/.
 */
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('..', import.meta.url))
function run(args, coverage = false) {
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', args, {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, ...(coverage ? { CHARTS_COVERAGE: '1' } : {}) },
    })
    child.on('error', reject)
    child.on('exit', (code, signal) =>
      code === 0 ? resolve() : reject(new Error(`${args.join(' ')} failed: ${signal ?? code}`)),
    )
  })
}

// Vitest cleans coverage/ first. Never combine snapshots from an older run.
await run(['test:coverage:merge'])
await run(['test:coverage'])
await run(['playgrounds:prepare'], true)
// Await both consumers even after one fails; do not merge half-finished snapshots.
const results = await Promise.allSettled(
  ['vue2', 'vue3'].map(version => run(['--dir', `playgrounds/${version}`, 'test:e2e'], true)),
)
const failures = results.filter(result => result.status === 'rejected')
if (failures.length)
  throw new AggregateError(
    failures.map(result => result.reason),
    'Playground coverage failed',
  )
await run(['coverage:merge'])
