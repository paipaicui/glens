<template>
  <div>
    <van-nav-bar title="CRM" left-arrow>
      <template #left>
        <span @click="back" class="icon back"></span>
      </template>
      <template #right>
        <span @click="add" class="icon add"></span>
      </template>
    </van-nav-bar>
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

    <van-tabs line-width="25%" color="#0F7EE9" class="main-tab" @click="getHomeIndex">
      <van-tab title="销售预期"> </van-tab>
      <van-tab title="升迁提升（1）"></van-tab>
      <van-tab title="推送信息（7/13）"></van-tab>
      <van-tab title="我的记录（2880）"></van-tab>
    </van-tabs>
    <div class="main-panel" :is="currentView"></div>

  </div>
</template>

<script>
import home0 from './home0';
import home1 from './home1';
import home2 from './home2';
import home3 from './home3';
export default {
  components: {
    home0,
    home1,
    home2,
    home3
  },
  data() {
    return {
      currentView: 'home0',
      active: 0,
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
      ]
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    add() {},
    getHomeIndex(index, title) {
      this.currentView = 'home' + index;
    }
  }
};
</script>

<style>
</style>

