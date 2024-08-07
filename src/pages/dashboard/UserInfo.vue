<template>
    <!-- TODO：loading - 骨架屏 -->
    <!-- {{ userStore.userInfo }} -->
    <el-card style="max-width: 880px">
        <div v-if="ApiLoading === true">{{ $t('global.loading') }}</div>
        <el-descriptions v-else :column="1" border>
            <el-descriptions-item :label="$t('account.user_id')">
                {{ userStore.userInfo.userId }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('account.user_region')">
                {{ userStore.userInfo.areaCode }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('login.label__email')">
                {{ userStore.userInfo.email }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup>
import { reactive, ref, onActivated, onMounted } from "vue"
import { useUserStore } from '@/store/modules/user'
import { useI18n } from 'vue-i18n'
import { GetUserInfo } from '@/api/user/index'

const ApiLoading = ref(true)

const userStore = useUserStore()

const { t } = useI18n()
// console.log(`%c>> $userInfo`, 'color:yellow', userInfo)
const handleGetUserInfo = async () => {
    ApiLoading.value = true
    const { code, data } = await GetUserInfo()
    console.log(`%c>> $data`, 'color:yellow', data)
    if (code === 200 && data) {
        userStore.updateUserInfo(data)
    }
    ApiLoading.value = false
}

onMounted(() => {
    handleGetUserInfo()
})
</script>

<style scoped></style>
