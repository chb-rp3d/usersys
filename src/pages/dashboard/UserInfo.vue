<template>
    {{ userInfo }}
    <!-- TODO：loading - 骨架屏 -->
    <el-card style="max-width: 880px">
        <el-descriptions :column="1" border>
            <el-descriptions-item :label="$t('login.common.label_email')">
                {{ userInfo.userId }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('login.common.label_email')">
                {{ userInfo.areaCode }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('login.common.label_email')">
                {{ userInfo.email }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup>
import { reactive, toRefs, onActivated } from "vue"
import { useUserStore } from '@/store/modules/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { userInfo } = useUserStore()

</script>

<style scoped></style>
