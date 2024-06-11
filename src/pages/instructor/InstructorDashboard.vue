<template>
	<div>
		<div class="px-4 py-4">
			<h2 class="mb-4">Instructor - Le Duc Thai</h2>
			<div>
				<el-tabs v-model="activeName" @tab-click="getTabData">
					<el-tab-pane label="Khóa học đang thực hiện" name="InProgressCourses">
						<div class="table-container">
							<el-table
								class="table"
								border
								:data="inProgressCourses"
								empty-text="Không có dữ liệu"
								style="width: 100%">
									<el-table-column
									width="50"
									label="No.">
									<template slot-scope="scope">
										<span>{{ scope.$index + 1 }}</span>
									</template>
								</el-table-column>
								<el-table-column
									width="200"
									label="Tên khóa học">
									<template slot-scope="scope">
										<span>{{ scope.row.course ? scope.row.course.title : 'Course name' }}</span>
									</template>
								</el-table-column>
								<el-table-column
									width="200"
									label="Mục tiêu kỹ năng">
									<template slot-scope="scope">
										<div v-for="(tag, index) in scope.row.course.skill_tags" :key="index">
                                            <span>{{ tag.skill.name }} - {{ tag.level }}</span>
                                        </div>
									</template>
								</el-table-column>
								<el-table-column
									label="Thời gian học ước tính">
									<template slot-scope="scope">
										<div>{{ scope.row.course ? scope.row.course.estimated_time : null }} tiếng</div>
									</template>
								</el-table-column>
                                <el-table-column
									label="Số module">
									<template slot-scope="scope">
										<div>{{ scope.row.course ? (scope.row.course.modules.length + (scope.row.course.modules.length === 1 ? ' module' : ' modules')) : null }}</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Deadline">
									<template slot-scope="scope">
										<div>{{ scope.row.deadline.split('T')[0] }}</div>
									</template>
								</el-table-column>
								<el-table-column
									width="350"
									label="">
									<template slot-scope="scope">
										<el-button type="primary" @click="signAsComplete(scope.row._id || scope.row.id)" :disabled="scope.row.course.modules.length === 0">Đánh dấu hoàn thành</el-button>
										<el-button @click="$router.push({ name: 'InstructorCourse', params: { instructorCourseId: scope.row._id || scope.row.id } })">Chi tiết</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane label="Khóa học đã hoàn thành" name="CompletedCourses">
						<div class="table-container">
							<el-table
								class="table"
								border
								:data="completedCourses"
								empty-text="Không có dữ liệu"
								style="width: 100%">
									<el-table-column
									width="50"
									label="No.">
									<template slot-scope="scope">
										<span>{{ scope.$index + 1 }}</span>
									</template>
								</el-table-column>
								<el-table-column
									width="200"
									label="Tên khóa học">
									<template slot-scope="scope">
										<span>{{ scope.row.course ? scope.row.course.title : 'Course name' }}</span>
									</template>
								</el-table-column>
								<el-table-column
									width="200"
									label="Mục tiêu kỹ năng">
									<template slot-scope="scope">
										<div v-for="(tag, index) in scope.row.course.skill_tags" :key="index">
                                            <span>{{ tag.skill.name }} - {{ tag.level }}</span>
                                        </div>
									</template>
								</el-table-column>
								<el-table-column
									label="Thời gian ước tính">
									<template slot-scope="scope">
										<div>{{ scope.row.course ? scope.row.course.estimated_time : null }} tiếng</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Deadline">
									<template slot-scope="scope">
										<div>{{ scope.row.deadline.split('T')[0] }}</div>
									</template>
								</el-table-column>
                                <el-table-column
									label="Trạng thái">
									<template slot-scope="scope">
										<div>{{ instructorCourseStatus[scope.row.status] }}</div>
									</template>
								</el-table-column>
								<el-table-column
									width="350"
									label="">
									<template slot-scope="scope">
										<el-button v-if="scope.row.status === 1" type="warning" @click="goToFixInstructorCourse(scope.row._id || scope.row.id)">Sửa khóa học</el-button>
										<el-button @click="$router.push({ name: 'InstructorCourse', params: { instructorCourseId: scope.row._id || scope.row.id } })">Xem chi tiết</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane label="Khóa học mới" name="NewCourses">
						<div class="table-container">
							<el-table
								class="table"
								border
								:data="newCourses"
								empty-text="Không có dữ liệu"
								style="width: 100%">
									<el-table-column
									width="50"
									label="No.">
									<template slot-scope="scope">
										<span>{{ scope.$index + 1 }}</span>
									</template>
								</el-table-column>
								<el-table-column
									width="200"
									label="Tên khóa học">
									<template slot-scope="scope">
										<span>{{ scope.row.course ? scope.row.course.title : 'Course name' }}</span>
									</template>
								</el-table-column>
								<el-table-column
									width="200"
									label="Mục tiêu kỹ năng">
									<template slot-scope="scope">
										<div v-for="(tag, index) in scope.row.course.skill_tags" :key="index">
                                            <span>{{ tag.skill.name }} - {{ tag.level }}</span>
                                        </div>
									</template>
								</el-table-column>
								<el-table-column
									label="Thời gian học ước tính">
									<template slot-scope="scope">
										<div>{{ scope.row.course ? scope.row.course.estimated_time : null }} tiếng</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Deadline">
									<template slot-scope="scope">
										<div>{{ scope.row.deadline.split('T')[0] }}</div>
									</template>
								</el-table-column>
                                <el-table-column
									label="Được giao ngày">
									<template slot-scope="scope">
										<div>{{ scope.row.createdAt.split('T')[0] }}</div>
									</template>
								</el-table-column>
								<el-table-column
									width="250"
									label="">
									<template slot-scope="scope">
										<el-button @click="$router.push({ name: 'InstructorCourse', params: { instructorCourseId: scope.row._id || scope.row.id } })">Xem chi tiết</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<!-- <el-dialog
                :visible.sync="deleteDialog"
                width="450px"
                title="Xóa ca làm"
            >
				<span></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="secondary" @click="deleteDialog = false">Hủy bỏ</el-button>
					<el-button type="danger" @click="removeShift">Xóa</el-button>
				</span>
			</el-dialog> -->
		</div>
	</div>
