
import AuthService from '../services/auth.service'

const status = localStorage.getItem('user') ? { loggedIn: true } : { loggedIn: false }

export const auth = {
    // namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem('user')) || '',
        token: localStorage.getItem('token') || '',
        status: status
    },

    getters: {
        getUser: state => { return state.user },
        getStatus: state => { return state.status.loggedIn }
    },

    actions: {
        async login ({ commit }, credentials) {
            try {
                const response = await AuthService.login(credentials)
                commit('loginSuccess', response.user, response.token)
                return Promise.resolve(response.user)
            }
            catch (error) {
                commit('loginFailure')
                return Promise.reject(error.response)
            }
        },

        logout ({ commit }) {
            AuthService.logout()
            commit('logout')
        },

        async register ({ commit }, user) {
            try {
                const response = await AuthService.register(user)
                commit('registerSuccess')
                return Promise.resolve(response)
            }
            catch (error) {
                commit('registerFailure')
                return Promise.reject(error.response)
            }
        },
    },

    mutations: {
        loginSuccess (state, user, token) {
            state.status = { loggedIn: true }
            state.user = user
            state.token = token
        },

        loginFailure (state) {
            state.status = {}
            state.use = null
        },

        logout (state) {
            state.status = {}
            state.user = null
        },

        registerSuccess(state) {
            state.status.loggedIn = true;
        },

        registerFailure (state) {
            state.status.loggedIn = false;
        }
    },


}