<template>
  <div class="app-container">
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column label="ID" prop="id" width="150">
      </el-table-column>
      <el-table-column label="Question" prop="text">
      </el-table-column>
      <el-table-column label="Answer" prop="answerText" width="180">
      </el-table-column>
      <el-table-column label="Title" prop="reference.title" width="150" align="center">
        <!-- <span>{{ reference.title }}</span> -->
        <!-- <template slot-scope="scope">
          {{ scope.reference.title }}
        </template> -->
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Action"
        align="center"
        width="125">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="edit(scope.row)" type="text"  size="small" icon="el-icon-delete" style="color: #F56C6C">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNumber"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getListByToken } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      token: getToken(),
      list: null,
      totalElements: 0,
      totalPages: 0,
      pageSize: 10,
      pageNumber: 1,
      listLoading: true
    }
  },
  created() {
    this.fetchData(this.pageNumber);
  },
  methods: {
    fetchData(val) {
      this.listLoading = true
      getListByToken({'pageNumber': val-1, 'token': this.token}).then(response => {
        this.list = response.data.content
        this.totalPages = response.data.totalPages
        this.totalElements = response.data.totalElements
        this.listLoading = false
        // // 修改分数到0～5之间
        // this.shrinkRate(this.list);
      })
    },
    edit(row) {
      this.$message('Building...');
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.fetchData(val);
      this.pageNumber = val;
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.block {
  text-align: center;
}
</style>

