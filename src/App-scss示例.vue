<template>
  <div class="app">
    <header>
      <router-view name="header" />
    </header>
    <main class="content">
      <div class="content-title">
        <div class="content-title__icon">图标</div>
        <div class="content-title__text">.x样式</div>
      </div>
      <div class="content-body">.x样式</div>
      <div class="content-footer">.x样式</div>
      <router-view />
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
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
$font-base: 14px;
$font-normal: 16px;
$font-biger: 18px;

.app {
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    flex: 1;

    &-title { // .content-title
      font-size: $font-base;

      &__icon {
        font-size: $font-base * 2;
      }
      &__text {
        font-size: $font-base;
      }
    }
    &-body {
      font-size: $font-normal
    }
    &-footer {
      font-size: $font-biger;
      font-weight: 700;
    }
  }
}
</style>
