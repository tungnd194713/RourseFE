<template>
  <div>
	<div class="exam-container">
		<!-- Exam Header -->
		<div class="exam-header">
		<h2 class="exam-title">{{ test.name }}</h2>
		<div class="exam-info">
			<p>Đề thi gồm {{ test.questions ? test.questions.length : 0 }} câu.</p>
			<p>Thời gian {{ test.time }} phút.</p>
		</div>
		</div>

		<!-- Questions -->
		<div class="questions">
		<div v-for="(question, index) in test.questions" :key="question._id" class="question" :id="`q-${question.id || question._id}`">
			<!-- Question Header -->
			<div class="question-header">
				<span class="question-label">Câu {{ index + 1 }}:</span>
				<!-- <el-tag :type="getLabelColor(question)">{{ getLabelTag(question) }}</el-tag> -->
			</div>
				
				<!-- Question Content -->
			<div class="question-content">{{ question.question }}</div>
				
				<!-- Choices -->
				<div class="choices">
				<el-button
					v-for="(choice, idx) in question.choices"
					:key="choice.id"
					:type="getChoiceType(question, choice.id)"
					@click="handleChoiceClick(question._id, choice.id)"
					class="choice-button"
				>
					{{ String.fromCharCode(65 + idx) }}: 
					<span class="choice-content">{{ choice.content }}</span>
				</el-button>
			</div>
			
			<!-- Answer -->
			<el-card v-if="isSubmitted && question.answer" class="answer-card">
			<h4>Lời giải</h4>
			<div class="answer-content">{{ question.answer }}</div>
			</el-card>
		</div>
		</div>

		<!-- Submit Button -->
		<el-button v-if="!isSubmitted" type="primary" class="submit-button">Nộp bài</el-button>

		<!-- Sidebar Drawer -->
		<el-drawer :visible.sync="open" custom-class="sidebar-drawer" :with-header="false">
		<div class="sidebar-content">
			<h3>Thời gian còn lại</h3>
			<p class="time-left">{{ timeLeft }}</p>
			<h3>Lối tắt</h3>
			<div class="shortcut-buttons">
			<el-button
				v-for="(q, idx) in test.questions"
				:key="q._id"
				:type="userChoices[q._id] ? 'primary' : 'default'"
				@click="scrollToQuestion(q._id)"
			>
				{{ idx + 1 }}
			</el-button>
			</div>
		</div>
		</el-drawer>

		<!-- Toggle Sidebar Button -->
		<el-button class="toggle-button" icon="el-icon-menu" @click="toggleSidebar" />
	</div>
  </div>
</template>


<script>
// import axios from 'axios';
// import ResultChart from './ResultChart';
// import { mapState, mapMutations } from 'vuex';
import { RoadMapService } from '@/services'

