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

        <van-field class="picker" v-model="form.pr" required readonly rows="1"
          @click="showSearchBox('pr','查找销售任务','输入名称进行过滤')" autosize label="任务名称" type="textarea" placeholder="请选择任务" />

        <van-field class="picker" readonly required v-model="form.startDate" label="开始日期" placeholder="请选择开始日期"
          @click="showPickerdate1 = true" />

        <van-field class="picker" readonly required v-model="form.endDate" label="结束日期" placeholder="请选择结束日期"
          @click="showPickerdate2 = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="工作类型"
          type="textarea" placeholder="请选择任务" @click="isShowType = true" />
      </van-cell-group>
      <!-- 沟通员工 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="require">*</span>
              <span class="icon-client icon"></span>沟通员工(至少1条)
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

      <!-- 相关员工 -->
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="require">&nbsp;</span>
              <span class="icon-client icon"></span>相关员工
            </h4>
          </template>
          <template #right-icon>
            <span class="icon-add" @click="showSearchBox('xg_employee','查找人员','输入用户名或者工号进行过滤')">点击添加</span>
          </template>
        </van-cell>

        <van-cell v-for="(item,key) in form.xg_employee" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.projectName}}
            </h4>
          </template>
          <template #right-icon>
            <van-icon name="clear" color="#ccc" @click="remove('xg_employee',key)" />
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
              <span class="icon-client-grey icon"></span>{{item.projectName}}
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
              <span class="require">*</span>沟通事由
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name class="text-area" cols placeholder="请输入沟通事由" v-model="form.goutong"></textarea>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="require">*</span>沟通结果
            </h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name class="text-area" cols placeholder="请输入沟通结果" v-model="form.result"></textarea>
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
              <span class="require">*</span>近期客户痛点、需求
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入近期客户痛点、需求" v-model="form.need"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              <span class="require">*</span>近期发包项目信息
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入近期发包项目信息" v-model="form.packMsg"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              <span class="require">*</span>客户机会
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入客户机会信息" v-model="form.chance"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              <span class="require">&nbsp;</span>客户回款
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入客户回款信息" v-model="form.back"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin">
              <span class="require">&nbsp;</span>其他
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入其他有价值的信息" v-model="form.other"></textarea>
          </template>
        </van-cell>
      </van-cell-group>

      <div class="block-btn" @click="makeSure">确认</div>
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

              <template #right v-if="currentPage=='customer'">
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
        <van-empty v-if="searchList.length < 1 && searchLoading==false" description="暂无数据" />
        <div v-if="searchList.length < 1 && searchLoading==false && currentPage=='customer'" class="block-btn-fixed"
          @click="addCustomer">新增</div>
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
    <!-- 结束时间 -->
    <van-popup v-model="showPickerdate2" position="bottom">
      <van-datetime-picker @cancel="showPickerdate2 = false" @confirm="confirmEndDate" v-model="endDate" type="date" />
    </van-popup>
    <!-- 选择工作类型 -->
    <van-popup v-model="isShowType" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh;">
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
      title: '新增销售任务-工作记录',
      showPickerdate1: false,
      showPickerdate2: false,
      isShowType: false,
      isShowSearch: false,
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
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      startDate: new Date(),
      endDate: new Date(),
      searchTitle: '',
      searchTips: '',
      searchList: [],
      searchList1: [],
      currentPage: '',
      searchKeyWords: '',
      searchLoading: true,
      form: {
        pr: '',
        startDate: '',
        endDate: '',
        state: '',
        gt_employee: [],
        xg_employee: [],
        customer: [],
        goutong: '',
        result: '',
        need: '',
        packMsg: '',
        chance: '',
        back: '',
        other: ''
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
      this.searchLoading = true;
      //此处根据done判断需要请求的接口
      //if(done === 'pr'){}
      this.list().then(res => {
        if (res) {
          _self.searchList = res.data;
          _self.searchList1 = res.data;
          _self.searchLoading = false;
        }
      });
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
      if (!this.form.pr) {
        Toast('请选择任务');
        return false;
      }
      if (!this.form.startDate) {
        Toast('请选择开始时间');
        return false;
      }
      if (!this.form.endDate) {
        Toast('请选择结束时间');
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
        Toast('请输入沟通是由');
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
