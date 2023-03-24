import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vite'

import viteConfig from '../../vite.config'

export default mergeConfig(viteConfig, {
  plugins: [vue()],
  define: {
    __VERSION__: `'develop'`,
  },
})
