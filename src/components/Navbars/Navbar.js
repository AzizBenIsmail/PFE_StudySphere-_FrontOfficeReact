/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

// components
import UserDropdown from '../Dropdowns/UserDropdownLanding'
import NotificationDropdown from '../Dropdowns/NotificationDropdown'
import { MdCastForEducation } from 'react-icons/md'
import { BiSolidSchool  } from "react-icons/bi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineEventNote } from "react-icons/md";

export default function Navbar ({ user }) {

  const [navbarOpen, setNavbarOpen] = React.useState(false)

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/landing"
            >
              Forme
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
              "lg:flex flex-grow items-center bg-bleu-500 lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <div className="flex justify-between items-center w-full">
              <ul className="flex flex-col lg:flex-row list-none mr-auto">
                {user && (user.role === "client" || user.role === "formateur")  ? (
                  <>
                    <Link
                      className="lg:text-white lg:hover:text-indigo-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs "
                      to="/landing/training"
                    >
                      <MdCastForEducation
                        className="mr-2"
                        style={{ fontSize: '24px' }}
                      />
                      Formation
                    </Link>
                    <Link
                      className="lg:text-white lg:hover:text-lightBlue-800 text-white px-3 py-4 lg:py-2 flex items-center text-xs "
                      to="/landing/center"
                    >
                      <BiSolidSchool  className="mr-2" style={{ fontSize: '24px' }}/>
                      Centre
                    </Link>

                    <Link
                      className="lg:text-white lg:hover:text-lightBlue-800 text-white px-3 py-4 lg:py-2 flex items-center text-xs "
                      to="/landing/Formateurs"
                    >
                      <LiaChalkboardTeacherSolid   className="mr-2" style={{ fontSize: '24px' }}/>
                      Formateur
                    </Link>

                    <Link
                      className="lg:text-white lg:hover:text-lightBlue-800 text-white px-3 py-4 lg:py-2 flex items-center text-xs "
                      to="/landing/event"
                    >
                      <MdOutlineEventNote    className="mr-2" style={{ fontSize: '24px' }}/>
                      Evénement
                    </Link>
                  </>
                ) : null }


              </ul>
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

                <li className="flex items-center">
                  <NotificationDropdown user={user} />
                </li>

                <li className="flex items-center">
                  <UserDropdown user={user} />
                </li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}
