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
        <van-field v-model="form.name" required name="竞争对手名称" label="竞争对手名称" placeholder="请输入竞争对手名称" />
        <van-field v-model="form.num" name="竞争对手编码" label="竞争对手编码" placeholder="请输入竞争对手编码" />
        <van-field v-model="form.address" name="地址" label="地址" placeholder="请输入请输入地址" />
        <van-field v-model="form.area" class="picker" readonly name="所在区域" label="所在区域" placeholder="请选择所在区域" />
        <van-field v-model="form.code" name="邮编" label="邮编" placeholder="请输入请输入邮编" />
        <van-cell>
          <template #title>
            <h4 class="cell-title thin" style="padding-bottom:.08rem">优势
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入优势" v-model="form.advantage"></textarea>
          </template>

        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin " style="padding-bottom:.08rem">劣势
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入劣势" v-model="form.inferiority"></textarea>
          </template>
        </van-cell>

        <van-cell>
          <template #title>
            <h4 class="cell-title thin">
              <span class="icon-client icon"></span>相关人员
            </h4>
          </template>
          <template #right-icon>
            <span class="icon-add" @click="showSearchBox('relevant','查找人员','输入用户名或者工号进行过滤')">点击添加</span>
          </template>
        </van-cell>
        <van-cell v-for="(item,key) in form.relevant" :key="key">
          <template #title>
            <h4 class="cell-title font6 thin">
              <span class="icon-client-grey icon"></span>{{item.projectName}}
            </h4>
          </template>
          <template #right-icon>
            <van-icon name="clear" color="#ccc" @click="remove('relevant',key)" />
          </template>
        </van-cell>

      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin " style="padding-bottom:.08rem">备注
            </h4>
          </template>
          <template #label>
            <textarea name class="text-area" cols placeholder="请输入备注" v-model="form.remarks"></textarea>
          </template>
        </van-cell>
      </van-cell-group>

      <div class="block-btn" @click="add">确认</div>

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
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      title: '创建竞争对手',
      isShowSearch: false,
      searchTitle: '',
      searchTips: '',
      searchList: [],
      currentPage: '',
      searchKeyWords: '',
      searchLoading: false,
      form: {
        name: '',
        num: '',
        address: '',
        area: '',
        code: '',
        advantage: '',
        inferiority: '',
        relevant: [],
        remarks: '',
      },
    };
  },
  methods: {
    ...mapActions({ list: 'home1/getList' }),
    add() {
      console.log('tijiao');
    },
    close() {
      this.isShowSearch = false;
      this.searchKeyWords = '';
      this.searchTitle = '';
      this.searchTips = '';
      this.searchList = [];
    },
    showSearchBox(done, title, tips) {
      let _self = this;
      this.currentPage = done;
      this.isShowSearch = true;
      this.searchTitle = title;
      this.searchTips = tips;

      //此处根据done判断需要请求的接口

      _self.searchLoading = true;
      _self.list().then((res) => {
        if (res) {
          _self.searchList = res.data;
          _self.searchLoading = false;
        }
      });
    },
    chooseSearch(val) {
      this.form[this.currentPage].push(val);
      this.close();
    },
    remove(name, index) {
      this.form[name].splice(index, 1);
    },
  },
};
</script>

<style>
</style>