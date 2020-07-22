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
        <van-field v-model="form.projectName" rows="1" readonly autosize label="销售项目名称" type="textarea"
          placeholder="请输入销售项目名称" />

        <van-field class="picker" v-model="form.relations" readonly rows="1" autosize label="客户名称" type="textarea"
          placeholder="请选择客户" />

        <van-field class="picker" v-model="form.unit" readonly rows="1" autosize label="承接单位" type="textarea"
          placeholder="请选择承接单位" />

        <van-field v-model="form.money" rows="1" autosize label="预计承接金额
(万元)" type="input" placeholder="请选择预计承接金额" />

        <van-field class="picker" readonly v-model="form.startDate" label="计划完成期限" placeholder="请选择日期" />

        <van-field class="picker" v-model="form.area" readonly rows="1" clickable autosize label="区域" type="textarea"
          placeholder="请选择区域" />

        <van-field class="picker" v-model="form.industry" readonly rows="1" clickable autosize label="行业"
          type="textarea" placeholder="请选择行业" />

        <van-field class="picker" v-model="form.state" readonly rows="1" clickable autosize label="业务类型" type="textarea"
          placeholder="请选择业务类型" />

        <van-field class="picker" v-model="form.scale" readonly rows="1" clickable autosize label="销售项目规模"
          type="textarea" placeholder="请选择销售项目规模" />

        <van-field class="picker" v-model="form.method" readonly rows="1" clickable autosize label="发包方式"
          type="textarea" placeholder="请选择发包方式" />

        <van-field class="picker" v-model="form.projectManager" readonly rows="1" clickable autosize label="销售项目经理"
          type="textarea" placeholder="请选择销售项目经理" />

        <van-field class="picker" v-model="form.department1" readonly rows="1" clickable autosize label="部门"
          type="textarea" placeholder="请选择部门" />

        <van-field class="picker" v-model="form.peojectChief" readonly rows="1" clickable autosize label="销售项目总监"
          type="textarea" placeholder="请选择销售项目总监" />

        <van-field class="picker" v-model="form.department2" readonly rows="1" clickable autosize label="部门"
          type="textarea" placeholder="请选择部门" />

        <van-field class="picker" v-model="form.coordinator" readonly rows="1" clickable autosize label="配合人"
          type="textarea" placeholder="请选择销配合人" />

        <van-field class="picker" v-model="form.department3" readonly rows="1" clickable autosize label="部门"
          type="textarea" placeholder="请选择部门" />

      </van-cell-group>
      <!-- 沟通员工 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="icon-client icon"></span>相关人员
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

      <!-- 客户联系人 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="require">*</span>
              <span class="icon-client icon"></span>客户联系人(至少1条)
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

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="value-info icon"></span>概况描述
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name class="text-area" cols placeholder="请输入概况描述" v-model="form.result"></textarea>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="value-info icon"></span>相关工作记录
            </h4>
          </template>
          <template #default>
            <router-link to="/upsetList" class="more">查看所有</router-link>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="block-btn" @click="makeSure">保存</div>
    </div>

    <!-- 搜索列表 -->
    <van-popup v-model="isShowSearch" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; overflow-y: scroll;">
        <div class="search-height">
          <div class="search-height-content">
            <van-nav-bar :title="searchTitle" left-arrow>
              <template #left>
                <span @click="close" class="icon back"></span>
              </template>

              <template #right v-if="currentPage=='relations'">
                <span class="icon add" @click="addCustomer"></span>
              </template>

            </van-nav-bar>
            <div class="search-box">
              <span class="searchBig"></span>
              <p class="font9">{{ searchTips }}</p>
              <van-search v-model="searchKeyWords" placeholder="请输入搜索关键词" />
            </div>
          </div>

        </div>
        <van-loading v-if="searchLoading==true" size="24px" vertical style="padding-top:2rem">
          加载中...</van-loading>
        <van-empty v-if="searchEmpty && searchLoading==false" description="暂无数据" />
        <div v-if="(searchList.length < 1 || searchEmpty)&& searchLoading==false && currentPage=='relations'"
          class="block-btn-fixed" @click="addCustomer">新增</div>
        <van-cell-group>
          <van-cell v-for="(item, key) in searchList" :key="key" @click="chooseSearch(item)">
            <template #title>
              <van-row>
                <van-col span="12">{{ item.name }}</van-col>
                <van-col span="12" class="text-right">{{ item.id }}</van-col>
              </van-row>
            </template>
            <template #label>{{ item.projectName }}</template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 开始时间 -->
    <van-popup v-model="showPickerdate1" position="bottom">
      <van-datetime-picker @cancel="showPickerdate1 = false" @confirm="confirmStartDate" v-model="startDate"
        type="date" />
    </van-popup>

    <!-- 选择弹出页面 -->
    <van-popup v-model="isShowSearchPage" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; overflow-y: scroll;">
        <job-type :list="searchPageList" :title="searchTitle" @choose="chooseSearchPage"
          @close="isShowSearchPage = false">
        </job-type>
      </div>
    </van-popup>
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
      title: '销售任务具体信息',
      showPickerdate: false,
      isShowSearchPage: false,
      isShowSearch: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      startDate: new Date(),
      searchTitle: '',
      searchTips: '',
      searchList: [],
      searchList1: [],
      searchEmpty: false, //搜索列表是否为空
      searchPageList: [],
      currentPage: '',
      searchKeyWords: '',
      searchLoading: false,
      showPickerdate1: false,
      form: {
        projectName: '桐乡市经济技术开发总公司',
        relations: '苏交科集团股份有限公司',
        unit: '苏交科集团股份有限公司',
        money: '50.00',
        startDate: '2020-09-01',
        area: '亚洲/中国/华东地区/浙江/嘉兴市',
        industry: '工程咨询/市政',
        state: '勘察设计/勘察设计',
        scale: '小型',
        method: '招投标',
        projectManager: '张清华',
        department1: '苏交科华东岩士中心',
        peojectChief: '张杰宝',
        department2: '交通规划设计院华东院院长室',
        coordinator: '陈冲',
        department3: '苏交科华东综合管理部',
        gt_employee: [
          {
            text: '黄军'
          },
          {
            text: '张清华'
          }
        ],
        customer: [
          {
            text: '唐纯'
          }
        ],
        result: '白改黑项目，拟采用Epc模式'
      }
    };
  },
  watch: {},
  methods: {
    ...mapActions({ list: 'home1/getList' })
    //点开搜索页面
  }
};
</script>

<style scoped></style>
