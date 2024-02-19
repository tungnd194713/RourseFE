<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <div class="roadmap-header">
      <div class="roadmap-title">
				<h1>Here is roadmap title </h1>
				<p>As a front-end developer, you’ll design and develop the look, feel, function and experience of a website. You’ll be responsible for developing features with users in mind while ensuring design maintains brand consistency. A front-end developer writes reusable code that is optimized for speed and scalability using programming languages like HTML, CSS, and JavaScript, in addition to building web designs that work well for smartphones. Developers also review code and troubleshoot technical issues.</p>
				<el-button class="mt-3" type="success" @click="handleRegister">
					<div class="fs-16 fw-bold">{{ roadmapProgress }}%</div>
				</el-button>
                <div class="mt-2 fw-bold">Applied date: {{ appliedDate }}</div>
                <div class="mt-2 fw-bold">Current learning: {{ route?.current_module?.name }}</div>
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
						<h2 @click="dialogVisible = true">{{ milestone.milestone.title }}</h2>
						<h4 style="display: flex; justify-content: space-between">
							<div>Estimated time: {{ milestone.milestone.estimated_time.value }} hours</div>
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
							<h1><em>Title</em></h1>
						</div>
						<p class="fw-bold">What you will learn:</p>
						<ul style="padding-left: 0">
							<li>
								<div class="d-flex">
									<svg aria-hidden="true" fill="none" focusable="false" height="16" viewBox="0 0 16 16" width="100" class="css-4v75v4" id="cds-react-aria-25"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.74 3.672L6.225 14.168.323 8.736l1.354-1.472 4.419 4.068 8.163-9.004 1.482 1.344z" fill="currentColor"></path></svg>
									<div>Define front-end development, list roles and skills, outline web development steps, and explore UI/UX design, collaboration, and industry trends.</div>
								</div>
							</li>
							<li>
								<div class="d-flex">
									<svg aria-hidden="true" fill="none" focusable="false" height="16" viewBox="0 0 16 16" width="100" class="css-4v75v4" id="cds-react-aria-25"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.74 3.672L6.225 14.168.323 8.736l1.354-1.472 4.419 4.068 8.163-9.004 1.482 1.344z" fill="currentColor"></path></svg>
									<div>Explore web browsers, load balancing, and define web frameworks, platforms, hosting, languages, accessibility, and cloud benefits.</div>
								</div>
							</li>
							<li>
								<div class="d-flex">
									<svg aria-hidden="true" fill="none" focusable="false" height="16" viewBox="0 0 16 16" width="100" class="css-4v75v4" id="cds-react-aria-25"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.74 3.672L6.225 14.168.323 8.736l1.354-1.472 4.419 4.068 8.163-9.004 1.482 1.344z" fill="currentColor"></path></svg>
									<div>Compare front-end and back-end roles, version control, and CI/CD, discuss No-Code advantages and tools, and define CMS and SEO patterns.</div>
								</div>
							</li>
							<li>
								<div class="d-flex">
									<svg aria-hidden="true" fill="none" focusable="false" height="16" viewBox="0 0 16 16" width="100" class="css-4v75v4" id="cds-react-aria-25"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.74 3.672L6.225 14.168.323 8.736l1.354-1.472 4.419 4.068 8.163-9.004 1.482 1.344z" fill="currentColor"></path></svg>
									<div>Create websites using WordPress and plugins for website enhancement, outline qualifications, portfolio elements, and specialization paths.</div>
								</div>
							</li>
						</ul>
						<p class="fw-bold">Module list:</p>
						<el-collapse v-model="activeNames" @change="handleChange" class="module-container">
							<el-collapse-item title="1: HTML" name="1">
								<div>
									Consistent with real life: in line with the process and logic of real
									life, and comply with languages and habits that the users are used to;
								</div>
								<div>
									Consistent within interface: all elements should be consistent, such
									as: design style, icons and texts, position of elements, etc.
								</div>
								<router-link :to="{ path: '/course/module' }">To module > </router-link>
							</el-collapse-item>
							<el-collapse-item title="2: CSS" name="2">
								<div>
									Operation feedback: enable the users to clearly perceive their
									operations by style updates and interactive effects;
								</div>
								<div>
									Visual feedback: reflect current state by updating or rearranging
									elements of the page.
								</div>
							</el-collapse-item>
							<el-collapse-item title="3: Basic JS" name="3">
								<div>
									Simplify the process: keep operating process simple and intuitive;
								</div>
								<div>
									Definite and clear: enunciate your intentions clearly so that the
									users can quickly understand and make decisions;
								</div>
								<div>
									Easy to identify: the interface should be straightforward, which helps
									the users to identify and frees them from memorizing and recalling.
								</div>
							</el-collapse-item>
							<el-collapse-item title="4: Intermediate JS" name="4">
								<div>
									Decision making: giving advices about operations is acceptable, but do
									not make decisions for the users;
								</div>
								<div>
									Controlled consequences: users should be granted the freedom to
									operate, including canceling, aborting or terminating current
									operation.
								</div>
							</el-collapse-item>
						</el-collapse>
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
    };
  },
	computed: {
		getCurrentMilestoneIndex() {
			return this.route.roadmap_milestone.findIndex((item) => item?.milestone?.id == this.route.current_milestone.id);
		}
	},
	async mounted() {
		this.getUserRoadmap()
	},
	methods: {
		async getUserRoadmap() {
			const { data } = await RoadMapService.getUserRoadmap(this.$store.getters.authUser?.id);
			console.log(data)
			this.route = {...data}
			this.roadmapProgress = Math.round(data.roadmap_milestone.reduce((progress, milestone) => milestone.is_finished ? progress + 1 / data.roadmap_milestone?.length * 100 : 0 , 0))
			this.appliedDate = new Date(data.applied_date).toISOString().slice(0, 10);
			this.milestones = data.roadmap_milestone
		},
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
</style>
