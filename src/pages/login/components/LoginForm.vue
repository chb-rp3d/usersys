<template>
  <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" style="padding: 30px">
    <el-form-item required prop="email">
      <el-input v-model="loginForm.email" :placeholder="$t('login.common.label_email')" />
    </el-form-item>
    <el-form-item required prop="password">
      <el-input v-model="loginForm.password" type="password" show-password
        :placeholder="$t('login.common.placeholder_pwd')" />
    </el-form-item>
    <el-form-item required prop="password">
      <el-button link type="primary" @click="emit('change-form-type', 'forgetPwd')">{{ $t('login.forgetPassword.title')
        }}</el-button>
    </el-form-item>

    <el-form-item required>
      <el-checkbox v-model="isKeepPwd">
        <span style="font-size: 12px">{{ $t('login.login.keep_pwd') }}</span>
      </el-checkbox>
    </el-form-item>

    <el-popover ref="isAllowRef" :visible="allowPOPoRefVisible" placement="top" :width="260">
      <p>{{ $t('login.login.plz_allow_policy') }}</p>
      <template #reference>
        <el-form-item required>
          <el-checkbox v-model="isAllowPolicy">
            <span style="font-size: 12px" v-html="c__allow_policy"></span>
          </el-checkbox>
        </el-form-item>
      </template>
    </el-popover>

    <el-form-item>
      <div style="display: flex; justify-content: space-evenly; width: 100%">
        <el-button type="primary" @click="handleSubmitForm(loginFormRef)" v-click-outside="onClickOutside"> {{
          $t('login.common.btn_login') }} </el-button>
      </div>
    </el-form-item>

    <el-form-item>
      <div style="display: flex; justify-content: space-evenly; width: 100%">
        <el-button @click="emit('change-form-type', 'register')">{{ $t('login.common.btn_register') }}</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, unref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { string2Base64, setCookie } from '@/utils/methods'
import { LoginByEmail } from '@/api/auth/index.js'
import { REG_EMAIL, REG_PWD } from '@/config/reg'
import { ClickOutside as vClickOutside } from 'element-plus'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'
import { setLoginCache } from '@/hooks/auth/useLoginForm'

import { submitForm } from '@/hooks/auth/useLoginForm'
const emit = defineEmits(['change-form-type']);

const { t } = useI18n()

const loginForm = reactive({
  email: 'chenhaibin@revopoint3d.com',
  password: 'Aa123456',
})
// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const loginFormRules = reactive({
  email: {
    validator: (rule, value, callback) => {
      if (!REG_EMAIL.test(value)) {
        callback(new Error(t('login.valid.email_format')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
  password: {
    validator: (rule, value, callback) => {
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.valid.ticket_require')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  }
})

// 获取loginForm的实例
const loginFormRef = ref()
const isKeepPwd = ref(false)
const isAllowPolicy = ref(false)
const isAllowRef = ref()
const allowPOPoRefVisible = ref(false)

const onClickOutside = () => {
  allowPOPoRefVisible.value = false;
}

// 隐私政策
const c__allow_policy = computed(() => {
  return t('login.login.allow_policy', [
    `<a href="#">${t('login.login.user_agreement')}</a>`,
    `<a href="#">${t('login.login.privacy_policy')}</a>`
  ])
})

const handleLogin = async () => {

  const params = {
    email: string2Base64(loginForm.email),
    password: string2Base64(loginForm.password)
  }
  const { code, data } = await LoginByEmail(params)
  // 携带 accessToken 去请求 第一个接口 
  console.log('denglu 成功', data)
  if (code === 200 && data) {
    if (isKeepPwd.value) {
      // TODO: 保存密码

    }
    setLoginCache(data)
    router.replace('/')
    ElMessage({
      showClose: true,
      message: t('login.login.success'),
      type: 'success'
    })
  } else {
    // ElMessage({
    //   showClose: true,
    //   message: t('login.login.failed'),
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

<style scoped></style>
