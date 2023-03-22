import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// eslint-disable-next-line import/no-unassigned-import
import './charts'

const app = createApp(App)

app.use(router)

app.mount('#app')
