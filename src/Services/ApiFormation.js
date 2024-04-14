import axios from 'axios';

const apiURL = 'http://localhost:5000/formation';

export async function createFormation(formationData, config) {
  return await axios.post(apiURL, formationData, config);
}

export async function getFormationById(id, config) {
  return await axios.get(`${apiURL}/${id}`, config);
}

export async function getFormationByCenter( config) {
  return await axios.get(`${apiURL}/FormationByCentre`, config);
}

export async function getFormationByIdCentre(id, config) {
  return await axios.get(`${apiURL}/FormationByIdCentre/${id}`, config);
}

export async function getFormationByIdFormateur(id, config) {
  return await axios.get(`${apiURL}/FormationByIdFormateur/${id}`, config);
}

export async function updateFormation(id, formationData, config) {
  return await axios.put(`${apiURL}/${id}`, formationData, config);
}

export async function deleteFormation(id, config) {
  return await axios.delete(`${apiURL}/${id}`, config);
}

export async function getAllFormations(config) {
  return await axios.get(apiURL, config);
}
