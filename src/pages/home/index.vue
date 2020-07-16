<template>
  <div>
    <div class="main-top">
      <van-nav-bar title="CRM" left-arrow>
        <template #left>
          <span @click="back" class="icon back"></span>
        </template>
        <template #right>
          <span @click="modalShow = true" class="icon add"></span>
        </template>
      </van-nav-bar>
      <van-overlay :show="modalShow" @click="modalShow = false">
        <div class="wrapper" @click.stop>
          <div class="menu-list">
            <ul>
              <li v-for="(item,key) in menuList" :key="key" @click="go(item.link)">
                <span><img v-bind:src="item.icon" />{{item.text}}</span>
              </li>
            </ul>
          </div>
        </div>
      </van-overlay>
      <van-row class="main-menu">
        <van-col span="6" v-for="(item,key) in menu" :key="key">
          <router-link :to="item.href">
            <div class="block">
              <span :class="item.class" class="icon"></span>
              <p class="menu">{{item.text}}</p>
            </div>
          </router-link>
        </van-col>
      </van-row>
      <van-tabs line-width="25%" color="#0F7EE9" class="main-tab" @click="getHomeIndex" v-model="active">
        <van-tab title="销售预期" name="home0"></van-tab>
        <van-tab title="升迁提升（1）" name="home1"></van-tab>
        <van-tab title="推送信息（7/13）" name="home2"></van-tab>
        <van-tab title="我的记录（2880）" name="home3"></van-tab>
      </van-tabs>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '',
      modalShow: false,
      menu: [
        {
          href: '',
          class: 'menu-icon1',
          text: '销售任务'
        },
        {
          href: '',
          class: 'menu-icon2',
          text: '客户'
        },
        {
          href: '',
          class: 'menu-icon3',
          text: '流程审批'
        },
        {
          href: '',
          class: 'menu-icon4',
          text: '报表'
        }
      ],
      menuList: [
        {
          text: '工作记录',
          icon: require('@/assets/images/Icon/ic_popupmenu_work_record.png'),
          link: '/addWorkRecord'
        },
        {
          text: '销售任务',
          icon: require('@/assets/images/Icon/ic_popupmenu_sales_task.png'),
          link: ''
        },
        {
          text: '公共关系',
          icon: require('@/assets/images/Icon/ic_popupmenu_public_relations.png'),
          link: ''
        },
        {
          text: '客户',
          icon: require('@/assets/images/Icon/ic_popupmenu_client.png'),
          link: ''
        },
        {
          text: '联系人',
          icon: require('@/assets/images/Icon/ic_popupmenu_contact.png'),
          link: ''
        }
      ]
    };
  },
  mounted() {
    this.active = this.$route.path.split('/')[1];
  },
  methods: {
    back() {
      console.log('回到总页面');
    },
    getHomeIndex(index, title) {
      this.$router.push({ path: index });
    },
    go(link) {
      this.modalShow = false;
      this.$router.push({ path: link });
    }
  }
};
</script>


