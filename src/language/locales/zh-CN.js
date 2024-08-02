export default {
  common: {
    more: '查看更多'
  },
  layout: {
    '/': '首页'
  },
  leftMenus: {
    '/': '首页',
    Home: '首页',
    home: '首页'
  },
  headMenus: {
    subTitle: '机构服务平台',
    userName: '张三'
  },
  login: {
    common: {
      // 注册流程公用
      label_region: '地区',
      label_email: '邮箱',
      label_password: '密码',
      label_email_code: '验证码',
      label_img_code: '图形验证码',
      btn_login: '登录',
      btn_register: '注册',
      btn_register_now: '立即注册',
      btn_email_code: '获取验证码',
      btn_conform: '确认',
      placeholder_email: '邮箱',
      placeholder_pwd: '请输入登录密码',
      placeholder_pwd_new: '请输入登录密码',
      tip_email_code_miss: '未收到验证码？',
      tip_empty: '{0}不能为空',
    },
    valid: {
      // 表单校验
      email_format: '邮箱格式不正确',
      pwd: '密码必须是8-16位至少两种字符类型（大写字母、小写字母、数字',
      ticket_require: '请输入邮箱验证码',
      ticket_length_6: '验证码必须为6位'
    },
    login: {
      // 登录表单
      title: '账号登录',
      allow_policy: '已阅读并同意{0}和{1}',
      user_agreement: 'Revopoint用户协议',
      privacy_policy: 'Revopoint隐私政策',
      plz_allow_policy: '请先阅读并同意隐私政策',
      success: '登录成功',
      failed: '账号密码错误',
      keep_pwd: '账号密码错误',
      forget_pwd: '忘记密码？'
    },
    register: {
      // 注册表单
      title: '账号注册',
      tip_region: '地区提交后不支持修改，请谨慎选择',
      has_account: '已有账号？'
    },
    forgetPassword: {
      // 忘记密码表单
      title: '忘记密码',
      placeholder_email: '可用于登录或找回密码',
      placeholder_new_pwd: '请重新设置登录密码'
    }
  }
}
