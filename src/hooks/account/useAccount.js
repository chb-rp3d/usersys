import { GetEmailDomain } from '@/api/global'
import { ModifyPwd } from '@/api/user'

export async function handleModifyPwd(emailParams, params) {
  const { code, data } = await GetEmailDomain(emailParams)
  if (code === 200 && data) {
    handleFetchModifyPwd(params, `https:${data.domain}`)
  }
}

export async function handleFetchModifyPwd(params, domain) {
  const { code, data } = await ModifyPwd(params, {
    // _baseURL: domain // TODO: 提测放开
  })
  console.log(`%c>> $ModifyPwd`, 'color:yellow', data)

  // TODO: 修改完密码之后是直接更新token，用户什么都感受不到，还是清空登录状态，重新登陆
  // if (code === 200 && data) {
  //   ElMessage({
  //     showClose: true,
  //     message: t('login.success'),
  //     type: 'success'
  //   })
  //   // router.replace('/Index')
  // } else {
  //   ElMessage({
  //     showClose: true,
  //     message: t('login.failed'),
  //     type: 'error'
  //   })
  // }
}
