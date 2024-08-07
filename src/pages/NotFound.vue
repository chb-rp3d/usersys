// src/components/NotFound.vue
<template>
  <div class="not-found-wrapper">
    <h1>404 Not Found</h1>
    <p>The page you are looking for does not exist.</p>

    <el-button @click="$router.push('/')"> 返回首页 </el-button>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped lang="scss">
body {
  background-color: #f1f1f1;
}

.not-found-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 20%;
  font-family: Arial, sans-serif;
  color: #555;

  p {
    margin-block-start: 10px;
    margin-block-end: 16px;
  }
}
</style>