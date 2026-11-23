/**
 * Fail the final CI gate if downloaded browser receipts disagree or lose coverage.
 * Entry: node scripts/e2e-verify-plans.mjs <downloaded-artifact-directory>.
 * Requires exactly one receipt per browser, one shared seed/catalogue and no duplicates.
 * Keep browser-plans artifact names aligned with .github/actions/browser-reports.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { basename, join } from 'node:path'
import { browsers, verifyPlans } from './e2e-partition.mjs'

const directory = process.argv[2]
if (!directory) throw new Error('Expected the downloaded browser plan directory')
// download-artifact extracts each matching artifact into its own subdirectory.
const files = readdirSync(directory, { recursive: true })
const plans = Object.fromEntries(
  browsers.map(browser => {
    const matches = files.filter(file => basename(file) === `${browser}-assignments.json`)
    if (matches.length !== 1) throw new Error(`Expected exactly one assignment from ${browser}`)
    return [browser, JSON.parse(readFileSync(join(directory, matches[0]), 'utf8'))]
  }),
)
const result = verifyPlans(plans)
console.log(
  `Verified all ${result.total} cases exactly once; seed=${result.seed}; ${browsers.map((browser, index) => `${browser}=${result.counts[index]}`).join(', ')}`,
)
