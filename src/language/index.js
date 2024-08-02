/**
 * @description: 多语言国际化
 */
import { createI18n } from 'vue-i18n'

import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const messages = {
  'zh-cn': zhCN,
  'en-us': enUS
}
const i18n = createI18n({
  legacy: false, // 依赖于 Composition API，为 ES2015+ 设计
  // globalInjection: true,
  fallbackLocale: 'en', // 设置回退语言
  locale: 'zh-cn',
  messages
})

export default i18n
