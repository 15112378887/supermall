import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false
//添加时间总线
Vue.prototype.$bus = new Vue()
//安装弹窗插件
Vue.use(toast)
//使用图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/loading/loading.png')
})
//解决移动端300毫秒延迟问题
FastClick.attach(document.body)



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

//v-router版本错误，双击路由不会报错
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
