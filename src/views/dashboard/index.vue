<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <div id='evalution' style="width: 600px;height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id='rate' style="width: 600px;height:400px;"></div>
      </el-col>
    </el-row>
    <el-col :span="12">
        <div id='distribution' style="width: 600px;height:400px;"></div>
      </el-col>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getPicData } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  data() {
    return {
      uncheckedNum: 0,
    checkedNum: 0,
    fluency: [],
    reasonable: [],
    relevance: []
    }
  },
  methods: {
    fetchData() {
      getPicData().then(response => {
        console.log(response.data);
        this.uncheckedNum = response.data.uncheckedNum;
        this.checkedNum = response.data.checkedNum;
        this.fluency = response.data.fluency;
        this.reasonable = response.data.reasonable;
        this.relevance = response.data.relevance;

        this.setupEvaluation();
        this.setupRate();
        this.setupDistribution();
      });
    },
    setupEcharts() {
      this.fetchData();
      // this.setupEvaluation();
      // this.setupRate();
      // this.setupDistribution();
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
      var mockData =  [
        {value: 10, name: '5'},
        {value: 22, name: '1'},
        {value: 52, name: '2'},
        {value: 10, name: '3'},
        {value: 28, name: '4'},
      ]
      var option = {
        title: {
            text: '问题类型分布情况',
            subtext: '测试',
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
                name: '地区',
                type: 'pie',
                radius: '50%',
                data: mockData,
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
    setupRate() {
      var myChart = echarts.init(document.getElementById('rate'));
      var option = {
        title: {
            text: '问题评估分数分布',
            left: ''
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
</style>
