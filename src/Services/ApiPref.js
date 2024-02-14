import axios from 'axios'

const apiURL = 'http://localhost:5000/pref'

export async function addPreferences (id, config) {
  return await axios.put(`${apiURL}/addPref`, { id }, config)
}
