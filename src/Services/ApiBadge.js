import axios from 'axios'

const apiURL = `${process.env.REACT_APP_API_URL}/badge`;

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
