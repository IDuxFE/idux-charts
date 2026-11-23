// @vitest-environment node
/**
 * Guard seeded browser distribution and complete, non-overlapping receipt verification.
 * Entry: Vitest / check:ci; uses synthetic cases, not the changing live E2E catalogue.
 * Protect reproducibility, browser-independent case identities and bounded count skew.
 */
import { expect, test } from 'vitest'
import {
  browsers,
  caseId,
  collectCases,
  partitionCases,
  testList,
  verifyPlans,
} from '../e2e-partition.mjs'

const cases = Array.from({ length: 254 }, (_, index) => ({
  file: `chart-${index % 7}.spec.ts`,
  titlePath: ['交互行为', `scenario ${index}`],
}))

test('assigns the complete catalogue exactly once with balanced browser counts', () => {
  const assignments = partitionCases(cases, 'run-123')
  const selected = Object.values(assignments).flat()
  expect(selected.map(caseId).sort()).toEqual(cases.map(caseId).sort())
  expect(new Set(selected.map(caseId)).size).toBe(254)
  expect(browsers.map(browser => assignments[browser].length)).toEqual([85, 85, 84])
})

test('reproduces a seed independently of collection order and changes assignments for new runs', () => {
  const original = partitionCases(cases, 'run-123')
  expect(partitionCases([...cases].reverse(), 'run-123')).toEqual(original)
  expect(partitionCases(cases, 'run-124')).not.toEqual(original)
})

test('keeps nested titles and file names without browser-dependent identities', () => {
  const report = {
    suites: [
      {
        title: 'chart.spec.ts',
        suites: [
          {
            title: 'nested',
            specs: [
              { title: 'clicks > once', file: 'chart.spec.ts', tests: [{ projectName: 'webkit' }] },
            ],
          },
        ],
      },
    ],
  }
  const collected = collectCases(report)
  expect(collected).toEqual([{ file: 'chart.spec.ts', titlePath: ['nested', 'clicks > once'] }])
  expect(testList(collected, 'webkit')).toBe('[webkit] › chart.spec.ts › nested › clicks > once\n')
})

test('rejects incomplete collection and duplicate test identities instead of losing coverage', () => {
  expect(() => collectCases({ suites: [] })).toThrow('empty suite')
  expect(() => collectCases({ errors: [{ message: 'load error' }] })).toThrow('complete suite')
  const spec = { title: 'same', file: 'chart.spec.ts' }
  expect(() => collectCases({ suites: [{ specs: [spec, spec] }] })).toThrow('Duplicate')
  expect(() => partitionCases(cases, '')).toThrow('seed')
})

test('verifies receipts from all browser jobs and rejects inconsistent or incomplete coverage', () => {
  const plan = {
    seed: 'run-123',
    total: cases.length,
    assignments: partitionCases(cases, 'run-123'),
  }
  const receipts = Object.fromEntries(browsers.map(browser => [browser, structuredClone(plan)]))
  expect(verifyPlans(receipts)).toEqual({ seed: 'run-123', total: 254, counts: [85, 85, 84] })
  receipts.firefox.seed = 'different-run'
  expect(() => verifyPlans(receipts)).toThrow('disagreed')
  const duplicate = structuredClone(plan)
  duplicate.assignments.webkit[0] = duplicate.assignments.firefox[0]
  expect(() =>
    verifyPlans(Object.fromEntries(browsers.map(browser => [browser, duplicate]))),
  ).toThrow('duplicated')
})

test('rejects empty or uneven receipts even when all browser jobs agree', () => {
  const receipts = (plan: object) => Object.fromEntries(browsers.map(browser => [browser, plan]))
  expect(() => verifyPlans(receipts({ seed: 'empty', total: 0, assignments: {} }))).toThrow('empty')
  const assignments = partitionCases(cases, 'run-123')
  assignments.firefox.push(...assignments.webkit.splice(0, 20))
  expect(() =>
    verifyPlans(receipts({ seed: 'run-123', total: cases.length, assignments })),
  ).toThrow('Unbalanced')
})
