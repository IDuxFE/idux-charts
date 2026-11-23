/**
 * Summarize a Playwright JSON report without hiding the original test outcome.
 * Entry: node scripts/e2e-summary.mjs <results.json>, after a browser test step.
 * Prints counts, first-attempt failures, retries and slowest cases; appends a CI summary.
 * A missing report is diagnostic, not proof of success; the test step owns exit status.
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs'

const reportPath = process.argv[2]
if (!reportPath) throw new Error('Expected a Playwright JSON report path')

const lines = ['## Browser test results', '']
if (!existsSync(reportPath)) {
  lines.push('No JSON report was produced. Inspect the test/server startup step.', '')
} else {
  const report = JSON.parse(readFileSync(reportPath, 'utf8'))
  const tests = []
  function visit(suite, parents = []) {
    const titles = [...parents, suite.title].filter(Boolean)
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        tests.push({
          title: [...titles, spec.title].join(' › '),
          project: test.projectName,
          status: test.status,
          attempts: test.results ?? [],
        })
      }
    }
    for (const child of suite.suites ?? []) visit(child, titles)
  }
  for (const suite of report.suites ?? []) visit(suite)
  const stats = report.stats ?? {}
  if (stats.flaky > 0) {
    console.log(
      `::warning title=Flaky browser tests::${stats.flaky} tests passed only after retry. See the job summary and HTML report.`,
    )
  }
  // Final status can be passed after a failed attempt; show both views for diagnosis.
  const retried = tests.filter(test => test.attempts.length > 1)
  const firstFailures = tests.filter(test =>
    ['failed', 'timedOut', 'interrupted'].includes(test.attempts[0]?.status),
  )
  lines.push(
    '| Passed | Failed | Flaky | Skipped | First-attempt failures | Retried tests | Elapsed |',
    '| ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    `| ${stats.expected ?? 0} | ${stats.unexpected ?? 0} | ${stats.flaky ?? 0} | ${stats.skipped ?? 0} | ${firstFailures.length} | ${retried.length} | ${((stats.duration ?? 0) / 1000).toFixed(1)}s |`,
    '',
  )
  const escape = text =>
    String(text ?? '')
      .replaceAll('|', '\\|')
      .replaceAll('\n', ' ')
  if (report.errors?.length) {
    lines.push('### Runner errors', '')
    for (const error of report.errors) lines.push(`- ${escape(error.message ?? error.stack)}`)
    lines.push('')
  }
  const attention = tests.filter(test => ['unexpected', 'flaky'].includes(test.status))
  if (attention.length) {
    lines.push(
      '### Failures and successful retries',
      '',
      '| Project | Test | Result | Attempts |',
      '| --- | --- | --- | ---: |',
    )
    for (const test of attention) {
      lines.push(
        `| ${escape(test.project)} | ${escape(test.title)} | ${test.status} | ${test.attempts.length} |`,
      )
    }
    lines.push('')
  }
  lines.push(
    '### Slowest tests (including retries)',
    '',
    '| Project | Test | Duration |',
    '| --- | --- | ---: |',
  )
  // Sum attempts so retry-heavy cases cannot disappear behind a fast final pass.
  for (const test of tests
    .map(test => ({
      ...test,
      duration: test.attempts.reduce((sum, result) => sum + (result.duration ?? 0), 0),
    }))
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10)) {
    lines.push(
      `| ${escape(test.project)} | ${escape(test.title)} | ${(test.duration / 1000).toFixed(1)}s |`,
    )
  }
  lines.push('')
}
const summary = lines.join('\n')
console.log(summary)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary)
