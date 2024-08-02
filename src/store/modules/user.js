import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      userInfo: {
        
      }
    }
  },
  actions: {
    updateUserInfo(data) {
      this.userInfo = data
    }
  }
})
