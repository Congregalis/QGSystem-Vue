<template>
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
            width="700">
            <template slot-scope="scope">
              <span style="margin-left: 10px; display: block">
                {{ scope.row.sentence }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="实体识别"
            width="300">
            <template slot-scope="scope">
              <el-tag type="success" v-for="(ner, index) in scope.row.nerValueList" :key="index" style="margin: 0px 20px">{{ ner.nerName }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="updateNer(scope.row, scope.$index)">编辑</el-button>
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


        <!--对话框
          :visible.sync:控制对话框显示与隐藏用的
          Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
        -->
        <el-dialog title="修改实体" :visible.sync="dialogTableVisible" @open="show">
          <span style="display: block">{{nerInfo.sentence}}</span>
          <el-button style="margin-top: 10px" type="primary" icon="el-icon-plus" @click="addNerValue" >添加属性值</el-button>
          <el-table style="width: 100%; margin: 20px 0px" border :data="nerInfo.nerValueList">
            <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>

            <el-table-column width="width"  label="实体名称">
              <template v-slot="{row, $index}">
                <!-- 这里结构需要用到span与input进行来回的切换 -->
                <el-input v-if="row.flag" v-model="row.nerName" placeholder="请输入属性值名称" size="mini"  @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
                <span v-else @click="toEdit(row, $index)" style="display: block">{{ row.nerName }}</span>
              </template>
            </el-table-column>

            <el-table-column width="width"  label="操作">
              <template slot-scope="{row, $index}">
                <!-- 气泡确认框 -->
                <el-popconfirm :title="`确定删除${row.nerName}?`" @confirm="deleteNerValue($index)">
                  <!--注意这里的删除按钮也需要用作用域插槽，因为删除一条数据的话，得知道数组里被删除元素的ID才行-->
                  <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="UpdateNerInfo">确 定</el-button>
          </div>
        </el-dialog>



        <el-button  style="margin: 30px 0px 0px 500px; " size="large" type="info" @click="toDataInput">回退</el-button>
        <el-button  size="large" type="primary" @click="toQG">下一步</el-button>
      </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep"
export default {
  name: "ContentExtraction",
  data(){
    return {
      //代表的分页器第几页
      page: 1,
      //当前页数展示数据条数
      limit: 3,
      //总共数据条数
      total: 120,

      tableData: [{// 每个属性值都是一个对象，由sentence的id和实体名构成
        sentence: '这是抽取出来的No1句话',
        nerValueList:[{sId:'id',nerName:'人名'}, {sId:'id',nerName:'地名'}, {sId:'id',nerName:'时间'}]
      }, {
        sentence: '这是抽取出来的No2句话',
        nerValueList:[{sId:'id',nerName:'人名'}, {sId:'id',nerName:'地名'}, {sId:'id',nerName:'时间'}]
      },{
        sentence: '这是抽取出来的No3句话',
        nerValueList:[{sId:'id',nerName:'人名'}, {sId:'id',nerName:'地名'}, {sId:'id',nerName:'时间'}]
      },{
        sentence: '这是抽取出来的No4句话',
        nerValueList:[{sId:'id',nerName:'人名'}, {sId:'id',nerName:'地名'}, {sId:'id',nerName:'时间'}]
      },{
        sentence: '这是抽取出来的No5句话',
        nerValueList:[{sId:'id',nerName:'人名'}, {sId:'id',nerName:'地名'}, {sId:'id',nerName:'时间'}]
      },{
        sentence: '这是抽取出来的No6句话',
        nerValueList:[{sId:'id',nerName:'人名'}, {sId:'id',nerName:'地名'}, {sId:'id',nerName:'时间'}]
      }],

      dialogTableVisible: false,
      nerInfo:{
        sentence:'',
        nerValueList:[]
      },

    }
  },


  methods:{
    handleSizeChange(limit) {
      //整理参数
      this.limit = limit;
      //发送请求
    },

    handleCurrentChange(pager=1) {
      this.page = pager
      //解构参数，向服务器发送请求
    },

    show(){
      console.log(this.$refs)
    },

    addNerValue(){
      this.nerInfo.nerValueList.push({
        sId:'',
        nerName:'',
        flag:true
      })
      this.$nextTick(()=>{
        this.$refs[this.nerInfo.nerValueList.length-1].focus()
      })
    },

    updateNer(row, index){
      this.dialogTableVisible = true
      this.nerInfo = cloneDeep(row)
      //在修改某一个属性的时候，将相应的属性值元素添加上flag这个标记
      this.nerInfo.nerValueList.forEach((item) => {
          //这样书写也可以给属性值添加flag自动，但是会发现视图不会跟着变化（因为flag不是响应式数据）
          // item.flag = false
          //因为Vue无法检测到对象新增的属性，这样书写的属性并非响应式属性（数据变化视图跟着变）
          //解决：使用.$set方法，第一个参数:对象  第二个参数:添加新的响应式属性  第三参数：新的属性的属性值
          this.$set(item, "flag", false);
      });
    },

    toLook(row){
      // 如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if(row.nerName.trim()==''){
        this.$message.error('请你输入一个正常的属性值');
        return;
      }
      //新增的属性值不能与已有的属性值重复
      let isRepeat = this.nerInfo.nerValueList.some((item)=>{
        if(row != item){
          return row.nerName==item.nerName
        }
      })
      // 如果出现重复的情况，就一直保持编辑模式，无法变成查看模式
      if(isRepeat) return;
      // 使得当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },

    toEdit(row, index){
      // console.log(row, index)
      row.flag = true
      //实现自动聚焦
      this.$nextTick(()=>{
        //获取相应的input表单元素，实现自动聚焦
        // console.log(this.$refs)
        this.$refs[index].focus()
      })
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

    deleteNerValue(index){
      //当前删除属性值的操作是不需要发请求的
      this.nerInfo.nerValueList.splice(index,1);
      // console.log(this.nerInfo.nerValueList)
    },

    //保存按钮：进行添加属性或者修改属性的操作
    async UpdateNerInfo(){
      //整理参数:1,如果用户添加很多属性值，且属性值为空的不应该提交给服务器
      //提交给服务器数据当中不应该出现flag字段
      this.nerInfo.nerValueList = this.nerInfo.nerValueList.filter(item=>{
        //过滤掉属性值不是空的
        if(item.nerName!=''){
          //删除掉flag属性
          delete item.flag;
          return true;
        }
      })
      try {
        //发请求
        // await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        //对话框隐藏
        this.dialogTableVisible = false
        //提示消失
        this.$message({type:'success',message:'保存成功'});
        //保存成功以后需要再次获取平台属性进行展示
        // this.getAttrList();
      } catch (error) {
        // this.$message('保存失败')
      }
    },

    toDataInput(){
      this.$router.push({name:'DataInput'})
    },

    toQG(){
      this.$router.push({name:'QGEvaluation'})
    }
  }
}
</script>

<style scoped>

</style>
