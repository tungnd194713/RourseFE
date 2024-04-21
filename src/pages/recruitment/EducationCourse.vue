<template>
	<div>
		<div class="px-4 py-4">
			<div class="d-flex justify-content-between">
                <h2>Lộ trình học - {{ companyName || 'Tên công ty' }} - {{ jobTitle || 'Vị trí công việc' }} - {{ this.courseInfo.title || 'Tên khóa học' }}</h2>
                <el-button>Sửa thông tin</el-button>
            </div>
            <h4>Chi phí: {{ this.courseInfo.point_cost }} point</h4>
            <h4>Mô tả: </h4>
            <div style="margin-left: 20px; margin-bottom: 20px; font-size: 20px">{{ this.courseInfo.description }}</div>
            <h4>Tags kĩ năng: </h4>
            <div style="margin-left: 20px; margin-bottom: 20px; font-size: 20px">
                <el-button type="primary" v-for="tag in this.courseInfo.skill_tags" :key="tag._id" class="my-2 skill-tag-btn">
                    {{ tag.skill.name }} - {{ tag.level }}
                </el-button>
            </div>
			<h4>Danh sách module:</h4>
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
						label="Tiêu đề">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Mô tả">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.description }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Độ dài video">
						<template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.video_duration }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="handleEdit(scope.$index, scope.row)">Xem chi tiết</el-button>
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
                <el-button type="success">Thêm module</el-button>
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
                name: 'Javascript Variables',
                video_duration: 5,
                description: 'This is javascript variables',
            }],
			dialogVisible: false,
			certificateModel: {
                name: '',
                link: '',
            },
            jobEducationStatus,
            courseInfo: {},
		}
	},
    created() {
        this.getCourseDetail()
    },
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
        async getCourseDetail() {
            const { data } = await RoadMapService.getCourseDetail(this.$route.params.jobEducationId, this.$route.params.courseId);
            if (data) {
                this.courseInfo = data;
                this.tableData = this.courseInfo.modules
                console.log(this.courseInfo)
            }
        }
	},
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