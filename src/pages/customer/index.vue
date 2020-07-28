<template>
  <div>
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>

        <template #right>
          <span class=" icon add" @click="addCustomer"></span>
        </template>

      </van-nav-bar>
    </div>
    <div class="search-box">
      <span class="searchBig"></span>
      <p class="font9">输入客户名称进行过滤</p>
      <van-search v-model="searchKeyWords" placeholder="请输入客户名称" />
    </div>

    <van-loading v-if="searchLoading==true" size="24px" vertical style="padding-top:2rem">
      加载中...</van-loading>
    <van-empty :image="require('@/assets/images/Icon/pic_default_graph.png')" v-if="searchEmpty && searchLoading==false"
      description="暂无数据" />
    <div v-if="(searchList.length < 1 || searchEmpty)&& searchLoading==false" class="block-btn-fixed"
      @click="addPublicRelations">新增</div>
    <van-cell-group>
      <van-cell v-for="(item, key) in searchList" :key="key" @click="chooseSearch(item)">
        <template #title>
          <van-row>
            <van-col span="12">{{ item.name }}</van-col>
            <van-col span="12" class="text-right">{{ item.id }}</van-col>
          </van-row>
        </template>
        <template #label>{{ item.projectName }}</template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      title: '查找公共关系',
      searchEmpty: true,
      searchLoading: false,
      searchList: [],
      searchKeyWords: '',
    };
  },
  watch: {
    searchKeyWords(val) {
      this.filter(val);
    },
  },
  methods: {
    ...mapActions({ list: 'home1/getList' }),
    addCustomer() {
      this.$router.push({ path: '/addCustomer' });
    },
    addPublicRelations() {
      this.$router.push({ path: '/publicRelations' });
    },
    filter(val) {
      let _self = this;
      this.searchLoading = true;
      this.searchList = [];
      this.list().then((res) => {
        if (res) {
          _self.searchList = res.data;
          _self.searchEmpty = false;
          _self.searchLoading = false;
        }
      });
    },
  },
};
</script>

<style>
</style>