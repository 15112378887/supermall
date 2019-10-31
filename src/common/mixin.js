import {
  debounce
} from 'common/until'
import BackTop from "components/content/bakcTop/BackTop";


//混入
export const itemListenerMixin = {
  mounted() {
    //防抖动，提高浏览器性能
    const NewRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemListener = () => {
      NewRefresh();
    }
    this.$bus.$on("itemImageLoad", this.itemListener);


  }
}

export const backTopMixin = {

  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300); //scrollTo方法可以回到顶部第1，2个参数是xy轴，第3个参数是回到顶部所需要的时间
    },
    listenShopBack(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }


}
