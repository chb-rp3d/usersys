/**
 * x-revo-os
 * @returns {String} 操作系统类型[惰性求值]
 */

export const getOsType = (() => {
  let cachedOsVersion = null

  const getUserAgent = () => navigator?.userAgent

  const detectOsVersion = (userAgent) => {
    let os = ''
    let osVersion = ''

    if (/Win/.test(userAgent)) {
      os = 'Windows'
      if (/Windows NT 10\.0/.test(userAgent)) {
        osVersion = '10'
      } else if (/Windows NT 6\.3/.test(userAgent)) {
        osVersion = '8.1'
      } else if (/Windows NT 6\.2/.test(userAgent)) {
        osVersion = '8'
      } else if (/Windows NT 6\.1/.test(userAgent)) {
        osVersion = '7'
      } else if (/Windows NT 6\.0/.test(userAgent)) {
        osVersion = 'Vista'
      } else if (/Windows NT 5\.1/.test(userAgent)) {
        osVersion = 'XP'
      }
    } else if (/Mac/.test(userAgent)) {
      os = 'Mac OS'
      if (/Mac OS X 10_15/.test(userAgent)) {
        osVersion = 'Catalina'
      } else if (/Mac OS X 10_14/.test(userAgent)) {
        osVersion = 'Mojave'
      } else if (/Mac OS X 10_13/.test(userAgent)) {
        osVersion = 'High Sierra'
      } else if (/Mac OS X 10_12/.test(userAgent)) {
        osVersion = 'Sierra'
      }
    } else if (/Linux/.test(userAgent)) {
      os = 'Linux'
    } else if (/Android/.test(userAgent)) {
      os = 'Android'
      if (/Android 11/.test(userAgent)) {
        osVersion = '11'
      } else if (/Android 10/.test(userAgent)) {
        osVersion = '10'
      }
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      os = 'iOS'
      if (/OS 15_/.test(userAgent)) {
        osVersion = '15'
      } else if (/OS 14_/.test(userAgent)) {
        osVersion = '14'
      }
    } else {
      os = 'Unknown'
    }

    return {os, osVersion}
  }

  return () => {
    if (!cachedOsVersion) {
      cachedOsVersion = detectOsVersion(getUserAgent())
    }
    return cachedOsVersion
  }
})()