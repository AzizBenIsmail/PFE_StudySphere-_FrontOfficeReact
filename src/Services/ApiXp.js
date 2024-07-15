import axios from 'axios'

const apiURL = `${process.env.REACT_APP_API_URL}/xp`;

// const jwt_token = localStorage.getItem('jwt_token');
//
// const api = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}/fav`, // Remplacez par l'URL de votre API
//   headers: {
//     Authorization: `Bearer ${jwt_token}`,
//   },
// });
export async function createXP(xpData, config) {
    return await axios.post(apiURL, xpData, config);
}

export async function getByCurrUser(config) {
  return await axios.get(`${apiURL}/getByCurrUser`, config);
}

export async function updateXP(id, xpData, config) {
    return await axios.put(`${apiURL}/${id}`, xpData, config);
}

export async function deleteXP(id, config) {
    return await axios.delete(`${apiURL}/${id}`, config);
}

export async function getAllXP(config) {
    return await axios.get(apiURL, config);
}

export async function add50xp(id, config) {
  return await axios.put(`${apiURL}/add50xp/${id}`, config);
}

export async function delete50xp(id, config) {
  return await axios.put(`${apiURL}/delete50xp/${id}`, config);
}
