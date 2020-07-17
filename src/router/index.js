import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/home/index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      redirect: "/home0",
      component: Home,
      children: [{
          path: "/home0",
          meta: {
            title: "销售预期",
            keepAlive: false,
            index: 0
          },
          component: () =>
            import( /* webpackChunkName: "home" */ "../pages/home/home0.vue")
        },
        {
          path: "/home1",
          meta: {
            title: "升迁提示",
            keepAlive: true,
            index: 0
          },
          component: () =>
            import( /* webpackChunkName: "home" */ "../pages/home/home1.vue")
        },
        {
          path: "/home2",
          meta: {
            title: "推送信息",
            keepAlive: true,
            index: 0
          },
          component: () =>
            import( /* webpackChunkName: "home" */ "../pages/home/home2.vue")
        },
        {
          path: "/home3",
          meta: {
            title: "我的记录",
            keepAlive: true,
            index: 0
          },
          component: () =>
            import( /* webpackChunkName: "home" */ "../pages/home/home3.vue")
        }
      ]
    },
    {
      path: '/addWorkRecord',
      meta: {
        title: "新增销售任务",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "addWorkRecord" */ "../pages/add/addWorkRecord.vue"),
    },
    {
      path: '/addCustomer',
      meta: {
        title: "创建客户联系人",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "addCustomer" */ "../pages/add/addCustomer.vue"),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      };
    }
  }
});
