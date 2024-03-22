<template>
	<!-- Sidebar -->
	<el-aside width="200px" style="background-color: #f0f2f5">
		<el-menu default-active="1" class="el-menu-vertical-demo">
			<el-menu-item index="1">Dashboard</el-menu-item>
			<el-submenu index="2">
				<template slot="title">Kỹ thuật</template>
				<el-menu-item index="2-1" @click="$router.push({name: 'CertificateList'})">Bằng cấp</el-menu-item>
				<el-menu-item index="2-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="2-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">Học liệu</template>
				<!-- <el-menu-item index="2-1" @click="$router.push({name: 'CertificateList'})">Bằng cấp</el-menu-item>
				<el-menu-item index="2-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="2-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item> -->
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">Người học</template>
				<!-- <el-menu-item index="2-1" @click="$router.push({name: 'CertificateList'})">Bằng cấp</el-menu-item>
				<el-menu-item index="2-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="2-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item> -->
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">Nhà tuyển dụng</template>
				<!-- <el-menu-item index="2-1" @click="$router.push({name: 'CertificateList'})">Bằng cấp</el-menu-item>
				<el-menu-item index="2-2" @click="$router.push({name: 'MajorList'})">Chuyên ngành</el-menu-item>
				<el-menu-item index="2-3" @click="$router.push({name: 'CollegeList'})">Đại học</el-menu-item> -->
			</el-submenu>
		</el-menu>
	</el-aside>
</template>

<script>
  export default {
    // Add your component logic here
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
	}
</style>