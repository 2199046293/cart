import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// 创建路由对象实例
const router = createRouter({
  history: createWebHistory(), // 路由模式: createWebHistory()是h5路由模式, createWebHashHistory()是hash路由模式
  routes, // 静态路由表的配置
})

// 导出
export default router
