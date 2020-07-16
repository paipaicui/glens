<template>
  <div class="main-panel">
    <div v-if="pageLoading" class="loading">
      <van-loading color="#1989fa" vertical>加载中...</van-loading>
    </div>
    <van-empty v-if="pageEmpty" description="暂无数据" />
    <template v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
          <li v-for="(item, key) in data" :key="key" class="cell">
            <router-link :to="{ path: 'upset', query: { id: item.id }}">
              <h4 class="line2">{{ item.title }}</h4>
              <p class="text-right">

                {{ item.state }}<span class="blue">{{ item.percent }}%</span>
              </p>
              <div class="between">
                <div class="left">
                  需要增加：<span>工作记录{{ item.size }}条</span>
                </div>
                <div class="right timer">
                  {{ item.dateTime }}
                </div>
              </div>
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
      isLoading: false,
      pageLoading: true,
      dropUp: false,
      moreText: '加载更多数据',
      isOver: false,
      overText: '没有更多数据了',
      pageEmpty: false,
      pageSize: 0,
      pageNum: 10,
      data: []
    };
  },
  mounted() {
    this.getList();

    window.addEventListener('scroll', this.pulldown);
  },
  methods: {
    ...mapActions({ list: 'home1/getList' }),
    getList() {
      let _self = this;
      return new Promise(resolve => {
        _self.list().then(res => {
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
      _self.getList().then(res => {
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
          _self.list().then(res => {
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
    }
  },
  destroyed() {
    if (this.$refs.scroll) {
      window.addEventListener('scroll', this.pulldown);
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  li {
    padding: 0.16rem 0.16rem 0.16rem 0.44rem;
    background: #fff;
    position: relative;
    &::before {
      position: absolute;
      content: '项';
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      left: 0.16rem;
      top: 0.16rem;
      background: #f8b224;
      border-radius: 4px;
      border-radius: 4px;
      font-size: 0.1rem;
      color: #fff;
      text-align: center;
      line-height: 0.2rem;
    }
    &::after {
      position: absolute;
      content: '';
      bottom: 0.01rem;
      left: 0.16rem;
      right: 0.16rem;
      height: 0.01rem;
      background: #e5e5e5;
      opacity: 0.5;
    }
    h4 {
      margin: 0;
      font-size: 0.14rem;
      color: #333;
      line-height: 0.2rem;
    }
    p {
      font-size: 0.14rem;
      text-align: right;
      color: #999;
      margin: 0.08rem 0 0.1rem 0;
      span {
        color: #0f7ee9;
      }
    }
    .between {
      .left {
        font-size: 0.14rem;
        color: #999;
        span {
          color: #666;
        }
      }
    }
  }
}
</style>
