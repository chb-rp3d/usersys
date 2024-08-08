<template>
  <el-container style="height: 100%; background-color:#F7FAF8;">
    <el-header style="text-align: right; font-size: 12px;height: 100%;border-bottom: rgba(168,168,168,0.3) 1px solid; ">
      <Header :icon="icon" @toggle="handleToggle"></Header>
    </el-header>

    <el-container style="height: 100%;">
      <el-aside v-if="!isSmall" :width="aside_witdh" :style="computedAsideStyle">
        <Aside :isCollapse="isCollapse" :isAsideShow="isAsideShow"></Aside>
      </el-aside>
      <el-drawer v-model="isAsideShow" :direction="'ltr'" :with-header="false">
        <Aside :isCollapse="isCollapse" :isAsideShow="isAsideShow"></Aside>
      </el-drawer>

      <el-main style="height: 100%; padding-top: 20px">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
import { reactive, toRefs, onActivated } from "vue"
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const isAsideShow = ref(false)

const data = reactive({
  isCollapse: false,
  aside_witdh: '200px',
  icon: 'Fold'
})


const computedAsideStyle = computed(() => {
  const base = {
    height: 'calc(100vh - 71px)',
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


const doCollapse = () => {
  data.isCollapse = !data.isCollapse
  if (!data.isCollapse) {// 展开
    data.aside_witdh = '200px'
    data.icon = 'Fold'
  } else {//关起、关闭、收起
    data.aside_witdh = '64px'
    data.icon = 'Expand'
  }
}


const { isCollapse, aside_witdh, icon } = toRefs(data)
</script>

<style scoped>
.el-header {
  /**background-color: #B3C0D1;**/
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
