/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import IndexNavbar from "../../../components/Navbars/Navbar.js";
import Footer from "../../../components/Footers/Footer.js";
import Cookies from 'js-cookie'
import { getUserByID } from "../../../Services/ApiUser";
import { getUserAuth } from '../../../Services/Apiauth'
import Navbar from "../../../components/Navbars/Navbar.js";
import { SiNintendogamecube } from "react-icons/si";
import { IoSchoolSharp } from "react-icons/io5";
import '../../../assets/styles/centeradd.css'

export default function Index() {

  const location = useLocation();
  const xpGagne = new URLSearchParams(location.search).get("xpGagne");

  return (
    <>
      <div className="features-training-centers-container">
        <div
          className="features-training-centers-image-section w-13/12 md:w-6/12 lg:w-4/12 md:px-4 mr-auto ml-auto -mt-32">
          <img                 src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                               alt="People"
               className="relative flex flex-col  break-words bg-white w-full shadow-lg rounded-lg "
               style={{ width: '550px', height: '520px' }}
          />
        </div>
        <div className="training-features-section">
          <h2>Félicitations ! </h2>
          <div className="features-training-centers-feature-item">
            <div>
              <h3>Vous avez gagné {xpGagne} XP </h3>
              <p>
                <span className="red-text"></span>                   n'oubliez pas que chaque fois que vous atteignez 1000 points,
                vous débloquez une remise spéciale sur nos formations. Alors, plongez-vous dans le processus et
                laissez-nous vous guider vers un avenir brillant et rempli de réussite ! 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
