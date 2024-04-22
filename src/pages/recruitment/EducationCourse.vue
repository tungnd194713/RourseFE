<template>
	<div>
		<div class="px-4 py-4">
			<div class="d-flex justify-content-between">
                <h2>Lộ trình học - {{ companyName || 'Tên công ty' }} - {{ jobTitle || 'Vị trí công việc' }} - {{ this.courseInfo.title || 'Tên khóa học' }}</h2>
                <el-button @click="secondDialog = true">Sửa thông tin</el-button>
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
								@click="$router.push({ name: 'EducationModuleDetail', params: { ...$route.params, moduleId: scope.row.id || scope.row._id } })">Xem chi tiết</el-button>
							<el-button
								size="mini"
								type="primary"
								@click="removeEducationModuleFromCourse(scope.row.id || scope.row._id)">Xóa</el-button>
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
                <el-button type="success" @click="$router.push({ name: 'EducationCreateModule', params: { ...$route.params } })">Thêm module</el-button>
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
    <el-dialog title="Tạo khóa học mới" :visible.sync="secondDialog" width="80%">
			<div class="form-container">
				<el-form ref="courseForm" :model="courseInfo" label-width="300px">
					<el-form-item label="Tiêu đề khóa học" class="form-item" prop="title">
						<el-input v-model="courseInfo.title" placeholder="Nhập tiêu đề khóa học"></el-input>
					</el-form-item>
					<el-form-item label="Mô tả khóa học" class="form-item" prop="description">
						<el-input type="textarea" v-model="courseInfo.description" placeholder="Nhập mô tả"></el-input>
					</el-form-item>
					<el-form-item label="Thời gian hoàn thành dự kiến (tiếng)" class="form-item" prop="description">
						<el-input type="number" v-model="courseInfo.estimated_time"></el-input>
					</el-form-item>
					<el-form-item label="Thumbnail Image" class="form-item" prop="thumbnail">
						<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :before-upload="beforeUpload" :auto-upload="false" :file-list="fileList" :on-remove="handleRemove" :limit="1" list-type="picture">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
						</el-upload>
						<div v-if="courseInfo.thumbnail" class="thumbnail-preview">
							<img :src="courseInfo.thumbnail" alt="Thumbnail Preview" />
						</div>
					</el-form-item>
					<el-form-item label="Skill Tags" class="form-item" prop="tags">
						<div v-for="(tag, index) in courseInfo.skill_tags" :key="index" class="tag-level-group">
							<el-select v-model="tag.skill.name" placeholder="Select tag" class="tag-select">
								<el-option v-for="tagItem in subjectList" :key="tagItem.id" :label="tagItem.name" :value="tagItem.id"></el-option>
							</el-select>
							<el-select v-model="tag.level" placeholder="Select level" class="level-select">
								<el-option v-for="level in levels" :key="level + Date.now()" :label="level" :value="level"></el-option>
							</el-select>
							<el-button type="danger" icon="el-icon-close" @click="removeTag(index)" class="remove-tag-btn"></el-button>
						</div>
						<el-button type="primary" icon="el-icon-plus" @click="addTag" class="add-tag-btn">Thêm tag</el-button>
					</el-form-item>
					<el-form-item class="form-item">
						<el-button type="primary" class="submit-btn" @click="updateCourse">Cập nhật khóa học</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>	
</template>
<script>
import jobEducationStatus from '@/constants/jobEducationStatus'
import { CourseService, RoadMapService } from '@/services'

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
            secondDialog: false,
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
						this.companyName = data.company.company_name
            this.jobTitle = data.job.title
				}
		},
		async removeEducationModuleFromCourse(moduleId) {
			const { data } = await RoadMapService.removeEducationModuleFromCourse(this.$route.params.jobEducationId, this.$route.params.courseId, moduleId);
			if (data) {
				this.$notify({
          title: 'Success',
          message: 'Đã xóa module khỏi khóa học'
        });
				this.getCourseDetail();
			}
		},
        async updateCourse() {
			// Validate the form
			this.$refs.courseForm.validate(async (valid) => {
				if (valid) {
					try {
						const formData = new FormData();
						formData.append('title', this.courseInfo.title);
						formData.append('description', this.courseInfo.description);
						formData.append('estimated_time', this.courseInfo.estimated_time);
						formData.append('point_cost', this.courseInfo.point_cost);
						formData.append('thumbnail', 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg');
						formData.append(`tags`, JSON.stringify(this.courseInfo.skill_tags.map((item) => {
                            return {
                                skill: item.skill.id || item.skill._id,
                                level: item.level
                            }
                        })));

						const response = await CourseService.updateCourse(this.$route.params.courseId, formData)
						if (response.status === 200) {
							this.secondDialog = false;
							this.$notify({
								title: 'Success',
								message: 'Đã cập nhật khóa học'
							});
							await this.getCourseDetail()
						}
					} catch (e) {
                        console.log(e)
						this.$notify({
							title: 'Error',
							message: e.statusText
						});
					}
					// this.resetForm()
				} else {
					console.log('Form validation failed.');
					return false;
				}
			});
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