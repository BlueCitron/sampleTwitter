import axios from 'axios'

const BASE_URL = 'http://localhost:3010'

export function login ({ email, password }) {
  return axios.post(`${BASE_URL}/auth/login`, { email, password })
}

export function verify ({ accessToken }) {
  return axios.post(`${BASE_URL}/auth/verify`, { accessToken })
}

export function fetch_twits ({ accessToken }) {
  return axios.get(`${BASE_URL}/twit?accessToken=${accessToken}`)
}

export function post_twit ({ accessToken, content }) {
  return axios.post(`${BASE_URL}/twit`, { accessToken, content })
}

export function like_twit ({ accessToken, twit_id }) {
  return axios.post(`${BASE_URL}/twit/${twit_id}/like`, { accessToken })
}

export function unlike_twit ({ accessToken, twit_id }) {
  return axios.post(`${BASE_URL}/twit/${twit_id}/unlike`, { accessToken })
}

export function follow ({ accessToken, user_id }) {
  return axios.post(`${BASE_URL}/user/${user_id}/follow`, { accessToken })
}

export function unfollow ({ accessToken, user_id }) {
  return axios.post(`${BASE_URL}/user/${user_id}/unfollow`, { accessToken })
}
