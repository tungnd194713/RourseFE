<!-- ExamQuestion.vue -->
<template>
  <div class="question-container">
    <div class="question">{{ question }}</div>
    <el-radio-group v-model="selectedOption">
      <el-radio v-for="(option, index) in options" :key="index" :label="index">
        {{ option }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    options: Array
  },
  data() {
    return {
      selectedOption: null
    };
  },
  watch: {
    selectedOption() {
      this.$emit("answer-selected", this.selectedOption);
    }
  }
};
</script>

<style>
.question-container {
  margin-bottom: 20px;
}
</style>
