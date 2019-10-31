<template>

    <div class="tab-bar-item" @click="itemClick">
          <div v-if="!isActive"><slot  name='item-icon'></slot></div>
          <div v-else> <slot name='item-icon-active'></slot></div>
          <div :style="activeStyle"><slot  name='item-text'></slot></div>
    </div>
    
</template>

<script>

export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff6580'
    }
  },
  data(){
    return{
      
    }
  },
  

  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  

  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  }
  
}
</script>

<style scoped>
    .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    color: #9e9999;
    font-size: 15px;
    margin-top: 3px;
  }
    .tab-bar-item img{
        height: 26px;
        width: 26px;
        vertical-align: middle;
        padding-bottom: 3px;
    }
    .active{
      color: pink;
    }
    
</style>>




