import { RefreshToken } from '@/api/auth'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'

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

/**
 * @returns {String} 操作系统类型[惰性求值]
 */

export function getOsType() {
  let cachedOsType = null

  return () => {
    if (cachedOsType === null) {
      const userAgent = navigator?.userAgent
      if (userAgent.indexOf('Mac') > -1) {
        return 'Mac'
      } else if (userAgent.indexOf('Windows') > -1) {
        return 'Windows'
      }
      return userAgent || 'Unknown' // 如果不是 Windows 或 Mac，则返回 Unknown
    }
    return cachedOsType
  }
}

/**
 * @description: 获取token。过期重刷
 * @param {String} type accessToken | refreshToken
 * @returns {String} 最新的token
 */

export function getToken(type) {
  if (type) {
    console.log(`%c>> $`, 'color:yellow', '请提供token的类别')
    return
  }
  // 检查 sessionStorage 是否可用
  if (typeof window !== 'undefined' && window?.sessionStorage) {
    try {
      // sessionStorage 获取 token
      // TODO: 过期重试
      if (type === 'refreshToken') {
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN)
        return refreshToken
      } else {
        const accessToken = sessionStorage.getItem(ACCESS_TOKEN)
        return accessToken
      }
    } catch (error) {
      // 处理可能出现的错误
      console.error('Error getting token from sessionStorage:', error)
      return null
    }
  } else {
    // 如果 sessionStorage 不可用，则返回 null
    console.warn('sessionStorage is not available.')
    return null
  }
}
