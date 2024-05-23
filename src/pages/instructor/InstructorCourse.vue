<template>
	<div>
		<div class="px-4 py-4">
			<div class="d-flex justify-content-between">
                <h2>{{ this.courseInfo.title || 'Tên khóa học' }}</h2>
                <!-- <el-button @click="secondDialog = true">Sửa thông tin</el-button> -->
            </div>
            <h4>Chi phí: {{ this.courseInfo.point_cost }} point</h4>
            <h4>Mô tả: </h4>
            <div style="margin-left: 20px; margin-bottom: 20px; font-size: 20px">{{ this.courseInfo.description }}</div>
            <h4>Tags kĩ năng: </h4>
            <div style="margin-left: 20px; margin-bottom: 20px; font-size: 20px">
                <el-button type="primary" v-for="tag in this.courseInfo.skill_tags" :key="tag._id" class="my-2 skill-tag-btn">
                    {{ tag.skill.name }} - {{ tag.level }}
                </el-button>
            </div>
            <h4>Yêu cầu khóa học: </h4>
            <div style="margin-left: 20px; margin-bottom: 20px; font-size: 20px">{{ this.instructorCourseInfo.requirement }}</div>
			<h4>Nội dung khóa học:</h4>
            <el-tabs v-model="activeName">
                <el-tab-pane label="Danh sách module" name="ModuleList">
                    <div class="table-container">
                        <el-table
                            class="table"
                            border
                            :data="tableData"
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
                                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="Mô tả">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.description }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="Độ dài video">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.video_duration }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="200"
                                label="">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="$router.push({ name: 'EducationModuleDetail', params: { ...$route.params, moduleId: scope.row.id || scope.row._id } })">Xem chi tiết</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="removeEducationModuleFromCourse(scope.row.id || scope.row._id)">Xóa</el-button>
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
                        <el-button type="success" @click="$router.push({ name: 'InstructorCreateModule', params: { ...$route.params, courseId: courseInfo._id || courseInfo.id } })">Thêm module</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Danh sách bài test" name="TestList">
                    <div class="table-container">
                        <el-table
                            class="table"
                            border
                            :data="testData"
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
                                label="Tên bài test">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="Thời gian làm bài">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="Ghi chú">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.note }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="Số câu hỏi">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.questions ? scope.row.questions.length : '0' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="200"
                                label="">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="$router.push({ name: 'InstructorExamDetail', params: { ...$route.params, courseId: courseInfo.id, testId: scope.row.id || scope.row._id } })">Chỉnh sửa</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="deleteTest(scope.row.id)">Xóa</el-button>
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
                        <el-button type="success" @click="testDialogVisible = true">Thêm bài test</el-button>
                    </div>
                    <el-dialog title="Tạo bài test mới" :visible.sync="testDialogVisible">
                        <el-form :model="testForm" :rules="testRules" ref="testForm" label-width="200px">
                            <el-form-item label="Tên bài test">
                                <el-input v-model="testForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Thời gian làm bài (phút)">
                                <el-input-number v-model="testForm.time" :min="1"></el-input-number>
                            </el-form-item>
                            <el-form-item label="Mô tả">
                                <el-input type="textarea" v-model="testForm.note"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="testDialogVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="saveTest">Save</el-button>
                        </div>
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>
		</div>
	</div>	
</template>
<script>
import jobEducationStatus from '@/constants/jobEducationStatus'
import { RoadMapService } from '@/services'

