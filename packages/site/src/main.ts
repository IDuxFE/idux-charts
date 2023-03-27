import { createApp } from 'vue'

import App from './App.vue'
import { chart } from './charts'
import router from './router'

// eslint-disable-next-line import/no-unassigned-import

const app = createApp(App)

app.use(router).use(chart)

app.mount('#app')
