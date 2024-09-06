import { UserLogin } from "../../api/login";
import {getMineData} from "../../api/mine";

const userModule={
    namespaced: true,
    // 保存状态数据
    state: {
      token: null, // 存储用户登录得token
      userInfo: null, // 存储用户信息
    },
    getters:{
        token(state){
            return state.token
        },
        userInfo(state){
            return state.userInfo
        }
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token=token
        },
        SET_USERINFO(state,userInfo){
            console.log('yyy',userInfo)
            state.userInfo=userInfo
            console.log('userInfo', state.userInfo)
        }
    },
    actions:{
        // 异步登录逻辑  {account, password}
        async TestLogin(ctx, {account, password} ) {
            console.log('rest',account, password)
            const {token, status} = await UserLogin(account, password)
            // const result = await UserLogin(account, password)
            // 登录成功
            if (status === 200) {
              ctx.commit('SET_TOKEN', token)
      
              // 登录成功后，继续获取用户基本信息
              //每次页面刷新后，都要利用如果有token,就去获取用户信息
              const {userInfo} = await getMineData()
              console.log('userInfo', userInfo)
              ctx.commit('SET_USERINFO', userInfo)

              return true
            }
            return false
          },
    }
}

export default userModule;
