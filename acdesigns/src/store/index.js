import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userId: null,
    apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.userId = auth.getUserId()
      }
      else {
        state.userId = null
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})
