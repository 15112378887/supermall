<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return +this.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((totle, item) => {
          return totle + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    // 判断是否全选
    isSelectAll() {
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    },
    
  },
  methods: {
    //一键全选，和一键取消选择
    checkClick() {
      if(this.isSelectAll){ 
        return this.cartList.forEach(item => item.checked = false)
      } else {
        return this.cartList.forEach(item => item.checked = true)
      }
    },
    //判断是否有选中商品，然后提示选择商品
    calcClick() {
      if(!this.cartList.filter(item => item.checked).length) {
        this.$toast.show('请选择购买的商品',2000)
      }
    },
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 8px;
  top: 9px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: pink;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
