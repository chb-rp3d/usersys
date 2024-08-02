<template>
  <Transition name="slide-right-left">
    <MainCard v-show="myCardType === 'main'" @change-card-type="handleMyCardType" />
  </Transition>
  <Transition name="slide-right-left">
    <UpdatePwdCard v-show="myCardType === 'updatePwd'" />
  </Transition>
</template>

<script setup>
import { reactive, ref, toRefs, onActivated, watch } from "vue"
import { useI18n } from 'vue-i18n'

import MainCard from "./MainCard.vue"
import UpdatePwdCard from "./UpdatePwdCard.vue"

import useAccount from '@/hooks/auth/useAccount'
const { cardType } = useAccount()

const myCardType = ref('main')
const { t } = useI18n()
const handleMyCardType = (type) => {
  if (type === 'updatePwd') {
    myCardType.value ='updatePwd'
    console.log(`%c>> $父组件接受`, 'color:yellow', type, myCardType.value)
  }
}


</script>

<style scoped>
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
