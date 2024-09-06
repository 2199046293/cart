import request from '../utils/request'

/**
 * 查询登录用户的服务端购物车数据
 * @returns 
 */
export const getServerCart = () => request.get('/api/carts')

/**
 * 将客户端浏览器中用户购物车数据与服务端进行同步
 */
export const setServerCart = cart => request({
  url: '/api/carts',
  method: 'PUT',
  data: {
    cart,
  }
})
