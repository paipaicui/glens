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
          <router-link to="/editWorkRecord" class="more">查看更多</router-link>
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
            <span class="base-info icon"></span>销售项目经理填写
          </h4>
        </template>
      </van-cell>
      <van-field required label="与其项目利润率（含销售成本）" v-model="data.cost" placeholder="输入数字部分即可" />
      <van-field required label="销售项目总监" placeholder="" v-model="data.salesDirector" class="picker" />
      <van-field required label="销售项目总监岗位" v-model="data.salesPost" placeholder="" />
    </van-cell-group>
    <van-cell-group>
      <van-cell clickable>
        <template #title>
          <p class="font3 nb">
            销售项目总监<span class="font-blue">&nbsp;&nbsp;张清华</span>
          </p>
        </template>
        <template #right-icon>
          <span class="font9" style="font-size:12px">06-30 14:23</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="block-btn" @click="makeSure">提交</div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      title: '确定跟踪销售项目审批流程',
      data: {
        customerName: '桐乡市经济技术开发总公司',
        taskName: '2020年嘉兴市桐乡市丰庆南路改造工程50.00W',
        taskType: '勘察设计',
        money: '100.00W',
        time: '2020-09-01',
        cost: '',
        salesDirector: '',
        salesPost: '',
      },
    };
  },

  methods: {
    makeSure() {
      console.log('tijiao');
    },
  },
};
</script>

<style>
</style>