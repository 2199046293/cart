<template>
  <div class="edit-address">
    <van-address-edit
  :area-list="areaList"
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>

    
  </div>
</template>

<script>
export default {
  name: 'editAddress',
  data() {
    return {
        searchResult: [],  
    }
  },
  methods:{
    onSave() {  
      showToast('save');  
    },  
    onDelete() {  
      showToast('delete');  
    },  
    onChangeDetail(val) {  
      if (val) {  
        this.searchResult = [  
          {  
            name: '黄龙万科中心',  
            address: '杭州市西湖区',  
          },  
        ];  
      } else {  
        this.searchResult = [];  
      }  
    },  
  }
}
</script>

<style scoped>

</style>
