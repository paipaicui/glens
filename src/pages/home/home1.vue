<template>
  <div class="main-panel" ref="scroll">
    <div v-if="pageLoading" class="loading">数据加载中</div>
    <div v-if="pageEmpty" class="pageEmpty">暂无数据</div>
    <template v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
          <li v-for="(item,key) in data" :key="key" class="cell">
            <h4>{{item.title}}</h4>
            <p class="text-right">{{item.state}}<span class="blue">{{item.percent}}%</span></p>
            <div class="between">
              <div class="left">
                需要增加：<span>工作记录{{item.size}}条</span>
              </div>
              <div class="right timer">
                {{item.dateTime}}
              </div>
            </div>
          </li>
        </ul>
        <p class="x" v-if="dropUp">{{moreText}}</p>
        <p class="x" v-if="isOver">{{overText}}</p>
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
  },
  methods: {
    ...mapActions({ list: 'home1/getList' }),
    getList() {
      let _self = this;
      this.list().then(res => {
        if (res) {
          this.data = res.data;
        }
      });
    },
    onRefresh() {
      let _self = this;
      //执行加载列表
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
    }
    h4 {
      margin: 0;
      font-size: 0.14rem;
      color: #333;
      line-height: 0.2rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
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
      .timer {
        color: #999;
        font-size: 0.12rem;
        padding-left: 0.18rem;
        background: url(../../assets/images/Icon/ic_time.png) left center
          no-repeat;
        background-size: 0.16rem 0.16rem;
      }
    }
  }
}
</style>
