<template>
    <div class="confirmCart">
      <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
      确认订单商品
      <van-swipe-cell
        v-for="goods in selectedItems"
        :key="goods.id"
      >
        <van-card
          :num="goods.amount"
          class="goods-card"
          :price="goods.price"
          :title="goods.title"
          :thumb="goods.image"
        >
          <template #thumb>
            <div style="display: flex;">
              <img :src="goods.image" alt="商品图片" style="width: 78%; height: 100%;" @click="$router.push('/detail?id=' + goods.id)" />
            </div>
          </template>
        </van-card>
      </van-swipe-cell>
      <!-- 商品金额 -->
      <van-cell-group>
        <van-cell title="商品金额" :value="totalPrice * 0.01" />
        <van-cell title="运费" value="0" />
      </van-cell-group>
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <!-- 优惠券列表 -->
      <van-popup
        v-model:show="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px;"
      >
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
      <!-- 支付按钮 -->
      <van-submit-bar :price="Due" button-text="去支付" @submit="onSubmit" />

    </div>
  </template>
  <script>
  import { mapGetters,mapMutations } from 'vuex';

  export default {
    name: 'ConfirmCart',
    data() {
      return {
        tel: '13438644406',
        name: '蒋婧雯',
        test:0,
        spanText:0,
        coupons: [  
        {  
          available: 1,  
          condition: '无门槛\n最多优惠12元',  
          reason: '',  
          value: 150,  
          name: '优惠券名称',  
          startAt: 1489104000,  
          endAt: 1514592000,  
          valueDesc: '1.5',  
          unitDesc: '元',  
        },  
        {  
          available: 1,  
          condition: '满100元可用',  
          reason: '',  
          value: 100,  
          name: '满减券',  
          startAt: 1489104000,  
          endAt: 1514592000,  
          valueDesc: '1.0',  
          unitDesc: '元',  
        },  
        // Add more coupons as needed  
      ],  
      showList: false,  
      chosenCoupon: null,  
    };  
  },  
    computed: {
      ...mapGetters('shoppingCart', ['cart', 'totalPrice', 'isAllChecked', 'totalAmount', 'isHalfChecked', 'selectedItems','Testss']),
      Due(){
        console.log('cccc',this.totalPrice*0.01 - this.Testss)
        return (this.totalPrice*0.01 - this.Testss)*100
      }
    },
    methods: {
        ...mapMutations('shoppingCart',['couponItem']),
    onSubmit(){
       console.log('点击了去支付按钮')
    },
      onEdit() {
        console.log('编辑');
        this.$router.push('/address');
      },
      onChange(index) {  
      this.chosenCoupon = index;  
      console.log(this.chosenCoupon.value)
     this.test=(this.coupons[index].valueDesc)
     this.test=parseFloat(this.test)
     this.couponItem(this.test)
     console.log('test',this.test)
      this.showList = false;  
    },  
    onExchange(code) {  
      // Logic to exchange coupon using the code  
      console.log(`Exchanging coupon with code: ${code}`);  
    },  
    },
    created(){
       console.log('///,'+this.Testss)
       console.log('///,'+this.cart) 
    }
   
  };
  </script>
