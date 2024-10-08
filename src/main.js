import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import ElementPlus from 'element-plus' // TODO: 按需引用
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
// vite配置了，不用重复引用
// import '@/assets/styles/light.scss'
// import '@/assets/styles/dark.scss' 

import router from '@/router/index'
import vueI18n from '@/language/index' 

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/store/index'
import { useDomainStore } from '@/store/modules/domain'
import { useGlobalStore } from '@/store/modules/global'
import '@/assets/styles/global.css'
import { parseNavigatorLanguage } from './config/global'
import handleImport from './lib/element-plus'

const app = createApp(App)

// 设置默认黑暗模式
document.documentElement.classList.remove('dark');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.use(vueI18n).use(store).use(router).use(ElementPlus).mount('#app')
app.use(vueI18n).use(store).use(router)
handleImport(app).mount('#app')

// 获取系统语言
const sysLang = parseNavigatorLanguage()
useGlobalStore().toggleLang(sysLang)

// 初始获取domain
const domainStore = useDomainStore()
domainStore.fetchInitialDomain()
