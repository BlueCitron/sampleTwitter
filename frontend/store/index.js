import Vuex from 'vuex'
import { login, logout, fetch_twits, post_twit } from '../apis';

const store = () => new Vuex.Store({

  state: {
    user: {},
    accessToken: '',
    twits: [],
  },

  getters: {

  },

  actions: {
    LOGIN ({ commit }, { email, password }) {
      return login({ email, password })
    },
    LOGOUT ({ commit }) {
      commit('SET_USER', {})
      commit('SET_ACCESS_TOKEN', '')
    },
    async FETCH_TWITS ({ commit, state }) {
      const { accessToken } = state
      const { data } = await fetch_twits({ accessToken })
      console.log('FETCH_TWITS : ', data.data)
      commit('SET_TWITS', data.data)
    },
    async POST_TWIT ({ commit, state }, { content }) {
      const { accessToken } = state
      const result = await post_twit({ accessToken, content })
      console.log('POST_TWIT : ', result)
    },
  },

  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_ACCESS_TOKEN (state, token) {
      state.accessToken = token
    },
    SET_TWITS (state, twits) {
      state.twits = twits
    },
  }
})

export default store
