import axios from 'axios'
import { ElMessage } from 'element-plus'
import { BASE_URL, PORT } from '@/config/global.js'
import { ERROR_CODE_ENUM } from '@/config/errCodeEnum.js'
import { getOsType, getToken, openVn } from '@/utils/methods.js'

import { ENUM_TEMP_TOKEN_EXPIRE, ENUM_REFRESH_TOKEN_EXPIRE } from '@/config/errCodeEnum'
import { GET_IP_URL } from '@/api/global'

const OS_Type = getOsType()
const instance = axios.create({
  baseURL: BASE_URL, // 后台 API 接口地址
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'x-revo-software': 'Test',
    'x-revo-software-version': '1.0.0',
    'x-revo-os-type': OS_Type, // TODO: getOsType
    'x-revo-os-version': '11'
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
    let requireToken = true
    if (config.requireToken === false) {
      requireToken = false
    }
    if (requireToken) {
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
    const hasSuccess = status === 200 && data && Reflect.has(data, 'code')
    if (hasSuccess) {
      console.log(`响应拦截器~~${config.url}`, 'color:yellow', response, data)
      if (data.code === 200) {
        if (config.url === GET_IP_URL && data.data?.domain) {
          setBaseURL(data.data.domain)
        }
        if (withSuccessMsg === true) {
          openVn({ msg: `${config.url}请求成功`, type: 'success' })
        }
      } else {
        const errMsg = ERROR_CODE_ENUM[data.code]
        if (withFailedMsg === true && errMsg) {
          // token过期重刷
          // 104004	TEMP_TOKEN_EXPIRE	临时token不存在或已过期
          // 104005	REFRESH_TOKEN_EXPIRE	refreshToken不存在或已过期
          // 是否提示
          if ([ENUM_TEMP_TOKEN_EXPIRE, ENUM_REFRESH_TOKEN_EXPIRE].indexOf(data.code) > -1) {
            console.log(`%c>> $`, 'color:yellow', errMsg, '过期重刷')
          }
          console.log(errMsg)
          if (errMsg) {
            openVn({ msg: errMsg, type: 'error' })
          } else {
            console.log(`%c>> $未知错误`, 'color:yellow', config.url)
            openVn({ msg: '未知错误', type: 'error' })
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

// 提供一个方法来设置 baseURL
export function setBaseURL(domain) {
  console.log(`%c>> $`, 'color:yellow', domain)
  // if(domain.indexOf('http') > -1) {
  //   instance.defaults.baseURL = `${domain}`;
  // } else {
  //   instance.defaults.baseURL = `https//:${domain}`;
  // }
}
export default instance
