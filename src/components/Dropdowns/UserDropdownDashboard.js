import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createPopper } from '@popperjs/core';
import { getUserAuth, logout } from '../../Services/Apiauth';

const UserDropdownDashboard = () => {
  const [user, setUser] = useState({});
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  const jwt_token = localStorage.getItem('jwt_token');
  if (!jwt_token) {
    window.location.replace('/login-page');
  }

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const res = await getUserAuth(config);
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    getAuthUser();
  }, [config]);

  const handleLogout = async () => {
    try {
      await logout(config, user._id);
      localStorage.removeItem('jwt_token');
      window.location.replace('/login/');
    } catch (err) {
      console.error(err);
    }
  };

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {user.image_user && (
              <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={`${process.env.REACT_APP_API_URL_IMAGE_USERS}/${user.image_user}`}
              />
            )}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <a
          href="/"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          onClick={handleLogout}
        >
          Se déconnecter
        </a>
      </div>
    </>
  );
};

export default UserDropdownDashboard;
