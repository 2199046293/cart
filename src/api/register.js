import request from '../utils/request'

/**
 * 验证手机号
 */
export const verifyPhone = phone => request.get('/api/users/' + phone)

/**
 * 根据手机号码查询获取验证码
 */
export const fetchCode = phone => request.get(`/api/users/${phone}/code`)

/**
 * 校验验证码
 */
export const verifyCode = (phone, code) => request.get(`/api/users/${phone}/verifycode?code=${code}`)

/**
 * 用户注册 手机号+密码
 */
export const register = (phone, password) => request({
  url: '/api/users/register',
  method: 'POST',
  data: {
    phone,
    password,
  },
})
