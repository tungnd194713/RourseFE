<template>
	<div>
		<div class="px-4 py-4">
			<div class="d-flex justify-content-between">
				<h2>{{ this.courseInfo.title || 'Tên khóa học' }}</h2>
			</div>
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
							<!-- <el-button
								size="mini"
								@click="$router.push({ name: 'EducationModuleDetail', params: { ...$route.params, moduleId: scope.row.id || scope.row._id } })">Xem chi tiết</el-button> -->
							<el-button
								size="mini"
								type="primary"
								@click="previewModule(scope.row)">Xem video module</el-button>
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
		<el-dialog :visible.sync="previewDialog" :title="moduleName">
      <PreviewModule :source="videoSource" />
    </el-dialog>
	</div>	
</template>
<script>
import jobEducationStatus from '@/constants/jobEducationStatus'
import { MentorService } from '@/services'
import PreviewModule from "@/components/PreviewModule"

export default {
	components: {
		PreviewModule
	},
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
			secondDialog: false,
			previewDialog: false,
			moduleName: '',
			videoSource: '',
		}
	},
	created() {
		this.getCourseDetail()
	},
	methods: {
		async getCourseDetail() {
				const { data } = await MentorService.showCourse(this.$route.params.courseId);
				if (data) {
						this.courseInfo = data;
						this.tableData = this.courseInfo.modules
				}
		},
		previewModule(module) {
			this.videoSource = module.video;
			this.moduleName = module.name
			this.previewDialog = true;
		},
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