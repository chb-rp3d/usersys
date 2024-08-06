<template>
  <el-form :model="forgetPwdForm" ref="forgetPwdFormRef" :rules="forgetPwdFormRules" style="padding: 30px">
    <el-form-item :label="$t('login.common.label_email')" required prop="email">
      <el-input v-model="forgetPwdForm.email" :placeholder="$t('login.forgetPassword.placeholder_email')" />
    </el-form-item>
    <el-form-item :label="$t('login.common.label_email_code')" required prop="ticketCode" class="el-form-item__nowrap">
        <el-input v-model="forgetPwdForm.ticketCode" :placeholder="$t('login.common.placeholder_pwd')" />
        <el-button @click="_handleGetEmailCode"> {{ $t('login.common.btn_email_code') }} </el-button>
    </el-form-item>
    <el-form-item :label="$t('login.common.label_img_code')" required prop="captchaCode" class="el-form-item__nowrap">
      <el-input v-model="forgetPwdForm.captchaCode" />
      <div class="img-captcha-wrap" @click="getImgCaptchaUrl">
        <img :src="imgCaptcha.imgUrl" :alt="$t('login.common.label_img_code')" />
      </div>
    </el-form-item>
    <el-form-item :label="$t('login.common.label_password')" required prop="password">
      <el-input v-model="forgetPwdForm.password" type="password" show-password
        :placeholder="$t('login.forgetPassword.placeholder_new_pwd')" />
    </el-form-item>
    <el-form-item>
      <el-button link type="primary" @click="_handleGetEmailCode">{{ $t('login.common.tip_email_code_miss') }}
      </el-button>
    </el-form-item>

    <el-form-item>
      <div style="display: flex; justify-content: space-evenly; width: 100%">
        <el-button type="primary" @click="submitForm(forgetPwdFormRef, handleRegisterByEmail)"> {{
          $t('login.common.btn_conform') }}
        </el-button>
      </div>
    </el-form-item>

    <el-form-item>
      <div>
        <el-button link @click="() => emit('change-form-type', 'login')">
          返回登录
          {{ $t('login.common.btn_conform 返回登录') }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { string2Base64 } from '@/utils/methods'
import { useI18n } from 'vue-i18n'

import { ResetPwd } from '@/api/user/index.js'
import { REG_EMAIL, REG_PWD } from '@/config/reg'

import {
  handleGetEmailCode,
  submitForm,
  imgCaptcha
} from '@/hooks/auth/useLoginForm'

const emit = defineEmits(['change-form-type']);

const { t } = useI18n()

const forgetPwdFormRef = ref()
const forgetPwdForm = reactive({
  email: 'chenhaibin@revopoint3d.com',
  ticketCode: '',
  password: 'Aa123456',
  captchaCode: "",
})
// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const forgetPwdFormRules = reactive({
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
        callback(new Error(t('login.login.valid')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
  ticketCode: [
    { required: true, message: t('login.valid.ticket_require'), trigger: 'blur' },
    { min: 6, max: 6, message: t('login.valid.ticket_length_6'), trigger: 'blur' }
  ],
})

const _handleGetEmailCode = async () => {
  const params = {
    email: string2Base64(forgetPwdForm.email),
    locale: forgetPwdForm.areaCode,
    action: 'reset_password'
  }
  handleGetEmailCode(params)
}

// 忘记密码
const handleRegisterByEmail = async () => {
  const params = {
    email: string2Base64(forgetPwdForm.email),
    password: forgetPwdForm.password,
    ticketCode: forgetPwdForm.ticketCode,
    captchaId: imgCaptcha.captchaId,
    captchaCode: forgetPwdForm.forgetPwdForm,

  }
  const res = await ResetPwd(params)
}

</script>

<style scoped></style>
