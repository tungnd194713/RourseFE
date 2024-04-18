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
							<span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Tuyển dụng">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.job.title }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Nhà tuyển dụng">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.company.company_name }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Thời gian đào tạo tối đa">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.max_education_month }} tháng</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Học bổng">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.scholarship }}%</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Số lượng khóa học">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.course_count || 0 }}</span>
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
								@click="$router.push({ name: 'EducationRoadmap', params: { jobEducationId: scope.row.id } })">Xem chi tiết</el-button>
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
      title="Thêm / Sửa chứng chỉ"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="certificateModel" :model="certificateModel" label-width="120px">
        <el-form-item label="Tên chứng chỉ" required>
          <el-input v-model="certificateModel.name" placeholder="Nhập tên chứng chỉ"></el-input>
        </el-form-item>
        <el-form-item label="Link chứng chỉ" required>
          <el-input v-model="certificateModel.link" placeholder="Nhập link chứng chỉ"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="addAccount">Thêm</el-button>
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
			dialogVisible: false,
			certificateModel: {
        name: '',
        link: '',
      },
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