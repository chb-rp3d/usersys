<template>
  <el-select v-model="globalStore.lang" placeholder="Please Select language" style="width: 120px" @change="handleChange">
    <el-option v-for="item in langOptions" :key="item.key" :label="item.name" :value="item.key" />
  </el-select>
</template>

<script setup>
import { langOptions } from "@/config/global";
import { useGlobalStore } from '@/store/modules/global'
import { setCookie } from "@/utils/methods";

const globalStore = useGlobalStore()
// 语言选择
const handleChange = (lang) => {
  globalStore.toggleLang(lang)
  // 设置缓存
  setCookie('SYS_LANG', lang)
  // 更新地区选项
  globalStore.getGlobalArea()
}


</script>

<style scoped lang="">
</style>