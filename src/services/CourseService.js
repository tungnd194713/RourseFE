import ApiService from '@/services/ApiService'

const CourseService = {
  getCourse() {
    return ApiService.get('/course')
  },
}

export default CourseService
