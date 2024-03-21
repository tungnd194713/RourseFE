<!-- CourseList.vue -->
<template>
  <div>
		<div class="banner-container">
			<div class="banner">
				<img src="https://dlcorp.com.vn/wp-content/uploads/2021/09/Ba%CC%81ch-Khoa-600x301.png" alt="">
			</div>
			<div class="banner-content-box">
				<h1 class="fw-bold">Gợi ý lộ trình</h1>
				<p>Có vẻ bạn chưa xác định lộ trình cụ thể, hãy tham gia khảo sát để chúng tôi giúp bạn xây dựng lộ trình</p>
				<el-button type="primary">Tham gia khảo sát</el-button>
			</div>
		</div>
    <div class="roadmap-header">
      <div class="roadmap-title">
        <h1>The Route</h1>
      </div>
			<div class="roadmap-description">
				This site is an effort to create roadmaps, guides and other educational content to help guide people in picking up a path and guide their learnings.
			</div>
    </div>
    <!-- <div class="search-bar">
			<el-input v-model="searchingCareer" placeholder="Find your desired career category" />
		</div> -->
		<div class="category-container">
			<h2 class="fw-bold">Top career fields</h2>
			<swiper
				:options="swiperOptions"
				@swiper="onSwiper"
				@slideChange="onSlideChange"
			>
				<template #wrapper-start><span>Wrapper start</span></template>
				<swiper-slide v-for="(item, index) in cardItems" :key="index" @click="redirectRoadmap(item.id)">
					<div class="card">
						<img :src="item.image" alt="Card Image" class="card-image">
						<div>{{ item.title }}</div>
					</div>
				</swiper-slide>
				<div class="swiper-button-prev" slot="button-prev"></div>
				<div class="swiper-button-next" slot="button-next"></div>
				<!-- <div class="swiper-pagination"  slot="pagination"></div> -->
				<!-- Add more swiper-slide components as needed -->
			</swiper>
		</div>
  </div>
</template>

<script>
import { RoadMapService } from '@/services'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
	components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive
  },

  data() {
    return {
      searchingCareer: '',
			cardItems: [],
			swiperOptions: {
				slidesPerView: 3,
				loop: true,
				pagination: {
					el: '.swiper-pagination'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			}
    };
  },

  async mounted() {
    this.getCategories()
  },

  methods: {
		onSwiper(swiper) {
			console.log(swiper);
		},
		onSlideChange() {
			console.log('slide change');
		},
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
.swiper-slide {
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
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
.banner-container {
	position: relative;
	width: 100%;
	height: 30rem;
	.banner {
		position: relative;
		width: 100%;
		height: 100%;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.banner-content-box {
		position: absolute;
		left: 5rem;
		top: 7rem;
		background: white;
		padding: 1rem 2rem;
		max-width: 30rem;
		box-shadow: 0 2px 4px rgba(0,0,0,.2), 0 4px 12px rgba(0,0,0,.2);
	}
}
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
