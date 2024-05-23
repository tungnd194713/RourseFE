<template>
  <div>
    <div class="px-4 py-4">
			<h2><router-link :to="{name: 'InstructorCourse', params: {...$router.params}}">{{ this.courseInfo.title || 'Tên khóa học' }}</router-link> - Thêm module</h2>
      <div class="d-flex justify-content-between">
				<h3 class="mx-3">Tạo module: </h3>
				<el-button type="primary" @click="createModule">Lưu</el-button>
      </div>
      <div>
        <ul class="config-list">
          <li>
            <div>
              Tên module
            </div>
            <el-input
              class="name-input"
              placeholder="Module name"
              v-model="moduleData.name"
              clearable>
            </el-input>
          </li>
          <li>
            <div>
              Mô tả module
            </div>
            <el-input
              class="name-input"
              placeholder="Module description"
              v-model="moduleData.description"
              clearable>
            </el-input>
          </li>
          <li class="half-config">
            <div>
              Cho phép tua?
            </div>
            <el-switch class="mx-4"></el-switch>
          </li>
        </ul>
      </div>
      <el-main>
				<div>
					<h3 class="mx-2">Module video</h3>
				</div>
        <el-row justify="center" :gutter="20" class="my-2">
          <el-col :span="6">
            <el-select class="type-select" v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
								:disabled="item.value === 2">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input
              class="url-input"
              v-if="value === 1"
              placeholder="Please input"
              v-model="moduleData.videoUrl"
              clearable>
            </el-input>
            <el-upload
              v-else
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="submitVideo">
              Tải video
            </el-button>
          </el-col>
        </el-row>
        <el-row v-if="inputVideo">
          <el-col :span="12">
            <video-component :is="inputVideo" :options="videoOptions" @getVideoDuration="getVideoDuration" />
          </el-col>
          <el-col :span="12">
            <div class="quizz-container">
              <CreateQuizzes ref="quizzes" :videoDuration="videoDuration"/>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </div>
  </div>
</template>

<script>
import VideoComponent from '@/components/VideoComponent.vue';
import CreateQuizzes from '@/components/CreateQuizzes.vue'
import { RoadMapService } from '@/services'

export default {
  name: 'CreateModule',
  components: {
    VideoComponent,
    CreateQuizzes,
  },
  data() {
    return {
      options: [{
          value: 1,
          label: 'External url'
        }, {
          value: 2,
          label: 'Upload video (Chưa hỗ trợ)'
      }],
      value: 1,
      inputVideo: '',
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src:'',
            type: 'video/mp4'
          }
        ],
      },
			moduleData: {
				name: '',
				description: '',
				videoUrl: '',
				uploadingVideo: '',
				check_point_quizzes: [],
				video_duration: 0,
				is_video_uploaded: false,
			},
      videoDuration: 0,
			companyName: '',
			jobTitle: '',
			courseInfo: {},
    }
  },
	created() {
		this.getInstructorCourseById()
	},
  methods: {
    submitVideo() {
			if (this.value === 1) {
				this.videoOptions.sources[0].src = this.moduleData.videoUrl
        this.inputVideo = VideoComponent
			}
    },
    getVideoDuration(value) {
      this.videoDuration = value
    },
		async getInstructorCourseById() {
				const { data } = await RoadMapService.getInstructorCourseById(this.$route.params.instructorCourseId);
				if (data) {
                    this.courseInfo = data.course;
				}
		},
		async createModule() {
			if (!this.moduleData.name) {
				this.$notify({
          title: 'Validation',
          message: 'Hãy nhập tên khóa học'
        });
			}
			else if (!this.moduleData.description) {
				this.$notify({
          title: 'Validation',
          message: 'Hãy nhập mô tả khóa học'
        });
			}
			else {
				if (this.inputVideo) {
					this.moduleData.check_point_quizzes = [...this.$refs.quizzes.quizzes];
				}
				try {
						const formData = new FormData();
						formData.append('name', this.moduleData.name);
						formData.append('description', this.moduleData.description);
						formData.append('video', this.moduleData.videoUrl);
						this.moduleData.check_point_quizzes.length && formData.append('check_point_quizzes', this.moduleData.check_point_quizzes);
						formData.append('video_duration', this.videoDuration);

						const response = await RoadMapService.createEducationModule(this.$route.params.courseId, formData)
						if (response.status === 200) {
							this.$router.push({ name: 'InstructorCourse', params: { ...this.$route.params } })
							this.$notify({
								title: 'Success',
								message: 'Đã tạo module'
							});
						}
					} catch (e) {
						this.$notify({
							title: 'Error',
							message: e.statusText
						});
					}
			}
		}
  },
};
</script>
<style lang="scss" scoped>
.type-select {
  float: right;
}
.config-list {
  li {
    margin-top: 10px;
    padding: 10px;
  }
  li input {
    margin-top: 10px;
  }
  .half-config {
    display: flex;
  }
}
</style>