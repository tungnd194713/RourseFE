import ApiService from '@/services/ApiService'

const CourseService = {
  getCourse() {
    return ApiService.get('/course')
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
  getExam(moduleId) {
    return ApiService.get('/course/module/' + moduleId + '/exam/')
  },
  submitExam(moduleId, examId, body) {
    return ApiService.post('/course/module/' + moduleId + '/exam/' + examId, body)
  }
}

export default CourseService
