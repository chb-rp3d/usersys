import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  actions: {
    updateUserInfo(data) {
      this.userInfo = data
    },
    toggleLoginStatus(data) {
      this.isLogin = data
    },
  }
})
