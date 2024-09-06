<template>
  <div class="tab-bar">
    <van-tabbar route>
      <van-tabbar-item
        v-for="tab in tabs"
        :key="tab.path"
        :icon="tab.meta.icon"
        :badge="tab.meta?.isCart? totalAmount:''"
        :to="tab.path"
        replace
      >{{ tab.meta.title }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import routes from '../../router/routes'
import { mapGetters } from 'vuex'

export default {
  name: 'TabBar',
  data() {
    return {
      // active: 0,
    }
  },
  computed: {
   
    // 筛选出路由表中需要在 tabbar 上渲染的 tab 项路由信息
    tabs() {
      return routes.filter(route => route.meta?.inTabbar)
    },
    ...mapGetters('shoppingCart', ['totalAmount'])
  },
 
  
}
</script>

<style scoped>

</style>
