/**
 * @description: 全局、通用接口
 */
import api from '../../utils/http.js'

const API = {
  GetArea: 'global/area/',
}

/**
 * @description: 获取地区列表(含域名)
 */
export function GetArea() {
  return api.get(API.GetArea)
}
