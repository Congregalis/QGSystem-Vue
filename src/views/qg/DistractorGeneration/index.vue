<template>
  <div class="app-main">
    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="Question" value="1"></el-option>
        <el-option label="Title" value="2"></el-option>
        <el-option label="Id" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <!--
      @filter-change:当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。
      v-loading="listLoading"，element-loading-text="Loading":在接口为请求到数据之前，显示加载中，直到请求到数据后消失-->
    <el-table
      :data="tableData"
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" label-width="90px" inline class="table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>

            <el-form-item label="Question">
              <span>{{ props.row.text }}</span>
            </el-form-item>

            <el-form-item label="Answer">
              <span>{{ props.row.answerText }}</span>
            </el-form-item>

            <el-form-item label="Context">
              <span>{{ props.row.reference.text }}</span>
            </el-form-item>

            <el-form-item label="Status">
              <span>{{ props.row.checkedTimes > 0 ? 'checked' : 'unchecked' }}</span>
            </el-form-item>

            <el-form-item label="Distractor1">
              <el-input v-model="props.row.distractor1"></el-input>
            </el-form-item>

            <el-form-item label="Distractor2">
              <el-input v-model="props.row.distractor2"></el-input>
            </el-form-item>

            <el-form-item label="Distractor3">
              <el-input v-model="props.row.distractor3"></el-input>
            </el-form-item>

            <el-form-item label="Distractor4">
              <el-input v-model="props.row.distractor4"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="95">
        <template v-slot="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="Question" align="center">
        <template slot-scope="scope">
          {{ scope.row.text }}
        </template>
      </el-table-column>

      <el-table-column label="Answer" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.answerText }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Title" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.reference.title }}
        </template>
      </el-table-column>
    </el-table>
    <el-button  style="margin: 30px 0px 0px 500px; " size="large" type="info" @click="toQG">回退</el-button>
    <el-button  size="large" type="primary" @click="toOutput">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: "DistractorGeneration",
  data(){
    return {
      select: '',
      input: '',

      //table相关参数
      listLoading: true,
      list: null,
      tableData:[
        {
          "id": 1,
          "text": "卵石是什么颜色的心?",
          "answerStart": -1,
          "answerText": "",
          "reference": {
            "id": 1,
            "text": "你想说，要有玉一样的品质，铁一般的意志，要有一颗历经沧桑、忠贞不渝的心！呵，卵石，你是大海中的一滴泪；你是岩石的一颗心；你是启迪人生的一首诗；你是激励生命的一章交响乐！",
            "title": null
          },
          "checkedTimes": 0,
          "score": 0,
          "isDeleted": 0,
          "userId": null,
          'distractor1': '干扰项一',
          'distractor2': '干扰项二',
          'distractor3': '干扰项三',
          'distractor4': '干扰项四',
        }]
    }
  },

  methods:{
    toOutput(){
      this.$router.push({name:'OutputStorage'})
    },
    toQG(){
      this.$router.push({name:'QGEvaluation'})
    }
  }
}
</script>

<style scoped>
.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  /* margin-right: 0; */
  margin-bottom: 0;
  width: 100%;
}
.block {
  text-align: center;
}
.el-rate {
  margin-top: 10px;
}
.el-select {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
