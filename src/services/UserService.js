import ApiService from '@/services/ApiService'

const UserService = {
  register(data) {
    return ApiService.post('/auth/register', data)
  },
  login(data) {
    return ApiService.post('/auth/login', data)
  },
  logout(data) {
    return ApiService.post('/auth/logout', data)
  },
}

export default UserService
