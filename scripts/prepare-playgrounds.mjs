import { execFileSync, spawn } from 'node:child_process'
import { mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const run = (args, cwd = root) => execFileSync('pnpm', args, { cwd, stdio: 'inherit' })
const versions = process.argv.slice(2)
if (versions.some(version => !['vue2', 'vue3'].includes(version))) {
  throw new Error('Expected playground names: vue2, vue3')
}
run(['build:lib'])
const staging = resolve(root, 'playgrounds/.packages')
rmSync(staging, { recursive: true, force: true })
mkdirSync(staging, { recursive: true })
for (const name of ['core', 'plots', 'charts']) {
  run(['pack', '--pack-destination', staging], resolve(root, 'packages', name))
}
const installs = []
for (const version of new Set(versions.length ? versions : ['vue2', 'vue3'])) {
  const app = resolve(root, 'playgrounds', version)
  const vendor = resolve(app, 'vendor')
  mkdirSync(vendor, { recursive: true })
  for (const name of ['charts-core', 'charts-plots', 'charts']) {
    const archive = readdirSync(staging).find(file => file.startsWith(`idux-${name}-`))
    if (!archive) throw new Error(`Missing archive: ${name}`)
    copyFileSync(resolve(staging, archive), resolve(vendor, `idux-${name}.tgz`))
  }
  // Local archives have stable names but fresh contents. Force reinstallation.
  installs.push(
    new Promise((resolve, reject) => {
      const child = spawn('pnpm', ['install', '--no-frozen-lockfile', '--force'], {
        cwd: app,
        stdio: 'inherit',
      })
      child.on('error', reject)
      child.on('exit', (code, signal) => {
        if (code === 0) resolve()
        else reject(new Error(`${version} install failed: ${signal ?? code}`))
      })
    }),
  )
}

const results = await Promise.allSettled(installs)
const failures = results.filter(result => result.status === 'rejected')
if (failures.length)
  throw new AggregateError(
    failures.map(result => result.reason),
    'Playground installation failed',
  )
