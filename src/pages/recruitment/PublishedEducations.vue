<template>
	<div>
		<div class="px-4 py-4">
			<h2>Danh sách chương trình học đang mở đào tạo</h2>
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
						label="Vị trí công việc">
						<template slot-scope="scope">
							<span>{{ scope.row.job_title }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Công ty">
						<template slot-scope="scope">
                            <span>{{ scope.row.company_name }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Thời gian đào tạo">
						<template slot-scope="scope">
                            <span>{{ scope.row.max_education_month }} tháng</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Số khóa học">
						<template slot-scope="scope">
                            <span>{{ scope.row.course_count }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Học viên tham gia">
						<template slot-scope="scope">
                            <span>{{ scope.row.user_count || 0 }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Tổng point">
						<template slot-scope="scope">
                            <span>{{ scope.row.point_cost || 0 }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Ngày mở đào tạo">
						<template slot-scope="scope">
                            <span>{{ scope.row.published_at ? scope.row.published_at.split('T')[0] : '' }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="250"
						label="">
						<!-- <template slot-scope="scope">
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
						</template> -->
					</el-table-column>
				</el-table>
				<el-pagination
					background
					layout="prev, pager, next"
					:total="1000">
				</el-pagination>
			</div>
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
                }],
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
        this.getPublishedEducations()
    },
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		async getPublishedEducations() {
				const { data } = await RoadMapService.getPublishedEducations()
				this.tableData = [...data.results]
		},
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
</style>