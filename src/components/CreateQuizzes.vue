<template>
  <div class="quiz-creator">
    <el-collapse v-model="activeCollapse" accordion class="quiz-list">
      <el-collapse-item v-for="(quiz, index) in quizzes" :key="index">
        <template v-slot:title>
          <div class="quiz-title">Quiz {{ index + 1 }}</div>
        </template>
        <div class="quiz-card">
          <el-form :model="quiz" label-position="top">
            <el-form-item label="Question">
              <el-input v-model="quiz.question" class="question-input"></el-input>
            </el-form-item>
            <el-form-item label="Options">
              <div v-for="(option, optionIndex) in quiz.options" :key="optionIndex" class="option-item">
                <div class="option-label">{{ getOptionLabel(optionIndex) }}</div>
                <el-input v-model="quiz.options[optionIndex]" placeholder="Enter option" class="option-input"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="Correct Answer">
              <el-select v-model="quiz.correctAnswer" placeholder="Select the correct answer">
                <el-option v-for="(option, optionIndex) in quiz.options" :key="optionIndex" :label="getOptionLabel(optionIndex)" :value="optionIndex"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Video Time">
              <el-button type="info" class="video-time">{{ formatVideoTime(quiz.videoTime) }}</el-button>
              <el-slider :format-tooltip="() => formatVideoTime(quiz.videoTime)" v-model="quiz.videoTime" :min="0" :max="videoDuration"></el-slider>
            </el-form-item>
          </el-form>
          <el-button @click="removeQuiz(index)" type="danger" class="remove-button">Remove Quiz</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-button @click="addQuiz" type="primary" icon="el-icon-plus" circle class="add-button"></el-button>
  </div>
</template>

<script>
export default {
  props: {
    videoDuration: Number,
  },
  data() {
    return {
      activeCollapse: [0], // Only show the first quiz initially, can be an empty array if you want all quizzes collapsed initially
      quizzes: [
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: null, // Correct answer will be represented by the index of the correct option (0, 1, 2, or 3)
          videoTime: 0, // Default video time is set to 0 seconds
        },
      ],
    };
  },
  methods: {
    addQuiz() {
      this.quizzes.push({
        question: '',
        options: ['', '', '', ''],
      });
    },
    removeQuiz(index) {
      this.quizzes.splice(index, 1);
    },
    saveQuizzes() {
      // Save all quizzes data here, e.g., send it to a backend API
      console.log(this.quizzes);
    },
    getOptionLabel(index) {
      return String.fromCharCode(65 + index); // A -> 65, B -> 66, C -> 67, D -> 68
    },
    formatVideoTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },
  },
};
</script>
<style lang="scss">
.quiz-creator {
    & {
        padding: 20px;
    }

    .quiz-list {
        border: none;
    }

    .el-collapse-item__header {
        font-size: 18px;
        color: #409eff;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 5px;
        cursor: pointer;
    }

    .el-collapse-item__content {
        padding: 0;
    }

    .quiz-card {
        border-radius: 10px;
        padding: 20px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s ease-in-out;
    }

    .quiz-card:hover {
        background-color: #f5f5f5;
    }

    .question-input,
    .option-input {
        border-color: #409eff;
        border-radius: 5px;
    }

    .option-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .option-label {
        font-size: 18px;
        margin-right: 10px;
        color: #409eff;
    }

    .remove-button {
        margin-top: 10px;
    }

    .add-button {
        width: 60px;
        height: 60px;
        font-size: 24px;
        background-color: #409eff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease-in-out;
        padding-top: 0;
    }

    .add-button:hover {
        transform: scale(1.1);
    }

    .add-button .el-icon-plus {
        line-height: 60px;
    }
}
</style>