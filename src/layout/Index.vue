<template>
  <el-container style="height: 100%; background-color:#F7FAF8;">
    <el-header
      style="text-align: right; font-size: 12px;height: 100%;border-bottom: rgba(168,168,168,0.3) 1px solid; padding: 0">
      <Header :icon="icon" @toggle="handleToggle"></Header>
    </el-header>
    <el-container style="height: calc(100vh - 71px);">
      <el-aside v-if="!isSmall" :width="aside_width" :style="computedAsideStyle">
        <Aside :activeIndex="activeIndex" :isAsideShow="isAsideShow"></Aside>
      </el-aside>
      <el-drawer v-else v-model="isAsideShow" :direction="'ltr'" :with-header="false" size="60%">
        <Aside :activeIndex="activeIndex" :isAsideShow="isAsideShow"></Aside>
      </el-drawer>

      <el-main class="tw-relative">
        <router-view v-slot="{ Component }">
          <!-- <keep-alive> -->
          <component :is="Component" />
          <!-- </keep-alive> -->
        </router-view>
        <div class="tw-absolute tw-bottom-0 tw-right-0 tw-left-0 tw-flex tw-justify-center tw-border-t">
          <span class="tw-m-2 tw-text-sm tw-text-[#959595]">v {{ V }}</span>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
import { reactive, toRefs, onActivated } from "vue"
import { useWindowSize } from '@vueuse/core'
import router from '@/router'
import { useGlobalStore } from '@/store/modules/global';
const V = import.meta.env?.VITE_VERSION

const { width } = useWindowSize()
const globalStore = useGlobalStore()

const isAsideShow = ref(false)
const activeIndex = ref('/home')

const data = reactive({
  isCollapse: false,
  aside_width: '200px',
  icon: 'Fold'
})

watch(
  () => router.currentRoute.value,
  (newPath) => {
    // 监听路由变化，更新当前表单
    console.log(`%c>> newPath, newDomain`, 'color:yellow', newPath)
    activeIndex.value = newPath.path === '/' ? '/home' : newPath.path
  },
  {
    immediate: true
  }
)

onMounted(() => {
  if (globalStore.globalArea?.length === 0) {
    globalStore.getGlobalArea()
  }
})
const computedAsideStyle = computed(() => {
  const base = {
    // height: 'calc(100vh - 71px)',
    marginLeft: '-1px',
  }
  if (width.value > 768) {
    return {
      ...base,
      display: 'block',
    }
  } else {
    return {
      ...base,
      display: isAsideShow.value ? 'block' : 'none',
      top: 0,
      left: 0,
      position: 'absolute',
    }
  }
})

const AsideStyle = reactive({
  height: '100vh',
  marginLeft: '-1px',
  display: 'none',
})
const handleToggle = () => {
  console.log(`%c>> $`, 'color:yellow',)
  isAsideShow.value = !isAsideShow.value
  if (width.value > 768) {
    AsideStyle.display = 'block'
  } else {

    AsideStyle.display = isAsideShow.value ? 'block' : 'none'
  }
}

const isSmall = computed(() => {
  return width.value <= 768
})

const { aside_width, icon } = toRefs(data)
</script>

<style scoped>
#app {
  height: 100%
}

.el-header {
  /**background-color: #B3C0D1;**/
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
