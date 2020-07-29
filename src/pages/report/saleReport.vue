<template>
  <div>
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>
    <div class="select">
      <van-row gutter="8">
        <van-col span="16">
          <div class="corner" @click="showSelect = true">{{selectVal}}</div>
        </van-col>
        <van-col span="8">
          <div class="corner" @click="showPickerdate1 = true">{{date}}</div>
        </van-col>
      </van-row>
    </div>

 
      <van-search v-model="value" placeholder="请输入姓名或者部门" @search="onSearch" />
      <van-cell v-for="(item,key) in 10" :key="key" class="list-cell">
        <template #title>
          <router-link to="/report/report?id=1">
            <van-row>
              <van-col span="8"><span class="font3 font16">张杰宝</span></van-col>
              <van-col span="16"><span class="font9">交通规划设计院华东院院长室</span></van-col>
              <van-col span="8"><span class="font9">销售任务：</span><span class="font3 font16">25</span></van-col>
              <van-col span="8"><span class="font9">公共关系：</span><span class="font3 font16">5</span></van-col>
              <van-col span="8"><span class="font9">记录总数：</span><span class="font3 font16">25</span></van-col>
            </van-row>
          </router-link>
        </template>
      </van-cell>
 

 
    <van-popup v-model="showPickerdate1" position="bottom">
      <van-datetime-picker @cancel="showPickerdate1 = false" type="year-month" @confirm="confirmStartDate" v-model="startDate"
         />
    </van-popup>

    <van-overlay :show="showSelect" @click="showSelect=false">
  <div class="wrapper" >
    <div class="flex-block">
      <ul>
        <li @click="select(item)" v-for="(item,key) in selectList" :key="key">{{item.title}}</li>
      </ul>
    </div>
  </div>
</van-overlay>

  </div>
</template>

<script>
import formatDate from '@/assets/js/date.js';
import echarts from 'echarts';
export default {
  data() {
    return {
      title: '营销人员工作报表',
      value: '',
      showPickerdate1:false,
      showSelect:false,
      startDate: new Date(),
      date:'2020年06月',
      selectVal:'副院长/院长助理',
      selectList:[
        {title:'副院长/院长助理'},
        {title:'所长/总经理/营销总监'},
        {title:'副所长/副总经理/高级营销经理'},
        {title:'其他营销人员'},
      ]
    };
  },
  
  mounted() {
    this.$nextTick(function () {
      this.drawPie();
      this.drawPieRadar();
    });
  },

  methods: {
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
                paddingBottom:'10'
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
    confirmStartDate(val){
      this.date = formatDate.date('YYYY年mm月', val);
      this.showPickerdate1 = false;
    },
    select(val){
      this.selectVal = val.title;
      this.showSelect = false;
    }
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
  padding: 0.08rem .16rem;
  .van-col--8,
  .van-col--16  {
    margin: 0.08rem 0;
  }
}
.flex-block{
  width: 220px;
  position: fixed;
  overflow: hidden;
  top: 90px;
  left: 20px;
    background: url(../../assets/images/Icon/popupmenu_arrow.png) top center no-repeat ;
    background-size: .16rem .08rem;
    padding-top: .08rem;
  ul{
    border-radius: 9px;
    background: #fff;
    width: 100%;
    overflow: hidden;
   li{
    height: 40px;
    line-height: 40px;
    padding: 0 .08rem;
    border-bottom: 1px solid #f8f8f8;
    text-align: center;
    color: #333;
  }
  }

}
</style>