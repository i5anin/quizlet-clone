import {createApp} from 'vue'
import App from "./App.vue"
import {createNaiveUI} from './plugins/naive'
import {initThemeWatcher} from './app/theme'
import { router } from '@/app/router'

initThemeWatcher()

const app = createApp(App).use(router).mount('#app')
app.use(createNaiveUI())
app.mount('#app')
