import axios from 'axios'

const apiURL = 'http://localhost:5000/pref'

export async function addPreferences(preferencesData, config) {
    return await axios.put(`${apiURL}/addPref`, preferencesData, config);
}

export async function addPreferencesCentre(preferencesData, config) {
  return await axios.put(`${apiURL}/addPrefCentre`, preferencesData, config);
}

export async function addPreferencesFormateur(preferencesData,config) {
  return await axios.put(`${ apiURL }/addPrefFormateur`,preferencesData, config);
}

export async function getPreferences(id,config) {
  return await axios.get(`${ apiURL }/GetPref/${id}`, config);
}

export async function updatePrefClient(preferencesData,config) {
  return await axios.put(`${ apiURL }/updatePreferences`,preferencesData, config);
}

export async function updatePrefCenter(preferencesData,config) {
  return await axios.put(`${ apiURL }/UpdatePreferencesCentre`,preferencesData, config);
}

export async function updatePreferencesFormateur(preferencesData,config) {
  return await axios.put(`${ apiURL }/updatePreferencesFormateur`,preferencesData, config);
}
