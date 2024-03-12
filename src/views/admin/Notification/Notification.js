import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from "prop-types";
import { getAllNotifications, deleteNotification, createNotification, updateNotification } from "../../../Services/ApiNotification";
import { FaAngleDown } from 'react-icons/fa';
import Cookies from 'js-cookie';

export default function Notification() {
  const jwt_token = Cookies.get('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token]);

  const [notifications, setNotifications] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [showEditNotification, setShowEditNotification] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [notificationToEdit, setNotificationToEdit] = useState(null);
  const [newNotification, setNewNotification] = useState({
    content: "",
    type: "",
    read: false,
    // Ajoutez d'autres champs de notification selon votre modèle
  });

  const [errors, setErrors] = useState({
    content: "",
    type: "",
    // Ajoutez d'autres champs d'erreurs selon votre modèle
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!newNotification.content.trim()) {
      newErrors.content = "Le contenu de la notification est requis";
      valid = false;
    }

    if (!newNotification.type.trim()) {
      newErrors.type = "Le type de la notification est requis";
      valid = false;
    }

    // Validez les autres champs de notification selon votre modèle

    setErrors(newErrors);
    return valid;
  };


  const loadNotifications = useCallback(async () => {
    try {
      const res = await getAllNotifications(config);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, [config]);


  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);


  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id,config);
      loadNotifications();
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleAddNotification = async () => {
    if (validateForm()) {
      try {
        // Créez une nouvelle notification
        await createNotification(newNotification,config);
        loadNotifications();
        setShowAddNotification(false);
        setNewNotification({
          content: "",
          type: "",
          read: false,
          // Réinitialisez d'autres champs de notification selon votre modèle
        });
        setErrors({
          content: "",
          type: "",
          // Réinitialisez d'autres champs d'erreurs selon votre modèle
        });
      } catch (error) {
        console.error("Error adding notification:", error);
      }
    }
  };

  const showDeleteConfirmation = (id) => {
    setShowConfirm(true);
    setNotificationToDelete(id);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setNotificationToDelete(null);
  };

  const showAddNotificationPopup = () => {
    setShowAddNotification(true);
  };

  const cancelAddNotification = () => {
    setShowAddNotification(false);
    setNewNotification({
      content: "",
      type: "",
      read: false,
      // Réinitialisez d'autres champs de notification selon votre modèle
    });
  };

  const handleEditNotification = async () => {
    if (validateForm()) {
      try {
        // Mettez à jour la notification
        await updateNotification(notificationToEdit._id, newNotification ,config);
        loadNotifications();
        setShowEditNotification(false);
        setNotificationToEdit(null);
        setNewNotification({
          content: "",
          type: "",
          read: false,
          // Réinitialisez d'autres champs de notification selon votre modèle
        });
        setErrors({
          content: "",
          type: "",
          // Réinitialisez d'autres champs d'erreurs selon votre modèle
        });
      } catch (error) {
        console.error("Error updating notification:", error);
      }
    }
  };

  const showEditNotificationPopup = (notification) => {
    setNotificationToEdit(notification);
    setNewNotification(notification);
    setShowEditNotification(true);
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg text-white"
                }
              >
                Gestion des Notifications
              </h3>
            </div>
            <button
              className="bg-transparent border border-solid hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={showAddNotificationPopup}
            >
              <div className="flex items-center">
                Ajouter une notification
                <FaAngleDown className="ml-3"/>
              </div>
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Notifications table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                utilisateur
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                Contenu
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                Type
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                Lu
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            {notifications && notifications.map((notification) => (
              <tr key={notification._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                  {notification && notification.recipient.image_user ? (
                    <div className="flex items-center">
                      <img src={`http://localhost:5000/images/Users/${notification.recipient.image_user}`}
                           alt="..."
                           className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                      <span className="ml-2">{notification.recipient.nom}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center">
                      <img
                        alt="..."
                        src={require("assets/img/client.png").default}
                        style={{ maxWidth: '120%' }}
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                      <span className="ml-2">{notification.recipient.nom}</span>
                    </div>
                    </div>
                  )}

                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                  {notification.content}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                  {notification.type}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {notification.read ? "Oui" : "Non"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => showDeleteConfirmation(notification._id)}>Supprimer</button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => showEditNotificationPopup(notification)}>Modifier</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup de confirmation */}
      {showConfirm && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <p>Êtes-vous sûr de vouloir supprimer cette notification ?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={() => handleDeleteNotification(notificationToDelete)}>Confirmer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'ajout de notification */}
      {showAddNotification && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Ajouter une nouvelle notification</h3>
            <div className="mb-4">
              <input type="text" placeholder="Contenu de la notification" value={newNotification.content} onChange={(e) => setNewNotification({...newNotification, content: e.target.value})} />
              {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Type de la notification" value={newNotification.type} onChange={(e) => setNewNotification({...newNotification, type: e.target.value})} />
              {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleAddNotification}>Ajouter</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={cancelAddNotification}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'édition de notification */}
      {showEditNotification && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h3>Modifier la notification</h3>
            <div className="mb-4">
              <input type="text" placeholder="Contenu de la notification" value={newNotification.content} onChange={(e) => setNewNotification({...newNotification, content: e.target.value})} />
              {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Type de la notification" value={newNotification.type} onChange={(e) => setNewNotification({...newNotification, type: e.target.value})} />
              {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
            </div>
            <div className="flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded mr-4" onClick={handleEditNotification}>Enregistrer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditNotification(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Notification.defaultProps = {
  color: "light",
};

Notification.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
