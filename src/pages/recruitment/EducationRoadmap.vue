<template>
	<div>
		<div class="px-4 py-4">
			<h2>Lộ trình học - {{ companyName || 'Tên công ty' }} - {{ jobTitle || 'Vị trí công việc' }}</h2>
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
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Kỹ năng">
						<template slot-scope="scope">
                            <div v-for="(tag, index) in scope.row.tags" :key="index">
                                <span>{{ tag.skill.name }} - {{ tag.level }}</span>
                            </div>
						</template>
					</el-table-column>
                    <el-table-column
						label="Số lượng module">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.module_count }}</span>
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
								@click="$router.push({ name: 'EducationCourse',  params: { jobEducationId: $route.params.jobEducationId, courseId: '2' } })">Xem chi tiết</el-button>
							<el-button
								size="mini"
								type="primary"
								@click="handleDelete(scope.$index, scope.row)">Xóa</el-button>
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
                <el-button type="primary">Thêm khóa học có sẵn</el-button>
                <el-button type="success">Tạo khóa học mới</el-button>
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
            const { data } = await RoadMapService.getEducationRoadmap(this.$route.params.jobEducationId)
            console.log(data)
            this.tableData = [...data.courses]
            this.companyName = data.company.company_name
            this.jobTitle = data.job.title
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