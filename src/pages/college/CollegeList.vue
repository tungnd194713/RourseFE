<template>
	<div>
		<div class="px-4 py-4">
			<h2>Danh sách đại học</h2>
			<h4>Các đại học có thể chọn trong hệ thống:</h4>
			<el-button class="mb-4" @click="openAddDialog">Thêm bản ghi</el-button>
			<div class="table-container">
				<el-table
					class="table"
					border
					:data="tableData"
					style="width: 100%">
					<el-table-column
						label="Tên đại học"
						width="600">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						width="299"
						label="">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="handleEdit(scope.row)">Sửa</el-button>
							<el-button
								size="mini"
								type="danger"
								@click="handleDelete(scope.$index, scope.row)">Xóa</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					background
					layout="prev, pager, next"
					@current-change="getColleges"
					:current-page.sync="current_page"
					:page-size="10"
					:total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog
      title="Thêm / Sửa đại học"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="collegeModel" :model="collegeModel" label-width="120px">
        <el-form-item label="Tên đại học" required>
          <el-input v-model="collegeModel.name" placeholder="Nhập tên đại học"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Link đại học" required>
          <el-input v-model="collegeModel.link" placeholder="Nhập link đại học"></el-input>
        </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="addCollege">Thêm / Sửa</el-button>
      </span>
    </el-dialog>
	</div>	
</template>
<script>
import { SubjectService } from '@/services'

export default {
	data() {
		return {
			tableData: [],
			dialogVisible: false,
			collegeModel: {
				name: '',
			},
			total: 0,
			current_page: 1,
			per_page: 10,
			editingId: null,
		}
	},
	created() {
		this.getColleges(this.current_page);
	},
	methods: {
		async addCollege() {
			this.dialogVisible = false
			try {
				let data = null
				if (this.editingId) {
					data = await SubjectService.updateCollege(this.editingId, this.collegeModel);
				} else {
					data = await SubjectService.addCollege(this.collegeModel);
				}
				if (data && data.data) {
					this.getColleges()
					this.$notify({
						title: 'Success',
						message: 'Đã thêm / sửa bản ghi'
					});
					this.getColleges()
				}
			} catch (e) {
				this.$notify({
					title: 'Error',
					message: e.statusText
				});
			}
		},
		openAddDialog() {
			this.dialogVisible = true
			this.collegeModel = {
				name: '',
			}
			this.editingId = null
		},
		handleEdit(row) {
			this.dialogVisible = true;
			this.collegeModel.name = row.name
			this.editingId = row.id || row._id
		},
		async handleDelete(index, row) {
			console.log(index, row);
			try {
				const { data } = await SubjectService.removeCollege(row.id || row._id);
				if (data) {
					this.$notify({
						title: 'Success',
						message: 'Đã xóa bản ghi'
					});
					this.getColleges()
				}
			} catch (e) {
				this.$notify({
					title: 'Error',
					message: e.statusText
				});
			}
		},
		toSubject(item) {
			this.$router.push({ name: 'CollegeSubject', params: { id: item } })
		},
		async getColleges() {
			try {
				const { data } = await SubjectService.getColleges(this.current_page);
				this.tableData = data.data
				this.total = data.meta.total
			} catch (e) {
				this.$notify({
				title: 'Error',
				message: e.statusText
				});
			}
		}
	}
}
</script>
<style scoped lang="scss">
.table-container {
	max-width: 900px;
}
.table {
	margin-bottom: 20px;
}
.el-pagination {
	float: right;
}
</style>