export default {
	data() {
		return {
			tableData: [{
                name: 'Javascript Variables',
                video_duration: 5,
                description: 'This is javascript variables',
            }],
            testData: [],
			dialogVisible: false,
			certificateModel: {
                name: '',
                link: '',
            },
            jobEducationStatus,
            courseInfo: {},
            secondDialog: false,
            instructorCourseInfo: {},
            activeName: 'ModuleList',
            testDialogVisible: false,
            testForm: {},
            testRules: {
                name: [
                    { required: true, message: 'Test name is required', trigger: 'blur' },
                    { min: 3, message: 'Test name must be at least 3 characters', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: 'Test time is required', trigger: 'blur' },
                    { type: 'number', min: 1, message: 'Test time must be at least 1 minute', trigger: 'blur' }
                ],
                note: [
                    { required: true, message: 'Test note is required', trigger: 'blur' },
                    { min: 10, message: 'Test note must be at least 10 characters', trigger: 'blur' }
                ]
            },
		}
	},
    created() {
        this.getInstructorCourseById()
    },
    watch: {
        testDialogVisible(value) {
            if (!value) {
                this.testForm = {}
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
		async getInstructorCourseById() {
				const { data } = await RoadMapService.getInstructorCourseById(this.$route.params.instructorCourseId);
				if (data) {
                    this.instructorCourseInfo = data;
                    this.courseInfo = data.course;
                    this.tableData = this.courseInfo.modules
                    this.testData = this.courseInfo.tests
				}
		},
        async saveTest() {
            this.$refs.testForm.validate(async (valid) => {
                if (valid) {
                    try {
                        const { data } = await RoadMapService.createNewTestToCourse(this.courseInfo.id, this.testForm);
                        if (data) {
                            this.testDialogVisible = false
                            this.$notify({
                                title: 'Success',
                                message: 'Đã tạo bài test!'
                            });
                            this.$router.push({name: 'InstructorExamDetail', params: { ...this.$route.params, testId: data }})
                        }
                    } catch (e) {
                        this.$notify({
                            title: 'Error',
                            message: 'Something wrong!'
                        });
                    }
                }
            })
        },
        async deleteTest(testId) {
            try {
                const { data } = await RoadMapService.deleteTestById(testId);
                if (data) {
                    this.$notify({
                        title: 'Success',
                        message: 'Đã xóa bài test!'
                    });
                }
            } catch (e) {
                this.$notify({
                    title: 'Error',
                    message: 'Something wrong!'
                });
            }
        }
		// async removeEducationModuleFromCourse(moduleId) {
		// 	const { data } = await RoadMapService.removeEducationModuleFromCourse(this.$route.params.jobEducationId, this.$route.params.courseId, moduleId);
		// 	if (data) {
		// 		this.$notify({
        //   title: 'Success',
        //   message: 'Đã xóa module khỏi khóa học'
        // });
		// 		this.getCourseDetail();
		// 	}
		// },
        // async updateCourse() {
		// 	// Validate the form
		// 	this.$refs.courseForm.validate(async (valid) => {
		// 		if (valid) {
		// 			try {
		// 				const formData = new FormData();
		// 				formData.append('title', this.courseInfo.title);
		// 				formData.append('description', this.courseInfo.description);
		// 				formData.append('estimated_time', this.courseInfo.estimated_time);
		// 				formData.append('point_cost', this.courseInfo.point_cost);
		// 				formData.append('thumbnail', 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg');
		// 				formData.append(`tags`, JSON.stringify(this.courseInfo.skill_tags.map((item) => {
        //                     return {
        //                         skill: item.skill.id || item.skill._id,
        //                         level: item.level
        //                     }
        //                 })));

		// 				const response = await CourseService.updateCourse(this.$route.params.courseId, formData)
		// 				if (response.status === 200) {
		// 					this.secondDialog = false;
		// 					this.$notify({
		// 						title: 'Success',
		// 						message: 'Đã cập nhật khóa học'
		// 					});
		// 					await this.getCourseDetail()
		// 				}
		// 			} catch (e) {
        //                 console.log(e)
		// 				this.$notify({
		// 					title: 'Error',
		// 					message: e.statusText
		// 				});
		// 			}
		// 			// this.resetForm()
		// 		} else {
		// 			console.log('Form validation failed.');
		// 			return false;
		// 		}
		// 	});
		// },
	},
	
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

</style>
<style lang="scss">
.cell {
    word-break: keep-all !important;
}
</style>