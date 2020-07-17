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
        <van-field v-model="form.customer" required name="客户名称" label="客户名称" placeholder="请输入客户名称" />

        <van-field v-model="form.superior" readonly required class="picker" name="上级单位" label="上级单位"
          placeholder="请选择上级单位" @click="showSearchBox('superior','选择上级单位')" />

        <van-field v-model="form.category" readonly required class="picker" name="客户分类" label="客户分类"
          placeholder="请选择客户分类" @click="showSearchBox('category','选择客户分类')" />

        <van-field v-model="form.area" readonly required class="picker" name="所在区域" label="所在区域" placeholder="请选择所在区域"
          @click="showSearchBox('area','选择所在区域')" />

        <van-field v-model="form.address" required name="详细地址" label="详细地址" placeholder="请输入详细地址" />
      </van-cell-group>

      <div class="block-btn" @click="makeSure">确认</div>
    </div>

    <!-- 搜索列表 -->
    <van-popup v-model="isShowSearch" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; overflow-y: scroll;">
        <job-type v-if="isShowSearch" :list="searchList" :title="sarchTitle" @choose="chooseSearch" @close="close">
        </job-type>
      </div>
    </van-popup>
  </div>
</template>

<script>
import jobType from '@/components/jobType';
import { mapActions } from 'vuex';
import { Toast } from 'vant';
export default {
  components: {
    jobType
  },
  data() {
    return {
      title: '创建客户',
      isShowSearch: false,
      sarchTitle: '',
      searchList: [],
      currentPage: '',
      form: {
        customer: '',
        superior: '',
        category: '',
        area: '',
        address: ''
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
    showSearchBox(done, title) {
      let _self = this;
      this.currentPage = done;
      this.sarchTitle = title;
      this.isShowSearch = true;
      //此处根据done判断需要请求的接口
      this.list().then(res => {
        if (res) {
          _self.searchList = res.data;
        }
      });
    },
    //选择当前搜索值
    chooseSearch(val) {
      this.form[this.currentPage] = val.text;
      this.close();
      this.searchList = [];
    },
    close() {
      this.isShowSearch = false;
      this.searchList = [];
    },
    makeSure() {
      if (!this.form.customer.trim()) {
        Toast('请输入客户名称');
        return false;
      }
      if (!this.form.superior.trim()) {
        Toast('请选择上级单位');
        return false;
      }
      if (!this.form.category.trim()) {
        Toast('请选择客户分类');
        return false;
      }
      if (!this.form.area.trim()) {
        Toast('请选择所在区域');
        return false;
      }
      if (!this.form.address.trim()) {
        Toast('请输入详细地址');
        return false;
      }

      //提交表单
    }
  }
};
</script>

<style >
</style>
