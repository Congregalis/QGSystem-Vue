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

    <p align="center">
        如您是<strong>标注者</strong>，请参考
        <el-button type="text" size="medium"><a href="https://www.yuque.com/docs/share/f3f674b0-e172-4315-bf49-3d9f96e03055?# 《问题标注规范》" target="_blank">问题标注规范</a></el-button>
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

