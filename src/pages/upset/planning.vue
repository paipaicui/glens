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

      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            <span class="require">&nbsp;</span>客户及关键决策人情况（至少2条）
          </h4>
        </template>
        <template #right-icon>
          <span class="icon-add" @click="showCustomerForm = true">点击添加</span>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            <span class="require">&nbsp;</span>执行人情况（至少2条）
          </h4>
        </template>
        <template #right-icon>
          <span class="icon-add" @click="showExecutorForm = true">点击添加</span>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            竞争对手情况
          </h4>
        </template>
        <template #right-icon>
          <span class="icon-add" @click="showCompetitorForm = true">点击添加</span>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            合作单位情况
          </h4>
        </template>
        <template #right-icon>
          <span class="icon-add" @click="showPartnerForm = true">点击添加</span>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h4 class="cell-title thin">
            评标专家情况
          </h4>
        </template>
        <template #right-icon>
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
          <h4 class="title nb">增加客户及关键决策人</h4>
          <van-cell-group>
            <van-field class="picker" readonly required v-model="customerForm.name" label="决策人姓名" placeholder="请选择决策人"
              input-align="right" />

            <van-field class="picker" readonly required v-model="customerForm.docking" label="对接人员"
              placeholder="请选择对接人员" input-align="right" />

            <van-field class="picker" readonly required v-model="customerForm.start" label="开始日期" input-align="right" />

            <van-field class="picker" readonly required v-model="customerForm.end" label="结束日期" input-align="right" />

            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>沟通事项
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填写沟通事项"
                  v-model="customerForm.communicate"></textarea>
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

    <van-overlay :show="showExecutorForm" @click="showExecutorForm = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <h4 class="title nb">增加执行人</h4>
          <van-cell-group>
            <van-field class="picker" readonly required v-model="executorForm.name" label="决策人姓名" placeholder="请选择决策人"
              input-align="right" />

            <van-field class="picker" readonly required v-model="executorForm.docking" label="对接人员"
              placeholder="请选择对接人员" input-align="right" />

            <van-field class="picker" readonly required v-model="executorForm.start" label="开始日期" input-align="right" />

            <van-field class="picker" readonly required v-model="executorForm.end" label="结束日期" input-align="right" />

            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>沟通事项
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填写沟通事项"
                  v-model="executorForm.communicate"></textarea>
              </template>
            </van-cell>
          </van-cell-group>
          <div class="overlay-btn-group">
            <van-row>
              <van-col span="12">
                <div class="line-btn btn-red" @click="showExecutorForm = false">取消</div>
              </van-col>
              <van-col span="12">
                <div class="line-btn btn-blue" @click="saveExecutorForm">保存</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-overlay>

    <van-overlay :show="showCompetitorForm" @click="showCompetitorForm = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <h4 class="title nb">增加竞争对手</h4>
          <van-cell-group>
            <van-field class="picker" readonly required v-model="competitorForm.competitor" label="竞争对手"
              placeholder="请选择决策人" input-align="right" />

            <van-field class="picker" readonly required v-model="competitorForm.communicate" label="对接人员"
              placeholder="请选择对接人员" input-align="right" />

            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>情况概述
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填写情况概述" v-model="competitorForm.info"></textarea>
              </template>
            </van-cell>
            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>措施方案
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填写措施方案" v-model="competitorForm.info"></textarea>
              </template>
            </van-cell>
          </van-cell-group>
          <div class="overlay-btn-group">
            <van-row>
              <van-col span="12">
                <div class="line-btn btn-red" @click="showCompetitorForm = false">取消</div>
              </van-col>
              <van-col span="12">
                <div class="line-btn btn-blue" @click="saveCompetitorForm">保存</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-overlay>

    <van-overlay :show="showPartnerForm" @click="showPartnerForm = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <h4 class="title nb">增加合作单位</h4>
          <van-cell-group>
            <van-field class="picker" readonly required v-model="partnerForm.partner" label="合作伙伴" placeholder="请选择合作伙伴"
              input-align="right" />

            <van-field class="picker" readonly required v-model="partnerForm.contact" label="联系人" placeholder="请选择联系人"
              input-align="right" />

            <van-field class="picker" readonly required v-model="partnerForm.communicate" label="对接人员"
              placeholder="请选择对接人员" input-align="right" />

            <van-cell>
              <template #title>
                <h4 class="cell-title height40 thin">
                  <span class="require">*</span>合作方式
                </h4>
              </template>
              <template #label>
                <textarea name class="text-area" cols placeholder="请填写合作方式" v-model="partnerForm.cooperate"></textarea>
              </template>
            </van-cell>
          </van-cell-group>
          <div class="overlay-btn-group">
            <van-row>
              <van-col span="12">
                <div class="line-btn btn-red" @click="showPartnerForm = false">取消</div>
              </van-col>
              <van-col span="12">
                <div class="line-btn btn-blue" @click="savePartnerForm">保存</div>
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
      showExecutorForm: false,
      showCompetitorForm: false,
      showPartnerForm: false,
      showProfessorForm: false,
      title: '营销策划预案',
      data: {
        taskName: '2020年嘉兴市桐乡市丰庆南路改造工程50.00W'
      },
      customerForm: {
        name: '',
        docking: '',
        start: '',
        end: '',
        communicate: ''
      },
      executorForm: {
        name: '',
        docking: '',
        start: '',
        end: '',
        communicate: ''
      },
      competitorForm: {
        competitor: '',
        communicate: '',
        info: '',
        plan: ''
      },
      partnerForm: {
        partner: '',
        contact: '',
        communicate: '',
        cooperate: ''
      },
      professorForm: {
        name: '',
        divideWork: '',
        communicate: '',
        plan: ''
      },
      form: {}
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
    saveExecutorForm() {
      this.showExecutorForm = false;
      this.executorForm = {
        name: '',
        docking: '',
        start: '',
        end: '',
        communicate: ''
      };
    },
    saveCompetitorForm() {
      this.showCompetitorForm = false;
      this.competitorForm = {
        competitor: '',
        communicate: '',
        info: '',
        plan: ''
      };
    },
    savePartnerForm() {
      this.showPartnerForm = false;
    },
    saveProfessorForm() {
      this.showProfessorForm = false;
    }
  }
};
</script>

<style>
</style>