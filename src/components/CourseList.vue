<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <div class="feedback">
      <div class="row">
          <div class="col-xs-4">
              <div class="wrapper">
                  <span class="title">Career</span>
                  <el-select 
                      v-model="categoryChoice"
                      class="full-width">
                      <el-option 
                          v-for="opt in categoryList" 
                          :value="opt.value" 
                          :key="opt.value"
                          :label="opt.text">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <div class="col-xs-8">
              <div class="wrapper">
                  <span class="title">Goal</span>
                  <el-select 
                      v-model="specCategoryChoice"
                      class="full-width">
                      <el-option 
                          v-for="opt in specCategoryList" 
                          :value="opt.value" 
                          :key="opt.value"
                          :label="opt.text">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <div class="col-xs-8">
              <div class="wrapper">
                  <span class="title">Mastery</span>
                  <el-select 
                      v-model="masteryChoice"
                      class="full-width">
                      <el-option 
                          v-for="opt in masteryList" 
                          :value="opt.value" 
                          :key="opt.value"
                          :label="opt.text">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <div class="col-xs-8">
              <div class="wrapper">
                  <span class="title">Skill set</span>
                  <el-select 
                      v-model="skillSet"
                      multiple
                      class="full-width">
                      <el-option 
                          v-for="opt in skillSetList" 
                          :value="opt.value" 
                          :key="opt.value"
                          :label="opt.text">
                      </el-option>
                  </el-select>
              </div>
          </div>
      </div>
  </div>
    <h2 class="page-title">Your route</h2>
    <!-- <el-row>
      <el-col :span="6" v-for="course in courses" :key="course.id">
        <el-card class="course-card">
          <div class="course-thumbnail">
            <el-image :src="course.thumbnail" fit="cover" alt="Course Thumbnail"></el-image>
          </div>
          <div class="course-info">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-description">{{ course.description }}</p>
            <p class="course-instructor">{{ course.instructor }}</p>
            <br>
            <p class="course-duration">{{ course.duration }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
    <div class="roadmap-header">
      <div class="roadmap-title">
        <h1>Software Development Roadmap</h1>
        <button>Apply</button>
      </div>
      <h4><em>Description: </em>Software Development</h4>
      <h4><em>Level: </em>Intermediate</h4>
    </div>
    <div :style="{ height: roadmap.milestones?.length * 9 + 'rem' }" style="display: flex; justify-content: center;">
      <el-steps direction="vertical" :active="0" style="padding-top: 80px" finish-status="success">
        <el-step v-for="(milestone, index) in roadmap.milestones" :key="index"/>
      </el-steps>
      <div class="step-content">
        <div v-for="(milestone, index) in roadmap.milestones" :key="index" class="step-content-item">
          <h2 @click="openDialog(index)">{{ milestone.title }}</h2>
          <h4>Estimated time: {{ milestone.estimated_time }} hours</h4>
          <h5>Number of modules: {{ milestone.modules?.length }}</h5>
        </div>
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :close-on-press-escape="false"
        width="400px"
        :custom-class="'right-dialog'"
      >
        <!-- Your dialog content goes here -->
        <div>
          <h1><em>{{ dialogMilestone.title }}</em></h1>
          <h3>Some descriptions are written but not every one give enough f to read. Some descriptions are written but not every one give enough f to read.</h3>
          <h3>Title modules:</h3>
          <el-collapse v-model="activeNames" @change="handleChange" class="module-container">
            <el-collapse-item v-for="(mileModule, index) in dialogMilestone.modules" :key="index" :title="`${index + 1}: ${mileModule.name}`" :name="index">
              <div>
                {{ mileModule.description }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { RoadMapService } from '@/services'

export default {
  data() {
    return {
      categoryChoice: '1',
      specCategoryChoice: '1',
      categoryList: [
          { text: 'Information Technology (IT)', value: '1' },
          { text: 'Healthcare', value: '2' },
          { text: 'Finance', value: '3' },
          { text: 'Engineering', value: '4' },
          { text: 'Education', value: '5' },
          { text: 'Business Management', value: '6' },
          { text: 'Marketing and Advertising', value: '7' },
          { text: 'Arts and Entertainment', value: '8' },
          { text: 'Law and Legal Services', value: '9' },
          { text: 'Science and Research', value: '10' },
          { text: 'Sales and Customer Service', value: '11' },
          { text: 'Humanitarian and Nonprofit Work', value: '12' },
      ],
      specCategoryList: [
        { text: 'Software Development', value: '1' },
        { text: 'Data Analysis and Analytics', value: '2' },
        { text: 'Network Engineering', value: '3' },
        { text: 'Cybersecurity', value: '4' },
        { text: 'Database Administration', value: '5' },
        { text: 'Cloud Computing', value: '6' },
        { text: 'Web Development', value: '7' },
        { text: 'Mobile App Development', value: '8' },
        { text: 'Artificial Intelligence and Machine Learning', value: '9' },
        { text: 'DevOps and Continuous Integration/Continuous Deployment (CI/CD)', value: '10' },
      ],
      masteryChoice: '1',
      masteryList: [
        { text: 'Beginner', value: '1' },
        { text: 'Intermediate', value: '2' },
        { text: 'Advanced', value: '3' },
      ],
      skillSet: [],
      skillSetList: [
        { text: 'Programming Languages (e.g., Python, Java, C++)', value: '1' },
        { text: 'Database Management (e.g., SQL, NoSQL)', value: '2' },
        { text: 'Operating Systems (e.g., Linux, Windows)', value: '3' ,},
        { text: 'Networking Protocols and Technologies', value: '4' },
        { text: 'Web Development (e.g., HTML/CSS, JavaScript)', value: '5' },
        { text: 'Cybersecurity Practices and Tools', value: '6' },
        { text: 'Cloud Computing Platforms (e.g., AWS, Azure)', value: '7' },
        { text: 'Data Analysis and Visualization', value: '8' },
        { text: 'Version Control Systems (e.g., Git)', value: '9' },
        { text: 'Agile Methodologies (e.g., Scrum, Kanban)', value: '10' },
      ],
      dialogVisible: false,
      activeNames: [],
      courses: [
        {
          id: 1,
          title: 'Introduction to Vue.js',
          description: 'Learn the basics of Vue.js and build interactive web applications.',
          instructor: 'John Doe',
          duration: '4 weeks',
          thumbnail: 'https://i0.wp.com/css-tricks.com/wp-content/uploads/2017/01/vue-1.jpg?ssl=1', // Replace with the actual URL of the thumbnail image.
          module: 5,
          moduled: 5,
          isCompleted: true,
        },
        {
          id: 2,
          title: 'JavaScript Fundamentals',
          description: 'Master the core concepts of JavaScript and modern web development.',
          instructor: 'Jane Smith',
          duration: '6 weeks',
          thumbnail: 'https://m.media-amazon.com/images/I/31b4PMOj80L._SY346_.jpg', // Replace with the actual URL of the thumbnail image.
        },
        {
          id: 3,
          title: 'Front-end Web Design',
          description: 'Design beautiful and responsive websites using HTML, CSS, and JavaScript.',
          instructor: 'David Johnson',
          duration: '5 weeks',
          thumbnail: 'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1284736/op-Ten-Front-End-Design-Rules-For-Developers_Luke-Social-33a3a7c9b759fdaa22973906070f8065.png', // Replace with the actual URL of the thumbnail image.
          module: 6,
          moduled: 2,
          isCompleted: false,
        },
        {
          id: 4,
          title: 'Node.js and Express.js',
          description: 'Build scalable and efficient server-side applications with Node.js and Express.js.',
          instructor: 'Emily Brown',
          duration: '8 weeks',
          thumbnail: 'https://caodang.fpt.edu.vn/wp-content/uploads/a-9.png', // Replace with the actual URL of the thumbnail image.
        },
      ],
      roadmap: {},
      dialogMilestone: {},
    };
  },
  async mounted() {
    await this.getRoadmap()
  },
  methods: {
    async getRoadmap() {
      const { data } = await RoadMapService.findRoadMap();
      console.log(data)
      this.roadmap = { ...data }
    },

    openDialog(index) {
      this.dialogMilestone = { ...this.roadmap.milestones[index] }
      this.dialogVisible = true
    }
  }
};
</script>


<style lang="scss">
.el-collapse-item__header {
  font-weight: bold;
}
.module-container {
  .el-collapse-item {
    .el-collapse-item__header {
      padding: 1rem;
    }
    .el-collapse-item__content {
      padding: 1.2rem;
    }
  }
}
</style>
<style lang="scss">
.row {
  display: flex;
  justify-content: space-between;
}
.roadmap-header {
  border: 2px solid #EBEEF5;
  padding: 1rem;
  margin-bottom: 1rem;
  .roadmap-title {
    display: flex;
    justify-content: space-between;
    button {
      margin: 1rem 0;
      padding: 0 1rem;
      border: none;
      background: #6dbb6d;
      color: white;
      font-weight: bold;
      border-radius: .2rem;
      font-size: 1rem;
      cursor: pointer;
    }
  }
}
.right-dialog {
  margin: 0 0 0 auto !important;
  height: 100vh;
}

.course-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

.el-row {
  margin: 0 -12px;
}

.el-col {
  padding: 12px;
}

.course-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-thumbnail {
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.course-info {
  padding: 20px;
}

.course-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.course-description {
  color: #666;
  margin-bottom: 10px;
}

.course-instructor {
  color: #888;
}

.course-duration {
  color: #888;
}

.step-content {
  margin-left: 2rem;
  h2 {
    cursor: pointer;
  }
}

.step-content-item {
  height: 136px;
  border: 3px solid green;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
}

.module-container {
  border: 1px solid #EBEEF5;
}
.title {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #061325;
}
.feedback {
    padding-top: 20px;

    .wrapper {
        position: relative;
        padding-top: 10px;
        margin-right: 1rem;

        .title {
            position: absolute;
            background-color: #fff;
            z-index: 1;
            left: 20px;
            bottom: 30px;
            color: #072856;
            font-size: 12px;
        }

        .title-textarea {
            position: absolute;
            background-color: #fff;
            z-index: 1;
            left: 20px;
            top: 2px;
            color: #072856;
            font-size: 12px;
            padding: 0 10px;
            font-weight: 500;
        }
    }
    .description {
        margin-top: 20px;
    }    

    .button {
        margin-top: 20px;

        .background {
            background: linear-gradient(263.55deg, #2EAC4A 17.14%, #82D9AF 124.02%);
            border-radius: 5px;
            color: #fff;
        }
    }
    .el-input {
    .el-input__inner {
      border: 1px solid #0E0E0E;
      border-radius: 4px;
      font-size: 13px;
      height: 45px;
      color: #072856;
    }
  }
}

        
</style>
