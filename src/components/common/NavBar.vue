<template>
  <div class="sidebar">
    <div class="logo">
      <!-- Logo goes here -->
      <div class="fs-28 fw-bold">TheRoute</div>
    </div>
    <div v-if="!$store.getters.accessToken" class="buttons">
      <el-button type="primary" @click="showLoginModal">Login</el-button>
      <el-button type="primary" @click="handleRegister">Register</el-button>
    </div>
    <div v-else class="buttons">
      <el-button type="primary" @click="handleLogout">Logout</el-button>
      <el-button type="primary" @click="$router.push({path: '/applied-roadmaps'})">Your route</el-button>
			<div class="d-flex align-items-center" style="margin-left: 16px">
				{{ $store.getters?.authUser?.name }}
			</div>
			<div></div>
    </div>
		<login-modal ref="loginModal"></login-modal>
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";

import {
  ACTION_USER_LOGOUT
} from '@/stores/auth_users/actions'

export default {
	components: {
    LoginModal
  },
  methods: {
    handleRegister() {
      // Handle register functionality
    },
		showLoginModal() {
      this.$refs.loginModal.visible = true;
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
  background-color: #304156;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
	position: fixed;
	z-index: 99;
	width: 100%;
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
