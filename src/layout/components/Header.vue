<template>
    <div class="tw-flex tw-justify-between tw-items-center tw-leading-[70px] tw-bg-[#fff] tw-px-3">
        <!--菜单伸缩-->
        <div class="tw-flex tw-items-center tw-gap-4">
            <el-avatar shape="square" :size="50" fit="contain" :src="avatarIcon" style=" background-color: #fff; padding: 2px;"></el-avatar>
            <span v-if="width > 600 " class="tw-text-[1rem] tw-weight-bold">Revopoint</span>
            <div class="md:tw-hidden tw-text-[20px] tw-flex tw-items-center" @click="emits('toggle')">
                <el-icon class="tw-cursor-pointer">
                    <Expand />
                </el-icon>
            </div>
        </div>
        <div class="tw-flex tw-justify-end tw-items-center tw-gap-4 tw-flex-1">
            <LangSelect />
            <el-button link type="primary" @click.native="logout">{{ $t('account.logout') }}</el-button>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { useI18n } from 'vue-i18n'
import avatarIcon from "@/assets/revoscan.png"
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteCookie } from "@/utils/methods";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/config/global";
import { HASH_LOGIN } from "@/hooks/auth/useLoginForm";
import LangSelect from "@/components/account/LangSelect.vue";
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const { t } = useI18n()

const props = defineProps({
    icon: String
})

const emits = defineEmits(['toggle'])
// 退出操作
const logout = () => {
    console.log('logout')
    ElMessageBox.confirm(t('account.logout_is_sure'), t('account.logout'), {
        confirmButtonText: t('global.btn__conform'),
        cancelButtonText: t('global.btn__cancel'),
        type: 'warning'
    })
        .then(() => {
            deleteCookie(ACCESS_TOKEN)
            deleteCookie(REFRESH_TOKEN)
            router.replace(`/login#${HASH_LOGIN}`)
            ElMessage({
                type: 'success',
                message: t('account.logout_success')
            })
        })
        .catch(() => {
            // ElMessage({
            //   type: 'info',
            //   message: t('account.logout_is_sure')
            // })
        })
}
</script>

<style scoped></style>
