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
  getEducationRequests() {
    return ApiService.post(`/roadmap/education-requests`);
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
  getCourseDetail(jobEducationId, courseId) {
    return ApiService.get(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId);
  },
	createEducationCourse(jobEducationId, body) {
    return ApiService.post(`/roadmap/education-requests/` + jobEducationId + '/courses/create', body);
  },
  addExistingEducationCourse(jobEducationId, courseId) {
    return ApiService.post(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId);
  },
  removeCourseFromRoadmap(jobEducationId, courseId) {
    return ApiService.delete(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId);
  },
	createEducationModule(jobEducationId, courseId, body) {
    return ApiService.post(`/roadmap/education-requests/` + jobEducationId + '/courses/' + courseId + '/modules/create', body);
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
}

export default RoadMapService
