<template>
  <div class="app-container">
    <h1 align="center"> 💡 关于我们 </h1>
    <p align="center"> 
        本项目已开源，
        前端仓库为 
        <el-button type="text"  size="medium"><a href="https://github.com/Congregalis/QGSystem-Vue" target="_blank">QGSystem-Vue</a></el-button>，
        后端仓库为
        <el-button type="text" size="medium"><a href="https://github.com/Congregalis/QGSystem" target="_blank">QGSystem</a></el-button>，
        欢迎您一起参与贡献。
    </p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.app-container a {
    font-size: 20px;
}
</style>

