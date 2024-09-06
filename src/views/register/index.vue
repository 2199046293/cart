<template>
  <div class="register">
    <!-- 步骤条 -->
    <van-steps :active="active">
      <van-step>验证手机号</van-step>
      <van-step>发送验证码</van-step>
      <van-step>用户注册</van-step>
      <van-step>完成注册</van-step>
    </van-steps>

    <!-- 各步骤对应使用到的表单 -->
    <van-form v-if="active < 3">
      <!-- 手机号字段，每步都有 -->
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号码"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </van-cell-group>
      <!-- 第二步：获取并输入验证码 -->
      <van-cell-group inset v-if="active === 1">
        <van-field
          v-model="code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click="getCode"
              :disabled="this.time !== 0"
            >发送验证码{{ this.time !== 0 ? '('+ this.time +')' : '' }}</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 第三步：填写密码注册 -->
      <van-cell-group inset v-if="active === 2">
        <van-field
          v-model="password"
          name="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
      </van-cell-group>

      <div style="margin: 16px;">
        <!-- 第一步按钮 -->
        <van-button round block type="primary" @click="verifyPhone" v-if="active === 0">
          验证手机号
        </van-button>
        <!-- 第二步按钮 -->
        <van-button round block type="primary" @click="verifyCode" v-if="active === 1">
          下一步
        </van-button>
        <!-- 第三步按钮 -->
        <van-button round block type="primary" @click="handleRegister" v-if="active === 2">
          注册
        </van-button>
      </div>
    </van-form>

    <!-- 注册成功的提示 -->
    <div class="success" v-else>
      恭喜您, 注册成功!
      <router-link to="/login">去登录</router-link>
    </div>

  </div>
</template>

<script>
import { showFailToast, showSuccessToast } from 'vant'
import { verifyPhone, fetchCode, verifyCode, register } from '../../api/register'

export default {
  name: 'Register',
  data() {
    return {
      active: 0, // 步骤索引，从0开始
      phone: '17788990099', // 手机号
      code: '', // 验证码
      password: '', // 密码
      time: 0, // 发送验证码按钮点击倒计时效果
    }
  },
  methods: {
    /**
     * 验证手机号
     */
    async verifyPhone() {
      // 发送网络请求，验证手机号码
      const {status, message} = await verifyPhone(this.phone)
      console.log('{status}:', {status})
      // 判断是否存在当前手机号，业务数据中有 status 状态码
      // 如果 status 为 200 表示服务端有保存该手机号信息，说明已被注册，
      // status 为 404 表示未被注册
      if (status === 200) {
        showFailToast({
          message
        })
        return
      }
      this.active += 1
    },
    /**
     * 获取验证码
     * 在点击“发送验证码”按钮后，10s内不允许再次点击按钮，
     * 开启一个计时器计时10s
     */
    async getCode() {
      // 设定10s倒计时
      this.time = 120
      // 启动定时器
      this.timerSendCode = setInterval(() => {
        this.time -= 1
        if (this.time <= 0) {
          clearInterval(this.timer)
        }
      }, 1000)

      const result = await fetchCode(this.phone)
      console.log('验证码：', result)
      this.code = result.code
      showSuccessToast({
        message: '验证码:' + result.code,
      })
    },
    /**
     * 验证码校验
     */
    async verifyCode() {
      const {status, message} = await verifyCode(this.phone, this.code)
      console.log('校验结果:', {status, message})
      if (status === 200) {
        this.active += 1
        return
      }
      showFailToast({
        message,
      })
    },
    /**
     * 注册
     */
    async handleRegister() {
      const {status, message} = await register(this.phone, this.password)
      console.log('注册结果,', {status, message})
      if (status === 200) {
        this.active += 1
        this.timerJumpToLogin = setTimeout(() => {
          this.$router.push('/login')
        }, 5000)
        return
      }
      showFailToast(message)
    },
  },
  // 在组件卸载时，清理之前开启的定时器任务
  beforeUnmount() {
    console.log('清理资源...')
    clearInterval(this.timerSendCode)
    clearTimeout(this.timerJumpToLogin)
  },
}
</script>

<style scoped>

</style>
