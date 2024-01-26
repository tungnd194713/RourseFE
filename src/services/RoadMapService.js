import ApiService from '@/services/ApiService'

const RoadMapService = {
  findRoadMap() {
    return ApiService.post('/roadmap/find-roadmap');
  }
}

export default RoadMapService
