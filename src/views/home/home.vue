<template>
  <div id="home">
    <!-- 标题 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl1"
      v-show="isTabFixed"
      ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control  
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl2"
      ></tab-control>

      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
  
<script>
// 标题

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/tabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";


import { getHomeMultidata, getHomeGoods } from "network/home"; //default导出才可以去除大括号,网络请求的数据
import { debounce } from "common/until";
import { itemListenerMixin, backTopMixin} from 'common/mixin'
export default {
  name: "home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      //获取请求的数据
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemListener: null
    };
  },
  //赋值离开前页面的位置
  activated(){
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY, 0)
    
  },
  //离开路由时当前页面的位置
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY() 
    this.$bus.$off('itemImageLoad',this.itemListener)
  },

  created() {
    // 请求多个数据，轮播图和tabcontrol
    this.getHomeMultidata();
    //请求底部商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},

  methods: {
    // 事件监听方法tabcontroll当前状态设置
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex= index
      this.$refs.tabControl2.currentIndex = index
    },

    
    //图标显示隐藏
    contentScroll(position) {
      this.listenShopBack(position)
      this.isTabFixed = -position.y > this.taboffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    //获取tabcontrol到顶部的高度
    swiperImageLoad(){
     this.taboffsetTop =  this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>

<style scoped>
.home-nav {
  background-color: pink;
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
#home {
  
  height: 100vh;
  position: relative;
}



/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

</style>