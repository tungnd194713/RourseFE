<template>
	<div>
		<div class="px-4 py-4">
			<h2>Quy đổi - Tên chuyên ngành</h2>
			<h4>Chuyên ngành này sẽ tương đương với các kiến thức sau đây:</h4>
			<div class="d-flex justify-content-between" style="max-width: 900px">
				<div>
					Đại học
					<el-select>
					</el-select>
				</div>
				<div>
					<el-button class="mb-4" @click="dialogVisible = true">Thêm bản ghi</el-button>
					<el-button class="mb-4">Lưu thay đổi</el-button>
				</div>
			</div>
			<div class="table-container">
				<el-table
					class="table"
					border
					:data="tableData"
					style="width: 100%">
					<el-table-column
						label="No"
						width="50">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.index }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Chuyên ngành"
						width="400">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Cấp độ"
						width="199">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>Name: {{ scope.row.name }}</p>
								<p>Addr: {{ scope.row.address }}</p>
								<div slot="reference" class="name-wrapper">
									<el-tag size="medium">{{ scope.row.name }}</el-tag>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column
						width="249"
						label="">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="handleEdit(scope.$index, scope.row)">Sửa</el-button>
							<el-button
								size="mini"
								type="danger"
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
export default {
	data() {
		return {
			tableData: [{
				date: '2016-05-03',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles'
			}, {
				date: '2016-05-02',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles'
			}, {
				date: '2016-05-04',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles'
			}, {
				date: '2016-05-01',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles'
			}],
			dialogVisible: false,
			certificateModel: {
        name: '',
        link: '',
      }
		}
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
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