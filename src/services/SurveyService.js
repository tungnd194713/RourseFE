import ApiService from '@/services/ApiService'

const SurveyService = {
  getQuestions() {
		return ApiService.get('/survey/questions');
	},
	postSurvey(data) {
    return ApiService.post('/survey', data)
  },
}

export default SurveyService
