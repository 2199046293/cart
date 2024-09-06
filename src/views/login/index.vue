<template>
  <div class="login">
    <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="username"
      name="account"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      登录
    </van-button>
  </div>
</van-form>
<!-- 这是注册 -->
 <!-- < "/register">去注册</> -->
 <router-link to="/register">去注册</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '13438644406',
      password: '123456',
    }
  },
  methods:{
    async onSubmit(value) {
      // 调用 store 中的异步登录 action 方法，实现登录，并将登录成功的
      // token 及用户基本信息保存到 store 的 state 中
      //表单提交时，传给服务器的时候，服务器接收数据时通过表单元素的name属性来获取数据，所以这里的value就是表单的name属性值，所以name是服务器接收数据的依据，name设置为account和password，服务端接收的话，也应该是password和account，name属性值和服务器接收的数据的name属性值保持一致
      console.log('value',value)
      const result = await this.$store.dispatch('user/TestLogin', value)
      console.log('登录结果:', result)
      if (result) {
        // showSuccessToast('登录成功')
        // 登录成功，默认跳转到“我的”页面中
        // this.$router.push('/mine')
        this.$router.push(this.$route.query.redirect ?? '/mine')
      } else {
        showFailToast('用户名或密码错误!')
      }
    },
  }
}
</script>

<style scoped>

</style>
