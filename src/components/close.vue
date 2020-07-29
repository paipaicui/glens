<template>
  <div>
    <div class="nav-height">
      <van-nav-bar title="任务关闭" left-arrow>
        <template #left>
          <span @click="close" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>

    <van-cell-group>
      <van-field
        class="picker"
        v-model="closeInfo.date"
        required
        name="任务完成时间"
        label="任务完成时间"
        @click="showPickerdate1 = true"
      />
      <van-field
        class="picker"
        readonly
        v-model="closeInfo.post.name"
        required
        name="丢单对象"
        label="丢单对象"
        placeholder="请选择丢单对象"
        @click="isShowSearch=true"
      />
      <template v-for="(item,key) in radio">
        <van-field
          class="picker"
          readonly
          :key="key"
          v-if="item.value==closeInfo.why"
          name="丢单原因"
          label="丢单原因"
          placeholder="请选择丢单原因"
          @click="showWhy = true"
          v-model="item.label"
        />
      </template>
      <van-field
        class="picker"
        readonly
        v-if="closeInfo.why==''"
        name="丢单原因"
        label="丢单原因"
        placeholder="请选择丢单原因"
        @click="showWhy = true"
      />
    </van-cell-group>
    <p class="tips-red">重要提示：点击：“关闭”按钮则放弃跟踪并关闭该任务！</p>
    <div class="position-bottom">
      <div class="block-btn" @click="submit">提交</div>
    </div>

    <van-popup v-model="showPickerdate1" position="bottom">
      <van-datetime-picker
        @cancel="showPickerdate1 = false"
        @confirm="confirmStartDate"
        v-model="today"
        type="date"
      />
    </van-popup>

    <van-popup
      v-model="showWhy"
      position="right"
      duration=".1"
      :overlay="false"
      :style="{ width: '100%' }"
    >
      <div style="height: 100vh; ">
        <div class="nav-height">
          <van-nav-bar title="请选择丢单原因" left-arrow>
            <template #left>
              <span @click="showWhy=false" class="icon back"></span>
            </template>
            <template #right>
              <span @click="chooseWhy" style="color:#fff">完成</span>
            </template>
          </van-nav-bar>
        </div>
<div class="page-scroll">
        <van-radio-group v-model="choose">
          <van-cell v-for="(item,key) in radio" :key="key">
            <template #title>
              <van-radio :name="item.value">{{item.label}}</van-radio>
            </template>
          </van-cell>
        </van-radio-group>
</div>

      </div>
    </van-popup>

    <van-popup
      v-model="isShowSearch"
      position="right"
      duration=".1"
      :overlay="false"
      :style="{ width: '100%' }"
    >
      <div style="height: 100vh;">
        <div class="search-height">
          <div class="search-height-content">
            <van-nav-bar title="查找竞争对手" left-arrow>
              <template #left>
                <span @click="isShowSearch=false,searchKeyWords='',searchList=[]" class="icon back"></span>
              </template>

              <template #right>
                <span class="icon add" @click="addCompetition"></span>
              </template>
            </van-nav-bar>
            <div class="search-box">
              <span class="searchBig"></span>
              <p class="font9">输入名称进行过滤</p>
              <van-search v-model="searchKeyWords" placeholder="请输入名称" />
            </div>
          </div>
        </div>
        <div class="search-list">
          <van-loading
            v-if="searchLoading==true"
            size="24px"
            vertical
            style="padding-top:2rem"
          >加载中...</van-loading>
          <van-empty
            :image="require('@/assets/images/Icon/pic_default_graph.png')"
            v-if="searchList.length < 1 && searchLoading==false"
            description="暂无数据"
          />
          <div
            v-if="searchList.length < 1 && searchLoading==false "
            class="block-btn-fixed"
            @click="addCompetition"
          >新增</div>
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
import formatDate from "@/assets/js/date.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showPickerdate1: false,
      showWhy: false,
      isShowSearch: false,
      today: new Date(),
      closeInfo: {
        date: formatDate.date("YYYY-mm-dd", new Date()),
        post: {},
        why: 0,
      },
      searchLoading: false,
      searchList: [],
      searchKeyWords: "",
      choose: 1,
      radio: [
        {
          value: 1,
          label: "客户、专家不认可",
        },
        {
          value: 2,
          label: "业务能力无优势",
        },
        {
          value: 3,
          label: "未参与前期工作",
        },
        {
          value: 4,
          label: "业务内定",
        },
        {
          value: 5,
          label: "不满足招标文件要求",
        },
        {
          value: 6,
          label: "营销策略失误",
        },
        {
          value: 7,
          label: "出现恶性竞争",
        },
        {
          value: 8,
          label: "其他原因",
        },
      ],
    };
  },
  watch: {
    searchKeyWords(val) {
      this.filter(val);
    },
  },
  methods: {
    ...mapActions({ list: "home1/getList" }),
    confirmStartDate(val) {
      this.closeInfo.date = formatDate.date("YYYY-mm-dd", val);
      this.showPickerdate1 = false;
    },
    chooseWhy() {
      this.closeInfo.why = this.choose;
      this.showWhy = false;
    },
    close() {
      this.$emit("close");
    },
    //搜索框
    filter(val) {
      this.searchLoading = true;
      this.list().then((res) => {
        if (res) {
          this.searchList = res.data;
          this.searchLoading = false;
        }
      });
    },
    chooseSearch(val) {
      this.closeInfo.post = val;
      this.isShowSearch = false;
      this.searchKeyWords = "";
      this.searchList = [];
    },
    addCompetition() {
      this.$router.push("/addCompetition");
    },
    submit() {
      this.$emit("submit", this.closeInfo);
    },
  },
};
</script>

<style>
</style>