/*eslint-disable*/
import React, { useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'

// components
import Cookies from 'js-cookie'
import UserDropdown from '../Dropdowns/UserDropdownLanding'
import NotificationDropdown from '../Dropdowns/NotificationDropdown'
import { FaRegStar, FaSchool } from 'react-icons/fa'
import { MdCastForEducation } from 'react-icons/md'
import { BiSolidSchool  } from "react-icons/bi";

export default function Navbar ({ user }) {
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

  return (
    <>
      <nav
        className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">

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
                {/*<img*/}
                {/*  src={require('assets/img/LogoDark.png').default}*/}
                {/*  alt="..."*/}
                {/*  className="w-1/8 sm:w-4/12 "*/}
                {/*  // onClick={() => history.push('/landing')}*/}
                {/*/>*/}
              <Link
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-2xl"
                to="/landing"
              >
                ForMe.com
              </Link>
              {user && (user.role === "client" || user.role === "formateur")  ? (
                <>
                  <Link
                    className="lg:text-white lg:hover:text-indigo-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/landing/training"
                  >
                    <MdCastForEducation
                      className="mr-2"
                      style={{ fontSize: '24px' }}
                    />
                    Formation
                  </Link>
                  <Link
                    className="lg:text-white lg:hover:text-lightBlue-800 text-blueGray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    to="/landing/center"
                  >
                    <BiSolidSchool  className="mr-2" style={{ fontSize: '24px' }}/>
                    Centre de formation
                  </Link>
                </>
              ) : null }

            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <div
                className="lg:text-white lg:hover:text-lightBlue-800 text-blueGray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold ml-3"
              >
                {/*<Link*/}
                {/*  to="/BadgesNiveauXp"*/}
                {/*>*/}
                {/*  <li className="flex items-center">*/}

                {/*  <FaRegStar className="mr-1" style={{ fontSize: '24px' }}/>*/}

                {/*{user && user.xp && typeof user.xp.pointsGagnes === 'number' && user.xp.niveauAtteint && `${user.xp.niveauAtteint.nom}`}*/}

                {/*  <SiNintendogamecube className="mr-2 ml-2" style={{ fontSize: '24px' }}/>*/}
                {/*  {user && user.xp && typeof user.xp.pointsGagnes === 'number' && user.xp.niveauAtteint && ` Xp : ${user.xp.pointsGagnes}`}*/}
                {/*  </li>*/}
                {/*  </Link>*/}

              </div>
              <li className="flex items-center">
                <NotificationDropdown/>
              </li>
              <li className="flex items-center">
                <UserDropdown user={user}/>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
