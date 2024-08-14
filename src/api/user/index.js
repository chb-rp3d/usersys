/**
 * @description: 登录接口、用户信息相关
 */
import api from '@/utils/http.js'

const API = {
  GetUserInfo: '/cloud-api/user/info',
  ResetPwd: '/cloud-api/user/password/reset',
  ModifyPwd: '/cloud-api/user/password/modify',
  Unregister: '/cloud-api/user/account/unregister' // 注销
}

/**
 * @description: 获取用户信息
 */
export function GetUserInfo() {
  return api.get(API.GetUserInfo, {
    withoutMsg: true
  })
}
/**
 * @description: 重置密码，忘记密码
 */
export function ResetPwd(params = {}, options = {}) {
  return api.post(
    API.ResetPwd,
    {
      ...params
    },
    {
      ...options
    }
  )
}
/**
 * @description: 修改登录密码
 */
export function ModifyPwd(params = {}, options = {}) {
  return api.post(API.ModifyPwd, { ...params }, { ...options })
}
/**
 * @description: 用户注销
 */
export function Unregister(params = {}) {
  return api.post(API.Unregister, {
    ...params
  })
}
