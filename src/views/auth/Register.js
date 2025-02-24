import { React, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import Cookies from 'js-cookie'
import { register } from '../../Services/Apiauth'
import { NotificationContainer, NotificationManager } from 'react-notifications'

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


  const location = useLocation()
  const message = new URLSearchParams(location.search).get('message')
  const email = new URLSearchParams(location.search).get('email')

  const [n, setN] = useState(0) // Ajout de la variable n

  const showNotification = (type, title, message, autoDismissTime = 1000) => {
    switch (type) {
      case 'success':
        NotificationManager.success(title, message, autoDismissTime = 1000)
        break
      case 'error':
        NotificationManager.error(title, message, autoDismissTime = 1000)
        break
      case 'info':
        NotificationManager.info(title, message, autoDismissTime = 2500)
        break
      case 'warning':
        NotificationManager.warning(title, message, autoDismissTime = 1000)
        break
      default:
        break
    }
  }

  useEffect(() => {
    showNotification('success', message, 'success')

    const interval = setInterval(() => {}, 1000000)

    return () => clearInterval(interval)
  }, [config, message])

  const [User, setUser] = useState({
    nom: '',
    prenom: '',
    email: email,
    role:"client",
    password: '',
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setUser({ ...User, password: newPassword })

    const strengthCode = checkPasswordStrength(newPassword, User.nom)
    setPasswordStrength(strengthCode)
  }

  const checkPasswordStrength = (password, nom) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasDigit = /\d/.test(password)
    const normalizedNom = nom.toLowerCase()
    const passwordLowerCase = password.toLowerCase()

    if (password.length === 0) {
      return 0 // Le nom existe dans le mot de passe (Faible)
    } else if (passwordLowerCase.includes(normalizedNom)) {
      return 1 // Le nom existe dans le mot de passe (Faible)
    } else if (password.length < 3) {
      return 1 // Faible
    } else if (password.length < 8) {
      return 2 // Faible
    } else if (hasUppercase && hasLowercase && hasDigit) {
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
  const [messageerr, setmessageerr] = useState()

  const add = async (e) => {
    const normalizedNom = User.nom.toLowerCase()
    const passwordLowerCase = User.password.toLowerCase()
    if (User.nom === '' && User.prenom === '' && User.password === '' ) {
      showNotification('error', 'Nom et Prenom et Password Obligatoire', 'Vide !')
      setN(4) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '' && User.prenom === '' ) {
      showNotification('error', 'Nom et Prenom Obligatoire', 'Vide !')
      setN(5) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.prenom === '' && User.password === '' ) {
      showNotification('error', 'Prenom et Password Obligatoire', 'Vide !')
      setN(6) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '' && User.password === '' ) {
      showNotification('error', 'Nom et Password Obligatoire', 'Vide !')
      setN(7) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '' ) {
      showNotification('error', 'Nom et Obligatoire', 'Vide !')
      setN(1) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.prenom === '') {
      showNotification('error', 'Prenom Obligatoire', 'Vide !')
      setN(2)
    } else if (User.password === '') {
      showNotification('error', 'Mot de Passe Obligatoire', 'Vide !')
      setN(3)
    } else if (passwordLowerCase.includes(normalizedNom)) {
      NotificationManager.error('Il est important de ne pas inclure ton nom dans le mot de passe.', 'Nom dans le mot de passe')
    } else {
      const res = await register(User)
      console.log(res.data)
      if (res.data.message === undefined) {
        window.location.replace(`/auth/login/`)
      } else {
        setmessageerr(res.data.message)
        showNotification('error', res.data.message, 'Erreur')
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
                <div className="text-center ">
                  <h6 className="mt-6 text-3xl font-semibold leading-normal mt-0 mb-2 text-lightBlue-800">
                    S'inscrire
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300"/>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/*<div className="text-blueGray-400 text-center mb-3 font-bold">*/}
                {/*  <small>Or sign up with credentials</small>*/}
                {/*</div>*/}
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
                    {n === 1 || n === 4 || n === 5 || n === 7 || messageerr === 'Le Nom doit contenir plus de 3 caractères' ||
                    messageerr === 'Le Nom doit contenir moins de 15 caractères' ? (
                      <label style={{ color: 'red' }}>
                        Le Nom doit contenir plus de 3 et moin de 15
                      </label>
                    ) : (
                      ''
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
                    {n === 2 || n === 4 || n === 5 || n === 6 ||messageerr === 'Le Prenom doit contenir plus de 3 characters' ||
                    messageerr === 'Le Prenom doit contenir plus de 15 characters' ? (
                      <label style={{ color: 'red' }}>
                        Le Prenom doit contenir plus de 3 et moin de 15
                      </label>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Password
                    </label>
                    <input
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 `}
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(e) => handlePasswordChange(e)}
                      label="Password"
                      aria-label="Password"
                    />
                    {n === 3 || n === 4 || n === 6 || n === 7 ||messageerr === 'Le Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole Exemple mdp : Exemple@123 | Exemple#123 | Exemple.123 | Exemple/123 | Exemple*123' ||
                    messageerr === 'Le Mot de passe doit contenir au moins 8 caractères' ? (
                      <label style={{ color: 'red' }}>
                        Le Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et
                        un symbole Exemple mdp : Exemple@123 | Exemple#123 | Exemple.123 | Exemple/123 |
                        Exemple*123 </label>
                    ) : (
                      ''
                    )}
                    {/*{passwordStrength === 1 && <label style={{ color: 'red' }}>Le Mot de passe doit contenir au moins 8 caractères</label>}*/}
                    <div className="relative pt-1">
                      <div className={`${getColor(passwordStrength)}`}>
                        <div style={{ width: `${(passwordStrength / 3) * 100}%` }}
                             className={`${getStrengthColor(passwordStrength)}`}></div>
                      </div>
                    </div>
                  </div>

                  {/*<div>*/}
                  {/*  <label className="inline-flex items-center cursor-pointer">*/}
                  {/*    <input*/}
                  {/*      id="customCheckLogin"*/}
                  {/*      type="checkbox"*/}
                  {/*      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"*/}
                  {/*    />*/}
                  {/*    <span className="ml-2 text-sm font-semibold text-blueGray-600">*/}
                  {/*      I agree with the{' '}*/}
                  {/*      <a*/}
                  {/*        href="#pablo"*/}
                  {/*        className="text-lightBlue-500"*/}
                  {/*        onClick={(e) => e.preventDefault()}*/}
                  {/*      >*/}
                  {/*        Privacy Policy*/}
                  {/*      </a>*/}
                  {/*    </span>*/}
                  {/*  </label>*/}
                  {/*</div>*/}

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
  )
}
