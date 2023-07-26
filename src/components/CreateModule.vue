<template>
  <div>
    <el-container>
      <el-aside v-if="inputVideo">
        <ul class="config-list">
          <li>
            <div>
              Module name
            </div>
            <el-input
              class="name-input"
              placeholder="Module name"
              v-model="moduleName"
              clearable>
            </el-input>
          </li>
          <li>
            <div>
              Module description
            </div>
            <el-input
              class="name-input"
              placeholder="Module description"
              v-model="moduleDescription"
              clearable>
            </el-input>
          </li>
          <li class="half-config">
            <div>
              Able to play forward?
            </div>
            <el-switch></el-switch>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <el-row v-if="!inputVideo" justify="center" :gutter="20">
          <el-col :span="6">
            <el-select class="type-select" v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input
              class="url-input"
              v-if="value === 1"
              placeholder="Please input"
              v-model="videoUrl"
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
              Submit
            </el-button>
          </el-col>
        </el-row>
        <el-row v-if="inputVideo">
          <el-col :span="12">
            <video-component :is="inputVideo" :options="videoOptions" @getVideoDuration="getVideoDuration" />
          </el-col>
          <el-col :span="12">
            <div class="quizz-container">
              <CreateQuizzes :videoDuration="videoDuration"/>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import VideoComponent from '@/components/VideoComponent.vue';
import CreateQuizzes from '@/components/CreateQuizzes.vue'

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
          label: 'Upload video'
      }],
      value: 1,
      inputVideo: '',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
      videoDuration: 0,
    }
  },
  methods: {
    submitVideo() {
      this.videoOptions.sources[0].src = this.videoUrl
      this.inputVideo = VideoComponent
    },
    getVideoDuration(value) {
      console.log(value)
      this.videoDuration = value
    }
  },
};
</script>
<style lang="scss">
.type-select {
  float: right;
}
.config-list {
  padding: 30px;
  li {
    margin-top: 10px;
    padding: 10px;
    border-bottom: 1px solid gray;
  }
  li input {
    margin-top: 10px;
  }
  .half-config {
    display: flex;
    justify-content: space-between;
  }
}
</style>