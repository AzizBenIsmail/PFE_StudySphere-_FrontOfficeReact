import axios from 'axios';

const apiURL = 'http://localhost:5000/messages';

export async function getMessages(id, config) {
    return await axios.get(`${apiURL}/${id}`, config);
}


export async function sendMessage(id, preferencesMessage, config) {
    return await axios.post(`${apiURL}/send/${id}`, preferencesMessage, config);
}
