import { React, useMemo, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
// import Cookies from 'js-cookie'
import { forgetPassword, getUserAuth, registerEmail } from '../../Services/Apiauth'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { MdMarkEmailUnread } from "react-icons/md";

export default function Register () {
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  //session
  if (jwt_token) {
    const fetchData = async () => {
      try {
        await getUserAuth(config).then((res) => {
          if (res.data.user.role === 'client') {
            window.location.replace(`/landing/`)
          }
          if (res.data.user.role === 'admin') {
            window.location.replace(`/admin/`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const location = useLocation()
  const message = new URLSearchParams(location.search).get('message')
  const [n, setN] = useState(0) // Ajout de la variable n
  const history = useHistory()
  const [emailError, setEmailError] = useState('')
  const   showNotification = (type, title, message, autoDismissTime = 1000) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, title, autoDismissTime = 1000)
        break
      case 'error':
        NotificationManager.error(message, title, autoDismissTime = 1000)
        break
      case 'info':
        NotificationManager.info(title, message, autoDismissTime = 2500)
        break
      // Ajoutez d'autres types si nécessaire
      default:
        break
    }
  }
  const [User, setUser] = useState({
    email: '',
  })
  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value })
    // console.log(User)

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
  const add = async (e) => {
    try {
      if (emailError === 'Veuillez entrer une adresse e-mail valide.') {
        showNotification('info', '', 'Veuillez entrer une adresse e-mail valide !')
      } else {
        if (User.email === '') {
          showNotification('error', 'Email Obligatoire', 'Vide !')
          setN(1) // Utilisation de setN pour mettre à jour la valeur de n
        } else {
          const res = await registerEmail(User)
          console.log(res.data.message) // Log the actual response object
          if (res.data.message === undefined) {
            // showNotification('success', 'Ouvrez votre email', 'Vérifiez votre email !')
            // setTimeout(() => {
            history.push('/auth/VerificationEmail')
            // }, 1100)
          } else {
            showNotification('error', 'Cet e-mail est déjà enregistré', res.data.message)
          }
        }
      }
    } catch (error) {
      console.error(error) // Log any errors that occur during the API call
    }
  }

  const forget = async (email) => {
      if (User.email === '') {
        showNotification('error', 'Email Obligatoire', 'Vide !')
        setN(1) // Utilisation de setN pour mettre à jour la valeur de n
      } else {
        const res = await forgetPassword(email)
        console.log(res.data.message) // Log the actual response object
        if (res.data.message === 'mot de passe modifié avec succès vérifier votre boîte mail') {
          history.push('/auth/VerificationMotDePasse')
        }else{
          showNotification('error', 'Cet e-mail n est pas enregistré', 'Email n\'existe pas !')
        }
      }
  }

  return (
    <>
      <NotificationContainer/>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <Link
                    className="text-white text-sm font-bold leading-relaxed inline-flex items-center mr-4 py-2 whitespace-nowrap uppercase"
                    to="/"
                  >
                  </Link>
                  {message === '1' ? (
                    <h6 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-lightBlue-800">
                      <MdMarkEmailUnread />
                      Réinitialiser Votre mot de passe
                    </h6>
                  ) : (
                    <h6 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-lightBlue-800">
                      <MdMarkEmailUnread />
                      Se connecter ou créer un compte
                    </h6>
                  )}

                </div>
                {/*<div className="btn-wrapper text-center">*/}
                {/*  <button*/}
                {/*    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"*/}
                {/*    type="button"*/}
                {/*  >*/}
                {/*    <img*/}
                {/*      alt="..."*/}
                {/*      className="w-5 mr-1"*/}
                {/*      src={require('assets/img/github.svg').default}*/}
                {/*    />*/}
                {/*    Github*/}
                {/*  </button>*/}
                {/*  <button*/}
                {/*    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"*/}
                {/*    type="button"*/}
                {/*  >*/}
                {/*    <img*/}
                {/*      alt="..."*/}
                {/*      className="w-5 mr-1"*/}
                {/*      src={require('assets/img/google.svg').default}*/}
                {/*    />*/}
                {/*    Google*/}
                {/*  </button>*/}
                {/*</div>*/}
                <hr className="mt-6 border-b-1 border-blueGray-300"/>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/*<div className="text-blueGray-400 text-center mb-3 font-bold">*/}
                {/*  <small>Or sign up with credentials</small>*/}
                {/*</div>*/}
                <form encType="multipart/form-data">

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
                      type="text"
                      name="email"
                      onChange={(e) => handlechange(e)}
                      label="Email"
                      aria-label="Email"
                    />
                    {n === 1 && User.email === '' ? (
                      <label style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                        Email obligatoires
                      </label>
                    ) : (
                      ''
                    )}{emailError && (
                    <label style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                      {emailError}
                    </label>
                  )}
                  </div>

                  {message === '1' ? (
                    <label>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={(e) => forget(User.email)}
                        >
                          Réinitialiser mon mot de passe
                        </button>
                      </div>
                    </label>
                  ) : (
                    <label>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={(e) => add(e)}
                        >
                          Verfier Email
                        </button>
                      </div>
                    </label>
                  )}

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
