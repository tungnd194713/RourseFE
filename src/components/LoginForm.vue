<template>
  <div class="register-form">
    <h2 class="form-title">Create an Account</h2>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" class="form">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UserService } from '@/services'

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            delete this.form.confirmPassword
            const { data } = await UserService.login(this.form);
            localStorage.setItem('accessToken', data.tokens.access.token);
            localStorage.setItem('accessTokenExpires', data.tokens.access.expires);
            localStorage.setItem('refreshToken', data.tokens.refresh.token);
            localStorage.setItem('refreshTokenExpires', data.tokens.refresh.expires);
            localStorage.setItem('user', JSON.stringify(data.user));
            this.$router.push({path: '/'});
          } catch (e) {
            alert(e);
          }
          // Form is valid, you can perform registration logic here
          // For example, you can submit the form data to a backend API
          // and handle the response accordingly.
        } else {
          // Form is invalid, display error messages
        }
      });
    },
  },
};
</script>

<style>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 8px;
  background-color: #f0f2f5;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  margin-top: 20px;
}
</style>