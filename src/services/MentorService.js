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
	updateShift(shift) {
    return ApiService.post('/mentors/update-shift/', shift)
	},
	deleteShift(weekday) {
    return ApiService.delete('/mentors/delete-shift/' + weekday)
	},
	getRatingList(body) {
    return ApiService.post('/mentors/ratings/list/', body)
	},
}

export default MentorService
