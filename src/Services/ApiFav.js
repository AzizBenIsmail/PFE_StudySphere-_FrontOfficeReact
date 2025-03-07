import axios from 'axios';

const jwt_token = localStorage.getItem('jwt_token');

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/fav`, // Remplacez par l'URL de votre API
  headers: {
    Authorization: `Bearer ${jwt_token}`,
  },
});

export const getFavoris = async (config) => {
  const response = await api.get('/',config);
  return response.data;
};

export const addFavori = async (favoriData,config) => {
  const response = await api.post('/', favoriData,config);
  return response.data;
};

export const removeFavori = async (favoriId,config) => {
  const response = await api.delete(`/${favoriId}`,config);
  return response.data;
};
