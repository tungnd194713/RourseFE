import ApiService from '@/services/ApiService'

const CourseService = {
  findCourses(body, page) {
    return ApiService.post('/course/list?page=' + page, body)
  },
  getCourse(moduleId) {
    return ApiService.get('/course/module/' + moduleId)
  },
  getNotes(moduleId) {
    return ApiService.get('/course/module/' + moduleId + '/note')
  },
  takeNote(moduleId, body) {
    return ApiService.post('/course/module/' + moduleId + '/take-note', body)
  },
  editNote(moduleId, body) {
    return ApiService.post('/course/module/' + moduleId + '/edit-note', body)
  },
  getDiscussionByModule(moduleId) {
    return ApiService.get('/course/module/' + moduleId + '/discussion')
  },
  addReply(moduleId, dicussionId, body) {
    return ApiService.post('/course/module/' + moduleId + '/discussion/' + dicussionId + '/reply', body)
  },
	createCourse(body) {
		return ApiService.post('/course', body);
	},
	getCourses(body) {
		return ApiService.post('/course/list', body);
	},
	addModuleToCourse(courseId, body) {
		return ApiService.post(`/course/${courseId}/add-module`, body);
	},
	findCourseById(courseId) {
		return ApiService.post(`/course/${courseId}`);
	},
}

export default CourseService
