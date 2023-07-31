<template>
  <div class="register-form">
    <h2 class="form-title">Create an Account</h2>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" class="form">
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="Re-password" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        username: [
          { required: true, message: 'Please enter your username', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: 'Please confirm your password', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === this.form.password) {
                callback();
              } else {
                callback(new Error('Passwords do not match'));
              }
            },
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // Form is valid, you can perform registration logic here
          // For example, you can submit the form data to a backend API
          // and handle the response accordingly.
          alert('Registration successful!');
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