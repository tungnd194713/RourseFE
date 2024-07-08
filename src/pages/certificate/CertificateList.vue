<template>
	<div>
		<div class="px-4 py-4">
			<h2>Danh sách chứng chỉ</h2>
			<h4>Các chứng chỉ có thể chọn trong hệ thống:</h4>
			<el-button class="mb-4" @click="openAddDialog">Thêm bản ghi</el-button>
			<div class="table-container">
				<el-table
					class="table"
					border
					:data="tableData"
					style="width: 100%">
					<el-table-column
						label="Tên chứng chỉ"
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
								type="primary"
								@click="toSubject(scope.row.id)">Xem quy đổi</el-button>
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
					@current-change="getCertificates"
					:current-page.sync="current_page"
					:page-size="10"
					:total="total">
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
        <!-- <el-form-item label="Link chứng chỉ" required>
          <el-input v-model="certificateModel.link" placeholder="Nhập link chứng chỉ"></el-input>
        </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="addCertificate">Thêm / Sửa</el-button>
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
			certificateModel: {
				name: '',
			},
			total: 0,
			current_page: 1,
			per_page: 10,
			editingId: null,
		}
	},
	created() {
		this.getCertificates(this.current_page);
	},
	methods: {
		async addCertificate() {
			this.dialogVisible = false
			try {
				let data = null
				if (this.editingId) {
					data = await SubjectService.updateCertificate(this.editingId, this.certificateModel);
				} else {
					data = await SubjectService.addCertificate(this.certificateModel);
				}
				if (data && data.data) {
					this.getCertificates()
					this.$notify({
						title: 'Success',
						message: 'Đã thêm / sửa bản ghi'
					});
					this.getCertificates()
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
			this.certificateModel = {
				name: '',
			}
			this.editingId = null
		},
		handleEdit(row) {
			this.dialogVisible = true;
			this.certificateModel.name = row.name
			this.editingId = row.id || row._id
		},
		async handleDelete(index, row) {
			console.log(index, row);
			try {
				const { data } = await SubjectService.removeCertificate(row.id || row._id);
				if (data) {
					this.$notify({
						title: 'Success',
						message: 'Đã xóa bản ghi'
					});
					this.getCertificates()
				}
			} catch (e) {
				this.$notify({
					title: 'Error',
					message: e.statusText
				});
			}
		},
		toSubject(item) {
			this.$router.push({ name: 'CertificateSubject', params: { id: item } })
		},
		async getCertificates() {
			try {
				const { data } = await SubjectService.getCertificates(this.current_page);
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