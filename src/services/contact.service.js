import axios from 'axios'
import config from '../config'
import authHeader from './auth.header'

const BASE_URL = config.api_url

class ContactService {    
    registerContact (contact) {
        return axios.post(BASE_URL + '/contact/register',  {
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            image: contact.image 
        })
    }

    getContact (id) {
        return axios.get(`${BASE_URL}/contact/${id}`, { headers: authHeader })
    } 

    getAllContacts () {
        return axios.get(BASE_URL + '/contact/all', { headers: authHeader() })
        .then(this.handleResponse)
        .then(response => {
            return response.data
        })
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

export default new ContactService()
