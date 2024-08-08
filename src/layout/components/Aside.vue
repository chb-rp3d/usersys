<template>
  <el-menu background-color="#ffffff" active-text-color="#fafafa" style="height: 100%;padding-top: 20px" :style="isAsideShow? {borderRight: 'unset'}: {}"
    default-active="/home" :collapse="isCollapse" :collapse-transition="false" router>

    <el-menu-item index="/home">
      <span slot="title">
        <b>个人信息</b>
      </span>
    </el-menu-item>
    <el-menu-item index="/account">
      <span slot="title">
        <b>账号与安全</b>
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
let props = defineProps({
  //导航栏菜单伸缩
  isCollapse: {
    type: Boolean,
    default: false
  },
  //导航栏是否浮动显示
  isAsideShow: {
    type: Boolean,
    default: false
  },
})
console.log("props.isCollapse", props.isCollapse)


</script>

<style scoped lang="scss">
:deep(.el-menu-item) {
  color: #444;
  background-color: #f1f1f1;
  border-radius: 0.5rem;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
:deep(.el-menu-item:hover) {
  background-color: #efefef;
}
:deep(.el-menu-item.is-active) {
  background-color: #313640;
  color: #fff;
}
</style>
