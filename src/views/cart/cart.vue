<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childCart/CartList";
import BottomBar from './childCart/BottomBar'

import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: #f9a6b5;
  color: #ffffff;
}
</style>