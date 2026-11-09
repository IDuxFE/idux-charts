import { siteDeploymentBase } from '../packages/site/deployment'

export const isCI = !!process.env.CI
export const sitePreviewPort = Number(process.env.IDUX_E2E_SITE_PORT ?? 4173)
export const fixturePort = Number(process.env.IDUX_E2E_FIXTURE_PORT ?? 8082)
export const serverHost = 'localhost'

// Keep the trailing slash: relative test URLs must preserve the deployment base.
export const siteBaseURL = `http://${serverHost}:${sitePreviewPort}${siteDeploymentBase}`
export const fixtureBaseURL = `http://${serverHost}:${fixturePort}/`
