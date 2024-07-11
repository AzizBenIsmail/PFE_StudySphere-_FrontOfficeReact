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
import '../../../assets/styles/centeradd.css'

export default function Index() {
  const location = useLocation();
  const xpPerdu = new URLSearchParams(location.search).get("xpPerdu");

  return (
    <>
      <div className="features-training-centers-container">
        <div
          className="features-training-centers-image-section w-13/12 md:w-6/12 lg:w-4/12 md:px-4 mr-auto ml-auto -mt-32">
          <img src={require('assets/img/Avertissement.jpeg').default} alt="People"
               className="relative flex flex-col  break-words bg-white w-full shadow-lg rounded-lg "
               style={{ width: '550px', height: '520px' }}
          />
        </div>
        <div className="training-features-section">
          <h2>Avertissement relatif à une réduction de XP!</h2>
          <div className="features-training-centers-feature-item">
            <div>
              <h3>réduction XP ! </h3>
              <p>
                <span className="red-text"></span> Nous tenons à vous informer qu'à partir du moment où votre score d'XP atteint zéro, votre compte sera désactivé temporairement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
