<template>
  <div class="page-panel">
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
        <template #right>
          <span @click="isShowScreen= true" class="icon screen"></span>
        </template>
      </van-nav-bar>
    </div>
    <form action="/" style="height:54px">
      <van-search style="height:54px;position:fixed;width:100%; top:.44rem;z-index:9" v-model="value" placeholder="搜索"
        @search="onSearch" />
    </form>
    <div v-if="pageLoading" class="loading">
      <van-loading color="#1989fa" vertical>加载中...</van-loading>
    </div>
    <van-empty :image="require('@/assets/images/Icon/pic_default_graph.png')" v-if="pageEmpty" description="暂无数据" />
    <template v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-cell>
          <template #title>
            <span class="font9">销售任务记录数（1845）</span>
          </template>
        </van-cell>
        <van-swipe-cell v-for="(item, key) in data" :key="key" class="cell">
          <!--一下是非-->
          <!-- <van-swipe-cell v-for="(item, key) in data" :key="key" class="cell red"> -->
          <router-link :to="{ path: '/upset', query: { id: item.id }}">
            <span class="tips">活动</span>
            <!-- <span class="tips tips-grey">停用</span> -->
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
                <span class="icon timer font9 size12">06-30 11:15</span>
              </van-col>
            </van-row>
          </router-link>
          <van-button slot="right" square text="修改" type="info" />
          <van-button slot="right" square text="关闭" type="danger" @click="isClose=true" />
        </van-swipe-cell>
        <p class="text-center" v-if="dropUp">
          <van-loading size="16px">{{ moreText }}</van-loading>
        </p>
        <p class="text-center" v-if="isOver">{{ overText }}</p>
      </van-pull-refresh>
    </template>
    <van-popup v-model="isClose" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div class="page-grey" style="height: 100vh; ">
        <close v-if="isClose" @close="close" @submit="subClose"></close>
      </div>
    </van-popup>

    <van-popup v-model="isShowScreen" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div class="page-grey" style="height: 100vh; overflow-y: scroll;">
        <div class="nav-height">
          <van-nav-bar title="销售任务筛选" left-arrow>
            <template #left>
              <span @click="isShowScreen=false" class="icon back"></span>
            </template>
            <template #right>
              <span @click="clear" style="color:#fff">清空</span>
            </template>
          </van-nav-bar>
        </div>
        <p class="font9 padding-left">任务创建日期</p>
        <van-cell-group>
          <van-field class="picker" readonly v-model="screen.startDate" label="开始日期" placeholder="请选择开始日期"
            @click="showPickerdate1 = true" />

          <van-field class="picker" readonly v-model="screen.endDate" label="结束日期" placeholder="请选择结束日期"
            @click="showPickerdate2 = true" />

        </van-cell-group>
        <p class="font9 padding-left">预计承接金额区间（万元）</p>
        <van-cell-group>
          <van-field v-model="screen.minMoney" label="最小金额" placeholder="请输入最小金额" />
          <van-field v-model="screen.maxMoney" label="最大金额" placeholder="请输入最大金额" />
        </van-cell-group>

        <van-cell-group>
          <van-field class="picker" v-model="screen.area" required readonly rows="1" clickable autosize label="区域"
            type="textarea" placeholder="请选择区域" @click="showSearchPage('请选择区域','area')" />

          <van-field class="picker" v-model="screen.stage" required readonly rows="1" clickable autosize label="任务阶段"
            type="textarea" placeholder="请选择任务阶段" @click="showSearchPage('请选择任务阶段','stage')" />

          <van-field class="picker" v-model="screen.department" required readonly rows="1" clickable autosize
            label="责任部门" type="textarea" placeholder="请选择责任部门" @click="showSearchPage('请选择责任部门','department')" />
        </van-cell-group>
        <div class="position-bottom">
          <div class="block-btn">查询</div>
        </div>
      </div>
    </van-popup>

    <!-- 选择弹出页面 -->
    <van-popup v-model="isShowSearchPage" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; ">
        <job-type :list="searchPageList" :title="searchTitle" @choose="chooseSearchPage"
          @close="isShowSearchPage = false">
        </job-type>
      </div>
    </van-popup>

    <!-- 开始时间 -->
    <van-popup v-model="showPickerdate1" position="bottom">
      <van-datetime-picker @cancel="showPickerdate1 = false" @confirm="confirmStartDate" v-model="startDate"
        type="date" />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup v-model="showPickerdate2" position="bottom">
      <van-datetime-picker @cancel="showPickerdate2 = false" @confirm="confirmEndDate" v-model="endDate" type="date" />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
import jobType from '@/components/jobType';
import close from '@/components/close';
import formatDate from '@/assets/js/date.js';
import { mapActions } from 'vuex';
export default {
  components: {
    close,
    jobType,
  },
  data() {
    return {
      title: '销售任务-列表',
      isLoading: false,
      isClose: false,
      isShowScreen: false,
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
      showPickerdate1: false,
      showPickerdate2: false,
      isShowSearchPage: false,
      searchTitle: '',
      currentPage: '',
      searchPageList: [],
      screen: {
        startDate: '',
        endDate: '',
        minMoney: '',
        maxMoney: '',
        area: '',
        stage: '',
        department: '',
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      startDate: new Date(),
      endDate: new Date(),
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
    close() {
      this.isClose = false;
    },
    subClose(val) {
      console.log('关闭表单');
      console.log(val);
      this.isClose = false;
    },
    confirmStartDate(val) {
      this.screen.startDate = formatDate.date('YYYY-mm-dd', val);
      this.showPickerdate1 = false;
    },
    confirmEndDate(val) {
      this.screen.endDate = formatDate.date('YYYY-mm-dd', val);
      this.showPickerdate2 = false;
    },
    clear() {
      console.log('清空');
    },
    showSearchPage(title, done) {
      let _self = this;
      this.currentPage = done;
      this.isShowSearchPage = true;
      this.searchTitle = title;
      // switch (done) {
      //   default:
      //     break;
      // }
      this.list().then((res) => {
        if (res) {
          _self.searchPageList = res.data;
        }
      });
    },
    chooseSearchPage(val) {
      this.screen[this.currentPage] = val.text;
      this.isShowSearchPage = false;
      this.searchPageList = [];
    },
  },
  destroyed() {
    if (this.$refs.scroll) {
      window.addEventListener('scroll', this.pulldown);
    }
  },
};
</script>

<style scoped>
ul li {
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
.tips-grey {
  background: #ccc;
}
.padding-left {
  padding-left: 0.16rem;
  margin: 0.1rem 0;
}
</style>