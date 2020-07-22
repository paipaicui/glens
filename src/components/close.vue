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
      <van-field class="picker" v-model="closeInfo.date" required name="任务完成时间" label="任务完成时间"
        @click="showPickerdate1 = true" />
      <van-field class="picker" readonly v-model="closeInfo.post" required name="丢单对象" label="丢单对象"
        placeholder="请选择丢单对象" />
      <van-field class="picker" readonly v-model="closeInfo.why" name="丢单原因" label="丢单原因" placeholder="请选择丢单原因"
        @click="showWhy = true" />
    </van-cell-group>
    <p class="tips-red">重要提示：点击：“关闭”按钮则放弃跟踪并关闭该任务！</p>
    <div class="position-bottom">
      <div class="block-btn" @click="submit">提交</div>
    </div>

    <van-popup v-model="showPickerdate1" position="bottom">
      <van-datetime-picker @cancel="showPickerdate1 = false" @confirm="confirmStartDate" v-model="today" type="date" />
    </van-popup>

    <van-popup v-model="showWhy" position="right" duration=".1" :overlay="false" :style="{ width: '100%' }">
      <div style="height: 100vh; overflow-y: scroll;">
        <div class="nav-height">
          <van-nav-bar title="请选择丢单原因" left-arrow>
            <template #left>
              <span @click="showWhy='false'" class="icon back"></span>
            </template>
            <template #right>
              <span @click="chooseWhy">完成</span>
            </template>
          </van-nav-bar>
        </div>

        <van-radio-group v-model="choose">
          <van-cell v-for="(item,key) in radio" :key="key">
            <template #title>
              <van-radio :name="item.value">{{item.label}}</van-radio>
            </template>
          </van-cell>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import formatDate from '@/assets/js/date.js';
export default {
  data() {
    return {
      showPickerdate1: false,
      showWhy: false,
      today: new Date(),
      closeInfo: {
        date: formatDate.date('YYYY-mm-dd', new Date()),
        post: '',
        why: ''
      },
      choose: 1,
      radio: [
        {
          value: 1,
          label: '客户、专家不认可'
        },
        {
          value: 2,
          label: '业务能力无优势'
        },
        {
          value: 3,
          label: '未参与前期工作'
        },
        {
          value: 4,
          label: '业务内定'
        },
        {
          value: 5,
          label: '不满足招标文件要求'
        },
        {
          value: 6,
          label: '营销策略失误'
        },
        {
          value: 7,
          label: '出现恶性竞争'
        },
        {
          value: 8,
          label: '其他原因'
        }
      ]
    };
  },
  methods: {
    confirmStartDate(val) {
      this.closeInfo.date = formatDate.date('YYYY-mm-dd', val);
      this.showPickerdate1 = false;
    },
    chooseWhy() {},
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('submit', this.closeInfo);
    }
  }
};
</script>

<style>
</style>