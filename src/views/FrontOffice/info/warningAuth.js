/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import '../../../assets/styles/centeradd.css'

import Cookies from 'js-cookie'
import { getUserAuth } from '../../../Services/Apiauth'

export default function Index () {
  const [user, setUser] = useState(null)
  //const jwt_token = Cookies.get('jwt_token')
  const jwt_token = localStorage.getItem('jwt_token');
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jwt_token) {
          const config = {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
          const res = await getUserAuth(config)
          setUser(() => {
            return res.data.user
          })
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [history, jwt_token]) // Inclure history et jwt_token dans le tableau de dépendances

  return (
    <>
      <div className="features-training-centers-container">
        <div
          className="features-training-centers-image-section w-13/12 md:w-6/12 lg:w-4/12 md:px-4 mr-auto ml-auto -mt-32">
          <img src={require('assets/img/securite.jpg').default} alt="People"
               className="relative flex flex-col  break-words bg-white w-full shadow-lg rounded-lg "
               style={{ width: '550px', height: '520px' }}
          />
        </div>
        <div className="training-features-section">
          <h2>Alert ! double connexion a été détectée sur votre compte.</h2>
          <div className="features-training-centers-feature-item">
            <div>
              <h3>Raison</h3>
              <p>Alert ! Une nouvelle connexion a été détectée sur votre compte.</p>
            </div>
          </div>
          <div className="features-training-centers-feature-item">
            <div>
              <h3>Numero de connection de Puis la creation du compte</h3>
              <p>
                <span className="red-text">{user ? user.visitsCount : "0"}</span> Tentatives de connexion utilisateur au compte.
              </p>
            </div>
          </div>
          <button
            className="features-training-centers-join-now-button" type="button"
            onClick={() => {
              window.location.replace(`/AccountManagement/updatePassword`)
            }}>
            Modifier Votre Mot de passe
          </button>
        </div>
      </div>
    </>
  )
}



