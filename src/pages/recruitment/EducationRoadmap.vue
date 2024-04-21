<template>
	<div>
		<div class="px-4 py-4">
			<h2>Lộ trình học - {{ companyName || 'Tên công ty' }} - {{ jobTitle || 'Vị trí công việc' }}</h2>
            <h4>Tags kỹ năng: <el-button type="primary">Xem yêu cầu gốc</el-button></h4>
            <div>
                <el-button :type="tag.isMatched ? 'success' : 'info'" v-for="tag in tags" :key="tag._id" class="my-2 skill-tag-btn">
                    {{ tag.skill }} - {{ tag.level }}
                </el-button>
            </div>
			<h4>Danh sách khóa học:</h4>
			<div class="table-container">
				<el-table
					class="table"
					border
					:data="tableData"
                    empty-text="Không có dữ liệu"
					style="width: 100%">
                    <el-table-column
                        width="50"
						label="No.">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Tiêu đề">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Kỹ năng">
						<template slot-scope="scope">
                            <div v-for="(tag, index) in scope.row.skill_tags" :key="index">
                                <span>{{ tag.skill.name }} - {{ tag.level }}</span>
                            </div>
						</template>
					</el-table-column>
                    <el-table-column
						label="Số lượng module">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.modules.length }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Thời gian hoàn thành dự kiến">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.estimated_time }} tiếng</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Chi phí">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.point_cost || 100 }} point</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="$router.push({ name: 'EducationCourse',  params: { jobEducationId: $route.params.jobEducationId, courseId: scope.row.id || scope.row._id } })">Xem chi tiết</el-button>
							<el-button
								size="mini"
								type="primary"
								@click="removeCourseFromRoadmap(scope.row.id || scope.row._id)">Xóa</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- <el-pagination
					background
					layout="prev, pager, next"
					:total="1000">
				</el-pagination> -->
			</div>
            <div class="action-buttons">
                <el-button type="primary" @click="dialogVisible = true">Thêm khóa học có sẵn</el-button>
                <el-button type="success">Tạo khóa học mới</el-button>
            </div>
		</div>
		<el-dialog title="Danh sách khóa học" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
            <div style="padding: 16px">
                <el-select style="margin-right: 20px" v-model="skillId" placeholder="Select Skill" @change="getCourseData">
                    <el-option v-for="skill in subjectList" :key="skill.id" :label="skill.name" :value="skill.id"> </el-option>
                </el-select>
                <el-select v-model="level" placeholder="Select Level" @change="getCourseData">
                    <el-option v-for="level in levels" :key="level" :label="level" :value="level"> </el-option>
                </el-select>
                <el-table :data="courseList" stripe style="width: 100%;">
                    <!-- <el-table-column width="50px">
						<template>
                            <div>
                                <el-checkbox></el-checkbox>
                            </div>
						</template>
					</el-table-column> -->
                    <el-table-column
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column prop="title" label="Title"></el-table-column>
                    <el-table-column prop="numModules" label="Number of Modules"></el-table-column>
                    <el-table-column prop="point_cost" label="Point Cost"></el-table-column>
                    <el-table-column prop="estimated_time" label="Estimated Time"></el-table-column>
                    <el-table-column>
						<template slot-scope="scope">
                            <div>
                                <el-button @click="addExistingEducationCourse(scope.row.id)" :type="courseAdded(scope.row.id) ? '' : 'primary'">
                                    {{ courseAdded(scope.row.id) ? 'Đã thêm' : 'Thêm khóa học' }}
                                </el-button>
                            </div>
						</template>
					</el-table-column>
                </el-table>
                <el-pagination
                    style="margin: 8px 0"
					background
					layout="prev, pager, next"
					@current-change="getCourseData"
					:current-page.sync="coursePage"
					:page-size="10"
					:total="courseTotalResults">
				</el-pagination>
            </div>
        </el-dialog>
	</div>	
</template>
<script>
import jobEducationStatus from '@/constants/jobEducationStatus'
import { RoadMapService, CourseService, SubjectService } from '@/services'

