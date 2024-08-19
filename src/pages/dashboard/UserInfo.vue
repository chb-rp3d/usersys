<template>
    <el-card style="max-width: 880px">
        <div v-if="ApiLoading === true || globalStore.globalArea.length === 0">{{ $t('global.loading') }}</div>
        <el-descriptions v-else :column="1" border>
            <el-descriptions-item :label="$t('account.user_id')">
                {{ userStore.userInfo.userId }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('login.label__region')">
                {{ c__area_name(userStore.userInfo.areaCode) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('login.label__email')">
                {{ userStore.userInfo.email }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup>
import { reactive, ref, onActivated, onMounted, computed } from "vue"
import { useUserStore } from '@/store/modules/user'
import { useI18n } from 'vue-i18n'
import { GetUserInfo } from '@/api/user/index'
import { useGlobalStore } from "@/store/modules/global";

const ApiLoading = ref(true)

const userStore = useUserStore()
const globalStore = useGlobalStore()

const { t } = useI18n()
// console.log(`%c>> $userInfo`, 'color:yellow', userInfo)
const handleGetUserInfo = async () => {
    ApiLoading.value = true
    const { code, data } = await GetUserInfo()
    // console.log(`%c>> $data`, 'color:yellow', data)
    if (code === 200 && data) {
        userStore.updateUserInfo(data)
    }
    ApiLoading.value = false
}

onMounted(() => {
    handleGetUserInfo()
})

// 地区名称
const c__area_name = computed(() => {
    return (key) => {
        const areaData = globalStore.globalArea
        const areaItem = areaData.find(item => item.areaCode === key)
        return areaItem.areaName
    }
})
</script>

<style scoped></style>
