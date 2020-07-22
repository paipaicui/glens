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

        <van-field v-model="form.relations" readonly rows="1" autosize label="任务名称" type="textarea" />

        <van-field readonly v-model="form.startDate" label="开始日期" />

        <van-field v-model="form.state" readonly rows="1" clickable autosize label="工作类型" type="textarea" />
      </van-cell-group>
      <!-- 沟通员工 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">

              <span class="icon-client icon"></span>沟通员工(至少1条)
            </h4>
          </template>
        </van-cell>
        <van-cell v-for="(item,key) in form.gt_employee" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.projectName}}
            </h4>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">

              <span class="icon-client icon"></span>客户
            </h4>
          </template>
        </van-cell>

        <van-cell v-for="(item,key) in form.customer" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.projectName}}
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
              <span class="icon-client-grey icon"></span>{{item.projectName}}
            </h4>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              交流话题
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name class="text-area" readonly cols v-model="form.goutong"></textarea>
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
            <textarea name class="text-area" readonly cols v-model="form.need"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              近期发包项目信息
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" readonly cols v-model="form.packMsg"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              客户机会
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" readonly cols v-model="form.chance"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              <span class="require">&nbsp;</span>客户回款
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" readonly cols v-model="form.back"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              <span class="require">&nbsp;</span>其他
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" readonly cols v-model="form.other"></textarea>
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 推送人员 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">

              <span class="icon-client icon"></span>推送人员
            </h4>
          </template>
        </van-cell>

        <van-cell v-for="(item,key) in form.push" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.projectName}}
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              推动内容
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" readonly cols v-model="form.pushContent"></textarea>
          </template>
        </van-cell>

        <van-field v-model="form.orderBy" readonly rows="1" autosize label="创建人" type="textarea" />
        <van-field v-model="form.orderTime" readonly rows="1" autosize label="创建时间" type="textarea" />
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
      title: '公共关系-工作记录',
      form: {
        relations: '临安市交通局 公共关系维护',
        startDate: '2020-06-05',
        state: '拜访/接待',
        gt_employee: [
          {
            projectName: '洞仙桥'
          },
          {
            projectName: '杜海味'
          }
        ],
        customer: [
          {
            projectName: '临安市交通运输局'
          }
        ],
        customerContact: [
          {
            projectName: '方旭东'
          }
        ],
        goutong: '14省道项目一期初看现场、业主内部审查',
        need: '无',
        packMsg: '无',
        chance: '推荐',
        back: '批复后回款',
        other: '无',
        push: [
          {
            projectName: '张杰宝'
          }
        ],
        pushContent:
          '涉青山水库路段增加方案比选，在不增加库容量占用前提下尽量减少拆迁',
        orderBy: '洞仙桥',
        orderTime: '2020-06-06 17:50:42'
      }
    };
  }
};
</script>

<style scoped></style>
