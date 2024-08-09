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
import { ElMessageBox } from 'element-plus'
import { REG_PWD } from "@/config/reg";
import { handleDeleteAccountConform } from "@/hooks/auth/useLoginForm";

const emit = defineEmits(['change-card-type']);

const { t } = useI18n()

const menuCfg = [
  {
    id: 0,
    name: t('account.change_password'),
    type: 'updatePwd'
  },
  {
    id: 1,
    name: t('account.delete_account'),
    type: 'delAccount'
  },
]

const _handleCardType = (type) => {
  if (type === 'updatePwd') {
    emit('change-card-type', 'updatePwd');
    return
  }
  if (type === 'delAccount') {
    handleDelAccount()
    return
  }
}

// 注销
const handleDelAccount = async () => {
  // 弹窗确认
  ElMessageBox.prompt(
    t('account.placeholder__delete_account'),
    t('account.delete_account_title'),
    {
      confirmButtonText: t('global.btn__ok'),
      cancelButtonText: t('global.btn__cancel'),
      inputPattern: REG_PWD,
      inputErrorMessage: t('login.valid__pwd'),
    }
  )
    .then(({ value }) => {
      handleDeleteAccountConform(value)
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Input canceled',
      // })
    })
}

</script>

<style scoped></style>
