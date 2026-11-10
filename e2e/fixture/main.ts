import { loadDemoFont } from '../../packages/site/demoFont'
import { createApp } from 'vue'
import App from './App.vue'
import PieHover from './PieHover.vue'
import PieLayout from './PieLayout.vue'
import LegacyRiskPie from './LegacyRiskPie.vue'
import LegacyBar from './LegacyBar.vue'
import PieVariants from './PieVariants.vue'
import PieBasicComparison from './PieBasicComparison.vue'
import '../../packages/charts/style/index.less'

const legacy = location.search.includes('legacy-risk')
const legacyBar = location.search.startsWith('?legacy-bar-')
// The legacy screenshot predates registration of the numeric demo font.
const fontReady = legacy ? Promise.resolve() : loadDemoFont()
fontReady.then(() => {
  createApp(
    legacy
      ? LegacyRiskPie
      : legacyBar
        ? LegacyBar
        : location.search.includes('variants')
          ? PieVariants
          : location.search.includes('basic')
            ? PieBasicComparison
            : location.search.includes('rose-hover')
              ? PieHover
              : location.search.includes('pie-layout')
                ? PieLayout
                : App,
  ).mount('#app')
})
