import axios from 'axios'

const apiURL = 'http://localhost:5000/pref'

export async function addPreferences(id, preferencesData, config) {
    return await axios.put(`${apiURL}/addPref/${id}`, preferencesData, config);
}

export async function addPreferencesCentre(id, preferencesData, config) {
  return await axios.put(`${apiURL}/addPrefCentre/${id}`, preferencesData, config);
}

export async function getPreferences(id,config) {
  return await axios.get(`${ apiURL }/GetPref/${id}`, config);
}

export async function updatePrefClient(id,preferencesData,config) {
  return await axios.put(`${ apiURL }/updatePreferences/${id}`,preferencesData, config);
}

export async function updatePrefCenter(id,preferencesData,config) {
  return await axios.put(`${ apiURL }/UpdatePreferencesCentre/${id}`,preferencesData, config);
}

export async function addPreferencesFormateur(id,preferencesData,config) {
  return await axios.put(`${ apiURL }/addPrefFormateur/${id}`,preferencesData, config);
}

export async function updatePreferencesFormateur(id,preferencesData,config) {
  return await axios.put(`${ apiURL }/addPrefFormateur/${id}`,preferencesData, config);
}
