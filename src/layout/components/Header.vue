<template>
    <div class="tw-flex tw-justify-between tw-items-center tw-leading-[70px] tw-bg-[#fff]">
        <!--菜单伸缩-->
        <div class="tw-flex tw-items-center tw-gap-4">
            <el-avatar shape="square" :size="50" :src="avatarIcon" style=" border: 1px solid lightgrey"></el-avatar>
            <span class="tw-text-[1rem] tw-weight-bold">REVOPOINT 账号</span>
            <div class="md:tw-hidden tw-text-[20px] tw-flex tw-items-center" @click="emits('toggle')">
                <el-icon class="tw-cursor-pointer">
                    <Expand />
                </el-icon>
            </div>
        </div>
        <div class="tw-flex tw-justify-end tw-items-center tw-gap-4 tw-flex-1">
            <el-button link type="primary" @click.native="logout">{{ $t('account.logout') }}</el-button>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import avatarIcon from "@/assets/vue.svg"
import { useUserRef } from "@/hooks/auth/useLog"
import { useLogout } from "@/hooks/auth/useLoginForm"
// 获取用户信息
const user = useUserRef()
const props = defineProps({
    icon: String
})

const emits = defineEmits(['toggle'])
// 退出操作
const logout = useLogout
</script>

<style scoped></style>
