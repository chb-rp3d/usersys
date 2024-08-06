<template>
  <el-card style="max-width: 880px">
    <div v-for="(item, idx) in menuCfg" :key="item.id">
      <div @click="_handleCardType(item.type)"
        style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
        <div>{{ item.name }}</div>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
      <ElDivider v-if="idx != menuCfg.length - 1" />
    </div>
  </el-card>
</template>

<script setup>
import { reactive, toRefs, onActivated } from "vue"
import { useI18n } from 'vue-i18n'
import { ElDivider } from "element-plus";

const emit = defineEmits(['change-card-type']);

const { t } = useI18n()

const menuCfg = [
  {
    id: 0,
    name: t('login.login.email-修改密码'),
    type: 'updatePwd'
  },
  {
    id: 1,
    name: t('login.login.title-注销账号'),
    type: 'delAccount'
  },
]

const _handleCardType = (type) => {
  if (type === 'updatePwd') {
    emit('change-card-type', 'updatePwd');
  }
}

</script>

<style scoped></style>
