import { ModifyPwd } from '@/api/user'
import { ElMessage } from 'element-plus'
import i18n from '@/language/index'

/**
 * @description 登录后的修改密码 [登录后修改密码无需请求domain，因为已经知道]
 * @param {Object} params 参数
 */
export async function handleModifyPwd(params, options) {
  const { code } = await ModifyPwd(params, { withFailedMsg: true})

  // * 修改完密码之后：直接更新token，toast提示，无需重新登录
  if (code === 200) {
    ElMessage({
      showClose: true,
      message: i18n.global.t('account.update_password_success'),
      type: 'success'
    })
    return 'success'
  } else {
    return 'failed'
  }
}
