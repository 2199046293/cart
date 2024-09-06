<template>
  <div class="nav-bar">
    <van-nav-bar
      :title="$route.meta?.title"
      :left-text="!$route.meta?.inTabbar ? '返回' : ''"
      :left-arrow="!$route.meta?.inTabbar"
      @click-left="$router.back()"
    >
      <template #right>
        <van-popover
          v-model:show="showPopover"
          :actions="actions"
          placement="bottom-end"
        >
          <template #reference>
            <van-icon name="ellipsis" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      showPopover: false,
      actions: [
        {text: '首页', icon: 'home-o', path: '/home'},
        {text: '购物车', icon: 'cart-o', path: '/cart'},
        {text: '我的订单', icon: 'orders-o', path: '/orders', disabled: true},
        {text: '个人中心', icon: 'contact-o', path: '/mine'},
      ],
    }
  },
  methods: {
    onSelect(action) {
      console.log('action:', action)
      this.$router.replace(action.path)
    },
  },
}
</script>

<style scoped>

</style>
