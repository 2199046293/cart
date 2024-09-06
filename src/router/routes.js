/**
 * 这个文件模块中专门进行路由表配置
 */
import { AddressList } from 'vant'
import NavBar from '../components/nav-bar/index.vue'
import TabBar from '../components/tab-bar/index.vue'

// 路由懒加载的写法
const Home = () => import('../views/home/index.vue')
const Login = () => import('../views/login/index.vue')
const Cart = () => import('../views/cart/index.vue')
const Category = () => import('../views/category/index.vue')
const Mine = () => import('../views/mine/index.vue')
const Search = () => import('../views/search/index.vue')
const NotFound = () => import('../views/not-found/index.vue')
const Detail = () => import('../views/detail/index.vue')
const Register=() => import('../views/register/index.vue')
const ComfirmCart=()=>import('../views/confirmCart/index.vue')
const Address=()=>import('../views/address/address.vue')
const editAddress=()=>import('../views/address/editAddress.vue')

// 路由表数组配置
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    components: {
      default: Home,
      footer: TabBar,
    },
    meta: { // 路由元信息
      title: '首页',
      icon: 'wap-home-o',
      inTabbar: true, // 标记当前路由需要作为 tabbar 中的 tab项渲染
    },
  },
  {
    path: '/category',
    components: {
      header: NavBar,
      default: Category,
      footer: TabBar,
    },
    meta: {
      title: '分类',
      icon: 'list-switching',
      inTabbar: true,
    }
  },
  {
    path: '/cart',
    components: {
      header: NavBar,
      default: Cart,
      footer: TabBar,
    },
    meta: {
      title: '购物车',
      icon: 'shopping-cart-o',
      isCart: true, // 标记当前路由需要作为 tabbar 中的 tab项渲染
      inTabbar: true,
    },
  },
  {
    path: '/mine',
    components: {
      header: NavBar,
      default: Mine,
      footer: TabBar,
    },
    meta: {
      title: '我的',
      icon: 'user-o',
      inTabbar: true,
    },
  },
  {
    path: '/login',
    components: {
      header: NavBar,
      default: Login,
    },
    meta: {
      title: '用户登录',
    },
  },
  {
    path: '/search',
    components: {
      header: NavBar,
      default: Search,
    },
    meta: {
      title: '搜索',
    },
  },
  {
    path: '/detail',
    components: {
      header: NavBar,
      default: Detail,
    },
    meta: {
      title: '商品详情',
    },
  },
  {
    path:'/register',
    components: {
      header:NavBar,
      default:Register,
    },
    meta:{
      title:'用户注册'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
  {
    path:'/confirmCart',
    components: {
      header: NavBar,
      default: ComfirmCart,
    },
    meta:{
      title:'确认订单'
    }
  },
  {
    path:'/address',
    components:{
      header:NavBar,
      default:Address
    },
      meta:{
        title:'收货地址'
      }
  },
  {
    path:'/editAddress',
    components:{
      header:NavBar,
      default:editAddress
    },
    meta:{
      title:'编辑地址'
    }
  }
]

export default routes
