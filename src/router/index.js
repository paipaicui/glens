import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/home/index.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      redirect: "/home0",
      component: Home,
      children: [{
          path: "/home0",
          name: 'home',
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
          name: 'home',
          meta: {
            title: "升迁提示",
            keepAlive: false,
            index: 0
          },
          component: () =>
            import( /* webpackChunkName: "home" */ "../pages/home/home1.vue")
        },
        {
          path: "/home2",
          name: 'home',
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
          name: 'home',
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
        title: "新增工作记录",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "addWorkRecord" */ "../pages/add/addWorkRecord.vue"),
    },
    {
      path: '/addSale',
      meta: {
        title: "创建销售任务",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "addSale" */ "../pages/add/addSale.vue"),
    },
    {
      path: '/publicRelations',
      meta: {
        title: "创建公共关系",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "publicRelations" */ "../pages/add/publicRelations.vue"),
    },
    {
      path: '/addCustomerConcat',
      meta: {
        title: "创建客户联系人",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "publicRelations" */ "../pages/add/addCustomerConcat.vue"),
    },
    {
      path: '/addCustomer',
      meta: {
        title: "创建客户",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "addCustomer" */ "../pages/add/addCustomer.vue"),
    },
    {
      path: '/upset',
      meta: {
        title: "升迁提示-销售任务执行",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "upset" */ "../pages/upset/index.vue"),
    },
    {
      path: '/upsetMore',
      meta: {
        title: "销售任务具体信息",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "upsetMore" */ "../pages/upset/desc.vue"),
    },
    {
      path: '/upsetList',
      meta: {
        title: "查看所有",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "upsetMore" */ "../pages/upset/list.vue"),
    },
    {
      path: '/upsetRecord',
      meta: {
        title: "确定跟踪销售项目审批流程",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "makeSureSaleProject" */ "../pages/upset/record.vue"),
    },
    {
      path: '/makeSureSaleProject',
      meta: {
        title: "确定跟踪销售项目审批流程",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "makeSureSaleProject" */ "../pages/upset/makeSureSaleProject.vue"),
    },
    {
      path: '/editWorkRecord',
      meta: {
        title: "修改销售任务具体信息",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "makeSureSaleProject" */ "../pages/upset/editWorkRecord.vue"),
    },
    {
      path: '/planning',
      meta: {
        title: "营销策划预案",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "planning" */ "../pages/upset/planning.vue"),
    },
    {
      path: '/closely',
      meta: {
        title: "输赢分析",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "closely" */ "../pages/upset/closely.vue"),
    },
    {
      path: '/pushMessage',
      meta: {
        title: "推送信息-公共关系",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "pushMessage" */ "../pages/upset/pushMessage.vue"),
    },
    {
      path: '/workRecord',
      meta: {
        title: "销售任务",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "workRecord" */ "../pages/upset/record.vue"),
    },
    {
      path: '/addCompetition',
      meta: {
        title: "创建竞争对手",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "addCompetition" */ "../pages/upset/addCompetition.vue"),
    },
    {
      path: '/saleList',
      meta: {
        title: "销售任务",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "saleList" */ "../pages/sales/list.vue"),
    },
    {
      path: '/customer',
      meta: {
        title: "查找公共关系",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "customer" */ "../pages/customer/index.vue"),
    },
    {
      path: '/flow',
      name: 'flow',
      meta: {
        title: "流程审批",
        keepAlive: true,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "flow" */ "../pages/flow/list.vue"),
    },
    {
      path: '/report',
      name: 'report',
      meta: {
        title: "报表中心",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "report" */ "../pages/report/index.vue"),
    },
    {
      path: '/report/appraise',
      meta: {
        title: "营销工作评价报表",
        keepAlive: false,
        index: 0
      },
      component: () =>
        import( /* webpackChunkName: "appraise" */ "../pages/report/appraise.vue"),
    },
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
