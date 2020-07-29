<template>
  <div class="main-panel">
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
    </form>
    <div v-if="pageLoading" class="loading">
      <van-loading color="#1989fa" vertical>加载中...</van-loading>
    </div>
    <van-empty :image="require('@/assets/images/Icon/pic_default_graph.png')" v-if="pageEmpty" description="暂无数据" />
    <template v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
          <li v-for="(item, key) in data" :key="key" class="cell active">
            <router-link :to="{ path: 'workRecord', query: { id: item.id } }">
              <span class="tips">销售任务</span>
              <h4 class="line2 title">
                <span class="font9">任务名称：</span>
                <span class="font3">{{ item.title }}</span>
              </h4>
              <p class="line2">
                <span class="font9">沟通是由：</span>
                <span class="font6">{{ item.content }}</span>
              </p>
              <van-row>
                <van-col span="12">
                  <span class="font9">沟通对象：</span>
                  <span class="font6">{{ item.name }}</span>
                </van-col>
                <van-col span="12" class="text-right">
                  <span class="state">拜访/接待</span>
                  <span class="timer">07-01 13:24</span>
                </van-col>
              </van-row>
            </router-link>

          </li>
        </ul>
        <p class="text-center" v-if="dropUp">
          <van-loading size="16px">{{ moreText }}</van-loading>
        </p>
        <p class="text-center" v-if="isOver">{{ overText }}</p>
      </van-pull-refresh>
    </template>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      goodJobList: [],
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
      value: '',
    };
  },
  mounted() {
    this.getList();
    window.addEventListener('scroll', this.pulldown);
  },
  methods: {
    ...mapActions({ list: 'home2/getList' }),
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
ul {
  li {
    padding: 0.16rem;
    background: #fff;
    position: relative;
    overflow: hidden;
    &::after {
      position: absolute;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0.16rem;
      bottom: 0;
      left: 0.16rem;
      border-bottom: 1px solid #e5e5e5;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &.active {
      .tips {
        display: inline-flex;
        align-items: flex-end;
        justify-content: center;
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        top: -0.4rem;
        right: -0.4rem;
        background: #0f7ee9;
        color: #fff;
        font-size: 0.1rem;
        text-align: center;
        transform: scale(0.5) rotate(45deg);
      }
    }
    a {
      display: block;
    }
    h4,
    p {
      margin: 0 0 0.08rem 0;
    }
    .nb {
      margin: 0 !important;
    }
    .title {
      width: 90%;
    }
    .state {
      padding: 0 0.04rem;
      background: #f89a24;
      text-align: center;
      color: #fff;
      font-size: 0.12rem;
      border-radius: 3px;
      height: 0.2rem;
      line-height: 0.2rem;
      display: inline-block;
    }
  }
}
</style>
