<template>
  <div style="display: flex; line-height: 60px">
        <div style="margin-top: 15px">
            <!--菜单伸缩-->
            
            <el-icon style="font-size: 25px;cursor: pointer;"><component :is="icon"  @click="collapse"></component></el-icon>
        </div>
        <div style="flex: 1; text-align: center; font-size: 34px">
            
        </div>

        <el-row>
            <el-col :span="8">
                <el-avatar
                    shape="square"
                    :size="50"
                    :src="avatarIcon"
                    style="margin: 15px 5px -10px 0; border: 1px solid lightgrey"
                ></el-avatar>
            </el-col>
            <el-col :span="16" style="padding: 23px 0 0 0;">
                <el-dropdown >
                    <!-- dropdown下拉 -->
      
                        <div class="el-dropdown-link">
                            {{ user }}
                        <el-icon><ArrowDown /></el-icon>  
                        </div>
                       
                    
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click.native="toUser"
                                >个人中心</el-dropdown-item
                            >
                            <el-dropdown-item @click.native="logout"
                                >退出登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import router from "@/router";
import avatarIcon  from "@/assets/vue.svg"
import { useUserRef } from "@/hooks/auth/useLog"
import { useLogout } from "@/hooks/auth/useLoginForm"
// 获取用户信息
const user = useUserRef()
const props = defineProps({	
  icon: String	
})

const emits = defineEmits([	
"doCollapse"	
])
const collapse = ()=>{
  emits("doCollapse") 
}
// 跳转到个人信息路由页面
const toUser = ()=>{
    router.replace("/Index");
}
// 退出操作
const logout = useLogout
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
}
</style>
