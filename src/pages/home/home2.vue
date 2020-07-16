<template>
  <div class="main-panel">
    <div v-if="pageLoading" class="loading">
      <van-loading color="#1989fa" vertical>加载中...</van-loading>
    </div>
    <van-empty v-if="pageEmpty" description="暂无数据" />
    <template v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
          <li v-for="(item, key) in data" :key="key" class="cell active">
            <router-link :to="{ path: 'pushMessage', query: { id: item.id } }">
              <span class="tips"></span>
              <h4 class="line1 title">
                <span class="font9">客户名称：</span
                ><span class="font3">{{ item.title }}</span>
              </h4>
              <p class="line2">
                <span class="font9">推送内容：</span
                ><span class="font6">{{ item.content }}</span>
              </p>
            </router-link>
            <van-row>
              <van-col span="8"
                ><span class="icon-name">{{ item.name }}</span></van-col
              >
              <van-col span="8" class="text-center"
                ><span class="timer">{{ item.dateTime }}</span></van-col
              >
              <van-col span="8" class="text-right">
                <span
                  :class="
                    hasExisted(item.id) ? 'goodjob-active goodjob' : 'goodjob'
                  "
                  @click="goodJob(item.id, hasExisted(item.id))"
                >
                  <template v-if="hasExisted(item.id)">
                    {{ item.goodjob }}
                  </template>
                  <template v-else>
                    赞
                  </template>
                </span>
              </van-col>
            </van-row>
          </li>
        </ul>
        <p class="text-center" v-if="dropUp">
          <van-loading size="16px">{{ moreText }}</van-loading>
        </p>
        <p class="text-center" v-if="isOver">{{ overText }}</p>
      </van-pull-refresh>
    </template>
  </div> </template
>,

<script>
import { Toast } from "vant";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      goodJobList: [],
      isLoading: false,
      pageLoading: true,
      dropUp: false,
      moreText: "加载更多数据",
      isOver: false,
      overText: "没有更多数据了",
      pageEmpty: false,
      pageSize: 0,
      pageNum: 10,
      data: []
    };
  },
  mounted() {
    this.getList();
    window.addEventListener("scroll", this.pulldown);
  },
  methods: {
    ...mapActions({ list: "home2/getList" }),
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
        Toast("刷新成功");
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
    },
    //点赞
    goodJob(id, state) {
      if (state) {
        this.goodJobList.splice(
          this.goodJobList.findIndex(item => item === id),1);
      } else {
        this.goodJobList.push(id);
        //此处调用点赞接口
      }
    },
    hasExisted(id) {
      const set = new Set(this.goodJobList);
      if (set.has(id)) {
        return true;
      } else {
        return false;
      }
    }
  },
  destroyed() {
    if (this.$refs.scroll) {
      window.addEventListener("scroll", this.pulldown);
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  li {
    padding: 0.16rem;
    background: #fff;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      bottom: 0.01rem;
      left: 0.16rem;
      right: 0.16rem;
      height: 0.01rem;
      background: #e5e5e5;
      opacity: 0.5;
    }
&.active {
  .tips{
    display: inline-block;
    width: .08rem;
    height: .08rem;
    background: #ff0000;
    border-radius: 50%;
    position: absolute;
    top: .16rem;
    right: .16rem;
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
  }
}
</style>
