import { createApp } from 'vue'
import App from './App.vue'
import config from './config'

createApp(App)
    .use(config)
    .mount('#app')
