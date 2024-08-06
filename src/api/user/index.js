/**
 * @description: 登录接口、用户信息相关
 */
import api from '../../utils/http.js'

const API = {
  GetUserInfo: '/user/info',
  ResetPwd: '/user/password/reset',
  ModifyPwd: '/user/password/modify',
  Unregister: '/user/account/unregister' // 注销
}

/**
 * @description: 获取用户信息
 */
export function GetUserInfo() {
  return api.get(API.GetUserInfo, {
    // requireToken: true,
    withoutMsg: true
    // aaa: true,
    // msgType: true
  })
}
/**
 * @description: 重置密码，忘记密码
 */
export function ResetPwd(params = {}) {
  return api.post(
    API.ResetPwd,
    {
      ...params
    },
    {
      requireToken: true,
      aaa: true
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
