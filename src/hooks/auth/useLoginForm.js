/**
 * 登录注册hooks
 */

import { reactive, ref, onMounted, watch } from 'vue'
import router from '@/router'
// import { useRouter, useRoute } from 'vue-router'
import { GetImgCaptcha, GetEmailCode, RegisterByEmail, LoginByToken, RefreshToken } from '@/api/auth'
import { Unregister } from '@/api/user'
import { GetArea } from '@/api/global'
import { string2Base64, deleteCookie, getCookie, setCookie } from '@/utils/methods'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'

export const HASH_LOGIN = 'login'
export const HASH_REGISTER = 'register'
export const HASH_FORGET_PWD = 'forgetPwd'
import { useDomainStore } from '@/store/modules/domain'
import { useUserStore } from '@/store/modules/user'

// login | register | forgetPwd
export const formType = ref(HASH_REGISTER)

export const handleHashChange = (hash) => {
  router.push(`/login#${hash}`)
}

export function useLoginFormSetup() {
  const domainStore = useDomainStore()
  onMounted(() => {
    // 初始化时根据 hash 设置当前表单
    formType.value = getFormFromHash(router.currentRoute.value.hash)
  })

  watch(
    [() => router.currentRoute.value.hash, () => domainStore.domain],
    ([newHash, newDomain]) => {
      // 监听路由变化，更新当前表单
      console.log(`%c>> newHash, newDomain`, 'color:yellow', newHash, newDomain)
      if (newDomain) {
        formType.value = getFormFromHash(newHash)
        if (newHash === `#${HASH_REGISTER}` && AreaOptions.value.length === 0) {
          getGetArea()
        }
        if (['#register', '#forgetPwd'].indexOf(newHash) > -1) {
          getImgCaptchaUrl()
        }
      }
    },
    {
      immediate: true
    }
  )
}

const getFormFromHash = (hash) => {
  switch (hash) {
    case '#register':
      return HASH_REGISTER
    case '#forgetPwd':
      return HASH_FORGET_PWD
    case '#login':
    default:
      return HASH_LOGIN
  }
}

// 切换表单类型
export const handleFormType = (type) => {
  formType.value = type
  handleHashChange(type)
}

// 地区
export const AreaOptions = ref([])
// 获取地区选项
const getGetArea = async () => {
  // 有则不用重复请求
  if (Object.keys(AreaOptions.value)?.length > 0) {
    return
  }
  const { data } = await GetArea()
  console.log(`GetArea`, data)
  AreaOptions.value = data
}

// ************* 图形验证码
// 获取图形验证码
export const imgCaptcha = reactive({
  captchaId: '',
  imgUrl: ''
})
export const getImgCaptchaUrl = async () => {
  const { code, data } = await GetImgCaptcha()
  imgCaptcha.captchaId = data.captchaId
  imgCaptcha.imgUrl = data.content
}
// ************* 获取邮箱验证码
// 获取邮箱验证码
export const handleGetEmailCode = async (params) => {
  const res = GetEmailCode(params)
  console.log(`%c>> $ GetEmailCode`, 'color:yellow', res)
}

// **************
// 定义校验函数
/**
 *
 * @param {Element} formEl 要校验的表单元素ref
 * @param {Function} callback 校验通过后的回调
 * @returns
 */
export const submitForm = async (formEl, callback) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      callback()
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 重置表单
export const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

export function cacheUserNameAndPwd(data) {
  setCookie('userInfo', JSON.stringify(data))
}

export function getCacheUserNameAndPwd() {
  const cookie_userInfo = getCookie('userInfo')
  return cookie_userInfo ? JSON.parse(cookie_userInfo) : null
}

export function setLoginCache(dataToken) {
  const domainStore = useUserStore()
  setCookie(ACCESS_TOKEN, dataToken.accessToken)
  setCookie(REFRESH_TOKEN, dataToken.refreshToken)
  domainStore.toggleLoginStatus(true)
}

// 用token登录
export const useLoginByToken = async (temporaryToken) => {
  const { code, data } = await LoginByToken({ temporaryToken })
  if (code === 200 && data) {
    setLoginCache(data)
    return 'success'
    // ElMessage({
    //   type: 'success',
    //   message: '登录成功'
    // })
  }
}

// 刷新token
export const useRefreshToken = async () => {
  const refreshToken = getToken(REFRESH_TOKEN)
  const { code, data } = await RefreshToken({
    refreshToken
  })
  if (code === 200 && data) {
    // setCookie(ACCESS_TOKEN, data)
  }
}

// 注销登录
export const handleDeleteAccountConform = async (pwd) => {
  const { code } = await Unregister({
    password: string2Base64(pwd)
  })
  if (code === 200) {
    // 注销成功 + 跳转【注册】
    router.replace(`/login#${HASH_REGISTER}`)
    // 清除cookie
    deleteCookie(ACCESS_TOKEN)
    deleteCookie(REFRESH_TOKEN)

    ElMessage({
      type: 'success',
      message: `注销成功`
    })
  }
}
