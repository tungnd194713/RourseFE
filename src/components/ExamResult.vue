<template>
  <div
    class="question-container"
    :class="{
      answered: userChoice > -1,
      correct: isCorrect,
      incorrect: !isCorrect,
    }"
  >
    <div class="question">{{ question }}</div>
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <el-radio-group v-model="userChoice" :disabled="true">
      <el-radio
        v-for="(option, index) in options"
        :key="index"
        :label="index"
        :class="{
          'incorrect-answer': !isCorrect && index === correctAnswer,
        }"
      >
        {{ option }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    options: Array,
    correctAnswer: Number,
    userChoice: Number,
    isCorrect: Boolean,
  },
};
</script>

<style lang="scss">
.question-container {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
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

  .el-radio__input.is-disabled+span.el-radio__label {
    color: black !important;
  }

  .el-radio__original {
    border-color: #2c3e50;
  }

  .el-radio__inner {
    background-color: #f0f0f0;
    border-color: #2c3e50;
  }

  .el-radio__inner:hover {
    border-color: #2c3e50;
  }

  .correct-answer .el-radio__inner {
    background-color: #27ae60;
    border-color: #27ae60;
  }

  .correct-answer .el-radio__inner::after {
    background-color: #fff;
  }

  .incorrect-answer .el-radio__inner {
    background-color: #e74c3c;
    border-color: #e74c3c;
  }

  .incorrect-answer .el-radio__inner::after {
    background-color: #fff;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background-color: #2c3e50;
  }

  .el-radio__input.is-checked .el-radio__inner::after {
    background-color: #fff;
  }
}
.correct {
  background-color: #c1eccc !important;
}

.incorrect {
  background-color: #f7caca !important;
}
</style>
