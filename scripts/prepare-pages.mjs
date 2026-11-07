import { copyFileSync, rmSync, writeFileSync } from 'node:fs'

const output = new URL('../packages/site/dist/', import.meta.url)
const domain = process.env.SITE_DOMAIN?.trim()
if (domain && !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain)) {
  throw new Error('SITE_DOMAIN must be a hostname without a scheme, port or path.')
}

// GitHub Pages serves this document for history routes without changing the URL.
// Use the exact application entry so nested routes retain their query and hash.
copyFileSync(new URL('index.html', output), new URL('404.html', output))
if (domain) {
  writeFileSync(new URL('CNAME', output), `${domain}\n`)
} else {
  rmSync(new URL('CNAME', output), { force: true })
}
writeFileSync(new URL('.nojekyll', output), '')
