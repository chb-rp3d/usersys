import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
import { ref } from 'vue'
import { deleteCookie } from '@/utils/methods'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'

// 退出的hooks
export const useUserRef = () => {
  return ref(JSON.parse(sessionStorage.getItem('CurUser')))
}
export const useLogout = () => {
  console.log('logout')
  ElMessageBox.confirm('是否要退出登陆?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteCookie(ACCESS_TOKEN)
      deleteCookie(REFRESH_TOKEN)
      router.replace('/login')
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '退出取消'
      })
    })
}
