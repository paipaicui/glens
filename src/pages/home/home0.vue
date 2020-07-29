<template>
  <div class="main-panel">
    <div class="panel-box">
      <div class="panel">
        <p class="chart-title">三个月销售预测</p>
        <p class="chart-tips">(截止1月底，预计承接1615万元）</p>
        <div ref="three" style="height:200px"></div>
        <div v-if="opinionData1.length>0"></div>
      </div>
      <div class="panel">
        <p class="chart-title">六个月销售预测</p>
        <p class="chart-tips">(截止1月底，预计承接1615万元）</p>
        <div ref="six" style="height:200px"></div>
      </div>
    </div>
  </div>

</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      threeCharts: '',
      opinionData1: [],
      sixCharts: '',
      opinionData2: [
        ['新建任务', 22300, 11500],
        ['确定任务', 4000, 400],
        ['执行跟', 0, 0],
        ['招投标', 0, 0],
      ],
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.drawPie(this.threeCharts, this.$refs.three, this.opinionData1);
      this.drawPie(this.sixCharts, this.$refs.six, this.opinionData2);
    });
  },
  methods: {
    drawPie(option, id, data) {
      option = echarts.init(id);
      option.setOption({
        title: {
          show: Object.keys(data).length === 0,
          text: '暂无数据',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: 16,
          },
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: data,
        },
        xAxis: {
          show: Object.keys(data).length > 0,
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#E5E5E5',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#333',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          show: Object.keys(data).length > 0,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#E5E5E5',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              color: '#0F7EE9',
              barBorderRadius: [2, 2, 0, 0],
            },
            label: {
              show: true,
              position: 'top',
            },
          },
          {
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              color: '#F89A24',
              barBorderRadius: [2, 2, 0, 0],
            },
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
        grid: {
          width: '303px',
          height: '146px',
          top: '19px',
          left: '52px',
        },
      });
    },
  },
};
</script>

<style>
</style>