<template>
  <div class="dashboard-container">
    <el-row class="shadow">
      <el-col :span="12">
        <div id='evalution' style="width: 600px; height: 400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id='rate' style="width: 600px; height: 400px;"></div>
      </el-col>
    </el-row>
    <el-row class="shadow">
      <el-col :span="12">
        <div id='type' style="width: 600px; height: 400px; margin: 0 auto"></div>
      </el-col>
      <el-col :span="12">
        <div id='difficulty' style="width: 600px; height: 400px;"></div>
      </el-col>
    </el-row>
    <!-- <el-row type="flex" justify="space-around" class="shadow">
      <el-col :span="12">
        <div id='type' style="width: 600px; height: 400px; margin: 0 auto"></div>
      </el-col>
    </el-row> -->
    <el-row type="flex" justify="space-around" class="shadow">
      <el-col :span="22">
        <div id='distribution' style="width: 1000px; height: 700px; margin: 0 auto"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getPicData, getDistributionData, getTypeData, getDifficultyData } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  data() {
    return {
      uncheckedNum: 0,
      checkedNum: 0,
      fluency: [],
      reasonable: [],
      relevance: [],
      distribution: [],
      typeX: [],
      typeY: [],
      difficultyX: ['简单', '中等', '困难'],
      difficultyY:[
        {
          value: 0,
          itemStyle: {
            color: '#67c23a'
          }
        },
        {
          value: 0,
          itemStyle: {
            color: '#E6A23C'
          }
        },
        {
          value: 0,
          itemStyle: {
            color: '#F56C6C'
          }
        }
      ]
    }
  },
  methods: {
    fetchData() {
      getPicData().then(response => {
        // console.log(response.data);
        this.uncheckedNum = response.data.uncheckedNum;
        this.checkedNum = response.data.checkedNum;
        this.fluency = response.data.fluency;
        this.reasonable = response.data.reasonable;
        this.relevance = response.data.relevance;

        getDistributionData().then(response => {
          var tmp = [];
          response.data.forEach(function name(item) {
            tmp.push({
              'name': item['title'],
              'value': item['count']
            });
          });
          this.distribution = JSON.parse(JSON.stringify(tmp));
          this.distribution = tmp;

          getTypeData().then(response => {

            var tmpX = [];
            var tmpY = [];
            response.data.forEach(function name(item) {
              tmpX.push(item['title']);
              tmpY.push(item['count'])
            })
            this.typeX = tmpX;
            this.typeY = tmpY;

            getDifficultyData().then(response => {
              console.log(response.data)
              for (const item of response.data) {
                console.log(item)
                if (0 == item['title']) this.difficultyY[0].value = item['count'];
                else if (1 == item['title']) this.difficultyY[1].value = item['count'];
                else if (2 == item['title']) this.difficultyY[2].value = item['count'];
              }
              console.log("difficulty " + this.difficultyY[0].value);

              // 设置表格
              this.setupEvaluation();
              this.setupRate();
              this.setupDistribution();
              this.setupType();
              this.setupDifficulty();
            });

            
          });
        });
      });
    },
    setupEcharts() {
      this.fetchData();
    },
    setupEvaluation() {
      var myChart = echarts.init(document.getElementById('evalution'));
      var option = {
        title: {
            text: '问题评估情况',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '问题数',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: this.checkedNum, name: '已评估'},
                    {value: this.uncheckedNum, name: '未评估'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
      myChart.setOption(option);
    },
    setupDistribution() {
      var myChart = echarts.init(document.getElementById('distribution'));
      var option = {
        title: {
            text: '问题地理分布',
            subtext: '包含所有',
            left: 'center',
            top: '5%'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
        },
        series: [
            {
                name: '地区',
                type: 'pie',
                radius: '50%',
                data: this.distribution,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
      myChart.setOption(option);
    },
    setupType() {
      var myChart = echarts.init(document.getElementById('type'));
      var option = {
        title: {
            text: '问题类型分布',
            subtext: '包含所有',
            left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.typeX
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.typeY,
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              color: '#000'
            },
          }
        ]
      };
      myChart.setOption(option);
    },
    setupDifficulty() {
      var myChart = echarts.init(document.getElementById('difficulty'));
      var option = {
        title: {
            text: '问题难度分布',
            subtext: '仅包含已评估数据',
            left: 'center',
        },
        xAxis: {
          type: 'category',
          data: this.difficultyX
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.difficultyY,
            type: 'bar',
            label: {
              show: true,
              position: 'inside',
              color: '#fff'
            },
          }
        ]
      };
      myChart.setOption(option);
    },
    setupRate() {
      var myChart = echarts.init(document.getElementById('rate'));
      var option = {
        title: {
            text: '问题评估分数分布',
        },
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '流畅性', '合理性', '相关性'],
                ['1🌟', this.fluency[0], this.reasonable[0], this.relevance[0]],
                ['2🌟', this.fluency[1], this.reasonable[1], this.relevance[1]],
                ['3🌟', this.fluency[2], this.reasonable[2], this.relevance[2]],
                ['4🌟', this.fluency[3], this.reasonable[3], this.relevance[3]],
                ['5🌟', this.fluency[4], this.reasonable[4], this.relevance[4]]
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
    };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.setupEcharts();
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  margin-bottom: 5%;
}
.shadow {
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 3%;
  padding: 2%;
  border-radius: 25px;
}
</style>
