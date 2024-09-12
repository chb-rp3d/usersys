/**
 * @description 全局配置
 */

import { getCookie } from '@/utils/methods'

// 端口号，测试-10006 TODO: 文档中
// http://us-a.chickfrp.com:10006   http://39.105.147.247:20000
// 中国：prod-admin.cn.chishine3d.com
// 美国：prod-admin.us.chishine3d.com
// 德国/欧盟：prod-admin.eu.chishine3d.com
// 统一服务：prod-admin.common.chishine3d.com
// https://test-admin.chishine3d.com
// http://192.168.5.46
export const BASE_URL = ''

// 端口号，测试-10006
export const PORT = '10006'

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

// 用户协议
export const USER_POLICY_EN = 'https://www.revopoint3d.com/pages/user-agreement' // 英文链接
export const USER_POLICY_CN = 'https://www.revopoint3d.com.cn/user-agreement/' // 中文链接

// 隐私政策
export const PRIVACY_POLICY_EN = 'https://www.revopoint3d.com/pages/revoscan-privacy-policy' // 英文链接
export const PRIVACY_POLICY_CN = 'https://www.revopoint3d.com.cn/privacy-policy/' // 中文链接

// 语言枚举
export const langEnum = {
  EN_US: 'en_US',
  ZH_CN: 'zh_CN',
  ZH_TW: 'zh_TW',

  FR_FR: 'fr_FR',
  DE_DE: 'de_DE',
  IT_IT: 'it_IT',
  ES_ES: 'es_ES',
  KO_KR: 'ko_KR',
  RU_RU: 'ru_RU',
  PT_BR: 'pt_BR',
  TR_TR: 'tr_TR',
  JA: 'ja'
}
// 语言选择
export const langOptions = {
  EN_US: {
    key: 'en_US',
    name: 'English'
  },
  ZH_CN: {
    key: 'zh_CN',
    name: '中文简体'
  },
  ZH_TW: {
    key: 'zh_TW',
    name: '中文繁體'
  },

  FR_FR: {
    key: 'fr_FR',
    name: 'Français'
  },
  DE_DE: {
    key: 'de_DE',
    name: 'Deutsch'
  },
  IT_IT: {
    key: 'it_IT',
    name: 'Italiano'
  },
  ES_ES: {
    key: 'es_ES',
    name: 'español'
  },
  KO_KR: {
    key: 'ko_KR',
    name: '한국인'
  },
  RU_RU: {
    key: 'ru_RU',
    name: 'Русский'
  },
  PT_BR: {
    key: 'pt_BR',
    name: 'Português (Brasil)'
  },
  TR_TR: {
    key: 'tr_TR',
    name: 'Türkçe'
  },
  JA: {
    key: 'ja',
    name: '日本語'
  }
}

// 解析浏览器语言 [一个用户请求只需要解析一次] 有cookie 优先返回cookie
export function parseNavigatorLanguage() {
  try {
    if (getCookie('SYS_LANG') && Object.values(langEnum).includes(getCookie('SYS_LANG'))) {
      return getCookie('SYS_LANG')
    }
    const navigatorLanguage = navigator.language || navigator.userLanguage // 获取系统的首选语言
    const languages = Object.values(langEnum) // 获取所有可能的语言配置

    // 找到匹配的语言(TODO: 碰到特殊的再补充)
    for (let i = 0; i < languages.length; i++) {
      const language = languages[i]

      // 将枚举中的语言与系统语言进行比较
      if (language.toLowerCase() === navigatorLanguage.toLowerCase().replace(/-/g, '_')) {
        // console.log(`%c>> $navigatorLanguage11`, 'color:yellow', language, navigatorLanguage)
        return language
      }

      // 特殊处理：对于 'ja'，因为它是唯一没有地区代码的语言
      if (language === 'ja' && navigatorLanguage.startsWith('ja')) {
        return 'ja'
      }

      // 如果枚举中的语言只有地区代码，而系统语言有语言和地区的组合
      if (language.endsWith('_CN') && navigatorLanguage.startsWith('zh-CN')) {
        return 'zh_CN'
      }
      if (language.endsWith('_TW') && navigatorLanguage.startsWith('zh-TW')) {
        return 'zh_TW'
      }
    }

    // 如果没有找到匹配项，则返回默认语言
    return langEnum.EN_US // 或者选择其他默认语言
  } catch (error) {
    console.log(error)
    return langEnum.EN_US
  }
}
