import { loadDemoFont } from '../../packages/site/demoFont'
import { createApp } from 'vue'
import App from './App.vue'
import PieHover from './PieHover.vue'
import PieLayout from './PieLayout.vue'
import LegacyRiskPie from './LegacyRiskPie.vue'
import LegacyBar from './LegacyBar.vue'
import PieBasicComparison from './PieBasicComparison.vue'
import '../../packages/charts/style/index.less'

const legacy = location.search.includes('legacy-risk')
const legacyBar = location.search.startsWith('?legacy-bar-')
// The legacy screenshot predates registration of the numeric demo font.
const fontReady = legacy ? Promise.resolve() : loadDemoFont()
fontReady.then(async () => {
  if (location.search.includes('visual-matrix')) {
    const { default: VisualMatrix } = await import('./VisualMatrix.vue')
    createApp(VisualMatrix).mount('#app')
    return
  }
  if (location.search.includes('long-categories')) {
    const { default: LongCategories } = await import('./LongCategories.vue')
    createApp(LongCategories).mount('#app')
    return
  }
  if (!legacy && !legacyBar && location.search.includes('variants')) {
    const { mountPieVariants } = await import('./mountPieVariants')
    mountPieVariants()
    return
  }
  if (location.search === '?loading') {
    const { default: Loading } = await import('./Loading.vue')
    createApp(Loading).mount('#app')
    return
  }
  createApp(
    legacy
      ? LegacyRiskPie
      : legacyBar
        ? LegacyBar
        : location.search.includes('basic')
          ? PieBasicComparison
          : location.search.includes('rose-hover')
            ? PieHover
            : location.search.includes('pie-layout')
              ? PieLayout
              : App,
  ).mount('#app')
})
