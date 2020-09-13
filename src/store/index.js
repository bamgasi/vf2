import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editable: true,
    fireUser: null,
  },
  mutations: {
    SET_EDIT(state, edit) {
      state.editable = edit
    },
    SET_FIREUSER(state, fu) {
      state.fireUser = fu
    },
  },
  actions: {
    setFireUser({ commit }, fu) {
      commit('SET_FIREUSER', fu)
    },
  },
  modules: {},
  getters: {
    getFireUser(state) {
      return state.fireUser
    },
  },
})
