import axios from 'axios'

const apiURL = 'http://localhost:5000/pref'

export async function addPreferences(id, preferencesData, config) {
    return await axios.put(`${apiURL}/addPref/${id}`, preferencesData, config);
}

export async function addPreferencesCentre(id, preferencesData, config) {
  return await axios.put(`${apiURL}/addPrefCentre/${id}`, preferencesData, config);
}

export async function getPreferences(id,config) {
  return await axios.get(`${ apiURL }/GetPref/:id`, config);
}
