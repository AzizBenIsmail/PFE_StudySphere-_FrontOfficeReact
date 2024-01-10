import { React, useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserAuth, register } from '../../Services/ApiUser';
import { useLocation } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Register() {
  const jwt_token = Cookies.get('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };
  }, [jwt_token]);

  //session
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
  const email = new URLSearchParams(location.search).get('email');

  const showNotification = (type, title, message) => {
    switch (type) {
      case 'success':
        NotificationManager.success(title, message);
        break;
      case 'error':
        NotificationManager.error(title, message);
        break;
      case 'info':
        NotificationManager.info(title, message);
        break;
      case 'warning':
        NotificationManager.warning(title, message);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    showNotification('success', message, 'success');

    const interval = setInterval(() => {}, 1000000);

    return () => clearInterval(interval);
  }, [config, message]);

  const [User, setUser] = useState({
    nom: '',
    prenom: '',
    email: email,
    password: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUser({ ...User, password: newPassword });

    const strengthCode = checkPasswordStrength(newPassword);
    setPasswordStrength(strengthCode);
  };

  const checkPasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+]/.test(password);

    if (password.length < 8) {
      return 1; // Faible
    } else if (hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
      return 3; // Fort
    } else {
      return 2; // Moyen
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 1:
        return 'bg-red-200';
      case 2:
        return 'bg-yellow-200';
      case 3:
        return 'bg-green-200';
      default:
        return '';
    }
  };

  const add = async (e) => {
    const res = await register(User);
    console.log(res.data);
    if (res.data.message === undefined) {
      // window.location.replace(`/auth/login/`);
    }else{
      showNotification('error', res.data.message, 'Erreur')
    }  };

  return (
    <>
      <NotificationContainer />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require('assets/img/github.svg').default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require('assets/img/google.svg').default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form encType="multipart/form-data">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Nom
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="nom"
                      type="text"
                      name="nom"
                      onChange={(e) => setUser({ ...User, nom: e.target.value })}
                      label="nom"
                      aria-label="nom"
                    />
                    {(User.nom.length < 3 || User.nom.length > 15) && (
                      <label style={{ color: 'red' }}>
                        Le Nom doit contenir entre 3 et 15 caractères.
                      </label>
                    )}
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Prenom
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="prenom"
                      type="text"
                      name="prenom"
                      onChange={(e) => setUser({ ...User, prenom: e.target.value })}
                      label="prenom"
                      aria-label="prenom"
                    />
                    {(User.prenom.length < 3 || User.prenom.length > 15) && (
                      <label style={{ color: 'red' }}>
                        Le Prenom doit contenir entre 3 et 15 caractères.
                      </label>
                    )}
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Password
                    </label>
                    <input
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${getStrengthColor(passwordStrength)}`}
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(e) => handlePasswordChange(e)}
                      label="Password"
                      aria-label="Password"
                    />
                    {(passwordStrength === 1 || passwordStrength === 2) && (
                      <label style={{ color: 'red' }}>
                        Le Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole Exemple mdp : Exemple@123 | Exemple#123 | Exemple.123 | Exemple/123 | Exemple*123
                      </label>
                    )}
                    {passwordStrength === 1 && <label style={{ color: 'red' }}>Le Mot de passe doit contenir au moins 8 caractères</label>}
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                        <div style={{ width: `${(passwordStrength / 3) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{' '}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={(e) => add(e)}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a href="#pablo" className="text-blueGray-200">
                  <small> .</small>
                </a>
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
  );
}
