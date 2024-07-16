import axios from 'axios'

const apiURL = `${process.env.REACT_APP_API_URL}/auth`;

// const jwt_token = localStorage.getItem('jwt_token');
//
// const api = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}/fav`, // Remplacez par l'URL de votre API
//   headers: {
//     Authorization: `Bearer ${jwt_token}`,
//   },
// });

export async function getUserAuth (config) {
  return await axios.get(`${apiURL}/`, config)
}

export async function registerEmail (email) {
  return await axios.post(`${apiURL}/verification`, email)
}

export async function register (user) {
  return await axios.post(`${apiURL}/inscrire`, user)
}

export async function registerCentre (formData) {
  return await axios.post(`${apiURL}/inscrireCentre`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true,
  })
}

export async function LoginUser (user) {
  return await axios.post(`${apiURL}/login`, user, {
    withCredentials: true,
  })
}

export async function forgetPassword (email) {
  return await axios.put(`${apiURL}/forgetPassword`, { email })
}

export async function Password (user, config) {
  return await axios.put(`${apiURL}/Password`, { user, config, withCredentials: true })
}

export async function logout (config,id) {
  return await axios.get(`${apiURL}/logout/${id}`, {
    config, withCredentials: true,
  })
}

export async function AddUserService(formData, config) {
  return await axios.post(`${ apiURL }/register`, formData, config, {
    headers: {"Content-Type": "multipart/form-data"}, withCredentials: true,
  });
}


