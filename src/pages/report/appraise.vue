<template>
  <div style="height:100vh;overflow-y:scroll">
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
        <template #right>
          <div class="block">
            <span :class="tabActive==0?'tabIcon ranking':'tabIcon rank'" @click="tab(0)"></span>
            <span :class="tabActive==1?'tabIcon listing':'tabIcon list'" @click="tab(1)"></span>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="select">
      <van-row gutter="8">
        <van-col span="16">
          <div class="corner">副院长/院长助理</div>
        </van-col>
        <van-col span="8">
          <div class="corner">2020年6月</div>
        </van-col>
      </van-row>
    </div>

    <div v-show="tabActive==0">
      <van-row gutter="20" class="white-block">
        <van-col span="12" class="flex">
          <p><span class="up"></span>最高分 环比：<span class="font-blue">-0</span></p>
          <div class="text-center">张杰宝：80分</div>
          <div class="text-center font-blue margin-t">前5名</div>
          <div class="text-center">
            <img src="../../assets/images/Icon/pic_arrow_big_left.png" alt="" srcset="">
          </div>
        </van-col>
        <van-col span="12" class="flex">
          <p><span class="down"></span>最高分 环比：<span class="font-red"><i class="arrow-bottom"></i>18</span></p>
          <div class="text-center">张杰宝：80分</div>
          <div class="text-center font-red margin-t">后5名</div>
          <div class="text-center">
            <img src="../../assets/images/Icon/pic_arrow_big_right.png" alt="" srcset="">
          </div>
        </van-col>
      </van-row>

      <div ref="chart" style="height:280px" class="white-block"></div>

      <div class="white-block">
        <van-divider>得分明细<span class=" font-blue">(樊苑玉)</span></van-divider>
        <p class="title2">轨道交通设计院院长室</p>
      </div>

      <div ref="radarChart" style="height:280px" class="white-block"></div>

      <div class="white-block">
        <van-divider>近半年得分<span class=" font-blue">(樊苑玉)</span></van-divider>
        <div class="appraise-table-box">
          <table>
            <tr>
              <th>月份/分项</th>
              <th>20.01</th>
              <th>20.02</th>
              <th>20.03</th>
              <th>20.04</th>
              <th>20.05</th>
              <th>20.06</th>
            </tr>
            <tr>
              <td>公共关系</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>销售任务</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>新客户开拓</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>客户需求和机会</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>总分</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </table>
        </div>

      </div>
    </div>

    <div v-show="tabActive==1">
      <van-search v-model="value" placeholder="请输入姓名或者部门" @search="onSearch" />
      <van-cell v-for="(item,key) in 10" :key="key" class="list-cell">
        <template #title>
          <router-link to="/">
            <van-row>
              <van-col span="12"><span class="font9">姓名：</span>张杰宝</van-col>
              <van-col span="12" class="text-right"><span class="font-blue font24">80</span>分</van-col>
              <van-col span="12"><span class="font9">公共关系：</span><span class="font-blue font16">25</span></van-col>
              <van-col span="12"><span class="font9">销售任务：</span><span class="font-blue font16">25</span></van-col>
              <van-col span="12"><span class="font9">新客户开拓：</span><span class="font-blue font16">5</span></van-col>
              <van-col span="12"><span class="font9">客户需求和机会：</span><span class="font-blue font16">25</span></van-col>
            </van-row>
          </router-link>
        </template>
      </van-cell>
    </div>

  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      title: '营销工作评价报表',
      tabActive: 0,
      value: '',
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.drawPie();
      this.drawPieRadar();
    });
  },
  methods: {
    tab(val) {
      this.tabActive = val;
    },
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.chart);
      let value = [80, 80, 75, 65, 65, 20, 15, 15, 10, 0];
      let dValue = [
        {
          arrow: 'arrowCenter',
          value: '0',
        },
        {
          arrow: 'arrowUp',
          value: '25',
        },
        {
          arrow: 'arrowUp',
          value: '25',
        },
        {
          arrow: 'arrowUp',
          value: '15',
        },
        {
          arrow: 'arrowUp',
          value: '10',
        },
        {
          arrow: 'arrowUp',
          value: '40',
        },
        {
          arrow: 'arrowBottom',
          value: '40',
        },
        {
          arrow: 'arrowCenter',
          value: '0',
        },
        {
          arrow: 'arrowBottom',
          value: '10',
        },
        {
          arrow: 'arrowUp',
          value: '12',
        },
      ];

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          show: false,
        },

        xAxis: {
          data: [
            '蒙嘉',
            '郁珊',
            '江纯',
            '景栋',
            '邴斌克',
            '堵彩',
            '汝震',
            '买馥',
            '樊苑玉',
            '赛勤俊',
          ],
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#e5e5e5',
            },
          },
          axisLabel: {
            color: '#333',
            fontSize: '6',
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#e5e5e5',
            },
          },
          axisLabel: {
            fontSize: '10',
          },
        },

        series: [
          {
            name: '销量',
            type: 'bar',
            barWidth: '20', //柱图宽度
            data: value,
            dValue: dValue,
            itemStyle: {
              borderWidth: 2,
              barBorderRadius: [2, 2, 0, 0],
            },
            label: {
              show: true,
              formatter(params) {
                let color = '';
                if (dValue[params.dataIndex].arrow === 'arrowUp') {
                  color = 'up';
                } else if (dValue[params.dataIndex].arrow === 'arrowBottom') {
                  color = 'down';
                } else {
                  color = 'center';
                }
                return [
                  '{' +
                    dValue[params.dataIndex].arrow +
                    '|}{' +
                    color +
                    '|' +
                    dValue[params.dataIndex].value +
                    '}',
                  '{data|' + params.data + '}',
                ].join('\n');
              },
              rich: {
                arrowBottom: {
                  height: '10',
                  backgroundColor: {
                    image: require('@/assets/images/Icon/ic_arrow_line_down.png'),
                  },
                },
                arrowUp: {
                  height: '10',
                  backgroundColor: {
                    image: require('@/assets/images/Icon/ic_arrow_line_up.png'),
                  },
                },
                arrowCenter: {
                  height: '10',
                  backgroundColor: {
                    image: require('@/assets/images/Icon/ic_arrow_line_cencer.png'),
                  },
                },
                up: {
                  color: '#64B635 ',
                  fontSize: '10',
                  height: 20,
                  align: 'center',
                },
                down: {
                  color: '#FF5252',
                  fontSize: '10',
                  height: 20,
                  align: 'center',
                },
                center: {
                  color: '#0F7EE9',
                  fontSize: '10',
                  height: 20,
                  align: 'center',
                },
                data: {
                  fontSize: '10',
                  color: '#333',
                  marginTop: '10',
                  align: 'center',
                },
              },
              position: 'top',
              color: '#333',
            },

            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  let color = '';
                  if (params.data >= 20) {
                    color = '#0F7EE9';
                  } else {
                    color = '#FF5252';
                  }
                  return color;
                },
              },
            },
          },
        ],
        grid: {
          right: '16',
          left: '32',
          top: '40',
          bottom: '40',
        },
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawPieRadar() {
      let myChart = echarts.init(this.$refs.radarChart);
      let option = {
        radar: {
          // shape: 'circle',
          name: {
            formatter: function (value, indicator) {
              return ['{red|0}', '{value|' + value + '}'].join('\n');
            },
            rich: {
              red: {
                color: 'red',
                align: 'center',
                marginBottom: '5',
              },
            },
          },
          splitNumber: 5,
          center: ['50%', '50%'],
          radius: '45%',
          indicator: [
            { name: '总分[100]', max: 100 },
            { name: '公共关系[25]', max: 100 },
            { name: '销售任务[0]', max: 100 },
            { name: '新客户开拓[25]', max: 100 },
            { name: '客户需求和机会[25]', max: 100 },
          ],

          splitArea: {
            show: true,
            areaStyle: {
              color: ['#fff'], // 图表背景网格的颜色
            },
          },
        },
        grid: {
          position: 'center',
          right: '100',
          left: '32',
        },
        series: [
          {
            type: 'radar',
            symbolSize: [20, 10],
            data: [],
          },
        ],
      };
      myChart.setOption(option);
    },
    onSearch() {},
  },
};
</script>

