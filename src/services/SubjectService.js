import ApiService from "./ApiService";

const SubjectService = {
	getCertificates(current_page = 1, per_page = 10) {
    return ApiService.get(`/technical/certificates?current_page=${current_page}&per_page=${per_page}`);
  },
	getCertificateSubjects(id, current_page = 1, per_page = 10) {
		return ApiService.get(`/technical/certificates/${id}/subjects?current_page=${current_page}&per_page=${per_page}`)
	},
	getAllSubject(body) {
		return ApiService.post(`/technical/subjects`, body)
	},
	addSubjectToCertificate(certificate_id, body) {
		return ApiService.post(`/technical/certificates/${certificate_id}/subjects`, body)
	},
	deleteSubjectFromCertificate(certificate_id, subject_id) {
		return ApiService.delete(`/technical/certificates/${certificate_id}/subjects/${subject_id}`)
	}
}

export default SubjectService;