import { test as base } from '@playwright/test'
import { createCoverageTest } from '../testing/coverage-fixture.js'

export const test = createCoverageTest(base)
export { expect } from '@playwright/test'
