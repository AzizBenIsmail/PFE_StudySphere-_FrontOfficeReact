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
            if (res.data.user.role === 'admin') {
              history.replace('/admin/')
            }
            return res.data.user
          })
        } else {
          history.replace('/')
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [history, jwt_token]) // Inclure history et jwt_token dans le tableau de dépendances

  return (
    <>
      {/*<div className="container mx-auto py-2">*/}
      {/*  <div className="flex flex-wrap items-center">*/}
      {/*    <div className="w-13/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">*/}
      {/*      <div*/}
      {/*        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-red-500">*/}
      {/*        <img*/}
      {/*          alt="..."*/}
      {/*          src={require('assets/img/securite.jpg').default}*/}
      {/*          className="w-full align-middle rounded-t-lg"*/}
      {/*        />*/}
      {/*        <blockquote className="relative p-4 mb-6">*/}
      {/*          <svg*/}
      {/*            preserveAspectRatio="none"*/}
      {/*            xmlns="http://www.w3.org/2000/svg"*/}
      {/*            viewBox="0 0 583 95"*/}
      {/*            className="absolute left-0 w-full block h-95-px -top-94-px"*/}
      {/*          >*/}
      {/*            <polygon*/}
      {/*              points="-30,95 583,95 583,65"*/}
      {/*              className="text-red-500 fill-current"*/}
      {/*            ></polygon>*/}
      {/*          </svg>*/}
      {/*          <h4 className="text-xl font-bold text-white">*/}
      {/*            /!*<div*!/*/}
      {/*            /!*  className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-18 mb-6 shadow-lg rounded-full mr-2 bg-white">*!/*/}
      {/*            /!*  <SiWelcometothejungle/>*!/*/}
      {/*            /!*</div>*!/*/}
      {/*            <span className="inline-block text-center w-full">Alert ! double connexion a été détectée sur votre compte.</span> /!* Ajoutez une classe pour augmenter la largeur *!/*/}
      {/*          </h4>*/}
      {/*          <p className="text-md font-light mt-2 text-white">*/}
      {/*            Alert ! Une nouvelle connexion a été détectée sur votre compte.*/}
      {/*          </p>*/}
      {/*        </blockquote>*/}
      {/*      </div>*/}
      {/*    </div>*/}


      {/*    <div className="w-full md:w-6/12 px-4">*/}
      {/*      <div className="flex flex-wrap">*/}
      {/*        <div className="w-full md:w-6/12 px-4">*/}
      {/*          <div className="relative flex flex-col mt-4">*/}
      {/*            <div className="px-4 py-5 flex-auto">*/}
      {/*              <div*/}
      {/*                className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">*/}
      {/*                <AiOutlineFieldNumber style={{ fontSize: '25px' }}*/}
      {/*                />*/}
      {/*              </div>*/}
      {/*              <h6 className="text-xl mb-1 font-semibold">*/}
      {/*                Numero de connection de Puis la creation du compte*/}
      {/*              </h6>*/}
      {/*              {user ? (*/}
      {/*                <p className="mb-4 text-blueGray-500">*/}
      {/*                  {user.visitsCount} Tentatives de connexion utilisateur au compte.*/}
      {/*                </p>*/}
      {/*              ) : (*/}
      {/*                <div className="flex justify-center items-center h-screen">*/}
      {/*                  <InfinitySpin width="200" height="200" color="#4fa94d"/>*/}
      {/*                </div>*/}
      {/*              )}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="w-full md:w-6/12 px-4">*/}
      {/*          <div className="relative flex flex-col min-w-0 mt-4">*/}
      {/*            <div className="px-4 py-5 flex-auto">*/}
      {/*              <div*/}
      {/*                className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">*/}
      {/*              </div>*/}
      {/*              <h6 className="text-xl mb-1 font-semibold">Modifier mots de passe</h6>*/}
      {/*              <p className="mb-4 text-blueGray-500">*/}
      {/*                <button*/}
      {/*                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
      {/*                  type="button"*/}
      {/*                  onClick={() => {*/}
      {/*                    window.location.replace(`/AccountManagement/updatePassword`)*/}
      {/*                  }} >*/}
      {/*                  Modifier*/}
      {/*                </button>*/}
      {/*              </p>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

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

      <div className="course-submission-container">
        <h2 className="course-submission-title">Course Submission Process</h2>
        <div className="course-submission-steps">
          <div className="course-submission-step">
            <p>1. Create an account with FOR ME to gain access to your own center’s dashboard.</p>
          </div>
          <div className="course-submission-step">
            <p>2. Fill out course title, description, duration, pricing, schedule, and any prerequisites or special
              requirements.</p>
          </div>
          <div className="course-submission-step">
            <p>3. Enhance your listing with images, videos, or promotional materials to showcase your training center
              and attract learners.</p>
          </div>
          <div className="course-submission-step">
            <p>4. Once details are filled, submit your course for our team’s review to ensure quality and maximize
              visibility.</p>
          </div>
        </div>
      </div>
    </>
  )
}



