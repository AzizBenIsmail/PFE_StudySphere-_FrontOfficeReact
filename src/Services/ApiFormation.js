import axios from 'axios';
import Cookies from 'js-cookie'

const apiURL = `${process.env.REACT_APP_API_URL}/formation`;
const jwt_token = Cookies.get('jwt_token');

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/formation`, // Remplacez par l'URL de votre API
  headers: {
    Authorization: `Bearer ${jwt_token}`,
  },
});

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

export async function getFormationsByLocation(emplacement, config) {
  return await axios.get(`${apiURL}/searchemplacement?emplacements=${emplacement}`, config);
}

export async function getFormationsRecommanderByLocation( config) {
  return await axios.get(`${apiURL}/RecommandationParLocation`, config);
}

export async function getFormationsByDomaine(sujetInteret, config) {
  return await axios.get(`${apiURL}/FormationByDomaine?sujetInteret=${sujetInteret}`, config);
}

export async function FormationByDayAndTime(jours, tranchesHoraires, config) {
  return await axios.get(`${apiURL}/FormationByDayAndTime?jours=${jours}&tranchesHoraires=${tranchesHoraires}`, config);
}

export async function inscription(id, config) {
  return await api.post(`/inscription/${id}`, config);
}

export async function desinscription(id, config) {
  return await api.post(`/desinscription/${id}`, config);
}

export async function FormationsByInscriptionByUserAuth(config) {
  return await api.get(`/FormationsByInscriptionByUserAuth`, config);
}
