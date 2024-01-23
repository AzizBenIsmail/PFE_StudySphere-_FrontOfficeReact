import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserAuth } from '../../Services/ApiUser';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Resetmdp() {
  const jwt_token = Cookies.get('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  // Session check
  if (Cookies.get('jwt_token')) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.role === 'client') {
            window.location.replace(`/landing/`);
          }
          if (res.data.user.role === 'admin') {
            window.location.replace(`/admin/`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  const location = useLocation();
  const message = new URLSearchParams(location.search).get('message');
  useEffect(() => {
    showNotification('success', message, 'success');

    const interval = setInterval(() => {}, 1000000);

    return () => clearInterval(interval);
  }, [config, message]);

  const showNotification = (type, title, message, autoDismissTime = 1000) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, title, autoDismissTime);
        break;
      case 'error':
        NotificationManager.error(message, title, autoDismissTime);
        break;
      case 'info':
        NotificationManager.info(title, message, autoDismissTime);
        break;
      // Add other types if necessary
      default:
        break;
    }
  };

  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === 'confirmPassword') {
      if (user.password !== e.target.value) {
        setPasswordError('Les mots de passe ne correspondent pas.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSavePassword = () => {
    // Perform password save logic here
    if (user.password === user.confirmPassword) {
      // Save the password
    } else {
      setPasswordError('Les mots de passe ne correspondent pas.');
    }
  };

  return (
    <>
      <NotificationContainer />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <Link
                    className="text-white text-sm font-bold leading-relaxed inline-flex items-center mr-4 py-2 whitespace-nowrap uppercase"
                    to="/"
                  >
                    {/* ... (previous code) */}
                  </Link>
                  <h6 className="text-3xl font-normal leading-normal mt-0 mb-2 text-lightBlue-800">
                    Réinitialiser mon mot de passe
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form encType="multipart/form-data">
                  {/* Password Input */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mot de passe
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Mot de passe"
                      type="password"
                      name="password"
                      onChange={(e) => handlechange(e)}
                      aria-label="Mot de passe"
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirmer mot de passe
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirmer mot de passe"
                      type="password"
                      name="confirmPassword"
                      onChange={(e) => handlechange(e)}
                      aria-label="Confirmer mot de passe"
                    />
                    {passwordError && (
                      <label style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                        {passwordError}
                      </label>
                    )}
                  </div>

                  <label>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSavePassword}
                      >
                        Sauvegarder mon mot de passe
                      </button>
                    </div>
                  </label>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/registerEmail?message=1" className="text-blueGray-200">
                  <small> .</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/login" className="text-blueGray-200">
                  <small> Se connecter </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
