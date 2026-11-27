import Basic from './basic.js'
import { use } from 'echarts/core'
import { GraphicComponent } from 'echarts/components'
import './style.css'

// Keep the real packaged-pie component and its native graphics registration,
// without loading the unrelated theme, slots and word-cloud playgrounds.
use([GraphicComponent])
import Vue from 'vue'
import CompositionAPI from '@vue/composition-api'

Vue.use(CompositionAPI)
new Vue(Basic).$mount('#app')
