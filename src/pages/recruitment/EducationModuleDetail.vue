<template>
  <div>
    <div class="px-4 py-4">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="mb-4">
        <el-breadcrumb-item style="font-size: 32px" :to="{ name: 'EducationRecruitment' }">
          Lộ trình học
        </el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 32px" :to="{ name: 'EducationRoadmap', params: { ...$route.params } }">
          {{ jobTitle || 'Vị trí công việc' }}
        </el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 32px" :to="{ name: 'EducationCourse', params: { ...$route.params } }">
          {{ this.courseInfo.title || 'Tên khóa học' }}
        </el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 32px">
          Chi tiết module
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="d-flex justify-content-between">
				<h3 class="mx-3">Module: </h3>
				<el-button type="primary" @click="updateModule">Lưu</el-button>
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
        <el-row v-if="inputVideo" type="flex" justify="center">
          <el-col :span="15">
            <video-component ref="videoContainer" :is="inputVideo" :options="videoOptions" @getVideoDuration="getVideoDuration" />
          </el-col>
        </el-row>
      </el-main>
    </div>
  </div>
</template>

<script>
import VideoComponent from '@/components/VideoComponent.vue';
import { RoadMapService } from '@/services'

export default {
  name: 'CreateModule',
  components: {
    VideoComponent,
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
		this.getModule()
	},
  methods: {
    submitVideo() {
        if (this.value === 1) {
            this.videoOptions.sources[0].src = this.moduleData.videoUrl
            this.$refs.videoContainer.player.src({
                src: this.moduleData.videoUrl,
                type: 'video/mp4'
            });
            this.$refs.videoContainer.player.load()
        }
    },
    getVideoDuration(value) {
      this.videoDuration = value
    },
    async getModule() {
        const { data } = await RoadMapService.getEducationModule(this.$route.params.jobEducationId, this.$route.params.courseId, this.$route.params.moduleId);
        if (data) {
            this.courseInfo = data.course;
            this.tableData = this.courseInfo.modules
            this.companyName = data.company.company_name
            this.jobTitle = data.job.title
            this.moduleData = {
                ...data.module,
                videoUrl: data.module.video
            }
            this.videoOptions.sources[0].src = this.moduleData.videoUrl
            this.inputVideo = VideoComponent
        }
    },
    async updateModule() {
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
            try {
                    const formData = new FormData();
                    formData.append('name', this.moduleData.name);
                    formData.append('description', this.moduleData.description);
                    formData.append('video', this.moduleData.videoUrl);
                    formData.append('video_duration', this.videoDuration);

                    const response = await RoadMapService.updateEducationModule(this.$route.params.jobEducationId, this.$route.params.courseId, this.$route.params.moduleId, formData)
                    if (response.status === 200) {
                        this.$router.push({ name: 'EducationCourse', params: { ...this.$route.params } })
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