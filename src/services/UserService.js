import ApiService from '@/services/ApiService'

const UserService = {
  register(data) {
    return ApiService.post('/auth/register', data)
  },
  login(data) {
    return ApiService.post('/auth/login', data)
  },
  logout(data) {
    return ApiService.post('/auth/logout', data)
  },
	getUsers(query) {
		let queryString = '?'
		if (query.role) {
			queryString += `&role=${query.role}`
		}
		if (query.name) {
			queryString += `&name=${query.name}`
		}
		if (query.sortBy) {
			queryString += `&sortBy=${query.sortBy}`
		}
		if (query.limit) {
			queryString += `&limit=${query.limit}`
		}
		if (query.page) {
			queryString += `&page=${query.page}`
		}
		return ApiService.get(`/users${queryString}`);
	},
	getCompanies(query, body) {
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
		return ApiService.post(`/companies/list${queryString}`, body);
	},
	updateUser(id, data) {
    return ApiService.update('/users/' + id, data)
  },
	updateCompany(id, data) {
    return ApiService.update('/companies/update/' + id, data)
  },
  createUser(data) {
    return ApiService.post('/users/', data)
  }
}

export default UserService
