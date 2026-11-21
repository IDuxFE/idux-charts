import { createHash } from 'node:crypto'

export const browsers = ['webkit', 'firefox', 'chromium']

export function collectCases(report) {
  if (report.errors?.length) throw new Error('Playwright could not collect the complete suite')
  const cases = []
  function visit(suite, titles) {
    for (const spec of suite.specs ?? []) {
      const titlePath = [...titles, spec.title]
      cases.push({ file: spec.file.replaceAll('\\', '/'), titlePath })
    }
    for (const child of suite.suites ?? []) visit(child, [...titles, child.title])
  }
  // Top-level suites represent files, which already have their own list token.
  for (const suite of report.suites ?? []) visit(suite, [])
  if (!cases.length) throw new Error('Cannot partition an empty suite')
  const ids = cases.map(caseId)
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate test identities in the suite')
  return cases
}

export function caseId(test) {
  return JSON.stringify([test.file, ...test.titlePath])
}

export function partitionCases(cases, seed) {
  if (!seed) throw new Error('Expected a nonempty partition seed')
  const ranked = cases.map(test => ({
    test,
    rank: createHash('sha256')
      .update(JSON.stringify([seed, caseId(test)]))
      .digest('hex'),
  }))
  ranked.sort(
    (left, right) =>
      left.rank.localeCompare(right.rank) || caseId(left.test).localeCompare(caseId(right.test)),
  )
  const assignments = Object.fromEntries(browsers.map(browser => [browser, []]))
  ranked.forEach(({ test }, index) => assignments[browsers[index % browsers.length]].push(test))
  return assignments
}

export function testList(cases, browser) {
  return (
    cases.map(test => `[${browser}] › ${test.file} › ${test.titlePath.join(' › ')}`).join('\n') +
    '\n'
  )
}

export function verifyPlans(plans) {
  const reference = plans.webkit
  if (
    !reference ||
    browsers.some(browser => JSON.stringify(plans[browser]) !== JSON.stringify(reference))
  ) {
    throw new Error('Browser jobs disagreed on the complete assignment')
  }
  if (!reference.seed || !Number.isInteger(reference.total) || reference.total <= 0) {
    throw new Error('Invalid or empty browser assignment')
  }
  const groups = browsers.map(browser => reference.assignments?.[browser])
  if (groups.some(group => !Array.isArray(group))) throw new Error('Missing browser assignment')
  const ids = groups.flat().map(caseId)
  if (ids.length !== reference.total || new Set(ids).size !== reference.total) {
    throw new Error('Browser assignment dropped or duplicated cases')
  }
  const counts = groups.map(group => group.length)
  if (Math.max(...counts) - Math.min(...counts) > 1)
    throw new Error('Unbalanced browser assignment')
  return { seed: reference.seed, total: reference.total, counts }
}
