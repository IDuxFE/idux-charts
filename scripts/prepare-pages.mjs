import { copyFileSync, writeFileSync } from 'node:fs'

const output = new URL('../packages/site/dist/', import.meta.url)

// GitHub Pages serves this document for history routes without changing the URL.
// Use the exact application entry so nested routes retain their query and hash.
copyFileSync(new URL('index.html', output), new URL('404.html', output))
writeFileSync(new URL('CNAME', output), 'charts.idux.site\n')
writeFileSync(new URL('.nojekyll', output), '')
