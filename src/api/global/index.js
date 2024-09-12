/**
 * @description: 全局、通用接口
 */
import api from '@/utils/http.js'

const API = {
  GetIP: '/cloud-api/global/domain/ip',
  GetArea: '/cloud-api/global/area/',
  GetEmailDomain: '/cloud-api/global/domain/email' // 获取邮箱-域名对应关系
}

export const GET_IP_URL = API.GetIP

/**
 * @description: 获取地区列表(含域名) locale TODO: 需要知道最终部署的域名
 */
export function GetArea(locale = 'en_US') {
  return api.get(API.GetArea, {
    params: { locale },
    requireToken: false
  })
}

/**
 * @description: 获取IP
 */
export function GetIP() {
  return api.get(API.GetIP, { requireToken: false })
}

/**
 * @description: 获取邮箱-域名对应关系。不知道用户是哪个区的时候，才需要调这个接口，如登录、重置密码
 */
export function GetEmailDomain(email, options={}) {
  return api.post(API.GetEmailDomain, { email }, { ...options, requireToken: false })
}
