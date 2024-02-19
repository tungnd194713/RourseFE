<!-- CourseList.vue -->
<template>
  <div class="course-list">
	<div class="feedback">
      <div class="d-flex justify-content-center mb-4 mx-3">
          <div class="col-xs-4">
              <div class="wrapper">
                  <span class="title">Career</span>
                  <el-select 
                      v-model="categoryChoice"
                      class="full-width">
                      <el-option 
                          v-for="opt in categoryList" 
                          :value="opt.id"
                          :key="opt.id"
                          :label="opt.title">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <div class="col-xs-8">
              <div class="wrapper">
                  <span class="title">Goal</span>
                  <el-select 
                      v-model="specCategoryChoice"
                      class="full-width">
                      <el-option 
                          v-for="opt in specCategoryList" 
                          :value="opt.id" 
                          :key="opt.id"
                          :label="opt.title">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <div class="col-xs-8">
              <div class="wrapper">
                  <span class="title">Mastery</span>
                  <el-select 
                      v-model="masteryChoice"
                      class="full-width">
                      <el-option 
                          v-for="opt in masteryList" 
                          :value="opt" 
                          :key="opt"
                          :label="opt">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <div class="col-xs-8 d-flex align-items-center">
              <el-button type="primary" @click="buildRoadmap">Search</el-button>
          </div>
      </div>
    </div>
    <div class="roadmap-header">
      <div class="roadmap-title">
				<h1>{{ routeTitle }} Route </h1>
				<p>{{ routeDescription }}</p>
				<el-button class="mt-3" type="success" @click="applyRoadmap">
					<div class="fs-16 fw-bold">Apply route</div>
				</el-button>
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
		<h1 class="text-center fw-bold">Roadmap title route - {{ milestones.length }} courses series</h1>
    <div class="roadmap-milestones">
			<div class="milestone-container" :style="{ height: milestones?.length * 10 + 'rem' }" style="display: flex; justify-content: center;">
				<el-steps direction="vertical" style="padding-top: 80px" finish-status="success">
					<el-step v-for="(stone, index) in milestones" :key="index"/>
				</el-steps>
				<div class="step-content">
					<div v-for="(milestone, index) in milestones" :key="index" class="step-content-item">
						<h2 @click="showMilestone(index)">{{ milestone.title }}</h2>
						<h4 style="display: flex; justify-content: space-between">
							<div>Estimated time: {{ milestone.estimated_time.value }} hours</div>
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
							<h1><em>{{ showedMilestone?.title }}</em></h1>
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
							<el-collapse-item v-for="(modu, index) in showedMilestone?.modules" :key="index" :title="`${index + 1}: ${modu.name}`" :name="modu.name">
								<div>{{ modu.description }}</div>
							</el-collapse-item>
						</el-collapse>
					</div>
				</el-dialog>
			</div>
			<div v-if="milestones?.length" class="roadmap-info">
				<div>
					<div>{{ milestones.length }} courses series</div>
					<div>
						<div>{{ masteryChoice }} level</div>
						<div>No prior experience required</div>
					</div>
					<div>
						<div>{{ monthTime }} months estimated</div>
						<div>10 hours a week recommended</div>
					</div>
					<div>
						Approximated 4.8 stars
					</div>
				</div>
			</div>
		</div>
		<login-modal ref="loginModal"></login-modal>
  </div>
</template>

<script>
import LoginModal from "../common/LoginModal.vue";
import { RoadMapService } from "@/services"

export default {
	components: {
    LoginModal
  },
  data() {
    return {
      dialogVisible: false,
			categoryChoice: '',
			categoryList: [],
			specCategoryChoice: '',
			specCategoryList: [],
			masteryList: [
				'Beginner',
				'Intermediate',
				'Advanced',
			],
			masteryChoice: 'Beginner',
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
      routeTitle: '',
			routeDescription: '',
			routeSkillSet: [],
			routeJobReference: [],
			milestones: [],
    };
  },
	async mounted() {
		this.getCategories()
		this.getSpecCategories(this.$route.query?.career)
	},
	methods: {
    showLoginModal() {
      this.$refs.loginModal.visible = true;
    },
		async applyRoadmap() {
			if (!this.$store.getters.accessToken) {
				this.showLoginModal()
			} else {
				const params = {
					title: this.routeTitle,
					description: this.routeDescription,
					milestone: this.milestones,
					user_id: this.$store.getters.authUser?.id,
					category_id: this.categoryChoice,
					sub_category_id: this.specCategoryChoice,
					skill_set: [],
					experience_level: this.masteryChoice,
				}
				const { data } = await RoadMapService.applyRoadmap(params)
				if (data) {
					this.$router.push({path: 'applied-roadmaps'});
				}
			}
		},
		async getCategories() {
      const { data } = await RoadMapService.fetchCategories();
      this.categoryList = [...data]
			this.categoryChoice = this.$route.query?.career
    },
		async getSpecCategories(categoryId) {
			const { data } = await RoadMapService.fetchSpecCategories(categoryId)
			this.specCategoryList = [...data]
			this.specCategoryChoice = data[0].id
		},
		async buildRoadmap() {
			const params = {
				main_goal: this.categoryChoice,
				specific_goal: this.specCategoryChoice,
				experience_level: this.masteryChoice,
			}

			const { data } = await RoadMapService.buildRoadmap(params)
			console.log(data)
			this.routeTitle = data.title
			this.routeDescription = data.description
			this.routeSkillSet = data.skill_set
			this.milestones = [...data.milestone]
			this.monthTime = Math.round(this.milestones.reduce((time, item) => time + item.estimated_time.value, 0) / 720)
		},
		showMilestone(index) {
			this.showedMilestone = this.milestones[index]
			this.dialogVisible = true;
		},
  },
	watch: {
		categoryChoice() {
			this.getSpecCategories(this.categoryChoice)
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
  border: 3px solid green;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
}

.module-container {
  border: 1px solid #EBEEF5;
}

.feedback {
    padding-top: 20px;

    .wrapper {
        position: relative;
        padding-top: 10px;
        margin-right: 1rem;

        .title {
            position: absolute;
            background-color: #fff;
            z-index: 1;
            left: 20px;
            bottom: 30px;
            color: #072856;
            font-size: 12px;
        }

        .title-textarea {
            position: absolute;
            background-color: #fff;
            z-index: 1;
            left: 20px;
            top: 2px;
            color: #072856;
            font-size: 12px;
            padding: 0 10px;
            font-weight: 500;
        }
    }
    .description {
        margin-top: 20px;
    }    

    .button {
        margin-top: 20px;

        .background {
            background: linear-gradient(263.55deg, #2EAC4A 17.14%, #82D9AF 124.02%);
            border-radius: 5px;
            color: #fff;
        }
    }
    .el-input {
    .el-input__inner {
      border: 1px solid #0E0E0E;
      border-radius: 4px;
      font-size: 13px;
      height: 45px;
      color: #072856;
    }
  }
}
</style>
