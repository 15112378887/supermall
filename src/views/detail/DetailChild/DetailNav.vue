<template>
  <div>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
            </div>
        <div slot="center" class="detail" >
            <div class="detail-item" v-for="(item,index) in titles" :key="item" 
            :class="{active: currentIndex === index}" @click="itemClick(index)">
                {{item}}
            </div>
        </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNav",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  
  methods: {
      
      itemClick(index){
          this.currentIndex = index
          this.$emit('itemClick',index)
          
      },

      backClick(){
          this.$router.back()
      }
      
  }
};
</script>

<style scoped>
.detail{
    display: flex;
    font-size: 15px;
}
.detail-item{
    flex:1;
}
.active{
    color: #f98b9e;
}
.back img{
   margin-top: 12px;
}
</style>
