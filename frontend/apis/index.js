import axios from 'axios'

const BASE_URL = 'http://localhost:3010'

export function login ({ email, password }) {
  return axios.post(`${BASE_URL}/auth/login`, { email, password })
}

export function logout () {
  return axios.get(`${BASE_URL}/auth/logout`)
}

export function fetch_twits ({ accessToken }) {
  return axios.get(`${BASE_URL}/twit?accessToken=${accessToken}`)
}

export function post_twit ({ accessToken, content }) {
  return axios.post(`${BASE_URL}/twit`, { accessToken, content })
}
