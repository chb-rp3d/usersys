import { defineStore } from 'pinia'
import { GetIP } from '@/api/global'
import { BASE_URL } from '@/config/global'
import { setBaseURL } from '@/utils/http'

export const useDomainStore = defineStore('domain', {
  state: () => {
    return {
      domain: null
    }
  },
  actions: {
    async fetchInitialDomain() {
      // 第一个接口：获取所在地对应的 domain，之后的接口需要用到
      let domain = BASE_URL
      try {
        const { code, data } = await GetIP()
        // console.log(`%c>> 第一个接口：获取domain`, 'color:yellow', data)
        if (code === 200 && data?.domain) {
          // setBaseURL(data.domain)
          domain = data.domain
        }
      } catch (error) {
        console.error('Failed to fetch initial domain:', error)
      }
      this.domain = domain
    }
  }
})
