// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import less from 'less'
import store from './store'
import Vconsole from 'vconsole'
require('./mock');
Vue.use(less)
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.$vConsole = new Vconsole()

import './assets/js/screen.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});
