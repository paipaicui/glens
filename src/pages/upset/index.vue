<template>
  <div class="page-grey">
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>
    <van-cell-group>
      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            <span class="base-info icon"></span>基本信息
          </h4>
        </template>
        <template #default>
          <router-link to="" class="more">查看更多</router-link>
        </template>
      </van-cell>
      <van-cell title="客户名称" value-class="rightPart" :value="data.customerName" />
      <van-cell title="任务名称" value-class="rightPart" :value="data.taskName" />
      <van-cell title="任务类型" value-class="rightPart" :value="data.taskType" />
      <van-cell title="预计承接金额 （万元）" value-class="rightPart" :value="data.money" />
      <van-cell title="预计完成日期" value-class="rightPart" :value="data.time" />
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            <span class="phase-info icon"></span>任务阶段
          </h4>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            <span class="preferment-info icon"></span>升迁条件
          </h4>
        </template>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      title: '销售任务执行',
      data: {
        customerName: '桐乡市经济技术开发总公司',
        taskName: '2020年嘉兴市桐乡市丰庆南路改造工程50.00W',
        taskType: '勘察设计',
        money: '100.00W',
        time: '2020-09-01'
      }
    };
  }
};
</script>

<style>
</style>