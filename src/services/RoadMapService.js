import ApiService from '@/services/ApiService'

const RoadMapService = {
  fetchCategories() {
    return ApiService.get('/roadmap/fetch-categories');
  },
  fetchSpecCategories(categoryId) {
    return ApiService.get(`/roadmap/fetch-spec-categories?category_id=${categoryId}`);
  },
  findRoadMap() {
    return ApiService.post('/roadmap/find-roadmap');
  },
  buildRoadmap(params) {
    return ApiService.post('/roadmap/build-roadmap/', params)
  },
  applyRoadmap(params) {
    return ApiService.post('/roadmap/apply-roadmap', params)
  },
  getUserRoadmap(user_id) {
    return ApiService.get(`/roadmap/get-user-roadmap?user_id=${user_id}`)
  },
  getMilestoneModuleProgress(milestone_id) {
    return ApiService.get('/roadmap/get-milestone-module-progress/' + milestone_id)
  },
  completeMilestone(milestone_id) {
    return ApiService.post(`/roadmap/milestone/${milestone_id}/complete`);
  },
	getPublishedEducations() {
    return ApiService.post(`/roadmap/educations`);
  },
  getEducationRequests(query, body) {
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
    return ApiService.post(`/roadmap/education-requests${queryString}`, body);
  },
  getEducationRoadmap(jobEducationId) {
    return ApiService.get(`/roadmap/education-requests/` + jobEducationId);
  },
  checkRoadmap(jobEducationId) {
    return ApiService.get(`/roadmap/education-requests/` + jobEducationId + '/check');
  },
  sendRoadmap(jobEducationId) {
    return ApiService.get(`/roadmap/education-requests/` + jobEducationId + '/send');
  },
	replyChangeRequest(jobEducationId, requestId, body) {
    return ApiService.post(`/roadmap/education-requests/` + jobEducationId + '/change-requests/' + requestId + '/reply', body);
  },
  getCourseDetail(jobEducationId, courseId) {
    return ApiService.get(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId);
  },
	// createEducationCourse(jobEducationId, body) {
  //   return ApiService.post(`/roadmap/education-requests/` + jobEducationId + '/courses/create', body);
  // },
  addExistingEducationCourse(jobEducationId, courseId) {
    return ApiService.post(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId);
  },
  removeCourseFromRoadmap(jobEducationId, courseId) {
    return ApiService.delete(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId);
  },
	createEducationModule(courseId, body) {
    return ApiService.post(`/roadmap/instructor-courses/courses/` + courseId + '/modules/create', body);
  },
	removeEducationModuleFromCourse(jobEducationId, courseId, moduleId) {
    return ApiService.delete(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId + '/modules/' + moduleId);
  },
  getEducationModule(jobEducationId, courseId, moduleId) {
    return ApiService.get(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId + '/modules/' + moduleId);
  },
  updateEducationModule(jobEducationId, courseId, moduleId, body) {
    return ApiService.update(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId + '/modules/' + moduleId, body);
  },
  getListInstructor(body) {
    return ApiService.post('/roadmap/education-requests/instructor-list', body);
  },
  getListInstructorCourse(body) {
    return ApiService.post(`/roadmap/education-requests/instructor-courses/list`, body);
  },
  getInstructorCourseById(instructorCourseId) {
    return ApiService.get(`/roadmap/instructor-courses/${instructorCourseId}`);
  },
  updateInstructorCourseStatus(instructorCourseId, body) {
    return ApiService.update(`/roadmap/instructor-courses/${instructorCourseId}/update-status`, body);
  },
  signAsComplete(instructorCourseId) {
    return ApiService.get(`/roadmap/instructor-courses/${instructorCourseId}/sign-as-complete`);
  },
  goToFix(instructorCourseId) {
    return ApiService.get(`/roadmap/instructor-courses/${instructorCourseId}/go-to-fix`);
  },
  getListInstructorByEducation(jobEducationId, body) {
    return ApiService.post(`/roadmap/education-requests/${jobEducationId}/instructor-courses/`, body);
  },
  createInstructorCourse(jobEducationId, body) {
    return ApiService.post(`/roadmap/education-requests/${jobEducationId}/instructor-courses/create`, body);
  },
  createNewTestToCourse(courseId, body) {
    return ApiService.post(`/roadmap/instructor-courses/courses/${courseId}/tests/create`, body);
  },
  updateTestById(testId, body) {
    return ApiService.update(`/roadmap/instructor-courses/tests/${testId}`, body);
  },
  getTestById(testId) {
    return ApiService.get(`/roadmap/instructor-courses/tests/${testId}`);
  },
  deleteTestById(testId) {
    return ApiService.delete(`/roadmap/instructor-courses/tests/${testId}`);
  },
  createNewQuestionToTest(testId, body) {
    return ApiService.post(`/roadmap/instructor-courses/tests/${testId}/questions/create`, body);
  },
  updateQuestionById(questionId, body) {
    return ApiService.update(`/roadmap/instructor-courses/questions/${questionId}`, body);
  },
  deleteQuestionById(questionId) {
    return ApiService.delete(`/roadmap/instructor-courses/questions/${questionId}`);
  },
}

export default RoadMapService
