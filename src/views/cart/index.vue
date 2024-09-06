<template>
  <div class="cart">
    <!-- 购物车 -->
    <van-swipe-cell
    v-for="goods in cart"
      :key="goods.id"
      >
    <van-card
      :num="goods.amount"
      class="goods-card"
      :price="goods.price"
      :title="goods.title"
      :thumb="goods.image">
     <template #num>
       <van-stepper
        :modelValue="goods.amount"
        theme="round"
        @change="handleAmountChange($event, goods.id)"
        button-size="16" />
      </template>
      <template #thumb>
        <div style="display: flex;">
          <van-checkbox 
              :modelValue="goods.checked"
              checked-color="#ee0a24"
              @click.stop="toggle(goods.id)"
          />
          <img :src="goods.image" alt="商品图片" width="78%" height="100%" @click="$router.push('/detail?id=' + goods.id)"/>
        </div>
      </template>
  </van-card>

  <template #right>
       <van-button square text="删除" type="danger" class="delete-button" @click="removeFromCart(goods.id)" />
    </template>
  </van-swipe-cell>

  <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
  <van-checkbox
   :modelValue="isAllChecked"
   @click="checkAll(!isAllChecked)">全选</van-checkbox>
  <template #tip>
    你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
  </template>
</van-submit-bar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {
    }
  },
  computed: {
    //  :indeterminate="isHalfChecked"
    ...mapGetters('shoppingCart', ['cart', 'totalPrice', 'isAllChecked','totalAmount','isHalfChecked'])
  },
  methods:{
    ...mapMutations('shoppingCart', ['checkAll',  'toggle','removeFromCart','modifyAmount']),
    handleAmountChange(amount,id){
      console.log('handleAmountChange')
      this.modifyAmount({id,amount})
    },
    onSubmit(){
      this.$router.push('/confirmCart')

    }

  },
  created(){
    console.log('testccc',this.toggle)
  }
}
</script>

<style lang="scss" scoped>
 .goods-card {
    margin: 0;
    background-color: white;
  }
  .delete-button {
    height: 100%;
  }
  .van-submit-bar{
    bottom: 50px;
  }

</style>
