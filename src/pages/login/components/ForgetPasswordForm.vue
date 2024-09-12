<template>
  <el-form :model="forgetPwdForm" ref="forgetPwdFormRef" label-width="100px" label-position="left"
    :rules="forgetPwdFormRules" style="padding: 30px">
    <el-form-item :label="$t('login.label__email')" required prop="email">
      <el-input v-model="forgetPwdForm.email" :placeholder="$t('login.placeholder_email')" />
    </el-form-item>
    <el-form-item :label="$t('login.label__email_code')" required prop="ticketCode" class="el-form-item__nowrap">
      <el-input v-model="forgetPwdForm.ticketCode"
        :placeholder="$t('global.placeholder', [$t('login.label__email_code')])" />
      <el-button v-if="!isCounting" @click="_handleGetEmailCode"> {{ $t('login.btn__email_code') }} </el-button>
      <el-button v-else :disabled="isCounting"> {{ timeRemaining }} s </el-button>
    </el-form-item>
    <el-form-item :label="$t('login.label__img_code')" required prop="captchaCode" class="el-form-item__nowrap">
      <el-input v-model="forgetPwdForm.captchaCode"
        :placeholder="$t('global.placeholder', [$t('login.label__img_code')])" />
      <div class="img-captcha-wrap" @click="getImgCaptchaUrl">
        <div v-if="imgCaptcha.loading">{{ $t('global.loading') }}</div>
        <el-skeleton-item v-else-if="!imgCaptcha.imgUrl" variant="h3" style="width: 100px" />
        <img v-else :src="imgCaptcha.imgUrl" :alt="$t('login.label__img_code')" />
      </div>
    </el-form-item>
    <el-form-item :label="$t('login.label__password')" required prop="password">
      <el-input v-model="forgetPwdForm.password" type="password" show-password
        :placeholder="$t('login.placeholder__pwd_new')" />
    </el-form-item>
    <el-form-item class="tw-pt-2">
      <el-button :disabled="isCounting" link type="primary" @click="_handleGetEmailCode">
        {{ $t('login.tip__email_code_miss') }}
      </el-button>
    </el-form-item>

    <div>
      <el-button type="primary" class="tw-w-full tw-mt-2 tw-mb-3"
        @click="submitForm(forgetPwdFormRef, handleRegisterByEmail)">
        {{ $t('global.btn__conform') }}
      </el-button>
    </div>

    <div>
      <el-button link class="tw-w-full" @click="() => emit('change-form-type', 'login')">
        {{ $t('login.back_to_login') }}
      </el-button>
    </div>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useIntervalFn } from '@vueuse/core'
import { openVn, string2Base64 } from '@/utils/methods'
import { useI18n } from 'vue-i18n'

import { ResetPwd } from '@/api/user/index.js'
import { REG_EMAIL, REG_PWD } from '@/config/reg'
import { useGlobalStore } from '@/store/modules/global'

import {
  handleGetEmailCode,
  submitForm,
  imgCaptcha,
  getImgCaptchaUrl
} from '@/hooks/auth/useLoginForm'

const emit = defineEmits(['change-form-type']);

const GlobalStore = useGlobalStore()
const { t } = useI18n()

const forgetPwdFormRef = ref()
const forgetPwdForm = reactive({
  email: '',
  ticketCode: '',
  password: '',
  captchaCode: "",
})
// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const forgetPwdFormRules = reactive({
  email: {
    validator: (rule, value, callback) => {
      // console.log(`%c>> $`, 'color:yellow', rule, value)
      // 定义正则表达式
      if (!value.trim()) {
        callback(new Error(t('global.placeholder', [t('login.label__email')])))
      } else if (!REG_EMAIL.test(value)) {
        callback(new Error(t('login.valid__email_format')))
      } else {
        callback()
      }
    },
    trigger: ['blur']
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
    trigger: ['blur']
  },
  captchaCode: [
    { required: true, message: () => t('global.placeholder', [t('login.label__img_code')]), trigger: 'blur' },
  ],
  ticketCode: [
    { required: true, message: () => t('login.valid__ticket_require'), trigger: 'blur' },
    { min: 6, max: 6, message: () => t('login.valid__ticket_length_6'), trigger: 'blur' }
  ],
})

const _handleGetEmailCode = async () => {
  // 不输邮箱无法请求
  await forgetPwdFormRef.value.validateField('email', async (valid, fields) => {
    if (valid) {
      startCountdown()
      const params = {
        email: string2Base64(forgetPwdForm.email),
        locale: forgetPwdForm.areaCode,
        action: 'reset_password'
      }
      handleGetEmailCode(params)
    }
  })
}

watch(() => GlobalStore.lang, (newVal, oldVal) => {
  if(newVal != oldVal) {
    forgetPwdFormRef.value.resetFields()
  }
})

// 忘记密码, 重置密码
const handleRegisterByEmail = async () => {
  const params = {
    email: string2Base64(forgetPwdForm.email),
    newPassword: string2Base64(forgetPwdForm.password),
    ticketCode: forgetPwdForm.ticketCode,
    captchaId: imgCaptcha.captchaId,
    captchaCode: forgetPwdForm.captchaCode,

  }
  const { code, data, message } = await ResetPwd(params)
  if (code === 200) {
    openVn({ msg: t('login.toast__reset_password_success'), type: 'success' })
    emit('change-form-type', 'login')
  }
}


// 定义倒计时相关状态
const timeRemaining = ref(0)
const isCounting = ref(false)

// 定义倒计时函数
const countdown = () => {
  timeRemaining.value -= 1
  if (timeRemaining.value <= 0) {
    clearInterval(interval)
    isCounting.value = false
  }
}

// 使用 useIntervalFn 来设置倒计时
const { pause, resume, interval } = useIntervalFn(countdown, 1000)

// 定义开始倒计时的方法
const startCountdown = () => {
  timeRemaining.value = 60
  isCounting.value = true
  resume()
}

// 清理定时器
onUnmounted(() => {
  pause()
})

pause()

</script>

<style scoped></style>
