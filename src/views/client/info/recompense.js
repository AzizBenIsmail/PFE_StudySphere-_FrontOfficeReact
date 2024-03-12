/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import IndexNavbar from "../../../components/Navbars/Navbar.js";
import Footer from "../../../components/Footers/Footer.js";
import Cookies from 'js-cookie'
import { getUserByID } from "../../../Services/ApiUser";
import { getUserAuth } from '../../../Services/Apiauth'
import Navbar from "../../../components/Navbars/Navbar.js";
import { SiWelcometothejungle } from "react-icons/si";
import { IoSchoolSharp } from "react-icons/io5";

export default function Index() {
  const [user, setUser] = useState(null);
  const jwt_token = Cookies.get('jwt_token');
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jwt_token) {
          const config = {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          };
          const res = await getUserAuth(config);
          setUser(() => {
            if (res.data.user.role === 'admin') {
              history.replace('/admin/');
            }
            return res.data.user;
          });
        } else {
          history.replace('/');
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [history, jwt_token]); // Inclure history et jwt_token dans le tableau de dépendances

  return (
    <>
      <Navbar user={user} />
      <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-0">
          <div className="flex flex-wrap justify-center">
            {/*<div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-40">*/}
            {/*  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">*/}
            {/*    /!*<i className="fas fa-code-branch text-xl"></i>*!/*/}
            {/*    <SiWelcometothejungle />*/}
            {/*  </div>*/}
            {/*  <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">*/}
            {/*    Bienvenue sur notre plateforme !*/}
            {/*  </h3>*/}
            {/*  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">*/}
            {/*    Nous{" "}*/}
            {/*    <a*/}
            {/*      href="https://tailwindcss.com/?ref=creativetim"*/}
            {/*      className="text-blueGray-300"*/}
            {/*      target="_blank"*/}
            {/*    >*/}
            {/*      vous encourageons à remplir chaque étape de notre*/}
            {/*    </a>{" "}*/}
            {/*    formulaire avec soin et précision. Chaque réponse vous rapproche un peu plus de vos objectifs*/}
            {/*    professionnels. De plus, n'oubliez pas que chaque fois que vous atteignez 1000 points,*/}
            {/*    vous débloquez une remise spéciale sur nos formations. Alors,*/}
            {/*  </p>*/}
            {/*  <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">*/}
            {/*    plongez-vous dans le processus et*/}
            {/*    laissez-nous vous guider vers un avenir brillant et rempli de réussite ! 🚀*/}
            {/*  </p>*/}
            {/*</div>*/}
            {/*<div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">*/}
            {/*  <IoSchoolSharp*/}
            {/*    className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"/>*/}
            {/*</div>*/}
          </div>
        </div>

      </section>
      <div className="container mx-auto py-20">
        <div className="flex flex-wrap items-center">
          <div className="w-13/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-emerald-500">
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
                    className=" text-emerald-500 fill-current"
                  ></polygon>
                </svg>
                <h4 className="text-xl font-bold text-white">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-18 mb-6 shadow-lg rounded-full mr-2 bg-white">
                    <SiWelcometothejungle />
                  </div>
                  <span className="inline-block text-center w-full">Bienvenue sur notre plateforme !</span> {/* Ajoutez une classe pour augmenter la largeur */}
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  StudySphere, plateforme Web tunisienne novatrice, centralise les centres de formation pour simplifier
                  la recherche des formations en ligne ou en présentiel. Elle recommande des formations selon la proximité
                  et le profil des utilisateurs. Avec un espace e-learning interactif pour les formations en ligne,
                  notre objectif principal est de résoudre le problème de la difficulté à trouver des formations sans concurrence.
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

      <Footer />
    </>
  );
}
