<template>
	<div>
		<div class="px-4 py-4">
			<h2>Lộ trình học - {{ companyName || 'Tên công ty' }} - {{ jobTitle || 'Vị trí công việc' }}</h2>
            <h4>Tags kỹ năng: <el-button type="primary">Xem yêu cầu gốc</el-button></h4>
            <div>
				<el-dropdown v-for="tag in tags" :key="tag._id" style="margin-left: 0; margin-right: 10px">
					<el-button :type="tag.isMatched ? 'success' : 'info'" class="my-2">
						{{ tag.skill }} - {{ tag.level }}
					</el-button>
					<el-dropdown-menu v-if="!tag.isMatched" slot="dropdown">
						<el-dropdown-item>
							<div @click="openCreateModalBySkill(tag)">Tạo mới khóa học</div>
						</el-dropdown-item>
						<el-dropdown-item>
							<div @click="openExistingModalBySkill(tag)">Thêm khóa học có sẵn</div>
						</el-dropdown-item>
					</el-dropdown-menu>
					<el-dropdown-menu v-else slot="dropdown">
						<el-dropdown-item>
							<div @click="redirectToCourse(tag)">Xem chi tiết khóa học</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
            </div>
			<h4>Danh sách khóa học:</h4>
			<el-tabs v-model="tableTab">
				<el-tab-pane label="Khóa học đã hoàn thành" name="completedCourses">
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
									<span style="margin-left: 10px">{{ scope.row.modules ? scope.row.modules.length : 0 }}</span>
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
				</el-tab-pane>
				<el-tab-pane label="Tất cả khóa học" name="instructorCourses">
					<div class="table-container">
						<el-table
							class="table"
							border
							:data="instructorData"
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
								label="Instructor phụ trách">
								<template slot-scope="scope">
									<span style="margin-left: 10px">{{ scope.row.instructorCourse ? scope.row.instructorCourse.instructor.instructor_name : 'Some instructor' }}</span>
								</template>
							</el-table-column>
							<el-table-column
								label="Thời gian hoàn thành yêu cầu">
								<template slot-scope="scope">
									<span style="margin-left: 10px">{{ scope.row.instructorCourse ? scope.row.instructorCourse.deadline : '' }}</span>
								</template>
							</el-table-column>
							<el-table-column
								label="Trạng thái">
								<template slot-scope="scope">
									<span style="margin-left: 10px">{{ scope.row.instructorCourse ? scope.row.instructorCourse.status : 'Đã duyệt' }}</span>
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
				</el-tab-pane>
			</el-tabs>
            <div class="action-buttons">
                <el-button type="primary" @click="dialogVisible = true">Thêm khóa học có sẵn</el-button>
                <el-button type="success" @click="openCreateCourseDialog()">Tạo khóa học mới</el-button>
            </div>
		</div>
		<el-dialog title="Danh sách khóa học" :visible.sync="dialogVisible" width="80%">
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
		<el-dialog title="Tạo khóa học mới" :visible.sync="secondDialog" width="80%">
			<div class="form-container">
				<el-form ref="courseForm" :model="course" label-width="300px">
					<el-form-item label="Tiêu đề khóa học" class="form-item" prop="title">
						<el-input v-model="course.title" placeholder="Nhập tiêu đề khóa học"></el-input>
					</el-form-item>
					<el-form-item label="Mô tả khóa học" class="form-item" prop="description">
						<el-input type="textarea" v-model="course.description" placeholder="Nhập mô tả"></el-input>
					</el-form-item>
					<el-form-item label="Thời gian hoàn thành dự kiến (tiếng)" class="form-item" prop="estimated_time">
						<el-input type="number" v-model="course.estimated_time"></el-input>
					</el-form-item>
					<el-form-item label="Point" class="form-item" prop="point_cost">
						<el-input type="number" v-model="course.point_cost"></el-input>
					</el-form-item>
					<!-- <el-form-item label="Thumbnail Image" class="form-item" prop="thumbnail">
						<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :before-upload="beforeUpload" :auto-upload="false" :file-list="fileList" :on-remove="handleRemove" :limit="1" list-type="picture">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
						</el-upload>
						<div v-if="course.thumbnail" class="thumbnail-preview">
							<img :src="course.thumbnail" alt="Thumbnail Preview" />
						</div>
					</el-form-item> -->
					<el-form-item label="Môn học" class="form-item" prop="tags">
						<div v-for="(tag, index) in course.tags" :key="index" class="tag-level-group">
							<el-select v-model="tag.skill" placeholder="Select tag" class="tag-select">
								<el-option v-for="tagItem in subjectList" :key="tagItem.id" :label="tagItem.name" :value="tagItem.id"></el-option>
							</el-select>
							<el-select v-model="tag.level" placeholder="Select level" class="level-select">
								<el-option v-for="level in levels" :key="level + Date.now()" :label="level" :value="level"></el-option>
							</el-select>
							<el-button type="danger" icon="el-icon-close" @click="removeTag(index)" class="remove-tag-btn"></el-button>
						</div>
						<el-button type="primary" icon="el-icon-plus" @click="addTag" class="add-tag-btn">Thêm tag</el-button>
					</el-form-item>
					<el-form-item label="Instructor" class="form-item" prop="instructor">
						<el-select style="margin-right: 20px" v-model="course.instructor" placeholder="Chọn instructor">
							<el-option v-for="instructor in instructorList" :key="instructor.id" :label="instructor.user.name" :value="instructor.id"> </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="Deadline" class="form-item" prop="deadline">
						<el-date-picker
							v-model="course.deadline"
							type="date"
							placeholder="Chọn ngày yêu cầu hoàn thành">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="Yêu cầu khóa học" class="form-item" prop="requirement">
						<el-input
							type="textarea"
							:rows="4"
							placeholder="Nhập yêu cầu khóa học"
							v-model="course.requirement">
						</el-input>
					</el-form-item>
					<el-form-item class="form-item">
						<el-button type="primary" class="submit-btn" @click="submitForm">Tạo khóa học</el-button>
					</el-form-item>
				</el-form>
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
			companyName: '',
			jobTitle: '',
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
			course: {
				title: '',
				description: '',
				thumbnail: 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg',
				tags: [],
				estimated_time: 0,
				point_cost: 0,
				instructor: '',
				deadline: '',
				requirement: ''
			},
			fileList: [],
            tags: [],
			dialogVisible: false,
			secondDialog: false,
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
			instructorList: [],
			instructorData: [],
			tableTab: 'completedCourses'
		}
	},
	computed: {
		availableTags() {
			return this.allTags.filter(tag => !this.course.tags.some(t => t.skill === tag.id));
		}
	},
	created() {
        this.getEducationRequests()
        this.getSubjectData()
        this.getCourseData()
		this.getListInstructor()
    },
	watch: {
		secondDialog(val) {
			if (!val) {
				this.course = {
					title: '',
					description: '',
					thumbnail: 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg',
					tags: [],
					estimated_time: 0,
					point_cost: 0,
					instructor: '',
					deadline: '',
					requirement: ''
				}
			}
		}
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		openCreateModalBySkill(tag) {
			this.course.tags.push({
				skill: tag._id,
				level: tag.level,
			})
			this.secondDialog = true;
		},
		openExistingModalBySkill(tag) {
			this.skillId = tag._id
			this.level = tag.level
			this.dialogVisible = true;
			this.getCourseData()
		},
		async getListInstructor() {
			const { data } = await RoadMapService.getListInstructor({});
			if (data) {
				this.instructorList = [...data.results]
			}	
		},
        async getEducationRequests() {
            const { data } = await RoadMapService.getEducationRoadmap(this.$route.params.jobEducationId)
            this.tableData = [...data.allCourses].filter((item) => {
				if (!item.instructorCourse) {
					return item;
				} else {
					if (item.instructorCourse.is_done) {
						return item;
					}
				}
			})
			this.instructorData = [...data.allCourses]
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
		openCreateCourseDialog() {
			this.secondDialog = true;
			this.course = {
				title: '',
				description: '',
				thumbnail: 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg',
				tags: [],
				estimated_time: 0,
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
                        if(course.skill_tags.find((item) => this.skillLevelCompare(tag.level, item.level) && (item.skill._id === tag._id || item.skill.id === tag._id || item.skill.id === tag.id))) {
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
        },
		beforeUpload(file) {
			// Clear previous thumbnails
			this.course.thumbnail = null;

			// Validate file type
			const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJPGorPNG) {
				this.$message.error('Only JPG or PNG files are allowed');
				return false;
			}

			// Set thumbnail in the course object
			this.course.thumbnail = 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg';

			return true; // Continue with the upload
		},
		redirectToCourse(tag) {
			console.log(tag)
		},
		handleRemove() {
			// Clear thumbnail when removed
			this.course.thumbnail = null;
		},
		addTag() {
			this.course.tags.push({ skill: '', level: '' });
		},
		removeTag(index) {
			this.course.tags.splice(index, 1);
		},
		async submitForm() {
			// Validate the form
			this.$refs.courseForm.validate(async (valid) => {
				if (valid) {
					try {
						const formData = new FormData();
						formData.append('title', this.course.title);
						formData.append('description', this.course.description);
						formData.append('estimated_time', this.course.estimated_time);
						formData.append('point_cost', this.course.point_cost);
						formData.append('instructor', this.course.instructor);
						formData.append('deadline', this.course.deadline);
						formData.append('requirement', this.course.requirement);
						formData.append('thumbnail', 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg');
						formData.append(`tags`, JSON.stringify(this.course.tags));

						const response = await RoadMapService.createInstructorCourse(this.$route.params.jobEducationId, formData)
						if (response.status === 200) {
							this.secondDialog = false;
							this.$notify({
								title: 'Success',
								message: 'Đã thêm khóa học'
							});
							await this.getEducationRequests()
						}
					} catch (e) {
						this.$notify({
							title: 'Error',
							message: e.statusText
						});
					}
					// this.resetForm()
				} else {
					console.log('Form validation failed.');
					return false;
				}
			});
		},
		resetForm() {
			// Reset form fields
			this.course.title = '';
			this.course.description = '';
			this.course.thumbnail = '';
			this.course.tags = [];
			this.tagInput = '';
			// Reset form validation
			this.$refs.courseForm.resetFields();
			// Clear uploaded file list
			this.fileList = [];
		}
	}
}
</script>
<style scoped lang="scss">
.table {
	margin-bottom: 20px;
}
.el-pagination {
	float: right;
}
.skill-tag-btn:first-of-type {
    margin-left: 10px;
}
.form-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.tag-level-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.tag-select, .level-select {
  flex: 1;
  margin-right: 10px;
}

.add-tag-btn {
  margin-top: 10px;
}

.remove-tag-btn {
  margin-left: 10px;
}

.thumbnail-preview {
  margin-top: 10px;
}

.thumbnail-preview img {
  max-width: 100%;
  max-height: 200px;
}
</style>
<style lang="scss">
.cell {
    word-break: keep-all !important;
}
</style>