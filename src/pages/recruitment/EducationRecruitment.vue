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
                            <span>{{ scope.row.course_count || 0 }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Yêu cầu">
						<template slot-scope="scope">
                            <el-button style="width: 100%" type="primary" @click="showRequirement(scope.row.requirements)">Xem</el-button>
						</template>
					</el-table-column>
                    <el-table-column
						label="Trạng thái">
						<template slot-scope="scope">
                            <span>{{ jobEducationStatus[scope.row.status - 1] }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="$router.push({ name: 'EducationRoadmap', params: { jobEducationId: scope.row._id } })">Xem chi tiết</el-button>
							<el-button
								size="mini"
								type="primary"
								@click="handleDelete(scope.$index, scope.row)">Gửi</el-button>
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
        >
            <div>
                <ul v-if="requirement.majorColleges.length">
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
                <ul v-if="requirement.beginnerSkills.length">
                    <li v-for="(skill, index) in requirement.beginnerSkills" :key="index">
                        Đã có kinh nghiệm
                        <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                        </span>
                    </li>
                </ul>
                <ul v-if="requirement.intermediateSkills.length">
                    <li v-for="(skill, index) in requirement.intermediateSkills" :key="index">
                        Hiểu rõ về
                        <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                        </span>
                    </li>
                </ul>
                <ul v-if="requirement.advancedSkills.length">
                    <li v-for="(skill, index) in requirement.advancedSkills" :key="index">
                        Thành thạo
                        <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                        </span>
                    </li>
                </ul>
                <ul v-if="requirement.certificates.length">
                    <li v-for="(certificate, index) in requirement.certificates" :key="index">
                        Đạt được chứng chỉ
                        <span v-for="(iitem, iindex) in certificate" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== certificate.length - 1">hoặc</span>
                        </span>
                        hoặc tương đương
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">OK</el-button>
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
        showRequirement(requirements) {
            this.requirement.majorColleges = requirements.filter((item) => item.type === 'Major');
            this.requirement.certificates = requirements.filter((item) => item.type === 'Certificate');
            this.requirement.beginnerSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Beginner').map(obj => obj.skills)
            this.requirement.intermediateSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Intermediate').map(obj => obj.skills);
            this.requirement.advancedSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Advanced').map(obj => obj.skills);
            this.dialogVisible = true;
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

</style>
<style lang="scss">
.cell {
    word-break: keep-all !important;
}
</style>