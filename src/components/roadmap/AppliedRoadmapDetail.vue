<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <div class="roadmap-header">
      <div class="roadmap-title">
				<h1>{{route.title}} route </h1>
				<p>{{ route.description }}</p>
				<el-button class="mt-3" type="success" @click="handleRegister">
					<div class="fs-16 fw-bold">{{ roadmapProgress }}%</div>
				</el-button>
				<div class="mt-2 fw-bold">Applied date: {{ appliedDate }}</div>
				<div class="mt-2 fw-bold"><span style="cursor: pointer" @click="$router.push({name: 'VideoPlayer', params: {id: route?.current_module.id}})">Current learning: {{ route?.current_module?.name }}</span></div>
			</div>
			<div class="roadmap-skill">
				<div class="mb-4">
					<h3 class="fs-20 fw-bold">Skills you acquire after this route</h3>
					<div class="skill-tags">
						<div v-for="(skill, item) in skillTags" :key="item" class="skill-item fs-14">
							{{ skill }}
						</div>
					</div>
				</div>
				<div>
					<h3 class="fs-20 fw-bold">Common job titles</h3>
					<ul>
						<li>Backend Developer</li>
						<li>Backend Engineer</li>
					</ul>
				</div>
			</div>
    </div>
		<h1 class="text-center fw-bold">Your route</h1>
    <div class="roadmap-milestones">
			<div class="milestone-container" :style="{ height: milestones?.length * 10 + 'rem' }" style="display: flex; justify-content: center;">
				<el-steps direction="vertical" style="padding-top: 80px" finish-status="success" :active="getCurrentMilestoneIndex">
					<el-step v-for="(stone, index) in milestones" :key="index"/>
				</el-steps>
				<div class="step-content">
					<div v-for="(milestone, index) in milestones" :key="index" :class="{ 'current-item': route.current_milestone.id == milestone.milestone.id, 'finished-item': milestone.is_finished }" class="step-content-item unknown-item">
						<h2 @click="getMilestoneModuleProgress(milestone.milestone)">{{ milestone.milestone.title }}</h2>
						<h4 style="display: flex; justify-content: space-between">
							<div v-if="milestone.is_finished">Finished: <span class="fw-bold">{{ new Date(milestone.finished_date).toISOString().slice(0, 10) }}</span></div>
							<div v-else>Estimated time: {{ milestone.milestone.estimated_time.value }} hours</div>
						</h4>
						<h5>{{ milestone.modules.length }} videos courses</h5>
					</div>
				</div>
				<el-dialog
					:visible.sync="dialogVisible"
					:before-close="handleClose"
					:close-on-press-escape="false"
					width="400px"
					:custom-class="'right-dialog'"
				>
					<!-- Your dialog content goes here -->
					<div>
						<div style="display: flex; justify-content: space-between; align-items: center">
							<h1><em>{{ showedMilestone.title }}</em></h1>
						</div>
						<p class="fw-bold">Module list:</p>
						<div>
								<div v-for="(mod, index) in milestoneModules" :key="index" class="progress-container">
										<div class="progress-title" @click="goToModule(showedMilestone.id, mod.module_id)">{{ mod.name }}</div>
										<el-progress
										:percentage="mod?.progress ? Math.round(mod?.progress) : 0"
										color="#409eff"
										text-inside
										:stroke-width="18"
										:format="formatProgress"
										></el-progress>
								</div>
						</div>
						<div>
							<el-button type="primary" @click="completeMilestone">Enter exam</el-button>
						</div>
					</div>
				</el-dialog>
			</div>
			<div class="roadmap-info">
				<div>
					<div>5 courses series</div>
					<div>
						<div>Beginner level</div>
						<div>No prior experience required</div>
					</div>
					<div>
						<div>3 months estimated</div>
						<div>10 hours a week recommended</div>
					</div>
					<div>
						Approximated 4.8 stars
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { RoadMapService } from "@/services"

