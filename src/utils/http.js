import axios from 'axios'
import { deleteCookie, getToken, openVn } from '@/utils/methods.js'
import { getOsType } from '@/utils/sys.js'
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from '@/config/global.js'
import { ENUM_ACCOUNT_FORBIDDEN, ERROR_CODE_ENUM, handleNetworkError } from '@/config/errCodeEnum.js'

import { ENUM_TEMP_TOKEN_EXPIRE, ENUM_REFRESH_TOKEN_EXPIRE } from '@/config/errCodeEnum'
import { GET_IP_URL } from '@/api/global'
import { HASH_LOGIN } from '@/hooks/auth/useLoginForm'
import router from '@/router'

const OS_Type = getOsType()

const instance = axios.create({
  baseURL: BASE_URL, // 后台 API 接口地址
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'x-revo-software': import.meta.env?.VITE_SOFT_NAME,
    'x-revo-software-version': import.meta.env?.VITE_VERSION,
    'x-revo-os-type': OS_Type?.os,
    'x-revo-os-version': OS_Type?.osVersion
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些操作，例如添加请求头、处理请求参数等
    // TODO: 加一个token刷新逻辑

    // 更新baseUrl 【不知道用户哪个区的时候需要，测试环境屏蔽】
    config['__env__'] = import.meta.env
    if (!!config?.__baseURL && !import.meta.env.DEV) {
      config.baseURL = config?.__baseURL
      delete config.__baseURL
    }

    console.log(`%c>> $请求拦截器-${config?.url}`, 'color:yellow', config)
    // 如果需要携带token，则从本地存储中获取token并添加到请求头中
    if (config.requireToken !== false) {
      const token = getToken()
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 相应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理，例如解析数据、处理应状态码等
    // 正确和错误分别怎么处理，超时提示等
    const { config = {}, status, statusText, data } = response
    // * 提示信息
    const { withFailedMsg = false, withSuccessMsg } = config
    // 请求成功（与后端通信成功，但接口逻辑不一定正确，分别处理） && statusText === 'OK' ？？？
    console.log(`%c>> 响应拦截器~~${config.url}`, 'color:yellow', response, data)
    const hasSuccess = status === 200 && data && Reflect.has(data, 'code')
    if (hasSuccess) {
      if (data.code === 200) {
        if (withSuccessMsg === true) {
          openVn({ msg: `${config.url}请求成功`, type: 'success' })
        }
      } else {
        const errMsg = handleNetworkError(data.code)
        // 104002 ACCOUNT_FORBIDDEN	此账号已被禁用 [清除登录状态，跳转登录]
        if([ENUM_ACCOUNT_FORBIDDEN].indexOf(data.code) > -1) {
          router.replace(`/login#${HASH_LOGIN}`)
          // 清除cookie
          deleteCookie(ACCESS_TOKEN)
          deleteCookie(REFRESH_TOKEN)
        }
        if (withFailedMsg === true) {
          // token过期重刷
          // 104004	TEMP_TOKEN_EXPIRE	临时token不存在或已过期
          // 104005	REFRESH_TOKEN_EXPIRE	refreshToken不存在或已过期
          // 是否提示
          if ([ENUM_TEMP_TOKEN_EXPIRE, ENUM_REFRESH_TOKEN_EXPIRE].indexOf(data.code) > -1) {
            console.log(`%c>> $`, 'color:yellow', errMsg, '过期重刷')
          }
          if (errMsg) {
            openVn({ msg: errMsg, type: 'error' })
          } else {
            console.log(`%c>> $未知错误`, 'color:yellow', config.url)
            openVn({ msg: handleNetworkError('unknown'), type: 'error' })
          }
        }
      }
    } else {
      console.log(`%c>> $ 响应拦截器-有错的时候`, 'color:yellow', response)
    }
    return response.data
  },
  (error) => {
    console.log(`响应拦截器错误处理`, 'color:yellow', error)
    // 处理响应错误
    return Promise.reject(error)
  }
)

export default instance
