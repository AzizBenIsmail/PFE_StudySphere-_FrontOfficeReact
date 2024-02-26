import axios from 'axios'

const apiURL = 'http://localhost:5000/xp'

export async function createXP(xpData, config) {
    return await axios.post(apiURL, xpData, config);
}

export async function getXPById(id, config) {
  return await axios.get(`${apiURL}/${id}`, config);
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
