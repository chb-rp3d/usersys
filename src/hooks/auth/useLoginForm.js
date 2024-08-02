/**
 * 登录注册hooks
 */

import { reactive, ref, onMounted } from 'vue'
import { GetImgCaptcha, GetEmailCode, RegisterByEmail } from '@/api/auth/index.js'
import { string2Base64 } from '@/utils/methods'

const useLoginForm = () => {
  // login | register | forgetPwd
  const formType = ref('forgetPwd')
  // 切换表单类型
  const handleFormType = (type) => {
    formType.value = type
  }

  // ************* 图形验证码
  const imgCaptcha = reactive({
    captchaId: '',
    imgUrl: ''
  })
  // 获取图形验证码
  const getImgCaptchaUrl = async () => {
    const { code, data } = await GetImgCaptcha()
    imgCaptcha.captchaId = data.captchaId
    imgCaptcha.imgUrl = data.content
  }

  // ************* 获取邮箱验证码
  // 获取邮箱验证码
  const handleGetEmailCode = async (params) => {
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
  const submitForm = async (formEl, callback) => {
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
  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }

  return { formType, handleFormType, imgCaptcha, getImgCaptchaUrl, handleGetEmailCode, submitForm, resetForm }
}

export default useLoginForm
