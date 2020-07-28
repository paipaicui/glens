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
              基本信息
            </h4>
          </template>
        </van-cell>
        <van-field v-model="form.name" required name="姓名" label="姓名" placeholder="请输入姓名" />
        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="form.sex" direction="horizontal">
              <van-radio name="male">
                <template #icon="props">
                  <span class="radioSex" :class="props.checked ? 'activeRadio' : 'inactiveRadio'">男</span>
                </template>
              </van-radio>
              <van-radio name="female">
                <template #icon="props">
                  <span class="radioSex" :class="props.checked ? 'activeRadio' : 'inactiveRadio'">女</span>
                </template>
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-model="form.department" required name="部门" label="部门" placeholder="请输入部门" />
        <van-field v-model="form.post" required name="职务" label="职务" placeholder="请输入职务" />
        <van-field v-model="form.customer" name="客户" label="客户" placeholder="请输入客户" />

        <van-field v-model="form.maintainer" readonly class="picker" required name="维护人" label="维护人"
          placeholder="请选择维护人" @click="showSearchBox('maintainer','查找维护人','输入维护人姓名或id')" />
        <van-field v-model="form.maintainDepartment" readonly class="picker" name="维护部门" label="维护部门"
          placeholder="请选择维护部门" @click="showSearchBox('maintainDepartment','查找维护部门','输入维护部门查询')" />
        <van-field v-model="form.superior" readonly class="picker" name="直接上级" label="直接上级" placeholder="请选择直接上级"
          @click="showSearchBox('superior','查找直接上级','输入直接上级查询')" />

        <van-field v-model="form.tel" required name="办公电话" label="办公电话" placeholder="请输入办公电话" />
        <van-field v-model="form.mobile" required name="移动电话" label="移动电话" placeholder="请输入移动电话" />
        <van-field v-model="form.address" required name="办公地点" label="办公地点" placeholder="请输入办公地点" />
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              简历信息
            </h4>
          </template>
        </van-cell>
        <van-field v-model="form.school" name="毕业院校" label="毕业院校" placeholder="请输入毕业院校" />
        <van-field v-model="form.graduation " name="毕业时间" label="毕业时间" placeholder="请输入毕业时间" />
        <van-field v-model="form.major" name="专业" label="专业" placeholder="请输入专业" />
        <van-field v-model="form.nativePlace" name="籍贯" label="籍贯" placeholder="请输入籍贯" />
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
        <van-empty :image="require('@/assets/images/Icon/pic_default_graph.png')"
          v-if="searchList.length < 1 && searchLoading==false" description="暂无数据" />

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
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Toast } from 'vant';
export default {
  data() {
    return {
      title: '创建客户联系人',

      isShowSearch: false,
      searchTitle: '',
      searchTips: '',
      searchList: [],
      searchList1: [],
      currentPage: '',
      searchKeyWords: '',
      searchLoading: true,

      form: {
        name: '',
        sex: 'male',
        department: '',
        post: '',
        customer: '',
        maintainer: '',
        maintainDepartment: '',
        superior: '',
        tel: '',
        mobile: '',
        address: '',
        school: '',
        graduation: '',
        major: '',
        nativePlace: '',
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
      this.searchLoading = true;
      //此处根据done判断需要请求的接口
      //if(done === 'pr'){}
      this.list().then((res) => {
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
      this.searchList1.map((item) => {
        if (item.name.indexOf(val) > -1 || item.projectName.indexOf(val) > -1) {
          search.push(item);
        }
      });
      this.searchList = search;
    },
    //选择当前搜索值
    chooseSearch(val) {
      this.form[this.currentPage] = val.projectName;
      this.close();
    },
    close() {
      this.isShowSearch = false;
      this.searchKeyWords = '';
      this.searchTitle = '';
      this.searchTips = '';
      this.searchList = [];
    },
    makeSure() {
      if (!this.form.name.trim()) {
        Toast('请输入姓名');
        return false;
      }
      if (!this.form.department.trim()) {
        Toast('请输入部门');
        return false;
      }
      if (!this.form.post.trim()) {
        Toast('请输入职务');
        return false;
      }
      if (!this.form.maintainer.trim()) {
        Toast('请选择维护人');
        return false;
      }
      if (!this.form.tel.trim()) {
        Toast('请输入办公电话');
        return false;
      }
      if (!this.form.mobile.trim()) {
        Toast('请输入移动电话');
        return false;
      }

      if (!this.form.address.trim()) {
        Toast('请输入办公地点');
        return false;
      }

      if (
        !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.form.mobile.trim())
      ) {
        Toast('办公电话有误，请重填');
        return false;
      }

      if (!/^1[3456789]\d{9}$/.test(this.form.mobile.trim())) {
        Toast('移动电话有误，请重填');
        return false;
      }

      //提交表单
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/style/basic.less';
.van-radio--horizontal {
  margin-right: 0.24rem;
}

/deep/ .van-radio__icon {
  height: 0.24rem;
}
.radioSex {
  font-size: 12px;
  display: flex;
  height: 0.24rem;
  width: 0.38rem;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}
.activeRadio {
  background: @blue-color;
  color: @white;
}

.inactiveRadio {
  background: #ccc;
  color: #fff;
}
</style>