export default {
	data() {
		return {
			tableData: [{
                name: 'Javascript for Beginner',
                tags: [{
                    skill: {
                        name: 'Javascript',
                        id: '123123123',
                    },
                    level: 'Beginner'
                }],
                module_count: 5,
                estimated_time: 20,
                point_cost: 100,
                thumbnail: 'abcxyz.jgp'
            }],
            tags: [],
			dialogVisible: false,
			certificateModel: {
                name: '',
                link: '',
            },
            jobEducationStatus,
            subjectList: [],
            courseList: [],
            skillId: '',
            level: '',
            levels: ['Beginner', 'Intermediate', 'Advanced'],
            coursePage: 1,
            courseTotalPages: 1,
            courseTotalResults: 1,
            addedCourseIds: [],
		}
	},
	created() {
        this.getEducationRequests()
        this.getSubjectData()
        this.getCourseData()
    },
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
        async getEducationRequests() {
            const { data } = await RoadMapService.getEducationRoadmap(this.$route.params.jobEducationId)
            this.tableData = [...data.courses]
            this.addedCourseIds = this.tableData.map((item) => item.id || item._id);
            this.companyName = data.company.company_name
            this.jobTitle = data.job.title
            this.tags = [...data.convertedRequirements]
            this.checkSkillMatched()
        },
        async getSubjectData() {
            const { data } = await SubjectService.getAllSubject();
            this.subjectList = [...data]
        },
        async getCourseData() {
            const body = {}
            if (this.skillId && this.skillId.length) {
                body.skillId = this.skillId
            }
            if (this.level && this.level.length) {
                body.level = this.level
            }
            const { data } = await CourseService.findCourses(body, this.coursePage);
            this.courseList = data.results
            this.coursePage = data.page
            this.courseTotalPages = data.totalPages
            this.courseTotalResults = data.totalResults
        },
        async addExistingEducationCourse(courseId) {
            if (!this.courseAdded(courseId)) {
                const { data } = await RoadMapService.addExistingEducationCourse(this.$route.params.jobEducationId, courseId);
                if (data) {
                    this.$notify({
                        title: 'Success',
                        message: 'Đã thêm khóa học'
                    });
                    await this.getEducationRequests()
                }
            }
        },
        async removeCourseFromRoadmap(courseId) {
            if (this.courseAdded(courseId)) {
                const { data } = await RoadMapService.removeCourseFromRoadmap(this.$route.params.jobEducationId, courseId);
                if (data) {
                    this.$notify({
                        title: 'Success',
                        message: 'Đã xóa khóa học'
                    });
                    await this.getEducationRequests()
                }
            }
        },
        courseAdded(courseId) {
            return this.addedCourseIds.includes(courseId);
        },
        checkSkillMatched() {
            this.tags.forEach((tag) => {
                let isChecked = false;
                this.tableData.forEach((course) => {
                    if (!isChecked) {
                        if(course.skill_tags.find((item) => this.skillLevelCompare(tag.level, item.level) && item.skill._id === tag._id)) {
                            tag.isMatched = true;
                            isChecked = true
                        }
                    }
                })
            })
        },
        skillLevelCompare(requirementLevel, profileLevel) {
            if (requirementLevel == 'Advanced') {
                if (profileLevel == 'Advanced') return 1;
                if (profileLevel == 'Intermediate') return 0;
                if (profileLevel == 'Beginner') return 0;
            }
            if (requirementLevel == 'Intermediate') {
                if (profileLevel == 'Advanced') return 1;
                if (profileLevel == 'Intermediate') return 1;
                if (profileLevel == 'Beginner') return 0;
            }
            if (requirementLevel == 'Beginner') {
                if (profileLevel == 'Advanced') return 0;
                if (profileLevel == 'Intermediate') return 0;
                if (profileLevel == 'Beginner') return 1;
            }
        }

	}
}
</script>
<style scoped lang="scss">
.table-container {
	
}
.table {
	margin-bottom: 20px;
}
.el-pagination {
	float: right;
}
.skill-tag-btn:first-of-type {
    margin-left: 10px;
}
</style>
<style lang="scss">
.cell {
    word-break: keep-all !important;
}
</style>