/**
 * Time a preparation phase without changing its command, output, or failure status.
 * CLI: node scripts/ci-timing.mjs "Phase name" command [args...].
 * Logs locally; also appends elapsed time and result to the current CI job summary.
 * withTiming is shared with Playground preparation so local/CI entry points agree.
 */
import { spawn } from 'node:child_process'
import { appendFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

export async function withTiming(label, operation) {
  const started = performance.now()
  let result = 'failed'
  try {
    const value = await operation()
    result = 'passed'
    return value
  } finally {
    // Report command failures too: a failed install must retain its elapsed time.
    const seconds = ((performance.now() - started) / 1000).toFixed(1)
    const line = `- **${label}**: ${seconds}s (${result})\n`
    console.log(`[timing] ${label}: ${seconds}s (${result})`)
    if (process.env.GITHUB_STEP_SUMMARY) {
      // Diagnostics must not replace the command's success or original failure code.
      try {
        appendFileSync(process.env.GITHUB_STEP_SUMMARY, line)
      } catch (error) {
        console.warn(`[timing] Could not write job summary: ${error.message}`)
      }
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [label, command, ...args] = process.argv.slice(2)
  if (!label || !command) throw new Error('Expected a phase name, command and optional arguments')
  try {
    await withTiming(
      label,
      () =>
        new Promise((resolve, reject) => {
          // Preserve argument boundaries; never reinterpret the command with a shell.
          const child = spawn(command, args, { stdio: 'inherit' })
          child.on('error', reject)
          child.on('exit', (code, signal) => {
            if (code === 0) resolve()
            else {
              const error = new Error(`${command} failed: ${signal ?? code}`)
              error.exitCode = code ?? 1
              reject(error)
            }
          })
        }),
    )
  } catch (error) {
    console.error(error.message)
    process.exitCode = error.exitCode ?? 1
  }
}
