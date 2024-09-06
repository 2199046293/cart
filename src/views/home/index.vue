<template>
  <div class="home" style="height: 3000px;background-color: #F5F5F5;">
    <!-- 头部搜索框结构 -->
    <van-sticky>
      <van-search
        shape="round"
        background="#F00"
        placeholder="请输入搜索关键词"
        @click-input="$router.push('/search')"
        show-action
      >
        <template #left>
          <van-icon name="fire-o" size="24" color="#FFF" style="margin-right: 12px;" />
        </template>
        <template #action>
          <div style="color: #FFF" @click="$router.push('/login')">登录</div>
        </template>
      </van-search>
    </van-sticky>

    <!-- 轮播图 -->
    <!-- 使用 vant 组件实现 -->
    <!-- <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" style="width: 100%; height: 100%;" />
      </van-swipe-item>
    </van-swipe> -->
    <!-- 利用安装的 swiper 库实现 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in banners" :key="banner.id">
            <img :src="banner.image" style="width: 100%; height: 100%;" />
          </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

    <!-- 专题按钮宫格布局结构 -->
    <van-grid :column-num="5">
      <van-grid-item
        v-for="item in grids"
        :key="item.path"
        :icon="item.icon"
        :text="item.title"
        :to="item.path"
      />
    </van-grid>
      <!-- 推荐几件商品 -->
    <div class="title">
        <span>秒杀({{ currPeriod }}:00场):</span>
        <!-- 显示倒计时时间 -->
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
      <!-- start -->
       <div class="second-kill">
        <div class="goods-list">
        <div
          class="goods-list-item"
          v-for="goods in secondKillGoods"
          :key="goods.id"
        >
          <img :src="goods.image" alt="" @click="$router.push('/detail?id=' + goods.id)">
         
          <span>￥{{ goods.price }}</span>
        </div>
      </div>
       </div>
       <!-- end -->
        <!-- 商品详情页 -->
        <van-divider :style="{ color: 'black', borderColor: '#1989fa', padding: '0 16px' ,fontSize:'18px' ,fontWeight:'bold' }">猜你喜欢</van-divider>

        <van-list
          v-model:loading="loading"
          :finished="isEnd"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <div class="recommend-goods">
         <div v-for="item in goodList" :key="item.id" @click="$router.push('/detail?id=' + item.id)">
          <img :src="item.image" alt="">
          <div class="title-container">{{ item.title }}</div>
          <span class="goods-price" style="color:#F00" >
            ￥{{ item.price }}
          </span>
          <span class="goods-origin-price" style="color: #999;text-decoration: line-through;">
            原价：￥{{ item.originPrice }}
          </span>
         </div>

    </div>
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->

</van-list>

<van-back-top bottom="10vh" offset="600" style="background-color:#F00"/>
        

 
  


  </div>
</template>

<script>
// import request from '../../utils/request'
// 引入 swiper 库及样式
import Swiper from 'swiper/swiper-bundle'
import 'swiper/swiper-bundle.css'

// 导入 API 方法
import { getHomeData } from '../../api/home'
import { getSpikeGoods } from '../../api/home'
import { getFeedsData } from '../../api/home'

/**
 * 定义一个辅助函数，用于获取组件中要使用到的图像资源
 */
function getImageUrl(name) {
  return new URL(`../../assets/${name}.png`, import.meta.url).href
}

