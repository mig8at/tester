import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import router from './router'
import { createPinia } from 'pinia'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
