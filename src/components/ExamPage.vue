<template>
  <div class="exam-page">
    <h1 class="title">Exam of {{ moduleName }}</h1>
    <transition-group name="fade">
      <div :key="0" v-if="!isSubmitted">
        <div v-for="(question, index) in questions" :key="index">
          <exam-question
            :question="question.questionText"
            :options="question.options"
            @answer-selected="handleAnswerSelected(index, $event)"
            :disabled="showResult"
            :selected-answer="userAnswers[index]"
            :correct-answer="question.correctAnswer"
          ></exam-question>
        </div>
      </div>
      <div :key="1" v-else>
        <div v-for="(question, index) in questions" :key="index">
          <exam-result
            :question="question.questionText"
            :options="question.options"
            :user-choice="question?.user_choice"
            :correct-answer="question?.correctAnswer"
            :is-correct="question?.is_correct"
          ></exam-result>
        </div>
      </div>
    </transition-group>
    <div v-if="!isSubmitted" class="submit-button-container">
      <el-button @click="submitExam" type="primary" class="submit-button">
        Submit Exam
      </el-button>
    </div>
    <!-- <div v-else class="result">
      <h2 class="result-title">Your Results</h2>
      <ul class="result-list">
        <li v-for="(result, index) in examResults" :key="index">
          {{ result.question }} - {{ result.answer }}
          <span v-if="result.isCorrect" class="correct">✓</span>
          <span v-else class="incorrect">✗</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import ExamQuestion from "./ExamQuestion.vue";
import ExamResult from "./ExamResult.vue";
import { CourseService } from "@/services";

export default {
  data() {
    return {
      questions: [],
      userAnswers: [],
      showResult: false,
      moduleName: "",
      isSubmitted: false,
      examId: "",
    };
  },
  components: {
    ExamQuestion,
    ExamResult,
  },
  async created() {
    await this.getExam();
    this.userAnswers = this.questions.map((item) => {
      return {
        _id: item._id,
        answer: -1,
      };
    });
  },
  methods: {
    handleAnswerSelected(index, selectedOption) {
      if (!this.showResult) {
        this.$set(this.userAnswers, index, {
          ...this.userAnswers[index],
          answer: selectedOption,
        });
      }
    },
    async submitExam() {
      // Do something with the userAnswers (e.g., calculate the score)
      //   this.showResult = true;
      console.log(this.userAnswers);
      try {
        const { data } = await CourseService.submitExam(this.$route.query.module_id, this.examId, this.userAnswers);
        this.isSubmitted = true;
        this.questions = data.questions
      } catch (e) {
        console.log(e)
        this.$notify.error("Error");
      }
    },
    async getExam() {
      try {
        const { data } = await CourseService.getExam(
          this.$route.query.module_id
        );
        console.log(data)
        this.examId = data.id;
        this.questions = data.questions;
        this.moduleName = data.module_id.name;
        this.isSubmitted = data.isSubmitted;
      } catch (e) {
        this.$notify.error("Error");
      }
    },
  },
  computed: {
    examResults() {
      return this.questions.map((question, index) => ({
        question: question.question,
        answer: question.options[this.userAnswers[index]],
        isCorrect: question.options[this.userAnswers[index]].startsWith(
          question.correctAnswer
        ),
      }));
    },
  },
};
</script>

<style lang="scss">
.exam-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 36px;
    color: #2c3e50;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .submit-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .submit-button {
    font-size: 18px;
    padding: 12px 30px;
    border-radius: 30px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }

  .result {
    margin-top: 30px;
    text-align: center;
  }

  .result-title {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .result-list {
    margin-top: 10px;
    padding: 0;
    list-style: none;
  }

  .result-list li {
    font-size: 18px;
    color: #2c3e50;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .question-container {
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }

  .question {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
  }

  .el-radio-group {
    margin-top: 15px;
  }

  .el-radio__label {
    font-size: 16px;
    color: #2c3e50;
  }

  .el-radio__original {
    border-color: #2c3e50;
  }

  .el-radio__inner {
    background-color: #fff;
    border-color: #2c3e50;
  }

  .el-radio__inner:hover {
    border-color: #2c3e50;
  }

  .el-radio__inner::after {
    background-color: #2c3e50;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background-color: #2c3e50;
  }

  .el-radio__input.is-checked .el-radio__inner::after {
    background-color: #fff;
  }

  .el-button--primary {
    background-color: #2c3e50;
    color: #fff;
    font-weight: bold;
  }

  .el-button--primary:hover {
    background-color: #34495e;
  }

  .result {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  }

  .result-list {
    padding: 0;
    list-style: none;
  }

  .result-list li {
    font-size: 18px;
    color: #2c3e50;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .correct {
    margin-left: 5px;
    color: #27ae60;
  }

  .incorrect {
    margin-left: 5px;
    color: #e74c3c;
  }
}
</style>
