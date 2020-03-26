import axios from 'axios'
import config from '../config'

const BASE_URL = config.api_url

class AuthService {
    async register (user) {
        const resp = await axios.post(BASE_URL + '/register', user)
        return resp.data
    }

    login (credentials) {
        return axios.post(BASE_URL + '/login', {
            email: credentials.email,
            password: credentials.password
        })
        .then(this.handleResponse)
        .then(response => {
            if (response.data.token) { 
                localStorage.setItem('user', JSON.stringify(response.data.user)); 
                localStorage.setItem('token', JSON.stringify(response.data.token)); 
            }
            return response.data
        })
    }

    logout () {
        localStorage.removeItem('user');
    }

    handleResponse (response) {
        if (response.status === 401) {
            this.logout()
            location.reload(true)

            const error = response.data && response.data.message
            return Promise.reject(error)
        }

        return Promise.resolve(response)
    }
}

export default new AuthService();