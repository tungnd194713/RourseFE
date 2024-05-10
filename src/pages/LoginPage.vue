<template>
  <v-content>
    <v-container fluid fill-height class="container">
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md4 class="login-container">
          <div style="margin-top: 60px">
            <div>
              <div class="form-login pt-10 pt-sm-15 pb-10">
                <div class="d-flex justify-center align-center mb-8 logo-title">
                  TheRoute
                </div>
                <div class="inner-login mx-auto mb-14 mb-sm-15 mt-10">
                    <div class="mb-2">
                        <input class="input-container email-container d-flex px-3" type="text" name="email"
                            placeholder="Email" maxlength="255"
                            v-model.trim="form.email">
                    </div>
                    <div class="mb-2">
                        <input class="input-container password-container d-flex px-3" type="password" name="password"
                            placeholder="Password" maxlength="255"
                            v-model.trim="form.password">
                    </div>
                    <div class="d-flex justify-center align-center">
                        <el-select 
                        v-model="form.role"
                        class="full-width">
                        <el-option 
                            v-for="opt in roles" 
                            :value="opt.value" 
                            :key="opt.value"
                            :label="'Login as ' + opt.label">
                        </el-option>
                        </el-select>
                    </div>
                    <!-- <div class="forgot-pass text-center" @click="$router.push({name: routerForgetPassword})">
                        <router-link :to="{name: routerForgetPassword}" class="text-decoration-none forgot-button">
                        パスワードを忘れてしまった場合はこちら
                        </router-link>
                    </div> -->
                    <button
                        class="mx-auto login-button submit-button mb-5 mt-3 font-weight-bold text-decoration-none d-flex justify-center align-center"
                        @click="submitForm()">Login
                    </button>
                    <!-- <div class="logged text-center font-gray d-flex justify-center align-center">
                        <input type="checkbox" name="remember" class="align-middle" v-model="remember_me">
                        <label class="ml-2 remember" for="remember"
                            @click="remember_me = !remember_me">ログインしたままにする</label>
                    </div> -->
                </div>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <!-- <img class="background-image" src="@/assets/hexagon.svg" alt=""> -->
    </v-container>
  </v-content>
</template>

<script>
import { UserService } from '@/services'
// import {
//   FORBIDDEN,
// } from '@/helpers/message'
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: '',
        password: '',
        role: 'admin'
      },
      roles: [
        {
            label: 'Admin',
            value: 'admin',
        },
        {
            label: 'Instructor',
            value: 'instructor',
        },
        {
            label: 'Mentor',
            value: 'mentor',
        }
      ]
    };
  },
  methods: {
    checkLogged() {
      if (this.$store.getters.accessToken && this.$store.getters.authUser.role == this.role) {
        this.$router.push({name : this.router})
      }
    },
    async submitForm() {
            try {
                const { data } = await UserService.login(this.form);
                localStorage.setItem('accessToken', data.tokens.access.token);
                localStorage.setItem('accessTokenExpires', data.tokens.access.expires);
                localStorage.setItem('refreshToken', data.tokens.refresh.token);
                localStorage.setItem('refreshTokenExpires', data.tokens.refresh.expires);
                localStorage.setItem('user', JSON.stringify(data.user));
								// if (data.user.role === 'mentor') {
								// 	this.$router.push({path: '/mentor'});
								// }
                this.$router.push({path: '/'});
            } catch (e) {
              if (e.status === 401) {
                this.$notify({
                  title: 'Error',
                  message: 'Sai email hoặc mật khẩu!'
                });
                const email = this.form.email
                const role = this.form.role
                this.form =  {
                  email: email,
                  password: '',
                  role: role
                }
              }
                // alert(e);
                console.log(e)
            }
    },
  },
  created() {
    this.checkLogged()
  }
}
</script>

<style scoped>
.content {
    margin-top: 82px;
}
.justify-center {
    justify-content: center;
}
.align-center {
    align-items: center;
}
input {
  outline: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
}

input::placeholder {
  color: rgba(0, 0, 0, 0.4);
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}

.logo-image {
  width: 91px
}

.logo-title {
  font-family: 'Noto Sans';
  font-size: 40px;
  font-weight: 600;
  color: #00000080;
}

.font-gray {
  color: rgba(0, 0, 0, 0.6);
}

.form-login {
  background: white;
  /* box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.06);
  border-radius: 10px; */
}

.inner-login {
  width: 40%;
}

.input-container {
  height: 36px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  border: none;
  width: 100%;
}

.logged {
  font-size: 12px;
  color: #00000099;
}

.logged input {
  transform: scale(1.2);
}

.logged label {
  cursor: pointer;
  height: 14px;
}

.login-button {
  color: white;
  width: 100%;
  height: 43px;
}

.submit-button {
  background: #66abff;
  border-radius: 5px;
  box-shadow: 1px 2px 4px 0px #00000041;
  font-size: 18px;
}

.forgot-button {
  color: #66abff;
  font-size: 12px
}

.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.background-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: scaleX(1.01);
  pointer-events: none;
}

::placeholder {
  font-family: 'Lato';
}

select {
  font-family: 'Lato';
}

@media screen and (max-width: 414px) {
  .inner-login {
    width: 70%;
  }

  .container {
    padding-top: 10px;
  }
}
</style>

<style>
.theme--light.v-application {
  background: none !important;
}
</style>
