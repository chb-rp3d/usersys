import { defineStore } from 'pinia'
import { GetIP } from '@/api/global'
import { BASE_URL } from '@/config/global'

export const useDomainStore = defineStore('domain', {
  state: () => {
    return {
      domain: null
    }
  },
  actions: {
    async fetchInitialDomain() {
      // 第一个接口：获取所在地对应的 domain，之后的接口需要用到
      // 如果携带了region参数，意味着是选择地区后跳转来的，不需要再请求ip（方便测试，现在的ip是随机两个来的，岔开的概率很大，可能出现反复跳转）
      const paramRegion = new URL(location?.href)?.searchParams?.get('region')
      if (!!paramRegion) {
        this.domain = location.hostname
        return
      }

      // 如果没有携带region参数，则是第一次请求ip
      let domain = BASE_URL
      try {
        const { code, data } = await GetIP()
        if (code === 200 && data?.domain) {
          domain = data.domain
          // 这里不需要存储，如果当前域名和得到的域名不一致，并且不是选择国家区域后跳转过来的，则直接跳转到获取的domain
          const location = window?.location || {}
          let { origin = '', pathname, search, hash, protocol = 'https:' } = location
          const newUrl = `${protocol}//${data.domain}${pathname}${search}${hash}`

          if (origin.indexOf(data?.domain) === -1) {
            window.location.href = newUrl
          }
        }
      } catch (error) {
        console.error('Failed to fetch initial domain:', error)
      }
      this.domain = domain
    }
  }
})
