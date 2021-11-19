<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span><strong>示例</strong></span>
        </div>
        <div>
            <p class="text item"> <strong> Context: </strong>
                <a class="answer">The Library of Congress</a> ("LOC") is the research library that officially serves the United States Congress and is the "de facto" national library of the United States. It is the oldest federal cultural institution in the United States. The Library is housed in three buildings on Capitol Hill in Washington, D.C.; it also maintains the Packard Campus in Culpeper, Virginia, which houses the National Audio-Visual Conservation Center.
            </p>
            <p class="text item"> <strong> Question: </strong> 
                What is the research library ?
            </p>
            <p class="text item"> <strong> Answer: </strong>
                <a class="answer"> Library of Congress </a>
            </p>
        </div>
    </el-card>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Context">
        <el-input type="textarea" v-model="form.context" />
      </el-form-item>
      <el-form-item label="Question">
        <el-input v-model="form.question" />
      </el-form-item>
      <el-form-item label="Answer">
        <el-input v-model="form.answer" />
      </el-form-item>
      <el-form-item label="Title">
        <el-input v-model="form.title" placeholder="若非维基百科源，无需填写" />
      </el-form-item>
      <el-form-item label="Source">
        <el-select v-model="form.source" placeholder="请选择数据来源">
          <el-option label="Wikipedia" value="wikipedia" />
          <el-option label="其他" value="others" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        context: '',
        question: '',
        answer: '',
        title: '',
        source: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('Building...');
    },
    onCancel() {
      this.clear()
      this.$message({
        message: '已清空!',
        type: 'warning'
      })
    },
    clear() {
      this.form.context = ''
      this.form.question = ''
      this.form.answer = ''
      this.form.title = ''
      this.form.source = ''
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,

.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
    border-radius: 20px;
}

.answer {
    font-weight: bold;
    color: #F56C6C;
}
</style>

