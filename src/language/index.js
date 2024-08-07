/**
 * @description: 多语言国际化
 */
import { createI18n } from 'vue-i18n'
langEnum

import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import { langEnum } from '@/config/global'

const messages = {
  [langEnum.ZH_CN]: zhCN,
  en: enUS,
  [langEnum.EN_US]: enUS
}
const i18n = createI18n({
  legacy: false, // 依赖于 Composition API，为 ES2015+ 设计
  // globalInjection: true,
  // fallbackLocale: langEnum.EN_US, // 设置回退语言
  locale: langEnum.ZH_CN,
  messages
})

export default i18n
