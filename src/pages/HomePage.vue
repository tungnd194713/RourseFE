<!-- CourseList.vue -->
<template>
  <div class="course-list">
    <div class="roadmap-header">
      <div class="roadmap-title">
        <h1>The Route</h1>
      </div>
			<div class="roadmap-description">
				This site is an effort to create roadmaps, guides and other educational content to help guide people in picking up a path and guide their learnings.
			</div>
    </div>
    <div class="search-bar">
			<el-input v-model="searchingCareer" placeholder="Find your desired career category" />
		</div>
		<div class="category-container">
			<div class="card-grid">
				<div v-for="(item, index) in cardItems" :key="index" class="card" @click="redirectRoadmap(item.id)">
					<img :src="item.image" alt="Card Image" class="card-image">
					<div>{{ item.title }}</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { RoadMapService } from '@/services'

export default {
  data() {
    return {
      searchingCareer: '',
			cardItems: []
    };
  },

  async mounted() {
    this.getCategories()
  },

  methods: {
    async getCategories() {
      const { data } = await RoadMapService.fetchCategories();
      this.cardItems = [...data]
    },
    redirectRoadmap(categoryId) {
      this.$router.push({path: '/roadmaps', query: {career: categoryId}})
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
<style lang="scss" scoped>
.roadmap-header {
  padding: 1rem;
  margin-bottom: 1rem;
  .roadmap-title {
		text-align: center;
  }
	.roadmap-description {
		text-align: center;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
}

.category-container {
	margin-top: 2rem;
	.card-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .card {
      width: 200px;
      margin: 10px;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
    }
    .card-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
			border-radius: 15px;
			margin-bottom: 5px;
    }
}
.right-dialog {
  margin: 0 0 0 auto !important;
  height: 100vh;
}

.course-list {
  width: 100vh;
  margin: 0 auto;
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