export default {
    components: {
        // ResultChart,
    },
    props: {
        // test: Object,
        // answerSheet: Object,
    },
    data() {
        return {
            userChoices: {},
            blurCount: 0,
            open: false,
            key: [],
            finishedAt: null,
            isSubmitted: false,
			answerSheet: {},
			test: {},
        };
    },
    computed: {
		totalTime() {
			return this.test.time * 60 * 1000;
		},
        score() {
            return Math.round((Object.values(this.userChoices).filter(c => this.key.includes(c.choiceId)).length / this.test.questions.length) * 1000) / 100;
        },
        formattedTime() {
            return this.formatLeftTime(this.finishedAt - new Date(this.answerSheet.createdAt).valueOf());
        },
        timeLeft() {
            return this.formatLeftTime(this.totalTime);
        },
        topics() {
            const result = {};
            this.test.questions.forEach(q => {
                q.tags.forEach(tag => {
                    if (!result[tag]) result[tag] = { count: 0, total: 0 };
                    if (this.key.includes(this.userChoices[q._id]?.choiceId)) result[tag].count += q.level;
                    result[tag].total += q.level;
                });
            });
            return result;
        },
    },
    methods: {
		async getTestById() {
			const { data } = await RoadMapService.getTestById(this.$route.params.testId);
			if (data) {
				this.test = {...data}
				if (data.isShuffled) {
					this.test.questions = data.questions.sort( () => Math.random() - 0.5)
				}
			}
		},
        async submitAnswerSheet(isFinished) {
            const sheetBody = {
                isFinished,
                choices: Object.values(this.userChoices),
                blurCount: this.blurCount,
            };
			console.log(sheetBody)
            // try {
            //     const { data: { answerSheet: savedSheet, testKey } } = await axios.patch(`/v1/answersheets/${this.answerSheet._id}`, sheetBody);
            //     if (isFinished) {
            //         this.key = testKey;
            //         this.finishedAt = Date.parse(savedSheet.finishedAt);
            //     }
            // } catch (error) {
            //     console.error(error);
            // }
        },
        async handleSubmit() {
            await this.submitAnswerSheet(true);
            this.isSubmitted = true;
        },
        handleChoiceClick(questionId, choiceId) {
            if (this.isSubmitted) return;
            this.$set(this.userChoices, questionId, {
                choiceId,
                moment: new Date(),
            });
        },
        toggleSidebar() {
            this.open = !this.open;
        },
        scrollToQuestion(questionId) {
            document.getElementById(`q-${questionId}`).scrollIntoView({ behavior: 'smooth' });
        },
        formatLeftTime(leftTime) {
            const pad = (n) => (n < 10 ? `0${n}` : n);
            if (leftTime <= 0) return '00:00:00';
            leftTime /= 1000;
            const h = Math.floor(leftTime / 3600);
            const m = Math.floor(leftTime / 60) - h * 60;
            const s = Math.floor(leftTime - h * 3600 - m * 60);
            return `${pad(h)}:${pad(m)}:${pad(s)}`;
        },
		getLabelColor(question) {
            if (!this.isSubmitted) return 'primary';
            if (this.test.showKeyMode === 2) {
                return this.key.includes(this.userChoices[question._id]?.choiceId) ? 'success' : 'danger';
            }
            if (this.test.showKeyMode === 1 && !this.key.includes(this.userChoices[question._id]?.choiceId)) {
                return 'danger';
            }
            return 'primary';
        },
        getChoiceType(question, choiceId) {
            if (!this.isSubmitted) return this.userChoices[question._id]?.choiceId === choiceId ? 'primary' : 'default';
            if (this.test.showKeyMode === 0) {
                return this.userChoices[question._id]?.choiceId === choiceId ? 'primary' : 'default';
            }
            if (this.userChoices[question._id]?.choiceId === choiceId || (this.test.showKeyMode === 2 && this.key.includes(choiceId))) {
                return 'success';
            }
            if (this.key.includes(choiceId)) {
                return this.userChoices[question._id]?.choiceId === choiceId ? 'success' : 'success';
            }
            return this.userChoices[question._id]?.choiceId === choiceId ? 'danger' : 'primary';
        },
    },
    created() {
		this.getTestById();
        window.addEventListener('blur', () => this.blurCount++);
    },
    beforeDestroy() {
        window.removeEventListener('blur', () => this.blurCount++);
    },
    watch: {
        isSubmitted(newVal) {
            if (newVal) return;
            const interval = setInterval(() => {
                const distance = Math.floor((Date.now() - new Date(this.answerSheet.createdAt).valueOf()) / 1000);
                if (distance % (5 * 60) === 0) this.submitAnswerSheet(false);
            }, 1000);
            this.$once('hook:beforeDestroy', () => {
                clearInterval(interval);
            });
        },
    },
};
</script>

<style scoped>
.exam-container {
	padding: 20px;
}

.exam-header {
  margin-bottom: 20px;
}

.exam-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.exam-info {
  display: flex;
  justify-content: space-between;
}

.questions {
  display: grid;
  gap: 20px;
}

.question {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  scroll-margin-top: 100px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.question-label {
  font-size: 16px;
}

.question-content {
  margin-bottom: 15px;
}

.choices {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
}

.choice-button {
  flex: 0 0 calc(33.33% - 10px);
  margin-bottom: 10px;
  margin-right: 0;
  margin-left: 10px;
}

.choice-content {
  flex: 0 0 100%;
}

.answer-card {
  margin-top: 15px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.answer-card h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.answer-content {
  font-size: 16px;
}

.submit-button {
  margin-top: 20px;
  width: 100%;
}

.sidebar-content {
  padding: 20px;
}

.sidebar-content h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.time-left {
  font-size: 18px;
  margin-bottom: 20px;
}

.shortcut-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.shortcut-buttons el-button {
  flex: 0 0 calc(33.33% - 10px);
}

.toggle-button {
  position: fixed;
  top: 90px;
  right: 20px;
}
</style>
