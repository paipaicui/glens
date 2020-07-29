<template>
  <div>
    <div class="nav-height">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <span @click="$router.go(-1)" class="icon back"></span>
        </template>
      </van-nav-bar>
    </div>
    <div style="padding-top:.24rem">
      <div class="white-block">
        <van-divider>2020年06月</van-divider>
        <p class="title2">交通规划设计院华东院院长室</p>
      </div>

      <div ref="radarChart" style="height:280px" class="white-block"></div>

      <div class="white-block">
        <van-divider>近半年得分</van-divider>
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
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      title: "营销工作评价报表",
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.drawPieRadar();
    });
  },
  methods: {
    drawPieRadar() {
      let myChart = echarts.init(this.$refs.radarChart);
      let option = {
        radar: {
          // shape: 'circle',
          name: {
            formatter: function (value, indicator) {
              return ["{red|0}", "{value|" + value + "}"].join("\n");
            },
            rich: {
              red: {
                color: "red",
                align: "center",
                marginBottom: "5",
              },
            },
          },
          splitNumber: 5,
          center: ["50%", "50%"],
          radius: "45%",
          indicator: [
            { name: "总分[100]", max: 100 },
            { name: "公共关系[25]", max: 100 },
            { name: "销售任务[0]", max: 100 },
            { name: "新客户开拓[25]", max: 100 },
            { name: "客户需求和机会[25]", max: 100 },
          ],

          splitArea: {
            show: true,
            areaStyle: {
              color: ["#fff"], // 图表背景网格的颜色
            },
          },
        },
        grid: {
          position: "center",
          right: "100",
          left: "32",
        },
        series: [
          {
            type: "radar",
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