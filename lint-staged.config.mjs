export default {
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}': [
    'oxlint --deny-warnings',
    () => 'pnpm typecheck',
    'vitest related --run --passWithNoTests',
  ],
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue,json,jsonc,yaml,yml,md,mdx,css,scss,less,html}':
    'oxfmt --check',
}
