<template>
  <el-form :model="registerForm" ref="RegisterFormRef" :rules="rulesRegisterForm" style="padding: 30px">
    <h5>
      {{ $t('login.has_account') }}
      <span @click="() => emit('change-form-type', 'login')" style="color: blue; cursor: pointer">{{
        $t('login.btn__login')
      }}</span>
    </h5>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <ElDivider />

    <el-form-item :label="$t('login.label__region')" required prop="areaCode">
      <el-select v-model="registerForm.areaCode" :placeholder="$t('login.placeholder__region')">
        <el-option v-for="item in AreaOptions" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
      </el-select>
      <div style="color: red">{{ $t('login.tip__region') }}</div>
    </el-form-item>
    <el-form-item :label="$t('login.label__email')" required prop="email">
      <el-input v-model="registerForm.email" type="email" />
    </el-form-item>
    <el-form-item :label="$t('login.label__password')" required prop="password">
      <el-input v-model="registerForm.password" type="password" show-password />
    </el-form-item>
    <el-form-item :label="$t('login.label__email_code')" required prop="ticketCode" class="el-form-item__nowrap">
      <el-input v-model="registerForm.ticketCode" type="ticketCode" />
      <el-button @click="_handleGetEmailCode"> {{ $t('login.btn__email_code') }} </el-button>
    </el-form-item>
    <el-form-item>
      <el-button link type="primary" @click="_handleGetEmailCode">{{ $t('login.tip__email_code_miss') }}
        TODO：倒计时disable！！
      </el-button>
    </el-form-item>

    <el-form-item :label="$t('login.label__img_code')" required prop="captchaCode" class="el-form-item__nowrap">
      <el-input v-model="registerForm.captchaCode" />
      <div class="img-captcha-wrap" @click="getImgCaptchaUrl">
        <!-- <el-skeleton-item variant="image" style="width: 100px; height: 40px" /> -->
        <el-skeleton-item v-if="!imgCaptcha.imgUrl" variant="h3" style="width: 100px" />
        <img v-else :src="imgCaptcha.imgUrl" :alt="$t('login.label__img_code')" />
      </div>
    </el-form-item>

    <el-form-item>
      <div style="display: flex; justify-content: space-evenly; width: 100%">
        <el-button type="primary" @click="submitForm(RegisterFormRef, handleRegisterByEmail)">{{
          $t('login.btn__register_now')
        }}</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElDivider, ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { string2Base64, setCookie } from '@/utils/methods'

import { RegisterByEmail } from '@/api/auth'
import { REG_EMAIL, REG_PWD } from '@/config/reg'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'

import { AreaOptions, imgCaptcha, getImgCaptchaUrl, handleGetEmailCode, submitForm } from '@/hooks/auth/useLoginForm'
const { t } = useI18n()

const emit = defineEmits(['change-form-type']);

// 获取loginForm的实例
const RegisterFormRef = ref()
// 注册表单
const registerForm = reactive({
  email: '',
  password: '',
  ticketCode: '',
  areaCode: '',
  captchaCode: ''
})
// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const rulesRegisterForm = reactive({
  areaCode: [{ required: true, message: '请选择地区', trigger: 'blur' }],
  email: {
    validator: (rule, value, callback) => {
      // console.log(`%c>> $`, 'color:yellow', rule, value)
      // 定义正则表达式
      if (!REG_EMAIL.test(value)) {
        callback(new Error(t('login.valid__email_format')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
  password: {
    validator: (rule, value, callback) => {
      // console.log(`%c>> $`, 'color:yellow', rule, value)
      // 定义正则表达式
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.tip__password')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
  ticketCode: [
    { required: true, message: t('login.tip__empty', [t('login.label__email_code')]), trigger: 'blur' },
    { min: 6, max: 6, message: t('login.valid__ticket_length_6'), trigger: 'blur' }
  ],
  captchaCode: [{ required: true, message: t('login.tip__empty', [t('login.label__img_code')]), trigger: 'blur' }]
})

// 通过邮箱注册
const handleRegisterByEmail = async () => {
  const { email, password, ticketCode, areaCode, captchaCode } = registerForm
  const params = {
    email: string2Base64(email),
    password: string2Base64(password),
    ticketCode,
    areaCode,
    captchaId: imgCaptcha.captchaId,
    captchaCode
  }

  // 找到 domain
  const selectedRegion = AreaOptions.value.find(item => item.areaCode === areaCode)
  let options = { msgType: 'success' }
  if (selectedRegion?.domain) {
    options['_baseURL'] = `https://${selectedRegion.domain}`
  }
  console.log(`%c>> $`, 'color:yellow', selectedRegion)

  const { code, data } = await RegisterByEmail(params, options)
  console.log(`%c>> $ res`, 'color:yellow', data)

  if (code === 200 && data) {
    setCookie(ACCESS_TOKEN, data.accessToken)
    setCookie(REFRESH_TOKEN, data.refreshToken)
    // setLoginCache(data)
    // TODO: 直接登录还是重新输密码登录
    ElMessage({
      showClose: true,
      message: t('login.toast__register_success'),
      type: 'success'
    })
    router.replace('/index')
  } else {
    // ElMessage({
    //   showClose: true,
    //   message: '账号密码错误',
    //   type: 'error'
    // })
  }
}

const _handleGetEmailCode = async () => {
  const params = {
    email: string2Base64(registerForm.email),
    locale: registerForm.areaCode,
    action: 'register'
  }
  handleGetEmailCode(params)
}

</script>

<style scoped></style>
