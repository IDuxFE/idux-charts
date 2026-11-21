import { readFileSync, readdirSync } from 'node:fs'
import { basename, join } from 'node:path'
import { browsers, verifyPlans } from './e2e-partition.mjs'

const directory = process.argv[2]
if (!directory) throw new Error('Expected the downloaded browser plan directory')
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
