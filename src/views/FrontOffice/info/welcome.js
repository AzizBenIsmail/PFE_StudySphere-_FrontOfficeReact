/*eslint-disable*/
import React from 'react'

import { SiWelcometothejungle } from "react-icons/si";
import '../../../assets/styles/centeradd.css'

export default function Index() {
  return (
    <>
      <div className="features-training-centers-container">
        <div
          className="features-training-centers-image-section w-13/12 md:w-6/12 lg:w-4/12 md:px-4 mr-auto ml-auto -mt-32">
          <img src={require('assets/gif/RfmR.gif').default} alt="People"
               className="relative flex flex-col  break-words bg-white w-full shadow-lg rounded-lg "
               style={{ width: '550px', height: '520px' }}
          />
        </div>
        <div className="training-features-section">
          <h2>Bienvenue sur notre plateforme !</h2>
          <div className="features-training-centers-feature-item">
            <div>
              <h3>StudySphere</h3>
              <p>
                <span className="red-text"></span> c'est une plateforme Web tunisienne novatrice, centralise les centres de formation pour simplifier
                la recherche des formations en ligne ou en présentiel. Elle recommande des formations selon la proximité
                et le profil des utilisateurs. Avec un espace e-learning interactif pour les formations en ligne,
                notre objectif principal est de résoudre le problème de la difficulté à trouver des formations sans concurrence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
