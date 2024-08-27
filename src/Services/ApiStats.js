import axios from 'axios';

const jwt_token = localStorage.getItem('jwt_token');

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/stats`, // Assurez-vous que l'URL est correcte
  headers: {
    Authorization: `Bearer ${jwt_token}`, // Ajout du jeton JWT dans les en-têtes
    'Content-Type': 'application/json' // Spécifie que le contenu envoyé est en JSON
  }
});

export const getAllStats = async () => {
  try {
    const response = await api.get('/totals');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};
