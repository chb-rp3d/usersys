<template>
  <el-form :model="updatePwdForm" ref="updatePwdFormRef" :rules="updatePwdFormRules" style="max-width: 500px;">
    <el-form-item required prop="oldPassword">
      <el-input v-model="updatePwdForm.oldPassword" type="password" show-password
        :placeholder="$t('login.common.旧密码')" />
    </el-form-item>
    <el-form-item required prop="newPassword1">
      <el-input v-model="updatePwdForm.newPassword1" type="password" show-password
        :placeholder="$t('login.common.placeholder_pwd')" />
    </el-form-item>
    <el-form-item required prop="newPassword2">
      <el-input v-model="updatePwdForm.newPassword2" type="password" show-password
        :placeholder="$t('login.common.placeholder_pwd_new')" />
    </el-form-item>

    <el-form-item>
      <div style="display: flex; justify-content: space-evenly; width: 100%">
        <el-button type="primary" @click="handleSubmitForm(updatePwdFormRef)"> {{
          $t('login.common.btn_login') }} </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, unref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { string2Base64 } from '@/utils/methods'
import { ModifyPwd } from '@/api/user/index.js'
import { REG_EMAIL, REG_PWD } from '@/config/reg'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'

import useLoginForm from '@/hooks/auth/useLoginForm'
const { submitForm } = useLoginForm()


const { t } = useI18n()

const updatePwdForm = reactive({
  oldPassword: 'Aa123456',
  newPassword1: 'Aaa123456',
  newPassword2: 'Aaa123456',
})
// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const updatePwdFormRules = reactive({
  oldPassword: {
    validator: (rule, value, callback) => {
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.valid.必填')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
  newPassword1: {
    validator: (rule, value, callback) => {
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.valid.ticket_require')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
  newPassword1: {
    validator: (rule, value, callback) => {
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.valid.ticket_require')))
      } else if (updatePwdForm.newPassword1 != value) {
        callback(new Error(t('login.valid.两次密码不一致')))
      } else {
        callback()
      }
    },
    trigger: ['blur', 'change']
  },
})

// 获取loginForm的实例
const updatePwdFormRef = ref()

const handleModifyPwd = async () => {

  const params = {
    oldPassword: string2Base64(updatePwdForm.oldPassword),
    newPassword: string2Base64(updatePwdForm.newPassword2)
  }
  const { code, data } = await ModifyPwd(params)
  // TODO: 成功之后是重新登录 还是静默登录
  console.log('denglu 成功', data)
  if (code === 200 && data) {
    sessionStorage.setItem(ACCESS_TOKEN, data.accessToken)
    sessionStorage.setItem(REFRESH_TOKEN, data.refreshToken)
    ElMessage({
      showClose: true,
      message: t('login.login.success'),
      type: 'success'
    })
    // router.replace('/Index')
  } else {
    ElMessage({
      showClose: true,
      message: t('login.login.failed'),
      type: 'error'
    })
  }
}

// 表单校验和提交
const handleSubmitForm = async (formEl) => {

  submitForm(formEl, handleModifyPwd)
}

</script>

<style scoped></style>
