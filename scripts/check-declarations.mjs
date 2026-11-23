/**
 * Reject direct Vue imports in published declarations; public types must use vue-demi.
 * Entry: pnpm check:declarations (also the final stage of pnpm build:lib).
 * Reads packages/{core,plots,charts}/dist recursively; build those directories first.
 * This static guard complements the packed-consumer checks in test-declarations.mjs.
 */
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
// Cover both static imports/re-exports and inline import('vue').SomeType forms.
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
