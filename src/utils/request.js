/**
 * 该文件中主要完成对 axios 进行二次封装
 */
import axios from 'axios'

// 引入 vant 的轻提示组件以备用
import { showLoadingToast, closeToast } from 'vant'
import store from '../store/index'

// 判断当前是开发环境还是生产环境，根据环境的不同，配置各自的 baseURL
// import.meta.env.MODE 环境变量中的模式: development表示开发模式, production表示生产模式
// const baseURL = import.meta.env.MODE === 'development' ? '开发环境使用到的baseURL' : '生产环境使用到的baseURL'

// 创建实例
const service = axios.create({
  baseURL: 'http://162.14.108.31:3000', // 基准URL路径
  timeout: 10000, // 超时时间
})

// 请求拦截
service.interceptors.request.use(config => {
  // 提示数据加载中...
  showLoadingToast({
    message: '加载中...',
    // forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  })

  // TODO: 统一在请求头中添加 token 认证字段的传递
  const token = store.getters['user/token']
  console.log('token:', token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 需要return配置对象config才能继续发起网络请求
  return config
}, error => {
  console.error('请求拦截失败:', error)
  // 关闭轻提示效果
  closeToast(true)
})

// 响应拦截
service.interceptors.response.use(response => {
  // 响应返回，则关闭轻提示效果
  closeToast(true)

  // 根据响应对象中的 http 状态码进行判断
  if (response.status >= 200 && response.status < 300) {
    // 请求成功，获取后端响应返回的数据
    const responseData = response.data
    // 对响应的数据统一进行规范格式处理
    // 后端统一返回数据的格式规范为: {code, message, data}
    // code 为 200 时表示成功，则从 data 中可获取成功的业务数据
    const { code, message, data } = responseData
    if (code === 200) {
      return data
    }
    // 当返回的 code 不为 200 时，返回一个 rejected 状态的 Promise 对象
    return Promise.reject(new Error(message))
  }
}, error => {
  console.error('响应拦截失败,', error)
  // 关闭轻提示效果
  closeToast(true)
})

export default service
