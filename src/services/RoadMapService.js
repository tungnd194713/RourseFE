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
}

export default RoadMapService
