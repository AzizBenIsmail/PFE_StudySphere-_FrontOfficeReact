import axios from 'axios';

const jwt_token = localStorage.getItem('jwt_token');

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/logs`, // Remplacez par l'URL de votre API
  headers: {
    Authorization: `Bearer ${jwt_token}`,
  },
});

export const getAllLogs = async () => {
  const response = await api.get('/');
  return response.data;
};
