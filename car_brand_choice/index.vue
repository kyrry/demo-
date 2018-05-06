
<template>
  <div class="car_brand_choice_page">
    <div class="header"><app-header title="车辆选择"></app-header></div>
      <div class="car_select_right" >
          <a @click="scrollToByTag(item)" v-for="item in workList" >{{item}}</a>
      </div>
      <scroller
      ref="my_scroller">
      <div class="car_select_content">
       <div class="car" v-for="(item, idx) in workList">
         <p><a class="tag" :id="item">{{item}}</a></p>
          <div class="car_list" v-for="(i, ix) in rankList[idx]">
            <p  @click="confirm(i)" :class="{ 'selectA': i.id == formData.goodsId }"><img class="logo" :src="i.logo" alt="" />{{i.name}}</p>
         </div>
       </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
