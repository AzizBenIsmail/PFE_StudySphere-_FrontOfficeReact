import axios from 'axios'

// const apiURL = `${process.env.REACT_APP_API_URL}/auth`;

const jwt_token = localStorage.getItem('jwt_token');

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`, // Remplacez par l'URL de votre API
  headers: {
    Authorization: `Bearer ${jwt_token}`,
  },
});

export async function getUserAuth () {
  return await api.get(`/`)
}

export async function registerEmail (email) {
  return await api.post(`/verification`, email)
}

export async function register (user) {
  return await api.post(`/inscrire`, user)
}

export async function registerCentre (formData) {
  return await api.post(`/inscrireCentre`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true,
  })
}

export async function LoginUser (user) {
  return await api.post(`/login`, user, {
    withCredentials: true,
  })
}

export async function forgetPassword (email) {
  return await api.put(`/forgetPassword`, { email })
}

export async function Password (user, config) {
  return await api.put(`/Password`, { user, config, withCredentials: true })
}

export async function logout (config,id) {
  return await api.get(`/logout/${id}`, {
    withCredentials: true,
  })
}

export async function AddUserService(formData, config) {
  return await api.post(`/register`, formData, config, {
    headers: {"Content-Type": "multipart/form-data"}, withCredentials: true,
  });
}


