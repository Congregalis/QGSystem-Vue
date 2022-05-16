<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        label="上下文"
        width="180">
        <template slot-scope="scope">
          <el-tooltip placement="bottom">
            <div slot="content">{{ scope.row.context }}</div>
            <span style="margin-left: 10px">{{ scope.row.context }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="问题"
        width="180">
        <template slot-scope="scope">
          <el-tooltip placement="bottom">
            <div slot="content">{{ scope.row.question }}</div>
            <span style="margin-left: 10px">{{ scope.row.question }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="答案"
        width="180">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ans }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="选项"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="bottom">
            <p>选项一: {{ scope.row.options[0] }}</p>
            <p>选项二: {{ scope.row.options[1] }}</p>
            <p>选项三: {{ scope.row.options[2] }}</p>
            <p>选项四: {{ scope.row.options[3] }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">选项</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="学科分类"
        width="180">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.class }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="..."
        width="180">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.other }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "OutputStorage",
  data() {
    return {
      tableData: [{
        context: '上下文一',
        question: '问题一',
        ans: '答案一',
        options:['distractor1', 'distractor2', 'distractor3', 'distractor4'],
        class:'分类一',
        other:'其他属性'
      }, {
        context: '上下文二',
        question: '问题二',
        ans: '答案二',
        options:['distractor1', 'distractor2', 'distractor3', 'distractor4'],
        class:'分类二',
        other:'其他属性'
      },{
        context: '上下文三',
        question: '问题三',
        ans: '答案三',
        options:['distractor1', 'distractor2', 'distractor3', 'distractor4'],
        class:'分类三',
        other:'其他属性'
      },{
        context: '上下文四',
        question: '问题四',
        ans: '答案四',
        options:['distractor1', 'distractor2', 'distractor3', 'distractor4'],
        class:'分类四',
        other:'其他属性'
      },{
        context: '上下文五',
        question: '问题五',
        ans: '答案五',
        options:['distractor1', 'distractor2', 'distractor3', 'distractor4'],
        class:'分类五',
        other:'其他属性'
      },]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped>

</style>
