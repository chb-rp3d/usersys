import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus' // TODO: 按需引用
import 'element-plus/dist/index.css'

import router from './router/index'
import vueI18n from './language/index'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(vueI18n).use(store).use(router).use(ElementPlus).mount('#app')
