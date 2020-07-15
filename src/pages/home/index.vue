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

    <van-tabs line-width="25%" color="#0F7EE9" class="main-tab" @click="getHomeIndex" v-model="active">
      <van-tab title="销售预期" name="home0"> </van-tab>
      <van-tab title="升迁提升（1）" name="home1"></van-tab>
      <van-tab title="推送信息（7/13）" name="home2"></van-tab>
      <van-tab title="我的记录（2880）" name="home3"></van-tab>
    </van-tabs>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '',
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
  mounted() {
    this.active = this.$route.path.split('/')[1];
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    add() {},
    getHomeIndex(index, title) {
      this.$router.push({ path: index });
    }
  }
};
</script>

<style>
</style>

