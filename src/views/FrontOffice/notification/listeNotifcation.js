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
        <div className="container mx-auto -mt-32 ">
          <div className="flex flex-wrap justify-center py-10">
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
                      Mes Notifications
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
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                      Notification
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                      Type
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                      Lu
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">
                      vu
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
                        {notification.content}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-bold">
                        {notification.type}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {notification.read ? "Oui" : "Non"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {notification.vu ? "Oui" : "Non"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={() =>  window.location.replace(`http://localhost:3000/${notification.url}`)  }>Afficher</button>
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
