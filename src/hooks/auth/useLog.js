import { ElMessage, ElMessageBox } from 'element-plus'
import router from "@/router";
import { ref } from 'vue'
// 退出的hooks
export const useUserRef = ()=>{
  return ref(JSON.parse(sessionStorage.getItem("CurUser")))
}
export const useLogout = ()=>{
  console.log("logout");
  ElMessageBox.confirm(
  '是否要退出登陆?',
  'Warning',
  {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }
)
  .then(() => {

    sessionStorage.clear();
    router.replace("/");
    ElMessage({
      type: 'success',
      message: '退出成功',
    })
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '退出取消',
    })
  })
}
