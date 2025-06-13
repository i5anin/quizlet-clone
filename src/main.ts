import { createApp } from 'vue'
import App from './App.vue'
import { createNaiveUI } from './plugins/naive'
import { initThemeWatcher } from './app/theme'

initThemeWatcher()

const app = createApp(App)
app.use(createNaiveUI())
app.mount('#app')