export default {
  data() {
    return {
      dialogVisible: false,
			skillTags: [
				"Programming Language Proficiency",
				"Database Management",
				"RESTful API Design",
				"Web Server and Framework Knowledge",
				"Version Control System Usage",
				"Security Principles Understanding",
				"Problem-Solving and Troubleshooting"
			],
      activeNames: [],
      roadmapProgress: 0,
			routeTitle: '',
			routeDescription: '',
			appliedDate: '',
			route: {},
			milestoneModules: [],
			showedMilestone: {},
    };
  },
	computed: {
		getCurrentMilestoneIndex() {
			return this.route.roadmap_milestone.findIndex((item) => item?.milestone?.id == this.route.current_milestone.id);
		},
	},
	async mounted() {
		this.getUserRoadmap()
	},
	methods: {
		async getUserRoadmap() {
			const { data } = await RoadMapService.getUserRoadmap(this.$store.getters.authUser?.id);
			console.log(data)
			this.route = {...data}
			let progress = 0;
			data.roadmap_milestone.forEach(milestone => {
					if (milestone.is_finished) {
							progress += (1 / data.roadmap_milestone.length) * 100;
					}
			});
			this.roadmapProgress = Math.round(progress);
			this.appliedDate = new Date(data.applied_date).toISOString().slice(0, 10);
			this.milestones = data.roadmap_milestone
			console.log(data.roadmap_milestone.map(x => x.is_finished), 1 / data.roadmap_milestone?.length * 100)
		},
		async getMilestoneModuleProgress(milestone) {
			const { data } = await RoadMapService.getMilestoneModuleProgress(milestone.id);
			console.log(data)
			this.milestoneModules = [...data]
			this.showedMilestone = {...milestone}
			this.dialogVisible = true
		},
		async completeMilestone() {
			if (this.showedMilestone?.id) {
				await RoadMapService.completeMilestone(this.showedMilestone.id);
				this.$router.go(0);
			}
		},
		formatProgress(percentage) {
      return `${percentage}%`;
    },
		ableToModule(milestone_id) {
			return this.route.roadmap_milestone.findIndex((item) => item?.milestone?.id == this.route.current_milestone.id) >= this.route.roadmap_milestone.findIndex((item) => item?.milestone?.id == milestone_id)
		},
		goToModule(milestone_id, module_id) {
			if (this.ableToModule(milestone_id)) {
				this.$router.push({name: 'VideoPlayer', params: {id: module_id}})
			} else {
				alert('Unable to go to this module!')
			}
		}
	}
};
</script>


<style lang="scss">
.el-collapse-item__header {
  font-weight: bold;
}
.module-container {
  .el-collapse-item {
    .el-collapse-item__header {
      padding: 1rem;
    }
    .el-collapse-item__content {
      padding: 1.2rem;
    }
  }

  a {
    text-decoration: none;
    color: green;
  }

  .alert {
    color: red;
  }

  .current-module .el-collapse-item__header {
    background: #ffffd6;
  }
}
</style>
<style lang="scss" scoped>
.roadmap-header {
	background: #e5e7e8;
  padding: 2rem 3rem;
  margin-bottom: 1rem;
	display: flex;
  .roadmap-title {
		padding: 1rem;
		width: 66.6%;
		p {
			font-size: 20px;
			word-spacing: 1px;
			line-height: 24px;
		}
  }
	.roadmap-skill {
		padding: 1rem;
		width: 33.3%;
		.skill-tags {
			display: flex;
			flex-wrap: wrap;
			width: calc(100% + 8px);
			gap: 4px;
			& > div {
				padding: 4px 8px;
				background: #c3c5c6;
				border-radius: 5px;
			}
		}
	}
}

.roadmap-milestones {
	display: flex;
	.milestone-container {
		width: 60%;
	}
	.roadmap-info {
		margin: 1rem;
		& > div {
			border: 3px solid gray;
			padding: 1rem;
		}
	}
}
.right-dialog {
  margin: 0 0 0 auto !important;
  height: 100vh;
}

.course-list {
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

.el-row {
  margin: 0 -12px;
}

.el-col {
  padding: 12px;
}

.course-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-thumbnail {
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.course-info {
  padding: 20px;
}

.course-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.course-description {
  color: #666;
  margin-bottom: 10px;
}

.course-instructor {
  color: #888;
}

.course-duration {
  color: #888;
}

.step-content {
  margin-left: 2rem;
	width: 80%;
  h2 {
    cursor: pointer;
  }
}

.step-content-item {
  height: 156px;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
}

.module-container {
  border: 1px solid #EBEEF5;
}

.unknown-item {
	border: 3px solid gray;
}

.finished-item {
  border: 3px solid green;
}

.current-item {
	border: 3px solid yellow;
}

.progress-container {
  margin: 20px auto;
}

.progress-title {
  margin-bottom: 5px;
	cursor: pointer;
	font-size: 24px;
}
</style>
