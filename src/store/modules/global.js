/**
 * 全局状态
 */
import { defineStore } from 'pinia'
import i18n from '@/language/index'
import { langEnum, USER_POLICY_EN, USER_POLICY_CN, PRIVACY_POLICY_EN, PRIVACY_POLICY_CN } from '@/config/global'
import { GetArea } from '@/api/global'
import { useDomainStore } from './domain'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      lang: langEnum.EN_US, // 国际化语言
      globalArea: [] // 全球地区，登录需要 - 登录后也需要展示用户信息
    }
  },
  actions: {
    toggleLang(lang) {
      // TODO: 校验所选语言
      // 第一个接口：获取所在地对应的 domain，之后的接口需要用到
      this.lang = lang
      i18n.global.locale.value = lang
    },
    async getGlobalArea() {
      try {
        const domain = useDomainStore()?.domain
        const local = domain?.indexOf('.cn.') > -1 ? langEnum.ZH_CN : langEnum.EN_US
        const { code, data } = await GetArea(local)
        if (code === 200 && data) {
          this.globalArea = data
        }
        return data
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    USER_POLICY: (state) => {
      if (state.lang.indexOf('zh') > -1) {
        return USER_POLICY_CN
      } else {
        return USER_POLICY_EN
      }
    },
    PRIVACY_POLICY: (state) => {
      if (state.lang.indexOf('zh') > -1) {
        return PRIVACY_POLICY_CN
      } else {
        return PRIVACY_POLICY_EN
      }
    }
  }
})
