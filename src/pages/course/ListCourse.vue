<template>
  <div class="course-list-page">
    <div class="course-container px-4 py-4">
		<h1>Danh sách khóa học</h1>
			<div class="course-cards">
				<div class="course-card" v-for="(course, index) in courses" :key="index">
					<div class="thumbnail-wrapper">
						<div class="course-thumbnail">
							<img :src="course.thumbnail" alt="Course Thumbnail" />
						</div>
					</div>
					<div class="course-details">
						<h3>
							<router-link :to="{name: 'CourseDetail', params: {id: course.id}}">{{ course.title || 'This is course name' }}</router-link>
						</h3>
						<p>{{ course.description }}</p>
						<div class="tag-list">
							<el-tag v-for="(tag, tagIndex) in course.skill_tags" :key="tagIndex">{{ tag?.skill?.name }} - {{ tag.level }}</el-tag>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { CourseService } from '@/services'
export default {
  data() {
    return {
      courses: [] // Array to hold the list of courses
    };
  },
  created() {
    // Fetch the list of courses from the server or use any other method to populate the courses array
    // For demonstration, let's populate some dummy data
		this.getCourses()
    this.courses = [
      {
        name: 'Course 1',
        description: 'Description for Course 1',
        thumbnail: 'https://via.placeholder.com/150',
        tags: [{ name: 'HTML', level: 'Beginner' }, { name: 'CSS', level: 'Intermediate' }]
      },
      {
        name: 'Course 2',
        description: 'Description for Course 2',
        thumbnail: 'https://via.placeholder.com/150',
        tags: [{ name: 'JavaScript', level: 'Advanced' }, { name: 'Vue.js', level: 'Intermediate' }]
      },
      // Add more courses as needed
    ];
  },
	methods: {
		async getCourses() {
			try {
				const { data } = await CourseService.getCourses({});
				this.courses = data.results
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}

		}
	}
};
</script>

<style scoped>
.course-list-page {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.course-cards {
  display: flex;
  flex-wrap: wrap;
	padding: 20px;
}

.course-card {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.thumbnail-wrapper {
  flex: 0 0 150px; /* Set width of thumbnail wrapper */
}

.course-thumbnail {
  height: 150px;
  overflow: hidden;
}

.course-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-details {
  flex: 1;
  padding: 20px;
}

.tag-list {
  margin-top: 10px;
}
</style>
