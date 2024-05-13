import ApiService from '@/services/ApiService'

const MentorService = {
  getProfile() {
    return ApiService.get('/mentors/profile')
  },
	updateProfile(body) {
    return ApiService.post('/mentors/profile', body)
	},
	getMentorShifts(body) {
		return ApiService.post('/mentors/shifts/list', body)
	},
	acceptShift(mentorShiftId) {
    return ApiService.get('/mentors/accept-shift/' + mentorShiftId)
  },
	rejectShift(mentorShiftId) {
    return ApiService.get('/mentors/reject-shift/' + mentorShiftId)
  },
	showCourse(courseId) {
    return ApiService.get('/mentors/show-course/' + courseId)
  },
}

export default MentorService
