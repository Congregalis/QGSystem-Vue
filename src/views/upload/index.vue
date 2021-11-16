<template>
    <div>
      <el-upload
          class="upload-demo"
          drag
          action=""
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">*只支持json文件</div>
      </el-upload>
    </div>
</template>

<script>
export default {
    data() {
      return {
        
      }
    },
}
</script>

<style scoped>
.upload-demo {
  text-align: center;
  /* align-content: center; */
  margin-top: 20px;
}
</style>