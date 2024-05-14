<template>
  <div>
		<div class="mentor-ratings px-4 py-4">
			<h2 class="title">Danh sách đánh giá mentor</h2>
			<div class="average-rating">
				<h3>Đánh giá trung bình:</h3>
				<el-rate v-model="averageRating" :disabled="true" allow-half show-text></el-rate>
			</div>
			<div class="average-rating rating-count d-flex">
				<h3 class="mx-0 my-0">Số lượt đánh giá:</h3>
				<div>{{ ratings.length }}</div>
			</div>
			<el-divider></el-divider>
			<el-table empty-text="Không có dữ liệu" :data="ratings" border>
				<el-table-column label="Người học">
					<template slot-scope="scope">
						{{ scope.row.user.name }}
					</template>
				</el-table-column>
				<el-table-column label="Khóa học">
					<template slot-scope="scope">
						{{ scope.row.course.title }}
					</template>
				</el-table-column>
				<el-table-column prop="rating_star" label="Rating" width="100">
					<template slot-scope="scope">
						<el-rate :value="scope.row.rating_star" disabled allow-half show-text></el-rate>
					</template>
				</el-table-column>
				<el-table-column prop="rating_content" label="Content">
					<template slot-scope="scope">
						{{ scope.row.rating_content }}
					</template>
				</el-table-column>
				<el-table-column prop="createdAt" label="Ngày đánh giá" width="150">
					<template slot-scope="scope">
						{{ formatDate(scope.row.createdAt) }}
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { MentorService } from '@/services'

export default {
  data() {
    return {
      ratings: [],
      averageRating: 0
    };
  },
  mounted() {
    // Fetch mentor ratings for the logged-in mentor
    this.fetchMentorRatings();
  },
  methods: {
    async fetchMentorRatings() {
      try {
        // Make an HTTP GET request to fetch mentor ratings
        const { data } = await MentorService.getRatingList({}); // Adjust the endpoint URL according to your backend API
        this.ratings = data.results; // Assuming the response contains an array of mentor ratings
        
        // Calculate average rating
        if (this.ratings.length > 0) {
          const sum = this.ratings.reduce((total, rating) => total + rating.rating_star, 0);
          this.averageRating = sum / this.ratings.length;
        }
      } catch (error) {
        console.error('Error fetching mentor ratings:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.mentor-ratings {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.average-rating {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.average-rating h3 {
  margin-right: 10px;
  font-size: 18px;
}

.el-table__body-wrapper {
  max-height: 400px;
  overflow-y: auto;
}

.el-rate__text {
  font-size: 14px;
}

.el-table th,
.el-table td {
  font-size: 14px;
}
</style>
