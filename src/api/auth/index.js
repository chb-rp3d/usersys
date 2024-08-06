/**
 * @description: 登录接口、用户信息相关
 */

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'
import { getToken } from '@/utils/methods'
import api from '../../utils/http.js'

const API = {
  GetImgCaptcha: 'user/img-captcha',
  GetEmailCode: 'user/ticket/email',
  RegisterByEmail: 'user/account/register/email',
  LoginByEmail: '/auth/password',
  LoginByToken: '/auth/temporaryToken',
  RefreshToken: '/auth/refreshToken'
}

/**
 * @description: 获取图形验证码
 */
export function GetImgCaptcha() {
  return api.get(API.GetImgCaptcha, { withoutMsg: true })
}

/**
 * @description: 获取邮箱验证码 register-注册，reset_password-重置密码
 */
export function GetEmailCode(params = {}, options = {}) {
  return api.post(API.GetEmailCode, { ...params }, { ...options, withoutMsg: true })
}

/**
 * @description: 获取地区列表(含域名)
 */
export function RegisterByEmail(params = {}, options = {}) {
  return api.post(API.RegisterByEmail, { ...params }, { ...options })
}
/**
 * @description: 邮箱密码登录
 */
export function LoginByEmail(params = {}, options = {}) {
  return api.post(API.LoginByEmail, { ...params }, { ...options })
}
/**
 * @description: 临时凭证登录【用于客户端跳转过来】
 * @params {String} temporaryToken 临时凭证
 */
export function LoginByToken(params = {}, options = {}) {
  return api.post(API.LoginByToken, { ...params }, { ...options })
}

/**
 * @description: 刷新用户令牌: 旧token换新token
 */
export function RefreshToken(params = {}, options = {}) {
  return api.post(API.RefreshToken, { ...params }, { ...options })
}
