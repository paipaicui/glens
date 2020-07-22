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
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="base-info icon"></span>基本信息
            </h4>
          </template>
        </van-cell>

        <van-field class="picker" v-model="form.pr" required readonly rows="1" autosize label="任务名称" type="textarea"
          placeholder="请选择任务" />

        <van-field class="picker" readonly required v-model="form.startDate" label="开始日期" placeholder="请选择开始日期" />

        <van-field class="picker" readonly required v-model="form.endDate" label="结束日期" placeholder="请选择结束日期" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="工作类型"
          type="textarea" placeholder="请选择任务" />
      </van-cell-group>
      <!-- 沟通员工 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">

              <span class="icon-client icon"></span>沟通员工
            </h4>
          </template>
        </van-cell>
        <van-cell v-for="(item,key) in form.gt_employee" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.text}}
            </h4>
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 相关员工 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">

              <span class="icon-client icon"></span>相关员工
            </h4>
          </template>
        </van-cell>

        <van-cell v-for="(item,key) in form.xg_employee" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.text}}
            </h4>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 客户 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">

              <span class="icon-client icon"></span>客户联系人
            </h4>
          </template>
        </van-cell>

        <van-cell v-for="(item,key) in form.customer" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.text}}
            </h4>
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 客户联系人 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">

              <span class="icon-client icon"></span>客户联系人
            </h4>
          </template>
        </van-cell>

        <van-cell v-for="(item,key) in form.customerContact" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.text}}
            </h4>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              沟通事由
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name readonly class="text-area" cols placeholder="请输入沟通事由" v-model="form.goutong"></textarea>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              沟通结果
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name readonly class="text-area" cols placeholder="请输入沟通结果" v-model="form.result"></textarea>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="value-info icon"></span>有价值信息
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              近期客户痛点、需求
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入近期客户痛点、需求" v-model="form.need"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              近期发包项目信息
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入近期发包项目信息" v-model="form.packMsg"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              客户机会
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入客户机会信息" v-model="form.chance"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              客户回款
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入客户回款信息" v-model="form.back"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              其他
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入其他有价值的信息" v-model="form.other"></textarea>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>

        <van-field v-model="form.orderBy" readonly rows="1" autosize label="创建人" type="textarea" />

        <van-field readonly v-model="form.orderTime" label="创建时间" />

      </van-cell-group>
    </div>

  </div>
</template>

<script>
import jobType from '@/components/jobType';
import formatDate from '@/assets/js/date.js';
import { mapActions } from 'vuex';
import { Toast } from 'vant';
export default {
  components: {
    jobType
  },

  data() {
    return {
      title: '销售任务-工作记录',
      form: {
        pr: '2020年 嘉兴市庆丰路工程 100W',
        startDate: '2020-07-01',
        endDate: '2020-07-01',
        state: '电话联系',
        gt_employee: [
          {
            text: '张清华'
          }
        ],
        xg_employee: [],
        customer: [
          {
            text: '嘉兴市秀洲新区开发建设有限公司'
          }
        ],
        customerContact: [
          {
            text: '唐纯'
          }
        ],
        goutong: '项目情况介绍，审批立项已完成，计划采用Epc模式',
        result: '地方关系有合作伙伴处理，近期安排拜访业主领导',
        need: '近期客户痛点、需求',
        packMsg: '采招文件拟定中',
        chance: '推荐',
        back: '',
        other: '',
        orderBy: '张青',
        orderTime: '2020-07-02 10:08:34'
      }
    };
  },

  methods: {
    ...mapActions({ list: 'home1/getList' })
  }
};
</script>

<style scoped></style>
