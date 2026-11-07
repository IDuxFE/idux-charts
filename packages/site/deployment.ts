// Build, preview and browser tests share the same absolute deployment path.
const base = process.env.SITE_BASE || '/'
if (!/^\/(?!\/)[^?#\\\s]*$/.test(base) || new URL(base, 'https://site.invalid').pathname !== base) {
  throw new Error('SITE_BASE must be an absolute URL path such as / or /idux-charts/.')
}
export const siteDeploymentBase = base.endsWith('/') ? base : `${base}/`