export default {
  name: 'Home',
  data() {
    return {
      banners: [], // 轮播图数组
      grids: [ // 专题宫格数据
        {title: '优选超市', icon: getImageUrl('1'), path: '/a'},
        {title: '服饰美妆', icon: getImageUrl('2'), path: '/b'},
        {title: '数码3C', icon: getImageUrl('3'), path: '/c'},
        {title: '充值中心', icon: getImageUrl('4'), path: '/d'},
        {title: '优选会员', icon: getImageUrl('5'), path: '/e'},
      ],
      goodList: [], // 推荐商品列表数据
      // currentIndex:5,
      time:0,
      // 2 * 60 * 60 * 1000,
      currPeriod: 0, // 当前秒杀场次的小时数
      periods: [0, 8, 10, 14,  18, 24], // 保存每天各秒杀场次的小时数
      nextIndex: 0, // 推荐商品列表分页查询时，下一页数据起始索引
      isEnd: false, // 是否所有推荐商品的数据全部查询结束
      loading: false, // 是否正在加载更多商品数据中
      secondKillGoods:[]
      // 2 * 60 * 60 * 1000
   
    }
  },
  async created() {
    console.log('home created...')
    this.caclSecondKillTime()
//这是轮播图数据
    const {banners, items} = await getHomeData()
    console.log('成功:', banners)
    this.banners = banners
    this.isEnd = items.isEnd
    this.nextIndex = items.nextIndex
    this.goodList = items.list

   const {list}=await getSpikeGoods()
    console.log('成功了秒杀商品:', list)
    this.secondKillGoods = list
    // 这是猜你喜欢详情页
    
    const {list: feedsList} = await getFeedsData()
    console.log('成功了推荐商品:', feedsList)


    // 测试一下请求首页数据（axios二次封装的效果）
    // request({
    // this.$http({
    //   url: '/api/tab/1', // 请求资源的地址
    //   method: 'GET', // 请求方法
    //   // params: {}, // 通常是GET请求要传递的 URL 参数(查询字符串参数)
    //   // data: {}, // 通常是POST/PUT/DELETE等请求在请求主体中传递的数据
    // })
    //   .then(data => {
    //     console.log('全局挂载$http请求成功:', data)
    //   })
    //   .catch(err => {
    //     console.log('失败:', err)
    //   })

    // 要 new Swiper() 创建对象实例，需要使用到页面上已
    // 渲染的 DOM 节点才能创建成功并添加轮播效果，但 created
    // 生命周期钩子是在挂载前就被调用了，不能直接在 created()
    // 中获取到渲染后的 DOM 节点，可调用 this.$nextTick()
    // 将回调函数的执行进行延迟，延迟到下一次 DOM 更新结束后执行 
    this.$nextTick(() => {
      console.log('home nextTick...')
      // 创建 Swiper 对象实例
      new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: true,
        // effect: 'fade', // 淡入淡出轮播
        effect: 'cube',
        // effect: 'flip',
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
    })
  },
  methods:{
    caclSecondKillTime() {
      // 获取当前系统时间
      const currentTime = new Date()
      // 获取当前时间的小时数
      const currentHour = currentTime.getHours()
      // 查找出当前小时数落在哪两个秒杀场次范围内
      // 将下一次场次的小时数在数组中的元素下标返回
      //在periods数组中找到大于当前小时数的元素的下标，然后设置为nextIndex,
      const nextIndex = this.periods.findIndex(period => period > currentHour)
      // 设置当前场次小时数,设置当前场次为这次场次的下标在periods数组中的元素
      this.currPeriod = this.periods[nextIndex - 1]
      /* 计算倒计时时间毫秒值 */
      // 当前系统时间毫秒值
      const currMills = currentTime.getTime()
      // 修改日期时间对象中的小时分钟秒数和毫秒值，以算出下一场起始时间，设置当前时间为数组中下一场的时间
      currentTime.setHours(this.periods[nextIndex])
      currentTime.setMinutes(0)
      currentTime.setSeconds(0)
      currentTime.setMilliseconds(0)
      const nextMills = currentTime.getTime()
      // 计算两个毫秒差值，计算离下一个场次还有多少时间
      this.time = nextMills - currMills
    },
    async onLoad() {
      // 加载更多推荐商品数据,当触碰到当前页面的底部时，会触发 load 事件，触发 onLoad 方法，进行加载数据，当获取到的数据中的isEnd为true时，表示没有更多数据了，停止加载数据,会将list组件库中的finished属性设置为true，显示没有更多数据了的提示信息,
      const {list,isEnd,nextIndex} = await getFeedsData(this.nextIndex)
      this.goodList = [...this.goodList,...list]
      this.isEnd = isEnd
      this.nextIndex = nextIndex
      this.loading = false
    }
  },
  mounted() {
    console.log('home mounted...')
  },
}
</script>

<style lang="scss" scoped>
.title-container{
  margin-left: 8px; /* 调整间距 */
    max-width: 120px;
    // max-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
.swiper-container {
  width: 100%;
  height: 150px;
} 

.colon {
    display: inline-block;
    margin: 0 4px;
    color: #1989fa;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: large;
    text-align: center;
    border-radius: 20%;
    background-color: red;
  }
  .second-kill {
  .goods-list {
    display: flex;
    width: 100%;
    overflow-x: auto;

    &-item {
      display: flex;
      flex-direction: column;
      margin-right: 6px;

      img {
        width: 120px;
        height: 120px;
      }

      span {
        color: red;
        font-size: 18px;
        text-align: center;
        
      }
    }
  }
}
.recommend-goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img{
    width: 95%;
    height: 180px;
  }


}
</style>
