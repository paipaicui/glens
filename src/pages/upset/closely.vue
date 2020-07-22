<template>
  <div class="page-grey">
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>
    <van-cell-group>
      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            任务概况
          </h4>
        </template>
        <template #default>
          <router-link to="/upsetMore" class="more">查看更多</router-link>
        </template>
      </van-cell>
      <van-cell title="任务名称" value-class="rightPart" :value="data.taskName" />

      <van-cell title="投标结果" value-class="rightPart">
        <template #default>
          <van-radio-group v-model="data.result" direction="horizontal">
            <van-radio name="1">
              <template #icon="props">
                <span class="radioSex" :class="props.checked ? 'activeRadio' : 'inactiveRadio'">中标</span>
              </template>
            </van-radio>
            <van-radio name="2">
              <template #icon="props">
                <span class="radioSex" :class="props.checked ? 'activeRadio' : 'inactiveRadio'">未中标</span>
              </template>
            </van-radio>
            <van-radio name="3">
              <template #icon="props">
                <span class="radioSex" :class="props.checked ? 'activeRadio' : 'inactiveRadio'">废标</span>
              </template>
            </van-radio>
          </van-radio-group>
        </template>
      </van-cell>

      <van-cell title="中标价格（万元）" value-class="rightPart">
        <template #default>
          <div class="van-cell__value van-cell__value--alone van-field__value ">
            <div class="van-field__body "><input type="text" placeholder="请输入中标价格" class="van-field__control"
                v-model="data.price">
            </div>
          </div>
        </template>
      </van-cell>

      <van-cell title="中标单位" value-class="rightPart picker">
        <template #default>
          <div class="van-cell__value van-cell__value--alone van-field__value">
            <div class="van-field__body"><input type="text" placeholder="请输入中标单位" class="van-field__control"
                v-model="data.unit">
            </div>
          </div>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            <span class="require">*</span><span class="icon icon-zh "></span>综合排名及竞争对手分析
          </h4>
        </template>
        <template #right-icon>
          <span class="icon-add" @click="showCustomerForm = true">点击添加</span>
        </template>
      </van-cell>

      <van-cell title="招标代理" value-class="rightPart picker">
        <template #default>
          <div class="van-cell__value van-cell__value--alone van-field__value">
            <div class="van-field__body"><input type="text" placeholder="请选择招标代理" class="van-field__control"
                v-model="data.agent">
            </div>
          </div>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            <span class="require">*</span><span class="icon icon-client "></span> 评标专家情况
          </h4>
        </template> <template #right-icon>
          <span class="icon-add" @click="showProfessorForm = true">点击添加</span>
        </template>
      </van-cell>

    </van-cell-group>
    <div class="position-bottom">
      <div class="block-btn">提交</div>
    </div>

    <van-overlay :show="showCustomerForm" @click="showCustomerForm = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <h4 class="title nb">增加竞争对手综合排名</h4>
          <van-cell-group>
            <van-field class="picker" readonly required v-model="customerForm.name" label="竞争对手" placeholder="请选择竞争对手"
              input-align="right" />

            <van-field class="picker" readonly required v-model="customerForm.docking" label="综合排名"
              placeholder="请选择综合排名" input-align="right" />

            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>报价
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填报价" v-model="customerForm.price"></textarea>
              </template>
            </van-cell>

            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>优劣势分析
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填写优劣势分析" v-model="customerForm.closely"></textarea>
              </template>
            </van-cell>
          </van-cell-group>
          <div class="overlay-btn-group">
            <van-row>
              <van-col span="12">
                <div class="line-btn btn-red" @click="showCustomerForm = false">取消</div>
              </van-col>
              <van-col span="12">
                <div class="line-btn btn-blue" @click="saveCustomerForm">保存</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-overlay>

    <van-overlay :show="showProfessorForm" @click="showProfessorForm = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <h4 class="title nb">增加评标专家</h4>
          <van-cell-group>
            <van-field class="picker" readonly required v-model="professorForm.name" label="姓名" placeholder="请选择评标专家"
              input-align="right" />

            <van-field class="picker" readonly required v-model="professorForm.divideWork" label="分工"
              placeholder="请选择分工" input-align="right" />

            <van-field class="picker" readonly required v-model="professorForm.communicate" label="对接人员"
              placeholder="请选择对接人员" input-align="right" />

            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>措施方案
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填写措施方案" v-model="professorForm.plan"></textarea>
              </template>
            </van-cell>
          </van-cell-group>
          <div class="overlay-btn-group">
            <van-row>
              <van-col span="12">
                <div class="line-btn btn-red" @click="showProfessorForm = false">取消</div>
              </van-col>
              <van-col span="12">
                <div class="line-btn btn-blue" @click="saveProfessorForm">保存</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-overlay>

  </div>
</template>

<script>
import { Overlay } from 'vant';
export default {
  data() {
    return {
      showCustomerForm: false,
      showProfessorForm: false,
      title: '输赢分析',
      data: {
        taskName: '2020年嘉兴市桐乡市丰庆南路改造工程50.00W',
        result: '1',
        price: '',
        unit: '',
        rival: [],
        agent: '',
        professor: []
      },
      customerForm: {
        name: '',
        docking: '',
        price: '',
        closely: ''
      },
      professorForm: {
        name: '',
        divideWork: '',
        communicate: '',
        plan: ''
      }
    };
  },
  methods: {
    saveCustomerForm() {
      this.showCustomerForm = false;
      this.customerForm = {
        name: '',
        docking: '',
        start: '',
        end: '',
        communicate: ''
      };
    },
    saveProfessorForm() {
      this.showProfessorForm = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/style/basic.less';
.van-radio--horizontal {
  margin-right: 0.16rem;
}

/deep/ .van-radio__icon {
  height: 0.24rem;
}
.radioSex {
  font-size: 12px;
  display: flex;
  height: 0.24rem;
  width: 0.48rem;
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