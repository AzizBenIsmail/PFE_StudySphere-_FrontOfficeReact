/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

// components
import { SlLogin } from 'react-icons/sl'
import { GiBurningDot } from 'react-icons/gi'
import UserDropdown from '../Dropdowns/UserDropdownLanding'

export default function Navbar (props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav
        className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div
            className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
            <div
              className="text-white inline-flex items-center py-2"
            >
              <img
                src={require('assets/img/Logo.png').default}
                alt="..."
                style={{ maxWidth: '25%' }}
              />
              <GiBurningDot size={25} />
              <img
                src={require('assets/img/LogoBridge.png').default}
                alt="..."
                style={{ maxWidth: '25%' }}
              />
            </div>
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
              {/*<li className="flex items-center">*/}
              {/*  <PagesDropdown />*/}
              {/*</li>*/}
              {/*<li className="flex items-center">*/}
              {/*  <a*/}
              {/*    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"*/}
              {/*    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"*/}
              {/*    target="_blank"*/}
              {/*  >*/}
              {/*    <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg " />*/}
              {/*    <span className="lg:hidden inline-block ml-2">Share</span>*/}
              {/*  </a>*/}
              {/*</li>*/}

              {/*<li className="flex items-center">*/}
              {/*  <a*/}
              {/*    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"*/}
              {/*    href="https://github.com/creativetimofficial/notus-react?ref=nr-auth-navbar"*/}
              {/*    target="_blank"*/}
              {/*  >*/}
              {/*    <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg " />*/}
              {/*    <span className="lg:hidden inline-block ml-2">Star</span>*/}
              {/*  </a>*/}
              {/*</li>*/}

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
                <UserDropdown/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
