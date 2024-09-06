<template>
  <div class="mine">
    <div style="display: flex;  align-items: center;">
      <img :src="img" alt="头像" width="50" height="50" style="border-radius: 50%; margin-left: 50px;margin-right: 10px;"/>
  <!-- <div>{{ userInfo }}</div> -->
   <div>
    <span>{{ userInfo.nickname }}</span>
   <div>{{ userInfo.phone }}</div>
   </div>
    </div> 
  </div>
</template>

<script>
function getImageUrl(name) {
  return new URL(`../../assets/${name}.png`, import.meta.url).href
}
export default {
  name: 'Mine',
  data() {
    return {
      img:getImageUrl('6')
    }
  },
  computed:{
    userInfo(){
      return this.$store.getters['user/userInfo']
    }
  },
  created() {
    console.log('created', this.$store.getters['user/token'])
  }
}
</script>

<style scoped>

</style>
