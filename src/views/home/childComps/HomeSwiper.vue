<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id" >
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },

  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return{
      isLoad: false
    }
  },
  methods: {
    
    //设置图片加载次数为1次，提高性能
    swiperImageLoad() {
      if(!this.isLoad){
        //导出图片监听
        this.$emit("swiperImageLoad");
        this.isLoad = true
      }
      
    }
  }
};
</script>

<style scoped>
</style>