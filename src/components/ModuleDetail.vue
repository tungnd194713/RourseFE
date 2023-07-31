<template>
  <div class="course-detail">
    <div class="course-header">
      <img class="course-cover" :src="course.coverImage" alt="Course Cover" />
      <h1>{{ course.title }}</h1>
      <p class="course-description">{{ course.description }}</p>
    </div>

    <h2>Module List</h2>
    <ul class="module-list">
      <li v-for="module in course.modules" :key="module.id" class="module-item">
        <div class="module-thumbnail">
          <img :src="module.thumbnail" alt="Module Thumbnail" />
        </div>
        <div class="module-details">
          <el-progress
            :percentage="module.progress"
            status="success"
            :color="progressColor(module.progress)"
          ></el-progress>
          <h3>{{ module.title }}</h3>
          <p class="module-description">{{ module.description }}</p>
          <div class="module-info">
            <el-row>
              <el-col :span="6">
                <span>Quizzes taken: </span>
                <span>{{1}}</span>
              </el-col>
              <el-col :span="6">
                <span>Exam: </span>
                <span>100/100</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CourseDetail",
  props: {
    courseId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      course: {
        title: "",
        description: "",
        coverImage: "", // Add the path to the course cover image here
        modules: [
          {
            id: 1,
            title: "Module 1",
            description:
              "This is the first module of the course. It covers the basics of the topic.",
            thumbnail: "/assets/images/module1_thumbnail.jpg", // Replace with the actual path to the first module's thumbnail image
            progress: 100, // Replace with the user's progress for Module 1 (a number between 0 and 100)
          },
          {
            id: 2,
            title: "Module 2",
            description:
              "In this module, you will learn about advanced concepts and practical examples.",
            thumbnail: "/assets/images/module2_thumbnail.jpg", // Replace with the actual path to the second module's thumbnail image
            progress: 100, // Replace with the user's progress for Module 2 (a number between 0 and 100)
          },
          {
            id: 3,
            title: "Module 3",
            description:
              "The final module focuses on real-world projects and hands-on exercises.",
            thumbnail: "/assets/images/module3_thumbnail.jpg", // Replace with the actual path to the third module's thumbnail image
            progress: 20, // Replace with the user's progress for Module 3 (a number between 0 and 100)
          },
          // ... (other module objects with progress properties)
        ],
      },
    };
  },
  mounted() {
    // In a real application, you would fetch the course data from an API based on courseId
    // For demonstration purposes, we'll use a mock data here.
    this.fetchCourseDetail();
  },
  methods: {
    fetchCourseDetail() {
      // Replace this with actual API call to fetch course details
      // For demonstration, we use a mock data
      const mockCourseData = {
        id: 1,
        title: "Sample Course",
        description:
          "This is a sample course that covers a wide range of topics in an interactive and engaging way.",
        coverImage: "/assets/images/course_cover.jpg", // Replace with the actual path to the course cover image
        modules: [
          {
            id: 1,
            title: "Module 1",
            description:
              "This is the first module of the course. It covers the basics of the topic.",
            thumbnail: "/assets/images/module1_thumbnail.jpg", // Replace with the actual path to the first module's thumbnail image
            progress: 100, // Replace with the user's progress for Module 1 (a number between 0 and 100)
          },
          {
            id: 2,
            title: "Module 2",
            description:
              "In this module, you will learn about advanced concepts and practical examples.",
            thumbnail: "/assets/images/module2_thumbnail.jpg", // Replace with the actual path to the second module's thumbnail image
            progress: 100, // Replace with the user's progress for Module 2 (a number between 0 and 100)
          },
          {
            id: 3,
            title: "Module 3",
            description:
              "The final module focuses on real-world projects and hands-on exercises.",
            thumbnail: "/assets/images/module3_thumbnail.jpg", // Replace with the actual path to the third module's thumbnail image
            progress: 20, // Replace with the user's progress for Module 3 (a number between 0 and 100)
          },
          // ... (other module objects with progress properties)
        ],
      };

      this.course = mockCourseData;
    },
    progressColor(progress) {
      // Map progress percentage to a color gradient
      const hue = (1 - progress / 100) * 120;
      return `hsl(${hue}, 100%, 50%)`;
    },
  },
};
</script>

<style>
/* Updated CSS with a colorful theme */
.course-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.course-header {
  text-align: center;
  margin-bottom: 30px;
}

.course-cover {
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

.course-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

h2 {
  font-size: 22px;
  margin: 30px 0 15px;
  color: #333;
}

.module-list {
  list-style: none;
  padding: 0;
}

.module-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.module-thumbnail {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 5px 0 0 5px;
}

.module-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.module-details {
  margin-left: 20px;
  flex: 1;
}

h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
}

.module-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
}

.module-info {
    color: gray;
    font-size: 14px;
}

.el-progress__text {
  color: #666;
}
</style>
