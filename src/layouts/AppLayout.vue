<template>
  <div>
		<AppSideBar />
		<router-view class="main-container"/>
  </div>
</template>
<script>
import AppSideBar from './AppSidebar'

export default {
	components: {
		AppSideBar,
	}
}
</script>
<style scoped>
.main-container {
	padding-left: 200px;
	padding-top: 82px;
}
</style>