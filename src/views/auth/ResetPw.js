import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Password } from '../../Services/Apiauth';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function ResetPw() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);



  const [isLoading, setIsLoading] = useState(false);
  const message = new URLSearchParams(location.search).get('message');
  const email = new URLSearchParams(location.search).get('email');
  const [n, setN] = useState(0) // Ajout de la variable n
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [messageerr, setmessageerr] = useState()

  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
    email : email ,
    token : token,
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    showNotification('success', 'success', message);

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
      default:
        break;
    }
  };

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    const newPassword = user.password

    if (e.target.name === 'confirmPassword') {
      if (user.password !== e.target.value) {
        setPasswordError('Les mots de passe ne correspondent pas.');
      } else {
        setPasswordError('');
      }
    }
    const strengthCode = checkPasswordStrength(newPassword)
    setPasswordStrength(strengthCode)
    console.log(user)
  };
  const checkPasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasDigit = /\d/.test(password)

    if (password.length === 0) {
      return 0 // Le nom existe dans le mot de passe (Faible)
    } else if (password.length < 4) {
      setN(1)
      return 1 // Faible
    } else if (password.length < 8) {
      setN(2)
      return 2 // Faible
    } else if (hasUppercase && hasLowercase && hasDigit) {
      setN(4)
      return 4 // Très fort (ajoutez vos propres critères)
    } else {
      return 2 // Moyen
    }
  }

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500'
      case 1:
        return 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500'
      case 2:
        return 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500'
      case 3:
        return 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500'
      case 4:
        return 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500'
      default:
        return 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500'
    }
  }

  const getColor = (strength) => {
    switch (strength) {
      case 0:
        return 'overflow-hidden h-2 mb-4 text-xs flex rounded bg-lightBlue-200'
      case 1:
        return 'overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200'
      case 2:
        return 'overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200'
      case 3:
        return 'overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200'
      case 4:
        return 'overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200'
      default:
        return 'overflow-hidden h-2 mb-4 text-xs flex rounded bg-lightBlue-200'
    }
  }

  const handleSavePassword = async () => {
    // console.log(config);
    if (user.password === user.confirmPassword || user.password=== '') {
      if(n === 4) {
        try {
          setIsLoading(true);
          const response = await Password(user,config);
          console.log(response);
          if (response.data.message === "Mot de passe modifié avec succès. Veuillez vérifier votre boîte mail.") {
            window.location.replace(`/auth/login/`)
            // console.log(response);
            // showNotification('success', 'Success', response.data.message);
          } else {
            setmessageerr(response.data.message)
            showNotification('error',response.data.message, 'Erreur')
          }
        } catch (error) {
          // console.log(error);
          showNotification('error', 'Error', 'error');
        } finally {
          setIsLoading(false);
        }
      }else{
        showNotification('error', 'Error', "Exemple mdp : Exemple@123");
      }
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
                  <h6 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-lightBlue-800">
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
                    {n === 1 || n === 2 || messageerr === 'Le Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole Exemple mdp : Exemple@123 | Exemple#123 | Exemple.123 | Exemple/123 | Exemple*123' ||
                    messageerr === 'Le Mot de passe doit contenir au moins 8 caractères' ? (
                      <label style={{ color: 'red' }}>
                        Le Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et
                        un symbole Exemple mdp : Exemple@123 | Exemple#123 | Exemple.123 | Exemple/123 |
                        Exemple*123 </label>
                    ) : (
                      ''
                    )}

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
                  <div className="relative pt-1">
                    <div className={`${getColor(passwordStrength)}`}>
                      <div style={{ width: `${(passwordStrength / 3) * 100}%` }}
                           className={`${getStrengthColor(passwordStrength)}`}></div>
                    </div>
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
                  {isLoading && <p>Chargement en cours...</p>}
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
  );
}
