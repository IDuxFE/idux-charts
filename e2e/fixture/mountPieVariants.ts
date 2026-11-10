import { createApp } from 'vue'
import { IxPieChart } from '@idux/charts'
import { IxButton } from '@idux/components/button'
import { IxCard } from '@idux/components/card'
import { IxEmpty } from '@idux/components/empty'
import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'
import { IxRadio, IxRadioGroup } from '@idux/components/radio'
import { IxSlider } from '@idux/components/slider'
import { IxSpace } from '@idux/components/space'
import { IxSwitch } from '@idux/components/switch'
import '@idux/components/index.full.css'
import PieVariants from './PieVariants.vue'

export function mountPieVariants() {
  const app = createApp(PieVariants)
  // The site resolves these tags at build time. The fixture mounts the demos directly.
  const components = {
    IxPieChart,
    IxButton,
    IxCard,
    IxEmpty,
    IxHeader,
    IxIcon,
    IxRadio,
    IxRadioGroup,
    IxSlider,
    IxSpace,
    IxSwitch,
  }
  for (const [name, component] of Object.entries(components)) app.component(name, component)
  app.mount('#app')
}
