import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home0',
    component: Home,
    children: [{
      path: '/home0',
      meta: {
        title: '销售预期',
        keepAlive: false,
        index: 0
      },
      component: () => import( /* webpackChunkName: "home" */ '../pages/home/home0.vue'),
    }, {
      path: '/home1',
      meta: {
        title: '升迁提示',
        keepAlive: false,
        index: 0
      },
      component: () => import( /* webpackChunkName: "home" */ '../pages/home/home1.vue'),
    }, {
      path: '/home2',
      meta: {
        title: '推送信息',
        keepAlive: false,
        index: 0
      },
      component: () => import( /* webpackChunkName: "home" */ '../pages/home/home2.vue'),
    }, {
      path: '/home3',
      meta: {
        title: '我的记录',
        keepAlive: false,
        index: 0
      },
      component: () => import( /* webpackChunkName: "home" */ '../pages/home/home3.vue'),
    }, ]

  }, ]
})
