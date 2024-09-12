<template>
  <div class="loginBody">
    <div class="tw-absolute tw-top-4 tw-right-4">
      <LangSelect />
    </div>
    <div class="loginDiv">
      <div class="login-content">
        <h3 class="login-title">{{ formTitle }}</h3>

        <!-- <Transition name="slide-right-left"> </Transition>-->
        <LoginForm v-if="formType === HASH_LOGIN" @change-form-type="handleFormType" />
        <RegisterForm v-if="formType === HASH_REGISTER" @change-form-type="handleFormType" />
        <ForgetPasswordForm v-if="formType === HASH_FORGET_PWD" @change-form-type="handleFormType" />
      </div>
    </div>

    <CookieAllow />
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import ForgetPasswordForm from './components/ForgetPasswordForm.vue'
import LangSelect from '@/components/account/LangSelect.vue'
import CookieAllow from '@/components/account/CookieAllow.vue'

import {
  HASH_LOGIN,
  HASH_REGISTER,
  HASH_FORGET_PWD,
  formType,
  handleFormType,
  useLoginFormSetup,
} from '@/hooks/auth/useLoginForm'
// import { useDark, useToggle } from "@vueuse/core";
// const isDark = useDark();
// const toggleDark = useToggle(isDark);
const { t } = useI18n()

useLoginFormSetup()

// a computed ref
const titleCfg = {
  login: 'login.title__login',
  register: 'login.title__register',
  forgetPwd: 'login.title__forget_password'
}
const formTitle = computed(() => {
  return t(titleCfg[formType.value])
})
</script>

<style scoped lang="scss">
html,
body {
  overflow-x: hidden;
}

.loginBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f6f7;
  background-size: 100% 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.loginDiv {
  /* position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -225px; */
  width: 540px;
  /* height: -webkit-fill-available; */
  // background: #fff;
  border-radius: 1rem;
  opacity: 0.9;

}

.login-title {
  margin: 20px 0;
  text-align: center;
  color: #444444;
  font-size: 1.5rem;
}

.login-content {
  /* width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px; */
}

:deep(.el-form-item) {
  margin-bottom: 26px;
}

:deep(.el-form-item.el-form-item__mb-small) {
  margin-bottom: 16px;
}

:deep(.el-form-item__label-wrap) {
  margin-right: 8px;
}

:deep(.el-form-item__nowrap .el-form-item__content) {
  flex-wrap: nowrap;
  gap: 8px;

  .img-captcha-wrap {
    min-width: 83px;

    img {
      cursor: pointer;
      display: block
    }
  }
}

:deep(.el-input__inner) {
  color: #444;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #ccc inset;
}


.slide-right-left-enter-active,
.slide-right-left-leave-active {
  transition: all 0.5s ease;
}

.slide-right-left-enter-from,
.slide-right-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
