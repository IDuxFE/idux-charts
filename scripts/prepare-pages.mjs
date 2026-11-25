/**
 * Add GitHub Pages metadata to a freshly built documentation site.
 * Entry: the site build runs this after Archive writes packages/site/dist/index.html.
 * SITE_DOMAIN optionally writes CNAME; an empty value removes stale custom-domain state.
 * 404.html must match index.html for SPA routes; .nojekyll preserves static assets.
 */
import { copyFileSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const output = new URL('../packages/site/dist/', import.meta.url)
const domain = process.env.SITE_DOMAIN?.trim()
if (domain && !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain)) {
  throw new Error('SITE_DOMAIN must be a hostname without a scheme, port or path.')
}

// GitHub Pages serves this document for history routes without changing the URL.
// Use the exact application entry so nested routes retain their query and hash.
// Archive emits its HTML after Vite's HTML hooks; set the language here so CJK
// font fallback and accessibility tools see it before the application renders.
const entry = new URL('index.html', output)
writeFileSync(entry, readFileSync(entry, 'utf8').replace('<html>', '<html lang="zh-CN">'))
copyFileSync(new URL('index.html', output), new URL('404.html', output))
if (domain) {
  writeFileSync(new URL('CNAME', output), `${domain}\n`)
} else {
  rmSync(new URL('CNAME', output), { force: true })
}
writeFileSync(new URL('.nojekyll', output), '')
