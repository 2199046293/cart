import { chain, remove } from "lodash"


/**
 * 定义 store 中的一个模块，专门用于处理购物车数据
 * 购物车数组中保存每件选购商品的对象信息: {id, title, image, price, amount, checked}
 */
const cartModule = {
    // 开启命名空间
    namespaced: true,
    // 保存状态数据
    state: {
      cart: [], // 保存所有购物车中的商品数据
      coupons:[]//保存优惠券的信息
    },
    // 计算值
    getters: {
      Testss(state){
        console.log('bibb',state.coupons)
        return state.coupons.reduce((sum,item)=>(item+sum),0)
      },
      // 购物车数组
      cart(state) {
        return state.cart
      },
      //获取用户的优惠卷的值
    
      // 勾选商品的总金额
      totalPrice(state) {
        const sumChecked=state.cart.reduce((sum,curr)=>(curr.checked?sum+curr.price*curr.amount:sum),0)
        return sumChecked*100
  
      },
      // 购物车中商品总数量
      totalAmount(state) {
        const count = state.cart.reduce((sum, curr) => sum + curr.amount, 0)
        return count > 99 ? '99+' : count
      },
      // 是否全选
      isAllChecked(state) {
        const allChecked = state.cart.every(prod => prod.checked)
        return allChecked
      
      },
      isHalfChecked(state) {
        // 计算选中商品的数量
        const count = state.cart.reduce((res, curr) => curr.checked ? res + 1 : res, 0)
        /*
        const count = state.cart.reduce((res, curr) => {
          if (curr.checked) {
            return res + 1
          }
          return res
        }, 0)
        */
        return count > 0 && count < state.cart.length
      },
      selectedItems(state){
        //找到所有勾选了的商品
       return state.cart.filter(prod => 
          prod.checked==true
        )
      },
    },
   
    // 同步更新状态数据的方法
    mutations: {
      /**
       * 选购商品加入购物车处理
       * 需要判断，如果购物车中已有当前选购的商品信息，则直接叠加其数量
       * 即可，如果购物车中不存在当前选购商品才将商品对象添加到购物车数组中保存
       * @param payload 当前选购商品对象
       */
      couponItem(state,payload){
        console.log('zheshiceshi',payload)
        state.coupons.push(payload) 
        console.log('zheshi',state.coupons)
      },
     
      // 初始化购物车
      init(state, payload) {
        state.cart = payload
      },
    
      
      addToCart(state, payload) {
        // 查询原购物车中是否存在当前选购的商品
        const goods = state.cart.find(prod => prod.id === payload.id)
        // 判断
        if(goods) { // 有商品已存在，则叠加数量即可
          goods.amount += payload.amount ?? 1
        } else { // 没有商品，则添加到数组中保存
          state.cart.push({
            ...payload,
            amount: payload.amount ?? 1, // 选购商品的数量，默认为1
            checked: true, // 是否在购物车中被选中（以便后续结算）
          })
        }
      },
       //删除购物车
        removeFromCart(state, id) {
      // 找到要删除的商品对象
       state.cart = state.cart.filter(prod => prod.id !== id)
    },
    //实现全选功能
      checkAll(state, checked) {
     state.cart.forEach((cart,index)=>{
        cart.checked = checked
     })
    },
    //勾选当前商品的复选框
      toggle(state, id) {
      //  !state.cart.find(prod => prod.id === payload).checked
    state.cart =state.cart.map((cart)=>{
        if(cart.id === id){
          cart.checked = !cart.checked
        }
        return cart
     })
    },
    //修改购物车的数量
    modifyAmount(state, payload) {
      state.cart = state.cart.map(goods => {
        if (goods.id === payload.id) {
          goods.amount = payload.amount
        }
        return goods
      })
    },
 
    },
    actions: {},
   
  }
  
  export default cartModule
  