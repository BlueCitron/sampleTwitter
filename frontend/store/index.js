import Vuex from 'vuex'
import { login, logout, fetch_twits, post_twit } from '../apis';

const store = () => new Vuex.Store({

  state: {
    user: {},
    authenticated: false,
    twits: [],
  },

  getters: {

  },

  actions: {
    LOGIN ({ commit }, { email, password }) {
      return login({ email, password })
    },
    LOGOUT ({ commit }) {
      return logout()
    },
    async FETCH_TWITS ({ commit }) {
      const twits = await fetch_twits()
      console.log('FETCH_TWITS : ', twits)
    },
    async POST_TWIT ({ content }) {
      const result = await post_twit({ content })
      console.log('POST_TWIT : ', result)
    },
  },

  mutations: {
    SET_USER (state, user) {
      state.user = user
      state.authenticated = user === {} ? false : true
    },
    SET_TWITS (state, twits) {
      state.twits = twits
    },
  }
})

export default store
