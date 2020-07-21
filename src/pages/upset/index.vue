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
      <van-cell>
        <template #title>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
            y="0px" style="display: none;">
            <symbol id="wave">
              <path
                d="M820,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z">
              </path>
              <path
                d="M820,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z">
              </path>
              <path
                d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z">
              </path>
              <path
                d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z">
              </path>
            </symbol>
          </svg>
          <van-row type="flex" justify="center">
            <van-col span="6" class="text-center">
              <div class="circle">
                <div class="box">
                  <div class="percent">
                    <div class="percentNum" id="count">{{step}}</div>
                    <div class="percentB">%</div>
                  </div>
                  <div id="water" class="water" :style="'transform:translate(0,'+setsetp+'%)'">
                    <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
                      <use xlink:href="#wave"></use>
                    </svg>
                    <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
                      <use xlink:href="#wave"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="font9 nb">
                <template v-if="step==5">确定任务</template>
                <template v-if="step==10">执行跟踪</template>
                <template v-if="step==45">招投标及商务洽谈</template>
              </p>
            </van-col>
            <van-col span="6" class="center"><span class="step-bg"></span></van-col>
            <van-col span="6" class="text-center">
              <div class="circle">
                <div class="box">
                  <div class="percent">
                    <div class="percentNum" id="count">{{step2}}</div>
                    <div class="percentB">%</div>
                  </div>
                  <div id="water" class="water" :style="'transform:translate(0,'+setstep2+'%)'">
                    <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
                      <use xlink:href="#wave"></use>
                    </svg>
                    <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
                      <use xlink:href="#wave"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="font9 nb">执行跟踪</p>
            </van-col>
          </van-row>
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
      <van-radio-group v-model="workRecordList">
        <van-cell clickable>
          <template #title>
            <p class="icon icon-file font6">
              工作记录（<span class="font-blue">已填1条</span>）
            </p>
          </template>
          <template #right-icon>
            <span class="icon-radio"></span>
          </template>
        </van-cell>
      </van-radio-group>

      <van-cell>
        <template #title>
          <p class="icon icon-flow font6">
            确定跟踪销售项目审批流程
          </p>
        </template>
        <template #right-icon>
          <router-link to="/makeSureSaleProject" class="icon-add-file"></router-link>
        </template>
      </van-cell>

    </van-cell-group>
    <div class="btn-group">
      <van-row gutter="15">
        <van-col span="12">
          <span class="fixed-btn danger-btn">关闭</span>
        </van-col>
        <van-col span="12">
          <span class="fixed-btn info-btn" disabled>升迁</span>
        </van-col>
      </van-row>
    </div>

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
      },
      workRecord: '1',
      step: 5,
      step2: 10
    };
  },
  computed: {
    setsetp() {
      return 100 - this.step;
    },
    setstep2() {
      return 100 - this.step2;
    }
  },
  watch: {
    step() {
      this.setstep = 100 - this.step;
    },
    step2() {
      this.setstep2 = 100 - this.step2;
    }
  }
};
</script>

<style>
</style>