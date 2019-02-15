import Vuex from 'vuex'
import { login, verify, fetch_twits, post_twit, like_twit, unlike_twit, unfollow } from '../apis';

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
      console.log('Store/Logout/before/SET_USER')
      commit('SET_USER', {})
      console.log('Store/Logout/before/SET_ACCESS_TOKEN')
      commit('SET_ACCESS_TOKEN', '')
    },
    async VERIFY ({ commit, state }) {
      const { data } = await verify({ accessToken: state.accessToken })
      if (data.success) {
        const { user, accessToken } = data
        commit('SET_USER', user)
        commit('SET_ACCESS_TOKEN', accessToken)
      }
    },
    async FETCH_TWITS ({ commit, state }) {
      const { accessToken } = state
      const { data } = await fetch_twits({ accessToken })
      console.log('FETCH_TWITS : ', data)
      commit('SET_TWITS', data.data)
    },
    async POST_TWIT ({ commit, state }, { content }) {
      const { accessToken } = state
      const result = await post_twit({ accessToken, content })
    },
    async LIKE_TWIT ({ commit, state }, { twit_id }) {
      const { accessToken } = state
      const { data } = await like_twit({ accessToken, twit_id })

      if (data.success) {
        commit('LIKE_TWIT', twit_id)
      }
    },
    async UNLIKE_TWIT ({ commit, state }, { twit_id }) {
      const { accessToken } = state
      const { data } = await unlike_twit({ accessToken, twit_id })

      if (data.success) {
        commit('UNLIKE_TWIT', twit_id)
      }
    },
    async FOLLOW ({ commit, state }, { user_id }) {
      const { accessToken } = state
      await follow({ accessToken, user_id })
    },
    async UNFOLLOW ({ dispatch, commit, state }, { user_id }) {
      const { accessToken } = state
      await unfollow({ accessToken, user_id })
    }
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
    LIKE_TWIT (state, twit_id) {
      const twit = state.twits.find(twit => twit.id == twit_id)
      twit.LikeFrom.push(state.user)
    },
    UNLIKE_TWIT (state, twit_id) {
      const twit = state.twits.find(twit => twit.id == twit_id)
      const index = twit.LikeFrom.findIndex(user => user.id == state.user.id)
      twit.LikeFrom.splice(index, 1)
    },
  }
})

export default store
