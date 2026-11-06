import { loadDemoFont } from '../../packages/site/demoFont'
import { createApp } from 'vue'
import App from './App.vue'
import LegacyRiskPie from './LegacyRiskPie.vue'
import PieVariants from './PieVariants.vue'
import PieBasicComparison from './PieBasicComparison.vue'
import '../../packages/charts/style/index.less'

const legacy = location.search.includes('legacy-risk')
// The legacy screenshot predates registration of the numeric demo font.
Promise.all(legacy ? [] : [loadDemoFont(), loadDemoFont('D-DIN-PRO')]).then(() => {
  createApp(
    legacy
      ? LegacyRiskPie
      : location.search.includes('variants')
        ? PieVariants
        : location.search.includes('basic')
          ? PieBasicComparison
          : App,
  ).mount('#app')
})
