<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <div class="roadmap-header">
      <div class="roadmap-title">
        <h1>Here is roadmap title</h1>
        <button>40%</button>
      </div>
      <h4><em>Description: </em>Here is roadmap title</h4>
      <h4><em>Level: </em>Intermediate</h4>
      <h5 style="cursor: pointer" @click="() => $router.push({ path: '/course/module' })">Current module: How to pass test without studying</h5>
    </div>
    <div :style="{ height: 5 * 10 + 'rem' }" style="display: flex; justify-content: center;">
      <el-steps direction="vertical" :active="2" style="padding-top: 80px" finish-status="success">
        <el-step/>
        <el-step/>
        <el-step/>
        <el-step/>
        <el-step/>
      </el-steps>
      <div class="step-content">
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Basic web dev</h2>
          <h4>Time: 2023-11-12 -> 2023-12-01</h4>
          <h5>Status: <span style="color: green">Finished</span></h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Server building</h2>
          <h4>Time: 2023-12-01 -> 2023-12-03</h4>
          <h5>Status: <span style="color: green">Finished</span></h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Network configuration</h2>
          <h4 style="display: flex; justify-content: space-between">
            <div>Time: 2023-11-12</div>
            <div style="cursor: pointer; color: gray; font-size: .8rem">I already know this</div>
          </h4>
          <h5>Status: <span style="color: yellow">In progress</span></h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Load balancing</h2>
          <h4 style="display: flex; justify-content: space-between">
            <div>Time: 2023-11-12</div>
            <div style="cursor: pointer; color: gray; font-size: .8rem">I already know this</div>
          </h4>
          <h5>Status: Unknown</h5>
        </div>
        <div class="step-content-item">
          <h2 @click="dialogVisible = true">Network security</h2>
          <h4 style="display: flex; justify-content: space-between">
            <div>Time: 2023-11-12</div>
            <div style="cursor: pointer; color: gray; font-size: .8rem">I already know this</div>
          </h4>
          <h5>Status: Unknown</h5>
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
          <div style="display: flex; justify-content: space-between; align-items: center">
            <h1><em>Title</em></h1>
            <div style="color: green">Finished</div>
          </div>
          <h3>Some descriptions are written but not every one give enough f to read. Some descriptions are written but not every one give enough f to read.</h3>
          <h3>Title modules:</h3>
          <el-collapse v-model="activeNames" @change="handleChange" class="module-container">
            <el-collapse-item title="1: HTML" name="1" class="current-module">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
              <div>
                Consistent within interface: all elements should be consistent, such
                as: design style, icons and texts, position of elements, etc.
              </div>
              <router-link :to="{ path: '/course/module' }">To module > </router-link>
            </el-collapse-item>
            <el-collapse-item title="2: CSS" name="2">
              <div>
                Operation feedback: enable the users to clearly perceive their
                operations by style updates and interactive effects;
              </div>
              <div>
                Visual feedback: reflect current state by updating or rearranging
                elements of the page.
              </div>
              <div class="alert">Complete pre-order module to attend this module</div>
            </el-collapse-item>
            <el-collapse-item title="3: Basic JS" name="3">
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
            <el-collapse-item title="4: Intermediate JS" name="4">
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
.module-container {
  .el-collapse-item {
    .el-collapse-item__header {
      padding: 1rem;
    }
    .el-collapse-item__content {
      padding: 1.2rem;
    }
  }

  a {
    text-decoration: none;
    color: green;
  }

  .alert {
    color: red;
  }

  .current-module .el-collapse-item__header {
    background: #ffffd6;
  }
}
</style>
<style lang="scss">
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
      background: #d5e741;
      color: gray;
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
</style>
