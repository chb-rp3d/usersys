import { GetEmailDomain } from '@/api/global'
import { ModifyPwd } from '@/api/user'

export async function handleModifyPwd(emailParams, params) {
  console.log(`%c>> $emailParamsemailParams`, 'color:yellow', emailParams)
  const { code, data } = await GetEmailDomain(emailParams)
  if (code === 200 && data) {
    handleFetchModifyPwd(params)
  }
}

export async function handleFetchModifyPwd(params) {
  const { code, data } = await ModifyPwd(params, {
    _baseURL: 'https://api.github.com'
  })
  console.log(`%c>> $ModifyPwd`, 'color:yellow', data)

  // if (code === 200 && data) {
  //   setCookie(ACCESS_TOKEN, data.accessToken)
  //   setCookie(REFRESH_TOKEN, data.refreshToken)
  //   ElMessage({
  //     showClose: true,
  //     message: t('login.login.success'),
  //     type: 'success'
  //   })
  //   // router.replace('/Index')
  // } else {
  //   ElMessage({
  //     showClose: true,
  //     message: t('login.login.failed'),
  //     type: 'error'
  //   })
  // }
}
