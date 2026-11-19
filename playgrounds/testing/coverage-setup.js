import { rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export default async function setup(config) {
  const project = config.rootDir.includes('/vue2/') ? 'vue2' : 'vue3'
  await rm(fileURLToPath(new URL(`../../coverage/playgrounds/${project}/`, import.meta.url)), {
    recursive: true,
    force: true,
  })
}
