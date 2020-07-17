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
      </van-cell-group>

      <div class="block-btn" @click="makeSure">确认</div>
    </div>

    <!-- 搜索列表 -->

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
      title: '创建客户联系人',
      form: {
        name: '',
        sex: 'male'
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
    makeSure() {}
  }
};
</script>

<style scoped>
.van-radio__icon {
  height: auto;
}
</style>
