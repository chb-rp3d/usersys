/**
 * @description: 全局、通用接口
 */
import api from '../../utils/http.js'

const API = {
  GetIP: 'global/domain/ip',
  GetArea: 'global/area/',
  GetEmailDomain: 'global/domain/email' // 获取邮箱-域名对应关系
}

export const GET_IP_URL = API.GetIP

/**
 * @description: 获取地区列表(含域名) locale
 */
export function GetArea(locale = 'en_US') {
  return api.get(API.GetArea, {
    params: { locale },
    withoutMsg: true
  })
}

/**
 * @description: 获取IP
 */
export function GetIP() {
  return api.get(API.GetIP, { withoutMsg: true })
}

/**
 * @description: 获取邮箱-域名对应关系
 */
export function GetEmailDomain(params = {}) {
  return api.post(API.GetEmailDomain, { ...params }, { withoutMsg: true })
}
