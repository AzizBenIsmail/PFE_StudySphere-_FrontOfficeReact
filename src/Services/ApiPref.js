import axios from 'axios'

const apiURL = 'http://localhost:5000/pref'


export async function addPreferences(id, preferencesData, config) {
  try {
    const response = await axios.put(`${apiURL}/addPref/${id}`, preferencesData, config);
    return response.data;
  } catch (error) {
    console.error('Error adding preferences:', error);
    throw error;
  }
}
