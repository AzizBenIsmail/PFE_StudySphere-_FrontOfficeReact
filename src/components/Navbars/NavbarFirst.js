/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

// components

import UserDropdown from '../Dropdowns/UserDropdownLanding'
import NotificationDropdown from '../Dropdowns/NotificationDropdown'

export default function Navbar ({ user }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav
        className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div
            className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">

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
            <img
              src={require('assets/img/LogoDark.png').default}
              alt="..."
              className="w-1/8 sm:w-4/12 "
            />
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
                    className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    to="/landing"
                  >
                    Quitter
                  </Link>
                </li>
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
