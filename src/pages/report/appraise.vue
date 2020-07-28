<template>
  <div class="page-grey">
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
        <template #right>
          <div class="block">
            <span :class="tabActive==0?'tabIcon ranking':'tabIcon rank'" @click="tab(0)"></span>
            <span :class="tabActive==1?'tabIcon listing':'tabIcon list'" @click="tab(1)"></span>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="select">
      <van-row gutter="8">
        <van-col span="16">
          <div class="corner">副院长/院长助理</div>
        </van-col>
        <van-col span="8">
          <div class="corner">2020年6月</div>
        </van-col>
      </van-row>
    </div>

    <van-row gutter="20" class="white-block">
      <van-col span="12" class="flex">
        <p><span class="up"></span>最高分 环比：<span class="font-blue">-0</span></p>
        <div class="text-center">张杰宝：80分</div>
        <div class="text-center font-blue margin-t">前5名</div>
        <div class="text-center">
          <img src="../../assets/images/Icon/pic_arrow_big_left.png" alt="" srcset="">
        </div>
      </van-col>
      <van-col span="12" class="flex">
        <p><span class="down"></span>最高分 环比：<span class="font-red"><i class="arrow-bottom"></i>18</span></p>
        <div class="text-center">张杰宝：80分</div>
        <div class="text-center font-red margin-t">后5名</div>
        <div class="text-center">
          <img src="../../assets/images/Icon/pic_arrow_big_right.png" alt="" srcset="">
        </div>
      </van-col>
    </van-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '营销工作评价报表',
      tabActive: 0,
    };
  },
  methods: {
    tab(val) {
      this.tabActive = val;
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  display: inline-flex;
  border: 1px solid #fff;
  border-radius: 8px;
}
.tabIcon {
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  border-right: 1px solid #fff;
  cursor: pointer;
  &:last-of-type {
    border: none;
  }
}
.ranking {
  background-image: url(../../assets/images/Icon/ic_nav_ranking.png);
}
.rank {
  background-image: url(../../assets/images/Icon/ic_nav_ranking_unseleted.png);
}
.listing {
  background-image: url(../../assets/images/Icon/ic_nav_list.png);
}
.list {
  background-image: url(../../assets/images/Icon/ic_nav_list_unseleted.png);
}
.select {
  height: 0.56rem;
  box-sizing: border-box;
  background: #f8f8f8;
  padding: 0.08rem 0.16rem;
}
.corner {
  border-radius: 4px;
  background: #fff;
  background-image: url(../../assets/images/Icon/ic_arrow_fill_down.png);
  background-size: 0.32rem 0.32rem;
  background-position-x: right;
  background-position-y: center;
  background-repeat: no-repeat;
  height: 0.4rem;
  line-height: 0.4rem;
  color: #999;
  padding-left: 0.08rem;
}
.white-block {
  background: #fff;
}
.flex {
  padding: 0.08rem 0;
  img {
    height: 0.2rem;
    width: 1.46rem;
    margin: 0 auto;
  }
  .margin-t {
    margin-top: 0.1rem;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.1rem 0;
    color: #999;
  }
  .up {
    display: inline-block;
    height: 0.24rem;
    width: 0.24rem;
    background: url(../../assets/images/Icon/ic_arrow_circle_up.png) center
      center no-repeat;
    background-size: 100% 100%;
  }
  .down {
    display: inline-block;
    height: 0.24rem;
    width: 0.24rem;
    background: url(../../assets/images/Icon/ic_arrow_circle_down.png) center
      center no-repeat;
    background-size: 100% 100%;
  }
}
</style>