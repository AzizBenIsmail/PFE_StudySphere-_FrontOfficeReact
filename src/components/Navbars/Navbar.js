/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// components
import Cookies from 'js-cookie'
import { getUserAuth, logout } from '../../Services/Apiauth'
import UserDropdown from '../Dropdowns/UserDropdownLanding'
import { FaSchool } from 'react-icons/fa'
import { MdCastForEducation } from 'react-icons/md'
import { IoIosNotificationsOutline } from 'react-icons/io'

export default function Navbar (props) {
  const [user, setUser] = useState([])
  const history = useHistory()

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
  const log = async (config, user) => {
    try {
      logout(config, user._id)
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
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/landing"
            >
              StudySphere
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
                <button
                  className="lg:text-white lg:hover:text-indigo-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  onClick={() => history.push('/')}
                >
                  <MdCastForEducation
                    className="mr-2"
                    style={{ fontSize: '24px' }}
                  />
                  Formation
                </button>
              </li>
              <li className="flex items-center ml-2">
                <button
                  className="lg:text-white lg:hover:text-lightBlue-800 text-blueGray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  onClick={() => history.push('/')}
                >
                  <FaSchool className="mr-2" style={{ fontSize: '24px' }}/>
                  Centre de formation
                </button>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">{/*<PagesDropdown />*/}</li>
              <li className="flex items-center">
                {/*<a*/}
                {/*  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"*/}
                {/*  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"*/}
                {/*  target="_blank"*/}
                {/*> aa*/}
                <button
                  className="lg:text-white lg:hover:text-lightBlue-800 text-blueGray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold ml-3"
                  onClick={() => history.push('/Elearning')}
                >
                  <MdCastForEducation
                    className="mr-2"
                    style={{ fontSize: '24px' }}
                  />
                  Votre Espace
                </button>


                <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg "/>
                <span className="lg:hidden inline-block ml-2">Share</span>
                {/*</a>*/}
              </li>

              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg "/>
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                {/*<a*/}
                {/*  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"*/}
                {/*  href="https://github.com/creativetimofficial/notus-react?ref=nr-auth-navbar"*/}
                {/*  target="_blank"*/}
                {/*>*/}
                <IoIosNotificationsOutline className="text-red-500 mr-3" style={{ fontSize: '25px' }}
                />

                {/*<i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg "/>*/}
                {/*<span className="lg:hidden inline-block ml-2">Star</span>*/}
                {/*</a>*/}
              </li>
              <li className="flex items-center">
                <UserDropdown/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
