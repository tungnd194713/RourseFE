<template>
  <el-container>
    <el-header>
      <h1>Chỉnh sửa test</h1>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <h3>Thông tin bài test</h3>
            <el-form :model="testForm" label-width="120px">
              <el-form-item label="Tên bài test">
                <el-input v-model="testForm.name"></el-input>
              </el-form-item>
              <el-form-item label="Thời gian (phút)">
                <el-input-number v-model="testForm.time"></el-input-number>
              </el-form-item>
              <!-- <el-form-item label="Grade">
                <el-input-number v-model="testForm.grade"></el-input-number>
              </el-form-item> -->
              <el-form-item label="Ghi chú">
                <el-input type="textarea" v-model="testForm.note"></el-input>
              </el-form-item>
              <el-form-item>
                <el-switch v-model="isShuffled" active-text="Trộn câu hỏi" inactive-text="Không trộn"></el-switch>
              </el-form-item>
            </el-form>
            <el-row type="flex" justify="end" class="mt-2">
                <el-col :span="24">
                    <el-button type="primary" @click="submitForm">Lưu</el-button>
                    <el-button type="success" @click="$router.push({ name: 'TestPreview', params: { testId: $route.params.testId } })">Preview test</el-button>
                </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card>
            <h3>Danh sách câu hỏi</h3>
            <el-table-draggable handle=".handle" @change="yourEventHandler">
                <el-table :data="testForm.questions" style="width: 100%">
                    <el-table-column label="Stt (Kéo thả)" width="120px">
                        <template slot-scope="scope">
                            <div class="handle grabbable">{{ scope.$index + 1 }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Câu hỏi">
                        <template slot-scope="scope">
                            <div class="handle grabbable">{{ scope.row.question }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Đáp án">
                        <template slot-scope="scope">
                            <div v-if="scope.row.choices.length" class="handle grabbable">{{ getCorrectChoice(scope.row.choices) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Actions" width="250px">
                        <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="viewQuestion(scope.$index)">Xem</el-button>
                        <el-button type="warning" size="mini" @click="editQuestion(scope.$index)">Sửa</el-button>
                        <el-button type="danger" size="mini" @click="removeQuestion(scope.row.id, scope.$index)">Xóa</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-table-draggable>
            <el-button type="primary" @click="openQuestionDialog" style="margin-top: 20px; margin-right: 12px">Thêm câu hỏi</el-button>
            <el-button type="success" @click="seedQuestions" :disabled="seedLoading" v-loading.fullscreen.lock="seedLoading" style="margin-top: 20px;">Seed câu hỏi (OpenAI)</el-button>
          </el-card>
        </el-col>
      </el-row>
      
    </el-main>

    <!-- Dialog for adding/editing questions -->
    <el-dialog :title="isEditing ? 'Sửa câu hỏi' : 'Thêm câu hỏi'" :visible.sync="questionDialogVisible">
      <el-form :model="currentQuestion">
        <el-form-item label="Câu hỏi">
          <el-input v-model="currentQuestion.question"></el-input>
        </el-form-item>
        <el-form-item>
            <div>Lựa chọn</div>
          <div v-for="(choice, cIndex) in currentQuestion.choices" :key="cIndex" class="choice-block">
            <el-input v-model="choice.content" placeholder="Choice content"></el-input>
            <el-radio v-model="currentQuestion.correctChoice" :label="cIndex">Đúng</el-radio>
            <el-button type="danger" @click="removeChoice(cIndex)">Xóa</el-button>
          </div>
          <el-button type="primary" @click="addChoice">Thêm lựa chọn</el-button>
        </el-form-item>
        <el-form-item label="Giải thích">
          <el-input type="textarea" v-model="currentQuestion.answer"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="questionDialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="saveQuestion">Lưu</el-button>
      </div>
    </el-dialog>

    <!-- Dialog for viewing questions -->
    <el-dialog title="View Question" :visible.sync="viewDialogVisible">
      <el-form :model="currentQuestion" label-width="120px">
        <el-form-item label="Question">
          <el-input v-model="currentQuestion.question" readonly></el-input>
        </el-form-item>
        <el-form-item label="Grade">
          <el-input-number v-model="currentQuestion.grade" readonly></el-input-number>
        </el-form-item>
        <el-form-item label="Choices">
          <div v-for="(choice, cIndex) in currentQuestion.choices" :key="cIndex" class="choice-block">
            <el-input v-model="choice.content" readonly></el-input>
            <el-radio v-model="currentQuestion.correctChoice" :label="cIndex" disabled>Correct</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">Close</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { CourseService, RoadMapService } from '@/services'
import ElTableDraggable from "element-ui-el-table-draggable";
export default {
  components: {
    ElTableDraggable,
  },
  data() {
    return {
      testForm: {
        name: '',
        time: 0,
        grade: null,
        note: '',
        questions: [],
      },
      questionDialogVisible: false,
      viewDialogVisible: false,
      currentQuestion: {
        id: '',
        question: '',
        grade: null,
        choices: [{ content: '' }],
        correctChoice: null, // Track the index of the correct choice
        answer: '',
      },
      currentQuestionIndex: null,
      isEditing: false,
      isShuffled: false,
      seedLoading: false,
    };
  },
  created() {
    this.getTestById();
  },
  watch: {
    isShuffled(value) {
        if (!value) {
            this.testForm.isSorted = true;
            this.testForm.isShuffled = false;
        } else {
            this.testForm.isSorted = false;
            this.testForm.isShuffled = true;
        }
    },
    'testForm.questions': {
        handler: function () {
						this.updateTest()
        },
    }
  },
  methods: {
    async seedQuestions() {
      this.seedLoading = true;
			const { data } = await CourseService.seedQuestionData({
				courseId: this.$route.params.courseId,
				testId: this.$route.params.testId,
			})
			if (data) {
				this.$notify({
					title: 'Success',
					message: 'Đã seed modules!'
				})
				this.getTestById()
			}
			this.seedLoading = false;
    },
    async getTestById() {
        const { data } = await RoadMapService.getTestById(this.$route.params.testId);
        if (data) {
            this.testForm = {...data}
        }
    },
    async createQuestion() {
        const { data } = await RoadMapService.createNewQuestionToTest(this.$route.params.testId, this.currentQuestion);
        if (data) {
            return data
        }
        return false
    },
    async deleteQuestionById(questionId) {
        const { data } = await RoadMapService.deleteQuestionById(questionId);
        if (data) {
            return data
        }
        return false
    },
    async updateQuestionById(questionId) {
        const { data } = await RoadMapService.updateQuestionById(questionId, this.currentQuestion);
        if (data) {
            return data
        }
        return false
    },
    async updateTest() {
        const questions = this.testForm.questions.map((item) => item.id || item._id);
				console.log(this.testForm)
        const body = {
            ...this.testForm,
            questions,
        }
        const { data } = await RoadMapService.updateTestById(this.$route.params.testId, body);
        if (data) {
            return data
        }
    },
    openQuestionDialog() {
      this.isEditing = false;
      this.currentQuestion = {
        id: '',
        question: '',
        grade: null,
        choices: [{ content: '' }],
        correctChoice: null,
        answer: '',
      };
      this.questionDialogVisible = true;
    },
    viewQuestion(index) {
      const question = this.testForm.questions[index];
      this.currentQuestion = {
        id: question.id,
        question: question.question,
        grade: question.grade,
        choices: JSON.parse(JSON.stringify(question.choices)), // Deep clone to avoid direct mutation
        correctChoice: question.choices.findIndex(choice => choice.isTrue), // Find the correct choice index
        answer: question.answer,
      };
      this.viewDialogVisible = true;
    },
    editQuestion(index) {
      this.isEditing = true;
      this.currentQuestionIndex = index;
      const question = this.testForm.questions[index];
      this.currentQuestion = {
        id: question.id,
        question: question.question,
        grade: question.grade,
        choices: JSON.parse(JSON.stringify(question.choices)), // Deep clone to avoid direct mutation
        correctChoice: question.choices.findIndex(choice => choice.isTrue), // Find the correct choice index
        answer: question.answer,
      };
      this.questionDialogVisible = true;
    },
    async saveQuestion() {
      if (this.currentQuestion.correctChoice !== null) {
        this.currentQuestion.choices.forEach((choice, index) => {
          choice.isTrue = index === this.currentQuestion.correctChoice;
        });
      }
      if (this.isEditing) {
        const newQuestion = await this.updateQuestionById(this.currentQuestion.id);
        if (newQuestion) {
            this.$set(this.testForm.questions, this.currentQuestionIndex, this.currentQuestion);
        } else {
            this.$notify({
                title: 'Error',
                message: 'Something wrong'
            });
        }
      } else {
        const newQuestion = await this.createQuestion();
        if (newQuestion) {
            this.testForm.questions.push(newQuestion);
        } else {
            this.$notify({
                title: 'Error',
                message: 'Something wrong'
            });
        }
      }
      this.questionDialogVisible = false;
    },
    removeQuestion(questionId, index) {
        const question = this.deleteQuestionById(questionId)
        if (question) {
            this.testForm.questions.splice(index, 1);
            this.$notify({
                title: 'Success',
                message: 'Đã xóa câu hỏi!'
            });
        }
    },
    addChoice() {
      this.currentQuestion.choices.push({ content: '' });
    },
    removeChoice(choiceIndex) {
      if (choiceIndex === this.currentQuestion.correctChoice) {
        this.currentQuestion.correctChoice = null;
      } else if (choiceIndex < this.currentQuestion.correctChoice) {
        this.currentQuestion.correctChoice--;
      }
      this.currentQuestion.choices.splice(choiceIndex, 1);
    },
    submitForm() {
        const data = this.updateTest();
        if (data) {
            this.$notify({
                title: 'Success',
                message: 'Lưu thành công!'
            })
        }
      // Submit form data to server
    },
    yourEventHandler(event) {
      console.log(event, 1);
    },
    getCorrectChoice(choices) {
      const correctChoice = choices.find(choice => choice.isTrue);
      return correctChoice ? correctChoice.content : 'No correct choice';
    },
  },
};
</script>

<style scoped>
.grabbable {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.grabbable:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
.el-header {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
}
.question-block {
  margin-bottom: 20px;
}
.choice-block {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.choice-block .el-input {
  flex: 1;
}
.choice-block .el-radio {
  margin: 0 10px;
}
</style>
