<template>
  <!-- <Transition name="slide-right-left"> -->
    <component :is="currentComponent" @change-card-type="handleMyCardType" />
  <!-- </Transition> -->

</template>

<script setup>
import { reactive, ref, toRefs, onActivated, watch } from "vue"
import { useI18n } from 'vue-i18n'

import MainCard from "./MainCard.vue"
import UpdatePwdCard from "./UpdatePwdCard.vue"

const currentComponent = ref('MainCard');
const myCardType = ref('main')
const { t } = useI18n()

// 初始状态
if (myCardType.value === 'main') {
  currentComponent.value = MainCard;
} else if (myCardType.value === 'updatePwd') {
  currentComponent.value = UpdatePwdCard;
}
const handleMyCardType = (type) => {
  myCardType.value = type
  if (type === 'updatePwd') {
    console.log(`%c>> $父组件接受`, 'color:yellow', type, myCardType.value)
    currentComponent.value = UpdatePwdCard;
  } else if (type === 'main') {
    currentComponent.value = MainCard;
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
/* .slide-right-left-enter-active {
  transition: all 0.5s ease;
}

.slide-right-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-left-leave-active {
  transition: all 0.5s ease;
}

.slide-right-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
} */
</style>
