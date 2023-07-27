<template>
  <div class="instructor-dashboard">
    <div class="dashboard-title">This is instructor dashboard</div>
    <div class="dashboard-container">
      <el-tabs v-model="currentTab" type="card" tab-position="top">
        <el-tab-pane
          v-for="item in panes"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        >
          <div v-if="item.key === 'courses'" class="course-container">
            <el-row
              type="flex"
              v-for="course in courses"
              :key="course.id"
              class="course-list"
              :gutter="20"
            >
              <el-col :span="3" :offset="0" class="course-thumbnail">
                <img
                  :src="course.thumbnail"
                  :alt="`thumbnail-course-${course.id}`"
                />
              </el-col>
              <el-col :span="9" :offset="0" class="course-info">
                <h2>{{ course.title }}</h2>
                <h3>{{ course.instructor }}</h3>
                <p>{{ course.description }}</p>
              </el-col>
              <el-col :span="12" :offset="0" class="course-statistic">
                <div class="statistic-title">Applied:</div>
                <div class="statistic">{{ course.applied }}</div>
                <div class="statistic-title">Completed:</div>
                <div class="statistic">{{ course.completed }}</div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructorDashboard",
  data() {
    return {
      currentTab: "courses",
      panes: [
        {
          key: "courses",
          label: "Courses",
        },
        {
          key: "discussions",
          label: "Discussions",
        },
      ],
      courses: [
        {
          id: 1,
          title: "How to get a girl",
          instructor: "Me",
          description: "This is hoy to get a b",
          thumbnail: "https://picsum.photos/id/133/200/300",
          applied: 10,
          completed: 5,
        },
        {
          id: 2,
          title: "Machine Sleeping",
          instructor: "Me",
          description: "This is Deep Sleeping Courses",
          thumbnail: "https://picsum.photos/id/128/200/300",
          applied: 6,
          completed: 5,
        },
        {
          id: 3,
          title: "Artifical Sweeping",
          instructor: "Me",
          description: "This is Deep Some Courses",
          thumbnail: "https://picsum.photos/id/28/200/300",
          applied: 2,
          completed: 0,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.instructor-dashboard {
  .dashboard-title {
    font-weight: bold;
    font-size: 56px;
    padding: 5rem 10rem;
  }
  .dashboard-container {
    padding: 1rem 10rem;
    h2,
    h3 {
      margin: 0;
    }
    .el-tab-pane {
      border: 1px solid gray;
    }
    .course-list {
      padding: 1rem;
      border: 1px solid gray;
    }
    .course-thumbnail {
      img {
        width: 150px;
        height: 150px;
        object-fit: cover;
      }
    }
    .course-info {
        border-right: 1px solid gray;
        position: relative;
        h2 {
            margin-bottom: 20px;
        }
        h3 {
            color: gray;
            font-weight: 500;
            margin-bottom: 30px;
        }
        p {

        }
    }
  }
}
</style>