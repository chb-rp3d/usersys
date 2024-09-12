<template>
  <div v-if="tipShow"
    class="tw-fixed tw-bottom-0 tw-w-full tw-bg-gray-400 tw-p-4 tw-flex tw-justify-between tw-items-center tw-gap-6">
    <div class="tw-flex-1 tw-text-white tw-text-sm">
      {{ $t('login.tips__cookie') }}
      <el-link :href="GlobalStore.PRIVACY_POLICY" target="_blank">
        {{ $t('login.btn__cookie_more') }}
      </el-link>
    </div>
    <el-icon color="#ffffff" class="tw-cursor-pointer" @click="() => tipShow = false">
      <Close />
    </el-icon>
  </div>
</template>

<script setup>
import { ref, reactive, } from "vue"
import { useGlobalStore } from '@/store/modules/global'

const GlobalStore = useGlobalStore()

const tipShow = ref(true)


</script>

<style scoped>
.el-link {
  margin-left: 8px;
  color: #fff;
}
</style>