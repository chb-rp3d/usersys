/**
 * @description: 多语言国际化
 */
import { createI18n } from 'vue-i18n'

import ZH_CN from './locales/zh_CN'
import ZH_TW from './locales/zh_TW'
import EN_US from './locales/en_US'

import FR_FR from './locales/fr_FR'
import DE_DE from './locales/de_DE'
import IT_IT from './locales/it_IT'
import ES_ES from './locales/es_ES'
import JA from './locales/ja'
import KO_KR from './locales/ko_KR'
import RU_RU from './locales/ru_RU'
import PT_BR from './locales/pt_BR'
import TR_TR from './locales/tr_TR'

import { langEnum } from '@/config/global'
// TODO: 自动模块化化引入
// const modules = import.meta.glob('./locales/*.js')

const messages = {
  en: EN_US,
  [langEnum.ZH_CN]: ZH_CN,
  [langEnum.ZH_TW]: ZH_TW,
  [langEnum.EN_US]: EN_US,

  [langEnum.FR_FR]: FR_FR,
  [langEnum.DE_DE]: DE_DE,
  [langEnum.IT_IT]: IT_IT,
  [langEnum.ES_ES]: ES_ES,
  [langEnum.JA]: JA,
  [langEnum.KO_KR]: KO_KR,
  [langEnum.RU_RU]: RU_RU,
  [langEnum.PT_BR]: PT_BR,
  [langEnum.TR_TR]: TR_TR,
}
const i18n = createI18n({
  legacy: false, // 依赖于 Composition API，为 ES2015+ 设计
  // globalInjection: true,
  // fallbackLocale: langEnum.EN_US, // 设置回退语言
  locale: langEnum.EN_US,
  messages
})

export function $t(...args) {
  return i18n.global.t(...args)
}
export default i18n
