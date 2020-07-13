import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    meta: {
      title: '首页',
      keepAlive: false,
      index: 0
    },
    component: Home,
  }, ]
})
