<template>
  <el-dialog
    title="Login"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="loginForm" :model="loginForm" label-width="100px">
      <el-form-item label="Email" prop="email">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">Cancel</el-button>
      <el-button type="primary" @click="handleSubmit('loginForm')">Login</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ACTION_LOGIN_USER } from "@/stores/auth_users/actions"

export default {
  data() {
    return {
      visible: false,
      loginForm: {
        email: '',
        password: ''
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$refs.loginForm.resetFields();
      done();
    },
    handleSubmit() {
      const data = {
				password: this.loginForm.password,
				email: this.loginForm.email,
			}
			this.$store.dispatch(ACTION_LOGIN_USER, data).then(() => {
				this.$router.go(0)
			}).catch(err => {
				this.$toast.error(err.data.message)
			})
    }
  }
};
</script>

<style>
/* Add custom styles for the modal if needed */
</style>