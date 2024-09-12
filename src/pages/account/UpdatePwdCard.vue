<template>
  <el-button @click="emit('change-card-type', 'main');" style="margin-bottom: 16px;">
    <el-icon><ArrowLeft /></el-icon>
  </el-button>
  <el-form :model="updatePwdForm" ref="updatePwdFormRef" :rules="updatePwdFormRules" style="max-width: 500px;">
    <el-form-item required prop="oldPassword">
      <el-input v-model="updatePwdForm.oldPassword" type="password" show-password
        :placeholder="$t('global.placeholder', [$t('account.old_password')])" />
    </el-form-item>
    <el-form-item required prop="newPassword1">
      <el-input v-model="updatePwdForm.newPassword1" type="password" show-password
        :placeholder="$t('global.placeholder', [$t('account.new_password')])" />
    </el-form-item>
    <el-form-item required prop="newPassword2">
      <el-input v-model="updatePwdForm.newPassword2" type="password" show-password
        :placeholder="$t('account.placeholder__password_again')" />
    </el-form-item>

    <el-form-item>
      <div style="display: flex; justify-content: space-evenly; width: 100%">
        <el-button type="primary" :loading="isLoading" @click="handleSubmitForm(updatePwdFormRef)"> {{
          $t('global.btn__conform') }} </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, unref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { deleteCookie, string2Base64 } from '@/utils/methods'
import { REG_EMAIL, REG_PWD } from '@/config/reg'

import { getCacheUserNameAndPwd, submitForm } from '@/hooks/auth/useLoginForm'
import { handleModifyPwd } from '@/hooks/account/useAccount'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

const emit = defineEmits(['change-card-type']);

const { t } = useI18n()

const updatePwdForm = reactive({
  oldPassword: '',
  newPassword1: '',
  newPassword2: '',
})
// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const updatePwdFormRules = reactive({
  oldPassword: {
    validator: (rule, value, callback) => {
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.tip__password')))
      } else {
        callback()
      }
    },
    trigger: ['blur']
  },
  newPassword1: {
    validator: (rule, value, callback) => {
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.tip__password')))
      } else {
        callback()
      }
    },
    trigger: ['blur']
  },
  newPassword2: {
    validator: (rule, value, callback) => {
      if (!REG_PWD.test(value)) {
        callback(new Error(t('login.tip__password')))
      } else if (updatePwdForm.newPassword1 != value) {
        callback(new Error(t('account.valid__password_not_same')))
      } else if (updatePwdForm.oldPassword === value) {
        callback(new Error(t('account.valid__password_same')))
      } else {
        callback()
      }
    },
    trigger: ['blur']
  },
})

// 获取loginForm的实例
const updatePwdFormRef = ref()
const isLoading = ref(false)

const _handleModifyPwd = async () => {
  isLoading.value = true
  const params = {
    oldPassword: string2Base64(updatePwdForm.oldPassword),
    newPassword: string2Base64(updatePwdForm.newPassword2)
  }
  const res = await handleModifyPwd(params)
  isLoading.value = false
  // 完成后 重置表单，清空原来保存的密码
  if (res === 'success') {
    updatePwdFormRef.value.resetFields()

    const cache = getCacheUserNameAndPwd()
    console.log(`%c>> $`, 'color:yellow', cache)
    !!cache && deleteCookie('userInfo')
  }
}

// 表单校验和提交
const handleSubmitForm = async (formEl) => {
  submitForm(formEl, _handleModifyPwd)
}

</script>

<style scoped>
:deep(.el-form-item) {
  margin-bottom: 36px;
}
</style>
