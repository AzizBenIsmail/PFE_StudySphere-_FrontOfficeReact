import axios from 'axios';

const jwt_token = localStorage.getItem('jwt_token');

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/events`, // Assurez-vous que l'URL est correcte
  headers: {
    Authorization: `Bearer ${jwt_token}`, // Ajout du jeton JWT dans les en-têtes
    'Content-Type': 'multipart/form-data' // Spécifie que le contenu envoyé est en JSON
  }
});

export const getAllEvents = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createEvent = async (event) => {
  const response = await api.post('/', event);
  return response.data;
};

export const updateEvent = async (id, event) => {
  const response = await api.patch(`/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
