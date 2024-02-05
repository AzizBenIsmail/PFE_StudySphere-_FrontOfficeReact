import axios from 'axios'

const apiURL = 'http://localhost:5000/auth'

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



export async function getUsers(config) {
  return await axios.get(`${ apiURL }/AllUsers`, config);
}

export async function getAdmin(config) {
  return await axios.get(`${ apiURL }/AllAdmin`, config);
}

export async function getSimpleUser(config) {
  return await axios.get(`${ apiURL }/AllSimpleUsers`, config);
}

export async function getUserActive(config) {
  return await axios.get(`${ apiURL }/AllUsersActive`, config);
}

export async function getUsersarchive(config) {
  return await axios.get(`${ apiURL }/AllUsersarchive`, config);
}

export async function getUserDesactive(config) {
  return await axios.get(`${ apiURL }/AllUsersDesactive`, config);
}

export async function getUserConnecter(config) {
  return await axios.get(`${ apiURL }/AllUsersConnecter`, config);
}

export async function getUserDeConnecter(config) {
  return await axios.get(`${ apiURL }/AllUsersDeConnecter`, config);
}

export async function searchUsers(term,config) {
  return await axios.get(`${ apiURL }/searchUsers?term=${ term }`, config);
}

export async function getUserByID(id, config) {
  return await axios.get(`${ apiURL }/User/${ id }`, config);
}
export async function updateUser(formData, id, config) {
  return await axios.put(`${ apiURL }/updateUser/${ id }`, formData, config, {
    headers: {"Content-Type": "multipart/form-data"}
  });
}

export async function deleteUser(id, config) {
  return await axios.delete(`${ apiURL }/${ id }`, config);
}

export async function upgrade (id, config) {
  return await axios.put(`${apiURL}/upgrade`, { id }, config)
}

export async function archiver (id, config) {
  return await axios.put(`${apiURL}/archiver`, { id }, config)
}


export async function downgrade(id, config) {
  return await axios.put(`${ apiURL }/downgrade`, {id}, config);
}

export async function active (id, config) {
  return await axios.put(`${apiURL}/active`, { id }, config)
}

export async function desactive(id, config) {
  return await axios.put(`${ apiURL }/desactive`, {id}, config);
}


