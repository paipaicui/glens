<template>
  <div class="page-panel">
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
        <template #right>
          <span @click="screen" class="icon screen"></span>
        </template>
      </van-nav-bar>
    </div>
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
    </form>
    <div v-if="pageLoading" class="loading">
      <van-loading color="#1989fa" vertical>加载中...</van-loading>
    </div>
    <van-empty v-if="pageEmpty" description="暂无数据" />
    <template v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
          <li v-for="(item, key) in data" :key="key" class="cell">
            <router-link :to="{ path: 'upset', query: { id: item.id }}">
                <span class="tips">活动</span>
              <h4 class="line2">{{ item.title }}</h4>
              <van-row class="margin-top">
                <van-col span="16">
                  <span class="font6 size14">投标授权审批</span>
                </van-col>
                <van-col span="8">
                  <span class="icon icon-person font9 size12">{{item.name}}</span>
                </van-col>
              </van-row>
              <van-row class="margin-top">
                <van-col span="16">
                  <span class="font6 size14">确定任务5%</span>
                </van-col>
                <van-col span="8">
                  <span class="icon timer font9 size12">06-30 11:15 <i class="icon icon-star"></i></span>
                </van-col>
              </van-row>
            </router-link>
          </li>
          <li v-for="(item, key) in data" :key="key" class="cell red">
            <router-link :to="{ path: 'upset', query: { id: item.id }}">
                <span class="tips tips-grey">停用</span>
              <h4 class="line2">{{ item.title }}</h4>
              <van-row class="margin-top">
                <van-col span="16">
                  <span class="font6 size14">投标授权审批</span>
                </van-col>
                <van-col span="8">
                  <span class="icon icon-person font9 size12">{{item.name}}</span>
                </van-col>
              </van-row>
              <van-row class="margin-top">
                <van-col span="16">
                  <span class="font6 size14">确定任务5%</span>
                </van-col>
                <van-col span="8">
                  <span class="icon timer font9 size12">06-30 11:15 <i class="icon icon-star"></i></span>
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
import { Toast } from "vant";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: "销售任务-列表",
      isLoading: false,
      pageLoading: true,
      dropUp: false,
      moreText: "加载更多数据",
      isOver: false,
      overText: "没有更多数据了",
      pageEmpty: false,
      pageSize: 0,
      pageNum: 10,
      data: [],
      value: "",
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
    screen() {
      console.log("shaixuan");
    },
    onRefresh() {
      let _self = this;
      _self.getList().then((res) => {
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
      window.addEventListener("scroll", this.pulldown);
    }
  },
};
</script>

<style scoped>
ul li{
    overflow: hidden;
    
}
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
        font-size: 0.15rem;
        text-align: center;
        transform: scale(0.5) rotate(45deg);
      }
      .tips-grey{
          background: #ccc;
      }

</style>