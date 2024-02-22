<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <el-form :model="form" label-width="400px" ref="form">
    <!-- Background Information -->
			<el-card class="mb-3">
				<div slot="header">Thông tin cơ bản</div>
				<el-form-item label="Độ tuổi của bạn">
					<el-select v-model="form.ageGroup" placeholder="Tuổi">
						<el-option v-for="ageOption in ageOptions" :key="ageOption.value" :label="ageOption.label" :value="ageOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Bạn đã học: ">
					<el-select v-model="form.educationLevel" placeholder="Trình độ giáo dục">
						<el-option v-for="eduOption in educationOptions" :key="eduOption.value" :label="eduOption.label" :value="eduOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Hiện bạn đang: ">
					<el-select v-model="form.employmentStatus" placeholder="Tình trạng công việc">
						<el-option v-for="employmentOption in employmentOptions" :key="employmentOption.value" :label="employmentOption.label" :value="employmentOption.value"></el-option>
					</el-select>
				</el-form-item>
			</el-card>

			<!-- Interests and Goals -->
			<el-card class="mb-3">
				<div slot="header">Sở thích và mục tiêu</div>
				<el-form-item label="Điều gì đưa bạn đến với CNTT?">
					<el-select v-model="form.attraction" placeholder="Nguyên nhân" multiple>
						<el-option v-for="attractionOption in attractionOptions" :key="attractionOption.value" :label="attractionOption.label" :value="attractionOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Bạn quan tâm lĩnh vực nào của CNTT?">
					<el-select v-model="form.areaOfInterest" placeholder="Lĩnh vực quan tâm" multiple>
						<el-option v-for="interestOption in interestOptions" :key="interestOption.value" :label="interestOption.label" :value="interestOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Mục tiêu sắp tới của bạn là gì?">
					<el-select v-model="form.shortTermGoals" placeholder="Mục tiêu ngắn hạn" multiple>
						<el-option v-for="shortTermOption in shortTermOptions" :key="shortTermOption.value" :label="shortTermOption.label" :value="shortTermOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Mục tiêu trong tương lai">
					<el-select v-model="form.longTermGoals" placeholder="Mục tiêu dài hạn" multiple>
						<el-option v-for="longTermOption in longTermOptions" :key="longTermOption.value" :label="longTermOption.label" :value="longTermOption.value"></el-option>
					</el-select>
				</el-form-item>
			</el-card>

			<!-- Experience and Skills -->
			<el-card class="mb-3">
				<div slot="header">Kinh nghiệm và kỹ năng</div>
				<el-form-item label="Kinh nghiệm trước đây">
					<el-radio-group v-model="form.priorExperience">
						<el-radio v-for="experienceOption in experienceOptions" :key="experienceOption.value" :label="experienceOption.value">{{ experienceOption.label }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="Kỹ năng đã học">
					<el-select v-model="form.technicalSkills" placeholder="Kỹ năng đã học" multiple>
						<el-option v-for="skillOption in skillOptions" :key="skillOption.value" :label="skillOption.label" :value="skillOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Bạn đã học kỹ năng đó ở đâu">
					<el-select v-model="form.learningPlace" placeholder="Bạn đã học kỹ năng đó ở đâu">
						<el-option v-for="learningPlaceOption in learningPlaceOptions" :value="learningPlaceOption.value" :key="learningPlaceOption.value" :label="learningPlaceOption.label"></el-option>
					</el-select>
				</el-form-item>
			</el-card>

			<!-- Learning Preferences -->
			<!-- <el-card class="mb-3">
				<div slot="header">Learning Preferences</div>
				<el-form-item label="Preferred Learning Method">
					<el-select v-model="form.learningMethod" placeholder="Select">
						<el-option v-for="learningOption in learningOptions" :key="learningOption.value" :label="learningOption.label" :value="learningOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Weekly Time Commitment for Learning">
					<el-select v-model="form.learningTime" placeholder="Select">
						<el-option v-for="timeOption in timeOptions" :key="timeOption.value" :label="timeOption.label" :value="timeOption.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Preference for Formal Education vs. Self-paced Learning">
					<el-radio-group v-model="form.preference">
						<el-radio v-for="preferenceOption in preferenceOptions" :key="preferenceOption.value" :label="preferenceOption.value">{{ preferenceOption.label }}</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-card> -->

			<!-- Challenges and Concerns -->
			<!-- <el-card class="mb-3">
				<div slot="header">Challenges and Concerns</div>
				<el-form-item label="Biggest Challenges in IT Career Pursuit">
					<el-checkbox-group v-model="form.challenges">
						<el-checkbox v-for="challengeOption in challengeOptions" :key="challengeOption.value" :label="challengeOption.label" :value="challengeOption.value">{{ challengeOption.label }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="Concerns About Pursuing an IT Career">
					<el-checkbox-group v-model="form.concerns">
						<el-checkbox v-for="concernOption in concernOptions" :key="concernOption.value" :label="concernOption.label" :value="concernOption.value">{{ concernOption.label }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-card> -->

			<!-- Submit Button -->
			<el-form-item>
				<el-button type="primary" @click="submitForm">Submit</el-button>
			</el-form-item>
		</el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ageGroup: '',
        educationLevel: '',
        employmentStatus: '',
        attraction: [],
        areaOfInterest: [],
        shortTermGoals: [],
        longTermGoals: [],
        priorExperience: '',
        technicalSkills: [],
        trainingCertifications: '',
        learningMethod: '',
        learningTime: '',
        preference: '',
        challenges: [],
        concerns: [],
        additionalComments: '',
				learningPlace: '',
      },
      ageOptions: [
        { label: 'Under 18', value: 'Under 18' },
        { label: '18-24', value: '18-24' },
        { label: '25-34', value: '25-34' },
        { label: '35-44', value: '35-44' },
        { label: '45-54', value: '45-54' },
        { label: '55 and above', value: '55 and above' }
      ],
      educationOptions: [
        { label: 'High School/GED', value: 'High School/GED' },
        { label: "Associate's Degree", value: "Associate's Degree" },
        { label: "Bachelor's Degree", value: "Bachelor's Degree" },
        { label: "Master's Degree", value: "Master's Degree" },
        { label: "Doctoral Degree", value: "Doctoral Degree" },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      employmentOptions: [
        { label: 'Employed full-time', value: 'Employed full-time' },
        { label: 'Employed part-time', value: 'Employed part-time' },
        { label: 'Unemployed', value: 'Unemployed' },
        { label: 'Student', value: 'Student' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      attractionOptions: [
        { label: 'Problem-solving', value: 'Problem-solving' },
        { label: 'Creativity and innovation', value: 'Creativity and innovation' },
        { label: 'Job opportunities', value: 'Job opportunities' },
        { label: 'High earning potential', value: 'High earning potential' },
        { label: 'Interest in technology', value: 'Interest in technology' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      interestOptions: [
        { label: 'Software development', value: 'Software development' },
        { label: 'Network administration', value: 'Network administration' },
        { label: 'Cybersecurity', value: 'Cybersecurity' },
        { label: 'Data science', value: 'Data science' },
        { label: 'IT management', value: 'IT management' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      shortTermOptions: [
        { label: 'Gain foundational knowledge', value: 'Gain foundational knowledge' },
        { label: 'Obtain entry-level certification', value: 'Obtain entry-level certification' },
        { label: 'Develop programming skills', value: 'Develop programming skills' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      longTermOptions: [
        { label: 'Advance to a leadership role', value: 'Advance to a leadership role' },
        { label: 'Specialize in a specific area', value: 'Specialize in a specific area' },
        { label: 'Entrepreneurship in IT', value: 'Entrepreneurship in IT' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      experienceOptions: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
      ],
      skillOptions: [
        { label: 'Programming languages', value: 'Programming languages' },
        { label: 'Database management', value: 'Database management' },
        { label: 'Networking', value: 'Networking' },
        { label: 'Cybersecurity', value: 'Cybersecurity' },
        { label: 'Data analysis', value: 'Data analysis' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      trainingOptions: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
      ],
      learningOptions: [
        { label: 'Online courses', value: 'Online courses' },
        { label: 'In-person classes', value: 'In-person classes' },
        { label: 'Self-study', value: 'Self-study' },
        { label: 'Bootcamps', value: 'Bootcamps' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      timeOptions: [
        { label: 'Less than 5 hours', value: 'Less than 5 hours' },
        { label: '5-10 hours', value: '5-10 hours' },
        { label: '10-20 hours', value: '10-20 hours' },
        { label: 'More than 20 hours', value: 'More than 20 hours' }
      ],
      preferenceOptions: [
        { label: 'Formal education (e.g., degree programs)', value: 'Formal education (e.g., degree programs)' },
        { label: 'Self-paced learning', value: 'Self-paced learning' }
      ],
      challengeOptions: [
        { label: 'Lack of experience', value: 'Lack of experience' },
        { label: 'Lack of relevant skills/knowledge', value: 'Lack of relevant skills/knowledge' },
        { label: 'Difficulty in finding opportunities', value: 'Difficulty in finding opportunities' },
        { label: 'Financial constraints', value: 'Financial constraints' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
      concernOptions: [
        { label: 'Job market saturation', value: 'Job market saturation' },
        { label: 'Rapidly changing technology landscape', value: 'Rapidly changing technology landscape' },
        { label: 'Work-life balance concerns', value: 'Work-life balance concerns' },
        { label: 'Other (please specify)', value: 'Other' }
      ],
			learningPlaceOptions: [
				{ label: 'Elementary School', value: '1' },
				{ label: 'Junior High School', value: '2' },
				{ label: 'High School', value: '3' },
				{ label: 'University - College', value: '4' },
				{ label: 'Learning Center', value: '5' },
				{ label: 'Online Platform', value: '6' },
				{ label: 'Self-study', value: '7' },
				{ label: 'Other', value: '99' },
			]
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
      // Here you can send the form data to your backend for further processing
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
  padding: 1rem;
  margin-bottom: 1rem;
  .roadmap-title {
		text-align: center;
  }
	.roadmap-description {
		text-align: center;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
}
</style>
