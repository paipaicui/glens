<template>
  <div class="flow-panel">
    <div class="page-topper">
      <div class="nav-height">
        <van-nav-bar :title="title" left-arrow>
          <template #left>
            <span @click="$router.go(-1)" class="icon back"></span>
          </template>
        </van-nav-bar>
      </div>
      <div class="page-tab-block">
        <van-tabs line-width="33.33%" color="#0F7EE9" class="page-tab" @click="getIndex" v-model="active">
          <van-tab title="待审批" name="home0"></van-tab>
          <van-tab title="已审批" name="home1"></van-tab>
          <van-tab title="告知" name="home2"></van-tab>
        </van-tabs>
      </div>
      <div class="page-search-block">
        <van-search class="page-search" v-model="search" placeholder="搜索" @search="onSearch" />
      </div>

    </div>

    <div class="lists">
      <div v-if="pageLoading" class="loading">
        <van-loading color="#1989fa" vertical>加载中...</van-loading>
      </div>
      <van-empty :image="require('@/assets/images/Icon/pic_default_graph.png')" v-if="pageEmpty" description="暂无数据" />
      <template v-else>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div>
            <van-swipe-cell v-for="(item, key) in data" :key="key" class="cell">
              <router-link :to="{ path: 'makeSureSaleProject', query: { id: item.id } }">
                <h4 class="line2">{{ item.title }}</h4>
                <van-row class="margin-top">
                  <van-col span="24">
                    <span class="font9">所处阶段：</span><span class="font6">确定任务5%</span>
                  </van-col>
                </van-row>
                <van-row class="margin-top">
                  <van-col span="16">
                    <span class="font9 size14">销售任务责任人：</span><span class="font-blue">{{item.name}}</span>
                  </van-col>
                  <van-col span="8" class="text-right">
                    <span class="icon timer font9 size12">06-30 11:15 </span>
                  </van-col>
                </van-row>
              </router-link>
            </van-swipe-cell>
          </div>
          <p class="text-center" v-if="dropUp">
            <van-loading size="16px">{{ moreText }}</van-loading>
          </p>
          <p class="text-center" v-if="isOver">{{ overText }}</p>
        </van-pull-refresh>
      </template>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      title: '流程中心-审批记录',
      active: 'home0',
      search: '',
      isLoading: false,
      pageLoading: true,
      dropUp: false,
      moreText: '加载更多数据',
      isOver: false,
      overText: '没有更多数据了',
      pageEmpty: false,
      pageSize: 0,
      pageNum: 10,
      data: [],
    };
  },
  mounted() {
    this.getList();
    window.addEventListener('scroll', this.pulldown);
  },
  methods: {
    ...mapActions({ list: 'home2/getList' }),
    getIndex(index, title) {
      console.log(index, title);
      this.data = [];
      this.getList();
    },
    getList() {
      let _self = this;
      return new Promise((resolve) => {
        _self.list().then((res) => {
          if (res) {
            _self.pageLoading = false;
            if (res.total > 0) {
              _self.data = res.data;
            } else if (res.total == 0) {
              _self.pageEmpty = true;
            }
            resolve(res);
          }
        });
      });
    },
    onRefresh() {
      let _self = this;
      _self.getList().then((res) => {
        Toast('刷新成功');
        _self.isLoading = false;
      });
    },
    pulldown() {
      let _self = this;
      if (!this.isOver) {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        if (
          scrollTop + clientHeight + 50 >= scrollHeight &&
          _self.dropUp == false
        ) {
          _self.dropUp = true;
          _self.list().then((res) => {
            if (res) {
              if (res.data.length > 0) {
                _self.data = [..._self.data, ...res.data]; //拼接数组
                _self.dropUp = false;
              } else {
                res.isOver = true;
              }
            }
          });
        }
      }
    },
    onSearch(val) {
      Toast(val);
    },
  },
  destroyed() {
    if (this.$refs.scroll) {
      window.addEventListener('scroll', this.pulldown);
    }
  },
};
</script>
<style lang="less" scoped>
.page-tab-block {
  height: 0.48rem;
}
.page-tab {
  height: 0.48rem;
  position: fixed;
  width: 100%;
  z-index: 999;
}
.page-search-block {
  height: 0.54rem;
}
.page-search {
  height: 0.54rem;
  position: fixed;
  width: 100%;
  z-index: 999;
}
</style>
