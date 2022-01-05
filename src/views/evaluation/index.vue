<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
          <span class="title"><strong>QA-Pairs Evaluation (Random)</strong></span>
          <el-button style="float: right; padding: 3px 0; font-size:15px" type="text" @click="randomChooseOne">换一题</el-button>
      </div>
      <div class="text item">

        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content label-col"><label>Context</label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-skeleton v-if="showSkeleton" :rows="3" animated />
            <p class="content" v-if="!showSkeleton"> {{ context }} </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content label-col"><label>Question</label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-skeleton v-if="showSkeleton" :rows="1" animated />
            <p class="content" v-if="!showSkeleton"> {{ question }} </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content label-col"><label>Answer</label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-skeleton v-if="showSkeleton" :rows="1" animated />
            <p class="content" v-if="!showSkeleton"> {{ answer }} </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content label-col"><label>Title</label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-skeleton v-if="showSkeleton" :rows="1" animated />
            <p class="content" v-if="!showSkeleton"> {{ title }} </p>
          </el-col>
        </el-row>

        <el-row></el-row>

        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="3"><div class="grid-content label-col"><label>流畅程度</label></div></el-col>
          <el-col :span="5"><div style="color:gray;">文本是否流畅通顺</div></el-col>
          <el-col :span="12">
            <div class="rate-box">
              <el-rate
                  v-model="fluency"
                  show-text>
              </el-rate>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="3"><div class="grid-content label-col"><label>合理程度</label></div></el-col>
          <el-col :span="5"><div style="color:gray;">问题与答案是否合理</div></el-col>
          <el-col :span="12">
            <div class="rate-box">
              <el-rate
                  v-model="reasonable"
                  show-text>
              </el-rate>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="3"><div class="grid-content label-col"><label>相关程度</label></div></el-col>
          <el-col :span="5"><div style="color:gray;">问题文本是否与相应上下文匹配</div></el-col>
          <el-col :span="12">
            <div class="rate-box">
              <el-rate
                  v-model="relevance"
                  show-text>
              </el-rate>
            </div>
          </el-col>
        </el-row>
        <el-row></el-row>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="3"><div class="grid-content label-col"><label>问题难度</label></div></el-col>
          <el-col :span="5"><div style="color:gray;">问答该问题的难易程度</div></el-col>
          <el-col :span="12">
            <el-select v-model="difficulty" placeholder="请选择">
              <el-option
                v-for="item in difficulties"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.note }}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="editDialog = true">修 改</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="confirmDelete = true">删 除</el-button>
          </el-button-group>
          <el-button type="success" @click="nextQuestion">下一个<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-row>

        <el-dialog
          title="提示"
          :visible.sync="confirmDelete"
          width="30%">
          <span>确定要删除吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDelete = false">取 消</el-button>
            <el-button type="primary" @click="deleteQ">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="修改" :visible.sync="editDialog">
          <el-form :model="form">
            <el-form-item label="Context" label-width="120px">
              <el-input type="textarea" v-model="form.context" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Question" label-width="120px">
              <el-input v-model="form.question" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Answer" label-width="120px">
              <el-input v-model="form.answer" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="editQuestion">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { deleteQuestion, getFirstUnchecked, getRandom, rateQuestion, updateQuestion } from '@/api/evaluation'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      loading: false,
      errored: false,
      showSkeleton: true,
      editDialog: false,
      confirmDelete: false,
      question_id: 0,
      context_id: 0,
      context: 'I am your father.',
      question: 'Who are you ?',
      answer: 'father',
      title: 'human',
      form: {
        context: 'I am your father.',
        question: 'Who is you ?',
        answer: 'Father'
      },
      fluency: 0,
      reasonable: 0,
      relevance: 0,
      difficulties: [{
        value: '0',
        label: '简单',
        note: '单句即可得答案'
      }, {
        value: '1',
        label: '中等',
        note: '需要多句推理'
      }, {
        value: '2',
        label: '困难',
        note: '难以得出答案'
      }],
      difficulty: '',
      count: 0,
      token: getToken()
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // getFirstUnchecked().then(response => {
      //   this.putData(response);
      // })
      this.randomChooseOne();
    },
    putData(params) {
      this.context = params.data.reference.text;
      this.question = params.data.text;
      this.answer = params.data.answerText;
      this.title = params.data.reference.title;
      this.question_id = params.data.id;
      this.context_id = params.data.reference.id;
      this.form.question = this.question;
      this.form.context = this.context;
      this.form.answer = this.answer;
      this.showSkeleton = false;
    },
    fakeLoading() {
      this.showSkeleton = true;
      setTimeout(() => {
        this.showSkeleton = false;
      }, 2000);
    },
    editQuestion() {
      updateQuestion({
        id: this.question_id,
        contextId: this.context_id,
        context: this.form.context,
        question: this.form.question,
        answer: this.form.answer
      }).then(response => {
        this.showSkeleton = true;
        this.putData(response);
      });

      this.editDialog = false;
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    deleteQ() {
      deleteQuestion({id: this.question_id}).then(response => {
        this.confirmDelete = false;
        if (response.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        } else {
          this.$message.error('删除失败');
        }
        this.fetchData();
      })
    },
    nextQuestion() {
      rateQuestion({
        id: this.question_id,
        fluency: this.fluency,
        reasonable: this.reasonable,
        relevance: this.relevance,
        difficulty: this.difficulty,
        token: this.token
      }).then(response => {
        // 获取下一个
        this.showSkeleton = true;
        // getFirstUnchecked().then(response => {
        //   this.putData(response);
        // })
        this.fetchData();
        // 清空评分给下一个问题用
        this.fluency = 0;
        this.reasonable = 0;
        this.relevance = 0;
        this.difficulty = '';
      })
    },
    randomChooseOne() {
        getRandom().then(response => {
          this.showSkeleton = true;
          this.putData(response);
        });
    },
    generateRandomNum: function(min, max) {
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*min+1,10); 
                break; 
            case 2: 
                return parseInt(Math.random()*(max-min+1)+min,10); 
                break; 
                default: 
                    return 0; 
                    break; 
        } 
    },
    nextQuestionnnn: async function() {
        await axios
                    .get('http://localhost:8000/choice-question-count')
                    .then(response => (
                    this.count = response.data.count
                    ))
        random = this.generateRandomNum(this.count)
        axios
            .get('http://localhost:8000/choice-question/' + random)
            .then(response => (
            this.content = response.data.content,
            this.option_a = response.data.option_a,
            this.option_b = response.data.option_b,
            this.option_c = response.data.option_c,
            this.option_d = response.data.option_d,
            this.answer = response.data.answer,
            this.resolution = response.data.solution == ''?'暂无解析':response.data.solution
            ))
            .catch(error => {
            console.log(error)
            this.errored = true
            })
            .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-row {
    margin-bottom: 20px;
    /* &:last-child {
        margin-bottom: 0;
    } */
}
.el-col {
    border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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
    width: 90%;
    height: 80%;
    margin: 0 auto;
}
.basic-layout {
    text-align: center;
    margin-top: 30px;
}
.title {
    font-size: 25px;
}
.question {
    margin-bottom: 25px; 
    font-size: 50px;
}
.choice {
    width: 100%;
    font-size: 35px;
}
.rate-box {
  /* height: 36px;
  display: flex;
  align-items: center */
}
.rate {
    font-size: 25px;
}
/deep/ .el-rate__icon {
  font-size: 25px;
}

.bg-purple {
  background: #d3dce6;
}

.label-col {
  font-size: 25px;

}

.content {
  margin-left: 3px;
  font-size: 15px;
}
</style>

