import { RefreshToken } from '@/api/auth'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'
import { ElMessage } from 'element-plus'
import { h } from 'vue'

/**
 * @description: 字符串转Base64
 * @param {String} str
 * @returns {String} Base64
 */
export function string2Base64(str) {
  const encoder = new TextEncoder() // 创建一个 TextEncoder 实例
  const data = encoder.encode(str) // 将字符串编码为 Uint8Array
  const binaryString = Array.from(new Uint8Array(data))
    .map((byte) => String.fromCharCode(byte))
    .join('')
  return btoa(binaryString) // 将 Uint8Array 转换为 Base64 字符串
}

export function base64ToString(base64Str) {
  const binaryString = atob(base64Str) // 将 Base64 字符串解码为二进制字符串
  const decoder = new TextDecoder('utf-8') // 创建一个 TextDecoder 实例
  const data = new Uint8Array(binaryString.length) // 创建一个 Uint8Array
  for (let i = 0; i < binaryString.length; i++) {
    data[i] = binaryString.charCodeAt(i) // 将二进制字符串转换为 Uint8Array
  }
  return decoder.decode(data) // 将 Uint8Array 解码为原始文本
}

/**
 * @description: 获取token。过期重刷
 * @param {String} type accessToken | refreshToken
 * @returns {String} 最新的token
 */

export function getToken(type) {
  // 检查 token 是否可用
  try {
    // 获取 token
    // TODO: 过期重试
    if (type === 'refreshToken') {
      const refreshToken = getCookie(REFRESH_TOKEN)
      return refreshToken
    } else {
      const accessToken = getCookie(ACCESS_TOKEN)
      return accessToken
    }
  } catch (error) {
    // 处理可能出现的错误
    console.error('Error getting token from cookie:', error)
    return null
  }
}

/**
 * 设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days 失效时间
 */
export function setCookie(name, value, days = 30) {
  // console.log(`%c>> $`, 'color:yellow', name, value, days)
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
/**
 * 获取Cookie
 * @param {String} name
 * @returns
 */

export function getCookie(name) {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

/**
 * 删除Cookie
 * @param {String} name
 */
export function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

/**
 * 打开toast 弹窗
 * @param {String} name
 */
export const openVn = ({ type = 'warning', msg }) => {
  ElMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, msg)
      // h('i', { style: 'color: teal' }, 'VNode'),
    ]),
    type
  })
}
