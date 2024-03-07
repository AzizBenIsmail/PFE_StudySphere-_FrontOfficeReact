/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import IndexNavbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import Cookies from 'js-cookie'
import { getUserByID } from "../../Services/ApiUser";
import { getUserAuth } from '../../Services/Apiauth'
import Navbar from "components/Navbars/Navbar.js";
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
        <div className="container mx-auto pb-48">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-40">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                {/*<i className="fas fa-code-branch text-xl"></i>*/}
                <SiWelcometothejungle />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Bienvenue sur notre plateforme !
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                Nous{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-300"
                  target="_blank"
                >
                  vous encourageons à remplir chaque étape de notre
                </a>{" "}
                formulaire avec soin et précision. Chaque réponse vous rapproche un peu plus de vos objectifs
                professionnels. De plus, n'oubliez pas que chaque fois que vous atteignez 1000 points,
                vous débloquez une remise spéciale sur nos formations. Alors,
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                plongez-vous dans le processus et
                laissez-nous vous guider vers un avenir brillant et rempli de réussite ! 🚀
              </p>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <IoSchoolSharp
                className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
