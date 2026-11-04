import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const run = (args, cwd = root) => execFileSync('pnpm', args, { cwd, stdio: 'inherit' })
run(['build:lib'])
const staging = resolve(root, 'playgrounds/.packages')
rmSync(staging, { recursive: true, force: true })
mkdirSync(staging, { recursive: true })
for (const name of ['core', 'plots', 'charts']) {
  run(['pack', '--pack-destination', staging], resolve(root, 'packages', name))
}
for (const version of ['vue2', 'vue3']) {
  const app = resolve(root, 'playgrounds', version)
  const vendor = resolve(app, 'vendor')
  mkdirSync(vendor, { recursive: true })
  for (const name of ['charts-core', 'charts-plots', 'charts']) {
    const archive = readdirSync(staging).find(file => file.startsWith(`idux-${name}-`))
    if (!archive) throw new Error(`Missing archive: ${name}`)
    copyFileSync(resolve(staging, archive), resolve(vendor, `idux-${name}.tgz`))
  }
  // Local archives have stable names but fresh contents. Force reinstallation.
  run(['install', '--no-frozen-lockfile', '--force'], app)
}
