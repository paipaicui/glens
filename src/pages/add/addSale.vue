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
          @click="showSearchBox('unit','请选择承接单位','输入客户名称进行过滤')" autosize label="承接单位" type="textarea"
          placeholder="请选择承接单位" />

        <van-field v-model="form.projectName" required rows="1" autosize label="预计承接金额
(万元)" type="input" placeholder="请选择预计承接金额" />

        <van-field class="picker" readonly required v-model="form.startDate" label="计划完成期限" placeholder="请选择日期"
          @click="showPickerdate1 = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="区域"
          type="textarea" placeholder="请选择区域" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="行业"
          type="textarea" placeholder="请选择行业" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="业务类型"
          type="textarea" placeholder="请选择业务类型" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="销售项目规模"
          type="textarea" placeholder="请选择销售项目规模" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="发包方式"
          type="textarea" placeholder="请选择发包方式" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="销售项目经理"
          type="textarea" placeholder="请选择销售项目经理" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" readonly rows="1" clickable autosize label="部门" type="textarea"
          placeholder="请选择部门" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="销售项目总监"
          type="textarea" placeholder="请选择销售项目总监" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" readonly rows="1" clickable autosize label="部门" type="textarea"
          placeholder="请选择部门" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="配合人"
          type="textarea" placeholder="请选择销配合人" @click="isShowType = true" />

        <van-field class="picker" v-model="form.state" readonly rows="1" clickable autosize label="部门" type="textarea"
          placeholder="请选择部门" />

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
              <span class="icon-client-grey icon"></span>{{item.projectName}}
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

    <!-- 选择工作类型 -->
    <van-popup v-model="isShowType" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; overflow-y: scroll;">
        <job-type :list="workType" title="请选择工作类型" @choose="chosseWorkType" @close="isShowType = false"></job-type>
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
      title: '新增公共关系-工作记录',
      showPickerdate: false,
      isShowType: false,
      isShowSearch: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      startDate: new Date(),
      searchTitle: '',
      searchTips: '',
      searchList: [],
      searchList1: [],
      searchEmpty: false, //搜索列表是否为空
      workType: [
        {
          text: '拜访接待',
          image: require('@/assets/images/Icon/ic_job_visit.png')
        },
        {
          text: '会议沟通',
          image: require('@/assets/images/Icon/ic_job_meeting.png')
        },
        {
          text: '电话联系',
          image: require('@/assets/images/Icon/ic_job_phone.png')
        },
        {
          text: '邮件联系',
          image: require('@/assets/images/Icon/ic_job_mail.png')
        },
        {
          text: '回访记录',
          image: require('@/assets/images/Icon/ic_job_return_visit.png')
        }
      ],
      currentPage: '',
      searchKeyWords: '',
      searchLoading: false,
      showPickerdate1: false,
      form: {
        relations: '',
        startDate: '',
        state: '',
        gt_employee: [],
        customer: [],
        goutong: '',
        need: '',
        packMsg: '',
        chance: '',
        back: '',
        other: '',
        push: [],
        pushContent: ''
      }
    };
  },
  watch: {
    searchKeyWords(val) {
      this.filter(val);
    }
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
    },
    //搜索框
    filter(val) {
      let search = [];
      this.searchList1.map(item => {
        if (item.name.indexOf(val) > -1 || item.projectName.indexOf(val) > -1) {
          search.push(item);
        }
      });
      this.searchList = search;
    },
    //选择当前搜索值
    chooseSearch(val) {
      switch (this.currentPage) {
        case 'pr':
          this.form[this.currentPage] = val.projectName;
          //执行搜索

          //搜索结果为空，展示空页面
          //if(data.length<1){
          //   this.searchEmpty = true;
          // }
          this.searchEmpty = true;

          break;

        case 'gt_employee':
        case 'xg_employee':
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
    chosseWorkType(val) {
      this.form.state = val.text;
      this.isShowType = false;
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
    }
  }
};
</script>

<style scoped></style>
