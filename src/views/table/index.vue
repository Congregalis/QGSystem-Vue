<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
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
            <el-form-item label="Fluency">
              <el-rate
                v-model="props.row.fluency"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </el-form-item>
            <el-form-item label="Reasonable">
              <el-rate
                v-model="props.row.reasonable"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </el-form-item>
            <el-form-item label="Relevance">
              <el-rate
                v-model="props.row.relevance"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
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
      <el-table-column class-name="status-col" label="Status" width="110" align="center" 
        :filters="[{ text: 'checked', value: 1 }, { text: 'unchecked', value: 0 }]"
        :filter-method="filterStatus">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-tag :type="scope.row.checkedTimes === 0 ? 'primary' : 'success'" disable-transitions>{{ scope.row.checkedTimes > 0 ? 'checked' : 'unchecked' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Difficulty" width="110" align="center">
        <template slot-scope="scope">
          <!-- {{ scope.row.difficulty }} -->
          <el-tag
          :type="scope.row.difficulty === 0 ? 'success' :  ( scope.row.difficulty === 1 ? 'warning' : 'danger')"
          disable-transitions>{{scope.row.difficulty === 0 ? '简单' :  ( scope.row.difficulty === 1 ? '中等' : '困难')}}</el-tag>
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
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      totalElements: 0,
      totalPages: 0,
      pageSize: 10,
      pageNumber: 1,
      listLoading: true,
    }
  },
  created() {
    this.fetchData(this.pageNumber)
  },
  methods: {
    fetchData(val) {
      this.listLoading = true
      getList({'pageNumber': val-1}).then(response => {
        this.list = response.data.content
        this.totalPages = response.data.totalPages
        this.totalElements = response.data.totalElements
        this.listLoading = false
        console.log(this.list[0])
        // 修改分数到0～5之间
        this.shrinkRate(this.list);
      })
    },
    shrinkRate(list) {
      for (var i = 0; i < list.length; i++) {
        list[i].fluency /= 10;
        list[i].reasonable /= 10;
        list[i].relevance /= 10;
      }
    },
    filterStatus(value, row) {
      console.log(row.checkedTimes);
      return row.checkedTimes == value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.fetchData(val);
      this.pageNumber = val;
    },
    //保留n位小数
    roundFun(value, n) {
      return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
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
</style>