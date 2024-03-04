<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <div class="roadmap-header">
			<img class="background-img" src="https://cdn.thuvienphapluat.vn//uploads/tintuc/2023/04/04/an-toan-thong-tin-mang.jpg" alt="">
      <div class="roadmap-title">
				<h2 class="mb-4">Lĩnh vực dành cho bạn: </h2>
				<h1 class="fw-bold fs-48"> An toàn thông tin </h1>
				<h2 class="fs-26 fw-bold"> Nếu bạn có tính cẩn thận, kiên nhẫn và sáng tạo trong việc giải quyết các vấn đề bảo mật mạng, thì lĩnh vực an toàn thông tin phù hợp với bạn. </h2>
				<p class="fs-20">
Lĩnh vực an toàn thông tin là một ngành công nghệ đặc biệt tập trung vào bảo vệ thông tin và dữ liệu quan trọng khỏi các mối đe dọa mạng, tấn công và lỗ hổng bảo mật. Nó bao gồm các phương pháp, kỹ thuật và công nghệ được thiết kế để ngăn chặn, phát hiện và đáp ứng lại các mối đe dọa bảo mật, bao gồm virus, malware, tấn công phishing, tấn công từ chối dịch vụ (DDoS), xâm nhập mạng, và nhiều hình thức tấn công khác.</p>
			</div>
    </div>
		<div class="career-job d-flex">
			<div class="common-job">
				<h2 class="fw-bold">Các công việc đang tuyển thuộc lĩnh vực này: </h2>
				<div class="job-cotainer">
					<el-row :gutter="20">
						<el-col :span="8" v-for="(job, index) in jobs" :key="index">
							<el-card class="job-card">
								<div slot="header" class="clearfix">
									<img class="job-image" :src="job.image" alt="Job Image" style="width: 100%; height: auto">
								</div>
								<div style="padding: 20px; padding-top: 0">
									<span style="line-height: 36px;" class="fw-bold">{{ job.title }}</span>
									<p>{{ job.description }}</p>
									<p>Company: {{ job.company }}</p>
									<p>Location: {{ job.location }}</p>
									<p>Salary: {{ job.salary }}</p>
									<!-- <el-button type="primary" @click="apply">Apply Now</el-button> -->
								</div>
							</el-card>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="mb-4">
				<h3 class="fs-20 fw-bold">Các kỹ năng liên quan: </h3>
				<div class="skill-tags">
					<!-- <div v-for="(skill, item) in skillTags" :key="item" class="skill-item fs-14">
						{{ skill }}
					</div> -->
					<div class="skill-item fs-14">
						abcxyz
					</div>
					<div class="skill-item fs-14">
						abcxyz
					</div>
					<div class="skill-item fs-14">
						abcxyz
					</div>
					<div class="skill-item fs-14">
						abcxyz
					</div>
					<div class="skill-item fs-14">
						abcxyz
					</div>
					<div class="skill-item fs-14">
						abcxyz
					</div>
					
				</div>
				<div>
				<h3 class="fs-20 fw-bold">Lĩnh vực khác có thể phù hợp với bạn:  </h3>
					<ul>
						<li>Phát triển phần mềm</li>
						<li>Quản trị hệ thống</li>
					</ul>
				</div>
			</div>
				
		</div>
  </div>
</template>

<script>

export default {
  data() {
		return {
			jobs: [
				{
					title: 'Software Engineer',
					description: 'We are looking for a skilled software engineer to join our team.',
					company: 'ABC Tech',
					location: 'New York, NY',
					salary: '$80,000 - $100,000 per year',
					image: 'https://aptech.fpt.edu.vn/wp-content/uploads/2021/09/jobs-frontend-dev-2.jpg'
				},
				{
					title: 'Data Analyst',
					description: 'Join our data analytics team and help us analyze and interpret data.',
					company: 'XYZ Analytics',
					location: 'San Francisco, CA',
					salary: '$70,000 - $90,000 per year',
					image: 'https://aptech.fpt.edu.vn/wp-content/uploads/2021/09/jobs-frontend-dev-2.jpg'
				},
				{
					title: 'Frontend Developer',
					description: 'We are hiring a frontend developer to work on our latest projects.',
					company: '123 Designs',
					location: 'London, UK',
					salary: '£50,000 - £70,000 per year',
					image: 'https://aptech.fpt.edu.vn/wp-content/uploads/2021/09/jobs-frontend-dev-2.jpg'
				},
				{
					title: 'Marketing Manager',
					description: 'Join our marketing team and help us grow our brand.',
					company: 'MarketingPro',
					location: 'Los Angeles, CA',
					salary: '$60,000 - $80,000 per year',
					image: 'https://aptech.fpt.edu.vn/wp-content/uploads/2021/09/jobs-frontend-dev-2.jpg'
				}
			]
		}
	},
	async mounted() {

	},
	methods: {
    
  },
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
.common-job {
	max-width: 75%;
	margin-right: 2rem;
}
.roadmap-header {
	background: #e5e7e8;
	overflow: hidden;
  position: relative;
	.background-img {
		opacity: 0.35;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
  padding: 2rem 10rem;
  margin-bottom: 1rem;
  .roadmap-title {
		color: black !important;
		position: relative;
		padding: 1rem;
		width: 66.6%;
		p {
			font-size: 20px;
			word-spacing: 1px;
			line-height: 24px;
		}
		h1 {
			margin-bottom: 3rem;
		}
  }
}

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
	margin-bottom: 20px;
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

.career-job {
	padding: 2rem 10rem;
}
</style>
