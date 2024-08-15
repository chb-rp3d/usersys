<template>
  <el-form :model="registerForm" ref="RegisterFormRef" label-width="auto" label-position="left"
    :rules="rulesRegisterForm" style="padding: 30px">
    <h5>
      {{ $t('login.has_account') }}
      <span @click="() => emit('change-form-type', 'login')" style="color: var(--el-color-primary-light-3); cursor: pointer">
        {{ $t('login.btn__login') }}
      </span>
    </h5>
    <ElDivider />

    <el-form-item :label="$t('login.label__region')" required prop="areaCode">
      <el-select v-model="registerForm.areaCode" :placeholder="$t('login.placeholder__region')" filterable>
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
      <el-button v-if="!isCounting" @click="_handleGetEmailCode"> {{ $t('login.btn__email_code') }} </el-button>
      <el-button v-else :disabled="isCounting"> {{ timeRemaining }} s </el-button>
    </el-form-item>
    <el-form-item>
      <el-button link type="primary" :disabled="isCounting" @click="_handleGetEmailCode">
        {{ $t('login.tip__email_code_miss') }}
      </el-button>
    </el-form-item>

    <el-form-item :label="$t('login.label__img_code')" required prop="captchaCode" class="el-form-item__nowrap">
      <el-input v-model="registerForm.captchaCode" />
      <div class="img-captcha-wrap" @click="getImgCaptchaUrl">
        <!-- <el-skeleton-item variant="image" style="width: 100px; height: 40px" /> -->
        <div v-if="imgCaptcha.loading">{{ $t('global.loading') }}</div>
        <el-skeleton-item v-else-if="!imgCaptcha.imgUrl" variant="h3" style="width: 100px" />
        <img v-else :src="imgCaptcha.imgUrl" :alt="$t('login.label__img_code')" />
      </div>
    </el-form-item>

    <el-form-item>
      <div class="tw-pt-4 tw-w-full">
        <el-button :loading="loading" type="primary" @click="submitForm(RegisterFormRef, handleRegisterByEmail)"
          class="tw-w-full">{{
            $t('login.btn__register_now')
          }}</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, watch } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { ElDivider, ElMessage } from 'element-plus'
import router from '@/router'
import { string2Base64, setCookie } from '@/utils/methods'

import { RegisterByEmail } from '@/api/auth'
import { REG_EMAIL, REG_PWD } from '@/config/reg'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'
import { $t } from '@/language/index'
import { useDomainStore } from '@/store/modules/domain'

import { AreaOptions, imgCaptcha, getImgCaptchaUrl, handleGetEmailCode, submitForm } from '@/hooks/auth/useLoginForm'

const domainStore = useDomainStore()
const emit = defineEmits(['change-form-type']);

// 注册按钮loading
const loading = ref(false)
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
      if (!value.trim()) {
        callback(new Error($t('global.placeholder', [$t('login.label__email')])))
      } else if (!REG_EMAIL.test(value)) {
        callback(new Error($t('login.valid__email_format')))
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
        callback(new Error($t('login.tip__password')))
      } else {
        callback()
      }
    },
    trigger: ['blur']
  },
  ticketCode: [
    { required: true, message: $t('login.tip__empty', [$t('login.label__email_code')]), trigger: 'blur' },
    { min: 6, max: 6, message: $t('login.valid__ticket_length_6'), trigger: 'blur' }
  ],
  captchaCode: [{ required: true, message: $t('login.tip__empty', [$t('login.label__img_code')]), trigger: 'blur' }]
})

// 通过邮箱注册
const handleRegisterByEmail = async () => {
  loading.value = true
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
  let options = {}
  if (selectedRegion?.domain) {
    options['__baseURL'] = `https://${selectedRegion.domain}`
  }

  const { code, data } = await RegisterByEmail(params, options)
  loading.value = false
  if (code === 200 && data) {
    setCookie(ACCESS_TOKEN, data.accessToken)
    setCookie(REFRESH_TOKEN, data.refreshToken)
    // setLoginCache(data)
    // 直接登录
    ElMessage({
      showClose: true,
      message: $t('login.toast__register_success'),
      type: 'success'
    })
    router.replace('/home')
  } else {
    // ElMessage({
    //   showClose: true,
    //   message: '账号密码错误',
    //   type: 'error'
    // })
  }
}

// 获取邮箱验证码 [邮箱必填]
const _handleGetEmailCode = async () => {
  RegisterFormRef.value.validateField('email', (valid, fields) => {
    if (valid) {
      startCountdown()
      const params = {
        email: string2Base64(registerForm.email),
        locale: registerForm.areaCode,
        action: 'register'
      }
      handleGetEmailCode(params)
    }
  })
}

watch(() => registerForm.areaCode, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    router.currentRoute.value.query['email'] += '1'
    const selectedRegion = AreaOptions.value.find(item => item.areaCode === newVal)
    console.log(`%c>> $newVal, oldVal`, 'color:yellow', newVal, selectedRegion, domainStore.domain, router.currentRoute.value, `https://${selectedRegion.domain}${router.currentRoute.value.fullPath}`)
    if (!!domainStore.domain && domainStore.domain != selectedRegion.domain) {
      // 获取当前路由信息
      const currentRoute = router.currentRoute.value;
      const fullPath = currentRoute.fullPath;
      // 构建新的 URL
      const newUrl = new URL(`https://${selectedRegion.domain}${fullPath}`);

      if (registerForm.email) {

        // 添加额外的查询参数
        newUrl.searchParams.set('email', 'bb@qq.com');

      }
      // 使用 window.location.replace 或 window.location.assign 来导航到新 URL
      window.location.replace(newUrl.toString());
      // window.location.href = `https://${selectedRegion.domain}${router.currentRoute.value.fullPath}`
    }
  }
})

onMounted(() => {
  if(router.currentRoute.value.query.email) {
    registerForm.email = router.currentRoute.value.query.email
  }
})

// ************* 倒计时Start
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
// ************* 倒计时结束
</script>

<style scoped></style>
