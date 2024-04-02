/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import IndexNavbar from "../../../components/Navbars/Navbar.js";
import Footer from "../../../components/Footers/Footer.js";
import Cookies from 'js-cookie'
import { getUserByID } from "../../../Services/ApiUser";
import { getUserAuth } from '../../../Services/Apiauth'
import Navbar from "../../../components/Navbars/Navbar.js";
import { SiWelcometothejungle } from "react-icons/si";
import { IoSchoolSharp } from "react-icons/io5";

export default function Index() {
  const location = useLocation();
  const xpPerdu = new URLSearchParams(location.search).get("xpPerdu");

  return (
    <>
      <div className="container mx-auto py-2">
        <div className="flex flex-wrap items-center">
          <div className="w-13/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-red-500">
              <img
                alt="..."
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                className="w-full align-middle rounded-t-lg"
              />
              <blockquote className="relative p-4 mb-6">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  className="absolute left-0 w-full block h-95-px -top-94-px"
                >
                  <polygon
                    points="-30,95 583,95 583,65"
                    className="text-red-500 fill-current"
                  ></polygon>
                </svg>
                <h4 className="text-xl font-bold text-white">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-18 mb-6 shadow-lg rounded-full mr-2 bg-white">
                    <SiWelcometothejungle />
                  </div>
                  <span className="inline-block text-center w-full">Avertissement relatif à une réduction de {xpPerdu} XP!</span> {/* Ajoutez une classe pour augmenter la largeur */}
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  Nous tenons à vous informer qu'à partir du moment où votre score d'XP atteint zéro, votre compte sera désactivé temporairement.
                </p>
              </blockquote>
            </div>
          </div>


          <div className="w-full md:w-6/12 px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <i className="fas fa-sitemap"></i>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      CSS Components
                    </h6>
                    <p className="mb-4 text-blueGray-500">
                      Notus React comes with a huge number of Fully Coded CSS
                      components.
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <i className="fas fa-drafting-compass"></i>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      JavaScript Components
                    </h6>
                    <p className="mb-4 text-blueGray-500">
                      We also feature many dynamic components for React,
                      NextJS, Vue and Angular.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <i className="fas fa-newspaper"></i>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">Pages</h6>
                    <p className="mb-4 text-blueGray-500">
                      This extension also comes with 3 sample pages. They are
                      fully coded so you can start working instantly.
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      Documentation
                    </h6>
                    <p className="mb-4 text-blueGray-500">
                      Built by developers for developers. You will love how
                      easy is to to work with Notus React.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
