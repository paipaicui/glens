<template>
  <div class="page-grey">
    <van-nav-bar :title="title" left-arrow>
      <template #left>
        <span @click="$router.go(-1)" class="icon back"></span>
      </template>
    </van-nav-bar>
    <div>
      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin"><span class="base-info icon"></span>基本信息</h4>
          </template>
        </van-cell>

        <van-field class=" picker" v-model="form.pr" required readonly rows="1" clickable autosize label="任务名称"
          type="textarea" placeholder="请选择任务" />

        <van-field class="picker" readonly clickable name="calendar" required :value="form.startDate" label="开始日期"
          placeholder="请选择开始日期" @click="showPickerdate1 = true" />

        <van-field class="picker" readonly clickable name="calendar" required :value="form.endDate" label="结束日期"
          placeholder="请选择结束日期" @click="showPickerdate2 = true" />

        <van-field class="picker" v-model="form.state" required readonly rows="1" clickable autosize label="工作类型"
          type="textarea" placeholder="请选择任务" />

      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin"><span class="require">*</span><span class="icon-client icon"></span>沟通员工(至少1条)
            </h4>
          </template>
          <template #right-icon>
            <span class="icon-add">点击添加</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin"><span class="require">&nbsp;</span><span class="icon-client icon"></span>相关员工
            </h4>
          </template>
          <template #right-icon>
            <span class="icon-add">点击添加</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin"><span class="require">*</span><span class="icon-client icon"></span>客户联系人(至少1条)
            </h4>
          </template>
          <template #right-icon>
            <span class="icon-add">点击添加</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin"><span class="require">*</span>沟通事由</h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name="" class="text-area" cols="" placeholder="请输入沟通事由"></textarea>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin"><span class="require">*</span>沟通结果</h4>
          </template>
        </van-cell>
        <van-cell>
          <textarea name="" class="text-area" cols="" placeholder="请输入沟通结果"></textarea>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell>
          <template #title>
            <h4 class="cell-title thin"><span class="value-info icon"></span>有价值信息</h4>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin"><span class="require">*</span>近期客户痛点、需求</h4>
          </template>
          <template #label>
            <textarea name="" class="text-area" cols="" placeholder="请输入近期客户痛点、需求"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin"><span class="require">*</span>近期发包项目信息</h4>
          </template>
          <template #label>
            <textarea name="" class="text-area" cols="" placeholder="请输入近期发包项目信息"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin"><span class="require">*</span>客户机会</h4>
          </template>
          <template #label>
            <textarea name="" class="text-area" cols="" placeholder="请输入客户机会信息"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin"><span class="require">&nbsp;</span>客户回款</h4>
          </template>
          <template #label>
            <textarea name="" class="text-area" cols="" placeholder="请输入客户回款信息"></textarea>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <h4 class="cell-title height40 thin"><span class="require"> &nbsp;</span>其他</h4>
          </template>
          <template #label>
            <textarea name="" class="text-area" cols="" placeholder="请输入其他有价值的信息"></textarea>
          </template>
        </van-cell>

      </van-cell-group>

      <div class="block-btn">确认</div>

      <van-popup v-model="showPickerdate1" position="bottom">
        <van-datetime-picker v-model="form.startDate" type="date" :min-date="minDate" :max-date="maxDate" />
      </van-popup>

      <van-popup v-model="showPickerdate2" position="bottom">
        <van-datetime-picker v-model="form.endDate" type="date" :min-date="minDate" :max-date="maxDate" />
      </van-popup>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '新增销售任务-工作记录',
      showPickerdate1: false,
      showPickerdate2: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),

      form: {
        pr: '',
        startDate: '',
        endDate: '',
        state: ''
      }
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>

<style scoped>
</style>