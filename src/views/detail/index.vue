<template>
  <div class="detail" style="background-color: #F5F5F5;">
  
      <!-- start -->
      <van-swipe :autoplay="3000" lazy-render>
     <van-swipe-item v-for="image in detail.photo" :key="image.id">
      <img :src="image.url" style="width: 100%; height: 100%;" />
  </van-swipe-item>
</van-swipe>
<div>
  <span style="color:red;font-size: large;;">￥{{ detail.price }}</span>
  <span style="margin-left: 10px;text-decoration: line-through;color:#CCCCCC;font-style: oblique;">原价：{{ detail.originPrice }}</span>
  <div style="color:black;font-size: 20px;margin-top: 5px;">{{ detail.title }}</div>
  <div style="color:#666666;font-size: 14px;margin-top: 12px;">{{ detail.title }}</div>
</div>
<!-- 商品tab栏 -->
<van-tabs v-model:active="activeName">
  <van-tab title="商品介绍" name="a">
    <van-list
          v-model:loading="loading"
          :finished="isEnd"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <div class="cart-detail">
          <div v-for="image in detail.photo" :key="image.id">
            <img :src="image.url" alt="图片详情" style="width: 100%;" />
          </div>
        </div>
    </van-list>
  </van-tab>
  <van-tab title="售后保障" name="b">
    <div data-v-e2e044e2="" class="detail-content promise"><div data-v-e2e044e2="" id="detServer"> 本商品质保周期为1年质保，在此时间范围内可提交维修申请，具体请以厂家服务为准。 <p data-v-e2e044e2="">您可以查询本品牌在各地售后服务中心的联系方式</p><p data-v-e2e044e2="">售后服务电话：400-88-88888</p><p data-v-e2e044e2="">品牌官方网站： <a data-v-e2e044e2="" target="_blank" href="http://www.bing.com/">http://www.bing.com/</a></p></div><div data-v-e2e044e2="" role="separator" class="van-divider van-divider--hairline van-divider--content-center">服务承诺</div><div data-v-e2e044e2="" id="serverPromise"> 天天优选向您保证所售商品均为正品行货，开具机打发票或电子发票。 凭质保证书及商城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证，请您放心购买！ <br data-v-e2e044e2=""><p data-v-e2e044e2=""> 注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、 产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p></div><div data-v-e2e044e2="" role="separator" class="van-divider van-divider--hairline van-divider--content-center">权利声明</div><div data-v-e2e044e2=""> 天天优选上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是商城重要的经营资源，未经许可，禁止非法转载使用。 <p data-v-e2e044e2=""><b data-v-e2e044e2="">注：</b>本站商品信息均来自于厂商，其真实性、准确性和合法性由信息拥有者（厂商）负责。本站不提供任何保证，并不承担任何法律责任。</p></div></div>
  </van-tab>
 
</van-tabs>
<!-- 商品图 -->

<!-- 加入购物车 -->
<van-action-bar>
  <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
  <van-action-bar-icon icon="cart-o" text="购物车" @click="$router.push('/cart')" :badge="totalAmount"/>
  <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
  <van-action-bar-button @click="addCart" type="warning" text="加入购物车" />
  <van-action-bar-button type="danger" text="立即购买" />
</van-action-bar>

       <!-- end -->
   
    
    <!-- 这个是商品详情页 -->
 
   
  </div>
</template>

<script>
import { getDetail } from '../../api/detail';
import { showSuccessToast } from 'vant';
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      detail:{},
      currGoods:{}
    }
  },
  computed: {
    ...mapGetters('shoppingCart', ['totalAmount'])

  },
  methods:{
    addCart(){
      const {id, title, image, price} = this.detail
      const currGoods = {
        id,
        title,
        image,
        price,
      }
      this.$store.commit('shoppingCart/addToCart', currGoods)
      showSuccessToast('加入购物车成功');

    }
  },
 async created(){
  const {detail} = await getDetail(this.$route.query.id);
  console.log(detail)
  // console.log(detail.photo)
  this.detail =detail;  
  console.log(this.detail.price)
  }
  
}
</script>

<style scoped>

</style>
