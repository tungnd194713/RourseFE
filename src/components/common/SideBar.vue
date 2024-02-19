<template>
  <div class="sidebar">
    <div class="logo">
      <!-- Logo goes here -->
      <div class="fs-28 fw-bold">TheRoute</div>
    </div>
    <div v-if="!$store.getters.accessToken" class="buttons">
      <el-button type="primary" @click="handleLogin">Login</el-button>
      <el-button type="primary" @click="handleRegister">Register</el-button>
    </div>
    <div v-else class="buttons">
      <el-button type="primary" @click="handleLogout">Logout</el-button>
      <el-button type="primary">Logo</el-button>
			<div class="d-flex align-items-center" style="margin-left: 16px">
				{{ $store.getters?.authUser?.name }}
			</div>
			<div></div>
    </div>
  </div>
</template>

<script>
import {
  ACTION_USER_LOGOUT
} from '@/stores/auth_users/actions'

export default {
  methods: {
    handleLogin() {
      // Handle login functionality
    },
    handleRegister() {
      // Handle register functionality
    },
		handleLogout() {
			this.$store.dispatch(ACTION_USER_LOGOUT).then(res => {
				console.log(res)
				this.$router.push({
					path: '/'
				}).catch(() => {})
				this.$router.go(0)
			})
		}
  }
};
</script>

<style scoped>
/* Sidebar styles go here */
.sidebar {
  height: 100%;
  background-color: #304156;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.logo {
  padding: 20px;
}

.buttons {
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.buttons .el-button {
  margin-left: 10px;
}
</style>
