import React, { useEffect, useMemo, useState } from "react";
import { createPopper } from "@popperjs/core";
import { MdNotifications, MdNotificationAdd } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import {
  getNotificationByUser,
  markNotificationAsRead,
  markNotificationAsViewed,
} from "../../Services/ApiNotification";
import moment from "moment";

const NotificationDropdown = ({user}) => {

  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  const [readNotifications, setReadNotifications] = useState([]);
  const [vue, setVues] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        if (user && user._id) {
          const response = await getNotificationByUser({
            headers: { Authorization: `Bearer ${jwt_token}` },
          });
          const allNotifications = response.data;
          const readNotifs = allNotifications.filter(
            (notification) => notification.read
          );
          const unreadNotifs = allNotifications.filter(
            (notification) => !notification.read
          );
          const vuNotifs = allNotifications.filter(
            (notification) => !notification.vu
          );
          setReadNotifications(readNotifs.slice(0, 5)); // Prend les 5 premières notifications lues
          setUnreadNotifications(unreadNotifs.slice(0, 5)); // Prend les 5 premières notifications non lues
          setVues(vuNotifs);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUserNotifications();

    // Rafraîchir les notifications toutes les deux secondes
    const intervalId = setInterval(fetchUserNotifications, 7000);

    return () => clearInterval(intervalId);
  }, [user, jwt_token]);

  const [notifications, setNotifications] = useState([]);
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [classname, setClassname] = useState("mr-3 ml-3 text-blueGray-300");
  const handleNotificationClick = async (notif) => {
    try {
      await markNotificationAsRead(notif._id, {
        headers: { Authorization: `Bearer ${jwt_token}` },
      });
      setNotifications(
        notifications.map((notification) => {
          if (notification._id === notif.id) {
            return { ...notification, read: true };
          }
          return notification;
        })
      );
      window.location.replace(`http://localhost:3000/${notif.url}`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllNotificationsAsViewed = async (config) => {
    const response = await getNotificationByUser(config);
    const unreadNotifications = response.data.filter(
      (notification) => !notification.vu
    );

    unreadNotifications.forEach(async (notification) => {
      await markNotificationAsViewed(notification._id, config);
    });
  };

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    markAllNotificationsAsViewed(config);
    setDropdownPopoverShow(true);
    popoverDropdownRef.current.style.width = "300px"; // Largeur fixe
    setClassname(
      "mr-3 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs py-1 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    );
  };

  const closeDropdownPopover = async () => {
    // if (user && user._id) {
    //   const response = await getNotificationByUser(user._id, { headers: { Authorization: `Bearer ${jwt_token}` } })
    //   const allNotifications = response.data
    //   const readNotifs = allNotifications.filter(notification => notification.read)
    //   const unreadNotifs = allNotifications.filter(notification => !notification.read)
    //   const vuNotifs = allNotifications.filter(notification => !notification.vu)
    //   setReadNotifications(readNotifs)
    //   setUnreadNotifications(unreadNotifs)
    //   setVues(vuNotifs)
    // } else {
    //   console.error('User is null or user._id is undefined')
    // }
    setClassname("mr-3 text-white ml-3");
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <div
        className={`block py-1 px-3 ${
          vue.length > 0 ? "text-red-500" : "text-blueGray-500"
        }`}
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        {vue.length > 0 ? (
          <MdNotificationAdd
            className={classname}
            style={{ fontSize: "35px", fontWeight: "bold", color: "#FF0000" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          />
        ) : (
          <MdNotifications className={classname} style={{ fontSize: "35px" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          />
        )}
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 px-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
        }
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-blueGray-400 font-bold">Notifications</div>
          <a
            className="text-lightBlue-600 text-right"
            href="/landing/notification"
          >
            Voir tous
          </a>
        </div>

        {unreadNotifications.length > 0 && (
          <div className="py-2 px-4 text-6xl font-normal leading-normal mt-0 font-bold text-red-500">
            {" "}
            Nouveau{" "}
          </div>
        )}
        {unreadNotifications.map((notification) => (
          <div
            key={notification._id}
            className={`py-1 px-4 font-normal text-sm whitespace-normal bg-transparent text-blueGray-700 cursor-pointer hover:bg-blueGray-100 ${
              notification.read ? "opacity-50" : ""
            }`}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            onClick={() => handleNotificationClick(notification)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="mb-1">{notification.content}</div>
              <GoDotFill
                className="mr-1 text-lightBlue-500"
                style={{ fontSize: "24px" }}
              />
            </div>
            <div className="text-xs text-blueGray-500">
              {moment(notification.createdAt).format("DD/MM/YYYY HH:mm")}
            </div>
          </div>
        ))}
        {readNotifications.length > 0 && (
          <div className="py-2 px-4 text-6xl font-normal leading-normal mt-0 font-bold text-lightBlue-500">
            Plus tôt
          </div>
        )}
        {readNotifications.map((notification) => (
          <div
            key={notification._id}
            className={`py-1 px-4 font-normal text-sm whitespace-normal bg-transparent text-blueGray-700 cursor-pointer hover:bg-blueGray-100 ${
              notification.read ? "opacity-50" : ""
            }`}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0px 0px 30px 0px rgba(0,0,0,0.3)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="mb-1">{notification.content}</div>
            <div className="text-xs text-blueGray-500">
              {moment(notification.createdAt).format("DD/MM/YYYY HH:mm")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationDropdown;
