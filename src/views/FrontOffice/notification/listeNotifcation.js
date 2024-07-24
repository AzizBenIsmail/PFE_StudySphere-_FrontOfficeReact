import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from "prop-types";
// components

// import Cookies from 'js-cookie'
import {
  getNotificationByUser,
} from '../../../Services/ApiNotification'

export default function CardTable({ color }) {
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token]);

  const [notifications, setNotifications] = useState([]);

  const loadNotifications = useCallback(async () => {
    try {
      const res = await getNotificationByUser(config);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, [config]);

  useEffect(() => {
    loadNotifications(); // Charger les notifications lors de l'entrée dans la page

    const interval = setInterval(() => {
      loadNotifications(); // Rafraîchir les notifications toutes les 5 secondes
    }, 5000);

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, [loadNotifications]);


  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap justify-center py-10 -mt-32">
          <div className="relative flex flex-col min-w-0 break-words w-full lg:w-8/12 xl:w-6/12 mb-6 shadow-lg rounded bg-lightBlue-900 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-white">
                   La liste de Mes Notifications
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Aucune notification disponible.</p>
                </div>
              ) : (
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                  <tr>
                    <th className="px-4 py-3 text-xs uppercase border-b border-lightBlue-700 bg-lightBlue-800 text-lightBlue-300 font-semibold text-left">
                      Notification
                    </th>
                    <th className="px-4 py-3 text-xs uppercase border-b border-lightBlue-700 bg-lightBlue-800 text-lightBlue-300 font-semibold text-left">
                      Type
                    </th>
                    <th className="px-4 py-3 text-xs uppercase border-b border-lightBlue-700 bg-lightBlue-800 text-lightBlue-300 font-semibold text-left">
                      Actions
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {notifications.map((notification) => (
                    <tr key={notification._id}>
                      <td className="px-4 py-2 border-t border-lightBlue-700 text-xs text-white font-bold">
                        {notification.content}
                      </td>
                      <td className="px-4 py-2 border-t border-lightBlue-700 text-xs text-white font-bold">
                        {notification.type}
                      </td>
                      <td className="px-4 py-2 border-t border-lightBlue-700 text-xs text-white">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                          onClick={() => window.location.replace(`http://localhost:3000/${notification.url}`)}
                        >
                          Afficher
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
