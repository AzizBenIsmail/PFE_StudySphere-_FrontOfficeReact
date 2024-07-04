import React, { useMemo, useState } from 'react'
// import Cookies from 'js-cookie';
import { UpdatePassword } from '../../../Services/ApiUser';
// import Navbar from '../../../../components/Navbars/Navbar'
// import Footer from '../../../../components/Footers/FooterSmall'
// import { getUserAuth } from '../../../../Services/Apiauth'
import SiedBarSetting from './SiedBarSetting'

export default function ResetPw() {

  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  // //session
  // if (Cookies.get('jwt_token')) {
  //   const fetchData = async () => {
  //     try {
  //       await getUserAuth(config).then((res) => {
  //         if (res.data.user.role === 'admin') {
  //           window.location.replace(`/admin/`)
  //         }
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // } else {
  //   window.location.replace(`/`)
  // }
  //
  // const [userAuth, setUserAuth] = useState({});

  // useEffect(() => {
  //   const getUser = async (config) => {
  //     await getUserAuth(config).then((res) => {
  //       setUserAuth(res.data.user)
  //       //console.log(res.data.user)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  //
  //   getUser(config)
  //
  //   const interval = setInterval(() => {}, 1000000)
  //
  //   return () => clearInterval(interval)
  // }, [config])

  const [isLoading, setIsLoading] = useState(false);
  const [n, setN] = useState(0) // Ajout de la variable n
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [messageerr, setmessageerr] = useState()

  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
    token : jwt_token,
  });
  const [passwordError, setPasswordError] = useState('');

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
    if (user.password=== '')
    {
      setN(2)
    }else if (user.password === user.confirmPassword || user.password=== '') {
      if(n === 4) {
        try {
          setIsLoading(true);
          const response = await UpdatePassword(user,config);
          console.log(response);
          if (response.data.message === "Mot de passe modifié avec succès. Veuillez vérifier votre boîte mail.") {
            window.location.replace(`/Setting/`)
          } else {
            setmessageerr(response.data.message)
            //showNotification('error',response.data.message, 'Erreur')
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }else{
        //showNotification('error', 'Error', "Exemple mdp : Exemple@123");
      }
    } else {
      setPasswordError('Les mots de passe ne correspondent pas.');
    }
  };

  return (
    <>
      {/*<Navbar user={userAuth} />*/}
      {/*<main className="profile-page">*/}
      {/*  <section className="relative block h-550-px">*/}
      {/*    <div*/}
      {/*      className="absolute top-0 w-full h-full bg-center bg-cover"*/}
      {/*    >*/}
      {/*      <span*/}
      {/*        id="blackOverlay"*/}
      {/*        className="w-full h-full absolute opacity-100 bg-bleu-500"*/}
      {/*      ></span>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"*/}
      {/*      style={{ transform: "translateZ(0)" }}*/}
      {/*    >*/}
      {/*    </div>*/}
      <div className="flex py-30 flex-wrap">
        <SiedBarSetting code="3" />
        <div className="w-7/12 px-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <div className="text-center mb-3">
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
          </div>
        </div>
      </div>
      {/*  </section>*/}
      {/*</main>*/}
      {/*/!*<div className="py-41">*!/*/}
      {/*<Footer absolute />*/}
      {/*</div>*/}
    </>
  );
}
