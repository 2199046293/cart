import { setServerCart, getServerCart } from '../../api/cart'

const cartPlugin = store => {
  // 当 store 初始化后调用
  // subscribe(callback) 用于订阅每次 mutation 的提交,
  // 在每次 mutation 提交之后调用 callback 回调函数执行
  store.subscribe(async(mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    // console.log('提交mutation:', mutation, state)
    // 提交的 mutation 类型
    const {type} = mutation
    // console.log('提交的mutation类型:', type, state)
    if (type.startsWith('shoppingCart/') && type !== 'shoppingCart/init') { // 满足这个条件，说明提交的 mutation 是操作购物车的
      const {cart} = state.shoppingCart
      // console.log('修改后的购物车:', cart)
      const result = await setServerCart(cart)
      console.log('同步结果:', result)
    }
  })

  // 当用户登录成功后，将登录成功用户的购物车数据查询出来，保存到 store 中
  store.subscribe(async (mutation, state) => {
    const {type} = mutation
    if (type === 'user/SET_TOKEN') {
      if (state.user.token) {
        const {cart} = await getServerCart()
        store.commit('shoppingCart/init', cart)
      }
    }
  })
}

export default cartPlugin