/**
 * @description: 登录接口、用户信息相关
 */
import api from '@/utils/http.js'

const API = {
  GetUserInfo: '/cloud-api/user/info',
  ResetPwd: '/cloud-api/user/password/reset',
  ModifyPwd: '/cloud-api/user/password/modify',
  // GetTemporaryTokenForUserCenter: '/cloud-api/user/account/temporaryToken', // [客户端用，文本用不上]生成用户进入个人中心的临时Token
  Unregister: '/cloud-api/user/account/unregister' // 注销
}

/**
 * @description: 获取用户信息
 */
export function GetUserInfo() {
  return api.get(API.GetUserInfo)
}
/**
 * @description: 重置密码，忘记密码
 */
export function ResetPwd(params = {}, options = {}) {
  return api.post(API.ResetPwd, { ...params }, { ...options, requireToken: false })
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
  return api.post(API.Unregister, { ...params })
}
