import { React, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUserAuth, registerCentre } from '../../Services/Apiauth'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { GiBurningDot } from 'react-icons/gi'

export default function Register () {
  const jwt_token = Cookies.get('jwt_token')

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  //session
  if (Cookies.get('jwt_token')) {
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

  const showNotification = (type, title, message, autoDismissTime = 1000) => {
    switch (type) {
      case 'success':
        NotificationManager.success(title, message, autoDismissTime = 1000)
        break
      case 'error':
        NotificationManager.error(title, message, autoDismissTime = 1000)
        break
      case 'info':
        NotificationManager.info(title, message, autoDismissTime = 1000)
        break
      case 'warning':
        NotificationManager.warning(title, message, autoDismissTime = 1000)
        break
      default:
        break
    }
  }

  useEffect(() => {
    // showNotification('success', message, 'success')

    const interval = setInterval(() => {}, 1000000)

    return () => clearInterval(interval)
  }, [config, message])

  const [User, setUser] = useState({
    nom: '',
    // prenom: '',
    email: '',
    password: '',
    image_user: '',
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setUser({ ...User, password: newPassword })

    const strengthCode = checkPasswordStrength(newPassword, User.nom)
    setPasswordStrength(strengthCode)

  }
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
  const [image, setImage] = useState()
  const [n, setN] = useState(0) // Ajout de la variable n
  const [emailError, setEmailError] = useState('')

  const handlechangeFile = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
  }

  let formData = new FormData()
  const add = async (e) => {
    const normalizedNom = User.nom.toLowerCase()
    const passwordLowerCase = User.password.toLowerCase()
    if (emailError === 'Veuillez entrer une adresse e-mail valide.') {
      showNotification('info', '', 'Veuillez entrer une adresse e-mail valide !')
    } else if (User.nom === '' && User.email === '' && User.password === '') {
      showNotification('error', 'Nom et email et Password Obligatoire', 'Vide !')
      setN(4) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '' && User.email === '') {
      showNotification('error', 'Nom et Prenom Obligatoire', 'Vide !')
      setN(5) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.email === '' && User.password === '') {
      showNotification('error', 'Prenom et Password Obligatoire', 'Vide !')
      setN(6) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '' && User.password === '') {
      showNotification('error', 'Nom et Password Obligatoire', 'Vide !')
      setN(7) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.nom === '') {
      showNotification('error', 'Nom et Obligatoire', 'Vide !')
      setN(1) // Utilisation de setN pour mettre à jour la valeur de n
    } else if (User.email === '') {
      showNotification('error', 'Prenom Obligatoire', 'Vide !')
      setN(2)
    } else if (User.password === '') {
      showNotification('error', 'Mot de Passe Obligatoire', 'Vide !')
      setN(3)
    } else if (passwordLowerCase.includes(normalizedNom)) {
      NotificationManager.error('Il est important de ne pas inclure ton nom dans le mot de passe.', 'Nom dans le mot de passe')
    } else {
      formData.append('email', User.email)
      formData.append('nom', User.nom)
      formData.append('prenom', User.prenom)
      formData.append('password', User.password)
      if (image === undefined) {
        showNotification('error', 'image required', 'Erreur')
      } else {
        formData.append('image_user', image, `${User.username}+.png`)
        const res = await registerCentre(formData)
        console.log(res.data)
        if (res.data.message === undefined) {
          window.location.replace(`/auth/login/`)
        } else {
          setmessageerr(res.data.message)
          showNotification('error', res.data.message, 'Erreur')
        }
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
                  <h6 className="mt-6 text-3xl font-semibold leading-normal mt-0 mb-2 text-lightBlue-800">
                    S'inscrire
                  </h6>
                </div>
                <hr className=" border-b-1 border-blueGray-300"/>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form encType="multipart/form-data">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Email
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="email"
                      type="email"
                      name="email"
                      onChange={(e) => handlechange(e)}
                      label="email"
                      aria-label="email"
                    />
                    {n === 2 || n === 4 || n === 5 || n === 6 || messageerr === 'Le Nom doit contenir plus de 3 caractères' ||
                    messageerr === 'Le Nom doit contenir moins de 15 caractères' ? (
                      <label style={{ color: 'red' }}>
                        Le Nom doit contenir plus de 3 et moin de 15
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
                    {n === 3 || n === 4 || n === 6 || n === 7 || messageerr === 'Le Mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole Exemple mdp : Exemple@123 | Exemple#123 | Exemple.123 | Exemple/123 | Exemple*123' ||
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

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Image
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="image_user"
                      type="file"
                      name="image_user"
                      onChange={(e) => handlechangeFile(e)}
                      label="image_user"
                      aria-label="image_user"
                    />
                    {/*{messageerr === 'Le Prenom doit contenir plus de 3 characters' ||*/}
                    {/*messageerr === 'Le Prenom doit contenir plus de 15 characters' ? (*/}
                    {/*  <label style={{ color: 'red' }}>*/}
                    {/*    Le Prenom doit contenir plus de 3 et moin de 15*/}
                    {/*  </label>*/}
                    {/*) : (*/}
                    {/*  ''*/}
                    {/*)}*/}
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
                <a href="/auth/registerEmail" className="text-blueGray-200">
                  <small>                     Rejoignez-nous en tant que Client
                  </small>
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
