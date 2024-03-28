/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Navbar from '../../../components/Navbars/Navbar.js'
import Footer from '../../../components/Footers/FooterSmall.js'
import Cookies from 'js-cookie'
import { getUserAuth } from '../../../Services/Apiauth'
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { InfinitySpin } from 'react-loader-spinner'
import { MdLockReset } from 'react-icons/md'

export default function Index () {
  const [user, setUser] = useState(null)
  const jwt_token = Cookies.get('jwt_token')
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
      <Navbar user={user}/>
      <section className="py-20 bg-bleu-500 overflow-hidden">
        <div className="container mx-auto pb-20">
          <div className="flex flex-wrap justify-center">
          </div>
        </div>

      </section>
      <div className="container mx-auto py-2">
        <div className="flex flex-wrap items-center">
          <div className="w-13/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-red-500">
              <img
                alt="..."
                src={require('assets/img/securite.jpg').default}
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
                  {/*<div*/}
                  {/*  className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-18 mb-6 shadow-lg rounded-full mr-2 bg-white">*/}
                  {/*  <SiWelcometothejungle/>*/}
                  {/*</div>*/}
                  <span className="inline-block text-center w-full">Alert ! double connexion a été détectée sur votre compte.</span> {/* Ajoutez une classe pour augmenter la largeur */}
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  Alert ! Une nouvelle connexion a été détectée sur votre compte.
                </p>
              </blockquote>
            </div>
          </div>


          <div className="w-full md:w-6/12 px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <AiOutlineFieldNumber style={{ fontSize: '25px' }}
                      />
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">
                      Numero de connection de Puis la creation du compte
                    </h6>
                    {user ? (
                      <p className="mb-4 text-blueGray-500">
                        {user.visitsCount} Tentatives de connexion utilisateur au compte.
                      </p>
                    ) : (
                      <div className="flex justify-center items-center h-screen">
                        <InfinitySpin width="200" height="200" color="#4fa94d"/>
                      </div>
                    )}
                  </div>
                </div>
                {/*<div className="relative flex flex-col min-w-0">*/}
                {/*  <div className="px-4 py-5 flex-auto">*/}
                {/*    <div*/}
                {/*      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">*/}
                {/*      <i className="fas fa-drafting-compass"></i>*/}
                {/*    </div>*/}
                {/*    <h6 className="text-xl mb-1 font-semibold">*/}
                {/*      JavaScript Components*/}
                {/*    </h6>*/}
                {/*    <p className="mb-4 text-blueGray-500">*/}
                {/*      We also feature many dynamic components for React,*/}
                {/*      NextJS, Vue and Angular.*/}
                {/*    </p>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
              <div className="w-full md:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 mt-4">
                  <div className="px-4 py-5 flex-auto">
                    <div
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <MdLockReset style={{ fontSize: '25px' }}/>
                    </div>
                    <h6 className="text-xl mb-1 font-semibold">Modifier mots de passe</h6>
                    <p className="mb-4 text-blueGray-500">
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button">
                        Modifier
                      </button>
                    </p>
                  </div>
                </div>
                {/*<div className="relative flex flex-col min-w-0">*/}
                {/*  <div className="px-4 py-5 flex-auto">*/}
                {/*    <div*/}
                {/*      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">*/}
                {/*      <i className="fas fa-file-alt"></i>*/}
                {/*    </div>*/}
                {/*    <h6 className="text-xl mb-1 font-semibold">*/}
                {/*      Documentation*/}
                {/*    </h6>*/}
                {/*    <p className="mb-4 text-blueGray-500">*/}
                {/*      Built by developers for developers. You will love how*/}
                {/*      easy is to to work with Notus React.*/}
                {/*    </p>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  )
}
