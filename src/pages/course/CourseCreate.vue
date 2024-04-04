<template>
  <div class="course-creation-page">
    <div class="form-container">
      <div class="form-title">Create a New Course</div>
      <el-form ref="courseForm" :model="course" label-width="100px">
        <el-form-item label="Course title" class="form-item" prop="title">
          <el-input v-model="course.title" placeholder="Enter course title"></el-input>
        </el-form-item>
        <el-form-item label="Description" class="form-item" prop="description">
          <el-input type="textarea" v-model="course.description" placeholder="Enter course description"></el-input>
        </el-form-item>
        <el-form-item label="Thumbnail Image" class="form-item" prop="thumbnail">
					<el-upload
						class="upload-demo"
						drag
						action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeUpload"
            :auto-upload="false"
            :file-list="fileList"
            :on-remove="handleRemove"
						:limit="1"
						list-type="picture">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
					</el-upload>
          <div v-if="course.thumbnail" class="thumbnail-preview">
            <img :src="course.thumbnail" alt="Thumbnail Preview" />
          </div>
        </el-form-item>
        <el-form-item label="Skill Tags" class="form-item" prop="tags">
          <div v-for="(tag, index) in course.tags" :key="index" class="tag-level-group">
            <el-select v-model="tag.skill" placeholder="Select tag" class="tag-select">
              <el-option v-for="tagItem in availableTags" :key="tagItem.id" :label="tagItem.name" :value="tagItem.id"></el-option>
            </el-select>
            <el-select v-model="tag.level" placeholder="Select level" class="level-select">
              <el-option v-for="level in levels" :key="level + Date.now()" :label="level" :value="level"></el-option>
            </el-select>
            <el-button type="danger" icon="el-icon-close" @click="removeTag(index)" class="remove-tag-btn"></el-button>
          </div>
          <el-button type="primary" icon="el-icon-plus" @click="addTag" class="add-tag-btn">Add Tag</el-button>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" class="submit-btn" @click="submitForm">Create Course</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { SubjectService, CourseService } from '@/services'

export default {
  data() {
    return {
      course: {
        title: '',
        description: '',
        thumbnail: 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg',
        tags: []
      },
      tagInput: '',
      fileList: [],
      allTags: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js', 'Python', 'Java', 'C#', 'SQL'],
      levels: ['Beginner', 'Intermediate', 'Advanced']
    };
  },
	computed: {
    availableTags() {
      return this.allTags.filter(tag => !this.course.tags.some(t => t.skill === tag.id));
    }
  },
	created() {
		this.getAllSubject()
	},
  methods: {
		async getAllSubject() {
			try {
				const { data } = await SubjectService.getAllSubject([]);
				this.allTags = data
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}
		},
    beforeUpload(file) {
      // Clear previous thumbnails
      this.course.thumbnail = null;

      // Validate file type
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPGorPNG) {
        this.$message.error('Only JPG or PNG files are allowed');
        return false;
      }

      // Set thumbnail in the course object
      this.course.thumbnail = 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg';

      return true; // Continue with the upload
    },

    handleRemove() {
      // Clear thumbnail when removed
      this.course.thumbnail = null;
    },
		addTag() {
      this.course.tags.push({ skill: '', level: '' });
    },
    removeTag(index) {
      this.course.tags.splice(index, 1);
    },
    async submitForm() {
      // Validate the form
      this.$refs.courseForm.validate(async (valid) => {
        if (valid) {
          try {
						const formData = new FormData();
						formData.append('title', this.course.title);
						formData.append('description', this.course.description);
						formData.append('thumbnail', 'https://careers.techvify.com.vn/wp-content/uploads/2022/07/vuejs-la-gi-2.jpg');
						formData.append(`tags`, JSON.stringify(this.course.tags));

						const response = await CourseService.createCourse(formData)
						if (response.status === 200) {
							// Redirect to create course modules
						}
					} catch (e) {
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
    resetForm() {
      // Reset form fields
      this.course.title = '';
      this.course.description = '';
      this.course.thumbnail = '';
      this.course.tags = [];
      this.tagInput = '';
      // Reset form validation
      this.$refs.courseForm.resetFields();
      // Clear uploaded file list
      this.fileList = [];
    }
  }
};
</script>

<style scoped>
.course-creation-page {
  font-family: Arial, sans-serif;
	min-height: 100vh;
  background-color: #f5f5f5;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.tag-level-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.tag-select, .level-select {
  flex: 1;
  margin-right: 10px;
}

.add-tag-btn {
  margin-top: 10px;
}

.remove-tag-btn {
  margin-left: 10px;
}

.thumbnail-preview {
  margin-top: 10px;
}

.thumbnail-preview img {
  max-width: 100%;
  max-height: 200px;
}
</style>