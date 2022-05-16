<template>
  <div>
    <el-card>
      <div>
        <!--上传文件-->
        <el-upload
          class="upload-demo"
          style="text-align:center; margin-top:20px;"
          ref="upload"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :disabled="isShowTable"
          :auto-upload='false'
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-change="handleChange">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">文件大小的限制由后端配置</div>
        </el-upload>

        <el-button style="margin:30px 0px 0px 520px" type="primary">上传<i class="el-icon-upload el-icon--right" @click="submitUpload"></i></el-button>
        <!--<el-button style="margin:30px 0px 0px 520px" size="large" type="success" @click="submitUpload">上传到服务器</el-button>-->
        <el-button style="" size="large" type="primary" @click="Show">下一步</el-button>
      </div>
    </el-card>


    <el-card v-show="isShowTable" style="margin-top: 20px">
      <div >
        <!--抽取内容展示-->
        <el-table
          :data="tableData"
          stripe
          border
          highlight-current-row
          style="width:100%; margin:20px auto; margin-bottom: 30px">

          <el-table-column
            align="center"
            label='序号'
            type="index"
            width="50">
          </el-table-column>

          <el-table-column
            align="center"
            label="抽取内容"
            width="1000">
            <template slot-scope="scope">
              <!-- 这里结构需要用到span与input进行来回的切换 -->
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.sentence"
                size="mini"
                :ref="scope.$index"
                @blur="toLook(scope.row)"
                @keyup.native.enter="toLook(scope.row)">
              </el-input>
              <span
                v-else
                style="margin-left: 10px; display: block"
                @click="toEdit(scope.row, scope.$index)">
                {{ scope.row.sentence }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="toEdit(scope.row, scope.$index)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>


        <!--分页器展示-->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :total="total"
          :page-size="limit"
          :pager-count="7"
          :page-sizes="[3, 5, 10]"
          layout="prev, pager, next, jumper,->,sizes,total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>


        <el-button  style="margin: 30px 0px 0px 500px; " size="large" type="info" @click="ShowTable">回退</el-button>
        <el-button  size="large" type="primary" @click="toContent">下一步</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DataInput",
  data() {
    return {
      isShowTable:false,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

      //代表的分页器第几页
      page: 1,
      //当前页数展示数据条数
      limit: 3,
      //总共数据条数
      total: 120,

      tableData: [{
        sentence: '这是1',
        isEdit: false
      }, {
        sentence: '这是2',
        isEdit: false
      },{
        sentence: '这是3',
        isEdit: false
      },{
        sentence: '这是4',
        isEdit: false
      },{
        sentence: '这是5',
        isEdit: false
      },{
        sentence: '这是6',
        isEdit: false
      },]
    };
  },


  methods: {
    getTableData(){
      const {page, limit} = this
      //发送请求并赋值给tableData
    },

    handlePreview(file) {
      console.log(file);
    },

    handleRemove(file, fileList) {
      console.log('移除成功', file, fileList);
    },

    handleSuccess(response, file, fileList){
      console.log('上传成功', response, file, fileList)
    },

    handleError(err, file, fileList){
      console.log('上传失败', err, file, fileList)
    },

    handleChange(){
      console.log('文件状态发生改变')
    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    Show(){
      this.isShowTable = !this.isShowTable
      // console.log(this.isShowTable)
    },

    handleSizeChange(limit) {
      //整理参数
      this.limit = limit;
      //发送请求
    },

    handleCurrentChange(pager=1) {
      this.page = pager
      //解构参数，向服务器发送请求
    },

    //失却焦点的事件---切换为查看模式，展示span
    toLook(row) {
      // row：形参是当前用户添加的最新的属性值
      // 如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if(row.sentence.trim()==''){
        this.$message.error('输入不能为空');
        return;
      }
      // 使得当前编辑模式变为查看模式【让input消失，显示span】
      row.isEdit = false;
    },

    //点击span的回调，变为编辑模式并且实现自动聚焦
    toEdit(row, index){
      row.isEdit = true
      //获取input节点，实现自动聚焦，不然的话需要点击两次才能聚焦
      //问题：点击span的时候，切换为input变为编辑模式，但是我们不可能一点击span立马获取到input元素
      //原因：不是渲染需要时间，而是vue会等函数体全部执行完再去渲染，所以获取不到input元素
      //解决：使用$nextTick，当节点渲染完毕了，会执行一次；也就是说只有当input表单存在了才会执行
      this.$nextTick(() => {
        console.log(this.$refs)
        //获取相应的input表单元素，实现自动聚焦;
        this.$refs[index].focus();
      });
    },

    handleEdit(index, row) {
      row.isEdit = true
    },

    handleDelete(index, row) {
      //弹框：messagebox的使用
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          //当用户点击确定按钮的时候会出发
          //向服务器发请求
          // let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          //如果删除成功
          // if (result.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //再次获取品牌列表数据
          // this.getTableData(this.list.length>1?this.page:this.page-1);
          // }
        })
        .catch(() => {
          //当用户点击取消按钮的时候会触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // this.tableData.splice(index,1)
    },

    ShowTable(){
      this.isShowTable = false
    },

    toContent(){
      this.$router.push({name:'ContentExtraction'})
    }
  }
}
</script>

<style scoped>
.upload-demo:after{
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
