// apiNotification.js

import axios from 'axios';

const apiURL = 'http://localhost:5000/notification';

// Fonction pour créer une nouvelle notification
export async function createNotification(notificationData, config) {
  return await axios.post(`${apiURL}`, notificationData, config);
}

// Fonction pour récupérer toutes les notifications
export async function getAllNotifications(config) {
  return await axios.get(`${apiURL}`, config);
}

// Fonction pour récupérer une notification par son ID
export async function getNotificationById(notificationId, config) {
  return await axios.get(`${apiURL}/${notificationId}`, config);
}

// Fonction pour récupérer les notifications d'un utilisateur
export async function getNotificationByUser(userId, config) {
  return await axios.get(`${apiURL}/${userId}`, config);
}

// Fonction pour mettre à jour une notification
export async function updateNotification(notificationId, notificationData, config) {
  return await axios.put(`${apiURL}/${notificationId}`, notificationData, config);
}

// Fonction pour supprimer une notification par son ID
export async function deleteNotification(notificationId, config) {
  return await axios.delete(`${apiURL}/${notificationId}`, config);
}

// Fonction pour marquer une notification comme lue
export const markNotificationAsRead = async (notificationId, config) => {
  return await axios.put(`${apiURL}/${notificationId}/read`, null, config);
};

export const markNotificationAsViewed = async (notificationId, config) => {
  return  await axios.put(`${apiURL}/${notificationId}/markAsRead`, null, config);
};
