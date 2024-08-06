<template>
  <div class="loginBody">
    <div class="loginDiv">
      <div class="login-content">
        <h3 class="login-title">{{ formTitle }}</h3>

        <!-- <Transition name="slide-right-left"> </Transition>-->
        <LoginForm v-show="formType === 'login'" @change-form-type="handleFormType" />
        <RegisterForm v-show="formType === 'register'" @change-form-type="handleFormType" />
        <ForgetPasswordForm v-show="formType === 'forgetPwd'" @change-form-type="handleFormType" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import ForgetPasswordForm from './components/ForgetPasswordForm.vue'

import useLoginForm from '@/hooks/auth/useLoginForm'
const { formType, handleFormType } = useLoginForm()

// a computed ref
const titleCfg = {
  login: '登录',
  register: '注册',
  forgetPwd: '忘记密码'
}
const formTitle = computed(() => {
  return titleCfg[formType.value]
})
</script>

<style scoped>
html,
body {
  overflow-x: hidden;
}

.loginBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #b3c0d1;
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
  width: 450px;
  /* height: -webkit-fill-available; */
  background: #fff;
  border-radius: 1rem;
  opacity: 0.9;

}

.login-title {
  margin: 20px 0;
  text-align: center;
}

.login-content {
  /* width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px; */
}

:deep(.el-form-item__nowrap .el-form-item__content) {
  flex-wrap: nowrap;
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
