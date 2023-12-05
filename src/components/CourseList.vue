<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <h2 class="page-title">Course List</h2>
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
    <div :style="{ height: 5 * 10 + 'rem' }" style="display: flex;">
      <el-steps direction="vertical" :active="1" style="padding-top: 80px" finish-status="success">
        <el-step/>
        <el-step/>
        <el-step/>
        <el-step/>
        <el-step/>
      </el-steps>
      <div class="step-content">
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Title asdasdasdas asdasdsadasdasd sdasd</h2>
          <h4>Estimated time</h4>
          <h5>Status: Done / Skipped / In progress</h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Title 2</h2>
          <h4>Estimated time</h4>
          <h5>Status: Done / Skipped / In progress</h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Title 3</h2>
          <h4>Estimated time</h4>
          <h5>Status: Done / Skipped / In progress</h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Title 3</h2>
          <h4>Estimated time</h4>
          <h5>Status: Done / Skipped / In progress</h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Title 3</h2>
          <h4>Estimated time</h4>
          <h5>Status: Done / Skipped / In progress</h5>
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
          <h1><em>Title</em></h1>
          <h3>Some descriptions are written but not every one give enough f to read. Some descriptions are written but not every one give enough f to read.</h3>
          <h3>Title modules:</h3>
          <el-collapse v-model="activeNames" @change="handleChange" class="module-container">
            <el-collapse-item title="Consistency" name="1">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
              <div>
                Consistent within interface: all elements should be consistent, such
                as: design style, icons and texts, position of elements, etc.
              </div>
            </el-collapse-item>
            <el-collapse-item title="Feedback" name="2">
              <div>
                Operation feedback: enable the users to clearly perceive their
                operations by style updates and interactive effects;
              </div>
              <div>
                Visual feedback: reflect current state by updating or rearranging
                elements of the page.
              </div>
            </el-collapse-item>
            <el-collapse-item title="Efficiency" name="3">
              <div>
                Simplify the process: keep operating process simple and intuitive;
              </div>
              <div>
                Definite and clear: enunciate your intentions clearly so that the
                users can quickly understand and make decisions;
              </div>
              <div>
                Easy to identify: the interface should be straightforward, which helps
                the users to identify and frees them from memorizing and recalling.
              </div>
            </el-collapse-item>
            <el-collapse-item title="Controllability" name="4">
              <div>
                Decision making: giving advices about operations is acceptable, but do
                not make decisions for the users;
              </div>
              <div>
                Controlled consequences: users should be granted the freedom to
                operate, including canceling, aborting or terminating current
                operation.
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>


<style lang="scss">
.el-collapse-item__header {
  font-weight: bold;
}
</style>
<style lang="scss">
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
  border: 1px solid gray;
}
</style>
