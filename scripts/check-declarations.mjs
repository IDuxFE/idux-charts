import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const directVueImport = /(?:from\s*|import\s*\(\s*)['"]vue(?:\/[^'"]*)?['"]/

function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) {
      checkDirectory(file)
    } else if (entry.name.endsWith('.d.ts')) {
      assert.ok(
        !directVueImport.test(readFileSync(file, 'utf8')),
        `${relative(root, file)} must reference vue-demi instead of vue`,
      )
    }
  }
}

for (const name of ['core', 'plots', 'charts']) {
  checkDirectory(join(root, 'packages', name, 'dist'))
}
