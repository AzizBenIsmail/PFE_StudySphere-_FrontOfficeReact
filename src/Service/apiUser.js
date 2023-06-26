import axios from "axios";

const apiURL = "http://localhost:5000/auth";

export async function register(formData) {
  return await axios.post(`${apiURL}/signup`, formData ,{
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

export async function LoginUser(user) {
  return await axios.post(`${apiURL}/login`,user, {
    withCredentials: true,
  });
}

export async function getUsers(config) {
  return await axios.get(`${apiURL}/AllUsers`,config);
}

export async function logout(config) {
  return await axios.get(`${apiURL}/logout`,{config,
    withCredentials: true,
  });
}

export async function getUserAuth(config) {
  return await axios.get(`${apiURL}/`,config);
}

export async function getUserByID(id,config) {
  return await axios.get(`${apiURL}/User/${id}`,config);
}
// export async function addUser(formData) {
//   return await axios.post(apiURL, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'foo': 'bar'
//     },
//   });
// } 

// export async function updateUser(id, User) {
//   return await axios.put(`${apiURL}/${id}`, User);
// }

export async function deleteUser(id,config) {
  return await axios.delete(`${apiURL}/${id}`,config);
}

export async function upgrade(id,config) {
  return await axios.put(`${apiURL}/upgrade`,{id},config);
}

export async function downgrade(id,config) {
  return await axios.put(`${apiURL}/downgrade`,{id},config);
}

export async function active(id,config) {
  return await axios.put(`${apiURL}/active`,{id},config);
}

export async function desactive(id,config) {
  return await axios.put(`${apiURL}/desactive`,{id},config);
}

// export async function forgotpwd(User) {
//   return await axios.post(`${apiURL}/forgotpwd`, User.email);
// }
