import ApiService from '@/services/ApiService'

const CourseService = {
  findCourses(body, page) {
    return ApiService.post('/course/list?page=' + page, body)
  },
  updateCourse(courseId, body) {
    return ApiService.update('/course/' + courseId, body)
  },
  getCourse(courseId) {
    return ApiService.get('/course/detail/' + courseId)
  },
  getCourseModule(courseId, moduleId) {
    return ApiService.get('/course/detail/' + courseId + '/modules/' + moduleId)
  },
  createCourseModule(courseId, data) {
    return ApiService.post('/course/detail/' + courseId + '/modules/', data)
  },
  removeCourseModule(courseId, moduleId) {
    return ApiService.delete('/course/detail/' + courseId + '/modules/' + moduleId)
  },
  updateCourseModule(courseId, moduleId, data) {
    return ApiService.update('/course/detail/' + courseId + '/modules/' + moduleId, data)
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
	getCourses(query, body = {}) {
    let queryString = '?'
		if (query.sortBy) {
			queryString += `&sortBy=${query.sortBy}`
		}
		if (query.limit) {
			queryString += `&limit=${query.limit}`
		}
		if (query.page) {
			queryString += `&page=${query.page}`
		}
		return ApiService.post('/course/list' + queryString, body);
	},
	addModuleToCourse(courseId, body) {
		return ApiService.post(`/course/${courseId}/add-module`, body);
	},
	findCourseById(courseId) {
		return ApiService.post(`/course/${courseId}`);
	},
	getCourseTransactions(data) {
		return ApiService.post(`/course/transactions/list`, data);
	},
  seedModuleData(data) {
		return ApiService.delete(`/course/seed-course-module`, data);
	},
  seedQuestionData(data) {
		return ApiService.delete(`/course/seed-test-question`, data);
	},
}

export default CourseService
