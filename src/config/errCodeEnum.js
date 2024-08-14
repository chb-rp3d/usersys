// 请求错误枚举
// TODO: 如果后续项目扩展，改装成TS
export const ENUM_BAD_REQUEST = 400 // 请求不正确
export const ENUM_UNAUTHORIZED = 401 // 账号未登录
export const ENUM_FORBIDDEN = 403 // 没有该操作权限
export const ENUM_NOT_FOUND = 404 // 没有此资源
export const ENUM_METHOD_NOT_ALLOWED = 405 // 请求方法不正确
export const ENUM_PARAM_ERROR = 406 // 接口参数不正确
export const ENUM_TOO_MANY_REQUESTS = 429 // 请求过于频繁，请稍后重试
export const ENUM_THIRD_SERVICE_BUSY = 501 // 第三方服务繁忙
export const ENUM_INTERNAL_SERVER_ERROR = 500 // 系统错误
export const ENUM_SERVICE_UNAVAILABLE = 503 // 服务不可用
export const ENUM_UNKNOWN = 999 // 未知错误
export const ENUM_ACCOUNT_NOT_FOUND = 101001 // 账户不存在
export const ENUM_CAPTCHA_ERROR = 102001 // 人机验证码错误
export const ENUM_EMAIL_VERIFY_CODE_ERROR = 102002 // 邮箱验证码错误
export const ENUM_EMAIL_ALREADY_EXIST = 103001 // 邮箱已存在
export const ENUM_EMAIL_NO_EXIST = 103002 // 邮箱未注册
export const ENUM_EMAIL_ILLEGAL = 103003 // 邮箱不合法
export const ENUM_PASSWORD_NOT_STRONG = 103004 // 密码强度不够
export const ENUM_EMAIL_TICKET_ERROR = 103005 // 邮箱验证码不正确
export const ENUM_COUNTRY_NOT_MATCH = 103006 // 正确见data
export const ENUM_OLD_PASSWORD_ERROR = 103007 // 旧密码不正确
export const ENUM_PASSWORD_ERROR = 104001 // 用户名或密码错误
export const ENUM_ACCOUNT_FORBIDDEN = 104002 // 此账号已被禁用
export const ENUM_ACCOUNT_UNREGISTER = 104003 // 此账号已注销
export const ENUM_TEMP_TOKEN_EXPIRE = 104004 // 临时token不存在或已过期
export const ENUM_REFRESH_TOKEN_EXPIRE = 104005 // refreshToken不存在或已过期
export const ENUM_PASSWORD_ERROR_TOO_MANY = 104006 // 密码错误次数过多

export const ERROR_CODE_ENUM = {
  200: 'Success', // 请求成功
  400: 'BAD_REQUEST', // 请求不正确
  401: 'UNAUTHORIZED', // 账号未登录
  403: 'FORBIDDEN', // 没有该操作权限
  404: 'NOT_FOUND', // 没有此资源
  405: 'METHOD_NOT_ALLOWED', // 请求方法不正确
  406: 'PARAM_ERROR', // 接口参数不正确
  429: 'TOO_MANY_REQUESTS', // 请求过于频繁，请稍后重试
  501: 'THIRD_SERVICE_BUSY', // 第三方服务繁忙
  500: 'INTERNAL_SERVER_ERROR', // 系统错误
  503: 'SERVICE_UNAVAILABLE', // 服务不可用
  999: 'UNKNOWN', // 未知错误
  101001: 'ACCOUNT_NOT_FOUND', // 账户不存在
  102001: 'CAPTCHA_ERROR', // 人机验证码错误
  102002: 'EMAIL_VERIFY_CODE_ERROR', // 邮箱验证码错误
  103001: 'EMAIL_ALREADY_EXIST', // 邮箱已存在
  103002: 'EMAIL_NO_EXIST', // 邮箱未注册
  103003: 'EMAIL_ILLEGAL', // 邮箱不合法
  103004: 'PASSWORD_NOT_STRONG', // 密码强度不够
  103005: 'EMAIL_TICKET_ERROR', // 邮箱验证码不正确
  103006: 'COUNTRY_NOT_MATCH', // 	国家码与数据区不匹配正确见data
  103007: 'OLD_PASSWORD_ERROR', // 旧密码不正确
  104001: 'PASSWORD_ERROR', // 用户名或密码错误
  104002: 'ACCOUNT_FORBIDDEN', // 此账号已被禁用
  104003: 'ACCOUNT_UNREGISTER', // 此账号已注销
  104004: 'TEMP_TOKEN_EXPIRE', // 临时token不存在或已过期
  104005: 'REFRESH_TOKEN_EXPIRE', // refreshToken不存在或已过期
  104006: 'PASSWORD_ERROR_TOO_MANY' // 密码错误次数过多
}
