<template>
	<!-- Sidebar -->
	<el-aside width="200px" style="background-color: #f0f2f5">
		<el-menu v-if="$store.getters?.authUser?.role === 'admin'" default-active="1" class="el-menu-vertical-demo">
			<el-menu-item index="1">Dashboard</el-menu-item>
			<el-submenu index="2">
				<template slot="title">Kỹ thuật</template>
				<el-menu-item index="2-1" @click="$router.push({name: 'CertificateList'})">Bằng cấp</el-menu-item>
				<el-menu-item index="2-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="2-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">Học liệu</template>
				<el-menu-item index="2-1" @click="$router.push({name: 'ListCourse'})">Danh sách khóa học</el-menu-item>
				<!-- <el-menu-item index="2-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="2-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item> -->
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">Người học</template>
				<!-- <el-menu-item index="2-1" @click="$router.push({name: 'CertificateList'})">Bằng cấp</el-menu-item>
				<el-menu-item index="2-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="2-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item> -->
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">Tuyển dụng</template>
				<el-menu-item index="5-1" @click="$router.push({name: 'EducationRecruitment'})">Đăng kí đào tạo</el-menu-item>
				<!-- <el-menu-item index="5-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="5-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item> -->
			</el-submenu>
		</el-menu>
		<el-menu v-if="$store.getters?.authUser?.role === 'mentor'" default-active="1" class="el-menu-vertical-demo">
			<el-menu-item index="1" @click="$router.push({name: 'MentorDashboard'})">Ca làm việc</el-menu-item>
			<el-menu-item index="2" @click="$router.push({name: 'MentorShiftList'})">Khóa học phụ trách</el-menu-item>
			<el-menu-item index="3" @click="$router.push({name: 'MentorProfile'})">Hồ sơ</el-menu-item>
			<el-menu-item index="4" @click="$router.push({name: 'MentorRatingList'})">Đánh giá mentor</el-menu-item>
		</el-menu>
	</el-aside>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  /* Add custom styling here */
  .el-menu-vertical-demo {
    height: 100%;
  }
	.el-aside {
		position: fixed;
		padding-top: 82px;
		height: 100%;
	}
</style>