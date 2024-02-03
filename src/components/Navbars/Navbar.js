/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// components
import { SlLogin } from 'react-icons/sl'
import { GiBurningDot } from 'react-icons/gi'
import Cookies from 'js-cookie'
import { getUserAuth, logout } from '../../Services/ApiUser'

export default function Navbar (props) {
  const [user, setUser] = useState([])
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  //cookies
  const jwt_token = Cookies.get('jwt_token')
/////cookies
  if (!Cookies.get('jwt_token')) {
    window.location.replace('/login-page')
  }

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  }, [jwt_token])

  ////////
  useEffect(() => {
    const getAuthUser = async (config) => {
      await getUserAuth(config)
      .then((res) => {
        setUser(res.data.user)
        // console.log(res.data.user);
      })
      .catch((err) => {
        console.log(err)
      })
    }
    getAuthUser(config)
    const interval = setInterval(() => {
      getAuthUser(config) // appel répété toutes les 10 secondes
    }, 300000)
    return () => clearInterval(interval) // nettoyage à la fin du cycle de vie du composant
  }, [config])
  const log = async (config,user) => {
    try {
      logout(config,user._id)
      .then(() => {
        // console.log(res.data.user);
        window.location.replace(`/login/`)
      })
      .catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <nav
        className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div
            className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-flex items-center mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              <img
                src={require('assets/img/Logo.png').default}
                alt="..."
                className="mr-4"
                style={{ maxWidth: '20%', height: '10%' }}
              />
              <GiBurningDot size={25} className="mr-4"/>
              <img
                src={require('assets/img/LogoBridge.png').default}
                alt="..."
                className="mr-4"
                style={{ maxWidth: '20%', height: '10%' }}
              />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-auth-navbar"
                >
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

              <li className="flex items-center">
                <Link
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150 flex items-center"
                  type="button"
                  onClick={() => log(config,user)}
                >
                  <SlLogin className="mr-2"/> {/* Ajoutez cette ligne pour l'icône */}
                  deconnnecter
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