<style lang="less" scoped>
.block {
  display: inline-flex;
  border: 1px solid #fff;
  border-radius: 8px;
}
.tabIcon {
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  border-right: 1px solid #fff;
  cursor: pointer;
  &:last-of-type {
    border: none;
  }
}
.ranking {
  background-image: url(../../assets/images/Icon/ic_nav_ranking.png);
}
.rank {
  background-image: url(../../assets/images/Icon/ic_nav_ranking_unseleted.png);
}
.listing {
  background-image: url(../../assets/images/Icon/ic_nav_list.png);
}
.list {
  background-image: url(../../assets/images/Icon/ic_nav_list_unseleted.png);
}
.select {
  height: 0.56rem;
  box-sizing: border-box;
  background: #f8f8f8;
  padding: 0.08rem 0.16rem;
}
.corner {
  border-radius: 4px;
  background: #fff;
  background-image: url(../../assets/images/Icon/ic_arrow_fill_down.png);
  background-size: 0.32rem 0.32rem;
  background-position-x: right;
  background-position-y: center;
  background-repeat: no-repeat;
  height: 0.4rem;
  line-height: 0.4rem;
  color: #999;
  padding-left: 0.08rem;
}
.white-block {
  background: #fff;
}
.flex {
  padding: 0.08rem 0;
  img {
    height: 0.2rem;
    width: 1.46rem;
    margin: 0 auto;
  }
  .margin-t {
    margin-top: 0.1rem;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.1rem 0;
    color: #999;
  }
  .up {
    display: inline-block;
    height: 0.24rem;
    width: 0.24rem;
    background: url(../../assets/images/Icon/ic_arrow_circle_up.png) center
      center no-repeat;
    background-size: 100% 100%;
  }
  .down {
    display: inline-block;
    height: 0.24rem;
    width: 0.24rem;
    background: url(../../assets/images/Icon/ic_arrow_circle_down.png) center
      center no-repeat;
    background-size: 100% 100%;
  }
}
.van-search {
  background: #f8f8f8;
  .van-search__content {
    background: #fff;
  }
}
.list-cell {
  padding: 16px;
  .van-col--12 {
    margin-bottom: 0.08rem;
  }
}
</style>