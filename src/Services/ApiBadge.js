import axios from 'axios'

const apiURL = `${process.env.REACT_APP_API_URL}/badge`;

// const jwt_token = localStorage.getItem('jwt_token');
//
// const api = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}/fav`, // Remplacez par l'URL de votre API
//   headers: {
//     Authorization: `Bearer ${jwt_token}`,
//   },
// });

export async function createBadge(badgeData, config) {
  return await axios.post(apiURL, badgeData, config);
}

export async function getBadgeById(id, config) {
  return await axios.get(`${apiURL}/${id}`, config);
}

export async function updateBadge(id, badgeData, config) {
  return await axios.put(`${apiURL}/${id}`, badgeData, config);
}

export async function deleteBadge(id, config) {
  return await axios.delete(`${apiURL}/${id}`, config);
}

export async function getAllBadges(config) {
  return await axios.get(apiURL, config);
}
