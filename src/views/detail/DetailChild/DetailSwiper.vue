<template>
  <div class="detail-swiper">
      <swiper class="swiper1">
          <swiper-item class="swiper-item" v-for="item in topImages" :key="item">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: 'DetailSwiper',
  components:{
      Swiper,
      SwiperItem
  },
  props:{
      topImages: {
          type: Array,
          defalut(){
              return []
          }
      }
  }
}
</script>

<style scoped>

.swiper1{
    height: 300px;
    
}
.swiper1 .swiper-item{
    text-align: center;
}
.swiper1 img{
    width: 250px;
}
  

</style>