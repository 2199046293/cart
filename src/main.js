import { createApp } from 'vue'
// 引入 vant UI组件库
import Vant from 'vant'
// 引入 vant 样式文件
import 'vant/lib/index.css'

import App from './App.vue'
// 引入路由与状态仓库
import router from './router'
import store from './store'

// app.config.globalProperties
// 一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。
// 为了在组件中能够直接使用axios封装的实例，而不用重复冗余的import引入
// 可以利用 app.config.globalProperties 注册一个全局属性
import request from './utils/request'

const app = createApp(App)

// 在全局挂载一个 $http 属性，用于发送网络请求，该属性是封装后的 axios 实例
app.config.globalProperties.$http = request

app.use(Vant) // 使用 vant UI 组件库中所有组件
app.use(router) // 使用路由
app.use(store) // 使用状态仓库
app.mount('#app')
