import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module'
import { contactmodule } from './contact.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    contact: contactmodule,
  }
})