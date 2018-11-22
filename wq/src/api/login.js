import request from '@/utils/http'

/**
 * 登录
 * @param {*} param0 一个有username和password属性的对象
 */
export function login({username,password}) {
  return request({
    url: '/myapi/login',
    method: 'post',
    data:{username,password}
  })
}

/**
 * 获取用户信息
 * @param {*} token token令牌
 */
export function getUserInfo(token) {
  return request({
    url: '/myapi/getUserInfo',
    method: 'get',
    params: { token }
  })
}
/**
 * 退出登录
 * @param {*} token token令牌
 */
export function logout(token) {
  return request({
    url: '/myapi/logout',
    method: 'post',
    data:{token}
  })
}

