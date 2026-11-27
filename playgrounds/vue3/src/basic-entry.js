import Basic from './basic.js'
import { use } from 'echarts/core'
import { GraphicComponent } from 'echarts/components'
import './style.css'

// Keep the real packaged-pie component and its native graphics registration,
// without loading the unrelated theme, slots and word-cloud playgrounds.
use([GraphicComponent])
import { createApp } from 'vue'

createApp(Basic).mount('#app')
