import axios from "axios";

const apiURL = "http://localhost:5000/auth";

export async function register(formData) {
  return await axios.post(`${apiURL}/signup`, formData ,{
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

// export async function signup() {
//   return await axios.post(`${apiURL}/signup`);
// }

export async function getUsers() {
  return await axios.get(apiURL);
}
export async function getUser(id) {
  return await axios.get(`${apiURL}/getUser/${id}`);
}

export async function getUserAuth(id) {
  return await axios.get(`${apiURL}/getUser`);
}

export async function addUser(formData) {
  return await axios.post(apiURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'foo': 'bar'
    },
  });
} 

export async function updateUser(id, User) {
  return await axios.put(`${apiURL}/${id}`, User);
}

export async function deleteUser(id) {
  return await axios.delete(`${apiURL}/${id}`);
}

export async function LoginUser(User) {
  return await axios.post(`${apiURL}/login`, User);
}



export async function forgotpwd(User) {
  return await axios.post(`${apiURL}/forgotpwd`, User.email);
}
