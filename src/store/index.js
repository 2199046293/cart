import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import cartModule from './module/index.js'
import userModule from './module/user.js'
import cartPlugin from './plugins/cart'
// 创建仓库对象
const store = createStore({
  strict: true,
  plugins: [
    createPersistedState({
    paths:['user.token','shoppingCart.cart','user.userInfo'],
    storage: sessionStorage,
  }),
  cartPlugin
],
  modules: {
    shoppingCart: cartModule, // 在 cartModule 中开启了命名空间，则其命名空间名称为 shoppingCart
    user:userModule
  },
})
// 导出
export default store
