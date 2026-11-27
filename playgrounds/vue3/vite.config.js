import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        basic: fileURLToPath(new URL('basic.html', import.meta.url)),
      },
    },
  },
})
