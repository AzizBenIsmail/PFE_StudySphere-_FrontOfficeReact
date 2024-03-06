import React, { useEffect, useState } from 'react'
import { createPopper } from '@popperjs/core'
import { MdNotifications, MdNotificationsActive } from 'react-icons/md'

import Cookies from 'js-cookie'
import { getNotificationByUser, markNotificationAsRead , markNotificationAsViewed } from '../../Services/ApiNotification'
import { useHistory } from 'react-router-dom'
import { getUserAuth } from '../../Services/Apiauth'
import moment from 'moment'

const NotificationDropdown = () => {

  if (!Cookies.get('jwt_token')) {
    window.location.replace('/login-page')
  }
  const jwt_token = Cookies.get('jwt_token')

  // const config = useMemo(() => {
  //   return {
  //     headers: {
  //       Authorization: `Bearer ${jwt_token}`,
  //     },
  //   };
  // }, [jwt_token]);

  const [user, setUser] = useState(null)
  const history = useHistory()
  const [readNotifications, setReadNotifications] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jwt_token) {
          const config = {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
          const res = await getUserAuth(config)
          console.log('User data:', res.data) // Log the user data to verify it
          setUser(() => {
            if (res.data.user.role === 'admin') {
              history.replace('/admin/')
            }
            return res.data.user
          })
        } else {
          history.replace('/')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [history, jwt_token])

  useEffect(() => {
    console.log('User:', user) // Log the user object to verify it
  }, [user])

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        if (user && user._id) {
          const response = await getNotificationByUser(user._id, { headers: { Authorization: `Bearer ${jwt_token}` } })
          const allNotifications = response.data
          const readNotifs = allNotifications.filter(notification => notification.read)
          const unreadNotifs = allNotifications.filter(notification => !notification.read)
          setReadNotifications(readNotifs)
          setUnreadNotifications(unreadNotifs)
        } else {
          console.error('User is null or user._id is undefined')
        }
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchUserNotifications()
  }, [user, jwt_token])

  const [notifications, setNotifications] = useState([])
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
  const btnDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef()

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    })
    setDropdownPopoverShow(true)
  }

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }

  const handleNotificationClick = async (notificationId) => {
    try {

      await markNotificationAsRead(notificationId, { headers: { Authorization: `Bearer ${jwt_token}` } })
      setNotifications(notifications.map(notification => {
        if (notification._id === notificationId) {
          return { ...notification, read: true }
        }
        return notification
      }))

    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const notificationIconClass = unreadNotifications.length > 0 ? 'text-red-500' : 'text-blueGray-500'

// Ajoutez un effet pour marquer les notifications comme vues lorsqu'elles sont affichées
  useEffect(() => {
    const markNotificationsAsViewed = async () => {
      try {
        if (user && user._id) {
          // Marquer toutes les notifications non vues comme vues
          await markAllNotificationsAsViewed(user._id, { headers: { Authorization: `Bearer ${jwt_token}` } });
        }
      } catch (error) {
        console.error('Error marking notifications as viewed:', error);
      }
    };

    markNotificationsAsViewed();
  }, [user, jwt_token]);

// Fonction pour marquer toutes les notifications non vues comme vues
  const markAllNotificationsAsViewed = async (userId, config) => {
    const response = await getNotificationByUser(userId, config);
    const unreadNotifications = response.data.filter(notification => !notification.vu);

    // Marquer chaque notification non vue comme vue
    unreadNotifications.forEach(async notification => {
      await markNotificationAsViewed(notification._id, config);
    });
  };


  return (
    <>
      <div
        className={`block py-1 px-3 ${notificationIconClass}`}
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}
      >
        {unreadNotifications.length > 0 ?
          <MdNotificationsActive className="mr-3" style={{ fontSize: '29px' }}/>
          :<MdNotifications className="mr-3" style={{ fontSize: '29px' }}/>}

      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 px-2 list-none text-left rounded shadow-lg mt-1 min-w-48'
        }
      >
        {unreadNotifications.length > 0 && (
          <div className="py-2 px-4 text-6xl font-normal leading-normal mt-0  text-red-500">Notifications non lues</div>
        )}
        {unreadNotifications.map(notification => (
          <div
            key={notification._id}
            className={`py-1 px-4 font-normal text-sm whitespace-normal bg-transparent text-blueGray-700 cursor-pointer hover:bg-blueGray-100 ${notification.read ? 'opacity-50' : ''}`}
            onClick={() => handleNotificationClick(notification._id)}
          >
            <div className="mb-1">{notification.content}</div>
            <div className="text-xs text-blueGray-500">{moment(notification.createdAt).format('DD/MM/YYYY HH:mm')}</div>
          </div>
        ))}
        {readNotifications.length > 0 && (
          <div className="py-2 px-4 text-6xl font-normal leading-normal mt-0 text-lightBlue-500">Plus tôt</div>
        )}
        {readNotifications.map(notification => (
          <div
            key={notification._id}
            className={`py-1 px-4 font-normal text-sm whitespace-normal bg-transparent text-blueGray-700 cursor-pointer hover:bg-blueGray-100 ${notification.read ? 'opacity-50' : ''}`}
            onClick={() => handleNotificationClick(notification._id)}
          >
            <div className="mb-1">{notification.content}</div>
            <div className="text-xs text-blueGray-500">{moment(notification.createdAt).format('DD/MM/YYYY HH:mm')}</div>
          </div>
        ))}

      </div>
    </>
  )
}
export default NotificationDropdown
