export default {
  global: {
    btn__conform: 'Confirm',
    btn__cancel: 'Cancel',
    loading: 'Loading...',
    placeholder: 'Please enter {0}',
  },
  pages: {
    menu__userinfo: 'Personal Information',
    menu__account: 'Account & Security',
  },
  login: {
    // 注册流程公用
    label__region: 'Region',
    label__email: 'Email',
    label__password: 'Password',
    label__email_code: 'Verification Code',
    label__img_code: 'Captcha',
    btn__login: 'Sign in',
    btn__register: 'Register',
    btn__register_now: 'Register Now',
    btn__email_code: 'Send Verification Code',
    placeholder__email: '',
    placeholder__pwd: 'Please enter your login password',
    placeholder__pwd_new: 'Please enter a new password',
    tip__email_code_miss: 'Didn\'t receive the verification code?',
    tip__empty: '{0} cannot be empty',
    tip__password: 'Your password must be 8-16 characters and include at least 2 of the following: uppercase letters, lowercase letters, or numbers.',
    toast__code_send: '',
    // 表单校验
    valid__email_format: 'Incorrect email format',
    valid__ticket_require: 'Please enter the e-mail verification code',
    valid__ticket_length_6: 'Verification code must be 6 digits',
    // 登录表单
    title__login: 'Account Login',
    allow_policy: 'Have read and agreed to {0} and {1}',
    user_agreement: 'Revopoint User Agreement',
    privacy_policy: 'Revopoint Privacy Policy',
    plz_allow_policy: 'Please read and agree to the privacy policy',
    msg__success: 'Login Successful',
    failed: 'Password error',
    keep_pwd: 'Remember my password',
    forget_pwd: 'Forgot your password?',
    // 注册表单
    title__register: 'Register',
    has_account: 'Already have an account?',
    tip__region: 'Please choose your region carefully as it can\'t be changed after submission.',
    toast__register_success: '',
    placeholder__region: 'Select a region',
    // 忘记密码表单
    title__forget_password: 'Forgot Password',
    toast__reset_password_success: '',
    placeholder_email: 'It can be used to log in or reset your password.',
    placeholder_new_pwd: 'Reset your password',
    back_to_login: 'Back to Login',
  },
  account: {
    logout: 'Log out',
    user_id: 'User ID',
    valid__password_not_same: 'Passwords don\'t match',
    valid__password_same: '',
    old_password: 'Old password',
    new_password: 'New password',
    placeholder__password_again: 'Re-enter the new password',
    placeholder__delete_account: 'Enter your password',
    change_password: 'Change password',
    delete_account: 'Logout',
    logout_success: 'Logout Successful',
    update_password_success: '',
    logout_is_sure: 'Confirm log out?',
  }
}
