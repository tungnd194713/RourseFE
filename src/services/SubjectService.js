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
	getSubjectList(current_page = 1, per_page = 10, body = {name: ''}) {
		return ApiService.post(`/technical/subjects/list?current_page=${current_page}&per_page=${per_page}`, body)
	},
	addSubject(body) {
		return ApiService.post(`/technical/subjects/create`, body)
	},
	addSubjectToCertificate(certificate_id, body) {
		return ApiService.post(`/technical/certificates/${certificate_id}/subjects`, body)
	},
	deleteSubjectFromCertificate(certificate_id, subject_id) {
		return ApiService.delete(`/technical/certificates/${certificate_id}/subjects/${subject_id}`)
	},
	getMajors(current_page = 1, per_page = 10) {
		return ApiService.get(`/technical/majors?current_page=${current_page}&per_page=${per_page}`);
	},
	getMajorSubjects(id, current_page = 1, per_page = 10) {
		return ApiService.get(`/technical/majors/${id}/subjects?current_page=${current_page}&per_page=${per_page}`)
	},
	addSubjectToMajor(certificate_id, body) {
		return ApiService.post(`/technical/majors/${certificate_id}/subjects`, body)
	},
	deleteSubjectFromMajor(certificate_id, subject_id) {
		return ApiService.delete(`/technical/majors/${certificate_id}/subjects/${subject_id}`)
	},
	getColleges(current_page = 1, per_page = 10) {
		return ApiService.get(`/technical/colleges?current_page=${current_page}&per_page=${per_page}`);
	},
	addMajor(body) {
		return ApiService.post(`/technical/majors`, body);
	},
	addCertificate(body) {
		return ApiService.post(`/technical/certificates`, body);
	},
	addCollege(body) {
		return ApiService.post(`/technical/colleges`, body);
	},
	updateCollege(id, body) {
		return ApiService.update(`/technical/colleges/${id}`, body);
	},
	updateCertificate(id, body) {
		return ApiService.update(`/technical/certificates/${id}`, body);
	},
	updateMajor(id, body) {
		return ApiService.update(`/technical/majors/${id}`, body);
	},
	removeCollege(id) {
		return ApiService.delete(`/technical/colleges/${id}`);
	},
	removeMajor(id) {
		return ApiService.delete(`/technical/majors/${id}`);
	},
	removeCertificate(id) {
		return ApiService.delete(`/technical/certificates/${id}`);
	},
}

export default SubjectService;