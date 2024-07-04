/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { GiBurningDot } from 'react-icons/gi'
import { SlLogin } from 'react-icons/sl'
import { logout } from '../../Services/Apiauth'

export default function Navbar(props) {
  const log = async () => {
    try {
      logout(config)
      .then(() => {
        localStorage.removeItem('jwt_token');
        window.location.replace(`/login/`)
      })
      .catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
      <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-bleu-500 shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/*<div className="flex items-center"> /!* Added a div with flex and items-center class *!/*/}
              {/*<img*/}
              {/*  src={require('assets/img/LogoDark.png').default}*/}
              {/*  alt="..."*/}
              {/*  className="w-1/8 sm:w-4/12 "*/}
              {/*/>*/}

          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
            (navbarOpen ? " block" : " hidden")
          }
          id="example-navbar-warning"
        >
          <img
            src={require('assets/img/LogoDark.png').default}
            alt="..."
            className="w-1/8 sm:w-4/12 "
          />
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {/*<li className="flex items-center">*/}
            {/*  <IndexDropdown />*/}
            {/*</li>*/}

            <li className="flex items-center">
              <Link
                className="bg-white text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3  ease-linear transition-all duration-150"
                type="button"
                to="/auth/registerEmail"
              >
                {/*<SlLogin className="mr-2"/> /!* Ajoutez cette ligne pour l'icône *!/*/}
                <p className="text-lightBlue-500">S'inscrire</p>
              </Link>
              <Link
                className="bg-white text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3  ease-linear transition-all duration-150"
                type="button"
                to="/auth/login"
              >
                {/*<SlLogin className="mr-2"/> /!* Ajoutez cette ligne pour l'icône *!/*/}
                <p className="text-lightBlue-500">Se connecter</p>
              </Link>
            </li>
          </ul>
        {/*</div>*/}
            </div>
          </div>
      </div>
    </nav>
</>
  );
}
