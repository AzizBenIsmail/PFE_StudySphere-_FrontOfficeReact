import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from "prop-types";
// components

import Navbar from '../../../components/Navbars/Navbar.js'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { getUserAuth } from '../../../Services/Apiauth'
import Footer from "../../../components/Footers/FooterSmall.js";
import {
  getNotificationByUser,
} from '../../../Services/ApiNotification'

export default function CardTable({ color }) {
  const [user, setUser] = useState(null);
  const jwt_token = Cookies.get('jwt_token');
  const history = useHistory();

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jwt_token) {
          const config = {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          };
          const res = await getUserAuth(config);
          setUser(() => {
            if (res.data.user.role === 'admin') {
              history.replace('/admin/');
            }
            return res.data.user;
          });
        } else {
          history.replace('/');
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [history, jwt_token]); // Inclure history et jwt_token dans le tableau de dépendances

  const [notifications, setNotifications] = useState([]);

  const loadNotifications = useCallback(async () => {
    try {
      const res = await getNotificationByUser(user._id,config);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, [config,user]);

  useEffect(() => {
    loadNotifications(); // Charger les notifications lors de l'entrée dans la page

    const interval = setInterval(() => {
      loadNotifications(); // Rafraîchir les notifications toutes les 5 secondes
    }, 5000);

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, [loadNotifications]);


  return (
    <>
      <Navbar user={user}/>
      <section className="py-10 bg-bleu-500 overflow-hidden ">
        <div className="container mx-auto ">
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
                {/* Notifications table */}
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
              </div>
            </div>
            </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
