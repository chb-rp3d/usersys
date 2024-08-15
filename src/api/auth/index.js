/**
 * @description: 登录接口、用户信息相关
 */

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'
import { getToken, openVn } from '@/utils/methods'
import api from '@/utils/http.js'
import { GetEmailDomain } from '../global/index.js'
import { ERROR_CODE_ENUM } from '@/config/errCodeEnum.js'

const API = {
  GetImgCaptcha: '/cloud-api/user/img-captcha',
  GetEmailCode: '/cloud-api/user/ticket/email',
  RegisterByEmail: '/cloud-api/user/account/register/email',
  LoginByEmail: '/cloud-api/auth/password',
  LoginByToken: '/cloud-api/auth/temporaryToken',
  RefreshToken: '/cloud-api/auth/refreshToken'
}

/**
 * @description: 获取图形验证码
 */
export function GetImgCaptcha() {
  return api.get(API.GetImgCaptcha, { params: { t: Date.now() }, withoutMsg: true, requireToken: false })
}

/**
 * @description: 获取邮箱验证码 register-注册，reset_password-重置密码
 */
export function GetEmailCode(params = {}, options = {}) {
  return api.post(API.GetEmailCode, { ...params }, { ...options, withoutMsg: true, requireToken: false })
}

/**
 * @description: 用户注册
 */
export function RegisterByEmail(params = {}, options = {}) {
  return api.post(API.RegisterByEmail, { ...params }, { ...options, requireToken: false })
}
/**
 * @description: 邮箱密码登录 [先获取 domain]
 */
export async function LoginByEmail(params = {}, options = {}) {
  try {
    const { code, data } = await GetEmailDomain(params.email, { withFailedMsg: true, requireToken: false })
    if (code === 200 && !!data) {
      return api.post(API.LoginByEmail, { ...params }, { ...options, __baseURL: `https://${data.domain}` })
    } else {
      // const errMsg = ERROR_CODE_ENUM[code]
      // if (errMsg) {
      //   openVn({ msg: errMsg, type: 'error' })
      // } 登录账号错误会出现两次提示
      return { code }
    }
  } catch (error) {
    console.log(error)
  }
}
/**
 * @description: 临时凭证登录【用于客户端跳转过来】
 * @params {String} temporaryToken 临时凭证
 */
export function LoginByToken(params = {}, options = {}) {
  return api.post(API.LoginByToken, { ...params }, { ...options, requireToken: false })
}

/**
 * @description: 刷新用户令牌: 旧token换新token
 */
export function RefreshToken(params = {}, options = {}) {
  return api.post(API.RefreshToken, { ...params }, { ...options, requireToken: false })
}
