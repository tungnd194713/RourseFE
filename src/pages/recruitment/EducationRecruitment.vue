<template>
	<div>
		<div class="px-4 py-4">
			<h2>Danh sách tin tuyển dụng đăng ký đào tạo</h2>
			<h4 style="color: gray">Chỗ này để search và filter:</h4>
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
							<span>{{ scope.$index + 1 }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Tuyển dụng">
						<template slot-scope="scope">
							<span>{{ scope.row.job.title }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Nhà tuyển dụng">
						<template slot-scope="scope">
                            <span>{{ scope.row.company.company_name }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Thời gian đào tạo tối đa">
						<template slot-scope="scope">
                            <span>{{ scope.row.max_education_month }} tháng</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Học bổng">
						<template slot-scope="scope">
                            <span>{{ scope.row.scholarship }}%</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Số lượng khóa học">
						<template slot-scope="scope">
                            <span>{{ scope.row.courses.length || 0 }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Yêu cầu">
						<template slot-scope="scope">
                            <el-button style="width: 100%" type="primary" @click="showRequirement(scope.row.requirements, scope.row.custom_requirement)">Xem</el-button>
						</template>
					</el-table-column>
                    <el-table-column
						label="Trạng thái">
						<template slot-scope="scope">
                            <div :class="{ 'change-request-text': scope.row.status === 4 }" @click="openChangeRequestDialog(scope.row)">{{ jobEducationStatus[scope.row.status - 1] }}</div>
						</template>
					</el-table-column>
					<el-table-column
                        width="250"
						label="">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="$router.push({ name: 'EducationRoadmap', params: { jobEducationId: scope.row._id } })">Xem chi tiết</el-button>
							<el-button
                                v-if="scope.row.status === 1 || scope.row.status === 4"
								size="mini"
								type="primary"
								@click="checkRoadmap(scope.row._id || scope.row.id)">Gửi</el-button>
                            <el-button
                                v-if="scope.row.status === 2"
								size="mini"
								type="primary"
								@click="unsendRoadmap(scope.row._id || scope.row.id)">Hoàn tác</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					background
					layout="prev, pager, next"
					:total="1000">
				</el-pagination>
			</div>
		</div>
        <el-dialog
					title="Yêu cầu công việc"
					:visible.sync="dialogVisible"
					width="30%"
					:before-close="handleClose"
					class="custom-dialog"
				>
					<div class="dialog-content">
						<ul v-if="requirement.majorColleges.length" class="requirement-list">
							<li v-for="(major, index) in requirement.majorColleges" :key="index">
								Tốt nghiệp đại học
								<span v-if="major.colleges.length">
									<span v-for="(college, cindex) in major.colleges" :key="cindex">
										{{ college.name }}
										<span v-if="cindex !== major.colleges.length - 1" class="fw-bold">hoặc</span>
									</span>
								</span>
								chuyên ngành
								<span v-for="(iitem, iindex) in major.majors" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== major.majors.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.beginnerSkills.length" class="requirement-list">
							<li v-for="(skill, index) in requirement.beginnerSkills" :key="index">
								Đã có kinh nghiệm
								<span v-for="(iitem, iindex) in skill" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== skill.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.intermediateSkills.length" class="requirement-list">
							<li v-for="(skill, index) in requirement.intermediateSkills" :key="index">
								Hiểu rõ về
								<span v-for="(iitem, iindex) in skill" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== skill.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.advancedSkills.length" class="requirement-list">
							<li v-for="(skill, index) in requirement.advancedSkills" :key="index">
								Thành thạo
								<span v-for="(iitem, iindex) in skill" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== skill.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.certificates.length" class="requirement-list">
							<li v-for="(certificate, index) in requirement.certificates" :key="index">
								Đạt được chứng chỉ
								<span v-for="(citem, cindex) in certificate.certificates" :key="cindex">
									{{ citem.name }}
									<span v-if="cindex !== certificate.certificates.length - 1">hoặc</span>
								</span>
								hoặc tương đương
							</li>
						</ul>
						<span v-html="requirement.custom_requirement"></span>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">OK</el-button>
					</span>
				</el-dialog>
        <el-dialog
            title="Gửi khóa học"
            :visible.sync="checkDialog"
            width="30%"
            :before-close="handleClose"
        >
            <div v-if="tagsFulfilled">
                Bạn có chắc muốn gửi cho nhà tuyển dụng?
            </div>
            <div v-else>
                Roadmap chưa sở hữu đủ các kỹ năng cần thiết!
            </div>
            <span slot="footer" class="dialog-footer">
                <div v-if="tagsFulfilled">
                    <el-button type="primary" @click="sendRoadmap">Xác nhận</el-button>
                    <el-button @click="checkDialog = false">Hủy</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" @click="$router.push({ name: 'EducationRoadmap', params: { jobEducationId: checkingRoadmap } })">Tìm hiểu thêm</el-button>
                </div> 
            </span>
        </el-dialog>
        <el-dialog
            title="Yêu cầu thay đổi"
            :visible.sync="changeRequestDialog"
            width="30%"
            :before-close="handleClose"
        >
            <ul v-if="changeRequest && changeRequest.length">
                <li v-for="(item, index) in changeRequest" :key="index">
                    {{ item.content }}
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeRequestDialog = false">OK</el-button>
            </span>
        </el-dialog>
	</div>	
</template>
<script>
import jobEducationStatus from '@/constants/jobEducationStatus'
import { RoadMapService } from '@/services'

export default {
	data() {
		return {
			tableData: [{
                title: 'Frontend Developer',
                company: 'FPT Corporation',
                max_education_month: 3,
                scholarship: 50,
                course_count: 10,
                status: 1,
            }],
            requirement: {
                majorColleges: [],
                certificates: [],
                beginnerSkills: [],
                intermediateSkills: [],
                advancedSkills: [],
            },
			dialogVisible: false,
            jobEducationStatus,
            tagsFulfilled: false,
            checkDialog: false,
            checkingRoadmap: 0,
            changeRequest: [],
            changeRequestDialog: false,
		}
	},
    created() {
        this.getEducationRequests()
    },
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
        async getEducationRequests() {
            const { data } = await RoadMapService.getEducationRequests()
            this.tableData = [...data.results]
        },
        showRequirement(requirements, custom_requirement = null) {
            this.requirement.majorColleges = requirements.filter((item) => item.type === 'Major');
            this.requirement.certificates = requirements.filter((item) => item.type === 'Certificate');
            this.requirement.beginnerSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Beginner').map(obj => obj.skills)
            this.requirement.intermediateSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Intermediate').map(obj => obj.skills);
            this.requirement.advancedSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Advanced').map(obj => obj.skills);
            this.requirement.custom_requirement = custom_requirement
            this.dialogVisible = true;
        },
        async checkRoadmap(jobEducationId) {
            const data = await RoadMapService.checkRoadmap(jobEducationId)
            try {
                if (data.status === 200) {
                    if (data.data) {
                        this.tagsFulfilled = true;
                    } else {
                        this.tagsFulfilled = true;
                    }
                    this.checkingRoadmap = jobEducationId;
                    this.checkDialog = true
                }
            } catch (e) {
                console.log(e)
            }
        },
        async sendRoadmap() {
            const data = await RoadMapService.sendRoadmap(this.checkingRoadmap)
            if (data.status === 200) {
                this.$notify({
                    title: 'Success',
                    message: 'Đã gửi nhà tuyển dụng'
                });
                this.getEducationRequests()
                this.checkDialog = false
            }
        },
        async unsendRoadmap(jobEducationId) {
            const data = await RoadMapService.sendRoadmap(jobEducationId)
            if (data.status === 200) {
                this.$notify({
                    title: 'Success',
                    message: 'Đã hoàn tác'
                });
                this.getEducationRequests()
            }
        },
        openChangeRequestDialog(item) {
            if (item.status === 4) {
                this.changeRequest = [...item.change_requests];
                this.changeRequestDialog = true
            }
        }
	}
}
</script>
<style scoped lang="scss">
.table-container {
	
}
.change-request-text {
    text-decoration: underline;
    color: blue;
    cursor: pointer
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
thead {
	color: #909399 !important;
}
.custom-dialog {
	.el-dialog__header {
		background-color: #409eff;
		color: white;
		text-align: center;
		border-bottom: none;
		padding: 15px;
		font-size: 18px;
		border-radius: 10px 10px 0 0;
	}

	.el-dialog__body {
		padding: 20px;
		background-color: #f5f7fa;
	}

	.el-dialog__footer {
		background-color: #f5f7fa;
		border-top: none;
		text-align: right;
		padding: 10px 20px;
	}

	.dialog-content {
		background-color: #ffffff;
		padding: 15px;
		border-radius: 5px;
	}

	.requirement-list {
		list-style-type: none;
		padding: 0;
		margin: 0px 0;
	}

	.requirement-list li {
		padding: 5px 0;
		border-bottom: 1px solid #ebeef5;
	}

	.fw-bold {
		font-weight: bold;
		margin: 0 5px;
	}

	.dialog-footer {
		text-align: right;
	}

	.dialog-footer .el-button {
		background-color: #409eff;
		color: white;
		border: none;
	}

	.dialog-footer .el-button:hover {
		background-color: #66b1ff;
	}
}
</style>