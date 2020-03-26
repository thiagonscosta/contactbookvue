import axios from 'axios'
import config from '../config'
import authHeader from './auth.header'

const BASE_URL = config.api_url

export default {    
    getProfile () {
        return axios.get(BASE_URL + '/user/profile', { headers: authHeader() })
    },  
}