</template>
<script>
import { RoadMapService } from '@/services'
import instructorCourseStatus from '@/constants/instructorCourseStatus'

export default {
	data() {
		return {
			instructorName: '',
            activeName: 'InProgressCourses',
            inProgressCourses: [],
            completedCourses: [],
            newCourses: [],
			instructorCourseStatus,
		}
	},
	
	created() {
		this.getInprogressCourses();
	},
	methods: {
		getTabData(tab, event) {
			console.log(event)
			if (tab.name === 'InProgressCourses') {
				this.getInprogressCourses()
			} else if (tab.name === 'CompletedCourses') {
				this.getCompletedCourses()
			} else if (tab.name === 'NewCourses') {
				this.getNewCourses()
			}
		},
        async getInprogressCourses() {
            try {
                const { data } = await RoadMapService.getListInstructorCourse({
                    is_read: true,
                    status: 0,
                    is_done: false,
                })
                if (data) {
                    this.inProgressCourses = [...data.results];
                }
            } catch (e) {
                this.$notify({
                  title: 'Error',
                  message: 'Something wrong'
                });
            }
        },
        async getCompletedCourses() {
            try {
                const { data } = await RoadMapService.getListInstructorCourse({
                    is_read: true,
                    is_done: true,
                })
                if (data) {
                    this.completedCourses = [...data.results];
                }
            } catch (e) {
                this.$notify({
                  title: 'Error',
                  message: 'Something wrong'
                });
            }
            
        },
        async getNewCourses() {
            try {
                 const { data } = await RoadMapService.getListInstructorCourse({
                    is_read: false,
                })
                if (data) {
                    this.newCourses = [...data.results];
                }
            } catch (e) {
                this.$notify({
                  title: 'Error',
                  message: 'Something wrong'
                });
            }
        },
        async signAsComplete(instructorCourseId) {
            try {
                 const { data } = await RoadMapService.signAsComplete(instructorCourseId)
                if (data) {
                    this.getInprogressCourses();
                    this.$notify({
                        title: 'Success',
                        message: 'Đã hoàn thành khóa học, đang đợi review'
                    });
                }
            } catch (e) {
                this.$notify({
                  title: 'Error',
                  message: 'Something wrong'
                });
            }
        },
        async goToFixInstructorCourse(instructorCourseId) {
            try {
                 const { data } = await RoadMapService.goToFix(instructorCourseId)
                if (data) {
                    this.$router.push({ name: 'InstructorCourse', params: { instructorCourseId: instructorCourseId } })
                }
            } catch (e) {
                this.$notify({
                  title: 'Error',
                  message: 'Something wrong'
                });
            }
        }
	},
}
</script>
<style lang="scss" scoped>
.shift-register {
	width: 50%;
}
</style>