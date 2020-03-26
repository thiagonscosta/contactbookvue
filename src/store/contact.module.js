import ContactService from '../services/contact.service'

export const contactmodule = {
    // namespaced: true,
    state: {
        contacts: {},
        status: { is_updated: true }
    },

    getters: {
        listContactsStatus: state => { return state.status.is_updated },
        listContacts: state => { return state.contacts }
    },

    actions: {
        async allContacts ({ commit }) {
            try {
                const response = await ContactService.getAllContacts()
                commit('setContacts', response.data)
                return Promise.resolve(response)
            } 
            catch (error) {
                return Promise.reject(error)
            }
        },

        async registerContact (contact) {
            try {
                const response = await ContactService.registerContact(contact)
                return Promise.resolve(response)
            }
            catch (error) {
                return Promise.reject(error)
            }
        }
    },

    mutations: {
        setContacts (state, contacts) {
            state.contacts = contacts
        },

        setContactListStatus (state, status) {
            state.status.is_updated = status
        }
    }

}