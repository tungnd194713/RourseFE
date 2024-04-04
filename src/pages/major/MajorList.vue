<template>
	<div>
		<div class="px-4 py-4">
			<h2>Danh sách chuyên ngành</h2>
			<h4>Các chuyên ngành có thể chọn trong hệ thống:</h4>
			<el-button class="mb-4" @click="dialogVisible = true">Thêm bản ghi</el-button>
			<div class="table-container">
				<el-table
					class="table"
					border
					:data="tableData"
					style="width: 100%">
					<el-table-column
						label="Tên chuyên ngành"
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
								@click="handleEdit(scope.$index, scope.row)">Sửa</el-button>
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
					@current-change="getMajors"
					:current-page.sync="current_page"
					:page-size="10"
					:total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog
      title="Thêm / Sửa chuyên ngành"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="majorModel" :model="majorModel" label-width="120px">
        <el-form-item label="Tên chuyên ngành" required>
          <el-input v-model="majorModel.name" placeholder="Nhập tên chuyên ngành"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Link chuyên ngành" required>
          <el-input v-model="majorModel.link" placeholder="Nhập link chuyên ngành"></el-input>
        </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="addAccount">Thêm</el-button>
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
			majorModel: {
        name: '',
        link: '',
      },
			total: 0,
			current_page: 1,
			per_page: 10,
		}
	},
	created() {
		this.getMajors(this.current_page);
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		toSubject(item) {
			this.$router.push({ name: 'MajorSubject', params: { id: item } })
		},
		async getMajors() {
			try {
				const { data } = await SubjectService.getMajors(this.current_page);
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