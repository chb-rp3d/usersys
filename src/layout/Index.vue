<template>
  <el-container style="height: 100%; background-color:#F7FAF8;">
    <el-aside :width="aside_witdh" style="height: 100vh;background-color: rgb(238, 241, 246);margin-left: -1px;">
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>

    <el-container style="height: 100%;">
      <el-header
        style="text-align: right; font-size: 12px;height: 100%;border-bottom: rgba(168,168,168,0.3) 1px solid;">
        <Header @doCollapse="doCollapse" :icon="icon"></Header>
      </el-header>

      <el-main style="height: 100%;">
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
import { onMounted } from 'vue'
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
import { reactive, toRefs, onActivated } from "vue"

const data = reactive({
  isCollapse: false,
  aside_witdh: '200px',
  icon: 'Fold'
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
