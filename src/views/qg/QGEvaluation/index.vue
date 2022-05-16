<template>
  <div>
    <el-card>
      <!--v-model绑定data中的isWo变量，当isWo=true时switch开启，当isWo=false时switch关闭-->
      <el-switch
        v-model="isWo"
        active-color="green"
        inactive-color="#ff4949"
        active-text="有答案"
        inactive-text="无答案"
      @change="switchTable">
      </el-switch>

      <!--注意这里不要用v-if去判断，不然在使用v-else的table中无法使用el-rate-->
      <el-table
        v-show="!isShowWo"
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="id"
          label="ID"
          width="180"
          align="center">
        </el-table-column>

        <el-table-column
          prop="context"
          align="center"
          label="文本">
        </el-table-column>

        <el-table-column
          prop="ans"
          align="center"
          label="答案">
        </el-table-column>

        <el-table-column
          prop="question"
          align="center"
          label="问题">
        </el-table-column>

        <el-table-column
          align="center"
          label="评估情况">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="evaluate(scope)"></el-button>
            <el-button :type="scope.row.flag? 'success':'error'" :icon="scope.row.flag?'el-icon-check':'el-icon-close'"  circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--注意这里不要用v-else去判断，不然无法使用el-rate-->
      <el-table
        v-show="isShowWo"
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="id"
          label="ID"
          align="center"
          width="180">
        </el-table-column>

        <el-table-column
          prop="context"
          align="center"
          label="文本">
        </el-table-column>

        <el-table-column
          prop="question"
          align="center"
          label="问题">
        </el-table-column>

        <el-table-column
          prop="score"
          align="center"
          label="评估情况">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="evaluate(scope)"></el-button>
            <el-button  :type="scope.row.flag? 'success':'error'" :icon="scope.row.flag?'el-icon-check':'el-icon-close'" circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button  style="margin: 30px 0px 0px 500px; " size="large" type="info" @click="toContent">回退</el-button>
      <el-button  size="large" type="primary" @click="toDistractor">下一步</el-button>
    </el-card>

    <el-dialog title="评估" :visible.sync="dialogTableVisible" >
      <span style="display: block; margin-bottom: 10px; font-size: 2em">{{evaluatedData.context}}</span>
      <!--v-model绑定value1，且评分值变化时会触发Change事件-->
      <div v-if="key!='No'&& key!='Score' && key!='context' && key!='score'" style="margin: 20px 0px;font-weight:bold" v-for="(val, key, index) in evaluatedData" :key="index">
        <span style="display:inline-block; margin-top:5px;font-size: 16px">{{key}}:<br></span>
        <el-rate
          style="display: inline-block"
          v-model="evaluatedData[key]"
          :texts="texts"
          show-text
          @change="changeScore(key)">
        </el-rate>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="UpdateEvaluation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "QGEvaluation",
  data(){
    return {
      //switch的相关数据
      isWo:true,
      isShowWo:false,

      tableData: [{
        id: '001',
        context: '第一个context',
        ans: '234',
        question: '3.2',
        score:1
      },{
        id: '002',
        context: '第一个context',
        ans: '234',
        question: '3.2',
        score:3
      },{
        id: '003',
        context: '第二个context',
        ans: '234',
        question: '3.2',
        score:5
      },{
        id: '004',
        context: '第三个context',
        ans: '234',
        question: '3.2',
        score:2
      },{
        id: '005',
        context: '第四个context',
        ans: '234',
        question: '3.2',
        score:4
      },
        {
          id: '006',
          context: '第四个context',
          ans: '234',
          question: '3.2',
          score:2
        },],

      //合并相同单元格的数据
      listData: [],
      testArr1: [],
      testPosition1: 0,

      //控制dialog的参数
      dialogTableVisible:false,
      evaluatedData:{
        'context':'这是context',
        'Fluency':'',
        'Reasonable':'',
        'Relevance':'',
        'Difficulty':'',
        'Score':'',
      },

      //el-rate评级的相关数据
      texts:['差','一般','好','非常好','非常棒'],
      // score: null

      //判断问题是否被评估
      checked:false
    }
  },

  mounted() {
    this.rowSpan(this.testArr1, this.testPosition1, "context");
  },

  methods:{
    switchTable(){
      this.isShowWo = !this.isShowWo
    },

    rowSpan(spanArr, position, spanName) {
      this.tableData.forEach((item, index) =>{
          if (index === 0){
            spanArr.push(1);
            position = 0;
          } else{
            if (this.tableData[index][spanName] === this.tableData[index - 1][spanName]){
              spanArr[position] += 1;
              spanArr.push(0);
            }else{
              spanArr.push(1);
              position = index;
            }
          }
        }
      )
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(rowIndex)
      if (columnIndex === 1) {
        let row = this.testArr1[rowIndex];
        let col = row > 0 ? 1 : 0;
        return {
          rowspan: row,
          colspan: col
        };
      }
    },

    evaluate(scope){
      this.dialogTableVisible = true
      const data = cloneDeep(scope.row)
      const scores = ['Fluency', 'Reasonable', 'Relevance', 'Difficulty', 'Score']
      this.$set(this.evaluatedData, 'context', data.context)
      this.$set(this.evaluatedData, 'No', scope.$index)
      scores.forEach((item)=>{
        this.$set(this.evaluatedData, item, 2)
      })
    },

    changeScore(scope){
      //向服务器发送请求...
    },

    toContent(){
      this.$router.push({name:'ContentExtraction'})
    },

    toDistractor(){
      this.$router.push({name:'DistractorGeneration'})
    },

    cancelUpdate(){
      this.dialogTableVisible = false
      this.evaluatedData =  {
        'context':'这是context',
        'Fluency':'',
        'Reasonable':'',
        'Relevance':'',
        'Difficulty':'',
        'Score':''
      }
    },

    UpdateEvaluation(){
      //发送请求...

      this.dialogTableVisible = false
      this.$set(this.tableData[this.evaluatedData.No], 'flag', true)
    }
  }
}
</script>

<style scoped>

</style>
