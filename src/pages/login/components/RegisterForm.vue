<template>
  <el-form :model="registerForm" ref="RegisterFormRef" :rules="rulesRegisterForm" style="padding: 30px">
    <h5>
      {{ $t('login.register.has_account') }}
      <span @click="() => handleFormType('login')" style="color: blue; cursor: pointer">{{
        $t('login.common.btn_login')
      }}</span>
    </h5>
    <ElDivider />

    <el-form-item :label="$t('login.common.label_region')" required prop="areaCode">
      <el-select v-model="registerForm.areaCode" placeholder="选地区">
        <el-option v-for="item in AreaOptions" :key="item.areaCode" :label="item.areaName" :value="item.areaCode" />
      </el-select>
      <div style="color: red">{{ $t('login.register.tip_region') }}</div>
    </el-form-item>
    <el-form-item :label="$t('login.common.label_email')" required prop="email">
      <el-input v-model="registerForm.email" type="email" />
    </el-form-item>
    <el-form-item :label="$t('login.common.label_password')" required prop="password">
      <el-input v-model="registerForm.password" type="password" show-password />
    </el-form-item>
    <el-form-item :label="$t('login.common.label_email_code')" required prop="ticketCode" class="el-form-item__nowrap">
      <el-input v-model="registerForm.ticketCode" type="ticketCode" />
      <el-button @click="_handleGetEmailCode"> {{ $t('login.common.btn_email_code') }} </el-button>
    </el-form-item>
    <el-form-item>
      <el-button link type="primary" @click="_handleGetEmailCode">{{ $t('login.common.tip_email_code_miss') }}
        倒计时disable！！TODO
      </el-button>
    </el-form-item>

    <el-form-item :label="$t('login.common.label_img_code')" required prop="captchaCode" class="el-form-item__nowrap">
      <el-input v-model="registerForm.captchaCode" />
      <div style="cursor: pointer;" @click="getImgCaptchaUrl"><img :src="imgCaptcha.imgUrl" :alt="$t('login.common.label_img_code')" /></div>
    </el-form-item>

    <el-form-item>
      <div style="display: flex; justify-content: space-evenly; width: 100%">
        <el-button type="primary" @click="submitForm(RegisterFormRef, handleRegisterByEmail)">{{
          $t('login.common.btn_register_now')
        }}</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElDivider, ElMessage } from 'element-plus'
import router from '@/router'
import { string2Base64 } from '@/utils/methods'

import { GetArea } from '@/api/global/index.js'
import { RegisterByEmail } from '@/api/auth/index.js'
import { REG_EMAIL, REG_PWD } from '@/config/reg'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'

import useLoginForm from '@/hooks/auth/useLoginForm'
const { imgCaptcha, handleFormType, getImgCaptchaUrl, handleGetEmailCode, submitForm } = useLoginForm()

// 获取loginForm的实例
const RegisterFormRef = ref()
// 注册表单
const registerForm = reactive({
  email: 'chenhaibin@revopoint3d.com',
  password: 'Aa123456',
  ticketCode: '',
  areaCode: 'CN',
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
        callback(new Error('邮箱格式不正确'))
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
        callback(new Error('密码必须是8-16位至少两种字符类型（大写字母、小写字母、数字'))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
  ticketCode: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
  imgCod: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
})

// 地区
const AreaOptions = ref([])
// 获取地区选项
const getGetArea = async () => {
  const { data } = await GetArea()
  console.log(`GetArea`, data)
  AreaOptions.value = data
}

// 通过邮箱注册
const handleRegisterByEmail = async () => {
  const { email, password, ticketCode, areaCode, captchaCode } = form
  const params = {
    email: string2Base64(email),
    password: string2Base64(password),
    ticketCode,
    areaCode,
    captchaId: imgCaptcha.captchaId,
    captchaCode
  }
  const { code, data } = await RegisterByEmail(params)
  console.log(`%c>> $ res`, 'color:yellow', res)

  if (code === 200 && data) {
    sessionStorage.setItem(ACCESS_TOKEN, data.accessToken)
    sessionStorage.setItem(REFRESH_TOKEN, data.refreshToken)
    ElMessage({
      showClose: true,
      message: '注册成功',
      type: 'success'
    })
    // router.replace('/Index')
  } else {
    ElMessage({
      showClose: true,
      message: '账号密码错误',
      type: 'error'
    })
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

onMounted(() => {
  getImgCaptchaUrl()
  getGetArea()
})


</script>

<style scoped></style>
