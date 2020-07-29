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
        <van-field v-model="form.projectName" required rows="1" autosize label="销售项目名称" type="textarea"
          placeholder="请输入销售项目名称" />

        <van-field class="picker" v-model="form.relations" required readonly rows="1"
          @click="showSearchBox('relations','请选择客户','输入客户名称进行过滤')" autosize label="客户名称" type="textarea"
          placeholder="请选择客户" />

        <van-field class="picker" v-model="form.unit" required readonly rows="1"
          @click="showSearchBox('unit','请选择承接单位','输入承接单位进行过滤')" autosize label="承接单位" type="textarea"
          placeholder="请选择承接单位" />

        <van-field v-model="form.money" required rows="1" autosize label="预计承接金额
(万元)" type="input" placeholder="请选择预计承接金额" />

        <van-field class="picker" readonly required v-model="form.startDate" label="计划完成期限" placeholder="请选择日期"
          @click="showPickerdate1 = true" />

        <van-field class="picker" v-model="form.area" required readonly rows="1" clickable autosize label="区域"
          type="textarea" placeholder="请选择区域" @click="showSearchPage('请选择区域','area')" />

        <van-field class="picker" v-model="form.industry" required readonly rows="1" clickable autosize label="行业"
          type="textarea" placeholder="请选择行业" @click="showSearchPage('请选择行业','industry')" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="业务类型"
          type="textarea" placeholder="请选择业务类型" @click="showSearchPage('请选择业务类型','state')" />

        <van-field class="picker" v-model="form.scale" required readonly rows="1" clickable autosize label="销售项目规模"
          type="textarea" placeholder="请选择销售项目规模" @click="showSearchPage('请选择销售项目规模','scale')" />

        <van-field class="picker" v-model="form.method" required readonly rows="1" clickable autosize label="发包方式"
          type="textarea" placeholder="请选择发包方式" @click="showSearchPage('请选择发包方式','method')" />

        <van-field class="picker" v-model="form.projectManager" required readonly rows="1" clickable autosize
          label="销售项目经理" type="textarea" placeholder="请选择销售项目经理"
          @click="showSearchPage('请选择销售项目经理','projectManager')" />

        <van-field class="picker" v-model="form.department1" readonly rows="1" clickable autosize label="部门"
          type="textarea" placeholder="请选择部门" @click="showSearchPage('请选择部门','department1')" />

        <van-field class="picker" v-model="form.peojectChief" required readonly rows="1" clickable autosize
          label="销售项目总监" type="textarea" placeholder="请选择销售项目总监" @click="showSearchPage('请选择销售项目总监','peojectChief')" />

        <van-field class="picker" v-model="form.department2" readonly rows="1" clickable autosize label="部门"
          type="textarea" placeholder="请选择部门" @click="showSearchPage('请选择部门','department2')" />

        <van-field class="picker" v-model="form.coordinator" required readonly rows="1" clickable autosize label="配合人"
          type="textarea" placeholder="请选择销配合人" @click="showSearchPage('请选择销配合人','coordinator')" />

        <van-field class="picker" v-model="form.department3" readonly rows="1" clickable autosize label="部门"
          type="textarea" placeholder="请选择部门" @click="showSearchPage('请选择部门','department3')" />

      </van-cell-group>
      <!-- 沟通员工 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="icon-client icon"></span>相关人员
            </h4>
          </template>
          <template #right-icon>
            <span class="icon-add" @click="showSearchBox('gt_employee','查找人员','输入用户名或者工号进行过滤')">点击添加</span>
          </template>
        </van-cell>
        <van-cell v-for="(item,key) in form.gt_employee" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.text}}
            </h4>
          </template>
          <template #right-icon>
            <van-icon name="clear" color="#ccc" @click="remove('gt_employee',key)" />
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
          <template #right-icon>
            <span class="icon-add" @click="showSearchBox('customer','查找客户联系人','输入客户联系人姓名(精确查找)')">点击添加</span>
          </template>
        </van-cell>
        <van-cell v-for="(item,key) in form.customer" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.text}}
            </h4>
          </template>
          <template #right-icon>
            <van-icon name="clear" color="#ccc" @click="remove('customer',key)" />
          </template>
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
          <textarea name class="text-area" cols placeholder="请输入概况描述" v-model="form.result"></textarea>
        </van-cell>
      </van-cell-group>
      <div class="block-btn" @click="makeSure">保存</div>
    </div>

    <!-- 搜索列表 -->
    <van-popup v-model="isShowSearch" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; ">
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
        <div class="search-list">
          <van-loading v-if="searchLoading==true" size="24px" vertical style="padding-top:2rem">
            加载中...</van-loading>
          <van-empty :image="require('@/assets/images/Icon/pic_default_graph.png')"
            v-if="searchEmpty && searchLoading==false" description="暂无数据" />
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
      </div>
    </van-popup>
    <!-- 开始时间 -->
    <van-popup v-model="showPickerdate1" position="bottom">
      <van-datetime-picker @cancel="showPickerdate1 = false" @confirm="confirmStartDate" v-model="startDate"
        type="date" />
    </van-popup>

    <!-- 选择弹出页面 -->
    <van-popup v-model="isShowSearchPage" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; ">
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
    jobType,
  },

  data() {
    return {
      title: '修改销售任务具体信息',
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
            text: '黄军',
          },
          {
            text: '张清华',
          },
        ],
        customer: [
          {
            text: '唐纯',
          },
        ],
        result: '白改黑项目，拟采用Epc模式',
      },
    };
  },
  watch: {
    searchKeyWords(val) {
      this.filter(val);
    },
  },
  methods: {
    ...mapActions({ list: 'home1/getList' }),
    //点开搜索页面
    showSearchBox(done, title, tips) {
      let _self = this;
      this.currentPage = done;
      this.isShowSearch = true;
      this.searchTitle = title;
      this.searchTips = tips;

      //此处根据done判断需要请求的接口
      this.list().then((res) => {
        if (res) {
          _self.searchList = res.data;
          _self.searchList1 = res.data;
        }
      });
    },
    //搜索框
    filter(val) {
      let search = [];
      this.searchList1.map((item) => {
        if (item.name.indexOf(val) > -1 || item.projectName.indexOf(val) > -1) {
          search.push(item);
        }
      });
      this.searchList = search;
    },
    //选择当前搜索值
    chooseSearch(val) {
      console.log(val);
      switch (this.currentPage) {
        case 'relations':
        case 'unit':
          this.form[this.currentPage] = val.projectName;
          //执行搜索

          //搜索结果为空，展示空页面
          //if(data.length<1){
          //   this.searchEmpty = true;
          // }
          this.searchEmpty = true;

          break;

        case 'gt_employee':
        case 'customer':
          this.form[this.currentPage].push(val);
          break;

        default:
          break;
      }
      this.close();
    },
    remove(name, index) {
      this.form[name].splice(index, 1);
    },
    close() {
      this.isShowSearch = false;
      this.searchKeyWords = '';
      this.searchTitle = '';
      this.searchTips = '';
      this.searchList = [];
      this.searchEmpty = false;
    },
    confirmStartDate(val) {
      this.form.startDate = formatDate.date('YYYY-mm-dd', val);
      this.showPickerdate1 = false;
    },
    confirmEndDate(val) {
      this.form.endDate = formatDate.date('YYYY-mm-dd', val);
      this.showPickerdate2 = false;
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
      this.form[this.currentPage] = val.text;
      this.isShowSearchPage = false;
      this.searchPageList = [];
    },
    addCustomer() {
      this.$router.push({ path: '/addCustomer' });
    },
    makeSure() {
      if (!this.form.relations) {
        Toast('请选择任务');
        return false;
      }
      if (!this.form.startDate) {
        Toast('请选择开始时间');
        return false;
      }
      if (!this.form.state) {
        Toast('请选择工作类型');
        return false;
      }
      if (this.form.gt_employee.length == 0) {
        Toast('请选择沟通员工');
        return false;
      }
      if (this.form.customer.length == 0) {
        Toast('请选择客户联系人');
        return false;
      }
      if (!this.form.goutong.trim()) {
        Toast('请输入交流话题');
        return false;
      }
      if (!this.form.result.trim()) {
        Toast('请输入沟通结果');
        return false;
      }
      if (!this.form.need.trim()) {
        Toast('请输入近期客户痛点、需求');
        return false;
      }
      if (!this.form.need.trim()) {
        Toast('请输入近期发包项目信息');
        return false;
      }
      if (!this.form.chance.trim()) {
        Toast('请输入客户机会信息');
        return false;
      }
      //提交表单
    },
  },
};
</script>

<style scoped></style>
