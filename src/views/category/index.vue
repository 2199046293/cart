<template>
  <div class="category">
    <!-- 商品分类 const onChange = (index) => showToast(`标签名 ${index + 1}`); -->
    <van-sidebar v-model="active" @change="onChange">
    <van-sidebar-item v-for="item in categories" :key="item.id" :title="item.name" />
</van-sidebar>

<!-- <van-grid :column-num="3">
  <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
</van-grid> -->
<div class="right" @click="$router.push('/detail')">
  <van-grid :border="false">
        <van-grid-item
          v-for="sub in subCategories"
          :key="sub.id"
          :icon="sub.imageUrl"
          :text="sub.title"
        >
          <template #icon>
            <van-image :src="sub.imageUrl" width="32" height="32">
              <template v-slot:error>加载失败</template> 
             </van-image> 
          </template>
        </van-grid-item>
      </van-grid>

</div>
      
  </div>
</template>

<!-- 查看当前分类下得数据 -->


<script>
import { method } from 'lodash';
import {getCategories} from '../../api/Categories.js'
import { getSubCategories } from '../../api/subCategories.js'
export default {
  name: 'Category',
  data() {
    return {
      active: 0,
      // selected: 0,
      categories: [],
      products_id: [],
      subCategories:[]
    }
  },
  methods:{
   async onChange(index){
     
     console.log('切换',index,this.action)
     const {categories}=await getSubCategories(this.categories[index].id)
     console.log('这是子分类数据',categories)
     this.subCategories=categories
      // this.selected=index
      // return index
    },
    //总查询分类数据
   async findAllCategories(){
      const {list}=await getCategories()
      // console.log('切换',index,this.action)
      console.log('这是总分类数据',list)
      this.categories=list
      this.onChange(0)

    }
  
    // const onChange = (index) => showToast(`标签名 ${index + 1}`);
  },
   created() {
    this.findAllCategories()
    
}
}

</script>

<style scoped>
.category {
  display: flex;

  .right {
    flex: 1;
    padding: 6px;
  }
}

</style>
