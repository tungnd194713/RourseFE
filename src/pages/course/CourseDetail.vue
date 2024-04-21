<template>
  <div>
    <div class="course-detail-page">
			<!-- Course information section -->
			<div class="course-info">
				<h1>{{ course.title }}</h1>
				<p>{{ course.description }}</p>
				<el-divider></el-divider>
			</div>

			<!-- Course modules section -->
			<div class="course-modules">
				<h2>Course Modules</h2>
				<el-button type="primary" icon="el-icon-plus" @click="addModule">Add Module</el-button>
				<el-table :data="course.modules" border>
					<el-table-column label="Module Name" prop="name"></el-table-column>
					<el-table-column label="Actions" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="editModule(scope.row)">Edit</el-button>
							<el-button type="text" size="small" @click="deleteModule(scope.row)">Delete</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
  </div>
</template>

<script>
import { CourseService } from '@/services'
export default {
  data() {
    return {
      course: {
        name: 'Course 1',
        description: 'Description for Course 1',
        modules: [
          { id: 1, name: 'Module 1' },
          { id: 2, name: 'Module 2' },
          { id: 3, name: 'Module 3' }
        ]
      }
    };
  },
	created() {
		this.findCourseById()
	},
  methods: {
		async findCourseById() {
			try {
				const { data } = await CourseService.findCourseById(this.$route.params.id);
				this.course = data
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}
		},
    addModule() {
      // Redirect to the module creation page
      this.$router.push({ name: 'createModule' });
    },
    editModule(module) {
      // Redirect to the module edit page passing the module ID
      this.$router.push({ name: 'editModule', params: { moduleId: module.id }});
    },
    deleteModule(module) {
      this.$confirm('Are you sure you want to delete this module?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const index = this.course.modules.findIndex(m => m.id === module.id);
        if (index !== -1) {
          this.course.modules.splice(index, 1);
          this.$message.success('Module deleted successfully');
        }
      }).catch(() => {
        this.$message.info('Deletion canceled');
      });
    }
  }
};
</script>

<style scoped>
.course-detail-page {
	padding: 20px;
}

.course-info {
  margin-bottom: 20px;
}

.course-modules {
  margin-bottom: 20px;
}
</style>
