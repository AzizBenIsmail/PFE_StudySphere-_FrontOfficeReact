import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LoginUser } from '../../Services/Apiauth'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { useHistory } from 'react-router-dom';

export default function Login () {
  const [User, setUser] = useState({
    email: '',
    password: '',
  })
  const history = useHistory();

  const [n, setN] = useState(0) // Ajout de la variable n
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value })

    if (e.target.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isValidEmail = emailRegex.test(e.target.value)

      if (!isValidEmail) {
        setEmailError('Veuillez entrer une adresse e-mail valide.')
      } else {
        setEmailError('')
      }
    }
  }

  const showNotification = (type, title, message, autoDismissTime = 1000) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, title, autoDismissTime = 1000)
        break
      case 'error':
        NotificationManager.error(message, title, autoDismissTime = 1000)
        break
      case 'info':
        NotificationManager.info(title, message, autoDismissTime = 3000)
        break
      // Ajoutez d'autres types si nécessaire
      default:
        break
    }
  }

  const location = useLocation()
  const message = new URLSearchParams(location.search).get('message')
  useEffect(() => {
    if (message) {
      showNotification('success', message, 'success')
    }

    const interval = setInterval(() => {}, 1000000)

    return () => clearInterval(interval)
  }, [message])

  const Login = async (user) => {
    setLoading(true);
    setN(0)
    if (emailError === 'Veuillez entrer une adresse e-mail valide.') {
      showNotification('info', 'valide !', 'Veuillez entrer une adresse e-mail')
    } else {
      if (user.email === '' && user.password === '') {
        showNotification('error', 'Email et mot de passe Obligatoire', 'Vide !')
        setN(1) // Utilisation de setN pour mettre à jour la valeur de n
      } else if (user.email === '') {
        showNotification('error', 'Email Obligatoire', 'Vide !')
        setN(2)
      } else if (user.password === '') {
        showNotification('error', 'Mot de Passe Obligatoire', 'Vide !')
        setN(3)
      } else {
        try {
          const res = await LoginUser(user)
          const now = new Date();
          const expiration = now.getTime() + 2 * 60 * 1000; // 2 minutes in milliseconds
          const tokenObject = {
            value: res.data.token,
            expiration: expiration
          };
          if (res.data.token) {
            localStorage.setItem('jwt_token', tokenObject); // Stocker le token dans le localStorage
          }
          if (res.data.user.role === 'admin' || res.data.user.role === 'moderateur' ) {
            // window.location.replace(`/admin`)
            history.push(`/admin/tables`);
          } else if (res.data.user.role === 'client' || res.data.user.role === 'formateur' || res.data.user.role === 'centre' ) {
            if (res.data.user.visitsCount === 0 && res.data.user.role === 'client' ) {
              // window.location.replace(`/First/Step?n=1`)
              // window.location.replace(`/First/announcement`)
              history.push(`/First/announcement`);
            } else if (res.data.user.visitsCount === 0 && res.data.user.role === 'centre' ) {
              // window.location.replace(`/First/announcementCenter`)
              history.push(`/First/announcementCenter`);
            }
            else if (res.data.user.visitsCount === 0 && res.data.user.role === 'formateur' ) {
              // window.location.replace(`/First/announcementFormateur`)
              history.push(`/First/announcementFormateur`);

            }
            else {
              window.location.replace(`/landing/`)
              // history.push(`/landing/`);

            }
          }
        } catch (error) {
          if (error.response.data.erreur === 'compte desactive') {
            showNotification('error', 'Compte Désactivé', 'Compte Désactivé !')
          } else if (error.response.data.erreur === 'incorrect password') {
            showNotification('error', 'Mot de Passe Incorrect', 'Mot de passe incorrect !')
          } else if (error.response.data.erreur === 'incorrect email') {
            showNotification('error', 'Email Incorrect', 'Email incorrect !')
          }
        }
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }

  return (
    <>
      <NotificationContainer/>
      <div className="container mx-auto h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 ">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-5 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-4 py-4">
                <div className="text-center mb-3">
                  <Link
                    className="text-white text-sm font-bold leading-relaxed inline-flex items-center mr-4 py-2 whitespace-nowrap uppercase"
                    to="/"
                  >
                  </Link>
                  <h6 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-lightBlue-800">
                    Se Connecter
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300"/>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/*<div className="text-blueGray-400 text-center mb-3 font-bold">*/}
                {/*  <small>Or sign in with credentials</small>*/}
                {/*</div>*/}
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email Address"
                      type="email"
                      name="email"
                      onChange={(e) => handlechange(e)}
                      label="Email"
                      aria-label="Email"
                    />
                    {n === 1 || (n === 2 && User.email === '') ? (
                      <label style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                        Email obligatoires pour se connecter
                      </label>
                    ) : (
                      ''
                    )}
                    {emailError && (
                      <label style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                        {emailError}
                      </label>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      type="password"
                      placeholder="Mot De Passe"
                      name="password"
                      onChange={(e) => handlechange(e)}
                      label="Password"
                      aria-label="Password"
                    />
                    {n === 1 || (n === 3 && User.password === '') ? (
                      <label style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                        Mot de passe obligatoires pour se connecter
                      </label>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => Login(User, n)}
                      disabled={loading} // Désactivez le bouton si loading est vrai
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/registerEmail?message=1" className="text-blueGray-200">
                  <small> Réinitialiser mon mot de passe ?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/registerEmail" className="text-blueGray-200">
                  <small> Créer un nouveau </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
