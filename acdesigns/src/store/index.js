import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userId: null,
    user: {},
    apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.userId = auth.getUserId()
        auth.getUser(state.userId).then((res) => {
          state.user = res.data.user
        });
      }
      else {
        state.userId = null
        state.user = {}
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})
