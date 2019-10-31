<template>
  <div id="detail">
    <detail-nav class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @itemImageLoad="itemImageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import DetailNav from "./DetailChild/DetailNav";
import DetailSwiper from "./DetailChild/DetailSwiper";
import DetailBaseInfo from "./DetailChild/DetailBaseInfo";
import DetailShopInfo from "./DetailChild/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./DetailChild/DetailGoodsInfo";
import DetailParamInfo from "./DetailChild/DetailParamInfo";
import DetailCommentInfo from "./DetailChild/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./DetailChild/DetailBottomBar";


import {getDetail,Goods,getRecommend,Shop,GoodsParam } from "network/detail";
import { debounce } from "common/until";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { mapActions } from 'vuex'

export default {
  name: "Detail",

  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
    
    
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      navYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },

  created() {
    //请求数据详情数据
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      const data = res.data.result;
      // 获取详情页轮播图图片
      this.topImages = data.itemInfo.topImages;
      //详情页标题信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //详情页店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取详情页展示图片
      this.detailInfo = data.detailInfo;
      // 获取详情页参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.data.list;
    });
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.navYs = [];
      this.navYs.push(0);
      this.navYs.push(this.$refs.param.$el.offsetTop + -44);
      this.navYs.push(this.$refs.comment.$el.offsetTop + -44);
      this.navYs.push(this.$refs.recommend.$el.offsetTop + -44);
      this.navYs.push(Number.MAX_VALUE);
    }, 500);
  },
  mounted() {},

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
  methods: {
    ...mapActions(['addCart']),
    //解决滚动问题
    itemImageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    //标题点击滚动到对应页面
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navYs[index], 100);
    },
    //根据滚动的页面位置，切换nav的选中状态
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.navYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          (i < length - 1 &&
            positionY >= this.navYs[i] &&
            positionY < this.navYs[i + 1])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.listenShopBack(position);
    },
    //获取购物车展示信息
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2将商品添加到购物车
      this.addCart(product).then(res => {
       this.$toast.show(res, 1000)
        
      })
      // this.$store.dispatch("addCart", product).then(res => {
      //   
      //    
      // });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  background-color: #ffffff;
  z-index: 9;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>>


