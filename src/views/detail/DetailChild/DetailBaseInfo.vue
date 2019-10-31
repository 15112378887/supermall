<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>

    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
}
.info-title {
  font-size: 17px;
  padding-bottom: 8px;
  color: #222;
}
.n-price {
  font-size: 21px;
  color: #fb7990;
  padding-right: 7px;
}
.o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.discount {
  font-size: 12px;
  color: #fff;
  background-color: #fb7990;
  padding: 2px 5px;
  border-radius: 5px;
  margin-left: 5px;
  position: relative;
  top: -7px;
}
.info-other{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
}

.info-service {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60px;
    height: 60px;
    border-bottom: 3px solid rgba(100,100,100,.1);
  }
.info-service-item{
    text-align:center;
}
.info-service-item img{
    width: 14px;
    height: 14px;
    vertical-align:middle;
    
}
.info-service-item span {
    font-size: 13px;
    color: #333;
  }

  

  
</style>
