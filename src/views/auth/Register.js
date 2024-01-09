import { React, useMemo ,useEffect  } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUserAuth ,register } from '../../Services/ApiUser'
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications'

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
          if (res.data.user.userType === 'client') {
            window.location.replace(`/landing/`)
          }
          if (res.data.user.userType === 'admin') {
            window.location.replace(`/admin/`)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  const location = useLocation();
  const message = new URLSearchParams(location.search).get("message");
  const email = new URLSearchParams(location.search).get("email");

  const showNotification = (type, title, message) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, title)
        break
      case 'error':
        NotificationManager.error(message, title)
        break
      // Ajoutez d'autres types si nécessaire
      default:
        break
    }
  }
  useEffect(() => {
    showNotification('success', message, ' !')

    const interval = setInterval(() => {
    }, 1000000)

    return () => clearInterval(interval)
  }, [config,message])
  // const [image, setImage] = useState()
  const [User, setUser] = useState({
    // surnom: '',
    nom: '',
    prenom: '',
    email: email,
    password: '',
    // role:'',
    // image_user: '',
  })
  const handlechange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value })
    console.log(User)
  }
  // const handlechangeFile = (e) => {
  //   setImage(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // };
  let formData = new FormData()
  const add = async (e) => {
    formData.append('nom', User.nom)
    formData.append('prenom', User.prenom)
    formData.append('password', User.password)
    formData.append('email', email)
    // formData.append('role', User.role)
    // formData.append('image_user', image, `${User.username}+.png`)
    const res = await register(User)
    .then(
      window.location.replace(`/auth/login/`)
    )
    .catch((error) => {
      console.log(error.response.data)
    })
    console.log(res.data)
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
                <hr className="mt-6 border-b-1 border-blueGray-300"/>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form encType="multipart/form-data" >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nom
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="nom"
                      type="text"
                      name="nom"
                      onChange={(e) => handlechange(e)}
                      label="nom"
                      aria-label="nom"
                      // defaultValue={email}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Prenom
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="prenom"
                      type="text"
                      name="prenom"
                      onChange={(e) => handlechange(e)}
                      label="prenom"
                      aria-label="prenom"
                      // defaultValue={email}
                    />
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
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(e) => handlechange(e)}
                      label="Password"
                      aria-label="Password"
                    />
                  </div>

                  {/*<div className="relative w-full mb-3">*/}
                  {/*  <label*/}
                  {/*    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                  {/*    htmlFor="grid-password"*/}
                  {/*  >*/}
                  {/*    Photo De Profile*/}
                  {/*  </label>*/}
                  {/*  <input*/}
                  {/*    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                  {/*    placeholder="image_user"*/}
                  {/*    name="image_user"*/}
                  {/*    type="file"*/}
                  {/*    onChange={(e) => handlechangeFile(e)}                    />*/}
                  {/*</div>*/}

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
                <a
                  href="#pablo"
                  // onClick={(e) => forget(User.email)}
                  className="text-blueGray-200"
                >
                  <small> .</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/login" className="text-blueGray-200">
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
