<template>
  <div class="app">
    <header>
      <router-view name="header" />
    </header>
    <main class="content">
      <!-- <router-view /> -->
      <router-view v-slot="{ Component }">
        <keep-alive include="Home,Category,Cart,Mine">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <footer>
      <router-view name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>

<style>
/* 修改css样式变量，覆盖vant组件中的样式变量，定制主题 ,表示将root根目录，vite下的所有主色调变为红色，而不是蓝色*/
:root:root {
  --van-primary-color: red;
}

html, body, #app {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    flex: 1;
  }
}
</style>
