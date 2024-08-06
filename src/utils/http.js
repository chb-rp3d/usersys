import axios from 'axios'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { BASE_URL, PORT } from '@/config/global.js'
import { ERROR_CODE_ENUM } from '@/config/errCodeEnum.js'
import { getOsType, getToken } from '@/utils/methods.js'

import { ENUM_TEMP_TOKEN_EXPIRE, ENUM_REFRESH_TOKEN_EXPIRE } from '@/config/errCodeEnum'

const openVn = ({ type, msg }) => {
  ElMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, msg)
      // h('i', { style: 'color: teal' }, 'VNode'),
    ]),
    type: 'warning'
  })
}

const instance = axios.create({
  baseURL: BASE_URL, // 后台 API 接口地址
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'x-revo-software': 'Test',
    'x-revo-software-version': '1.0.0',
    'x-revo-os-type': 'Windows',
    'x-revo-os-version': '11'
  }
})

instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些操作，例如添加请求头、处理请求参数等
    // TODO: 加一个token刷新逻辑
    console.log(`%c>> $请求拦截器`, 'color:yellow', config)
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

instance.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理，例如解析数据、处理应状态码等
    // 正确和错误分别怎么处理，超时提示等
    const { config = {}, status, statusText, data } = response
    // * 默认提示错误信息
    const { withoutMsg, msgType = 'warnning' } = config
    // 请求成功（与后端通信成功，但接口逻辑不一定正确，分别处理）
    const hasSuccess = status === 200 && statusText === 'OK' && data && Reflect.has(data, 'code')
    if (hasSuccess) {
      console.log(`响应拦截器错误码整理`, 'color:yellow', response)
      if (data.code != 200) {
        const errMsg = ERROR_CODE_ENUM[data.code]
        if (!withoutMsg && errMsg) {
          console.log(errMsg)
          openVn({ msg: errMsg, msgType })
        }
      } else {
        // token过期重刷
        if ([ENUM_TEMP_TOKEN_EXPIRE, ENUM_REFRESH_TOKEN_EXPIRE].indexOf(data.code) > -1) {
        }
        // 104004	TEMP_TOKEN_EXPIRE	临时token不存在或已过期
        // 104005	REFRESH_TOKEN_EXPIRE	refreshToken不存在或已过期
        // 是否提示
        if (!withoutMsg) {
          openVn({ msg: data.msg || '未知错误', msgType })
        }
      }
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
