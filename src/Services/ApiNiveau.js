import axios from 'axios'

const apiURL = 'http://localhost:5000/niveau'
// const apiURL = 'https://forme-5wc0.onrender.com/niveau'

export async function createNiveau(niveauData, config) {
  return await axios.post(apiURL, niveauData, config);
}

export async function getNiveauById(id, config) {
  return await axios.get(`${apiURL}/${id}`, config);
}

export async function updateNiveau(id, niveauData, config) {
  return await axios.put(`${apiURL}/${id}`, niveauData, config);
}

export async function deleteNiveau(id, config) {
  return await axios.delete(`${apiURL}/${id}`, config);
}

export async function getAllNiveaux(config) {
  return await axios.get(apiURL, config);
}
