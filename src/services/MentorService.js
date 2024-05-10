import ApiService from '@/services/ApiService'

const MentorService = {
  getProfile() {
    return ApiService.get('/mentors/profile')
  },
	updateProfile(body) {
    return ApiService.post('/mentors/profile', body)
	}
}

export default MentorService
