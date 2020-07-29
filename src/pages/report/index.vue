<template>
  <div class="page-grey">
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>
    <div>
      <ul>
        <li>
          <router-link to="/report/appraise" class="appraise">
            营销工作评价报表
          </router-link>
        </li>
        <li>
          <router-link to="/report/saleReport" class="report">
            营销工作报表
          </router-link>
        </li>
        <li>
          <router-link to="/report/sale" class="sale">
            销售任务
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '报表中心',
    };
  },
};
</script>

<style lang="less" scoped>
ul {
  margin: 0.13rem 0.16rem;
  li {
    margin-bottom: 0.16rem;
  }
  a {
    height: 1.35rem;
    background-size: 100% 100%;
    font-size: 0.24rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    &.appraise {
      background-image: url(../../assets/images/Icon/pic_bbzx_pjbb.png);
    }
    &.report {
      background-image: url(../../assets/images/Icon/pic_bbzx_gzbb.png);
    }
    &.sale {
      background-image: url(../../assets/images/Icon/pic_bbzx_xsrw.png);
    }
  }
}
</style>