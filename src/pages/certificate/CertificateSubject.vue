<template>
	<div>
		<div class="px-4 py-4">
			<h2>Quy đổi - {{ certificateName }}</h2>
			<h4>Chứng chỉ này sẽ tương đương với các kiến thức sau đây:</h4>
			<el-button class="mb-4" @click="dialogVisible = true">Thêm bản ghi</el-button>
			<el-button class="mb-4">Lưu thay đổi</el-button>
			<div class="table-container">
				<el-table
					class="table"
					empty-text="Không có dữ liệu"
					:data="tableData"
					style="width: 100%">
					<el-table-column
						label="Tên">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.subject.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Cấp độ">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.level }}</span>
						</template>
					</el-table-column>
					<el-table-column
						width="199"
						label="">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="handleEdit(scope.$index, scope.row)">Sửa</el-button>
							<el-button
								size="mini"
								type="danger"
								@click="deleteCollection(scope.row.subject.id)">Xóa</el-button>
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
        <el-form-item label="Kỹ năng" required>
          <el-select v-model="skillModel" filterable placeholder="Chọn kỹ năng tương ứng">
						<el-option
							v-for="item in skillArray"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
        </el-form-item>
        <el-form-item label="Mức độ" required>
          <el-select v-model="levelModel" filterable placeholder="Chọn cấp độ tương ứng">
						<el-option
							v-for="item in levelArray"
							:key="item"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="addCollection">Thêm</el-button>
      </span>
    </el-dialog>
	</div>	
</template>
<script>
import { SubjectService } from '@/services'

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
      },
			certificateName: 'Tên chứng chỉ',
			currentSkillIds: [],
			skillArray: [],
			skillModel: '',
			levelArray: ['Beginner', 'Intermediate', 'Advanced'],
			levelModel: '',
		}
	},
	async created() {
		await this.getCertificateSubjects()
		await this.getAllSubject()
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		async getCertificateSubjects() {
			try {
				const { data } = await SubjectService.getCertificateSubjects(this.$route.params.id);
				this.tableData = data.subjects
				this.certificateName = data.name
				this.currentSkillIds = data.subjects.map(item => item?.subject?.name);
				// this.total = data.meta.total
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}
		},
		async getAllSubject() {
			try {
				const { data } = await SubjectService.getAllSubject(this.currentSkillIds);
				this.skillArray = data
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}
		},
		async addCollection() {
			try {
				const body = {
					subjectId: this.skillModel,
					level: this.levelModel,
				}
				await SubjectService.addSubjectToCertificate(this.$route.params.id, body);
				await this.getCertificateSubjects();
				await this.getAllSubject();
				this.dialogVisible = false
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}
		},
		async deleteCollection(subject_id) {
			try {
				await SubjectService.deleteSubjectFromCertificate(this.$route.params.id, subject_id);
				await this.getCertificateSubjects();
				await this.getAllSubject();
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}
		}
	},
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