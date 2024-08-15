<template>
  <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" style="padding: 30px">
    <el-form-item required prop="email">
      <el-input v-model="loginForm.email" :placeholder="$t('login.label__email')" />
    </el-form-item>
    <el-form-item required prop="password">
      <el-input v-model="loginForm.password" type="password" show-password
        :placeholder="$t('login.placeholder__pwd')" />
    </el-form-item>

    <el-form-item required prop="password" class="form-forgetPwd">
      <el-button link type="primary" @click="emit('change-form-type', 'forgetPwd')">{{ $t('login.forget_pwd')
        }}</el-button>
    </el-form-item>

    <el-form-item required style="margin-bottom: 0;">
      <el-checkbox v-model="isKeepPwd">
        <span :style="textStyle">{{ $t('login.keep_pwd') }}</span>
      </el-checkbox>
    </el-form-item>

    <el-popover ref="isAllowRef" :visible="allowPOPoRefVisible" placement="top" :width="260">
      <p>{{ $t('login.plz_allow_policy') }}</p>
      <template #reference>
        <el-form-item required>
          <el-checkbox v-model="isAllowPolicy">
            <span :style="textStyle" v-html="c__allow_policy"></span>
          </el-checkbox>
        </el-form-item>
      </template>
    </el-popover>

    <el-form-item style="padding-top: 20px;">
      <el-button type="primary" @click="handleSubmitForm(loginFormRef)" v-click-outside="onClickOutside"
        style="width: 100%">
        {{ $t('login.btn__login') }}
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="emit('change-form-type', 'register')" class="tw-w-full">
        {{ $t('login.btn__register') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, unref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { string2Base64, setCookie, getCookie, base64ToString, openVn } from '@/utils/methods'
import { LoginByEmail } from '@/api/auth/index.js'
import { REG_EMAIL, REG_PWD } from '@/config/reg'
import { ClickOutside as vClickOutside } from 'element-plus'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'
import { cacheUserNameAndPwd, getCacheUserNameAndPwd, setLoginCache } from '@/hooks/auth/useLoginForm'
import { useGlobalStore } from '@/store/modules/global'

import { submitForm } from '@/hooks/auth/useLoginForm'
import { ERROR_CODE_ENUM } from '@/config/errCodeEnum'
const emit = defineEmits(['change-form-type']);

const { t } = useI18n()
const GlobalStore = useGlobalStore()

const textStyle = {
  fontSize: '12px',
  color: '#666'
}

const loginForm = reactive({
  email: '',
  password: '',
})

// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const loginFormRules = reactive({
  email: {
    validator: (rule, value, callback) => {
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
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.valid__ticket_require')))
      } else {
        callback()
      }
    },
    trigger: ['blur']
  }
})

// 获取loginForm的实例
const loginFormRef = ref()
const isKeepPwd = ref(false)
const isAllowPolicy = ref(false)
const isAllowRef = ref()
const allowPOPoRefVisible = ref(false)

onMounted(() => {
  // 获取cookie的userinfo
  const res = getCacheUserNameAndPwd()
  if (res) {
    loginForm.email = base64ToString(res.email)
    loginForm.password = base64ToString(res.password)
    isKeepPwd.value = true
  }
})

const onClickOutside = () => {
  allowPOPoRefVisible.value = false;
}

// 隐私政策
const c__allow_policy = computed(() => {
  return t('login.allow_policy', [
    ` <a style="color: var(--el-color-primary-light-3); text-decoration: underline;" href="${GlobalStore.USER_POLICY}">${t('login.user_agreement')}</a> `,
    ` <a style="color: var(--el-color-primary-light-3); text-decoration: underline;" href="${GlobalStore.PRIVACY_POLICY}">${t('login.privacy_policy')}</a> `
  ])
})

const handleLogin = async () => {

  const params = {
    email: string2Base64(loginForm.email),
    password: string2Base64(loginForm.password)
  }
  const { code, data } = await LoginByEmail(params)
  // 携带 accessToken 去请求 第一个接口 
  // console.log('denglu 成功', data)




  if (code === 200 && data) {
    if (isKeepPwd.value) {
      cacheUserNameAndPwd(params)
    }
    setLoginCache(data)
    router.replace('/home')
    ElMessage({
      showClose: true,
      message: t('login.msg__success'),
      type: 'success'
    })
  } else {
    const errMsg = ERROR_CODE_ENUM[code]
    if (errMsg) {
      openVn({ msg: errMsg, type: 'error' })
    }
    // ElMessage({
    //   showClose: true,
    //   message: t('login.failed'),
    //   type: 'error'
    // })
  }
}

// 表单校验和提交
const handleSubmitForm = async (formEl) => {
  if (!isAllowPolicy.value) {
    // 隐私政策
    allowPOPoRefVisible.value = true;
    return
  }

  submitForm(formEl, handleLogin)
}

</script>

<style scoped>
.form-forgetPwd {
  margin-bottom: 10px;
}

.form-forgetPwd :deep(.el-form-item__content) {
  justify-content: flex-end;
}
</style>
