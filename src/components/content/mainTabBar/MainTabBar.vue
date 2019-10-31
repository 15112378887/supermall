<template>
  <tab-bar>
      <tab-bar-item path='/home' >
        <img slot="item-icon" src="~assets/img/tabbar/首页.png" alt="" >
        <img slot="item-icon-active" src="~assets/img/tabbar/首页2.png" alt="">
        <div slot='item-text'>首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category' >
        <img slot="item-icon" src="~assets/img/tabbar/分类.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/分类2.png" alt="">
        <div slot='item-text'>分类</div>
      </tab-bar-item>
      <tab-bar-item path='/cart' >
        <img slot="item-icon" src="~assets/img/tabbar/购物车.png" alt="">
        <img slot="item-icon-active" src="~/assets/img/tabbar/购物车2.png" alt="">
        <div slot='item-text'>购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile' >
        <img slot="item-icon" src="~assets/img/tabbar/用户.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/用户2.png" alt="">
        <div slot='item-text'>用户</div>
      </tab-bar-item>
    </tab-bar>
    
</template>

<script>

    import TabBar from 'components/common/tabbar/Tabbar.vue'
    import TabBarItem from 'components/common/tabbar//TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

.tab-bar{
  position: fixed;
}
  

</style>